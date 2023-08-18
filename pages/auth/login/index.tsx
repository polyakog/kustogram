import React, { useEffect } from "react";
import { Formik } from "formik";
import showPasswordBtn from "../../../public/img/icons/eye-outline.svg";
import hidePasswordBtn from "../../../public/img/icons/eye-off-outline.svg";
import { NextRouter, useRouter } from "next/router";
import { useLazyMeQuery, useLoginMutation } from "../../../assets/store/api/auth/authApi"; //?
import {
  FormValueLogin,
  ResetForm,
  SetFieldErrorType
} from "../../../common/components/Formik/types";
import {
  StyledContainerAuth,
  StyledForgotLink,
  StyledLinkBlock
} from "../../../styles/styledComponents/auth/Auth.styled";
import { WrapperContainerAuth } from "../../../features/auth/WrapperContainerAuth";
import {
  StyledAuthForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledText
} from "../../../styles/styledComponents/auth/FormikAuth.styled";
import AuthIcons from "../../../features/auth/AuthIcons";
import { useShowPassword } from "../../../common/hooks/useShowPassword";
import { validateLogin } from "../../../common/utils/validateLogin";
import { FormikLabel } from "../../../common/components/Formik/FormikLabel";
import { Button } from "../../../common/components/Button/Button";
import { getLayout } from "../../../common/components/Layout/BaseLayout/BaseLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "../../../next-i18next.config.js";
import { useTranslation } from "next-i18next";
import { ThemeButton } from "../../../common/enums/themeButton";
import { Path } from "../../../common/enums/path";
import { useLocalStorage } from "common/hooks/useLocalStorage";
// import { signIn, signOut, useSession } from "next-auth/react";
import { initializeAppAuth } from "assets/store/initializeAppAuth"; //?
import { useAppDispatch, useAppSelector } from "common/hooks"; //?
import { LoginResponseType, LoginType } from "assets/store/api/auth/types";
import { baseTheme } from "styles/styledComponents/theme";
import { isAppInitializedSelector } from "assets/store/app.selector";
import { LoadingStyle } from "styles/styledComponents/profile/profile.styled";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common"], config))
    }
  };
}

const Login = () => {
  /*   ________Инициализация_____________ */ //?
  const dispatch = useAppDispatch();
  const [getInitialize, { data: me, isLoading, error, status }] = useLazyMeQuery();

  /*   ________/Инициализация_____________ */ //?

  const { t } = useTranslation();
  const route = useRouter();
  const { passwordType, showPassword } = useShowPassword();

  const { removeItem, setItem } = useLocalStorage();
  // const { data: session, status } = useSession();
  // const status = "unauthenticated";
  // const session = "";

  const isAppInitialized = useAppSelector(isAppInitializedSelector);

  const initialAuthValues = {
    password: "",
    loginOrEmail: ""
  };

  const [loginHandler, { data: loginRes }] = useLoginMutation();

  redirect(loginRes, setItem, route);

  const handleSubmit = async (
    values: FormValueLogin,
    { resetForm, setFieldError }: ResetForm & SetFieldErrorType
  ) => {
    const data = {
      email: values.loginOrEmail,
      password: values.password
    };
    try {
      await loginHandler(data)
        .unwrap()
        .then((res) => {
          removeItem("email");
          resetForm();
          getInitialize();
        })
        .catch(() => setFieldError("password", t("log_in_err")));
    } catch (error) {
      console.log("LoginError:", error);
    }
  };

  useEffect(() => {
    getInitialize();
  }, []);

  useEffect(() => {
    initializeAppAuth(dispatch, me, isLoading, error);
    redirect(loginRes, setItem, route);
  }, [me, isLoading, error, dispatch, loginRes]);

  const style = {
    display: "flex",
    with: "maxContent",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "20px",
    color: baseTheme.colors.success[500]
  };

  // if (status)
  //   return <div style={style as React.CSSProperties}>You are {status}</div>;

  if (isLoading) return <div style={LoadingStyle}>Loading...</div>;

  if (isAppInitialized) {
    redirect(loginRes, setItem, route);
    console.log("You are initialialized");
  }

  return (
    <>
      <StyledContainerAuth>
        <WrapperContainerAuth title={t("signIn_title")}>
          <AuthIcons />
          <Formik
            initialValues={initialAuthValues}
            validationSchema={validateLogin}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <StyledAuthForm>
                <FormikLabel
                  name="loginOrEmail"
                  onChange={(e) => setFieldValue("loginOrEmail", e)}
                  value={values.loginOrEmail}
                  type={"text"}
                  title={t("email_label")}
                  border={errors.loginOrEmail?.length && touched.loginOrEmail ? "red" : "white"}
                  errors={errors}
                  touched={touched}
                  t={t}
                />
                <FormikLabel
                  id="pass"
                  name="password"
                  onChange={(e) => setFieldValue("password", e)}
                  value={values.password}
                  type={passwordType}
                  title={t("password_label")}
                  border={errors.password?.length && touched.password ? "red" : "white"}
                  errors={errors}
                  touched={touched}
                  margin="48px"
                  t={t}
                >
                  <StyledShowPasswordBtn
                    alt="show password"
                    src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                    onClick={() => showPassword()}
                  />
                </FormikLabel>
                <StyledLinkBlock>
                  <StyledForgotLink href="/auth/recovery">
                    {t("forgotPassword_link")}
                  </StyledForgotLink>
                </StyledLinkBlock>
                <Button theme={ThemeButton.PRIMARY} type="submit">
                  {t("signIn_title")}
                </Button>
              </StyledAuthForm>
            )}
          </Formik>
          <StyledSignInWrapper>
            <StyledText>{t("notAccount_title")}</StyledText>
            <StyledSignIn href={Path.REGISTRATION}>{t("signUp_link")}</StyledSignIn>
          </StyledSignInWrapper>
        </WrapperContainerAuth>
      </StyledContainerAuth>
    </>
  );
};

Login.getLayout = getLayout;
export default Login;

export const redirect = (
  loginRes: LoginResponseType | undefined,
  setItem: (key: string, value: string) => void,
  route: NextRouter
) => {
  if (loginRes) {
    setItem("accessToken", loginRes.accessToken);
    loginRes.profile
      ? route.push(Path.PROFILE)
      : route.push(`${Path.PROFILE_SETTINGS}?profile=${loginRes.profile}`);
  }
};
