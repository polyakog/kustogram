import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {getLayout} from '../common/components/Layout/BaseLayout/BaseLayout';
import Link from "next/link";
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import {GetStaticPropsContext} from "next"
import config from 'next-i18next.config.js'
import {Path} from "../common/enums/path";
import kusto from "../public/img/kusto.png"


export async function getStaticProps(context: GetStaticPropsContext) {
  const {locale} = context as any

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"], config)),
    }
  }
}

const Home: NextPageWithLayout = () => (
  <>
    <Image
      src={kusto}
      alt="Logo"
      width={180}
      height={180}
      priority
    />
    <div>
      <p><Link href={Path.LOGIN}>Login</Link></p>
      <p><Link href={Path.REGISTRATION}>registration</Link></p>
      <p><Link href={Path.FORGOT_PASSWORD}>recovery</Link></p>
      <p><Link href={Path.PROFILE}>profile</Link></p>
      <p><Link href={Path.PROFILE_SETTINGS}>profile/settings</Link></p>
      <p><Link href={Path.NEW_PASSWORD}>auth/new_password</Link></p>
      <p><Link href={Path.REGISTRATION_SUCCESS}>registration/success</Link></p>
      <p><Link href={Path.REGISTRATION_ERROR}>Registration_error</Link></p>
      <p><Link href={Path.NEW_PASSWORD_ERROR}>Password_error</Link></p>
    </div>

  </>
);

Home.getLayout = getLayout
export default Home;
