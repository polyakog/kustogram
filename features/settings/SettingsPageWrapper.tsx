import { ReactNode } from 'react'

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TabBar } from '../../common/components/TabBar'

type SettingsPageWrapperType = {
  children: ReactNode
}

export const SettingsPageWrapper = ({ children }: SettingsPageWrapperType) => {
  const baseUrl = '/profile/settings'
  const { t } = useTranslation()

  const settingsTabData = [
    {
      name: 'general_info',
      ref: '',
    },
    {
      name: 'devices',
      ref: 'devices',
    },
    {
      name: 'acc_management',
      ref: 'acc_management',
    },
    {
      name: 'my_payments',
      ref: 'payments',
    },
  ]

  return (
    <SettingsWrapper>
      <StyledContainerSettings>
        <TabBar baseUrl={baseUrl} t={t} titleList={settingsTabData} />
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
