import React, {FC, PropsWithChildren} from 'react';
import styled from "styled-components";
import {baseTheme} from "../../../styles/styledComponents/theme";
import {FormAuthPropsType} from "../types";

export const WrapperContainerAuth: FC<PropsWithChildren&{title:string}>=  (props)=> {
  const {children, title} = props
  return (
    <StyledFormAuth>
      <StaledTitle>{title}</StaledTitle>
      {children}
    </StyledFormAuth>
  )
}

export const StyledFormAuth = styled.div<FormAuthPropsType>
  `
    max-width: ${props => props.width?props.width:'378px'};
    width: 100%;
    height: ${props => props.height?props.height:'auto'};
    padding: 20px;
    
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    
    background: ${baseTheme.colors.dark["500"]};
    border: 1px solid ${baseTheme.colors.dark["300"]};

    @media (max-width: 390px){
      max-width: ${props => props.width?props.width:'90vw'};
    }
  `

export const StaledTitle = styled.h1
  `
    width: 100%;
    text-align: center;
    margin: 0;

    font-size: 20px;
    font-family: Arial;
    font-weight: 700;
    line-height: 36px;
    
    color: ${baseTheme.colors.light["100"]};
  `
