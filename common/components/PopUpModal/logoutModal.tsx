import React from 'react';
import {Modal} from '../Modal';
import styled from 'styled-components';
import {Button, ThemeButton} from '../Button/Button';
import {baseTheme} from '../../../styles/styledComponents/theme';

type LogoutModalType = {
  onClose: () => void
  callback: () => void
  title: string
  textBody: string
  userInfo: string
}

export const LogoutModal = (
  {
    onClose,
    title,
    textBody,
    userInfo,
    callback
  }: LogoutModalType
) => {
  return (
    <Modal onClose={onClose} title={title}>
      <Content>
        <div>
          <Text>{textBody}</Text>
          <Text> &quot;{userInfo}&quot;?</Text>
        </div>
        <BtnBlock>
          <Button
            theme={ThemeButton.OUTLINED}
            onClick={callback}
          >
            Yes
          </Button>
          <Button
            theme={ThemeButton.PRIMARY}
            onClick={onClose}
          >
            No
          </Button>
        </BtnBlock>
      </Content>
    </Modal>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Text = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  color: ${baseTheme.colors.light[100]};
`;

const BtnBlock = styled.div`
  width: 216px;
  display: flex;
  gap: 24px;
  text-align: right;
  align-self: flex-end;
`;
