import {FC} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import classNames from '../../../assets/lib/classNames/classNames';
import {AppLink} from '../AppLink/AppLink';

interface SidebarLinkProps {
  className?: string
}

export const MainLink: FC<SidebarLinkProps> = ({className}) => {
  return (
    <AppLink href={''}>
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