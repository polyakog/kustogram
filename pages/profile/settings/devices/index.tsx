import React, { useEffect, useState } from 'react'

import {
  useDeleteAllDevicesMutation,
  useDeleteDeviceMutation,
  useGetCurrentDeviceQuery,
  useGetDevicesQuery,
} from 'assets/store/api/devices/devicesApi'
import { useClient } from 'common/hooks/useClients'
import { getUserBrowser } from 'common/utils/getUserBrowser'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import chrome from 'public/img/icons/chrome-svgrepo-com.svg'
import mac from 'public/img/icons/desktop_mac.svg'
import logout from 'public/img/icons/log-out.svg'
import iphone from 'public/img/icons/phone_iphone.svg'
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import { getLayout } from '../../../../common/components/Layout/PageLayout/PageLayout'
import { SettingsPageWrapper } from '../../../../features/settings/SettingsPageWrapper'
import { useLocalStorage } from 'common/hooks/useLocalStorage'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'nav_bar', 'post_cr'], config)),
    },
  }
}

const fakeDevices = [
  {
    deviseIcon: mac,
    device: 'Apple iMac 27',
    ip: '22.345.345.12',
    lastVisit: '22.09.2022',
  },
  {
    deviseIcon: iphone,
    device: 'Iphone 14 Pro Max',
    ip: '22.345.345.12',
    lastVisit: '22.09.2022',
  },
]

const Devices = () => {
  const client = useClient()
  const { t } = useTranslation()
  const [ip, setIp] = useState()
  const [currentStatus, setCurrentStatus] = useState('Online')
  const browser = getUserBrowser()

  const { data: currentDevice } = useGetCurrentDeviceQuery()
  const { data: devices } = useGetDevicesQuery()
  const [closeSession] = useDeleteDeviceMutation()
  const [closeAllSessions] = useDeleteAllDevicesMutation()

  console.log(currentDevice)

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(res => setIp(res.ip))
  }, [])

  const { removeItem } = useLocalStorage()

  return (
    client && (
      <SettingsPageWrapper>
        <SessionWrapper>
          <SectionTitle>{t('this_devices')}</SectionTitle>
          <ActiveSession>
            <DeviceIcon alt="browser icon" src={chrome} />
            <Column>
              <Browser suppressHydrationWarning>{browser}</Browser>
              <SessionIp>IP: {ip}</SessionIp>
              <IsOnline>{currentStatus}</IsOnline>
            </Column>
          </ActiveSession>
          <EndSessionsBtn onClick={() => closeAllSessions()}>
            <EndSessionsBtnText>{t('terminate_session')}</EndSessionsBtnText>
          </EndSessionsBtn>
        </SessionWrapper>
        {devices?.length ? (
          <SessionWrapper>
            <div style={{ marginBottom: '18px' }}>{t('active_sessions')}</div>
            {fakeDevices.map((device, index) => {
              return (
                <AllSessions key={device.ip} style={{ marginBottom: '12px' }}>
                  <Wrapper>
                    <DeviceIcon alt="browser icon" src={device.deviseIcon} />
                    <Column>
                      <Browser>{device.device}</Browser>
                      <SessionIp>IP: {device.ip}</SessionIp>
                      <LastVisit>{device.lastVisit}</LastVisit>
                    </Column>
                  </Wrapper>
                  <LogOutWrapper
                    onClick={() =>
                      closeSession({ deviceId: 'b85f1f11-a60d-4205-a83c-51adc4ed9a6b' })
                        .unwrap()
                        .then(() => {
                          removeItem('accessToken')
                        })
                    }
                  >
                    <LogOutIcon alt="log out" src={logout} />
                    <LogOut>Log Out</LogOut>
                  </LogOutWrapper>
                </AllSessions>
              )
            })}
          </SessionWrapper>
        ) : (
          <NotLoggedWrapper>
            <NotLogged>You have not yet logged in from other devices</NotLogged>
          </NotLoggedWrapper>
        )}
      </SettingsPageWrapper>
    )
  )
}

Devices.getLayout = getLayout
export default Devices

const NotLoggedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`
const NotLogged = styled.p``

const LogOutWrapper = styled.div`
  display: flex;
  justify-self: flex-end;
  gap: 12px;
  cursor: pointer;
`

const LogOutIcon = styled(Image)``
const LogOut = styled.p`
  font-weight: 500;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
`

const ActiveSession = styled.div`
  display: flex;
  padding: 17px 0;
  background: ${baseTheme.colors.dark[500]};
  border: 1px solid ${baseTheme.colors.dark[300]};
  gap: 12px;
`

const AllSessions = styled(ActiveSession)`
  justify-content: space-between;
  padding-right: 24px;
  align-items: center;
`

const LastVisit = styled.p``

const EndSessionsBtn = styled.button`
  margin-top: 24px;
  margin-bottom: 18px;
  width: 260px;
  color: ${baseTheme.colors.accent[500]};
  border: 1px solid ${baseTheme.colors.accent[500]};
  background: ${baseTheme.colors.dark[700]};
  align-self: flex-end;
  padding: 6px 0;
  cursor: pointer;
`

const EndSessionsBtnText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

const IsOnline = styled.p`
  color: ${baseTheme.colors.info[0]};
  font-weight: 500;
`

const Browser = styled.p`
  padding-bottom: 13px;
  &::first-letter {
    text-transform: uppercase;
  }
`
const SessionIp = styled.p``

const DeviceIcon = styled(Image)`
  margin: 5px 0 0 15px;
`

const SectionTitle = styled.h2`
  margin-bottom: 6px;
`

const SessionWrapper = styled.section`
  display: flex;
  flex-direction: column;
`
