import React, { useState } from "react";
import { getLayout } from "../../../../common/components/Layout/BaseLayout/BaseLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "next-i18next.config.js";
import { useTranslation } from "next-i18next";
import { useRefreshLinkMutation } from "../../../../assets/store/api/auth/authApi";
import { Modal } from "../../../../common/components/Modal";
import VerificationWindow from "../../../../features/auth/VerificationWindow";
import { useLocalStorage } from "common/hooks/useLocalStorage";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context as any;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config))
    }
  };
}

const Verification = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const { getItem } = useLocalStorage();

  const { t } = useTranslation();

  const data = { email: getItem("email") };

  const [refreshLinkHandler] = useRefreshLinkMutation();

  const handleClick = () => {
    refreshLinkHandler(data)
      .unwrap()
      .then(() => {
        setIsModalActive(true);
      });
  };

  const handleModalClose = () => {
    setIsModalActive(false);
  };

  return (
    <>
      {" "}
      {isModalActive && (
        <Modal
          title="Refresh link"
          bodyText={`We have sent a refresh link your email to ${getItem("email")}`}
          handleModalClose={handleModalClose}
        />
      )}
      <VerificationWindow
        handleClick={handleClick}
        title={t("link_exp_title")}
        text={t("link_exp_text")}
        btnTitle={t("resend_btn")}
      />
    </>
  );
};

Verification.getLayout = getLayout;

export default Verification;
