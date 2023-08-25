import React, { useEffect, useState } from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/PageLayout/PageLayout";
import { styled } from "styled-components";
import Image from "next/image";
import chrome from "public/img/icons/chrome-svgrepo-com.svg";
import { getUserBrowser } from "common/utils/getUserBrowser";
import iphone from "public/img/icons/phone_iphone.svg";
import mac from "public/img/icons/desktop_mac.svg";

const fakeDevices = [
  {
    deviseIcon: mac,
    device: "Apple iMac 27",
    ip: "22.345.345.12",
    lastVisit: "22.09.2022"
  },
  {
    deviseIcon: iphone,
    device: "Iphone 14 Pro Max",
    ip: "22.345.345.12",
    lastVisit: "22.09.2022"
  }
];

const Devices = () => {
  const [ip, setIp] = useState();
  const [currentStatus, setCurrentStatus] = useState("Online");
  const browser = getUserBrowser();

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((res) => setIp(res.ip));
  }, []);

  return (
    <SettingsPageWrapper>
      <PageWrapper>
        <SessionWrapper>
          <SectionTitle>This devices</SectionTitle>
          <ActiveSession>
            <DeviceIcon alt="browser icon" src={chrome} />
            <Wrapper>
              <Browser suppressHydrationWarning>{browser}</Browser>
              <SessionIp>IP: {ip}</SessionIp>
              <IsOnline>{currentStatus}</IsOnline>
            </Wrapper>
          </ActiveSession>
          <EndSessionsBtn>Terminate all other session</EndSessionsBtn>
        </SessionWrapper>
        <SessionWrapper>
          <>Active sessions</>
          {fakeDevices.map((device, index) => {
            return (
              <ActiveSession style={{ marginBottom: "12px" }} key={index}>
                <DeviceIcon alt="browser icon" src={device.deviseIcon} />
                <Wrapper>
                  <Browser>{device.device}</Browser>
                  <SessionIp>IP: {device.ip}</SessionIp>
                  <LastVisit>{device.lastVisit}</LastVisit>
                </Wrapper>
              </ActiveSession>
            );
          })}
        </SessionWrapper>
      </PageWrapper>
    </SettingsPageWrapper>
  );
};

Devices.getLayout = getLayout;
export default Devices;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PageWrapper = styled.div``;

const ActiveSession = styled.div`
  display: flex;
  padding: 17px 0;
  background: #171717;
  border: 1px solid #333;
  gap: 12px;
`;

const LastVisit = styled.p``;

const EndSessionsBtn = styled.button`
  margin-top: 24px;
  margin-bottom: 18px;
  width: 260px;
  color: #397df6;
  border: 1px solid #397df6;
  background: black;
  align-self: flex-end;
  padding: 6px 0;
  cursor: pointer;
`;

const IsOnline = styled.p`
  color: #3677f7;
`;

const Browser = styled.p`
  padding-bottom: 13px;
  &::first-letter {
    text-transform: uppercase;
  }
`;
const SessionIp = styled.p``;

const DeviceIcon = styled(Image)`
  margin: 5px 0 0 15px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 6px;
`;

const SessionWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
