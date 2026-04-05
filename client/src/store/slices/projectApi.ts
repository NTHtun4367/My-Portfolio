import { apiSlice } from "./api";

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<any[], void>({
      query: () => "/projects",
      providesTags: ["Projects"],
    }),
    getProject: builder.query<any, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Projects", id }],
    }),
    createProject: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/projects",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation<any, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation<any, string>({
      query: (id) => ({ url: `/projects/${id}`, method: "DELETE" }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
