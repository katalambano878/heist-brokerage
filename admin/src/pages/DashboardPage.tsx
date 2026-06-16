import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

type RecentLead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
  property?: { id: string; title: string } | null;
};

type Stats = {
  propertiesTotal: number;
  propertiesPublished: number;
  leadsTotal: number;
  leadsNew: number;
  leadsLast30: number;
  teamCount: number;
  exclusiveCount: number;
  recentLeads: RecentLead[];
};

function badgeClass(status: string) {
  return `badge badge-${status.toLowerCase()}`;
}

export function DashboardPage() {
  const [data, setData] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [publishMsg, setPublishMsg] = useState<string | null>(null);

  async function onPublish() {
    setPublishing(true);
    setPublishMsg(null);
    try {
      const res = await api<{ ok: boolean; message?: string }>(
        "/api/v1/admin/publish",
        { method: "POST" },
      );
      setPublishMsg(res.message ?? "Publish started. The live site rebuilds shortly.");
    } catch (e) {
      setPublishMsg(e instanceof Error ? e.message : "Publish failed");
    } finally {
      setPublishing(false);
    }
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await api<Stats>("/api/v1/admin/dashboard");
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div className="page-header page-header-row">
        <div>
          <h1>Dashboard</h1>
          <p>Heist Brokerage &amp; Construction at a glance</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            type="button"
            className="btn-primary"
            onClick={onPublish}
            disabled={publishing}
          >
            {publishing ? "Publishing…" : "Publish to live site"}
          </button>
          {publishMsg ? (
            <p className="hint" style={{ marginTop: "0.5rem", maxWidth: 280 }}>
              {publishMsg}
            </p>
          ) : null}
        </div>
      </div>

      <p className="hint" style={{ marginTop: "-0.5rem", marginBottom: "1.5rem" }}>
        Changes you make here go live on heistbrokerage.com after you click
        “Publish to live site” (the site rebuilds in about 1-2 minutes).
      </p>

      {err ? <p className="err">{err}</p> : null}

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-label">New leads</p>
          <p className="stat-value">{data ? data.leadsNew : "—"}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Leads (30 days)</p>
          <p className="stat-value">{data ? data.leadsLast30 : "—"}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Published properties</p>
          <p className="stat-value">
            {data ? `${data.propertiesPublished} / ${data.propertiesTotal}` : "—"}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Exclusive listings</p>
          <p className="stat-value">{data ? data.exclusiveCount : "—"}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h2>Recent leads</h2>
          <Link to="/leads" className="btn-secondary">View all</Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Interest</th>
                <th>Source</th>
                <th>Status</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {data?.recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ color: "var(--muted)", textAlign: "center", padding: "2rem" }}>
                    No leads yet — they appear here when visitors submit the contact form.
                  </td>
                </tr>
              ) : (
                data?.recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 500, color: "var(--text)" }}>{lead.name}</td>
                    <td className="mono">{lead.phone || lead.email || "—"}</td>
                    <td>{lead.property?.title ?? "General"}</td>
                    <td className="mono">{lead.source.replace("_", " ").toLowerCase()}</td>
                    <td><span className={badgeClass(lead.status)}>{lead.status}</span></td>
                    <td className="mono">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
