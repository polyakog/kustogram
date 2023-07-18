import { TextAreaPropsType } from "./types";
import { ChangeEvent } from "react";
import { StyledTextArea } from "./Formik.styled";

export const FieldTextarea = (props: TextAreaPropsType) => {
  return (
    <StyledTextArea
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => props.onChange(e)}
      width={props.width}
    >
      {props.textAreaData}
    </StyledTextArea>
  );
};
