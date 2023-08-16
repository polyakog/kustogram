import { CreatePostResponse, GetUserPostResponse } from "assets/store/api/posts/types";
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
  getCurrentPost: any;
};

export const PostPhotos: React.FC<PropsType> = ({
  posts,
  postSize,
  setIsPostActive,
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

    if (element.scrollTop >= 415) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    console.log(page);
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
