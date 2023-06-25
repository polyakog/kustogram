import Image from 'next/image';
import {NextPageWithLayout} from './_app';
import styled, {ThemeProvider} from "styled-components";
import {themeProject} from "../styles/styledComponents/Them.styled";
import {StyledPageWrapper} from "../styles/styledComponents/StyledPageWrapper.styled";
import {LoginNavigate} from "../hoc/LoginNavigate";
import {getLayout} from "../components/Layout/BaseLayout/BaseLayout";

const Home: NextPageWithLayout = () => (
<LoginNavigate>
  <StyledPageWrapper>
    <Image
      src="/kusto.png"
      alt="Next.js Logo"
      width={180}
      height={180}
      priority
    />
  </StyledPageWrapper>
</LoginNavigate>

);
Home.getLayout = getLayout
export default Home;

const StyledWrap = styled.div
`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
