import { Field } from 'formik'
import styled from 'styled-components'

import { baseTheme } from '../../../styles/styledComponents/theme'

import { StyledErrorMsgPropsType, TextAreaPropsType } from './types'

// FormikField
export const StyledField = styled(Field)`
  &:active {
    pointer-events: none;
    border: 1px solid white;
    color: white;
    &:focus {
      border: 1px solid white;
      color: white;
    }
    &:hover {
      border: 1px solid white;
      color: white;
    }
  }
  &:focus {
    border: 1px solid #397df6;
    color: #8d9094;
    &:hover {
      border: 1px solid #397df6;
      color: #8d9094;
    }
    &:-webkit-autofill {
      -webkit-text-fill-color: #8d9094;
      caret-color: #8d9094;
    }
  }
  &:disabled {
    border: 1px solid #4c4c4c;
    color: #4c4c4c;
  }
  &:hover {
    color: #8d9094;
    border: 1px solid #8d9094;
  }

  max-width: ${props => (props.width ? props.width : '330px')};
  width: 100%;
  height: 36px;
  padding-left: 8px;
  position: relative;

  font-size: 14px;

  outline: none;
  border-radius: 2px;
  border: ${props =>
    props.border === 'red' ? `1px solid ${baseTheme.colors.danger[500]}` : `1px solid #4C4C4C`};
  background: ${baseTheme.colors.dark[500]};
  color: ${props => (props.border === 'red' ? `#fff` : `#8d9094`)};
  box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]};
  /* -webkit-text-fill-color: ${baseTheme.colors.light[100]}; */

  &:-webkit-autofill {
    -webkit-text-fill-color: #8d9094;
    caret-color: #8d9094;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(100%);
    background-size: 18px;
    margin: 0 10px 5px 0;
  }

  @media (max-width: 390px) {
    width: 90vw;
    max-width: ${props => (props.width ? '100vw' : '330px')};
  }
`

export const StyledTextArea = styled.textarea<TextAreaPropsType>`
  &:active {
    pointer-events: none;
    border: 1px solid white;
    color: white;
    &:focus {
      border: 1px solid white;
      color: white;
    }
    &:hover {
      border: 1px solid white;
      color: white;
    }
  }
  &:focus {
    border: 1px solid #397df6;
    color: #8d9094;
    &:hover {
      border: 1px solid #397df6;
      color: #8d9094;
    }
  }
  &:disabled {
    border: 1px solid #4c4c4c;
    color: #4c4c4c;
  }
  &:hover {
    color: #8d9094;
    border: 1px solid #8d9094;
  }
  max-width: ${props => (props.width ? props.width : '330px')};
  width: 100%;
  height: 84px;
  padding-left: 8px;
  position: relative;
  resize: none;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #333;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: black;
  }

  font-size: 14px;

  outline: none;
  border-radius: 2px;
  border: ${props =>
    props.border === 'red'
      ? `1px solid ${baseTheme.colors.danger[500]}`
      : `1px solid ${baseTheme.colors.dark[100]}`};
  background: ${baseTheme.colors.dark[500]};
  color: #8d9094;
  /* box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]}; */
  /* -webkit-text-fill-color: ${baseTheme.colors.light[100]}; */

  &::-webkit-calendar-picker-indicator {
    filter: invert(100%);
    background-size: 18px;
    margin: 0 10px 5px 0;
  }

  @media (max-width: 390px) {
    width: 90vw;
    max-width: ${props => (props.width ? '100vw' : '330px')};
  }
`

// FormikLabel
export const StyledInputContainer = styled.div`
  position: relative;
`

export const StyledLabel = styled.label<{ margin?: string; witherror: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  font-family: Inter;
  font-size: 16px;

  margin-bottom: ${props => (props.witherror === 'err' ? 0 : props.margin || '24px')};
`

export const StyledErrorMsg = styled.div<StyledErrorMsgPropsType>`
  width: 100%;
  font-family: Inter;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  line-height: 24px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  color: ${baseTheme.colors.danger['500']};
`

export const StyledTitle = styled(StyledErrorMsg)`
  color: ${baseTheme.colors.light['900']};

  & span::first-letter {
    text-transform: uppercase;
  }
`
