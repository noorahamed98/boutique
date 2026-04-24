import { getApiUrl } from "./apiBase";

async function request(path, options = {}) {
  const headers = {
    ...(options.headers || {})
  };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(getApiUrl(path), {
    headers,
    ...options
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || `Request failed (${response.status})`);
  }

  return data;
}

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`
  };
}

export function getDesigns(category = "") {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return request(`/designs${query}`);
}

export function getSiteMetrics() {
  return request("/metrics");
}

export function recordWhatsAppInquiry() {
  return request("/metrics/whatsapp-inquiries", {
    method: "POST"
  });
}

export function loginAdmin(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });
}

export function verifyAdminToken(token) {
  return request("/auth/verify", {
    headers: authHeaders(token)
  });
}

export function createDesign(token, payload) {
  return request("/designs", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload)
  });
}

export function updateDesign(token, id, payload) {
  return request(`/designs/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(payload)
  });
}

export function deleteDesign(token, id) {
  return request(`/designs/${id}`, {
    method: "DELETE",
    headers: authHeaders(token)
  });
}
