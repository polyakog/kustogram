import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import {
  CreatePostResponse,
  EditPostRequest,
  GetPostResponse,
  GetUserPostsRequest,
  GetUserPostsResponse
} from "./types";
import { contentTypeSetup } from "common/utils/contentTypeSetup";

const staggeredBaseQuery = retry(
  fetchBaseQuery({
    baseUrl: "https://calypso-one.vercel.app/posts/",
    prepareHeaders: (headers, { endpoint }) =>
      contentTypeSetup(headers, { endpoint }, ["createPost"])
  }),
  {
    maxRetries: 2
  }
);

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: staggeredBaseQuery,
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
      providesTags: ["editPost"],
      extraOptions: { maxRetries: 3 }
    }),
    deletePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `post/${postId}`,
        method: "DELETE"
      }),
      invalidatesTags: ["deletePost"]
    }),
    getUserPosts: builder.query<GetUserPostsResponse, GetUserPostsRequest>({
      query: ({ userId, pageNumber, pageSize }) => ({
        url: userId + `?pageNumber=${pageNumber}&pageSize=${pageSize}`
      }),
      providesTags: ["deletePost", "createPost"],
      extraOptions: { maxRetries: 3 }
    })
  })
});

export const {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLazyGetPostQuery,
  useLazyGetUserPostsQuery,
  useGetUserPostsQuery
} = postsApi;
