import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition
} from "@reduxjs/toolkit/dist/query";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { CreatePostResponse } from "assets/store/api/posts/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  PhotoStyle,
  PhotosBlock,
  ScrollStyle
} from "styles/styledComponents/profile/profile.styled";

type PropsType = {
  posts: CreatePostResponse[] | undefined;
  postSize: number;
  setIsPostActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
  getCurrentPost: LazyQueryTrigger<
    QueryDefinition<
      string,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      "createPost" | "editPost" | "deletePost",
      CreatePostResponse,
      "postsApi"
    >
  >;
};

export const PostPhotos: React.FC<PropsType> = ({
  posts,
  postSize,
  setIsPostActive,
  setPageNumber,
  pageNumber,
  getCurrentPost
}) => {
  const [page, setPage] = useState(1);
  // const [isAutoScroll, setIsAutoScroll] = useState(true)
  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    var element = e.currentTarget;
    // if (Math.abs((element.scrollHeight-element.scrollTop) - element.clientHeight)<200){

    // }
    // console.log('scrollHeight', element.scrollHeight)
    // console.log('scrollTop', element.scrollTop)
    // console.log('clientHeight', element.clientHeight)

    if (element.scrollTop >= 364) {
      setPageNumber(pageNumber + 1);
      element.scrollTop === 2;
    } else if (element.scrollTop <= 1) {
      if (pageNumber > 1) setPageNumber(pageNumber - 1);
    }
  };

  useEffect(() => {
    console.log(pageNumber);
  }, [page]);
  return (
    <ScrollStyle onScroll={scrollHandler}>
      <PhotosBlock>
        {posts?.map((p) => (
          <PhotoStyle key={p.id}>
            <Image
              src={p.images.length ? p.images[0].url : ""}
              width={postSize}
              height={postSize}
              alt={"post image"}
              onClick={() =>
                getCurrentPost(p.id)
                  .unwrap()
                  .then(() => setIsPostActive(true))
              }

              // style={{ }}
            />
          </PhotoStyle>
        ))}
      </PhotosBlock>
    </ScrollStyle>
  );
};
