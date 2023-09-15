import React, { useState } from 'react'

import { Path } from 'common/enums/path'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import selectedDots from 'public/img/icons/more-horizontal_selected.svg'
import dots from 'public/img/icons/more-horizontal_white.svg'
import styled from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import { LogoutModal } from '../Navbar/LogoutLink/logoutLink'

import { MenuItems } from './constant'
import { UpperMainLink } from './MainLink/MainLink'
import {
  MenuList,
  MenuWrapper,
  StyledCreate,
  StyledDiv,
  StyledItemBlock,
  StyledItemUpperBlock,
  StyledMenuBar,
} from './Menubar.styled'

export type MenuHeaderPropsType = {
  showMenuHeader: boolean
  // openModalHandler: () => void;
}
export const MenuHeader = () => {
  const location = usePathname()
  const router = useRouter()

  const { t } = useTranslation('nav_bar')
  const [isMenu, setIsMenu] = useState(false)
  const [isOpenModalLogout, setIsOpenModalLogout] = useState<boolean>(false)

  const handleMenu = () => {
    if (isMenu) {
      setIsMenu(false)
    } else {
      setIsMenu(true)
    }
  }

  const isActive = (name: string) => (location === name ? 'active' : '')

  const settingsHandler = () => {
    router.push(Path.PROFILE_SETTINGS)
  }
  const statisticsHandler = () => {
    router.push('/')
  }
  const favoritesHandler = () => {
    router.push('/')
  }
  const logoutHandler = () => {
    setIsOpenModalLogout(true)
  }

  const callback = [settingsHandler, statisticsHandler, favoritesHandler, logoutHandler]

  const items = MenuItems.map((item, k) => (
    <UpperMainLink
      key={item.name}
      callback={callback[k]}
      name={item.name}
      src={isActive(item.href) ? item.selectIcon : item.icon}
    />
  ))

  return (
    <>
      <MenuWrapper onClick={handleMenu}>
        <Image alt="menu" height={24} src={!isMenu ? dots : selectedDots} width={24} priority />
      </MenuWrapper>

      {isMenu ? (
        <MenuList onMouseLeave={() => setIsMenu(false)}>
          <StyledItemUpperBlock>{items}</StyledItemUpperBlock>
        </MenuList>
      ) : null}

      <LogoutModal
        isOpenModalLogout={isOpenModalLogout}
        setIsOpenModalLogout={setIsOpenModalLogout}
      />

      {/* <StyledMenuBar showMenuBar={showMenuHeader}> */}
      {/* <StyledCreate onClick={openModalHandler}> */}
      {/* <StyledDiv style={{ cursor: "pointer" }}>
            <Image src={"/img/icons/plus-square.svg"} alt={"CreatePost"} width={24} height={24} />
          </StyledDiv> */}

      {/* </StyledCreate> */}

      {/* <StyledItemBlock>{items}</StyledItemBlock> */}
      {/* </StyledMenuBar> */}
    </>
  )
}
