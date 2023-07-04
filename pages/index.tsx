import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';
import Link from "next/link";

const Home: NextPageWithLayout = () => (
  // <StyledWrapper>   // не нужно, т.к. wrapper у нас в  Layout.tsx
  <>
    <Image
      src="/kusto.png"
      alt="Next.js Logo"
      width={180}
      height={180}
      priority
    />
    <div>
      <p><Link href={'/login'}>Login</Link></p>
      <p><Link href={'/registration'}>registration</Link></p>
      <p><Link href={'/recovery'}>recovery</Link></p>
      <p><Link href={'/new_password'}>new_password</Link></p>
      <p><Link href={'/profile'}>profile</Link></p>
      <p><Link href={'/profile/settings'}>profile/settings</Link></p>
      <p><Link href={'/auth/new_password'}>auth/new_password</Link></p>
      <p><Link href={'/registration/success'}>registration/success</Link></p>
      <p><Link href={'/verification'}>verification</Link></p>
    </div>

  </>

  // {/*</StyledWrapper>*/}
);

Home.getLayout = getLayout
export default Home;
