import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
// import Image from "next/image";
import { useAuthMeQuery, useLazyProfileQuery } from "assets/store/api/profile/profileApi";
// import { Button } from "common/components/Button/Button";
// import { ThemeButton } from "common/enums/themeButton";
// import { useRouter } from "next/router";
// import { Path } from "common/enums/path";
// import { useWindowSize } from "common/hooks/useWindowSize";
// import Paid from "../../public/img/icons/paid.svg";
// import {
//   AboutMeBlock,
//   AboutMeText,
//   BlockButton,
//   FolowBlock,
//   HeaderStyle,
//   IconBlock,
//   InfoBlock,
//   // PhotoStyle,
//   // PhotosBlock,
//   ProfileWrapper,
//   StyledAvatarBlock,
//   UserNameStyle
// } from "styles/styledComponents/profile/profile.styled";
// import { mediaSizes } from "../../common/constants/Profile/mediaSizes";
import { LoginNavigate } from "common/hoc/LoginNavigate";
// import { urlify } from "./../../common/utils/urlify";
import { useLazyGetUserPostQuery } from "assets/store/api/posts/postsApi";
// import { PostPhotos } from "features/profile/PostPhotos";
// import { useSession } from "next-auth/react";
import { useAppSelector } from "common/hooks";
import { isAppInitializedSelector } from "assets/store/app.selector";
import ProfileElement from "features/profile/ProfileElement";
import { useLazyGetPostQuery, useGetUserPostQuery } from "assets/store/api/posts/postsApi";
import Post from "common/components/Post/Post";

const MyProfile = () => {
  /* _______ProtectedPage______________ */
  // const { data: session } = useSession();

  /*   _____________________________________ */

  // const avatar = "/img/icons/avatar.svg";
  const { data: me, isSuccess, isError } = useAuthMeQuery();
  const [getProfileInfo, { data: user }] = useLazyProfileQuery();
  // const [getPostsInfo, { data: postsData }] = useLazyGetUserPostQuery();
  const [getUserPosts, { data }] = useLazyGetUserPostQuery();
  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery();

  const [isPostActive, setIsPostActive] = useState(false);
  const posts = data?.items || [];

  // const posts = postsData?.items;

  // const { width } = useWindowSize(); // хук для измерения размера экрана

  // const router = useRouter();

  useEffect(() => {
    getProfileInfo()
      .unwrap()
      .then(({ userId }) => {
        if (userId) {
          getUserPosts(userId);
        }
      });
  }, []);

  // useEffect(() => {
  //   if (width) {
  //     if (width < mediaSizes.buttonUnvisible) {
  //       // для мобильной версии
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }
  //   }
  // }, [width]);

  // const handleClick = () => {
  //   router.push(Path.PROFILE_SETTINGS);
  // };

  const isAppInitialized = useAppSelector(isAppInitializedSelector);

  return (
    <>
      <LoginNavigate>
        {isAppInitialized && (
          <>
            <ProfileElement
              user={user}
              posts={posts}
              // session={session}
              setIsPostActive={setIsPostActive}
              getCurrentPost={getCurrentPost}
            />

            {isPostActive && <Post postInfo={postInfo} setIsPostActive={setIsPostActive} />}
          </>
        )}
      </LoginNavigate>
    </>
  );
};
MyProfile.getLayout = getLayout;
export default MyProfile;
