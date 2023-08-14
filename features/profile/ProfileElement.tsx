import { Button } from "common/components/Button/Button";
import { ThemeButton } from "common/enums/themeButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  AboutMeBlock,
  AboutMeText,
  BlockButton,
  FolowBlock,
  HeaderStyle,
  IconBlock,
  InfoBlock,
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
  QueryDefinition
} from "@reduxjs/toolkit/dist/query";

type PropsType = {
  user?: UserType | undefined;
  posts?: CreatePostResponse[] | undefined;
  session?: Session | undefined | null;
  setIsPostActive: React.Dispatch<React.SetStateAction<boolean>>;
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

const ProfileElement: React.FC<PropsType> = ({
  user,
  posts,
  session,
  setIsPostActive,
  getCurrentPost
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

  /*  ____________</переменные для мобильной версии>_______________*/

  // useEffect(() => {
  //   getProfileInfo();
  //   if (user?.userId) {
  //     getPostsInfo(user?.userId);
  //   }
  // }, []);

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
  // console.log(session?.user?.image)

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
                src={user?.photo || session?.user?.image || avatar}
                width={avatarSize}
                height={avatarSize}
                alt={"avatar"}
                // style={{ maxWidth: "204px", maxHeight: "204px" }}
              />
            </IconBlock>
          </StyledAvatarBlock>

          <UserNameStyle>
            {!!user ? `${user.firstName} ${user?.lastName}` : session?.user?.name}
            {isPaid && (
              <Image src={Paid} width={paidImageSize} height={paidImageSize} alt={"paid"} />
            )}
          </UserNameStyle>

          <InfoBlock>
            <FolowBlock>
              <div>
                <div>2 218</div>
                <div>Following</div>
              </div>
              <div>
                <div>2 358</div>
                <div>Followers</div>
              </div>
              <div>
                <div>2 358</div>
                <div>Publications</div>
              </div>
            </FolowBlock>

            <AboutMeBlock>
              <AboutMeText>
                {urlify(user?.userInfo || "about me")}

                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt. laboris nisi ut aliquip ex ea commodo consequat. */}
              </AboutMeText>
            </AboutMeBlock>
          </InfoBlock>
        </HeaderStyle>
        {/* <PhotosBlock> */}
        <PostPhotos
          posts={posts}
          postSize={postSize}
          setIsPostActive={setIsPostActive}
          getCurrentPost={getCurrentPost}
        />

        {/* </PhotosBlock> */}
      </ProfileWrapper>
    </>
  );
};

export default ProfileElement;
