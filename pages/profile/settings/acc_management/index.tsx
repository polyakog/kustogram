import React, { useState } from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/PageLayout/PageLayout";
import { styled } from "styled-components";
import Image from "next/image";
import stripe from "public/img/icons/stripe-svgrepo-com.svg";
import paypal from "public/img/icons/paypal-svgrepo-com.svg";

const payments = ["$10 per 1 Day", "$50 per 7 Day", "$100 per month"];
const accountType = ["Personal", "Business"];

const AccountManagement = () => {
  const [accountTypeChecked, setAccountTypeChecked] = useState([true, false]);
  const [paymentChecked, setPaymentChecked] = useState([true, false, false]);

  const selectAccountType = (ind: number) => {
    setAccountTypeChecked((accountTypeChecked) =>
      accountTypeChecked.map((item, index) => {
        if (ind === index) {
          item = true;
        } else {
          item = false;
        }
        return item;
      })
    );
  };

  const selectPayment = (ind: number) => {
    setPaymentChecked((paymentChecked) =>
      paymentChecked.map((item, index) => {
        if (index === ind) {
          item = true;
        } else {
          item = false;
        }
        return item;
      })
    );
  };

  return (
    <SettingsPageWrapper>
      <PageWrapper>
        <Section>
          <AccountType>Account type:</AccountType>
          <TypeForm>
            {accountType.map((type, index) => (
              <LabelType key={type}>
                <Type
                  checked={accountTypeChecked[index]}
                  onChange={() => selectAccountType(index)}
                />
                <Text>{type}</Text>
              </LabelType>
            ))}
          </TypeForm>
        </Section>
        {accountTypeChecked[1] && (
          <>
            <Section>
              <SubscriptionCost>Your subscription costs:</SubscriptionCost>
              <PaymentsForm>
                {payments.map((payment, index) => (
                  <PaymentsLabel key={payment}>
                    <Payment
                      checked={paymentChecked[index]}
                      onChange={() => selectPayment(index)}
                    />
                    <Text>{payment}</Text>
                  </PaymentsLabel>
                ))}
              </PaymentsForm>
            </Section>
            <PaymentsSection>
              <PayPal alt="paypal" src={paypal} />
              <Text>Or</Text>
              <Stripe alt="stripe" src={stripe} />
            </PaymentsSection>
          </>
        )}
      </PageWrapper>
    </SettingsPageWrapper>
  );
};

AccountManagement.getLayout = getLayout;
export default AccountManagement;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.section``;

const TypeForm = styled.form`
  display: flex;
  flex-direction: column;
  background: #171717;
  border: 1px solid #333;
  padding: 23px 12px;
  gap: 24px;
`;

const PaymentsForm = styled(TypeForm)``;

const AccountType = styled.h2`
  color: white;
  margin-bottom: 6px;
`;

const Text = styled.span`
  margin-left: 12px;
  font-size: 14px;
  font-weight: 400;
`;

const Type = styled.input.attrs({
  type: "radio",
  name: "type"
})`
  &:checked {
    accent-color: black;
  }
`;

const LabelType = styled.label.attrs({
  htmlFor: "type"
})`
  margin-right: 12px;
`;

const PaymentsLabel = styled.label.attrs({
  htmlFor: "payments"
})`
  margin-right: 12px;
`;

const Payment = styled.input.attrs({
  type: "radio",
  name: "paymenys"
})`
  &:checked {
    accent-color: black;
  }
`;

const PaymentsSection = styled.section`
  align-self: flex-end;
  display: flex;
  gap: 54px;
  align-items: center;
`;

const PayPal = styled(Image)`
  cursor: pointer;
`;

const Stripe = styled(PayPal)``;

const SubscriptionCost = styled(AccountType)``;
