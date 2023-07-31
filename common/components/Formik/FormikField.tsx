import {Field} from "formik"
import styled from "styled-components"
import {baseTheme} from "../../../styles/styledComponents/theme";
import {ChangeEvent} from "react";
import {FiledProps} from "./types";


export const FormikField = (props: FiledProps) => {
  return props.type !== "textarea" ? (
    <StyledField
      {...props}
      onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)}
      width={props.width}
    />
  ) : (
    <FieldTextarea
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
      width={props.width}
      value={props.value}
    />
  );
};

    @media (max-width: 390px) {
      width: 80vw;
      max-width: ${props => props.width ? '40vw' : '330px'};
    }
  `