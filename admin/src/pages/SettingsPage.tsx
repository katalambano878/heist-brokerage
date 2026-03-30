import { type FormEvent, useEffect, useState } from "react";
import { api } from "../api";

type Settings = {
  storeName: string;
  contactEmail: string;
  currency: string;
  taxRate: string;
};

export function SettingsPage() {
  const [data, setData] = useState<Settings | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await api<Settings>("/api/v1/admin/settings");
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Failed");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!data) return;
    setErr(null);
    setSaved(false);
    setSaving(true);
    try {
      const d = await api<Settings>("/api/v1/admin/settings", {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      setData(d);
      setSaved(true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (!data && !err) return <div className="empty"><p>Loading settings...</p></div>;
  if (!data) return <p className="err" style={{ padding: "2rem" }}>{err}</p>;

  return (
    <div>
      <div className="page-header">
        <h1>Store settings</h1>
        <p>Configure your store name, contact, currency, and tax</p>
      </div>

      <form className="card" onSubmit={onSubmit} style={{ maxWidth: 560 }}>
        <div className="field">
          <label htmlFor="storeName">Store name</label>
          <input
            id="storeName"
            value={data.storeName}
            onChange={(e) => setData({ ...data, storeName: e.target.value })}
          />
        </div>
        <div className="field" style={{ marginTop: "1.25rem" }}>
          <label htmlFor="contactEmail">Contact email</label>
          <input
            id="contactEmail"
            type="email"
            value={data.contactEmail}
            onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.25rem" }}>
          <div className="field">
            <label htmlFor="currency">Currency (ISO)</label>
            <input
              id="currency"
              value={data.currency}
              maxLength={3}
              onChange={(e) => setData({ ...data, currency: e.target.value.toUpperCase() })}
            />
          </div>
          <div className="field">
            <label htmlFor="taxRate">Tax rate</label>
            <input
              id="taxRate"
              value={data.taxRate}
              placeholder="e.g. 0.125"
              onChange={(e) => setData({ ...data, taxRate: e.target.value })}
            />
          </div>
        </div>
        {err ? <p className="err" style={{ marginTop: "1rem" }}>{err}</p> : null}
        {saved ? <p className="success-msg" style={{ marginTop: "1rem" }}>Settings saved successfully.</p> : null}
        <div style={{ marginTop: "1.75rem" }}>
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
