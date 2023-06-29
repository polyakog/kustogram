export type RegistrationType = {
  login: string
  email: string
  password: string
}
export type LoginType = {
  loginOrEmail: string
  password: string
}
export type SendLinkType = {
  email: string
}
export type NewPasswordType = {
  newPassword: string
  recoveryCode: string}
