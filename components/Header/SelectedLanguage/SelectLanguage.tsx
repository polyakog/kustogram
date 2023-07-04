import {baseTheme} from "../../../styles/styledComponents/theme";
import styled from "styled-components";
import { useRouter } from "next/router";

// Компонента выбора языка (русский и английский)
export const SelectLanguage = () => {
  const router = useRouter()
  const { pathname, asPath, query } = router

  // Обработчик селектора языка, который перенаправляет на тот же url, 
  // с теми же query параметрами, но со сменой языка

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.target.value }) 
  }

  return (
    <StyledSelectLanguage onChange={handleLangChange}>
      <option value="ru">&#127479;&#127482; Русский</option>
      <option value="en">&#127468;&#127463; English</option>
    </StyledSelectLanguage>
  );
};

// Стили
const StyledSelectLanguage = styled.select
  `
    width: 163px;
    height: 36px;
    margin-left: 3.7%;

    background: ${baseTheme.colors.dark[700]};
    outline: none;

    color: white;
  `
