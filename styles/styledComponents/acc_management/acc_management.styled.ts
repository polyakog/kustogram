import Image from 'next/image'
import styled from 'styled-components'

export const ModalBtn = styled.button`
  width: 340px;
  color: white;
  border-radius: 2px;
  background: #397df6;
  cursor: pointer;
  padding: 6px;
  border: none;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const CurrentSubscription = styled.h2`
  font-weight: 600;
  font-size: 16px;
`

export const AutoRenewalWrapper = styled.div`
  display: flex;
  gap: 8px;
`

export const AutoRenewal = styled.p``

export const CheckBox = styled.input`
  accent-color: white;
  position: absolute;
  top: 6px;
  left: 6px;
`

export const CheckBoxWrapper = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  &:hover {
    background: #4c4c4c;
    border-radius: 50%;
    transition: 0.5s ease-in-out;
  }
`

export const SubscriptionsWrapper = styled(Column)`
  margin: 18px 0 13px;
  background: #171717;
  padding: 12px 24px;
  gap: 12px;
`

export const Wrapper = styled.div`
  display: flex;
  gap: 48px;
`

export const ExpireWrapper = styled(Column)`
  gap: 12px;
`

export const NextPayments = styled(Column)`
  gap: 12px;
  font-weight: 600;
`
export const SubscriptionsHeading = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #8d9094;
`

export const Date = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`

export const PageWrapper = styled(Column)`
  display: flex;
  flex-direction: column;
  gap: 40px;
`

export const Section = styled.section``

export const StyledTypeForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #171717;
  border: 1px solid #333;
  padding: 23px 12px;
  gap: 24px;
`

export const StyledPaymentsForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #171717;
  border: 1px solid #333;
  padding: 23px 12px;
  gap: 24px;
`

export const AccountType = styled.h2`
  font-size: 16px;
  color: white;
  margin-bottom: 6px;
  font-weight: 600;
`

export const Text = styled.span`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 400;
`

export const Type = styled.input.attrs({
  type: 'radio',
  name: 'type',
})`
  &:checked {
    accent-color: black;
  }
`

export const LabelType = styled.label.attrs({
  htmlFor: 'type',
})`
  margin-right: 12px;
`

export const PaymentsLabel = styled.label.attrs({
  htmlFor: 'payment',
})`
  margin-right: 12px;
`

export const Payment = styled.input.attrs({
  name: 'payment',
})`
  &:checked {
    accent-color: black;
  }
`

export const PaymentsSection = styled.section`
  align-self: flex-end;
  display: flex;
  gap: 54px;
  align-items: center;
`

export const PayPal = styled(Image)`
  cursor: pointer;
`

export const Stripe = styled(PayPal)``

export const SubscriptionCost = styled(AccountType)``
