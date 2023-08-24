import { Form } from "formik";
import styled from "styled-components";
import { baseTheme } from "styles/styledComponents/theme";

export const StyledContent = styled.div`
  position: relative;
  display: flex;
  gap: 40px;

  @media (max-width: 790px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledAvatarBlock = styled.div`
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  gap: 20px;

  background: ${baseTheme.colors.dark[700]};
  color: ${baseTheme.colors.dark[100]};
`;

export const IconBlock = styled.div`
  position: relative;

  width: 192px;
  height: 192px;
  overflow: hidden;
  background: ${baseTheme.colors.dark[100]};
  border-radius: 50%;

  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 192px;
    height: 192px;
    object-fit: cover;
  }
`;

export const StyledProfileForm = styled(Form)`
  align-items: flex-end;
  width: 100%;
`;

export const StyledLine = styled.div`
  position: absolute;
  bottom: 60px;
  right: 0;
  width: 100%;
  max-width: 726px;
  height: 1px;
  background: ${baseTheme.colors.dark[300]};
`;

export const BlockButton = styled.div`
  text-align: right;
  padding-top: 24px;
`;
