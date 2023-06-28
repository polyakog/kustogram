import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import {getLayout} from 'components/Layout/BaseLayout/BaseLayout';

const Home: NextPageWithLayout = () => (
  // <StyledWrapper>   // не нужно, т.к. wrapper у нас в  Layout.tsx
    <Image
      src="/kusto.png"
      alt="Next.js Logo"
      width={180}
      height={180}
      priority
    />
  // {/*</StyledWrapper>*/}
);

Home.getLayout = getLayout
export default Home;
