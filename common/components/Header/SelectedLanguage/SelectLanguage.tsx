import { baseTheme } from "../../../../styles/styledComponents/theme";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// Компонента выбора языка (русский и английский)
export const SelectLanguage = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const { i18n } = useTranslation();

  // Обработчик селектора языка, который перенаправляет на тот же url,
  // с теми же query параметрами, но со сменой языка

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push({ pathname, query }, asPath, { locale: e.target.value });
  };

  return (
    <StyledSelectLanguage value={i18n.language == "ru" ? "ru" : "en"} onChange={handleLangChange}>
      <option value="en">&#127468;&#127463; English</option>
      <option value="ru">&#127479;&#127482; Русский</option>
    </StyledSelectLanguage>
  );
};

// Стили
const StyledSelectLanguage = styled.select`
  width: 163px;
  height: 36px;
  margin-left: 3.7%;

  background: ${baseTheme.colors.dark[700]};
  outline: none;

  color: ${baseTheme.colors.light[100]};

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-family: Inter;
`;
