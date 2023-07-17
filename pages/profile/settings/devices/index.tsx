import React from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/SettingsLayout/SettingsLayout";

const Devices = () => {
  return <SettingsPageWrapper>devices</SettingsPageWrapper>;
};

Devices.getLayout = getLayout;
export default Devices;
