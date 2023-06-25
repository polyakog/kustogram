import React, {useRef, useState} from 'react';
import styled from "styled-components";
import {themeProject} from "../../styles/styledComponents/Them.styled";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import google from '../../public/icons/google-svgrepo-com 1.svg'
import github from '../../public/icons/github-svgrepo-com (3) 1.svg'
import Image from "next/image";


const Login = () => {

  return (
    // <StyledPageWrapper>
    <StyledModal width={'378px'} height={'516px'} >
      <Title>Sing In</Title>
      <div>
        <Image  src={google} alt={'Kusto'}/>
        <Image  src={github} alt={'it'}/>
      </div>
    </StyledModal>
    // </StyledPageWrapper>
  );
};

Login.getLayout = getLayout
export default Login;

type ModalPropsType = {
  width: string
  height: string
}

const StyledModal = styled.div<ModalPropsType>
  `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${themeProject.colors.dark_500};
    border: 1px solid ${themeProject.colors.dark_300};
  `

const Title = styled.h1
`
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
  color:${themeProject.colors.light_100}
`





