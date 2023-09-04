import styled from 'styled-components'
import { baseTheme } from '../../../styles/styledComponents/theme'
import { MenuBarPropsType } from './Menubar'

export const StyledMenuBar = styled.div<{ showMenuBar: string | string[] | undefined }>`
  position: relative;
  display: flex;
  justify-content: center;
  /* max-width: 220px; */
  min-width: 360px;
  height: 60px;
  /* width: 100vw; */
  opacity: ${props => (props.showMenuBar ? 0 : 1)};
`

export const StyledItemBlock = styled.div`
  /* margin-left: 45px; */
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 36px;

  > * {
    &:last-child {
      display: none;
    }
  }
`

export const StyledItemUpperBlock = styled.div`
  /* margin-left: 45px; */
  padding: 18px 0px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;

  /* > * {
    &:last-child {
      display: none;
    }
  } */
`

export const StyledCreate = styled.div`
  position: absolute;
  top: 15px;
  left: 108px;
`

//MainLink

export const MenuRow = styled.div`
  cursor: pointer;
  width: 100%;
  padding-left: 12px;
  &:hover {
    background: ${baseTheme.colors.accent[700]};
  }
`

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const MenuWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 18px;
  right: 15px;
`

export const MenuList = styled.div`
  position: absolute;
  width: 161px;
  /* height: 204px; */
  border-radius: 2px;
  border: 1px solid ${baseTheme.colors.dark[100]};
  background: ${baseTheme.colors.dark[500]};
  top: 43px;
  right: 15px;
  z-index: 20;
`
export const TextBox = styled.div`
  width: 105px;
`

export const TextStyle = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`
