import { useState } from 'react'

import { useMutation } from '@apollo/client'
import { ModalAdminBlockUser } from 'common/components/Modals/ModalAdmin/ModalAdminBlockUser'
import { useRouter } from 'next/router'

import { DELETE_USER, GET_USERS, UPDATE_USER_STATUS } from '../../../assets/apollo/users'
import { ModalAdminDeleteUser } from '../../../common/components/Modals/ModalAdmin/ModalAdminDeleteUser'
import block from '../../../public/img/icons/block_outline.svg'
import more from '../../../public/img/icons/more-horizontal-outline.svg'
import moreSelected from '../../../public/img/icons/more-horizontal_selected.svg'
import person from '../../../public/img/icons/person.svg'
import {
  MenuIconAdmin,
  MenuItemsAdmin,
  MenuItemWrapperAdmin,
  MoreAdmin,
  TextAdmin,
  UserMenuAdmin,
} from '../Admin.styled'
import { MenuPropsType } from '../types'

export const MenuUserTable = ({ id, ban, userName }: MenuPropsType) => {
  const [isActive, setIsActive] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)
  const [isOpenModalBlock, setIsOpenModalBlock] = useState<boolean>(false)

  const handleSelect = () => {
    setIsActive(prev => !prev)
  }

  const handleMouseLeave = () => {
    setIsActive(false)
  }
  const { push } = useRouter()

  const handleNavigate = (userId: string): void => {
    push(`/admin/${userId}`)
  }

  const [blockUser] = useMutation(UPDATE_USER_STATUS, {
    variables: {
      userId: id,
      banStatus: !ban,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    variables: {
      userId: id,
    },
    refetchQueries: [GET_USERS, 'GetUsers'],
  })

  const menu = [
    { src: person, alt: 'icon', text: 'Delete User', handler: deleteUser },
    { src: block, alt: 'icon', text: ban ? 'Un-ban' : 'Ban in the system', handler: blockUser },
    { src: more, alt: 'icon', text: 'More Information', handler: handleNavigate },
  ]

  return (
    <UserMenuAdmin>
      <MoreAdmin
        alt="more"
        src={isActive ? moreSelected : more}
        style={{ marginTop: '6px' }}
        onClick={handleSelect}
      />
      {isActive && (
        <MenuItemsAdmin onMouseLeave={handleMouseLeave}>
          {menu.map(item => (
            <MenuItemWrapperAdmin
              key={item.text}
              onClick={() => {
                if (item.text === 'Delete User') {
                  setIsOpenModalDelete(true)
                } else if (item.text === 'Ban in the system' || item.text === 'Un-ban') {
                  setIsOpenModalBlock(true)
                } else item.handler(id)
              }}
            >
              <MenuIconAdmin alt={item.alt} src={item.src} />
              <TextAdmin>{item.text}</TextAdmin>
            </MenuItemWrapperAdmin>
          ))}
        </MenuItemsAdmin>
      )}
      {isOpenModalDelete && (
        <ModalAdminDeleteUser
          id={id}
          isOpenModalDelete={isOpenModalDelete}
          setIsOpenModalDelete={setIsOpenModalDelete}
        />
      )}
      {isOpenModalBlock && (
        <ModalAdminBlockUser
          ban={ban}
          id={id}
          isOpenModalBlock={isOpenModalBlock}
          setIsOpenModalBlock={setIsOpenModalBlock}
          userName={userName}
        />
      )}
    </UserMenuAdmin>
  )
}
