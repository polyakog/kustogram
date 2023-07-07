import { baseTheme } from "../../../styles/styledComponents/theme";
import { SelectLanguage } from "./SelectedLanguage/SelectLanguage";
import styled from "styled-components";
import Image from "next/image";
import bell from '../../../public/img/icons/initialBell.svg'
import { StyledSignIn } from "../../../styles/styledComponents/auth/FormikAuth.styled";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <StyledHeader>
      <LogoStyle onClick={handleClick} >KustoSocialNet</LogoStyle>
      <Image width={24} height={24} src={bell} alt={'bell'} />
      <SelectLanguage />
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
    cursor:pointer;

    font-size: 26px;
    font-family: Arial;
    font-weight: 600;
    line-height: 36px;

    color: ${baseTheme.colors.light[700]};
  `



