import { FC, PropsWithChildren } from 'react'

import { StaledTitle, StyledFormAuth } from '../../styles/styledComponents/auth/Auth.styled'

export const WrapperContainerAuth: FC<
  PropsWithChildren & { title: string; titleMarginBottom?: string }
> = props => {
  const { children, title, titleMarginBottom } = props

  return (
    <StyledFormAuth>
      <StaledTitle marginBottom={titleMarginBottom}>{title}</StaledTitle>
      {children}
    </StyledFormAuth>
  )
}
