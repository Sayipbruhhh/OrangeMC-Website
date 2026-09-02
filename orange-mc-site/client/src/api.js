// Empty string = same-origin requests ("/api/..."), which is correct when
// the Express server serves this built site itself (the normal single-server
// setup). Only set VITE_API_URL at build time if the API is deployed on a
// different origin than the site (see README "Deploying").
const API_URL = import.meta.env.VITE_API_URL || "";
const TOKEN_KEY = "orangemc_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data.error) message = data.error;
    } catch {
      // ignore parse errors on non-JSON error bodies
    }
    throw new Error(message);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return null;
}

export const api = {
  getContent: () => request("/api/content"),
  updateSection: (section, data) =>
    request(`/api/content/${section}`, { method: "PUT", body: data, auth: true }),

  login: (username, password) =>
    request("/api/auth/login", { method: "POST", body: { username, password } }),
  me: () => request("/api/auth/me", { auth: true }),

  uploadImage: (file) => {
    const form = new FormData();
    form.append("image", file);
    return request("/api/upload", { method: "POST", body: form, auth: true, isForm: true });
  },
  deleteImage: (filename) =>
    request(`/api/upload/${filename}`, { method: "DELETE", auth: true }),

  getServerStatus: () => request("/api/server-status")
};

export function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl) return "";
  if (pathOrUrl.startsWith("http") || pathOrUrl.startsWith("data:")) return pathOrUrl;
  return `${API_URL}${pathOrUrl}`;
}

export { API_URL };
