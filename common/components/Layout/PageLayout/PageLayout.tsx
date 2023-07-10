import {NextPage} from 'next';
import {PropsWithChildren, ReactElement} from 'react';
import Header from '../../Header/Header';
import {Navbar} from '../../Navbar/Navbar';
import styled from 'styled-components';
import {baseTheme} from '../../../../styles/styledComponents/theme';
import {store} from '../../../../assets/store/store';
import {Provider} from 'react-redux';

export const PageLayout: NextPage<PropsWithChildren> = (props) => {
  const {children} = props
  return (
    <StyledWrapper>
      <Provider store={store}>
        <Header/>
        <Page>
          <Navbar/>
          <Main>{children}</Main>
        </Page>
      </Provider>
    </StyledWrapper>
  )
}

export const getLayout = (page: ReactElement) => {
  return <PageLayout>{page}</PageLayout>
}


const StyledWrapper = styled.div
  ` width: 100%;
    min-height: 100vh;

    background: ${baseTheme.colors.dark['700']};
    color: ${baseTheme.colors.light[100]};
  `

const Page = styled.div
  `
    display: flex;
    max-width: 1310px;
    width: 100%;
    gap: 24px;
    
    padding: 0 15px;
    margin: auto;
  `

const Main = styled.div`
  padding-top: 36px;
  flex-grow: 1;
`

