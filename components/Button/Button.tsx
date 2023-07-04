import {ButtonHTMLAttributes, FC} from 'react';
import classNames from '../../assets/lib/classNames/classNames';
import styled from 'styled-components';
import {baseTheme} from '../../styles/styledComponents/theme';

export enum ThemeButton {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINED = 'outlined',
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme: ThemeButton;
  width?: string
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ThemeButton.PRIMARY,
    disabled,
    width,
    ...otherProps
  } = props;

  return (
    <StyledButton
      width={width}
      className={classNames('', {['disabled']: disabled}, [className, theme])}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};
type ButtonPropsType = {
  width?: string
  height?: string
  type?: 'button' | 'reset' | 'submit'
}
const StyledButton = styled.button.attrs(props => ({
  type:props.type ? props.type : 'button'})) <ButtonPropsType>
  `
    cursor: pointer;
    min-height: 36px;
    width: ${props => props.width ? props.width : '330px'};
    padding: 0 20px;

    border: none;
    border-radius: 2px;

    &.primary {
      background: ${baseTheme.colors.accent[500]};
      color: ${baseTheme.colors.light[100]};
    }
    &.primary:hover {
      background: ${baseTheme.colors.accent[100]};
    }
    &.primary:active {
      background: ${baseTheme.colors.accent[700]};
      color: ${baseTheme.colors.light[500]};
    }
    &.primary.disabled {
      background: ${baseTheme.colors.accent[900]};
      color: ${baseTheme.colors.light[900]};
    }

    &.secondary {
      background: ${baseTheme.colors.dark[300]};
      color: ${baseTheme.colors.light[100]};
    }
    &.secondary:hover {
      background: ${baseTheme.colors.dark[100]};
    }
    &.secondary:focus {
      background: ${baseTheme.colors.dark[300]};
      border: 1px solid ${baseTheme.colors.accent[300]};
    }
    &.secondary:active {
      background: #212121;
    }
    &.secondary.disabled {
      background: ${baseTheme.colors.dark[100]};
      color: #8D9094;
    }

    &.outlined {
      color: ${baseTheme.colors.accent[500]};
      border: 1px solid ${baseTheme.colors.accent[500]};
      background: none;
    }
    &.outlined:hover {
      color: ${baseTheme.colors.accent[100]};
      border: 1px solid ${baseTheme.colors.accent[100]};
    }
    &.outlined:focus {
      color: ${baseTheme.colors.accent[700]};
      border: 1px solid ${baseTheme.colors.accent[700]};
    }
    &.outlined:active {
      color: ${baseTheme.colors.accent[700]};
      border: 1px solid ${baseTheme.colors.accent[700]};
    }
    &.outlined.disabled {
      color: ${baseTheme.colors.accent[900]};
      border: 1px solid ${baseTheme.colors.accent[900]};
    }

    &.clear {
      max-width: 100px;
      max-height: 36px;

      color: ${baseTheme.colors.accent[500]};
      padding: 0;
      border: none;
      background: none;
      outline: none;
    }
    &.clear:hover {
      color: ${baseTheme.colors.accent[100]};
    }
    &.clear:focus {
      color: ${baseTheme.colors.accent};
      border: 1px solid ${baseTheme.colors.accent[500]};
    }
    &.clear:active {
      color: ${baseTheme.colors.accent[700]};
    }
    &.clear.disabled {
      color: ${baseTheme.colors.accent[900]};
    }

    @media (max-width: 390px) {
      width: ${props => props.width ? props.width : '80vw'};
  `
