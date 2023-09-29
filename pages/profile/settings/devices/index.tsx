import React, { useEffect, useState } from 'react'

import {
  useDeleteAllDevicesMutation,
  useDeleteDeviceMutation,
  useGetCurrentDeviceQuery,
  useGetDevicesQuery,
} from 'assets/store/api/devices/devicesApi'
import { useClient } from 'common/hooks/useClients'
import { dateParser } from 'common/utils/dateParser'
import { getUserBrowser } from 'common/utils/getUserBrowser'
import { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import config from 'next-i18next.config.js'
import brave from 'public/img/icons/Brave.svg'
import chrome from 'public/img/icons/chrome-svgrepo-com.svg'
import mac from 'public/img/icons/desktop_mac.svg'
import explorer from 'public/img/icons/Explorer.svg'
import firefox from 'public/img/icons/Firefox.svg'
import logout from 'public/img/icons/log-out.svg'
import edge from 'public/img/icons/Microsoft_Edge.svg'
import opera from 'public/img/icons/Opera.svg'
import iphone from 'public/img/icons/phone_iphone.svg'
import safari from 'public/img/icons/Safari.svg'
import ucBrowser from 'public/img/icons/Uc_browser.svg'
import yandex from 'public/img/icons/Yandex.svg'
/* eslint-disable */
import { browserName, deviceDetect, isSafari } from 'react-device-detect'
/* eslint-enable */
import { useTranslation } from 'react-i18next'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import { getLayout } from '../../../../common/components/Layout/PageLayout/PageLayout'
import { SettingsPageWrapper } from '../../../../features/settings/SettingsPageWrapper'
import { defineDeviceIcon } from 'common/utils/defineDeviceIcon'
import { defineUserOS } from 'common/utils/defineUserOS'

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

const devicesIcons = {
  chrome,
  opera,
  edge,
  safari,
  firefox,
  explorer,
  yandex,
  ucBrowser,
  brave,
  'mobile Safari': safari,
}

const Devices = () => {
  const client = useClient()
  const { t } = useTranslation()
  const [ip, setIp] = useState()
  const [currentStatus, setCurrentStatus] = useState('Online')

  const { data: currentDevice } = useGetCurrentDeviceQuery()
  const { data: devices } = useGetDevicesQuery(null, {
    pollingInterval: 100000,
  })
  const [closeSession] = useDeleteDeviceMutation()
  const [closeAllSessions] = useDeleteAllDevicesMutation()

  const [splicedDevises, setSplicedDevices] = useState(devices)

  console.log(devices)

  useEffect(() => {
    const filteredDevices = devices?.filter(device => device.deviceId !== currentDevice?.deviceId)

    if (filteredDevices) {
      setSplicedDevices(filteredDevices)
    }
  }, [devices, currentDevice])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(res => setIp(res.ip))
  }, [])

  // const deviceName = client && deviceDetect(navigator.userAgent)

  return (
    client && (
      <SettingsPageWrapper>
        <SessionWrapper>
          <SectionTitle>{t('this_devices')}</SectionTitle>
          <ActiveSession>
            <DeviceIcon
              alt="browser icon"
              src={
                isSafari
                  ? safari
                  : devicesIcons[browserName.toLowerCase() as keyof typeof devicesIcons]
              }
            />
            <Column>
              <Browser>{isSafari ? 'Safari' : browserName}</Browser>
              <SessionIp>IP: {ip}</SessionIp>
              <IsOnline>{currentStatus}</IsOnline>
            </Column>
          </ActiveSession>
          <EndSessionsBtn onClick={() => closeAllSessions()}>
            <EndSessionsBtnText>{t('terminate_session')}</EndSessionsBtnText>
          </EndSessionsBtn>
        </SessionWrapper>
        {splicedDevises && splicedDevises.length > 0 ? (
          <SessionWrapper>
            <div style={{ marginBottom: '18px' }}>{t('active_sessions')}</div>
            {splicedDevises.map((device, index) => {
              return (
                <AllSessions key={device.ip} style={{ marginBottom: '12px' }}>
                  <Wrapper>
                    <DeviceIcon alt="browser icon" src={defineDeviceIcon(device.deviceName)} />
                    <Column>
                      <Browser>{defineUserOS(device.deviceName)}</Browser>
                      <SessionIp>IP: {device.ip}</SessionIp>
                      <LastVisit>Last visit: {dateParser(device.dateCreate)}</LastVisit>
                    </Column>
                  </Wrapper>
                  <LogOutWrapper onClick={() => closeSession({ deviceId: device.deviceId })}>
                    <LogOutIcon alt="log out" src={logout} />
                    <LogOut>Log Out</LogOut>
                  </LogOutWrapper>
                </AllSessions>
              )
            })}
          </SessionWrapper>
        ) : (
          <NotLoggedWrapper>
            <NotLogged>{t('no_active_sessions')}</NotLogged>
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
