import { FormikField } from "./FormikField";
import React from "react";
import { labelType } from "./types";
import { StyledErrorMsg, StyledInputContainer, StyledLabel, StyledTitle } from "./Formik.styled";

export const FormikLabel = ({
  title,
  name,
  border,
  id,
  errors,
  touched,
  type,
  value,
  onChange,
  children,
  width,
  errorShow,
  textAreaData,
  margin,
  t
}: labelType) => {
  return (
    <StyledLabel id={id} witherror={!!errors[name] && !!touched[name] ? "err" : ""} margin={margin}>
      <StyledTitle>
        <span>{title}</span>
      </StyledTitle>
      <StyledInputContainer>
        <FormikField
          name={name}
          border={border}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          width={width}
          textAreaData={textAreaData}
        />
        {children}
      </StyledInputContainer>
      {!!errors[name] && touched[name] && (
        <StyledErrorMsg errorShow={errorShow}>
          {t ? t(`${errors[name]}`) : errors[name]}
        </StyledErrorMsg>
      )}
    </StyledLabel>
  );
};
