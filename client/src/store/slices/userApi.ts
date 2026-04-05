import { apiSlice } from "./api";

interface loginInput {
  email: string;
  password: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: loginInput) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query<any, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useLogoutMutation } = userApi;
