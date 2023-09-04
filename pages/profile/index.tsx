import { useState, useEffect } from 'react'

import { useLazyGetUserPostsQuery, useLazyGetPostQuery } from 'assets/store/api/posts/postsApi'
import { GetPostResponse } from 'assets/store/api/posts/types'
import { useLazyProfileQuery } from 'assets/store/api/profile/profileApi'
import Post from 'common/components/Post/Post'
// import PrivateRoute from 'common/components/PrivateRoute/PrivateRoute'
// import { LoginNavigate } from 'common/hoc/LoginNavigate'
import ProfileElement from 'features/profile/ProfileElement'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { LoadingStyle } from 'styles/styledComponents/profile/profile.styled'

import { getLayout } from '../../common/components/Layout/PageLayout/PageLayout'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}
const MyProfile = () => {
  const postsPerPage = 9
  const [getProfileInfo, { data: user, status: userStatus }] = useLazyProfileQuery()
  const [getUserPosts, { data, isLoading, status }] = useLazyGetUserPostsQuery()

  const posts = data?.items || []
  const totalCount = data?.totalCount || 0

  // const [getCurrentPost, { data: postInfo }] = useLazyGetPostQuery()
  const [isPostActive, setIsPostActive] = useState(false)

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(postsPerPage)
  const [userId, setUserId] = useState('')
  const [postInfo, setPostInfo] = useState<GetPostResponse | undefined>()

  const { t } = useTranslation()

  useEffect(() => {
    getProfileInfo()
      .unwrap()
      .then(({ userId }) => {
        if (userId) {
          setUserId(userId)
        }
      })
  }, [])

  useEffect(() => {
    if (userId) {
      getUserPosts({ userId, pageNumber, pageSize })
    }
  }, [userId, pageNumber, pageSize])

  // const isAppInitialized = useAppSelector(isAppInitializedSelector);

  if (userStatus !== 'fulfilled') {
    return <div style={LoadingStyle}>Loading...</div>
  }

  return (
    <>
      {/* <PrivateRoute> */}
      {/* <LoginNavigate> */}
      {/* {isAppInitialized && ( */}
      <>
        <ProfileElement
          isLoading={isLoading}
          pageSize={pageSize}
          posts={posts}
          setIsPostActive={setIsPostActive}
          setPageSize={setPageSize}
          setPostInfo={setPostInfo}
          status={status}
          t={t}
          totalCount={totalCount}
          user={user}
          // getCurrentPost={getCurrentPost}
        />
        {isPostActive && <Post postInfo={postInfo} setIsPostActive={setIsPostActive} />}
      </>
      {/* )} */}
      {/* </LoginNavigate> */}
      {/* </PrivateRoute> */}
    </>
  )
}

MyProfile.getLayout = getLayout
export default MyProfile
