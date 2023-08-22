import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  AboutMeBlock,
  AboutMeText,
  BlockButton,
  FollowBlock,
  FollowSpan,
  HeaderStyle,
  IconBlock,
  InfoBlock,
  LoadingPostBackStyle,
  LoadingPostStyle,
  ProfileWrapper,
  StyledAvatarBlock,
  UserNameStyle
} from "styles/styledComponents/profile/profile.styled";
import type { Session } from "next-auth";
import { urlify } from "common/utils/urlify";
import { PostPhotos } from "features/profile/PostPhotos";
import Paid from "../../public/img/icons/paid.svg";
import { Path } from "common/enums/path";
import { useRouter } from "next/router";
import { useWindowSize } from "common/hooks/useWindowSize";
import { mediaSizes } from "common/constants/Profile/mediaSizes";
import { UserType } from "assets/store/api/profile/types";
import { CreatePostResponse } from "assets/store/api/posts/types";
import { LazyQueryTrigger } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
  QueryStatus
} from "@reduxjs/toolkit/dist/query";
import { baseTheme } from "styles/styledComponents/theme";

type PropsType = {
  user?: UserType | undefined;
  posts?: CreatePostResponse[] | undefined;
  session?: Session | undefined | null;
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
  isLoading: boolean;
  status: QueryStatus;
};

const ProfileElement: React.FC<PropsType> = ({
  user,
  posts,
  setIsPostActive,
  setPageSize,
  pageSize,
  getCurrentPost,
  totalCount,
  isLoading,
  status
}) => {
  const avatar = "/img/icons/avatar.svg";

  const { width } = useWindowSize(); // хук для измерения размера экрана

  const [isVisible, setIsVisible] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  /*  ____________<переменные для мобильной версии>______________*/

  const avatarSize = width ? (width < mediaSizes.mobileScreenSize ? 72 : 204) : 204;
  const paidImageSize = width ? (width < mediaSizes.mobileScreenSize ? 16 : 24) : 24;
  const postSize = width ? (width < mediaSizes.mobileScreenSize ? 108 : 228) : 228;
  const scrollSize = width ? (width < mediaSizes.mobileScreenSize ? 340 : 360) : 360;

  /*  ____________</переменные для мобильной версии>_______________*/

  useEffect(() => {
    if (width) {
      if (width < mediaSizes.buttonUnvisible) {
        // для мобильной версии
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
  }, [width]);

  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS);
  };

  return (
    <>
      <ProfileWrapper>
        <HeaderStyle>
          {isVisible && (
            <BlockButton>
              <Button
                theme={ThemeButton.SECONDARY}
                type="button"
                width={"auto"}
                style={{ padding: "6px 24px" }}
                onClick={handleClick}
              >
                Profile Settings
              </Button>
            </BlockButton>
          )}
          <StyledAvatarBlock>
            <IconBlock>
              <Image
                src={user?.photo || avatar}
                width={avatarSize}
                height={avatarSize}
                alt={"avatar"}
                // style={{ maxWidth: "204px", maxHeight: "204px" }}
              />
            </IconBlock>
          </StyledAvatarBlock>

          <UserNameStyle>
            {!!user ? `${user.firstName} ${user?.lastName}` : "User Name"}
            {isPaid && (
              <Image src={Paid} width={paidImageSize} height={paidImageSize} alt={"paid"} />
            )}
          </UserNameStyle>

          <InfoBlock>
            <FollowBlock>
              <div>
                <div>
                  <FollowSpan>2 218</FollowSpan>
                </div>
                <div>
                  <FollowSpan>Following</FollowSpan>
                </div>
              </div>
              <div>
                <div>
                  <FollowSpan>2 358</FollowSpan>
                </div>
                <div>
                  <FollowSpan>Followers</FollowSpan>
                </div>
              </div>
              <div>
                <div>
                  <FollowSpan>2 358</FollowSpan>
                </div>
                <div>
                  <FollowSpan>Publications</FollowSpan>
                </div>
              </div>
            </FollowBlock>

            <AboutMeBlock>
              <AboutMeText>{urlify(user?.userInfo || "about me")}</AboutMeText>
            </AboutMeBlock>
          </InfoBlock>
        </HeaderStyle>

        {/* <PhotosBlock> */}
        {status !== "fulfilled" && (
          <>
            <LoadingPostStyle>Loading...</LoadingPostStyle>
            <LoadingPostBackStyle></LoadingPostBackStyle>
          </>
        )}
        <PostPhotos
          posts={posts}
          postSize={postSize}
          setIsPostActive={setIsPostActive}
          setPageSize={setPageSize}
          pageSize={pageSize}
          getCurrentPost={getCurrentPost}
          totalCount={totalCount}
          scrollSize={scrollSize}
          isLoading={isLoading}
          status={status}
        />

        {/* </PhotosBlock> */}
      </ProfileWrapper>
    </>
  );
};

export default ProfileElement;
