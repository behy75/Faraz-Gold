import { getCsrfToken } from "../utils/csrf";

const toQuery = (obj={}) =>
  Object.entries(obj).filter(([,v]) => v!==undefined && v!==null && v!=="")
    .map(([k,v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");

export async function httpGet(url, { params, headers } = {}) {
  const res = await fetch(`${url}${params ? `?${toQuery(params)}` : ""}`, {
    method: "GET",
    headers: { Accept: "application/json", ...(headers||{}) },
    credentials: "include",
  });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

export async function httpPost(url, body, { headers } = {}) {
  const csrf = getCsrfToken();
  const isForm = body instanceof FormData;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      "X-CSRFToken": csrf,
      ...(headers||{}),
    },
    body: isForm ? body : JSON.stringify(body || {}),
    credentials: "include",
  });
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
  return res.json();
}
