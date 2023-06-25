import { baseTheme } from "assets/constants/theme";
import styled from "styled-components";

const Logo = () => {
  return <LogoStyle>Inctagram</LogoStyle>;
};

const LogoStyle = styled.div`
color: ${baseTheme.colors.light[100]};

/* Large */
font-size: 26px;
font-family: Inter;
font-weight: 600;
line-height: 36px;

`

export { Logo };
