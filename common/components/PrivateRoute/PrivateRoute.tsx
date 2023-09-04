import { useEffect, ReactNode } from 'react'

import { Path } from 'common/enums/path'
import { useAuth } from 'common/hooks/useAuth'
import { useRouter } from 'next/router'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const canActivate = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!canActivate) {
      router.push(Path.LOGIN)
    }
  }, [canActivate])

  return <div>{children}</div>
}

export default PrivateRoute
