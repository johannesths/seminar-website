/**
 * axios.ts
 *
 * Basic API instance to communicate with the backend.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "https://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
