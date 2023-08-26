import React from "react";
import { Formik } from "formik";
import showPasswordBtn from "../../../public/img/icons/eye-outline.svg";
import hidePasswordBtn from "../../../public/img/icons/eye-off-outline.svg";
import { getLayout } from "../../../common/components/Layout/BaseLayout/BaseLayout";
import { useShowPassword } from "../../../common/hooks/useShowPassword";
import { WrapperContainerAuth } from "../../../features/auth/WrapperContainerAuth";
import { useNewPasswordMutation } from "../../../assets/store/api/auth/authApi";
import { FormNewPasswordType, ResetForm } from "../../../common/components/Formik/types";
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import { FormikLabel } from "../../../common/components/Formik/FormikLabel";
import { Button } from "../../../common/components/Button/Button";
import { validateNewPassword } from "../../../common/utils/validateNewPassword";
import { useRouter } from "next/router";
import { StyledContainerAuth } from "../../../styles/styledComponents/auth/Auth.styled";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "next-i18next.config.js";
import { useTranslation } from "next-i18next";
import { RegistrationResponseError } from "assets/store/api/auth/types";
import { Path } from "../../../common/enums/path";
import { ThemeButton } from "../../../common/enums/themeButton";
import { baseTheme } from "styles/styledComponents/theme";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"], config))
    }
  };
}

export default function NewPassword() {
  const initialAuthValues = {
    passwordConfirmation: "",
    newPassword: "",
    recoveryCode: ""
  };

  const [newPasswordHandler] = useNewPasswordMutation();

  const { t } = useTranslation();
  const router = useRouter();
  const { code } = router.query;

  const { passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation } =
    useShowPassword();

  const handleSubmit = async (values: FormNewPasswordType, { resetForm }: ResetForm) => {
    const data = {
      newPassword: values.newPassword,
      recoveryCode: code
    };
    try {
      await newPasswordHandler(data)
        .unwrap()
        .then(() => {
          resetForm();
          router.push(Path.LOGIN);
        });
    } catch (error) {
      const err = error as RegistrationResponseError;
      if ("data" in err) {
        await router.push(Path.NEW_PASSWORD_ERROR);
      }
    }
  };

  return (
    <StyledContainerAuth>
      <WrapperContainerAuth title={t("n_password_title")}>
        <Formik
          initialValues={initialAuthValues}
          validationSchema={validateNewPassword}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <StyledAuthForm>
              <FormikLabel
                id="pass"
                name="newPassword"
                onChange={(e) => setFieldValue("newPassword", e)}
                value={values.newPassword}
                type={passwordType}
                title={t("n_password_label")}
                border={errors.newPassword?.length && touched.newPassword ? "red" : "white"}
                errors={errors}
                touched={touched}
                t={t}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPassword()}
                />
              </FormikLabel>
              <FormikLabel
                id="pass"
                name="passwordConfirmation"
                onChange={(e) => setFieldValue("passwordConfirmation", e)}
                value={values.passwordConfirmation}
                type={passwordConfirmationType}
                title={t("password_conf_label")}
                border={
                  errors.passwordConfirmation?.length && touched.passwordConfirmation
                    ? "red"
                    : "white"
                }
                errors={errors}
                touched={touched}
                t={t}
              >
                <StyledShowPasswordBtn
                  alt="show password"
                  src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                  onClick={() => showPasswordConfirmation()}
                />
              </FormikLabel>
              <StyledSignInWrapper margin={"0 0 29px 0"}>
                <StyledText
                  color={baseTheme.colors.light[900]}
                  textAlign={"left"}
                  width={"auto"}
                  fontSize={"14px"}
                >
                  {t("info")}
                </StyledText>
              </StyledSignInWrapper>
              <Button theme={ThemeButton.PRIMARY} type="submit">
                {t("n_password_btn")}
              </Button>
            </StyledAuthForm>
          )}
        </Formik>
      </WrapperContainerAuth>
    </StyledContainerAuth>
  );
}

NewPassword.getLayout = getLayout;
