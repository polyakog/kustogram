export type FormAuthPropsType = {
  height?: string
  width?: string
}

export type VerificationWindowType = {
  btnTitle: string
  handleClick: () => void
  text: string
  title: string
}

export type ProviderData = {
  AUTH_URL: string
  SCOPE: string
  REDIRECT_URI: string
  ID: string
}

export type ProvidersPropsType = {
  provider: {
    google: ProviderData
    github: ProviderData
  }
}
