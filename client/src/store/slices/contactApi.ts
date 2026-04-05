import { apiSlice } from "./api";

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),
  }),
});

export const { useSendContactMessageMutation } = contactApi;
