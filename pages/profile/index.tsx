import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import { useAuthMeQuery, useLazyProfileQuery } from "assets/store/api/profile/profileApi";
import { LoginNavigate } from "common/hoc/LoginNavigate";
import { urlify } from "./../../common/utils/urlify";
import { useLazyGetUserPostQuery } from "assets/store/api/posts/postsApi";
import { PostPhotos } from "features/profile/PostPhotos";
import { useSession } from "next-auth/react";

const MyProfile = () => {
  /* _______ProtectedPage______________ */
  const { data: session } = useSession();

  /*   _____________________________________ */

  const avatar = "/img/icons/avatar.svg";
  const { isSuccess } = useAuthMeQuery();
  const [getProfileInfo, { data: user }] = useLazyProfileQuery();
  const [getPostsInfo, { data: postsData }] = useLazyGetUserPostQuery();

  const posts = postsData?.items;

  const { width } = useWindowSize(); // хук для измерения размера экрана

  const [isVisible, setIsVisible] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();
  /*  ____________<переменные для мобильной версии>______________*/

  const avatarSize = width ? (width < mediaSizes.mobileScreenSize ? 72 : 204) : 204;
  const paidImageSize = width ? (width < mediaSizes.mobileScreenSize ? 16 : 24) : 24;
  const postSize = width ? (width < mediaSizes.mobileScreenSize ? 108 : 228) : 228;

  /*  ____________</переменные для мобильной версии>_______________*/

  useEffect(() => {
    getProfileInfo();
  }, []);

  useEffect(() => {
    if (user?.userId) {
      getPostsInfo(user?.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getUserPosts({ userId, pageNumber, pageSize });
    }
  }, [userId, pageNumber, pageSize]);

  const isAppInitialized = useAppSelector(isAppInitializedSelector);

  return (
    <>
      <LoginNavigate>
        {/* {isSuccess && ( */}
        {(session || isSuccess) && (
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
                {user?.firstName} {user?.lastName}
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
            <PostPhotos posts={posts} postSize={postSize} />

            {/* <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle>
              <PhotoStyle>Photo</PhotoStyle> */}
            {/* </PhotosBlock> */}
          </ProfileWrapper>
        )}
      </LoginNavigate>
    </>
  );
};
MyProfile.getLayout = getLayout
export default MyProfile;