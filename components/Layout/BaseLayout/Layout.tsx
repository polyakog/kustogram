import Header from "components/Header/Header";
import { NextPage } from "next";
import { PropsWithChildren } from "react";
import styled from "styled-components";

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const { children } = props
    return (
        <Container>
            <HeaderStyle><Header /></HeaderStyle> 

            <Main>{children}</Main>
        </Container>
    )
}

const Container = styled.div`
display: flex;
width: 1280px;
padding: 0px 0px 12px 0px;
flex-direction: column;
align-items: center;
gap: 24px;
`
const HeaderStyle = styled.div`
width: 1280px;
height: 60px;
`

const Main = styled.div`
// width: 100%;
// padding-botton: 10px;
overflow: hidden;
`