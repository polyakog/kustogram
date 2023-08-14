import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreatePostResponse, EditPostRequest, GetPostResponse, GetUserPostResponse } from "./types";
import { contentTypeSetup } from "common/utils/contentTypeSetup";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/posts/",
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ["createPost"])
  }),
  tagTypes: ["editPost", "deletePost", "createPost"],
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: (body) => ({
        url: "post",
        method: "POST",
        body
      }),
      invalidatesTags: ["createPost"]
    }),
    updatePost: builder.mutation<void, EditPostRequest>({
      query: ({ body, postId }) => ({
        url: `post/${postId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["editPost"]
    }),
    getPost: builder.query<GetPostResponse, string>({
      query: (postId) => ({
        url: `post/${postId}`
      }),
      providesTags: ["editPost"]
    }),
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["deletePost"]
    }),
    getUserPost: builder.query<GetUserPostResponse, string>({
      query: (userId) => ({
        url: userId
      }),
      providesTags: ["deletePost", "createPost"]
    })
  })
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLazyGetPostQuery,
  useLazyGetUserPostQuery,
  useGetUserPostQuery
} = postsApi;
