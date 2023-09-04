import { ReactNode } from 'react'

import styled from 'styled-components'

import { TabBar } from './TabBar'

type SettingsPageWrapperType = {
  children: ReactNode
}

export const SettingsPageWrapper = ({ children }: SettingsPageWrapperType) => {
  return (
    <SettingsWrapper>
      <StyledContainerSettings>
        <TabBar />
        <StyledContent>{children}</StyledContent>
      </StyledContainerSettings>
    </SettingsWrapper>
  )
}

const SettingsWrapper = styled.div`
  min-height: 90vh;
  display: flex;
  gap: 24px;
  margin: 36px 24px;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`

export const StyledContainerSettings = styled.div`
  max-width: 726px;
  width: 100%;
`

const StyledContent = styled.div`
  margin-top: 25px;
`
