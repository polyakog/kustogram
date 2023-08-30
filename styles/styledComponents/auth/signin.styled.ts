import styled from 'styled-components'
import { baseTheme } from '../theme'

export const SigninWrapper = styled.div`
  /* position: relative; */
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);
`

export const BlockButton = styled.div`
  display: block;
  text-align: center;
`

export const buttonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.75rem 1rem',
  minHeight: '0.62px',
  position: 'relative',
  margin: '20px 0',
  transform: 'all .1s ease-in-out',
}
export const spanStyle: React.CSSProperties = {
  flexGrow: '1',
  display: 'flex',
  fontSize: '1.1rem',
  fontWeight: '500',
  margin: '0 0 0 1.75rem',
}

export const SigninOauthWrapper = styled.div`
  /* position: relative; */
  display: inline-flex;
  position: fixed;
  flex-wrap: wrap;
  /* align-items: center;
  justify-content: center; */
  height: 228px;
  width: 578px;
  background: ${baseTheme.colors.dark[300]};
  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark[100]};
  top: 40%;
  left: calc(50% - 289px);
`

export const StyledOauthHeader = styled.div`
  display: flex;
  padding: 12px 24px;
  border-bottom: 1px solid ${baseTheme.colors.dark[100]};
  width: 100%;
  height: 59px;
`
export const StyledOauthTitle = styled.span`
  color: ${baseTheme.colors.light[100]};
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
`

export const StyledOauthErrorBody = styled.div`
  display: flex;
  flex-direction: column;

  color: ${baseTheme.colors.danger[300]};
  padding: 30px 24px;
`
export const StyledOauthBody = styled.div`
  display: flex;
  flex-direction: column;

  color: ${baseTheme.colors.success[300]};
  padding: 30px 24px;
`

export const StyledOauthText = styled.span`
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  line-height: 36px;
`
