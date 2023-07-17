import React, { FC, PropsWithChildren } from "react";
import styled from "styled-components";
import { StaledTitle, StyledFormAuth } from "styles/styledComponents/auth/Auth.styled";

export const WrapperContainerNoFrame: FC<PropsWithChildren & { title: string }> = (props) => {
  const { children, title } = props;
  return (
    <StyledFormAuthNoFrame>
      <StaledTitle>{title}</StaledTitle>
      {children}
    </StyledFormAuthNoFrame>
  );
};

const StyledFormAuthNoFrame = styled(StyledFormAuth)`
  background: transparent;
  border: none;
`;
