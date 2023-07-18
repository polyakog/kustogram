import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyCheckLinkHandlerQuery } from "../../../../assets/store/api/auth/authApi";
import { codeCheckLink } from "../../../../common/utils/codeCheckLink";
import { Path } from "../../../../common/enums/path";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import config from "../../../../next-i18next.config";
import { useTranslation } from "next-i18next";

export async function getStaticProps(context: GetStaticPropsContext) {
  const { locale } = context as any;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config))
    }
  };
}

const CheckLink = () => {
  const { code } = codeCheckLink();
  const [checkLinkHandler] = useLazyCheckLinkHandlerQuery();
  const router = useRouter();

  useEffect(() => {
    checkLinkHandler(code)
      .unwrap()
      .then(() => {
        router.push(Path.REGISTRATION_SUCCESS).then(() => {});
      })
      .catch(() => {
        router.push(Path.REGISTRATION_ERROR).then(() => {});
      });
  }, []);

  return <div></div>;
};

export default CheckLink;
