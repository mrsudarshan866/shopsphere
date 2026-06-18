import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,

  credentials: "include",

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery,

  tagTypes: [
    "Auth",
    "Products",
    "Categories",
    "Orders",
    "Users",
    "Dashboard",
    "Cart",
  ],

  endpoints: () => ({}),
});
