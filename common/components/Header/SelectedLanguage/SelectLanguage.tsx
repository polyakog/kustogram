import { baseTheme } from '../../../../styles/styledComponents/theme'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useWindowSize } from 'common/hooks/useWindowSize'
import { mediaSizes } from 'common/constants/Profile/mediaSizes'
import Image from 'next/image'
import Russia from 'public/img/icons/Flag-Russia.svg'
import UK from 'public/img/icons/Flag-United_Kingdom.svg'
import arrow from 'public/img/icons/arrow-ios-Down-outline-white.svg'
import { useState, useEffect } from 'react'

// Компонента выбора языка (русский и английский)

const laguageOptions = {
  en: {
    alt: 'en',
    srs: UK,
    text: 'English',
  },
  ru: {
    alt: 'ru',
    srs: Russia,
    text: 'Русский',
  },
}

type LaguageType = typeof laguageOptions.ru
export const SelectLanguage = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router

  const { i18n } = useTranslation()

  const { width } = useWindowSize() // хук для измерения размера экрана
  /*  ____________<переменные для мобильной версии>______________*/

  const flagSize = width ? (width < mediaSizes.mobileScreenSize ? 24 : 20) : 20
  const [showLongBar, setShowLongBar] = useState(true)
  const [showLongBarOption, setShowLongBarOption] = useState(true)

  useEffect(() => {
    if (width! < mediaSizes.mobileScreenSize) {
      setShowLongBar(false)
    } else setShowLongBar(true)
  }, [width])

  /*  ____________</переменные для мобильной версии>_______________*/

  // Обработчик селектора языка, который перенаправляет на тот же url,
  // с теми же query параметрами, но со сменой языка

  const handleLangeSelect = () => {
    if (showLongBarOption) {
      setShowLongBarOption(false)
    } else {
      setShowLongBarOption(true)
    }
  }

  const handleLangChange = (selectedLanguage: string) => {
    router.push({ pathname, query }, asPath, { locale: selectedLanguage })
    setShowLongBarOption(false)
  }

  const currentLanguage = i18n.language == 'ru' ? 'ru' : 'en'

  let option: LaguageType
  if (currentLanguage == 'ru') {
    option = laguageOptions.ru
  } else {
    option = laguageOptions.en
  }

  return (
    // <StyledSelectLanguage value={i18n.language == "ru" ? "ru" : "en"} onChange={handleLangChange}>
    //   <option value="en">&#127468;&#127463; English</option>
    //   <option value="ru">&#127479;&#127482; Русский</option>
    // </StyledSelectLanguage>
    <SelectionLanguage onMouseLeave={handleLangeSelect}>
      {showLongBar && (
        <LangBox>
          <SelectLangBlock onClick={handleLangeSelect}>
            <Image priority alt={option.alt} height={flagSize} src={option.srs} width={flagSize} />
            <LangName> {option.text}</LangName>
            <ArrBlock>
              <Image
                priority
                alt={'arrow'}
                height={24}
                src={arrow}
                // style={{marginTop: "6px"}}
                width={24}
              />
            </ArrBlock>
          </SelectLangBlock>
        </LangBox>
      )}

      {showLongBarOption && (
        <LongBarOptionBox>
          <OptionRow onClick={() => handleLangChange('en')}>
            <Image
              priority
              alt={option.alt}
              height={flagSize}
              src={laguageOptions.en.srs}
              width={flagSize}
            />
            <LangName>{laguageOptions.en.text}</LangName>
          </OptionRow>
          <OptionRow onClick={() => handleLangChange('ru')}>
            <Image
              priority
              alt={option.alt}
              height={flagSize}
              src={laguageOptions.ru.srs}
              width={flagSize}
            />
            <LangName>{laguageOptions.ru.text}</LangName>
          </OptionRow>
        </LongBarOptionBox>
      )}
    </SelectionLanguage>
  )
}

// Стили

const SelectionLanguage = styled.div`
  display: flex;
  flex-direction: column;
  width: 163px;
  margin-left: 3.7%;
  align-self: flex-start;
  margin-top: 12px;
  z-index: 20;
  box-sizing: border-box;
`

const LangBox = styled.div`
  position: relative;
  flex-wrap: wrap;
  width: 163px;
  height: 36px;

  border: solid 1px ${baseTheme.colors.dark[100]};
  color: ${baseTheme.colors.light[100]};

  cursor: pointer;
  padding-left: 12px;
`

const SelectLangBlock = styled.div`
  display: inline-flex;

  width: 100%;
  align-items: center;
  margin-top: 6px;
`

const LangName = styled.span`
  margin-left: 12px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  font-family: Inter;
`

const ArrBlock = styled.div`
  position: absolute;
  top: 6px;
  right: 12px;
`

const LongBarOptionBox = styled.div`
  position: relative;

  width: 163px;
  height: 72px;
  margin-left: 0px;

  color: ${baseTheme.colors.dark[900]};
  box-sizing: border-box;
  cursor: pointer;
`

const OptionRow = styled.div`
  display: flex;
  align-content: center;
  padding-top: 6px;
  width: 163px;
  height: 36px;
  padding-left: 12px;
  background-color: ${baseTheme.colors.light[100]};

  &:hover {
    background-color: ${baseTheme.colors.accent[700]};
    color: ${baseTheme.colors.light[100]};
    box-sizing: border-box;
  }
`

// const StyledSelectLanguage = styled.select`
//   width: 163px;
//   height: 36px;
//   margin-left: 3.7%;

//   background: ${baseTheme.colors.dark[700]};
//   outline: none;

//   color: ${baseTheme.colors.light[100]};

//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 24px;
//   font-family: Inter;
// `
