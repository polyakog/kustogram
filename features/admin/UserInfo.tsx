import { useQuery } from '@apollo/client'
import { GET_USER } from 'assets/apollo/users'
import { Path } from 'common/enums/path'
import Typograthy from 'common/hoc/Typograthy'
import UserInfoSceleton from 'features/admin/UserInfoSceleton'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

// Компонента для отображения основных данных пользователя в админке

const UserInfo = () => {
  const router = useRouter()
  const handleBackToList = () => {
    router.push(Path.ADMIN)
  }

  const { t } = useTranslation('admin')

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: '45fc377a-4c96-46c4-a7b4-cb0d6dffbcc2' },
  })

  if (error) {
    console.log(error)
  }

  return (
    <StyledUserInfoContainer>
      {loading ? (
        <UserInfoSceleton />
      ) : (
        <>
          <StyledFlexContainer onClick={handleBackToList}>
            <Image alt="arrow" height={24} src="/img/icons/arrow-back-outline.svg" width={24} />
            <StyledBack>
              <Typograthy variant="Medium_text 14">{t('Back to Users List')}</Typograthy>
            </StyledBack>
          </StyledFlexContainer>
          <StyledFlexContainer>
            <StyledImage alt="userPhoto" height={60} src="/img/icons/avatar.svg" width={60} />
            <StyledNameContainer>
              <Typograthy variant="H1">{data?.user?.login}</Typograthy>
              <StyledUserName>{data?.user?.email}</StyledUserName>
            </StyledNameContainer>
          </StyledFlexContainer>
          <StyledIdDateContainer>
            <StyledIdDate>
              <StyledTitle>
                <Typograthy variant="regular_text 14">{t('UserId')}</Typograthy>
              </StyledTitle>
              <Typograthy variant="regular_text 16">{data?.user?.id}</Typograthy>
            </StyledIdDate>
            <StyledIdDate>
              <StyledTitle>
                <Typograthy variant="regular_text 14">{t('Profile Creation Date')}</Typograthy>
              </StyledTitle>
              <Typograthy variant="regular_text 16">{data?.user?.createdAt}</Typograthy>
            </StyledIdDate>
          </StyledIdDateContainer>
        </>
      )}
    </StyledUserInfoContainer>
  )
}

export default UserInfo

const StyledUserInfoContainer = styled.div`
  width: 100%;

  margin-top: 24px;
  margin-bottom: 29px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  color: ${baseTheme.colors.light[100]};
`

export const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
const StyledBack = styled.div`
  margin: 0 12px;
`

const StyledImage = styled(Image)`
  border-radius: 30px;
`

export const StyledNameContainer = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;

  margin-left: 24px;
  margin-right: 6px;
  padding: auto;
`
const StyledUserName = styled.div`
  line-height: 24px;
  font-weight: 400px;
  font-size: 14px;

  text-decoration: underline;
`

export const StyledIdDateContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
`
export const StyledIdDate = styled.div`
  min-width: 172px;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`
const StyledTitle = styled.div`
  color: ${baseTheme.colors.light[900]};
`
