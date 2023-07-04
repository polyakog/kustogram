import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Modal } from "../Modal";
import { Form, Field, FormikProps, Formik } from "formik";
import React from "react";
import styled from "styled-components";
import * as Yup from "yup";

export type FormValuesType = {
  // all the values that we’re going to have in our form
  email: string;
};

export type OtherPropsType = {
  // to pass other props to our component
  isMessageSent: boolean;
  isModalOpen: boolean;
  handleModalClose: () => void;
  handleEmailSend: (values:FormValuesType) => void;
  };

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .max(50, "Max length is 50 symbols.")
    .required("Required"),
});

const EmailForm = ({
  handleModalClose,
  isModalOpen,
  isMessageSent,
  handleEmailSend,
}: OtherPropsType ) => {
  return (
    <Formik
      validationSchema={EmailSchema}
      initialValues={{ email: "" }}
      onSubmit={(values) => handleEmailSend(values)}
    >
      {(props) => (
        <Form>
          <Input
            name="email"
            labelText="Email"
            hintText="Enter your email address and we will send you further instructions"
            type="email"
          />
          {isMessageSent && (
            <StyledText>
              We have sent a link to confirm your email to {props.values.email}
            </StyledText>
          )}

          <Button type="submit">
            {isMessageSent ? "Send Link Again" : "Send Link"}
          </Button>
          {isModalOpen && (
            <Modal
              title="Email Sent"
              bodyText={`We have sent a link to confirm your email to ${props.values.email}`}
              handleModalClose={handleModalClose}
            ></Modal>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;

const StyledText = styled.div`
  color: #fff;
  font-size: 14px;
  font-family: Inter;
  line-height: 24px;
  margin-bottom: 18px;
`;
