import { ThemeProvider } from '@emotion/react'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import { theme } from 'common/components/Calendar/theme'
import { StyledErrorMsg } from 'common/components/Formik/Formik.styled'
import { useField, useFormikContext } from 'formik'
import { TFunction } from 'next-i18next'

import { StyledTitle } from '../Formik/Formik.styled'

import { themeError } from './themeError'

// Add a name property and reuse the date picker props.
type Props<TDate> = DatePickerProps<TDate> & {
  name: string
  t: TFunction
}

const Calendar = <TDate,>({ name, t }: Props<TDate>) => {
  const [field, meta] = useField(name)
  const { setFieldValue } = useFormikContext()

  console.log(field.value)

  return (
    <>
      <StyledTitle>
        <span>{t('date_of_birthday')}</span>
      </StyledTitle>
      <ThemeProvider theme={meta.error && meta.touched ? themeError : theme}>
        <DatePicker
          format="DD/MM/YYYY"
          value={field.value}
          disableFuture
          onChange={newValue => {
            setFieldValue(name, newValue)
          }}
        />
        {meta.error && meta.touched && (
          <StyledErrorMsg>{t ? t(`${meta.error}`) : meta.error}</StyledErrorMsg>
        )}
      </ThemeProvider>
    </>
  )
}

export default Calendar
