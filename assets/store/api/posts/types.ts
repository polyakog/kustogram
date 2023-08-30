type Images = {
  url: string
}

export type CreatePostRequest = {
  description: string
}

export type EditPostRequest = {
  body: CreatePostRequest
  postId: string
}

export type CreatePostResponse = {
  createdAt: string
  description: string
  id: string
  images: Images[]
  userId: string
}

export type GetPostResponse = CreatePostResponse

export type GetUserPostsResponse = {
  items: CreatePostResponse[]
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
}

export type GetUserPostsRequest = {
  pageNumber: number
  pageSize: number
  userId: string
}
