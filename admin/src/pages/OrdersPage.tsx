import { useEffect, useState } from "react";
import { api } from "../api";

type Order = {
  id: string;
  status: string;
  total: string;
  currency: string;
  createdAt: string;
};

function badgeClass(status: string) {
  return `badge badge-${status.toLowerCase()}`;
}

export function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api<{ data: Order[] }>("/api/v1/admin/orders?limit=50");
        if (!cancelled) setItems(res.data);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Failed");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>Orders</h1>
        <p>Track and manage incoming orders</p>
      </div>

      {err ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id}>
                  <td className="mono" style={{ color: "var(--text)" }}>
                    {o.id.slice(0, 8)}...
                  </td>
                  <td><span className={badgeClass(o.status)}>{o.status}</span></td>
                  <td style={{ textAlign: "right" }} className="mono">
                    {Number(o.total).toLocaleString()} {o.currency}
                  </td>
                  <td style={{ color: "var(--muted)" }}>
                    {new Date(o.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>No orders yet.</p></div>
        ) : null}
      </div>
    </div>
  );
}
