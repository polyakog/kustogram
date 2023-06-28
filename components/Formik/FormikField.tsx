import { Field } from "formik"
import styled from "styled-components"
import {baseTheme} from "../../styles/styledComponents/theme";

type FiledProps = {
  type?: string
  border?: string
  name?: string
}

export const StyledField = styled(Field)
  `
    width: 100%;
    height: 36px;
    padding-left: 8px;
        
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
 
`

export const FormikField = (props: FiledProps) => {
  return <StyledField {...props} />
}

