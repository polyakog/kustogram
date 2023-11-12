import { styled } from 'styled-components'
import { baseTheme } from '../../../styles/styledComponents/theme'

export const Main = styled.div`
  width: 100%;
  margin-top: 60px;
  margin-left: 220px;
  padding: 20px 5.6%;
`

export const Page = styled.div`
  display: flex;
  max-width: 1310px;
  width: 100%;
  height: 3000px;
`

export const StyledWrapper = styled.div`
  margin: 0 auto;

  width: 100%;
  min-height: 100vh;
  max-width: 1310px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${baseTheme.colors.dark['700']};
  color: ${baseTheme.colors.light[100]};
`
