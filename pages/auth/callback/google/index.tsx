import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { useOAuthCode } from 'common/hooks/useOAuthCode'
import { useEffect, useState } from 'react'
import {
  SigninOauthWrapper,
  StyledOauthBody,
  StyledOauthErrorBody,
  StyledOauthHeader,
  StyledOauthText,
  StyledOauthTitle,
} from 'styles/styledComponents/auth/signin.styled'
import { LoadingStyle } from 'styles/styledComponents/profile/profile.styled'
import { baseTheme } from 'styles/styledComponents/theme'

export type ErrorType = {
  data: { errorsMessages: Array<{ message: string }> }
}

const GoogleRedirect = () => {
  const [connectionError, setConnectionError] = useState<ErrorType>()
  const [accountError, setAccountError] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const provider = { isGoogle: true, isGithub: false }
  const [errors, setErrors] = useState(false)

  useOAuthCode({ provider, setConnectionError, setAccountError, setStatus })

  useEffect(() => {
    if (connectionError)
      console.log(
        `%c Connection Error: ${connectionError.data.errorsMessages[0].message}`,
        consoleStyle
      )
    if (accountError) console.log(`%c Account Error: ${accountError}`, consoleStyle)

    if (connectionError || accountError) {
      setErrors(true)
    }
  }, [connectionError, accountError])

  if (!!connectionError || !!accountError) {
    const error = true
  }

  return (
    <div>
      {status !== 'rejected' && status !== 'fulfilled' && (
        <div style={LoadingStyle}>Loading...</div>
      )}
      {status === 'rejected' && <div style={LoadingStyle}>Sorry! Connection is rejected</div>}
      <SigninOauthWrapper>
        <StyledOauthHeader>
          <StyledOauthTitle>Connecting to your Google account</StyledOauthTitle>
        </StyledOauthHeader>
        <StyledOauthErrorBody>
          {connectionError && <StyledOauthText>Server connection error</StyledOauthText>}
          {accountError && <StyledOauthText>Google account connection error</StyledOauthText>}
        </StyledOauthErrorBody>
        {!errors && (
          <StyledOauthBody>
            <StyledOauthText>Success: connecting ... </StyledOauthText>
          </StyledOauthBody>
        )}
      </SigninOauthWrapper>
    </div>
  )
}

GoogleRedirect.getLayout = getLayout
export default GoogleRedirect

const consoleStyle = `
padding: 20px;
background-color: ${baseTheme.colors.danger[100]};
border-radius: 20px;
color: white}`
