import { baseApi } from "../../services/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/admin/dashboard",

      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = adminApi;
