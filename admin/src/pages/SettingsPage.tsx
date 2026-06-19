import { type FormEvent, useEffect, useState } from "react";
import { api } from "../api";
import { ImageField } from "../components/ImageField";

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
  aboutImage: string;
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
  aboutImage: "",
  trustStats: [],
};

const socialFields = [
  { key: "instagram" as const, label: "Instagram", placeholder: "https://instagram.com/…" },
  { key: "tiktok" as const, label: "TikTok", placeholder: "https://tiktok.com/@…" },
  { key: "facebook" as const, label: "Facebook", placeholder: "https://facebook.com/…" },
];

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
    <div className="settings-page">
      <div className="page-header">
        <h1>Site settings</h1>
        <p>Contact details, social links, and homepage stats shown on heistbrokerage.com</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="settings-grid">
          <div className="card settings-card">
            <div className="settings-card-head">
              <div>
                <h2>Contact</h2>
                <p>Phone, email, and office address on the contact page and footer.</p>
              </div>
            </div>
            <div className="form-grid">
              <div className="field field-span-2">
                <label>Phone numbers</label>
                <input
                  value={data.phones.join(", ")}
                  placeholder="0243889512, 0203436540"
                  onChange={(e) =>
                    setData({
                      ...data,
                      phones: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                />
                <span className="hint">Separate multiple numbers with commas</span>
              </div>
              <div className="field">
                <label>WhatsApp</label>
                <input
                  value={data.whatsapp}
                  placeholder="233203436540"
                  onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
                />
                <span className="hint">International format, no + sign</span>
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={data.email}
                  placeholder="info@heistbrokerage.com"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="field field-span-2">
                <label>Address line 1</label>
                <input
                  value={data.addressLine1}
                  placeholder="Nmai Dzorn Papafio Rd"
                  onChange={(e) => setData({ ...data, addressLine1: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Address line 2</label>
                <input
                  value={data.addressLine2}
                  placeholder="Nanakrom-East Legon Hills"
                  onChange={(e) => setData({ ...data, addressLine2: e.target.value })}
                />
              </div>
              <div className="field">
                <label>City</label>
                <input
                  value={data.city}
                  placeholder="Accra, Ghana"
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="card settings-card">
            <div className="settings-card-head">
              <div>
                <h2>Social links</h2>
                <p>Full profile URLs linked from the site footer.</p>
              </div>
            </div>
            <div className="social-fields">
              {socialFields.map(({ key, label, placeholder }) => (
                <div key={key} className="field social-field">
                  <label>{label}</label>
                  <input
                    value={data[key]}
                    placeholder={placeholder}
                    onChange={(e) => setData({ ...data, [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="card settings-card">
            <div className="settings-card-head">
              <div>
                <h2>Homepage image</h2>
                <p>Photo shown in the “Heist Mentality” section on the homepage.</p>
              </div>
            </div>
            <ImageField
              label="Heist Mentality photo"
              value={data.aboutImage}
              onChange={(url) => setData({ ...data, aboutImage: url })}
              variant="dropzone"
              hint="Portrait orientation works best (roughly 700×1024)."
            />
          </div>

          <div className="card settings-card settings-card-wide">
            <div className="settings-card-head">
              <div>
                <h2>Homepage trust stats</h2>
                <p>Numbers animated on the homepage — label, value, and suffix (+, %, etc.).</p>
              </div>
              <button
                type="button"
                className="btn-secondary"
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

            {data.trustStats.length === 0 ? (
              <div className="empty empty-compact">
                <p>No stats yet. Add the counters shown on your homepage.</p>
              </div>
            ) : (
              <div className="trust-stats-table">
                <div className="trust-stats-head">
                  <span>Label</span>
                  <span>Value</span>
                  <span>Suffix</span>
                  <span></span>
                </div>
                {data.trustStats.map((s, i) => (
                  <div key={i} className="trust-stats-row">
                    <input
                      value={s.label}
                      placeholder="Regions served"
                      onChange={(e) => setStat(i, { label: e.target.value })}
                    />
                    <input
                      type="number"
                      value={s.target}
                      placeholder="6"
                      onChange={(e) => setStat(i, { target: Number(e.target.value) })}
                    />
                    <input
                      value={s.suffix ?? ""}
                      placeholder="+"
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
              </div>
            )}
          </div>
        </div>

        <div className="settings-footer">
          <div className="settings-footer-inner">
            <div>
              {err ? <p className="err">{err}</p> : null}
              {saved ? <p className="success-msg">Settings saved successfully.</p> : null}
              {!err && !saved ? (
                <p className="hint">Changes apply to the public site after you publish from the dashboard.</p>
              ) : null}
            </div>
            <button className="btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
