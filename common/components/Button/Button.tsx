import { FC } from "react";
import { ButtonPropsType } from "./types";
import { StyledButton } from "./StyledButton.styled";
import { useButtonColorType } from "../../hooks/useButtonColorType";

export const Button: FC<ButtonPropsType> = ({ children, theme, width, ...otherProps }) => {
  const { handleButtonType } = useButtonColorType();

  return (
    <StyledButton
      theme={theme}
      handleButtonType={handleButtonType(theme)}
      width={width}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};
