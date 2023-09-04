import { StyledErrorMsg, StyledInputContainer, StyledLabel, StyledTitle } from './Formik.styled'
import { FormikField } from './FormikField'
import { labelType } from './types'

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
  t,
}: labelType) => {
  return (
    <StyledLabel id={id} margin={margin} witherror={!!errors[name] && !!touched[name] ? 'err' : ''}>
      <StyledTitle>
        <span>{title}</span>
      </StyledTitle>
      <StyledInputContainer>
        <FormikField
          border={border}
          name={name}
          textAreaData={textAreaData}
          type={type}
          value={value}
          width={width}
          onChange={e => onChange(e)}
        />
        {children}
      </StyledInputContainer>
      {!!errors[name] && touched[name] && (
        <StyledErrorMsg errorShow={errorShow}>
          {t ? t(`${errors[name]}`) : errors[name]}
        </StyledErrorMsg>
      )}
    </StyledLabel>
  )
}
