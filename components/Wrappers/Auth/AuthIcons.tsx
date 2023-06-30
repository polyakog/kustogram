import React from 'react';
import Image from "next/image";
import google from "../../../public/icons/google-svgrepo-com.svg";
import github from "../../../public/icons/github-svgrepo-com.svg";
import styled from "styled-components";

const AuthIcons = () => {
  return (
    <StyledIconBlock>
      <Image width={36} height={36} src={google} alt={'google'}/>
      <Image width={36} height={36} src={github} alt={'github'}/>
    </StyledIconBlock>
  );
};

export default AuthIcons;

const StyledIconBlock = styled.div
  `
    max-width: 132px;
    width: 100%;
    margin: 10px 50px 20px 50px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `