import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { Modal } from "../components/Modal";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "VIEWING", "NEGOTIATING", "WON", "LOST"] as const;
type Status = (typeof STATUSES)[number];

type Note = {
  id: string;
  body: string;
  createdAt: string;
  author?: { id: string; name?: string | null; email: string } | null;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  source: string;
  status: Status;
  createdAt: string;
  property?: { id: string; title: string; slug: string } | null;
  notes?: Note[];
};

function badgeClass(status: string) {
  return `badge badge-${status.toLowerCase()}`;
}

export function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter) params.set("status", filter);
      if (q) params.set("q", q);
      const res = await api<{ data: Lead[] }>(`/api/v1/admin/leads?${params}`);
      setItems(res.data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }, [filter, q]);

  useEffect(() => {
    void load();
  }, [load]);

  async function openLead(id: string) {
    try {
      const lead = await api<Lead>(`/api/v1/admin/leads/${id}`);
      setSelected(lead);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load lead");
    }
  }

  async function setStatus(status: Status) {
    if (!selected) return;
    try {
      await api(`/api/v1/admin/leads/${selected.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setSelected({ ...selected, status });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function addNote() {
    if (!selected || !noteDraft.trim()) return;
    try {
      await api(`/api/v1/admin/leads/${selected.id}/notes`, {
        method: "POST",
        body: JSON.stringify({ body: noteDraft.trim() }),
      });
      setNoteDraft("");
      await openLead(selected.id);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Note failed");
    }
  }

  async function onDelete(lead: Lead) {
    if (!window.confirm(`Delete lead from "${lead.name}"?`)) return;
    try {
      await api(`/api/v1/admin/leads/${lead.id}`, { method: "DELETE" });
      setSelected(null);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Leads</h1>
        <p>Enquiries from the website contact form and listings</p>
      </div>

      <div className="toolbar">
        <input
          className="toolbar-search"
          placeholder="Search name, email, phone…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {err ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Interest</th>
                <th>Source</th>
                <th>Status</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {items.map((lead) => (
                <tr key={lead.id} className="row-click" onClick={() => openLead(lead.id)}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{lead.name}</td>
                  <td className="mono">{lead.phone || lead.email || "—"}</td>
                  <td>{lead.property?.title ?? "General"}</td>
                  <td className="mono">{lead.source.replace(/_/g, " ").toLowerCase()}</td>
                  <td><span className={badgeClass(lead.status)}>{lead.status}</span></td>
                  <td className="mono">{new Date(lead.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>No leads match this view.</p></div>
        ) : null}
      </div>

      {selected ? (
        <Modal title={`Lead — ${selected.name}`} onClose={() => setSelected(null)} wide>
          <div className="lead-grid">
            <div>
              <p className="section-label">Details</p>
              <dl className="detail-list">
                <div><dt>Phone</dt><dd className="mono">{selected.phone || "—"}</dd></div>
                <div><dt>Email</dt><dd className="mono">{selected.email || "—"}</dd></div>
                <div><dt>Interest</dt><dd>{selected.property?.title ?? "General enquiry"}</dd></div>
                <div><dt>Source</dt><dd>{selected.source.replace(/_/g, " ").toLowerCase()}</dd></div>
                <div><dt>Received</dt><dd>{new Date(selected.createdAt).toLocaleString()}</dd></div>
              </dl>
              {selected.message ? (
                <>
                  <p className="section-label" style={{ marginTop: "1rem" }}>Message</p>
                  <p className="lead-message">{selected.message}</p>
                </>
              ) : null}

              <p className="section-label" style={{ marginTop: "1.25rem" }}>Status</p>
              <div className="status-row">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`status-chip ${selected.status === s ? "status-chip-active" : ""}`}
                    onClick={() => setStatus(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="section-label">Notes</p>
              <div className="notes-list">
                {(selected.notes ?? []).length === 0 ? (
                  <p className="hint">No notes yet.</p>
                ) : (
                  selected.notes!.map((n) => (
                    <div key={n.id} className="note">
                      <p>{n.body}</p>
                      <span className="note-meta">
                        {n.author?.name ?? n.author?.email ?? "Unknown"} ·{" "}
                        {new Date(n.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
              <div className="field" style={{ marginTop: "0.75rem" }}>
                <textarea
                  rows={3}
                  placeholder="Add a note about this lead…"
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn-secondary"
                style={{ marginTop: "0.5rem" }}
                disabled={!noteDraft.trim()}
                onClick={addNote}
              >
                Add note
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-link btn-link-danger"
              onClick={() => onDelete(selected)}
            >
              Delete lead
            </button>
            <button type="button" className="btn-secondary" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
