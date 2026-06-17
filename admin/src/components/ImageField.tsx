import { useRef, useState, type DragEvent } from "react";
import { apiUpload, imagePreviewUrl } from "../api";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  /** Compact row vs prominent drop zone */
  variant?: "inline" | "dropzone";
  hint?: string;
};

/** URL input with upload + optional drag-and-drop preview. */
export function ImageField({
  label,
  value,
  onChange,
  variant = "inline",
  hint,
}: ImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const { url } = await apiUpload(file);
      onChange(url);
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
    void onFile(e.dataTransfer.files?.[0]);
  }

  const fileInput = (
    <input
      ref={fileRef}
      type="file"
      accept="image/jpeg,image/png,image/webp,image/avif"
      style={{ display: "none" }}
      onChange={(e) => onFile(e.target.files?.[0])}
    />
  );

  if (variant === "dropzone") {
    return (
      <div className="field">
        <label>{label}</label>
        <div
          className={`image-dropzone${dragOver ? " image-dropzone-active" : ""}${value ? " image-dropzone-has-image" : ""}`}
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
          aria-label={label}
        >
          {value ? (
            <img className="image-dropzone-preview" src={imagePreviewUrl(value)} alt="" />
          ) : (
            <div className="image-dropzone-empty">
              <span className="image-dropzone-icon" aria-hidden>
                ↑
              </span>
              <p>{busy ? "Uploading…" : "Drop an image here or click to browse"}</p>
              <span className="hint">JPEG, PNG, WebP or AVIF · up to 8 MB</span>
            </div>
          )}
          {fileInput}
        </div>
        {value ? (
          <div className="image-dropzone-actions">
            <input
              className="image-url-input"
              placeholder="/images/... or https://..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              className="btn-secondary"
              disabled={busy}
              onClick={(e) => {
                e.stopPropagation();
                fileRef.current?.click();
              }}
            >
              Replace
            </button>
            <button
              type="button"
              className="btn-link btn-link-danger"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
            >
              Remove
            </button>
          </div>
        ) : null}
        {hint ? <p className="hint">{hint}</p> : null}
        {err ? <p className="err">{err}</p> : null}
      </div>
    );
  }

  return (
    <div className="field">
      <label>{label}</label>
      <div className="image-field">
        {value ? (
          <img className="image-thumb" src={imagePreviewUrl(value)} alt="" />
        ) : (
          <div className="image-thumb image-thumb-empty">No image</div>
        )}
        <div className="image-field-controls">
          <input
            placeholder="/images/... or https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="button"
            className="btn-secondary"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
          >
            {busy ? "Uploading…" : "Upload"}
          </button>
          {fileInput}
        </div>
      </div>
      {hint ? <p className="hint">{hint}</p> : null}
      {err ? <p className="err">{err}</p> : null}
    </div>
  );
}
