import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api, imagePreviewUrl } from "../api";
import { ImageField } from "../components/ImageField";
import { GalleryField } from "../components/GalleryField";
import { Modal } from "../components/Modal";

type Listing = {
  id: string;
  slug: string;
  name: string;
  developer: string;
  category: string;
  partOf: string | null;
  location: string;
  status: string;
  tagline: string;
  summary: string;
  heroImage: string;
  cardImage: string;
  overview: unknown[];
  facts: unknown[];
  highlights: unknown[];
  typologies: unknown[];
  amenities: unknown[];
  connectivity: unknown[];
  gallery: unknown[];
  sitemap: Record<string, unknown> | null;
  startingPrice: string | null;
  paymentNote: string | null;
  brochureUrl: string;
  active: boolean;
};

const JSON_FIELDS = [
  { key: "overview", label: "Overview paragraphs", hint: '["Paragraph one…", "Paragraph two…"]' },
  { key: "facts", label: "Key facts", hint: '[{"label": "Total area", "value": "592 acres"}]' },
  { key: "highlights", label: "Highlights", hint: '["24/7 security", "Tarred roads"]' },
  { key: "typologies", label: "Home typologies", hint: '[{"name": "Sunflower", "beds": "4 Bedrooms", "storeys": "2-storey", "blurb": "…", "imageSrc": "/images/…"}]' },
  { key: "amenities", label: "Amenities", hint: '["Clubhouse", "Swimming pools"]' },
  { key: "connectivity", label: "Connectivity", hint: '[{"place": "Central University", "time": "1 min"}]' },
  { key: "gallery", label: "Gallery", hint: '[{"src": "/images/…", "alt": "…"}]' },
] as const;

type Draft = Record<string, string | boolean>;

function toDraft(l: Listing | null): Draft {
  const d: Draft = {
    slug: l?.slug ?? "",
    name: l?.name ?? "",
    developer: l?.developer ?? "",
    category: l?.category ?? "",
    partOf: l?.partOf ?? "",
    location: l?.location ?? "",
    status: l?.status ?? "Selling Now",
    tagline: l?.tagline ?? "",
    summary: l?.summary ?? "",
    heroImage: l?.heroImage ?? "",
    cardImage: l?.cardImage ?? "",
    startingPrice: l?.startingPrice ?? "",
    paymentNote: l?.paymentNote ?? "",
    brochureUrl: l?.brochureUrl ?? "",
    sitemap: l?.sitemap ? JSON.stringify(l.sitemap, null, 2) : "",
    active: l?.active ?? true,
  };
  for (const f of JSON_FIELDS) {
    const v = l?.[f.key as keyof Listing];
    d[f.key] = v && Array.isArray(v) && v.length > 0 ? JSON.stringify(v, null, 2) : "[]";
  }
  return d;
}

function fromDraft(d: Draft): Record<string, unknown> {
  const out: Record<string, unknown> = {
    slug: d.slug,
    name: d.name,
    developer: d.developer,
    category: d.category,
    partOf: d.partOf || null,
    location: d.location,
    status: d.status,
    tagline: d.tagline,
    summary: d.summary,
    heroImage: d.heroImage,
    cardImage: d.cardImage,
    startingPrice: d.startingPrice || null,
    paymentNote: d.paymentNote || null,
    brochureUrl: d.brochureUrl,
    active: d.active,
  };
  for (const f of JSON_FIELDS) {
    const raw = String(d[f.key] ?? "[]").trim();
    const parsed = JSON.parse(raw || "[]");
    if (!Array.isArray(parsed)) throw new Error(`${f.label} must be a JSON array`);
    out[f.key] = parsed;
  }
  const sitemapRaw = String(d.sitemap ?? "").trim();
  out.sitemap = sitemapRaw ? JSON.parse(sitemapRaw) : null;
  return out;
}

export function ExclusivePage() {
  const [items, setItems] = useState<Listing[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(toDraft(null));
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api<{ data: Listing[] }>("/api/v1/admin/exclusive");
      setItems(res.data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function close() {
    setEditing(null);
    setCreating(false);
    setErr(null);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      const body = fromDraft(draft);
      if (creating) {
        await api("/api/v1/admin/exclusive", { method: "POST", body: JSON.stringify(body) });
      } else if (editing) {
        await api(`/api/v1/admin/exclusive/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      }
      close();
      await load();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Save failed — check JSON fields");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(l: Listing) {
    if (!window.confirm(`Delete "${l.name}"?`)) return;
    try {
      await api(`/api/v1/admin/exclusive/${l.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const set = (key: string, value: string | boolean) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const modalOpen = creating || editing !== null;

  return (
    <div>
      <div className="page-header page-header-row">
        <div>
          <h1>Exclusive Listings</h1>
          <p>Developments and clusters featured in the Exclusive section</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setDraft(toDraft(null));
            setCreating(true);
          }}
        >
          + New listing
        </button>
      </div>

      {err && !modalOpen ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Listing</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Visible</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((l) => (
                <tr key={l.id}>
                  <td style={{ width: 56 }}>
                    {l.cardImage ? (
                      <img className="row-thumb" src={imagePreviewUrl(l.cardImage)} alt="" />
                    ) : (
                      <div className="row-thumb row-thumb-empty" />
                    )}
                  </td>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{l.name}</td>
                  <td>{l.category}</td>
                  <td>{l.location}</td>
                  <td><span className="badge badge-pending">{l.status}</span></td>
                  <td>
                    <span className={`badge ${l.active ? "badge-published" : "badge-archived"}`}>
                      {l.active ? "Active" : "Hidden"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      className="btn-link"
                      onClick={() => {
                        setDraft(toDraft(l));
                        setEditing(l);
                      }}
                    >
                      Edit
                    </button>
                    <button type="button" className="btn-link btn-link-danger" onClick={() => onDelete(l)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>No exclusive listings yet.</p></div>
        ) : null}
      </div>

      {modalOpen ? (
        <Modal title={creating ? "New exclusive listing" : `Edit: ${editing?.name}`} onClose={close} wide>
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="field">
                <label>Name</label>
                <input value={String(draft.name)} required onChange={(e) => set("name", e.target.value)} />
              </div>
              <div className="field">
                <label>Slug</label>
                <input
                  value={String(draft.slug)}
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  onChange={(e) => set("slug", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Developer</label>
                <input value={String(draft.developer)} onChange={(e) => set("developer", e.target.value)} />
              </div>
              <div className="field">
                <label>Category</label>
                <input
                  value={String(draft.category)}
                  placeholder="Residential Cluster"
                  onChange={(e) => set("category", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Location</label>
                <input value={String(draft.location)} onChange={(e) => set("location", e.target.value)} />
              </div>
              <div className="field">
                <label>Status label</label>
                <input value={String(draft.status)} onChange={(e) => set("status", e.target.value)} />
              </div>
              <div className="field">
                <label>Part of (parent slug)</label>
                <input
                  value={String(draft.partOf)}
                  placeholder="devtraco-woodlands"
                  onChange={(e) => set("partOf", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Starting price</label>
                <input
                  value={String(draft.startingPrice)}
                  placeholder="From $12,000"
                  onChange={(e) => set("startingPrice", e.target.value)}
                />
              </div>
            </div>

            <div className="field" style={{ marginTop: "1rem" }}>
              <label>Tagline</label>
              <input value={String(draft.tagline)} onChange={(e) => set("tagline", e.target.value)} />
            </div>
            <div className="field" style={{ marginTop: "1rem" }}>
              <label>Summary</label>
              <textarea rows={3} value={String(draft.summary)} onChange={(e) => set("summary", e.target.value)} />
            </div>
            <div className="field" style={{ marginTop: "1rem" }}>
              <label>Payment note</label>
              <textarea rows={2} value={String(draft.paymentNote)} onChange={(e) => set("paymentNote", e.target.value)} />
            </div>

            <div className="form-grid" style={{ marginTop: "1rem" }}>
              <ImageField label="Hero image" value={String(draft.heroImage)} onChange={(v) => set("heroImage", v)} />
              <ImageField label="Card image" value={String(draft.cardImage)} onChange={(v) => set("cardImage", v)} />
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <GalleryField
                label="Gallery images"
                value={String(draft.gallery)}
                onChange={(v) => set("gallery", v)}
                hint="Upload, reorder, rename or delete the photos shown in this listing's gallery."
              />
            </div>

            <div className="field" style={{ marginTop: "1rem" }}>
              <label>Brochure URL (PDF)</label>
              <input
                value={String(draft.brochureUrl)}
                placeholder="/brochures/…pdf"
                onChange={(e) => set("brochureUrl", e.target.value)}
              />
            </div>

            <details className="json-details" style={{ marginTop: "1.25rem" }}>
              <summary>Structured content (JSON)</summary>
              {JSON_FIELDS.filter((f) => f.key !== "gallery").map((f) => (
                <div key={f.key} className="field" style={{ marginTop: "1rem" }}>
                  <label>{f.label}</label>
                  <textarea
                    rows={5}
                    className="mono"
                    value={String(draft[f.key])}
                    placeholder={f.hint}
                    onChange={(e) => set(f.key, e.target.value)}
                  />
                  <p className="hint">Example: {f.hint}</p>
                </div>
              ))}
              <div className="field" style={{ marginTop: "1rem" }}>
                <label>Sitemap image (JSON object or empty)</label>
                <textarea
                  rows={3}
                  className="mono"
                  value={String(draft.sitemap)}
                  placeholder='{"src": "/images/…", "alt": "Site plan"}'
                  onChange={(e) => set("sitemap", e.target.value)}
                />
              </div>
            </details>

            <label className="check-row" style={{ marginTop: "1rem" }}>
              <input
                type="checkbox"
                checked={Boolean(draft.active)}
                onChange={(e) => set("active", e.target.checked)}
              />
              Visible on site
            </label>

            {err ? <p className="err" style={{ marginTop: "1rem" }}>{err}</p> : null}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={close}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving…" : creating ? "Create listing" : "Save changes"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
