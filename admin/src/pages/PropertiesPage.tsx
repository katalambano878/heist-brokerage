import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api, imagePreviewUrl } from "../api";
import { ImageField } from "../components/ImageField";
import { Modal } from "../components/Modal";

type PropertyImage = { id: string; url: string; alt: string; sortOrder: number };

type Property = {
  id: string;
  title: string;
  slug: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  tag: string;
  type: string;
  category: "sale" | "rent" | "land";
  region: string;
  description: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured: boolean;
  images: PropertyImage[];
};

type Draft = Omit<Property, "id" | "images">;

const emptyDraft: Draft = {
  title: "",
  slug: "",
  location: "",
  price: "",
  beds: 0,
  baths: 0,
  sqft: "",
  tag: "",
  type: "",
  category: "sale",
  region: "",
  description: "",
  status: "DRAFT",
  featured: false,
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function PropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<Property | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [pendingImages, setPendingImages] = useState<string[]>([]);

  const load = useCallback(async () => {
    try {
      const res = await api<{ data: Property[] }>("/api/v1/admin/properties");
      setItems(res.data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setDraft(emptyDraft);
    setPendingImages([]);
    setNewImage("");
    setCreating(true);
    setEditing(null);
  }

  function openEdit(p: Property) {
    const { id: _id, images: _images, ...rest } = p;
    setDraft(rest);
    setPendingImages([]);
    setNewImage("");
    setEditing(p);
    setCreating(false);
  }

  function close() {
    setEditing(null);
    setCreating(false);
    setNewImage("");
    setPendingImages([]);
    setErr(null);
  }

  async function attachImages(propertyId: string, urls: string[], alt: string) {
    for (const url of urls) {
      if (!url.trim()) continue;
      await api(`/api/v1/admin/properties/${propertyId}/images`, {
        method: "POST",
        body: JSON.stringify({ url, alt }),
      });
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      if (creating) {
        const created = await api<Property>("/api/v1/admin/properties", {
          method: "POST",
          body: JSON.stringify(draft),
        });
        const urls = [...pendingImages, newImage].filter(Boolean);
        if (urls.length) {
          await attachImages(created.id, urls, draft.title);
        }
      } else if (editing) {
        await api(`/api/v1/admin/properties/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(draft),
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

  async function onDelete(p: Property) {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      await api(`/api/v1/admin/properties/${p.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  function handleNewImage(url: string) {
    if (creating && url.trim()) {
      setPendingImages((prev) => [...prev, url]);
      setNewImage("");
      return;
    }
    setNewImage(url);
  }

  async function addImage() {
    if (!editing || !newImage) return;
    try {
      await api(`/api/v1/admin/properties/${editing.id}/images`, {
        method: "POST",
        body: JSON.stringify({ url: newImage, alt: editing.title }),
      });
      setNewImage("");
      const fresh = await api<Property>(`/api/v1/admin/properties/${editing.id}`);
      setEditing(fresh);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Image add failed");
    }
  }

  async function removeImage(imageId: string) {
    if (!editing) return;
    try {
      await api(`/api/v1/admin/properties/${editing.id}/images/${imageId}`, {
        method: "DELETE",
      });
      const fresh = await api<Property>(`/api/v1/admin/properties/${editing.id}`);
      setEditing(fresh);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Image delete failed");
    }
  }

  const modalOpen = creating || editing !== null;
  const galleryImages = creating ? pendingImages : (editing?.images ?? []);

  return (
    <div>
      <div className="page-header page-header-row">
        <div>
          <h1>Properties</h1>
          <p>Listings shown on the public site</p>
        </div>
        <button type="button" className="btn-primary" onClick={openCreate}>
          + New property
        </button>
      </div>

      {err && !modalOpen ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Property</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Featured</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td style={{ width: 56 }}>
                    {p.images[0] ? (
                      <img className="row-thumb" src={imagePreviewUrl(p.images[0].url)} alt="" />
                    ) : (
                      <div className="row-thumb row-thumb-empty" />
                    )}
                  </td>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{p.title}</td>
                  <td>{p.location}</td>
                  <td className="mono">{p.price}</td>
                  <td><span className={`badge badge-${p.status.toLowerCase()}`}>{p.status}</span></td>
                  <td>{p.featured ? "★" : ""}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button type="button" className="btn-link" onClick={() => openEdit(p)}>Edit</button>
                    <button type="button" className="btn-link btn-link-danger" onClick={() => onDelete(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty"><p>No properties yet. Create your first one.</p></div>
        ) : null}
      </div>

      {modalOpen ? (
        <Modal title={creating ? "New property" : `Edit: ${editing?.title}`} onClose={close} wide xl>
          <form onSubmit={onSubmit} className="property-form">
            <div className="form-section">
              <div className="form-section-head">
                <h3>Overview</h3>
                <p>Title and description shown on the listing page.</p>
              </div>
              <div className="form-grid">
                <div className="field field-span-2">
                  <label>Title</label>
                  <input
                    value={draft.title}
                    required
                    placeholder="East Legon Hills Villa"
                    onChange={(e) =>
                      setDraft((d) => ({
                        ...d,
                        title: e.target.value,
                        slug: creating ? slugify(e.target.value) : d.slug,
                      }))
                    }
                  />
                </div>
                <div className="field">
                  <label>Slug</label>
                  <input
                    value={draft.slug}
                    required
                    pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                    onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Tag</label>
                  <input
                    value={draft.tag}
                    placeholder="New listing"
                    onChange={(e) => setDraft((d) => ({ ...d, tag: e.target.value }))}
                  />
                </div>
              </div>
              <div className="field" style={{ marginTop: "1rem" }}>
                <label>Description</label>
                <textarea
                  rows={4}
                  value={draft.description}
                  placeholder="Describe the property, highlights, and what makes it stand out…"
                  onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-head">
                <h3>Location & category</h3>
                <p>Used for search filters on the public site.</p>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Location</label>
                  <input
                    value={draft.location}
                    required
                    placeholder="East Legon Hills, Accra"
                    onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Region</label>
                  <input
                    value={draft.region}
                    placeholder="East Legon Hills"
                    onChange={(e) => setDraft((d) => ({ ...d, region: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <select
                    value={draft.category}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, category: e.target.value as Draft["category"] }))
                    }
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div className="field">
                  <label>Property type</label>
                  <input
                    value={draft.type}
                    placeholder="Detached Villa"
                    onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-head">
                <h3>Specs & pricing</h3>
                <p>Display values — use the format you want visitors to see.</p>
              </div>
              <div className="form-grid form-grid-4">
                <div className="field">
                  <label>Price</label>
                  <input
                    value={draft.price}
                    required
                    placeholder="GHS 8,950,000"
                    onChange={(e) => setDraft((d) => ({ ...d, price: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label>Beds</label>
                  <input
                    type="number"
                    min={0}
                    value={draft.beds}
                    onChange={(e) => setDraft((d) => ({ ...d, beds: Number(e.target.value) }))}
                  />
                </div>
                <div className="field">
                  <label>Baths</label>
                  <input
                    type="number"
                    min={0}
                    value={draft.baths}
                    onChange={(e) => setDraft((d) => ({ ...d, baths: Number(e.target.value) }))}
                  />
                </div>
                <div className="field">
                  <label>Sq Ft</label>
                  <input
                    value={draft.sqft}
                    placeholder="6,200"
                    onChange={(e) => setDraft((d) => ({ ...d, sqft: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-section-head">
                <h3>Photos</h3>
                <p>Upload a cover image and add more to the gallery. First image is used in listings.</p>
              </div>

              {galleryImages.length > 0 ? (
                <div className="gallery-grid gallery-grid-lg">
                  {creating
                    ? pendingImages.map((url, i) => (
                        <div key={`${url}-${i}`} className="gallery-item">
                          <img src={imagePreviewUrl(url)} alt="" />
                          {i === 0 ? <span className="gallery-cover-badge">Cover</span> : null}
                          <button
                            type="button"
                            className="gallery-remove"
                            onClick={() =>
                              setPendingImages((prev) => prev.filter((_, j) => j !== i))
                            }
                            aria-label="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    : editing?.images.map((img, i) => (
                        <div key={img.id} className="gallery-item">
                          <img src={imagePreviewUrl(img.url)} alt={img.alt} />
                          {i === 0 ? <span className="gallery-cover-badge">Cover</span> : null}
                          <button
                            type="button"
                            className="gallery-remove"
                            onClick={() => removeImage(img.id)}
                            aria-label="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                </div>
              ) : null}

              <div className="gallery-upload-row">
                <ImageField
                  label={creating ? "Add photos" : "Add to gallery"}
                  value={newImage}
                  onChange={handleNewImage}
                  variant="dropzone"
                  hint={
                    creating
                      ? "Upload one or more photos — they are saved when you create the property."
                      : "Upload here, then click Add to gallery."
                  }
                />
                {!creating ? (
                  <button
                    type="button"
                    className="btn-secondary gallery-add-btn"
                    disabled={!newImage}
                    onClick={addImage}
                  >
                    Add to gallery
                  </button>
                ) : null}
              </div>
            </div>

            <div className="form-section form-section-inline">
              <div>
                <div className="form-section-head">
                  <h3>Publishing</h3>
                  <p>Control visibility on the public website.</p>
                </div>
                <div className="field" style={{ maxWidth: 220 }}>
                  <label>Status</label>
                  <select
                    value={draft.status}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, status: e.target.value as Draft["status"] }))
                    }
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>
              <label className="featured-toggle">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
                />
                <span className="featured-toggle-ui" aria-hidden />
                <span className="featured-toggle-text">
                  <strong>Featured on homepage</strong>
                  <small>Show in the homepage featured listings carousel</small>
                </span>
              </label>
            </div>

            {err ? <p className="err">{err}</p> : null}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={close}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving…" : creating ? "Create property" : "Save changes"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
