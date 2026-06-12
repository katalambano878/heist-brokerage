import { type FormEvent, useEffect, useState } from "react";
import { api } from "../api";

type TrustStat = { label: string; target: number; suffix?: string };

type Settings = {
  phones: string[];
  whatsapp: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  email: string;
  instagram: string;
  tiktok: string;
  facebook: string;
  trustStats: TrustStat[];
};

const empty: Settings = {
  phones: [],
  whatsapp: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  email: "",
  instagram: "",
  tiktok: "",
  facebook: "",
  trustStats: [],
};

export function SettingsPage() {
  const [data, setData] = useState<Settings>(empty);
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await api<Partial<Settings>>("/api/v1/admin/settings");
        if (!cancelled) {
          setData({ ...empty, ...d });
          setLoaded(true);
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "Failed");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setSaved(false);
    setSaving(true);
    try {
      const d = await api<Settings>("/api/v1/admin/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setData({ ...empty, ...d });
      setSaved(true);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function setStat(i: number, patch: Partial<TrustStat>) {
    setData((d) => ({
      ...d,
      trustStats: d.trustStats.map((s, j) => (j === i ? { ...s, ...patch } : s)),
    }));
  }

  if (!loaded && !err) return <div className="empty"><p>Loading settings…</p></div>;

  return (
    <div>
      <div className="page-header">
        <h1>Site settings</h1>
        <p>Contact details, social links, and homepage stats</p>
      </div>

      <form onSubmit={onSubmit} style={{ maxWidth: 720 }}>
        <div className="card">
          <p className="section-label">Contact</p>
          <div className="form-grid">
            <div className="field">
              <label>Phone numbers (comma-separated)</label>
              <input
                value={data.phones.join(", ")}
                onChange={(e) =>
                  setData({
                    ...data,
                    phones: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
            <div className="field">
              <label>WhatsApp number (international)</label>
              <input
                value={data.whatsapp}
                placeholder="233203436540"
                onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className="field">
              <label>Address line 1</label>
              <input value={data.addressLine1} onChange={(e) => setData({ ...data, addressLine1: e.target.value })} />
            </div>
            <div className="field">
              <label>Address line 2</label>
              <input value={data.addressLine2} onChange={(e) => setData({ ...data, addressLine2: e.target.value })} />
            </div>
            <div className="field">
              <label>City</label>
              <input value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: "1rem" }}>
          <p className="section-label">Social links</p>
          <div className="field" style={{ marginBottom: "1rem" }}>
            <label>Instagram</label>
            <input value={data.instagram} onChange={(e) => setData({ ...data, instagram: e.target.value })} />
          </div>
          <div className="field" style={{ marginBottom: "1rem" }}>
            <label>TikTok</label>
            <input value={data.tiktok} onChange={(e) => setData({ ...data, tiktok: e.target.value })} />
          </div>
          <div className="field">
            <label>Facebook</label>
            <input value={data.facebook} onChange={(e) => setData({ ...data, facebook: e.target.value })} />
          </div>
        </div>

        <div className="card" style={{ marginTop: "1rem" }}>
          <p className="section-label">Homepage trust stats</p>
          {data.trustStats.map((s, i) => (
            <div key={i} className="stat-edit-row">
              <input
                value={s.label}
                placeholder="Label"
                onChange={(e) => setStat(i, { label: e.target.value })}
              />
              <input
                type="number"
                value={s.target}
                placeholder="Number"
                onChange={(e) => setStat(i, { target: Number(e.target.value) })}
              />
              <input
                value={s.suffix ?? ""}
                placeholder="Suffix (+, %)"
                onChange={(e) => setStat(i, { suffix: e.target.value })}
              />
              <button
                type="button"
                className="btn-link btn-link-danger"
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    trustStats: d.trustStats.filter((_, j) => j !== i),
                  }))
                }
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            style={{ marginTop: "0.5rem" }}
            onClick={() =>
              setData((d) => ({
                ...d,
                trustStats: [...d.trustStats, { label: "", target: 0, suffix: "+" }],
              }))
            }
          >
            + Add stat
          </button>
        </div>

        {err ? <p className="err" style={{ marginTop: "1rem" }}>{err}</p> : null}
        {saved ? <p className="success-msg" style={{ marginTop: "1rem" }}>Settings saved.</p> : null}

        <div style={{ marginTop: "1.25rem" }}>
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
