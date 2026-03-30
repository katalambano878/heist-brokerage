import { useEffect, useState } from "react";
import { api } from "../api";

type Product = {
  id: string;
  title: string;
  slug: string;
  status: string;
  price: string;
};

function badgeClass(status: string) {
  return `badge badge-${status.toLowerCase()}`;
}

export function ProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api<{ data: Product[] }>("/api/v1/admin/products?limit=50");
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
        <h1>Products</h1>
        <p>Manage your catalog</p>
      </div>

      {err ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Slug</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{p.title}</td>
                  <td className="mono">{p.slug}</td>
                  <td><span className={badgeClass(p.status)}>{p.status}</span></td>
                  <td style={{ textAlign: "right" }} className="mono">
                    GHS {Number(p.price).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>No products yet. Add one via the API.</p></div>
        ) : null}
      </div>
    </div>
  );
}
