import {Field} from "formik"
import styled from "styled-components"
import {baseTheme} from "../../../styles/styledComponents/theme";
import {ChangeEvent} from "react";
import {FiledProps} from "./types";


export const FormikField = (props: FiledProps) => {
  console.log(props.type)
  return (
    (props.type !== 'textarea')
      ? <StyledField {...props} onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
                     width={props.width}/>
      : <FieldTextarea {...props} onChange={(e) => props.onChange(e.target.value)} width={props.width}/>
  )
}


type TextAreaPropsType = {
  id?:string
  type?: string
  border?: string
  name?: string
  value?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  width?: string
}
const FieldTextarea = (props: TextAreaPropsType) => {
  return (
    <StyledTextArea onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.onChange(e)}
                    width={props.width}/>
  )
}


export const StyledField = styled(Field)
  `
    max-width: ${props => props.width ? props.width : '330px'};
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
    -webkit-text-fill-color: ${baseTheme.colors.light[900]};


    &::-webkit-calendar-picker-indicator {
      filter: invert(100%);
      background-size: 18px;
      margin: 0 10px 5px 0;
    }

    @media (max-width: 390px) {
      width: 80vw;
      max-width: ${props => props.width ? '40vw' : '330px'};
    }

  `
// const StyledTextArea = styled(StyledField)<TextAreaPropsType>
// `
//   max-width: ${props => props.width };
//   width:100%;
//   height: 250px;
// `

const StyledTextArea = styled.textarea<TextAreaPropsType>
  `
    max-width: ${props => props.width ? props.width : '330px'};
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
    -webkit-text-fill-color: ${baseTheme.colors.light[900]};


    &::-webkit-calendar-picker-indicator {
      filter: invert(100%);
      background-size: 18px;
      margin: 0 10px 5px 0;
    }

    @media (max-width: 390px) {
      width: 80vw;
      max-width: ${props => props.width ? '40vw' : '330px'};
    }
  `
