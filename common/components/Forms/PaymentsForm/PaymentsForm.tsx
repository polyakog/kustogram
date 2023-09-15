import { useFormik } from 'formik'
import { TFunction } from 'i18next'
import {
  Payment,
  PaymentsLabel,
  StyledPaymentsForm,
  Text,
} from 'styles/styledComponents/acc_management/acc_management.styled'

type FormProps = {
  selectedPayment: string
  setSelectedId: (id: string) => void
  setSelectedPayment: (payment: string) => void
  t: TFunction<'translation', undefined>
}

export const PaymentsForm = ({
  t,
  setSelectedId,
  selectedPayment,
  setSelectedPayment,
}: FormProps) => {
  const payments = [t('2_1_Day'), t('5_3_Day'), t('10_7_Day'), t('30_month')]

  const setInitialPayment = () => {
    if (selectedPayment === '5.5 долларов США за 3 дня' || selectedPayment === '$5.5 per 3 Day') {
      return t('5_3_Day')
    }
    if (selectedPayment === '10 долларов США за 7 дней' || selectedPayment === '$10 per 7 Day') {
      return t('10_7_Day')
    }
    if (selectedPayment === '30 долларов США за месяц' || selectedPayment === '$30 per month') {
      return t('30_month')
    }

    return t('2_1_Day')
  }

  const paymentsForm = useFormik({
    initialValues: {
      payment: setInitialPayment(),
    },
    enableReinitialize: true,
    onSubmit: values => console.log(values),
  })

  const setParams = (payment: string, index: number) => {
    setSelectedPayment(payment)
    const id = (index + 1).toString()

    setSelectedId(id)
  }

  return (
    <StyledPaymentsForm onSubmit={paymentsForm.handleSubmit}>
      {payments.map((payment, index) => (
        <PaymentsLabel key={payment}>
          <Payment
            checked={paymentsForm.values.payment === payment}
            type="radio"
            value={payment}
            onChange={paymentsForm.handleChange}
            onClick={() => setParams(payment, index)}
          />
          <Text>{payment}</Text>
        </PaymentsLabel>
      ))}
    </StyledPaymentsForm>
  )
}
