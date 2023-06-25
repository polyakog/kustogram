import { baseTheme } from "assets/constants/theme";
import { Logo } from "./Logo";
import { SelectLanguage } from "./SelectLanguage";
import styled from "styled-components";
import OutlineBell from "./OutlineBell";


const Header = () => {
  return (
    <StyledHeader>
      <StyledContainer>

        <Logo />
        <OutlineBell/>
        <SelectLanguage />

      </StyledContainer>
    </StyledHeader>
  );
};

/* Used dark theme */
const StyledHeader = styled.header`
  color: ${baseTheme.colors.dark[100]};
  width: 100vw;
  justify-content: center;
  height: 181px;
  // display: flex;
  padding: 31px 82px 90px 82px;
  align-items: center;
  justify-content: center;
  background: ${baseTheme.colors.dark[700]};
`;

const StyledContainer = styled.div`
  width: 90vw;
  display: grid;
  // flex-direction: row;
  grid-template-columns: 10fr 1fr 1fr;

  // flex-shrink: 0;
  height: 60px;
  background: ${baseTheme.colors.dark[700]};
  border-top: 1px solid ${baseTheme.colors.dark[300]};
  
`;

export default Header
