import { Field } from "formik"
import styled from "styled-components"
import {baseTheme} from "../../styles/styledComponents/theme";
import {ChangeEvent} from "react";
import {FiledProps} from "./types";



export const FormikField = (props: FiledProps) => {
  return <StyledField {...props} onChange={(e: ChangeEvent<HTMLInputElement>)=>props.onChange(e.target.value)}/>
}

export const StyledField = styled(Field)
  `
    max-width: 330px;
    width: 100%;
    height: 36px;
    padding-left: 8px;
    position: relative;

    font-size: 14px;

    outline: none;
    border: ${(props) =>
            props.border === "red"
                    ? `1px solid ${baseTheme.colors.danger[500]}`
                    : `1px solid ${baseTheme.colors.dark[100]}`};
    background: ${baseTheme.colors.dark[500]};
    color: ${baseTheme.colors.light[100]};
    box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]};
    -webkit-text-fill-color: ${baseTheme.colors.light[900]};

    @media (max-width: 390px) {
      width: 80vw
    }

  `