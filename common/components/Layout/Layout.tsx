import Header from '../Header/Header';
import {NextPage} from 'next';
import {PropsWithChildren} from 'react';
import styled from 'styled-components';
import {baseTheme} from '../../../styles/styledComponents/theme';
import {store} from '../../../assets/store/store';
import {Provider} from 'react-redux';

export const Layout: NextPage<PropsWithChildren> = (props) => {
  const {children} = props
  return (
    <StyledWrapper>
      <Provider store={store}>
        <Header/>
        <Main>{children}</Main>
      </Provider>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div
  ` width: 100%;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    background: ${baseTheme.colors.dark['700']};
    color: ${baseTheme.colors.light[100]};  `

const Main = styled.div
  `
    //overflow: hidden;                          //уточнить
  `
