import { FC } from "react";
import { ButtonPropsType } from "./types";
import { StyledButton } from "./StyledButton.styled";
import { useButtonColorType } from "../../hooks/useButtonColorType";

export const Button: FC<ButtonPropsType> = ({ children, theme, width, ...otherProps }) => {
  const { handler } = useButtonColorType();

  return (
    <StyledButton theme={theme} handler={handler(theme)} width={width} {...otherProps}>
      {children}
    </StyledButton>
  );
};
