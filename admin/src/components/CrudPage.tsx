import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api, imagePreviewUrl } from "../api";
import { ImageField } from "./ImageField";
import { Modal } from "./Modal";

export type FieldDef = {
  key: string;
  label: string;
  kind: "text" | "textarea" | "image" | "checkbox";
  required?: boolean;
  placeholder?: string;
  /** auto-generate this field from another (slugify) on create */
  slugOf?: string;
};

type Item = Record<string, unknown> & { id: string };

type CrudPageProps = {
  title: string;
  subtitle: string;
  endpoint: string;
  fields: FieldDef[];
  columns: { key: string; label: string; kind?: "text" | "image" | "badge" | "check" }[];
  itemName: string;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function emptyDraft(fields: FieldDef[]): Record<string, unknown> {
  const d: Record<string, unknown> = {};
  for (const f of fields) d[f.key] = f.kind === "checkbox" ? false : "";
  return d;
}

export function CrudPage({ title, subtitle, endpoint, fields, columns, itemName }: CrudPageProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api<{ data: Item[] }>(endpoint);
      setItems(res.data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setDraft(emptyDraft(fields));
    setCreating(true);
    setEditing(null);
  }

  function openEdit(item: Item) {
    const d: Record<string, unknown> = {};
    for (const f of fields) d[f.key] = item[f.key] ?? (f.kind === "checkbox" ? false : "");
    setDraft(d);
    setEditing(item);
    setCreating(false);
  }

  function close() {
    setEditing(null);
    setCreating(false);
    setErr(null);
  }

  function setField(key: string, value: unknown) {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (creating) {
        const slugField = fields.find((f) => f.slugOf === key);
        if (slugField) next[slugField.key] = slugify(String(value));
      }
      return next;
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      if (creating) {
        await api(endpoint, { method: "POST", body: JSON.stringify(draft) });
      } else if (editing) {
        await api(`${endpoint}/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(draft),
        });
      }
      close();
      await load();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(item: Item) {
    const label = String(item.name ?? item.title ?? itemName);
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    try {
      await api(`${endpoint}/${item.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    try {
      await api(`${endpoint}/reorder`, {
        method: "PUT",
        body: JSON.stringify({ ids: next.map((i) => i.id) }),
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Reorder failed");
      await load();
    }
  }

  const modalOpen = creating || editing !== null;

  return (
    <div>
      <div className="page-header page-header-row">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          + New {itemName}
        </button>
      </div>

      {err && !modalOpen ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: 70 }}>Order</th>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id}>
                  <td>
                    <span className="order-btns">
                      <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                      <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">↓</button>
                    </span>
                  </td>
                  {columns.map((c) => {
                    const v = item[c.key];
                    if (c.kind === "image") {
                      return (
                        <td key={c.key} style={{ width: 56 }}>
                          {v ? (
                            <img className="row-thumb" src={imagePreviewUrl(String(v))} alt="" />
                          ) : (
                            <div className="row-thumb row-thumb-empty" />
                          )}
                        </td>
                      );
                    }
                    if (c.kind === "check") {
                      return <td key={c.key}>{v ? "✓" : ""}</td>;
                    }
                    if (c.kind === "badge") {
                      return (
                        <td key={c.key}>
                          <span className={`badge ${v ? "badge-published" : "badge-archived"}`}>
                            {v ? "Active" : "Hidden"}
                          </span>
                        </td>
                      );
                    }
                    return (
                      <td key={c.key} style={c.key === columns[0]?.key ? { fontWeight: 500, color: "var(--text)" } : undefined}>
                        {String(v ?? "")}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button type="button" className="btn-link" onClick={() => openEdit(item)}>Edit</button>
                    <button type="button" className="btn-link btn-link-danger" onClick={() => onDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>Nothing here yet.</p></div>
        ) : null}
      </div>

      {modalOpen ? (
        <Modal title={creating ? `New ${itemName}` : `Edit ${itemName}`} onClose={close}>
          <form onSubmit={onSubmit}>
            {fields.map((f) => {
              if (f.kind === "image") {
                return (
                  <div key={f.key} style={{ marginBottom: "1rem" }}>
                    <ImageField
                      label={f.label}
                      value={String(draft[f.key] ?? "")}
                      onChange={(url) => setField(f.key, url)}
                    />
                  </div>
                );
              }
              if (f.kind === "checkbox") {
                return (
                  <label key={f.key} className="check-row" style={{ marginBottom: "1rem" }}>
                    <input
                      type="checkbox"
                      checked={Boolean(draft[f.key])}
                      onChange={(e) => setField(f.key, e.target.checked)}
                    />
                    {f.label}
                  </label>
                );
              }
              if (f.kind === "textarea") {
                return (
                  <div key={f.key} className="field" style={{ marginBottom: "1rem" }}>
                    <label>{f.label}</label>
                    <textarea
                      rows={4}
                      value={String(draft[f.key] ?? "")}
                      placeholder={f.placeholder}
                      required={f.required}
                      onChange={(e) => setField(f.key, e.target.value)}
                    />
                  </div>
                );
              }
              return (
                <div key={f.key} className="field" style={{ marginBottom: "1rem" }}>
                  <label>{f.label}</label>
                  <input
                    value={String(draft[f.key] ?? "")}
                    placeholder={f.placeholder}
                    required={f.required}
                    onChange={(e) => setField(f.key, e.target.value)}
                  />
                </div>
              );
            })}

            {err ? <p className="err">{err}</p> : null}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={close}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving…" : creating ? "Create" : "Save changes"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
