import { FC } from 'react'
import Image from 'next/image'
import { AppLink } from 'common/components/Navbar/AppLink/AppLink'
import { MenuRow, StyledDiv, TextBox, TextStyle } from '../Menubar.styled'

interface SidebarLinkProps {
  src: string
  name: string
  href: string
  isactive: string
}

export const MainLink: FC<SidebarLinkProps> = ({ name, src, href, isactive }) => {
  return (
    <AppLink href={href}>
      <StyledDiv>
        {src ? (
          <Image src={src} alt={'some icon'} width={24} height={24} />
        ) : (
          <div style={{ width: '24px', height: '24px' }}></div>
        )}
      </StyledDiv>
    </AppLink>
  )
}

type MenuBarProps = {
  src: string
  name: string
  callback: () => void
}

export const UpperMainLink: FC<MenuBarProps> = ({ name, src, callback }) => {
  return (
    <MenuRow onClick={callback}>
      <StyledDiv>
        <Image src={src} alt={'some icon'} width={24} height={24} />
        <TextBox>
          <TextStyle>{name}</TextStyle>
        </TextBox>
      </StyledDiv>
    </MenuRow>
  )
}
