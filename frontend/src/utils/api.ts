// utils/api.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"}/api`,
  withCredentials: true,
  timeout: 10_000,
});