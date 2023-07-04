import {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import classNames from '../../../assets/lib/classNames/classNames';
import {AppLink} from '../AppLink/AppLink';
import {useLogoutMutation} from '../../../assets/store/api/auth/authApi';

interface SidebarLinkProps {
  className?: string
}

export const LogoutLink: FC<SidebarLinkProps> = ({className}) => {

  const [logout] = useLogoutMutation()

  const logoutHandler = () => {
    logout()
  }

  return (
    <AppLink onClick={logoutHandler} href={''}>
      <StyledDiv className={classNames('cls.MainLink', {}, [className])}>
        <Image
          src={'/img/icon/LogOut.svg'}
          alt={'sdc'}
          width={24}
          height={24}
        />
        <p>Log Out</p>
      </StyledDiv>
    </AppLink>
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
