import {
  SigninOauthWrapper,
  StyledOAuthBlockButton,
  StyledOautSuccessBody,
  StyledOauthBody,
  StyledOauthErrorBody,
  StyledOauthHeader,
  StyledOauthText,
  StyledOauthTitle,
} from 'styles/styledComponents/auth/signin.styled'
import { LoadingStyle } from 'styles/styledComponents/profile/profile.styled'
import { baseTheme } from 'styles/styledComponents/theme'
import { Button } from 'common/components/Button/Button'

import { useTranslation } from 'next-i18next'

import { ThemeButton } from 'common/enums/themeButton'
import { Path } from 'common/enums/path'
import { useState, useEffect } from 'react'
import { ErrorType } from 'pages/auth/callback/google'
import { ProviderType } from 'common/hooks/useOAuthCode'

type PropsType = {
  connectionError: ErrorType | undefined
  accountError: string | undefined
  status: string
  provider: ProviderType
}

export const Oauth = ({ connectionError, accountError, status, provider }: PropsType) => {
  const [errors, setErrors] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (connectionError) {
      if (connectionError.status! >= 500) {
        console.log(`%c Internal server error ${connectionError.status}`, consoleStyle)
      } else if (connectionError.data.errorsMessages) {
        console.log(
          `%c Connection Error: ${connectionError.status} _ ${connectionError.data.errorsMessages[0].message} `,
          consoleStyle
        )
      } else console.log('Some Connection Error')
      console.log(connectionError)
    }

    if (accountError) console.log(`%c Account Error: ${accountError}`, consoleStyle)

    if (!!connectionError || !!accountError) {
      setErrors(true)
    }
  }, [connectionError, accountError])

  useEffect(() => {}, [errors])

  return (
    <div>
      {status !== 'rejected' && status !== 'fulfilled' && !errors && (
        <div style={LoadingStyle}>{t('loading')} ...</div>
      )}
      {status === 'rejected' && <div style={LoadingStyle}> {t('con_rejected')} </div>}
      <SigninOauthWrapper>
        <StyledOauthHeader>
          <StyledOauthTitle>{t(provider.isGoogle ? 'google_con' : 'github_con')}</StyledOauthTitle>
        </StyledOauthHeader>

        {errors && (
          <StyledOauthBody>
            <StyledOauthErrorBody>
              {connectionError && <StyledOauthText>{t('server_err')}</StyledOauthText>}
              {accountError && (
                <StyledOauthText>
                  {t(provider.isGoogle ? 'google_err' : 'github_err')}
                </StyledOauthText>
              )}
            </StyledOauthErrorBody>
            <StyledOauthText>{t('not_success')} </StyledOauthText>
            <StyledOauthText>{t('try_again')}</StyledOauthText>
            <StyledOAuthBlockButton>
              <Button
                theme={ThemeButton.PRIMARY}
                type="button"
                width="auto"
                onClick={() => window.location.assign(Path.LOGIN)}
              >
                OK
              </Button>
            </StyledOAuthBlockButton>
          </StyledOauthBody>
        )}

        {!errors && (
          <StyledOauthBody>
            <StyledOautSuccessBody>
              <StyledOauthText>{t('success')} </StyledOauthText>
            </StyledOautSuccessBody>
          </StyledOauthBody>
        )}
      </SigninOauthWrapper>
    </div>
  )
}

const consoleStyle = `
padding: 20px;
background-color: ${baseTheme.colors.danger[100]};
border-radius: 20px;
color: white}`
