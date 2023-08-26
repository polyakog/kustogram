import { ChangeEvent } from "react";
import { FiledProps } from "./types";
import { StyledField } from "./Formik.styled";
import { FieldTextarea } from "./FieldTextarea";

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
