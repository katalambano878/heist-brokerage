import { useMemo, useRef, useState, type DragEvent } from "react";
import { apiUpload, imagePreviewUrl } from "../api";

type GalleryItem = { src: string; alt: string; [k: string]: unknown };

type GalleryFieldProps = {
  label: string;
  /** JSON string of an array like [{ "src": "/images/…", "alt": "…" }] */
  value: string;
  onChange: (json: string) => void;
  hint?: string;
};

/** Normalizes stored JSON into a predictable array; tolerates {src} or {url}. */
function parseItems(value: string): { items: GalleryItem[]; invalid: boolean } {
  const raw = (value ?? "").trim();
  if (!raw || raw === "[]") return { items: [], invalid: false };
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return { items: [], invalid: true };
    const items = parsed.map((entry) => {
      if (typeof entry === "string") return { src: entry, alt: "" };
      const obj = (entry ?? {}) as Record<string, unknown>;
      const src = String(obj.src ?? obj.url ?? obj.image ?? "");
      const alt = String(obj.alt ?? obj.caption ?? "");
      return { ...obj, src, alt } as GalleryItem;
    });
    return { items, invalid: false };
  } catch {
    return { items: [], invalid: true };
  }
}

function serialize(items: GalleryItem[]): string {
  if (items.length === 0) return "[]";
  const clean = items.map((it) => {
    const { src, alt, ...rest } = it;
    return { ...rest, src, alt };
  });
  return JSON.stringify(clean, null, 2);
}

/** Visual editor for an array of gallery images: upload, reorder, edit alt, delete. */
export function GalleryField({ label, value, onChange, hint }: GalleryFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { items, invalid } = useMemo(() => parseItems(value), [value]);

  function commit(next: GalleryItem[]) {
    onChange(serialize(next));
  }

  async function addFiles(files: FileList | null | undefined) {
    if (!files || files.length === 0) return;
    setErr(null);
    setBusy(true);
    try {
      const uploaded: GalleryItem[] = [];
      for (const file of Array.from(files)) {
        const { url } = await apiUpload(file);
        uploaded.push({ src: url, alt: "" });
      }
      commit([...items, ...uploaded]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragOver(false);
    void addFiles(e.dataTransfer.files);
  }

  function updateAlt(index: number, alt: string) {
    commit(items.map((it, i) => (i === index ? { ...it, alt } : it)));
  }

  function updateSrc(index: number, src: string) {
    commit(items.map((it, i) => (i === index ? { ...it, src } : it)));
  }

  function remove(index: number) {
    commit(items.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  }

  return (
    <div className="field">
      <label>{label}</label>

      {invalid ? (
        <p className="err">
          This gallery has custom data that isn&apos;t a simple list. Editing here
          will rewrite it — check the raw JSON if you need the old value.
        </p>
      ) : null}

      {items.length > 0 ? (
        <div className="gf-grid">
          {items.map((item, i) => (
            <div className="gf-card" key={`${item.src}-${i}`}>
              <div className="gf-thumb-wrap">
                {item.src ? (
                  <img
                    className="gf-thumb"
                    src={imagePreviewUrl(item.src)}
                    alt={item.alt || ""}
                  />
                ) : (
                  <div className="gf-thumb gf-thumb-empty">No image</div>
                )}
                <button
                  type="button"
                  className="gf-remove"
                  aria-label="Remove image"
                  onClick={() => remove(i)}
                >
                  ×
                </button>
              </div>
              <input
                className="gf-input"
                placeholder="Alt / caption"
                value={item.alt}
                onChange={(e) => updateAlt(i, e.target.value)}
              />
              <input
                className="gf-input gf-input-mono"
                placeholder="/images/... or https://..."
                value={item.src}
                onChange={(e) => updateSrc(i, e.target.value)}
              />
              <div className="gf-move">
                <button
                  type="button"
                  className="btn-link"
                  disabled={i === 0}
                  onClick={() => move(i, -1)}
                  aria-label="Move earlier"
                >
                  ←
                </button>
                <span className="gf-index">{i + 1}</span>
                <button
                  type="button"
                  className="btn-link"
                  disabled={i === items.length - 1}
                  onClick={() => move(i, 1)}
                  aria-label="Move later"
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={`image-dropzone gallery-dropzone${dragOver ? " image-dropzone-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => !busy && fileRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Add images to ${label}`}
      >
        <div className="image-dropzone-empty">
          <span className="image-dropzone-icon" aria-hidden>
            ↑
          </span>
          <p>{busy ? "Uploading…" : "Drop images here or click to add"}</p>
          <span className="hint">You can select multiple files · JPEG, PNG, WebP, AVIF</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          style={{ display: "none" }}
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {hint ? <p className="hint">{hint}</p> : null}
      {err ? <p className="err">{err}</p> : null}
    </div>
  );
}
