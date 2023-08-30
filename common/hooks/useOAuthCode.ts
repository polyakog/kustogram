import { useEffect } from 'react'

import {
  useLoginWithGithubMutation,
  useLoginWithGoogleMutation,
} from 'assets/store/api/auth/authApi'
import { useLocalStorage } from 'common/hooks/useLocalStorage'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { redirect } from 'pages/auth/login'

type PropsType = {
  isGithub?: boolean
  isGoogle?: boolean
}

export const useOAuthCode = (provider: PropsType) =>
  // provider: PropsType
  {
    const route = useRouter()
    const [loginGoogleHandler, { data: GoogleData }] = useLoginWithGoogleMutation()
    const [loginGithubHandler, { data: GithubData }] = useLoginWithGithubMutation()
    const { removeItem, setItem } = useLocalStorage()

    const searchParams = useSearchParams()
    const code = searchParams.get('code')

    const handle = async (code: { code: string }, provider: PropsType) => {
      const getProfile = provider.isGoogle ? loginGoogleHandler : loginGithubHandler

      try {
        await getProfile(code)
          .unwrap()
          .then(res => {
            console.log(`SUCCESSFULL LOGIN WITH ${provider.isGoogle ? 'GOOGLE' : 'GITHUB'}`, res)

            redirect(res, setItem, route)
          })
          .catch(err => console.log('ошибка входа:', err))
      } catch (error) {
        console.log('Login Error With Google/Github:', error)
      }
    }

    useEffect(() => {
      if (code) {
        console.log(code)
        if (provider.isGoogle) {
          handle({ code }, { isGoogle: true, isGithub: false })
          console.log('isGoogle request')
        }

        if (provider.isGithub) {
          handle({ code }, { isGoogle: false, isGithub: true })
          console.log('isGithub request')
        }
      }
    }, [code])

    useEffect(() => {
      if (GoogleData) console.log('GoogleData:', GoogleData)
      if (GithubData) console.log('GithubData:', GithubData)
    }, [])
  }
