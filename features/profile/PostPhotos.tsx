import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
  QueryStatus
} from "@reduxjs/toolkit/dist/query";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { CreatePostResponse } from "assets/store/api/posts/types";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  LoadingPostStyle,
  LoadingStyle,
  PhotoStyle,
  PhotosBlock,
  ScrollStyle
} from "styles/styledComponents/profile/profile.styled";

type PropsType = {
  posts: CreatePostResponse[] | undefined;
  postSize: number;
  setIsPostActive: React.Dispatch<React.SetStateAction<boolean>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  getCurrentPost: LazyQueryTrigger<
    QueryDefinition<
      string,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
      "createPost" | "editPost" | "deletePost",
      CreatePostResponse,
      "postsApi"
    >
  >;
  totalCount: number;
  scrollSize: number;
  isLoading: boolean;
  status: QueryStatus;
};

export const PostPhotos: React.FC<PropsType> = ({
  posts,
  postSize,
  setIsPostActive,
  setPageSize,
  pageSize,
  getCurrentPost,
  totalCount,
  scrollSize,
  isLoading,
  status
}) => {
  const [portion, setPortion] = useState(1);
  const totalPortion = Math.floor((totalCount - 1) / 9) + 1;
  // console.log('totalCount, totalPortion, portion', totalCount, totalPortion, portion)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    var element = e.currentTarget;
    // console.log('scrollHeight', element.scrollHeight)
    // console.log('scrollTop', element.scrollTop)
    // console.log('clientHeight', element.clientHeight)
    if (element.scrollHeight - element.scrollTop < scrollSize) {
      let newPageSize = pageSize + 9;
      let newPortion = portion + 1;

      if (totalPortion >= newPortion) {
        setPageSize(newPageSize);
        setPortion(newPortion);
      }
    }
  };
  if (isLoading) console.log("working");

  return (
    <>
      <ScrollStyle onScroll={status === "fulfilled" ? scrollHandler : () => {}}>
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
    </>
  );
};
