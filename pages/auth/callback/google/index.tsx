import { getLayout } from 'common/components/Layout/BaseLayout/BaseLayout'
import { useOAuthCode } from 'common/hooks/useOAuthCode'

const GoogleRedirect = () => {
  useOAuthCode({ isGoogle: true })
}

GoogleRedirect.getLayout = getLayout
export default GoogleRedirect
