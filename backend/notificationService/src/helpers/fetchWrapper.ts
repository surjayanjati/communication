import { BASE_URL } from "../config/shared.config";
import { generateJwtToken } from "../utils/userUtils";
import dotenv from "dotenv";
type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface FetchParams {
  service: keyof typeof SERVICE_BASE_URLS;
  path: string;
  userId: string;
  body?: any; // for POST, PUT, PATCH
  query?: Record<
    string,
    string | number | boolean | (string | number | boolean)[]
  >; // new
}
///// Function for building the query string ----------------------------------/
function buildQueryString(query?: FetchParams["query"]) {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.append(key, String(value));
    }
  });
  return `?${params.toString()}`;
}
// src/config/shared.config.ts

export const SERVICE_BASE_URLS: Record<string, string> = {
  auth_service: process.env.AUTH_SERVICE_URL!,
  meeting: process.env.MEETING_SERVICE_URL!,
  notification: process.env.NOTIFICATION_SERVICE_URL!,
};

// 🔐 Replace with real auth token logic if needed

// 🔧 Internal handler
async function request<T>(
  method: HttpMethod,
  { service, path, userId, body, query }: FetchParams
): Promise<T> {
  const urls: Record<string, string> = {
    auth_service: process.env.AUTH_SERVICE_URL!,
    meeting: process.env.MEETING_SERVICE_URL!,
    notification: process.env.NOTIFICATION_SERVICE_URL!,
  };

  const baseUrl = urls[service];

  console.log("base");
  console.log(baseUrl);

  if (!baseUrl) throw new Error(`Unknown service: ${service}`);

  const queryString = method === "GET" && query ? buildQueryString(query) : "";
  const url = `${baseUrl}/api/v1/${path}${queryString}`;
  console.log("this is url");

  console.log(url);

  const token = generateJwtToken({ _id: userId });

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
// 🌐 Exposed wrapper
export const fetchWrapper = {
  get: <T = any>(params: Omit<FetchParams, "body">) =>
    request<T>("GET", params),

  post: <T = any>(params: FetchParams) => request<T>("POST", params),

  patch: <T = any>(params: FetchParams) => request<T>("PATCH", params),

  put: <T = any>(params: FetchParams) => request<T>("PUT", params),

  delete: <T = any>(params: FetchParams) => request<T>("DELETE", params),
};
