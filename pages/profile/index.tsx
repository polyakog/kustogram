import React, { useState, useEffect } from "react";
import { getLayout } from "../../common/components/Layout/PageLayout/PageLayout";
import { useAuthMeQuery, useLazyProfileQuery } from "assets/store/api/profile/profileApi";
import { LoginNavigate } from "common/hoc/LoginNavigate";
import { useLazyGetUserPostsQuery } from "assets/store/api/posts/postsApi";
import { useAppSelector } from "common/hooks";
import { isAppInitializedSelector } from "assets/store/app.selector";
import ProfileElement from "features/profile/ProfileElement";
import { useLazyGetPostQuery, useGetUserPostsQuery } from "assets/store/api/posts/postsApi";
import Post from "common/components/Post/Post";
import { number } from "yup";

const MyProfile = () => {
  /* _______ProtectedPage______________ */
  // const { data: session } = useSession();

  /*   _____________________________________ */

  // const avatar = "/img/icons/avatar.svg";
  const { data: me, isSuccess, isError } = useAuthMeQuery();
  const [getProfileInfo, { data: user }] = useLazyProfileQuery();
  // const [getPostsInfo, { data: postsData }] = useLazyGetUserPostQuery();
  const [getUserPosts, { data }] = useLazyGetUserPostsQuery();
  const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery();

  const [isPostActive, setIsPostActive] = useState(false);
  const posts = data?.items || [];
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [userId, setUserId] = useState("");
  const page = 1;

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
      console.log("post Request", userId, pageNumber, pageSize);
    }
  }, [userId, pageNumber, pageSize]);

  const isAppInitialized = useAppSelector(isAppInitializedSelector);

  return (
    <>
      <LoginNavigate>
        {isAppInitialized && (
          <>
            <ProfileElement
              user={user}
              posts={posts}
              setIsPostActive={setIsPostActive}
              getCurrentPost={getCurrentPost}
              setPageNumber={setPageNumber}
              pageNumber={pageNumber}
            />
            page: {pageNumber}
            {isPostActive && <Post postInfo={postInfo} setIsPostActive={setIsPostActive} />}
          </>
        )}
      </LoginNavigate>
    </>
  );
};
MyProfile.getLayout = getLayout;
export default MyProfile;
