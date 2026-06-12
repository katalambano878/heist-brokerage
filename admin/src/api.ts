const base = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export type SessionUser = {
  id: string;
  email: string;
  name?: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF";
};

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function getSessionUser(): SessionUser | null {
  const raw = localStorage.getItem("sessionUser");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function setSession(access: string, refresh: string, user?: SessionUser) {
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
  if (user) localStorage.setItem("sessionUser", JSON.stringify(user));
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("sessionUser");
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${base}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    setSession(json.accessToken, json.refreshToken, json.user);
    return true;
  } catch {
    return false;
  }
}

export async function api<T>(
  path: string,
  options: RequestInit & { token?: string | null; _retried?: boolean } = {},
): Promise<T> {
  const token = options.token ?? getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) ?? {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${base}${path}`, { ...options, headers });

  if (res.status === 401 && !options._retried && !path.startsWith("/api/v1/auth/")) {
    const refreshed = await tryRefresh();
    if (refreshed) {
      return api<T>(path, { ...options, token: getAccessToken(), _retried: true });
    }
    clearTokens();
    window.location.href = `${import.meta.env.BASE_URL}login`;
  }

  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  if (!res.ok) {
    const msg = json?.error?.message ?? res.statusText;
    throw new Error(msg);
  }
  return json as T;
}

export async function apiUpload(file: File): Promise<{ url: string }> {
  const token = getAccessToken();
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${base}/api/v1/admin/uploads`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message ?? "Upload failed");
  }
  return json as { url: string };
}

/** Resolve stored image paths: site-relative paths stay on the public site,
 *  absolute URLs (admin uploads) are returned as-is. */
export function imagePreviewUrl(src: string): string {
  if (!src) return "";
  if (src.startsWith("http")) return src;
  const siteBase = import.meta.env.VITE_SITE_URL ?? "https://heistbrokerageconstruction.vercel.app";
  return `${siteBase}${src}`;
}
