import React from "react";
import { SettingsPageWrapper } from "../../../../features/settings/SettingsPageWrapper";
import { getLayout } from "../../../../common/components/Layout/PageLayout/PageLayout";

const Payments = () => {
  return <SettingsPageWrapper>payments</SettingsPageWrapper>;
};

Payments.getLayout = getLayout;
export default Payments;
