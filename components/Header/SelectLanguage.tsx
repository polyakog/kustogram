import { baseTheme } from "assets/constants/theme";
import styled from "styled-components";

const SelectLanguage = () => {
  return <LanguageStyle>Language</LanguageStyle>;
};

const LanguageStyle = styled.div`
color: ${baseTheme.colors.light[100]};

/* Large */
font-size: 26px;
font-family: Inter;
font-weight: 600;
line-height: 36px;

`
export { SelectLanguage };
