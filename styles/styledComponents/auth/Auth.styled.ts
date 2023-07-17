import { FormAuthPropsType } from "../../../features/auth/types";
import styled from "styled-components";
import Link from "next/link";
import { baseTheme } from "../theme";

export const StyledContainerAuth = styled.div`
  width: 96vw;
  min-height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

//WrapperContainerAuth
export const StyledFormAuth = styled.div<FormAuthPropsType>`
  max-width: ${(props) => (props.width ? props.width : "378px")};
  width: 100%;
  height: ${(props) => (props.height ? props.height : "auto")};
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;

  background: ${baseTheme.colors.dark["500"]};
  border: 1px solid ${baseTheme.colors.dark["300"]};

  @media (max-width: 390px) {
    max-width: ${(props) => (props.width ? props.width : "90vw")};
  }
`;

export const StaledTitle = styled.h1<{ marginBottom?: string }>`
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : "0")};

  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;

  color: ${baseTheme.colors.light["100"]};
`;

//Login

export const StyledForgotLink = styled(Link)`
  color: ${baseTheme.colors.light[900]};
  font-weight: 400;
  font-size: 14px;
  font-family: Inter;
  line-height: 24px;
`;
export const StyledLinkBlock = styled.div`
  width: 100%;
  text-align: right;
  padding-bottom: 24px;
`;
// Success
export const StyledContainerButton = styled.div`
  margin-top: 38px;
`;
export const StyledImage = styled.div`
  margin-top: 72px;
`;
// VerificationError
export const StyledContainerButtonVer = styled.div`
  margin-top: 30px;
`;
export const StyledImageVer = styled.div`
  margin-top: 25px;
`;
