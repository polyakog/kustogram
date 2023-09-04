import { ChangeEvent } from 'react'

import { FieldTextarea } from './FieldTextarea'
import { StyledField } from './Formik.styled'
import { FiledProps } from './types'

export const FormikField = ({ width, onChange, value, ...props }: FiledProps) => {
  return props.type !== 'textarea' ? (
    <StyledField
      {...props}
      width={width}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  ) : (
    <FieldTextarea
      {...props}
      value={value}
      width={width}
      onChange={e => onChange(e.target.value)}
    />
  )
}
