/* eslint-disable react/no-array-index-key */
import { useQuery } from '@apollo/client'
import { GET_USER_IMAGES } from 'assets/apollo/users'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import { adminUserTabData } from 'common/utils/adminUserTabData'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'
import { Sceleton } from 'styles/styledComponents/admin/sceleton.styled'

import UserInfo from '../../../features/admin/UserInfo/UserInfo'

/*
    Страница отображения данных о пользователе, включающая загруженные им фотографии
*/

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale, params } = context
  const { userId } = params || {}

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['admin'], config)),
      userId,
    },
  }
}

type propsType = {
  userId: string
}

const AdminUserUploadedPhoto = ({ userId }: propsType) => {
  const imagesAmount = 10

  const {
    loading,
    error,
    data: userImages,
  } = useQuery(GET_USER_IMAGES, {
    variables: { id: userId },
  })

  if (error) {
    console.log(error)
  }

  const { t } = useTranslation('admin')

  // Базовый URL для вкладок
  const baseUrl = `/admin/${userId}`

  return (
    <>
      <UserInfo userId={userId} />
      <TabBar baseUrl={baseUrl} t={t} titleList={adminUserTabData} />
      <PostsWrapper>
        {loading
          ? [...Array(imagesAmount)].map((item, index) => (
              <StyledContainer key={index}>
                <Sceleton height="100%" radius="5px" width="100%" />
              </StyledContainer>
            ))
          : userImages?.user?.images?.map(image => (
              <PostPreview
                key={image.id}
                alt="user_image"
                height={350}
                src={image.url}
                style={{ objectFit: 'cover' }}
                width={350}
              />
            ))}
      </PostsWrapper>
    </>
  )
}

AdminUserUploadedPhoto.getLayout = getLayout
export default AdminUserUploadedPhoto

const PostsWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 36px;
  padding-bottom: 10px;

  @media (max-width: 960px) {
    padding-left: 10px;
  }
`

const PostPreview = styled(Image)`
  width: calc(33.33% - 10px);
  height: auto;
  aspect-ratio: 1 / 1;
  cursor: pointer;

  @media (max-width: 560px) {
    width: calc(33.33% - 10px);
  }
`

const StyledContainer = styled.div`
  width: calc(33.33% - 10px);
  height: auto;
  aspect-ratio: 1 / 1;
`
