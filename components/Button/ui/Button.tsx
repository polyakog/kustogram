import {ButtonHTMLAttributes, FC} from 'react';
import classNames from '../../../assets/lib/classNames/classNames';
import styled from 'styled-components';

export enum ThemeButton {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINED = 'outlined',
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ThemeButton.PRIMARY,
    disabled,
    ...otherProps
  } = props;

  return (
    <StyledButton
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
    height: 36px;
    width: ${props => props.width ? props.width : '330px'};
    padding: 0 20px;

    border: none;
    border-radius: 2px;

    &.primary {
      background: #397DF6;
      color: #FFFFFF;
    }

    &.primary:hover {
      background: #73A5FF;
    }

    &.primary:focus {
      background: #2F68CC;
    }

    &.primary:active {
      background: #2F68CC;
      color: #EDF3FA;
    }

    &.primary.disabled {
      background: #234E99;
      color: #8D9094;
    }

    &.secondary {
      background: #333333;
      color: #FFFFFF;
    }

    &.secondary:hover {
      background: #4C4C4C;
    }

    &.secondary:focus {
      background: #333333;
      border: 1px solid #4C8DFF;
    }

    &.secondary:active {
      background: #212121;
    }

    &.secondary.disabled {
      background: #4C4C4C;
      color: #8D9094;
    }

    &.outlined {
      color: #397DF6;
      border: 1px solid #397DF6;
    }

    &.outlined:hover {
      color: #73A5FF;
      border: 1px solid #73A5FF;
    }

    &.outlined:focus {
      color: #2F68CC;
      border: 1px solid #2F68CC;
    }

    &.outlined:active {
      color: #2F68CC;
      border: 1px solid #2F68CC;
    }

    &.outlined.disabled {
      background: #234E99;
      color: #234E99;
    }

    &.clear {
      max-width: 100px;
      max-height: 36px;

      color: #397DF6;
      padding: 0;
      border: none;
      background: none;
      outline: none;
    }

    &.clear:hover {
      color: #73A5FF;
    }

    &.clear:focus {
      color: #397DF6;
      border: 1px solid #397DF6;
    }

    &.clear:active {
      color: #2F68CC;
    }

    &.clear.disabled {
      color: #234E99;
    }

    @media (max-width: 390px) {
      width: ${props => props.width ? props.width : '80vw'};
  `