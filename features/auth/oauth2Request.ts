import { ProviderData, ProvidersPropsType } from './types'

export const oauthRequest = (providerName: string, providerParams: ProvidersPropsType) => {
  let url = ''
  let data: ProviderData = {
    AUTH_URL: '',
    SCOPE: '',
    REDIRECT_URI: '',
    ID: '',
  }

  if (providerName === 'google') {
    data = providerParams.provider.google
  }
  if (providerName === 'github') {
    data = providerParams.provider.github
  }
  url = `${data.AUTH_URL}?scope=${data.SCOPE}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${data.REDIRECT_URI}&client_id=${data.ID}`

  return url
}
