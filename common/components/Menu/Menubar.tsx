import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'

import { ITEM_LINK } from '../Navbar/constant'

import { MainLink } from './MainLink/MainLink'
import { StyledCreate, StyledDiv, StyledItemBlock, StyledMenuBar } from './Menubar.styled'

export type MenuBarPropsType = {
  openModalHandler: () => void
  showMenuBar: string[] | string | undefined
}
export const Menubar = ({ showMenuBar, openModalHandler }: MenuBarPropsType) => {
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
    <StyledMenuBar showMenuBar={showMenuBar}>
      <StyledCreate onClick={openModalHandler}>
        <StyledDiv style={{ cursor: 'pointer' }}>
          <Image alt="CreatePost" height={24} src="/img/icons/plus-square.svg" width={24} />
        </StyledDiv>
      </StyledCreate>
      <StyledItemBlock>{items}</StyledItemBlock>
    </StyledMenuBar>
  )
}
