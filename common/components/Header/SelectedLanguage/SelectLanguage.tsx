import { baseTheme } from '../../../../styles/styledComponents/theme'
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "common/hooks/useWindowSize";
import { mediaSizes } from "common/constants/Profile/mediaSizes";
import Image from "next/image";
import Russia from "public/img/icons/Flag-Russia.svg";
import UK from "public/img/icons/Flag-United_Kingdom.svg";
import { useState, useEffect } from 'react';

// Компонента выбора языка (русский и английский)

const laguageOptions = {
  en: {
    alt: "en",
    srs: UK,
    text: "English"
  },
  ru: {
    alt: "ru",
    srs: Russia,
    text: "Русский"
  }
}



type LaguageType = typeof laguageOptions.ru
export const SelectLanguage = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { i18n } = useTranslation();

  const { width } = useWindowSize(); // хук для измерения размера экрана
  /*  ____________<переменные для мобильной версии>______________*/

  const flagSize = width ? (width < mediaSizes.mobileScreenSize ? 24 : 20) : 20;
  const [showFlagBar, setShowFlagBar] = useState(true)
  

  useEffect (()=> {

    if (width! < mediaSizes.mobileScreenSize) {
      setShowFlagBar(false)
    } else setShowFlagBar(true)

  }, [width])

  /*  ____________</переменные для мобильной версии>_______________*/

  // Обработчик селектора языка, который перенаправляет на тот же url,
  // с теми же query параметрами, но со сменой языка

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.target.value })
  }

  const handleLangeSelect = ()=> {

  }

//  const [currentLanguage, setCurrentLanguage] = useState("en") 
 const currentLanguage = i18n.language == "ru" ? "ru" : "en"
  
let option: LaguageType
  if (currentLanguage == "ru") {
    option = laguageOptions.ru
  } else {option = laguageOptions.en}

  return (
    // <StyledSelectLanguage value={i18n.language == "ru" ? "ru" : "en"} onChange={handleLangChange}>
    //   <option value="en">&#127468;&#127463; English</option>
    //   <option value="ru">&#127479;&#127482; Русский</option>
    // </StyledSelectLanguage>
<>  
{ showFlagBar && (
  <LangBox>
    < SelectLangBlock onClick={handleLangeSelect}>
    <Image
              priority
              alt={option.alt}
              height={flagSize}
              src={option.srs}
              width={flagSize}
            />
            <span> {option.text}</span>
           <div>
            <Image
              priority
              alt={""}
              height={24}
              src={option.srs}
              width={24}
            />
            </div> 


    </SelectLangBlock>
      
      

    </LangBox>
)}

</>
  
  )
}

// Стили

const LangBox = styled.div`
  width: 163px;
  height: 36px;
  flex-shrink: 0;
  top: 12px;
  margin-left: 3.7%;
  border: solid 1px ${baseTheme.colors.dark[100]};
  color: ${baseTheme.colors.light[100]};
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  font-family: Inter;
  line-height: 24px;
  cursor: pointer;
`;

const SelectLangBlock = styled.div`
  

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
