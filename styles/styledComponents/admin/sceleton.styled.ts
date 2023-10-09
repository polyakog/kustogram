import { styled, keyframes } from 'styled-components'
import { SceletonType } from 'styles/styledComponents/admin/types'
import { baseTheme } from 'styles/styledComponents/theme'

const SceletonAnimation = keyframes`
  0% {opacity: 0; left: -100%}
  50% {opacity: 0.5; left: 0%}
  100% {opacity: 0; left: 100%}
`

export const Sceleton = styled.div<SceletonType>`
  min-width: ${props => (props.minWidth ? props.minWidth : props.width)};
  max-width: ${props => (props.maxWidth ? props.maxWidth : props.width)};

  height: ${props => props.height};
  border-radius: ${props => (props.radius ? props.radius : '0px')};
  margin: ${props => (props.margin ? props.margin : '0px')};
  position: relative;
  overflow: hidden;
  background: ${baseTheme.colors.light[900]};

  &::after {
    content: '';
    width: 100%;
    height: 100%;

    position: absolute;
    background: linear-gradient(
      110deg,
      transparent 10%,
      ${baseTheme.colors.light[100]} 50%,
      transparent 90%
    );
    animation-name: ${SceletonAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`
