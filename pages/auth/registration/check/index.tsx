import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { useLazyCheckLinkHandlerQuery } from '../../../../assets/store/api/auth/authApi'
import { Path } from '../../../../common/enums/path'
import { codeCheckLink } from '../../../../common/utils/codeCheckLink'

const CheckLink = () => {
  const { code } = codeCheckLink()
  const [checkLinkHandler] = useLazyCheckLinkHandlerQuery()
  const router = useRouter()

  useEffect(() => {
    checkLinkHandler(code)
      .unwrap()
      .then(() => {
        router.push(Path.REGISTRATION_SUCCESS).then(() => {})
      })
      .catch(() => {
        router.push(Path.REGISTRATION_ERROR).then(() => {})
      })
  }, [])

  return <div />
}

export default CheckLink
