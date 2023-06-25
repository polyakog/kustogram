import React from 'react';
import styled from "styled-components";
import {themeProject} from "../../styles/styledComponents/Them.styled";

export const Header = () => {
  return (
    <StyledHeader>
      Inctagram
    </StyledHeader>
  );
};

const StyledHeader = styled.div
  `
    width: 100%;
    height: 60px;
    background: ${themeProject.colors.dark_700};
    border: 1px solid ${themeProject.colors.dark_300};
    display: flex;
    justify-content: center;
    align-items: center;
  `
