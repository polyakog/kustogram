import React, { useEffect, useState } from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/PageLayout/PageLayout";
import { styled } from "styled-components";
import Image from "next/image";
import chrome from "public/img/icons/chrome-svgrepo-com.svg";
import { getUserBrowser } from "common/utils/getUserBrowser";
import iphone from "public/img/icons/phone_iphone.svg";
import mac from "public/img/icons/desktop_mac.svg";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "next-i18next.config.js";
import { baseTheme } from "styles/styledComponents/theme";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "nav_bar", "post_cr"], config))
    }
  };
}

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
  const { t } = useTranslation();
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
          <SectionTitle>{t("this_devices")}</SectionTitle>
          <ActiveSession>
            <DeviceIcon alt="browser icon" src={chrome} />
            <Wrapper>
              <Browser suppressHydrationWarning>{browser}</Browser>
              <SessionIp>IP: {ip}</SessionIp>
              <IsOnline>{currentStatus}</IsOnline>
            </Wrapper>
          </ActiveSession>
          <EndSessionsBtn>
            <EndSessionsBtnText>{t("terminate_session")}</EndSessionsBtnText>
          </EndSessionsBtn>
        </SessionWrapper>
        <SessionWrapper>
          <div style={{ marginBottom: "18px" }}>{t("active_sessions")}</div>
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
  background: ${baseTheme.colors.dark[500]};
  border: 1px solid ${baseTheme.colors.dark[300]};
  gap: 12px;
`;

const LastVisit = styled.p``;

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
`;

const EndSessionsBtnText = styled.p`
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`;

const IsOnline = styled.p`
  color: ${baseTheme.colors.info[0]};
  font-weight: 500;
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
