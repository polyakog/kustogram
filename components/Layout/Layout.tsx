import {PropsWithChildren} from "react";
import {NextPage} from "next";
import styled from "styled-components";
import {StyledPageWrapper} from "../../styles/styledComponents/StyledPageWrapper.styled";
import {Header} from "../Header/Header";

export const Layout:NextPage<PropsWithChildren> = (props)=>{
  const {children} = props

  return (
    <StyledPageWrapper>
      <Header/>
      <Main>{children}</Main>
    </StyledPageWrapper>
  )
}



const Main = styled.div
`
  display: flex;
  justify-content: center;
  align-items: center;
`

