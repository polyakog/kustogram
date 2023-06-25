import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import styled from "styled-components";
import { getLayout } from 'components/Layout/BaseLayout/BaseLayout';

const Home: NextPageWithLayout = () => (
    <StyledWrap>
        <Image
            src="/kusto.png"
            alt="Next.js Logo"
            width={180}
            height={180}
            priority
        />
    </StyledWrap>
);

export default Home;

Home.getLayout = getLayout

const StyledWrap = styled.div
`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
