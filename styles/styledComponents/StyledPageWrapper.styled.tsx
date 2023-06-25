import styled from "styled-components";
import {themeProject} from "./Them.styled";

export const StyledPageWrapper = styled.div
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