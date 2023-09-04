import Image from 'next/image'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import bell from '../../../public/img/icons/initialBell.svg'
import { baseTheme } from '../../../styles/styledComponents/theme'

import { SelectLanguage } from './SelectedLanguage/SelectLanguage'
import { useEffect, useState } from 'react'
import { MenuHeader } from '../Menu/MenuHeader'
import { useWindowSize } from 'common/hooks/useWindowSize'
import { mediaSizes } from 'common/constants/Profile/mediaSizes'

const Header = () => {
  const router = useRouter()
  const [isMenuHeader, setIsMenuHeader] = useState(true)
  const [isBell, setIsBell] = useState(false)

  const { width } = useWindowSize() // хук для измерения размера экрана

  useEffect(() => {
    if (width! < mediaSizes.mobileScreenSize) {
      setIsBell(false)
      setIsMenuHeader(true)
    } else {
      setIsBell(true)
      setIsMenuHeader(false)
    }
  }, [width])

  const handleClick = () => {
    router.push('/')
  }

  return (
    <StyledHeader>
      <LogoStyle onClick={handleClick}>KustoSocialNet</LogoStyle>
      {isBell && <Image alt="bell" height={24} src={bell} width={24} />}
      <SelectLanguage />
      {isMenuHeader && <MenuHeader />}
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  max-width: 1310px;

  width: 100%;
  height: 60px;
  padding: 0 4.6%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${baseTheme.colors.dark[700]};
  border-bottom: 1px solid ${baseTheme.colors.dark[300]};
`

const LogoStyle = styled.div`
  flex: 1 0 auto;
  cursor: pointer;

  font-size: 26px;
  font-family: Inter;
  font-weight: 600;
  line-height: 36px;

  color: ${baseTheme.colors.light[700]};
`
