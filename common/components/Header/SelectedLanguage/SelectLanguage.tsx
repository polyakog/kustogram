import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import { baseTheme } from '../../../../styles/styledComponents/theme'
import { baseTheme } from "../../../../styles/styledComponents/theme";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useWindowSize } from "common/hooks/useWindowSize";
import { mediaSizes } from "common/constants/Profile/mediaSizes";
import Image from "next/image";
import Russia from "public/img/icons/Flag-Russia.svg";

// Компонента выбора языка (русский и английский)
export const SelectLanguage = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { i18n } = useTranslation();

  const { width } = useWindowSize(); // хук для измерения размера экрана
  /*  ____________<переменные для мобильной версии>______________*/

  const flagSize = width ? (width < mediaSizes.mobileScreenSize ? 24 : 20) : 20;

  /*  ____________</переменные для мобильной версии>_______________*/

  // Обработчик селектора языка, который перенаправляет на тот же url,
  // с теми же query параметрами, но со сменой языка

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.target.value })
  }

  return (
    <StyledSelectLanguage value={i18n.language == "ru" ? "ru" : "en"} onChange={handleLangChange}>
      <option value="en">&#127468;&#127463; English</option>
      <option value="ru">&#127479;&#127482; Русский</option>
    </StyledSelectLanguage>
  );
};

// Стили

const SelectLangBlock = styled.div`
  width: 163px;
  height: 36px;
  flex-shrink: 0;
  top: 12px;
  margin-left: 3.7%;

  color: ${baseTheme.colors.light[100]};
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  font-family: Inter;
  line-height: 24px;
  border: solid 1px ${baseTheme.colors.dark[100]};
`;

const StyledSelectLanguage = styled.select`
  width: 163px;
  height: 36px;
  margin-left: 3.7%;

  background: ${baseTheme.colors.dark[700]};
  outline: none;
  background: ${baseTheme.colors.dark[700]};
  outline: none;

  color: ${baseTheme.colors.light[100]};
  color: ${baseTheme.colors.light[100]};

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-family: Inter;
`
