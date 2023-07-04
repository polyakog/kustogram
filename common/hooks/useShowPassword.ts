import { useState } from "react"

export const useShowPassword = () => {
  const [passwordType, setPasswordType] = useState("password")
  const [passwordConfirmationType, setPasswordConfirmationType] = useState("password")

  const showPassword = () => {
    if (passwordType === "text") {
      setPasswordType("password")
    } else {
      setPasswordType("text")
    }
  }
  const showPasswordConfirmation = () => {
    if (passwordConfirmationType === "text") {
      setPasswordConfirmationType("password")
    } else {
      setPasswordConfirmationType("text")
    }
  }

  return {
    passwordType,
    passwordConfirmationType,
    showPassword,
    showPasswordConfirmation
  }
}
