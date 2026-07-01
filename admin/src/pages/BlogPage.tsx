import { type FormEvent, useCallback, useEffect, useState } from "react";
import { api, imagePreviewUrl } from "../api";
import { ImageField } from "../components/ImageField";
import { Modal } from "../components/Modal";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  body: string;
  author: string;
  category: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
};

type Draft = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverAlt: string;
  body: string;
  author: string;
  category: string;
  tags: string;
  status: "DRAFT" | "PUBLISHED";
};

const emptyDraft: Draft = {
  slug: "",
  title: "",
  excerpt: "",
  coverImage: "",
  coverAlt: "",
  body: "",
  author: "",
  category: "",
  tags: "",
  status: "DRAFT",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function toDraft(p: Post): Draft {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    coverImage: p.coverImage ?? "",
    coverAlt: p.coverAlt ?? "",
    body: p.body ?? "",
    author: p.author ?? "",
    category: p.category ?? "",
    tags: Array.isArray(p.tags) ? p.tags.join(", ") : "",
    status: p.status ?? "DRAFT",
  };
}

function fromDraft(d: Draft) {
  return {
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt,
    coverImage: d.coverImage,
    coverAlt: d.coverAlt,
    body: d.body,
    author: d.author,
    category: d.category,
    tags: d.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    status: d.status,
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function BlogPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [editing, setEditing] = useState<Post | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await api<{ data: Post[] }>("/api/v1/admin/blog");
      setItems(res.data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Failed to load");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function close() {
    setEditing(null);
    setCreating(false);
    setErr(null);
  }

  const set = (key: keyof Draft, value: string) =>
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (creating && key === "title") next.slug = slugify(value);
      return next;
    });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      const body = fromDraft(draft);
      if (creating) {
        await api("/api/v1/admin/blog", { method: "POST", body: JSON.stringify(body) });
      } else if (editing) {
        await api(`/api/v1/admin/blog/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
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

  async function onDelete(p: Post) {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      await api(`/api/v1/admin/blog/${p.id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  const modalOpen = creating || editing !== null;

  return (
    <div>
      <div className="page-header page-header-row">
        <div>
          <h1>Blog</h1>
          <p>Real-estate updates and articles shown under /blog</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setDraft(emptyDraft);
            setCreating(true);
          }}
        >
          + New post
        </button>
      </div>

      {err && !modalOpen ? <p className="err">{err}</p> : null}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Published</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td style={{ width: 56 }}>
                    {p.coverImage ? (
                      <img className="row-thumb" src={imagePreviewUrl(p.coverImage)} alt="" />
                    ) : (
                      <div className="row-thumb row-thumb-empty" />
                    )}
                  </td>
                  <td style={{ fontWeight: 500, color: "var(--text)" }}>{p.title}</td>
                  <td>{p.category || "—"}</td>
                  <td>
                    <span
                      className={`badge ${p.status === "PUBLISHED" ? "badge-published" : "badge-archived"}`}
                    >
                      {p.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>{formatDate(p.publishedAt)}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button
                      type="button"
                      className="btn-link"
                      onClick={() => {
                        setDraft(toDraft(p));
                        setEditing(p);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-link btn-link-danger"
                      onClick={() => onDelete(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !err ? (
          <div className="empty">
            <p>No posts yet. Create your first article.</p>
          </div>
        ) : null}
      </div>

      {modalOpen ? (
        <Modal
          title={creating ? "New post" : `Edit: ${editing?.title}`}
          onClose={close}
          wide
        >
          <form onSubmit={onSubmit}>
            <div className="field">
              <label>Title</label>
              <input value={draft.title} required onChange={(e) => set("title", e.target.value)} />
            </div>

            <div className="form-grid" style={{ marginTop: "1rem" }}>
              <div className="field">
                <label>Slug</label>
                <input
                  value={draft.slug}
                  required
                  pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                  onChange={(e) => set("slug", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Category</label>
                <input
                  value={draft.category}
                  placeholder="Market Insights"
                  onChange={(e) => set("category", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Author</label>
                <input
                  value={draft.author}
                  placeholder="Heist Team"
                  onChange={(e) => set("author", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Status</label>
                <select
                  value={draft.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option value="DRAFT">Draft (hidden)</option>
                  <option value="PUBLISHED">Published (live)</option>
                </select>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: "1rem" }}>
              <ImageField
                label="Cover image"
                value={draft.coverImage}
                onChange={(v) => set("coverImage", v)}
                variant="dropzone"
              />
              <div className="field">
                <label>Cover alt text</label>
                <input
                  value={draft.coverAlt}
                  placeholder="Describe the image"
                  onChange={(e) => set("coverAlt", e.target.value)}
                />
                <label style={{ marginTop: "1rem" }}>Tags (comma-separated)</label>
                <input
                  value={draft.tags}
                  placeholder="East Legon Hills, Investment"
                  onChange={(e) => set("tags", e.target.value)}
                />
              </div>
            </div>

            <div className="field" style={{ marginTop: "1rem" }}>
              <label>Excerpt (short summary)</label>
              <textarea
                rows={2}
                value={draft.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
              />
            </div>

            <div className="field" style={{ marginTop: "1rem" }}>
              <label>Body</label>
              <textarea
                rows={12}
                value={draft.body}
                placeholder="Write the article here. Separate paragraphs with a blank line."
                onChange={(e) => set("body", e.target.value)}
              />
              <p className="hint">Separate paragraphs with a blank line.</p>
            </div>

            {err ? <p className="err" style={{ marginTop: "1rem" }}>{err}</p> : null}

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={close}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving…" : creating ? "Create post" : "Save changes"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
