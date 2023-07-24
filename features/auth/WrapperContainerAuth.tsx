import React, {FC, PropsWithChildren} from 'react';
import {StaledTitle, StyledFormAuth} from "../../styles/styledComponents/auth/Auth.styled";

export const WrapperContainerAuth: FC<PropsWithChildren&{title:string}>=  (props)=> {
  const {children, title} = props
  return (
    <StyledFormAuth>
      <StaledTitle>{title}</StaledTitle>
      {children}
    </StyledFormAuth>
  )
}

