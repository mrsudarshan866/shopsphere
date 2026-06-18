import { baseApi } from "../../services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",

      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body: { role },
      }),

      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useUpdateUserRoleMutation } =
  userApi;
