import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import { Modal } from "../components/Modal";

const STATUSES = [
  "NEW",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEW",
  "HIRED",
  "REJECTED",
] as const;
type Status = (typeof STATUSES)[number];

type Application = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  message: string;
  status: Status;
  createdAt: string;
};

function badgeClass(status: string) {
  return `badge badge-app-${status.toLowerCase()}`;
}

export function ApplicationsPage() {
  const [items, setItems] = useState<Application[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [selected, setSelected] = useState<Application | null>(null);

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter) params.set("status", filter);
      if (q) params.set("q", q);
      const res = await api<{ data: Application[] }>(
        `/api/v1/admin/applications?${params}`,
      );
      setItems(res.data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }, [filter, q]);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(status: Status) {
    if (!selected) return;
    try {
      await api(`/api/v1/admin/applications/${selected.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setSelected({ ...selected, status });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Update failed");
    }
  }

  async function onDelete(application: Application) {
    if (!window.confirm(`Delete application from "${application.fullName}"?`)) return;
    try {
      await api(`/api/v1/admin/applications/${application.id}`, { method: "DELETE" });
      setSelected(null);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Applications</h1>
        <p>Job applications submitted from the careers page</p>
      </div>

      <div className="toolbar">
        <input
          className="toolbar-search"
          placeholder="Search name, email, phone, role…"
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
                <th>Applicant</th>
                <th>Position</th>
                <th>Contact</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {items.map((app) => (
                <tr key={app.id} className="row-click" onClick={() => setSelected(app)}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{app.fullName}</td>
                  <td>{app.position || "General"}</td>
                  <td className="mono">{app.phone || app.email || "—"}</td>
                  <td>{app.experience || "—"}</td>
                  <td><span className={badgeClass(app.status)}>{app.status}</span></td>
                  <td className="mono">{new Date(app.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>No applications match this view.</p></div>
        ) : null}
      </div>

      {selected ? (
        <Modal title={`Application — ${selected.fullName}`} onClose={() => setSelected(null)} wide>
          <div>
            <p className="section-label">Details</p>
            <dl className="detail-list">
              <div><dt>Position</dt><dd>{selected.position || "General application"}</dd></div>
              <div><dt>Phone</dt><dd className="mono">{selected.phone || "—"}</dd></div>
              <div><dt>Email</dt><dd className="mono">{selected.email || "—"}</dd></div>
              <div><dt>Experience</dt><dd>{selected.experience || "—"}</dd></div>
              <div>
                <dt>CV / Link</dt>
                <dd>
                  {selected.portfolio ? (
                    <a href={selected.portfolio} target="_blank" rel="noopener noreferrer">
                      {selected.portfolio}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div><dt>Received</dt><dd>{new Date(selected.createdAt).toLocaleString()}</dd></div>
            </dl>

            {selected.message ? (
              <>
                <p className="section-label" style={{ marginTop: "1rem" }}>Cover note</p>
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

          <div className="modal-actions">
            <button
              type="button"
              className="btn-link btn-link-danger"
              onClick={() => onDelete(selected)}
            >
              Delete application
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
