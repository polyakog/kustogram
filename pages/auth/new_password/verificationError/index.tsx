import React from "react";
import { getLayout } from "../../../../common/components/Layout/BaseLayout/BaseLayout";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticPropsContext } from "next";
import config from "next-i18next.config.js";
import { useTranslation } from "next-i18next";
import VerificationWindow from "features/auth/VerificationWindow";
import { Path } from "../../../../common/enums/path";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context as any;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config))
    }
  };
}

const Verification = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    router.push(Path.FORGOT_PASSWORD);
  };

  return (
    <VerificationWindow
      handleClick={handleClick}
      title={t("link_exp_title_recov")}
      text={t("link_exp_text")}
      btnTitle={t("resend_btn_recov")}
    />
  );
};

Verification.getLayout = getLayout;

export default Verification;
