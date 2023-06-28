import {baseTheme} from "../../styles/styledComponents/theme";
import {SelectLanguage} from "./SelectedLanguage/SelectLanguage";
import styled from "styled-components";
import Image from "next/image";
import bell from '../../public/icons/initialBell.svg'

const Header = () => {
  return (
    <StyledHeader>
      <LogoStyle>KustoSocialNet</LogoStyle>;
      <Image width={24} height={24} src={bell} alt={'bell'}/>
      <SelectLanguage/>
    </StyledHeader>
  );
};
export default Header

const StyledHeader = styled.header
  `
    width: 100%;
    height: 60px;
    padding: 0 4.6%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: ${baseTheme.colors.dark[700]};
    border-bottom: 1px solid ${baseTheme.colors.dark[300]};
  `;

const LogoStyle = styled.div
  `
    flex:1 0 auto;
    
    font-size: 26px;
    font-family: Inter;
    font-weight: 600;
    line-height: 36px;

    color: ${baseTheme.colors.light[100]};
  `



