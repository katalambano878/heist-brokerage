const DRIVE_HOSTS = new Set(["drive.google.com", "docs.google.com"]);

/** Google Drive, a PDF link, or a file we uploaded. LinkedIn and other websites are refused. */
export function portfolioProblem(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return "Upload a CV file, or paste a Google Drive or PDF link.";
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return "Use a Google Drive link, a PDF link, or upload a PDF or Word file.";
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return "Use a Google Drive link, a PDF link, or upload a PDF or Word file.";
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
    return "LinkedIn links are not accepted. Upload a PDF or Word file, or use a Google Drive or PDF link.";
  }
  if (DRIVE_HOSTS.has(host)) return null;

  const path = url.pathname.toLowerCase();
  if (path.endsWith(".pdf")) return null;
  if (path.includes("/uploads/") && /\.(pdf|docx?)$/.test(path)) return null;

  return "Website links are not accepted. Upload a PDF or Word file, or use a Google Drive or PDF link.";
}
