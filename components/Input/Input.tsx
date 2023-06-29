import { ChangeEventHandler } from "react";
import styled from "styled-components";

export const Input = ({
  value,
  onChange,
  labelText,
  hintText,
  type = 'text',
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  labelText: string;
  hintText?: string;
  type?: HTMLInputElement['type']
}) => {
  return (
    <StyledInputContainer>
      <StyledLabel>
        {labelText}
        <StyledInput value={value} onChange={onChange} type={type}/>
      </StyledLabel>
      {hintText && <StyledHint>{hintText} </StyledHint>}
    </StyledInputContainer>
  );
};

const StyledInput = styled.input`
  background-color: #171717;
  border: 1px solid #8d9094;
  color: #8D9094;
  padding: 6px 12px;
  border-radius: 2px;
  width: 100%;
  height: 36px;
`;

const StyledInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #8d9094;
  margin-bottom: 16px;
  font-size: 14px;
  font-family: Inter;
  line-height: 24px;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const StyledHint = styled.p`
margin-top: 7px;
`;
