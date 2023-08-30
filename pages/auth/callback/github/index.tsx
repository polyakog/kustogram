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
import { ErrorType } from '../google'

const GithubRedirect = () => {
  const [connectionError, setConnectionError] = useState<ErrorType>()
  const [accountError, setAccountError] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const provider = { isGoogle: false, isGithub: true }
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

  return (
    <div>
      {status !== 'rejected' && status !== 'fulfilled' && (
        <div style={LoadingStyle}>Loading...</div>
      )}
      {status === 'rejected' && <div style={LoadingStyle}>Sorry! Connection is rejected</div>}
      <SigninOauthWrapper>
        <StyledOauthHeader>
          <StyledOauthTitle>Connecting to your GitHub account</StyledOauthTitle>
        </StyledOauthHeader>
        <StyledOauthErrorBody>
          {connectionError && <StyledOauthText>Server connection error</StyledOauthText>}
          {accountError && <StyledOauthText>GitHub account connection error</StyledOauthText>}
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

GithubRedirect.getLayout = getLayout
export default GithubRedirect

const consoleStyle = `
padding: 20px;
background-color: ${baseTheme.colors.danger[100]};
border-radius: 20px;
color: white}`
