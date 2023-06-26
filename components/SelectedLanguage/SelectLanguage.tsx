import { baseTheme } from "assets/constants/theme";
import styled from "styled-components";



const StyledSelectLanguage = styled.select`
  width: 163px;
  height: 36px;
  background: ${baseTheme.colors.dark[700]};
  color: white;
`;

const StyledOption = styled.option`
`;

const SelectLanguage = () => {
  return (
    <StyledSelectLanguage>
      <StyledOption>
        Russian
      </StyledOption>
      <StyledOption>
        English
      </StyledOption>
    </StyledSelectLanguage>
  );
};

export { SelectLanguage };
