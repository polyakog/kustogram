import { useEffect } from 'react'

import {
  useLoginWithGithubMutation,
  useLoginWithGoogleMutation,
} from 'assets/store/api/auth/authApi'
import { useLocalStorage } from 'common/hooks/useLocalStorage'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { redirect } from 'pages/auth/login'
import { ErrorType } from 'pages/auth/callback/google'

type ProviderType = {
  isGithub?: boolean
  isGoogle?: boolean
}

type CodeType = {
  provider: ProviderType
  setConnectionError: (conError: ErrorType) => void
  setAccountError: (accError: string) => void
  setStatus: (status: string) => void
}

export const useOAuthCode = ({
  provider,
  setConnectionError,
  setAccountError,
  setStatus,
}: CodeType) => {
  const route = useRouter()
  const [loginGoogleHandler, { data: GoogleData, status: GoogleStatus }] =
    useLoginWithGoogleMutation()
  const [loginGithubHandler, { data: GithubData, status: GithubStatus }] =
    useLoginWithGithubMutation()
  const { removeItem, setItem } = useLocalStorage()

  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const accError = searchParams.get('error')

  const handle = async (code: { code: string }, provider: ProviderType) => {
    const getProfile = provider.isGoogle ? loginGoogleHandler : loginGithubHandler

    try {
      await getProfile(code)
        .unwrap()
        .then(res => {
          console.log(`SUCCESSFULL LOGIN WITH ${provider.isGoogle ? 'GOOGLE' : 'GITHUB'}`, res)

          redirect(res, setItem, route)
        })
        .catch(err => {
          console.log('ошибка входа:', err)
          setConnectionError(err)
        })
    } catch (error) {
      console.log('Login Error With Google/Github:', error)
    }
  }

  useEffect(() => {
    if (code) {
      console.log(code)
      handle({ code }, provider)
    }

    if (accError) {
      console.log(accError)
      setAccountError(accError)
    }
  }, [code, accError])

  useEffect(() => {
    if (GoogleStatus) setStatus(GoogleStatus)
    if (GithubStatus) setStatus(GithubStatus)
  }, [GoogleStatus, GithubStatus])

  useEffect(() => {
    if (GoogleData) console.log('GoogleData:', GoogleData)
    if (GithubData) console.log('GithubData:', GithubData)
  }, [])
}
