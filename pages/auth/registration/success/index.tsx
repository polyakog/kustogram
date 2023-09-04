import React from 'react'

import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'

import { Button } from '../../../../common/components/Button/Button'
import { getLayout } from '../../../../common/components/Layout/BaseLayout/BaseLayout'
import VectorImage from '../../../../common/components/VectorImage'
import { Path } from '../../../../common/enums/path'
import { ThemeButton } from '../../../../common/enums/themeButton'
import { WrapperContainerNoFrame } from '../../../../features/auth/WrapperContainerNoFrame'
import mail from '../../../../public/img/icons/web-app-ui-sign-up-bro.svg'
import {
  StyledContainerAuth,
  StyledContainerButton,
  StyledImage,
} from '../../../../styles/styledComponents/auth/Auth.styled'
import {
  StyledSignInWrapper,
  StyledText,
} from '../../../../styles/styledComponents/auth/FormikAuth.styled'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'], config)),
    },
  }
}

const SuccessRegistration = () => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleClick = () => {
    router.push(Path.LOGIN)
  }

  return (
    <StyledContainerAuth>
      <WrapperContainerNoFrame title={t('congrat')}>
        <StyledSignInWrapper>
          <StyledText>{t('email_confirm')}</StyledText>
        </StyledSignInWrapper>
        <StyledContainerButton>
          <Button theme={ThemeButton.PRIMARY} type="button" width="182px" onClick={handleClick}>
            {t('sign_in')}
          </Button>
        </StyledContainerButton>

        <StyledImage>
          <VectorImage image={mail} imageWidth={423} screenWidth={447} />
        </StyledImage>
      </WrapperContainerNoFrame>
    </StyledContainerAuth>
  )
}

SuccessRegistration.getLayout = getLayout

export default SuccessRegistration
