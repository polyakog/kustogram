/* eslint-disable no-nested-ternary */
/* eslint-disable no-magic-numbers */
import React, { useState, useEffect } from 'react'

import { QueryStatus } from '@reduxjs/toolkit/dist/query'
import { CreatePostResponse, GetPostResponse } from 'assets/store/api/posts/types'
import { UserType } from 'assets/store/api/profile/types'
import { Button } from 'common/components/Button/Button'
import { mediaSizes } from 'common/constants/Profile/mediaSizes'
import { Path } from 'common/enums/path'
import { ThemeButton } from 'common/enums/themeButton'
import { useWindowSize } from 'common/hooks/useWindowSize'
// import { urlify } from 'common/utils/urlify'
import { PostPhotos } from 'features/profile/PostPhotos'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { TFunction } from 'next-i18next'
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
  UserNameStyle,
} from 'styles/styledComponents/profile/profile.styled'

import Paid from '../../public/img/icons/paid.svg'

type PropsType = {
  // getCurrentPost: LazyQueryTrigger<
  //   QueryDefinition<
  //     string,
  //     BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
  //     'createPost' | 'deletePost' | 'editPost',
  //     CreatePostResponse,
  //     'postsApi'
  //   >
  // >
  // isLoading: boolean
  // pageSize: number
  posts?: CreatePostResponse[] | undefined
  // // session?: Session | null | undefined
  // setIsPostActive: (isPostActive: boolean) => void
  // setPageSize: (pageSize: number) => void
  // setPostInfo: (postInfo: GetPostResponse | undefined) => void
  // status: QueryStatus
  t: TFunction
  // totalCount: number
  user?: UserType | undefined
}

const ProfileElement: React.FC<PropsType> = ({
  user,
  posts,
  // setIsPostActive,
  // setPageSize,
  // pageSize,
  // setPostInfo,
  // // getCurrentPost,
  // totalCount,
  // isLoading,
  // status,
  t,
}) => {
  const avatar = '/img/icons/avatar.svg'

  const { width } = useWindowSize() // хук для измерения размера экрана

  const [isVisible, setIsVisible] = useState(true)
  const [isPaid, setIsPaid] = useState(false)
  const router = useRouter()
  /*  ____________<переменные для мобильной версии>______________ */

  const avatarSize = width ? (width < mediaSizes.mobileScreenSize ? 72 : 204) : 204
  const paidImageSize = width ? (width < mediaSizes.mobileScreenSize ? 16 : 24) : 24
  const postSize = width ? (width < mediaSizes.mobileScreenSize ? 108 : 228) : 228
  const scrollSize = width ? (width < mediaSizes.mobileScreenSize ? 562 : 660) : 660

  /*  ____________</переменные для мобильной версии>_______________ */

  // const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
  //   const element = e.currentTarget
  //   // console.log('scrollHeight', element.scrollHeight)
  //   // console.log('scrollTop', element.scrollTop)
  //   // console.log('clientHeight', element.clientHeight)
  //   // console.log('element.scrollHeight - element.scrollTop', (element.scrollHeight - element.scrollTop))

  //   if (element.scrollHeight - element.scrollTop < scrollSize) {
  //     const newPageSize = pageSize + 9

  //     if (totalCount + 9 >= newPageSize) {
  //       setPageSize(newPageSize)
  //     }
  //   }
  // }

  useEffect(() => {
    if (width) {
      if (width < mediaSizes.buttonUnvisible) {
        // для мобильной версии
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
  }, [width])

  const handleClick = () => {
    router.push(Path.PROFILE_SETTINGS)
  }

  const userFirstName = user?.firstName !== null ? user?.firstName : ''
  const userLastName = user?.lastName !== null ? user?.lastName : ''
  let name = `${userFirstName} ${userLastName}`

  if (!userFirstName || !userLastName) name = 'New User'

  return (
    <>
      {/* {status !== 'fulfilled' && (
        <>
          <LoadingPostStyle>{`${t('loading')}...`}</LoadingPostStyle>
          <LoadingPostBackStyle />
        </>
      )} */}

      <ProfileWrapper>
        <HeaderStyle>
          {isVisible && (
            <BlockButton>
              <Button
                style={{ padding: '6px 24px' }}
                theme={ThemeButton.SECONDARY}
                type="button"
                width="auto"
                onClick={handleClick}
              >
                {t('profile_settings')}
              </Button>
            </BlockButton>
          )}
          <StyledAvatarBlock>
            <IconBlock>
              <Image
                alt="avatar"
                height={avatarSize}
                src={user?.photo || avatar}
                width={avatarSize}
                // style={{ maxWidth: "204px", maxHeight: "204px" }}
              />
            </IconBlock>
          </StyledAvatarBlock>

          <UserNameStyle>
            {/* {user ? `${user.firstName} ${user.lastName}` : t('user_name')} */}
            {name}
            {isPaid && (
              <Image alt={t('paid')} height={paidImageSize} src={Paid} width={paidImageSize} />
            )}
          </UserNameStyle>

          <InfoBlock>
            <FollowBlock>
              <div>
                <div>
                  <FollowSpan>2 218</FollowSpan>
                </div>
                <div>
                  <FollowSpan>{t('following')}</FollowSpan>
                </div>
              </div>
              <div>
                <div>
                  <FollowSpan>2 358</FollowSpan>
                </div>
                <div>
                  <FollowSpan>{t('followers')}</FollowSpan>
                </div>
              </div>
              <div>
                <div>
                  <FollowSpan>2 358</FollowSpan>
                </div>
                <div>
                  <FollowSpan>{t('publications')}</FollowSpan>
                </div>
              </div>
            </FollowBlock>

            <AboutMeBlock>
              <AboutMeText>{user?.userInfo || t('about_me')}</AboutMeText>
            </AboutMeBlock>
          </InfoBlock>
        </HeaderStyle>

        {/* <PhotosBlock> 

        <PostPhotos
          isLoading={isLoading}
          posts={posts}
          postSize={postSize}
          setIsPostActive={setIsPostActive}
          setPostInfo={setPostInfo}
        />

         </PhotosBlock> */}
      </ProfileWrapper>
    </>
  )
}

export default ProfileElement
