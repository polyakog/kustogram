import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { DELETE_USER, GET_USERS } from '../../../../assets/apollo/users'
import { ThemeButton } from '../../../enums/themeButton'
import { Button } from '../../Button/Button'
import Modal from '../ModalPublic/Modal'

type AdminDeletePropsType = {
  id: string
  isOpenModalDelete: boolean
  setIsOpenModalDelete: (isOpenModalDelete: boolean) => void
}

export const ModalAdminDeleteUser = ({
  isOpenModalDelete,
  setIsOpenModalDelete,
  id,
}: AdminDeletePropsType) => {
  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    variables: {
      userId: id,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const onClose = () => {
    setIsOpenModalDelete(false)
  }
  const [hovered, setHovered] = useState(true)

  const handleMouseEnter = () => {
    setHovered(false)
  }

  const handleMouseLeave = () => {
    setHovered(true)
  }

  return isOpenModalDelete ? (
    <Modal
      bodyText="Are you sure to delete user Ivan Ivanov?"
      handleModalClose={onClose}
      title="Delete user"
      width="440px"
    >
      <>
        <Button
          theme={hovered ? ThemeButton.PRIMARY : ThemeButton.OUTLINED}
          width="96px"
          onClick={onClose}
          onMouseEnter={handleMouseLeave}
          onMouseLeave={handleMouseEnter}
        >
          No
        </Button>
        <Button
          theme={hovered ? ThemeButton.OUTLINED : ThemeButton.PRIMARY}
          width="96px"
          onClick={() => deleteUser()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Yes
        </Button>
      </>
    </Modal>
  ) : null
}
