import React, { useState } from 'react'

import { usePathname } from 'next/navigation'
import { MainLink, UpperMainLink } from './MainLink/MainLink'
import {
  MenuList,
  MenuWrapper,
  StyledCreate,
  StyledDiv,
  StyledItemBlock,
  StyledItemUpperBlock,
  StyledMenuBar,
} from './Menubar.styled'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import dots from 'public/img/icons/more-horizontal_white.svg'
import selectedDots from 'public/img/icons/more-horizontal_selected.svg'
import { baseTheme } from 'styles/styledComponents/theme'
import { MenuItems } from './constant'
import { LogoutModal } from '../Navbar/LogoutLink/logoutLink'
import { useRouter } from 'next/router'
import { Path } from 'common/enums/path'

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
      key={k}
      src={isActive(item.href) ? item.selectIcon : item.icon}
      name={item.name}
      // name={t(item.name)}
      callback={callback[k]}
    />
  ))

  return (
    <>
      <MenuWrapper onClick={handleMenu}>
        <Image priority alt={'menu'} height={24} src={!isMenu ? dots : selectedDots} width={24} />
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
