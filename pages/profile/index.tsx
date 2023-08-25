import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import { useLazyProfileQuery } from "assets/store/api/profile/profileApi";
import { LoginNavigate } from "common/hoc/LoginNavigate";
import { useLazyGetUserPostsQuery } from "assets/store/api/posts/postsApi";
import ProfileElement from "features/profile/ProfileElement";
import { useLazyGetPostQuery } from "assets/store/api/posts/postsApi";
import Post from "common/components/Post/Post";
import { LoadingStyle } from "styles/styledComponents/profile/profile.styled";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "next-i18next.config.js";
import PrivateRoute from "common/components/PrivateRoute/PrivateRoute";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "nav_bar", "post_cr"], config))
    }
  };
}
const MyProfile = () => {
  const [getProfileInfo, { data: user, status: userStatus }] = useLazyProfileQuery();
  const [getUserPosts, { data, isLoading, status }] = useLazyGetUserPostsQuery();

  const posts = data?.items || [];
  const totalCount = data?.totalCount || 0;

  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery();
  const [isPostActive, setIsPostActive] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [userId, setUserId] = useState("");

  const { t } = useTranslation();

  useEffect(() => {
    getProfileInfo()
      .unwrap()
      .then(({ userId }) => {
        if (userId) {
          setUserId(userId);
        }
      });
  }, []);

  useEffect(() => {
    if (userId) {
      getUserPosts({ userId, pageNumber, pageSize });
    }
  }, [userId, pageNumber, pageSize]);

  // const isAppInitialized = useAppSelector(isAppInitializedSelector);

  if (userStatus !== "fulfilled") {
    return <div style={LoadingStyle}>Loading...</div>;
  }

  return (
    <>
      {/* <PrivateRoute> */}
      {/* <LoginNavigate> */}
      {/* {isAppInitialized && ( */}
      <>
        <ProfileElement
          user={user}
          posts={posts}
          setIsPostActive={setIsPostActive}
          getCurrentPost={getCurrentPost}
          setPageSize={setPageSize}
          pageSize={pageSize}
          totalCount={totalCount}
          status={status}
          isLoading={isLoading}
          t={t}
        />
        {isPostActive && <Post postInfo={postInfo} setIsPostActive={setIsPostActive} />}
      </>
      {/* )} */}
      {/* </LoginNavigate> */}
      {/* </PrivateRoute> */}
    </>
  );
};
MyProfile.getLayout = getLayout;
export default MyProfile;
