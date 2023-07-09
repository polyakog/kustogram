import Image from "next/image";
import {getLayout} from "../common/components/Layout/BaseLayout/BaseLayout";
import Link from "next/link";
import { useWindowSize } from "common/hooks/useWindowSize";
import errorImage from "public/img/404.svg"
import { StyledSignInWrapper, StyledText } from "styles/styledComponents/auth/FormikAuth.styled";
import { useTranslation } from "react-i18next";
import { GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import config from 'next-i18next.config.js'


export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

const NotFound = () => {
  const { width, height } = useWindowSize()
  const {t} = useTranslation()
  return <div>
    <StyledSignInWrapper> 
          {/* <StyledText>{t("error_404")}</StyledText> */}
        </StyledSignInWrapper> 
    
    <Image
    src={errorImage}
    alt="404 error"
    width={width? width:1280}
    height={height? height:720}
    priority
  />
    <div>
      <Link href={'/'}>Back to Main</Link>
    </div>

  </div>

}
NotFound.getLayout = getLayout
export default NotFound