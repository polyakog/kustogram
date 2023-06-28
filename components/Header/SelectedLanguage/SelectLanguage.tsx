import {baseTheme} from "../../../styles/styledComponents/theme";
import styled from "styled-components";

export const SelectLanguage = () => {
  return (
    <StyledSelectLanguage>
      <option value="russian">&#127479;&#127482; Russian</option>
      <option value="english">&#127468;&#127463; English</option>
    </StyledSelectLanguage>
  );
};

const StyledSelectLanguage = styled.select
  `
    width: 163px;
    height: 36px;
    margin-left: 3.7%;

    background: ${baseTheme.colors.dark[700]};
    outline: none;

    color: white;
  `
