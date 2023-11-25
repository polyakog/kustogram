import { ChangeEvent, useState } from 'react'

import { useMutation } from '@apollo/client'
import { SelectStatusAdmin } from 'features/admin/SelectStatusAdmin'
import styled from 'styled-components'

import { GET_USERS, UPDATE_USER_STATUS } from '../../../../assets/apollo/users'
import { ThemeButton } from '../../../enums/themeButton'
import { Button } from '../../Button/Button'
import Modal from '../ModalPublic/Modal'
import { status } from 'nprogress'
import { baseTheme } from 'styles/styledComponents/theme'

type AdminBlockPropsType = {
  ban: boolean
  id: string
  isOpenModalBlock: boolean
  setIsOpenModalBlock: (isOpenModalBlock: boolean) => void
  userName: string
}

export const ModalAdminBlockUser = ({
  ban,
  isOpenModalBlock,
  setIsOpenModalBlock,
  id,
  userName,
}: AdminBlockPropsType) => {
  const [blockUser] = useMutation(UPDATE_USER_STATUS, {
    variables: {
      userId: id,
      banStatus: !ban,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const [selected, setSelected] = useState('Reason for ban')

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value)
  }

  const onClose = () => {
    setIsOpenModalBlock(false)
  }
  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => {
    setHovered(false)
  }

  const handleMouseLeave = () => {
    setHovered(true)
  }

  const handleBlock = () => {
    blockUser().then(() => setIsOpenModalBlock(false))
  }

  return isOpenModalBlock ? (
    <Modal
      handleModalClose={onClose}
      height={ban ? '220px' : 'max-content'}
      title="Block user"
      width="378px"
      bodyText={
        ban
          ? `Are you sure want to un-ban, ${userName}`
          : `Are you sure to ban this user, ${userName}?`
      }
    >
      <Column>
        {!ban && (
          <SelectStatusAdmin
            handleSelect={handleSelect}
            initialValue="Reason for ban"
            options={['Bad behavior', 'Advertising placement', 'Another reason']}
            selected={selected}
          />
        )}
        {selected === 'Another reason' && <Reason />}
        <Row>
          <Button
            theme={hovered ? ThemeButton.PRIMARY : ThemeButton.OUTLINED}
            width="130px"
            onClick={onClose}
            onMouseEnter={handleMouseLeave}
            onMouseLeave={handleMouseEnter}
          >
            No
          </Button>
          <Button
            theme={hovered ? ThemeButton.OUTLINED : ThemeButton.PRIMARY}
            width="130px"
            onClick={() => handleBlock()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Yes
          </Button>
        </Row>
      </Column>
    </Modal>
  ) : null
}

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  right: 0;
  align-self: left;
  gap: 20px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Reason = styled.input`
  &:active {
    pointer-events: none;
    border: 1px solid white;
    color: white;
    &:focus {
      border: 1px solid white;
      color: white;
    }
    &:hover {
      border: 1px solid white;
      color: white;
    }
  }
  &:focus {
    border: 1px solid #397df6;
    color: #8d9094;
    &:hover {
      border: 1px solid #397df6;
      color: #8d9094;
    }
    &:-webkit-autofill {
      -webkit-text-fill-color: #8d9094;
      caret-color: #8d9094;
    }
  }
  &:disabled {
    border: 1px solid #4c4c4c;
    color: #4c4c4c;
  }
  &:hover {
    color: #8d9094;
    border: 1px solid #8d9094;
  }

  max-width: '330px';
  width: 100%;
  height: 36px;
  padding-left: 8px;
  position: relative;

  font-size: 14px;

  outline: none;
  border-radius: 2px;
  border: 1px solid #4c4c4c;
  background: ${baseTheme.colors.dark[500]};
  color: #8d9094;
  box-shadow: inset 0 0 0 50px ${baseTheme.colors.dark[500]};

  &:-webkit-autofill {
    -webkit-text-fill-color: #8d9094;
    caret-color: #8d9094;
  }

  @media (max-width: 390px) {
    width: 90vw;
    max-width: '330px';
  }
`
