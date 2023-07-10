import React from 'react';
import Image from "next/image";
import google from "../../public/img/icons/google-svgrepo-com.svg";
import github from "../../public/img/icons/github-svgrepo-com.svg";
import styled from "styled-components";
import {baseTheme} from "../../styles/styledComponents/theme";

const AuthIcons = () => {
  return (
    <StyledIconBlock>
      <Image width={36} height={36} src={google} alt={'google'}/>
      <Image width={36} height={36} src={github} alt={'github'}/>
      <Message>Now in development</Message>
    </StyledIconBlock>
  );
};

export default AuthIcons;

const StyledIconBlock = styled.div
  `
    position: relative;
    max-width: 132px;
    width: 100%;
    margin: 10px 50px 20px 50px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    &:hover div {
      display: block;
      text-align: center;      
    }

  `

const Message = styled.div
  `
    position: absolute;
    top: -65px;
    left: 16px;
    display: none;
    color: ${baseTheme.colors.danger["500"]};
    background: ${baseTheme.colors.dark["900"]};
    padding: 10px;
  `