import {PropsWithChildren} from "react";
import {NextPage} from "next";
import styled from "styled-components";
import {Header} from "../Header/Header";
import {themeProject} from "../../styles/styledComponents/Them.styled";

export const Layout:NextPage<PropsWithChildren> = (props)=>{
  const {children} = props

  return (
    <StyledPageWrapper>
      <Header/>
      <Main>{children}</Main>
    </StyledPageWrapper>
  )
}

const StyledPageWrapper = styled.div
  `
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    background: ${themeProject.colors.dark_700};;
    color: white;
  `


const Main = styled.div
`
  display: flex;
  justify-content: center;
  align-items: center;
`

