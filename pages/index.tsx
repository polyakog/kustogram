import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';
import Link from "next/link";

const Home: NextPageWithLayout = () => (
 
  <>
    <Image
      src="/kusto.png"
      alt="Next.js Logo"
      width={180}
      height={180}
      priority
    />
    <Link href={'/login'}>Login</Link>
  </>
 
);

Home.getLayout = getLayout
export default Home;
