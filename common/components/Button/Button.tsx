import { FC } from 'react'

import { useButtonColorType } from '../../hooks/useButtonColorType'

import { StyledButton } from './StyledButton.styled'
import { ButtonPropsType } from './types'

export const Button: FC<ButtonPropsType> = ({ children, theme, width, ...otherProps }) => {
  const { handler } = useButtonColorType()

  return (
    <StyledButton handler={handler(theme)} theme={theme} width={width} {...otherProps}>
      {children}
    </StyledButton>
  )
}
