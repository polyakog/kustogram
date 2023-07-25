import { CreatePostResponse, GetUserPostResponse } from "assets/store/api/posts/types";
import Image from "next/image";
import React from "react";
import { PhotoStyle, PhotosBlock } from "styles/styledComponents/profile/profile.styled";

type PropsType = {
  posts: CreatePostResponse[] | undefined;
  postSize: number;
};

export const PostPhotos: React.FC<PropsType> = ({ posts, postSize }) => {
  return (
    <PhotosBlock>
      {posts?.map((p) => (
        <PhotoStyle key={p.id}>
          <Image
            src={p.images[0].url}
            width={postSize}
            height={postSize}
            alt={"post image"}
            // style={{ }}
          />
        </PhotoStyle>
      ))}
    </PhotosBlock>
  );
};
