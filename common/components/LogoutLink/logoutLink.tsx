import {FC, useState} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import classNames from '../../../assets/lib/classNames/classNames';
import {AppLink} from '../AppLink/AppLink';
import {useLogoutMutation} from '../../../assets/store/api/auth/authApi';
import {LogoutModal} from '../PopUpModal/logoutModal';

interface SidebarLinkProps {
  className?: string
}

export const LogoutLink: FC<SidebarLinkProps> = ({className}) => {

  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false)
  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
  }
  const onClose = () => {
    setIsOpenModalEdit(false)
  }

  return (
    <>
    <AppLink onClick={() => setIsOpenModalEdit(true)} href={''}>
      <StyledDiv className={classNames('', {}, [className])}>
        <Image
          src={'/img/icons/log-out.svg'}
          alt={'logOut'}
          width={24}
          height={24}
        />
        <p>Log Out</p>
      </StyledDiv>
    </AppLink>
      {isOpenModalEdit && (
        <LogoutModal
          title={'Log Out'}
          textBody={'Are you really want to log out of your account'}
          userInfo={'Epam@epam.com'}
          callback={logoutHandler}
          onClose={onClose}
        />
      )}

      {/*<Modal handleModalClose={()=>{}} title={'qwe'} bodyText={'rwq'}/>*/}
      {/*<EmailSentModal handleModalClose={()=>{}} title={'qwdse'} bodyText={'rwq'}/>*/}
    </>
  )
}

const StyledDiv = styled.div
  `
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: center;
    align-items: center;
  `
