"use client";

import { styled } from "styled-components";
import { baseTheme } from "../constants/theme";
import { Field, Form } from "formik";
import Image from "next/image";
import Link from "next/link";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 378px;
  height: 624px;
  margin: 0 auto;

  background: ${baseTheme.colors.dark["300"]};
`;

export const StyledTitle = styled.h2`
  color: ${baseTheme.colors.light["100"]};

  font-size: 20px;
  font-weight: 700;
  line-height: 36px;
  margin: 15px 0 8px;
`;

export const StyledSocialMediaWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 15px;
`;

export const StyledSocialMediaIcon = styled(Image)`
  cursor: pointer;
`;

export const StyledForm = styled(Form)`
  color: #8d9094;

  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    font-size: 16px;
    width: 330px;
    height: 100px;
  }

  #pass {
    position: relative;
  }
`;

export const StyledField = styled(Field)`
  font-size: 14px;
  width: 100%;
  height: 36px;
  border: ${(props) =>
    props.border === "red"
      ? `1px solid ${baseTheme.colors.danger[500]}`
      : `1px solid ${baseTheme.colors.dark[100]}`};
  background: ${baseTheme.colors.dark[500]};
  color: ${baseTheme.colors.light[100]};
`;

export const StyledBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  height: 40px;
  width: 330px;

  color: ${baseTheme.colors.light["100"]};
  background: ${baseTheme.colors.accent["500"]};
`;

export const StyledShowPasswordBtn = styled(Image)`
  position: absolute;
  top: 25px;
  right: 12px;
`;

export const StyledErrorMsg = styled.div`
  color: ${baseTheme.colors.danger["500"]};
`;

export const StyledText = styled.p`
  color: ${baseTheme.colors.light[100]};
  line-height: 24px;
`;

export const StyledSignIn = styled(Link)`
  text-decoration: none;
  color: ${baseTheme.colors.accent[500]};
  font-weight: 600;
`;

export const StyledSignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 18px;
  justify-content: center;
  align-items: center;
`;
