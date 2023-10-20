import { useQuery } from '@apollo/client'
import { GET_USER_IMAGES } from 'assets/apollo/users'
import { getLayout } from 'common/components/Layout/AdminLayout/AdminUserLayout'
import { TabBar } from 'common/components/TabBar'
import UserInfo from 'features/admin/UserInfo'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import { styled } from 'styled-components'
import { Sceleton } from 'styles/styledComponents/admin/sceleton.styled'

/*
    Страница отображения данных о пользователе, включающая загруженные им фотографии
*/
export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['admin'], config)),
    },
  }
}

const UserPhoto = () => {
  const imagesAmount = 10

  const {
    loading,
    error,
    data: userImages,
  } = useQuery(GET_USER_IMAGES, {
    variables: { id: '45fc377a-4c96-46c4-a7b4-cb0d6dffbcc2' },
  })

  if (error) {
    console.log(error)
  }

  const { t } = useTranslation('admin')

  // Данные для создания вкладок
  const baseUrl = '/admin/user'
  const adminUserTabData = [
    {
      name: 'Uploaded photos',
      ref: '',
    },
    {
      name: 'Payments',
      ref: 'payments',
    },
    {
      name: 'Followers',
      ref: 'followers',
    },
    {
      name: 'Following',
      ref: 'following',
    },
  ]

  return (
    <>
      <UserInfo />
      <TabBar baseUrl={baseUrl} t={t} titleList={adminUserTabData} />
      <PostsWrapper>
        {loading
          ? [...Array(imagesAmount)].map(item => (
              <StyledContainer key={item}>
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

UserPhoto.getLayout = getLayout
export default UserPhoto

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
