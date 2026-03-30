import { useEffect, useState } from "react";
import { api } from "../api";

type Summary = {
  periodDays: number;
  revenue30d: string;
  ordersByStatus: { status: string; _count: { id: number } }[];
  topProducts?: { productId: string; _sum: { quantity: number }; product?: { title: string } }[];
};

function badgeClass(status: string) {
  return `badge badge-${status.toLowerCase()}`;
}

export function DashboardPage() {
  const [data, setData] = useState<Summary | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await api<Summary>("/api/v1/admin/analytics/summary");
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const totalOrders = data?.ordersByStatus.reduce((s, o) => s + o._count.id, 0) ?? 0;

  return (
    <div>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Last {data?.periodDays ?? 30} days at a glance</p>
      </div>

      {err ? <p className="err">{err}</p> : null}

      <div className="stat-grid">
        <div className="stat-card">
          <p className="stat-label">Revenue</p>
          <p className="stat-value">
            {data ? `GHS ${Number(data.revenue30d).toLocaleString()}` : "—"}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Orders</p>
          <p className="stat-value">{data ? totalOrders : "—"}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pending</p>
          <p className="stat-value">
            {data
              ? data.ordersByStatus.find((o) => o.status === "PENDING")?._count.id ?? 0
              : "—"}
          </p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Delivered</p>
          <p className="stat-value">
            {data
              ? data.ordersByStatus.find((o) => o.status === "DELIVERED")?._count.id ?? 0
              : "—"}
          </p>
        </div>
      </div>

      {data ? (
        <div className="card">
          <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem", color: "var(--text-secondary)" }}>
            Orders by status
          </h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {data.ordersByStatus.length === 0 ? (
                  <tr><td colSpan={2} style={{ color: "var(--muted)", textAlign: "center", padding: "2rem" }}>No orders yet</td></tr>
                ) : (
                  data.ordersByStatus.map((o) => (
                    <tr key={o.status}>
                      <td><span className={badgeClass(o.status)}>{o.status}</span></td>
                      <td className="mono">{o._count.id}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : !err ? (
        <div className="empty"><p>Loading analytics...</p></div>
      ) : null}
    </div>
  );
}
