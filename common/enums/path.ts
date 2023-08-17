export enum Path {
  LOGIN = "/auth/login",
  REGISTRATION = "/auth/registration",
  PROFILE = "/profile",
  PROFILE_SETTINGS = "/profile/settings",
  FORGOT_PASSWORD = "/auth/recovery",
  NEW_PASSWORD = "/auth/new_password",
  REGISTRATION_SUCCESS = "/auth/registration/success",
  REGISTRATION_ERROR = "/auth/registration/verificationError",
  NEW_PASSWORD_ERROR = "/auth/new_password/verificationError",
  ERROR_404 = "*",
  SIGNIN = "/auth/signinOAuth",
  CALLBACK_GOOGLE = "/api/auth/callback/google",
  CALLBACK_GITHUB = "/api/auth/callback/github"
}
