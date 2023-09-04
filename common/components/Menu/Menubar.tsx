import React from 'react'
import { ITEM_LINK } from '../Navbar/constant'
import { usePathname } from 'next/navigation'
import { MainLink } from './MainLink/MainLink'
import { StyledCreate, StyledDiv, StyledItemBlock, StyledMenuBar } from './Menubar.styled'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

export type MenuBarPropsType = {
  showMenuBar: string | string[] | undefined
  openModalHandler: () => void
}
export const Menubar = ({ showMenuBar, openModalHandler }: MenuBarPropsType) => {
  const location = usePathname()

  const { t } = useTranslation('nav_bar')

  const isActive = (name: string) => (location === name ? 'active' : '')

  const items = ITEM_LINK.map(item => (
    <MainLink
      key={item.name}
      src={isActive(item.href) ? item.selectIcon : item.icon}
      name={t(item.name)}
      href={item.href}
      isactive={isActive(item.href)}
    />
  ))

  return (
    <>
      <StyledMenuBar showMenuBar={showMenuBar}>
        <StyledCreate onClick={openModalHandler}>
          <StyledDiv style={{ cursor: 'pointer' }}>
            <Image src={'/img/icons/plus-square.svg'} alt={'CreatePost'} width={24} height={24} />
          </StyledDiv>
        </StyledCreate>
        <StyledItemBlock>{items}</StyledItemBlock>
      </StyledMenuBar>
    </>
  )
}
