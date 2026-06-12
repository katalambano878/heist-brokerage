import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api, getSessionUser } from "../api";
import { Modal } from "../components/Modal";

type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF";
  active: boolean;
  createdAt: string;
};

type Draft = {
  email: string;
  name: string;
  role: AdminUser["role"];
  password: string;
  active: boolean;
};

const emptyDraft: Draft = { email: "", name: "", role: "STAFF", password: "", active: true };

export function UsersPage() {
  const me = getSessionUser();
  const [items, setItems] = useState<AdminUser[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api<{ data: AdminUser[] }>("/api/v1/admin/users");
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
      if (creating) {
        await api("/api/v1/admin/users", {
          method: "POST",
          body: JSON.stringify({
            email: draft.email,
            name: draft.name || undefined,
            role: draft.role,
            password: draft.password,
          }),
        });
      } else if (editing) {
        await api(`/api/v1/admin/users/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            name: draft.name || undefined,
            role: draft.role,
            active: draft.active,
            ...(draft.password ? { password: draft.password } : {}),
          }),
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

  async function onDelete(u: AdminUser) {
    if (!window.confirm(`Delete admin "${u.email}"?`)) return;
    try {
      await api(`/api/v1/admin/users/${u.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const modalOpen = creating || editing !== null;

  return (
    <div>
      <div className="page-header page-header-row">
        <div>
          <h1>Admin users</h1>
          <p>People who can sign in to this console</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setDraft(emptyDraft);
            setCreating(true);
          }}
        >
          + New user
        </button>
      </div>

      {err && !modalOpen ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((u) => (
                <tr key={u.id}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }} className="mono">{u.email}</td>
                  <td>{u.name ?? "—"}</td>
                  <td><span className="badge badge-pending">{u.role.replace("_", " ")}</span></td>
                  <td>
                    <span className={`badge ${u.active ? "badge-published" : "badge-archived"}`}>
                      {u.active ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="mono">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      className="btn-link"
                      onClick={() => {
                        setDraft({
                          email: u.email,
                          name: u.name ?? "",
                          role: u.role,
                          password: "",
                          active: u.active,
                        });
                        setEditing(u);
                      }}
                    >
                      Edit
                    </button>
                    {u.id !== me?.id ? (
                      <button type="button" className="btn-link btn-link-danger" onClick={() => onDelete(u)}>
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen ? (
        <Modal title={creating ? "New admin user" : `Edit: ${editing?.email}`} onClose={close}>
          <form onSubmit={onSubmit}>
            {creating ? (
              <div className="field" style={{ marginBottom: "1rem" }}>
                <label>Email</label>
                <input
                  type="email"
                  required
                  value={draft.email}
                  onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                />
              </div>
            ) : null}
            <div className="field" style={{ marginBottom: "1rem" }}>
              <label>Name</label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
              />
            </div>
            <div className="field" style={{ marginBottom: "1rem" }}>
              <label>Role</label>
              <select
                value={draft.role}
                onChange={(e) => setDraft((d) => ({ ...d, role: e.target.value as Draft["role"] }))}
              >
                <option value="STAFF">Staff</option>
                <option value="ADMIN">Admin</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>
            <div className="field" style={{ marginBottom: "1rem" }}>
              <label>{creating ? "Password" : "New password (leave blank to keep)"}</label>
              <input
                type="password"
                minLength={8}
                required={creating}
                value={draft.password}
                onChange={(e) => setDraft((d) => ({ ...d, password: e.target.value }))}
              />
            </div>
            {!creating ? (
              <label className="check-row" style={{ marginBottom: "1rem" }}>
                <input
                  type="checkbox"
                  checked={draft.active}
                  onChange={(e) => setDraft((d) => ({ ...d, active: e.target.checked }))}
                />
                Account active
              </label>
            ) : null}

            {err ? <p className="err">{err}</p> : null}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={close}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving…" : creating ? "Create user" : "Save changes"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
