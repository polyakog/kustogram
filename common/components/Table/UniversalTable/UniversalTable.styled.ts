import { styled } from 'styled-components'
import Image from 'next/image'
import { baseTheme } from '../../../../styles/styledComponents/theme'

export const TableUniversal = styled.table`
  maxwidth: 1024px;
  width: 100%;
  border-collapse: collapse;
  padding: 0 24px;
`
export const TableUniversalHeading = styled.tr`
  background: #171717;
`
export const HeadingTextTableUniversal = styled.td`
  padding: 12px 0;
  font-weight: 600;
  margin: auto;
`
export const SortTableUniversal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const SelectSortDirection = styled(Image)`
  cursor: pointer;
`
export const TitleTableUniversal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & p {
    margin-right: 5px;
  }
`
export const TableUniversalRow = styled.tr`
  border: 1px solid #171717;
`
export const AvatarTableUniversal = styled(Image)`
  border-radius: 50%;
`
export const BlockNameTableUniversal = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 24px;
  max-width: 300px;
  white-space: nowrap; /* Запрещаем перенос строк */
  overflow: hidden; /* Обрезаем все, что не помещается в область */
  text-overflow: ellipsis; /* Добавляем многоточие */
`
export const TableUniversalCell = styled.td`
  text-align: center;
  min-width: 60px;
  height: 60px;
  padding: 12px 0;
  font-weight: 400;
`

export const CheckBoxPayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 25px;
`

export const CheckBoxPay = styled.input`
  accent-color: white;
  margin-right: 5px;
  width: 24px;
  height: 24px;

  &:hover {
    outline: 1px solid ${baseTheme.colors.dark[100]};
    transition: 0.1s ease-in-out;
  }

  &:active {
    width: 22px;
    height: 22px;
  }
`
export const CheckBoxTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
`
