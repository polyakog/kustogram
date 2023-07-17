import React from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/SettingsLayout/SettingsLayout";

const Payments = () => {
  return <SettingsPageWrapper>payments</SettingsPageWrapper>;
};

Payments.getLayout = getLayout;
export default Payments;
