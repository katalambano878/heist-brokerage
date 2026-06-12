import { useRef, useState } from "react";
import { apiUpload, imagePreviewUrl } from "../api";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
};

/** URL input with an upload button + thumbnail preview. */
export function ImageField({ label, value, onChange }: ImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
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
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            style={{ display: "none" }}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </div>
      </div>
      {err ? <p className="err">{err}</p> : null}
    </div>
  );
}
