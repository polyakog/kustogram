import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'

import { ITEM_LINK } from './constant'
import { LogoutLink } from './LogoutLink/logoutLink'
import { MainLink } from './MainLink/MainLink'
import {
  StyledCreate,
  StyledDiv,
  StyledItemBlock,
  StyledLogout,
  StyledSidebar,
} from './Navbar.styled'

export type NavbarPropsType = {
  openModalHandler: () => void
  showNavbar: string[] | string | undefined
}
export const Navbar = ({ showNavbar, openModalHandler }: NavbarPropsType) => {
  const location = usePathname()

  const { t } = useTranslation('nav_bar')

  const isActive = (name: string) => (location === name ? 'active' : '')

  const items = ITEM_LINK.map(item => (
    <MainLink
      key={item.name}
      href={item.href}
      isactive={isActive(item.href)}
      name={t(item.name)}
      src={isActive(item.href) ? item.selectIcon : item.icon}
    />
  ))

  return (
    <StyledSidebar showNavbar={showNavbar}>
      <StyledCreate onClick={openModalHandler}>
        <StyledDiv style={{ cursor: 'pointer' }}>
          <Image alt="CreatePost" height={24} src="/img/icons/plus-square.svg" width={24} />
          <p>{t('create')}</p>
        </StyledDiv>
      </StyledCreate>
      <StyledItemBlock>{items}</StyledItemBlock>
      <StyledLogout>
        <LogoutLink />
      </StyledLogout>
    </StyledSidebar>
  )
}
