import styled from "styled-components";
import { Field } from "formik";
import { baseTheme } from "../../../styles/styledComponents/theme";
import { StyledErrorMsgPropsType, TextAreaPropsType } from "./types";

//FormikField
export const StyledField = styled(Field)`
  max-width: ${(props) => (props.width ? props.width : "330px")};
  width: 100%;
  height: 36px;
  padding-left: 8px;
  position: relative;

  font-size: 14px;

  outline: none;
  border-radius: 2px;
  border: ${(props) =>
    props.border === "red"
      ? `1px solid ${baseTheme.colors.danger[500]}`
      : `1px solid ${baseTheme.colors.dark[100]}`};
  background: ${baseTheme.colors.dark[500]};
  color: ${baseTheme.colors.light[100]};
  box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]};
  -webkit-text-fill-color: ${baseTheme.colors.light[100]};

  &::-webkit-calendar-picker-indicator {
    filter: invert(100%);
    background-size: 18px;
    margin: 0 10px 5px 0;
  }

  @media (max-width: 390px) {
    width: 80vw;
    max-width: ${(props) => (props.width ? "40vw" : "330px")};
  }
`;

export const StyledTextArea = styled.textarea<TextAreaPropsType>`
  max-width: ${(props) => (props.width ? props.width : "330px")};
  width: 100%;
  height: 84px;
  padding-left: 8px;
  position: relative;

  font-size: 14px;

  outline: none;
  border-radius: 2px;
  border: ${(props) =>
    props.border === "red"
      ? `1px solid ${baseTheme.colors.danger[500]}`
      : `1px solid ${baseTheme.colors.dark[100]}`};
  background: ${baseTheme.colors.dark[500]};
  color: ${baseTheme.colors.light[100]};
  box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]};
  -webkit-text-fill-color: ${baseTheme.colors.light[100]};

  &::-webkit-calendar-picker-indicator {
    filter: invert(100%);
    background-size: 18px;
    margin: 0 10px 5px 0;
  }

  @media (max-width: 390px) {
    width: 80vw;
    max-width: ${(props) => (props.width ? "40vw" : "330px")};
  }
`;

//FormikLabel
export const StyledInputContainer = styled.div`
  position: relative;
`;

export const StyledLabel = styled.label<{ withError: boolean; marginBottom?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: Inter;
  font-size: 16px;

  margin-bottom: ${(props) => (props.withError ? 0 : props.marginBottom || "24px")};
`;

export const StyledErrorMsg = styled.div<StyledErrorMsgPropsType>`
  width: 100%;
  font-family: Inter;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  line-height: 24px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: ${baseTheme.colors.danger["500"]};
`;

export const StyledTitle = styled(StyledErrorMsg)`
  color: ${baseTheme.colors.light["900"]};

  & span::first-letter {
    text-transform: uppercase;
  }
`;
