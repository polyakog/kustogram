import React from 'react'

import { useLazyGetPostQuery } from 'assets/store/api/posts/postsApi'
// import {
//   BaseQueryFn,
//   FetchArgs,
//   FetchBaseQueryError,
//   FetchBaseQueryMeta,
//   QueryDefinition,
//   QueryStatus,
// } from '@reduxjs/toolkit/dist/query'
// import { LazyQueryTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { CreatePostResponse, GetPostResponse } from 'assets/store/api/posts/types'
import Image from 'next/image'
import {
  PhotoStyle,
  PhotosBlock,
  PostWrapper,
} from 'styles/styledComponents/profile/profile.styled'
import { baseTheme } from 'styles/styledComponents/theme'

type PropsType = {
  // getCurrentPost: LazyQueryTrigger<
  //   QueryDefinition<
  //     string,
  //     BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  //     'createPost' | 'deletePost' | 'editPost',
  //     CreatePostResponse,
  //     'postsApi'
  //   >
  // >
  isLoading: boolean
  // pageSize: number
  postSize: number
  posts: CreatePostResponse[] | undefined
  // scrollSize: number
  setIsPostActive: (isPostActive: boolean) => void
  // setPageSize: (pageSize: number) => void
  setPostInfo: (postInfo: GetPostResponse | undefined) => void
  // status: QueryStatus
  // totalCount: number
}

export const PostPhotos: React.FC<PropsType> = ({
  posts,
  postSize,
  setIsPostActive,
  // setPageSize,
  setPostInfo,
  // pageSize,
  // getCurrentPost,
  // totalCount,
  // scrollSize,
  isLoading,
  // status,
}) => {
  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery()

  // if (isLoading) console.log('%c loading posts...', consoleStyle)

  return (
    <PostWrapper>
      <PhotosBlock>
        {posts?.map(p => (
          <PhotoStyle key={p.id}>
            <Image
              alt="post image"
              height={postSize}
              src={p.images.length ? p.images[0].url : ''}
              width={postSize}
              onClick={() =>
                getCurrentPost(p.id)
                  .unwrap()
                  .then(() => {
                    setIsPostActive(true)
                    setPostInfo(postInfo)
                  })
              }

              // style={{ }}
            />
          </PhotoStyle>
        ))}
      </PhotosBlock>
    </PostWrapper>
  )
}

// const consoleStyle = `
// padding: 20px;
// background-color: ${baseTheme.colors.accent[100]};
// border-radius: 20px;
// color: white}`
