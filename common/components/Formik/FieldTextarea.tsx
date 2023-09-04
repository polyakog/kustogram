import { ChangeEvent } from 'react'

import { StyledTextArea } from './Formik.styled'
import { TextAreaPropsType } from './types'

export const FieldTextarea = ({ value, width, onChange }: TextAreaPropsType) => {
  return (
    <StyledTextArea
      value={value}
      width={width}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e)}
    />
  )
}
