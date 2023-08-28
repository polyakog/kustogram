import styled from "styled-components";
import { baseTheme } from "../../../styles/styledComponents/theme";
import { MenuBarPropsType } from "./Menubar";

export const StyledMenuBar = styled.div<{ showMenuBar: string | string[] | undefined }>`
  position: relative;
  display: flex;
  justify-content: center;
  /* max-width: 220px; */
  min-width: 360px;
  height: 60px;
  /* width: 100vw; */
  opacity: ${(props) => (props.showMenuBar ? 0 : 1)};
`;

export const StyledItemBlock = styled.div`
  /* margin-left: 45px; */
  padding-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 36px;

  > * {
    &:last-child {
      display: none;
    }
  }
`;

export const StyledCreate = styled.div`
  position: absolute;
  top: 15px;
  left: 108px;
`;

//MainLink
export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;
