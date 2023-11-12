import styled from 'styled-components'
import Image from 'next/image'
import { Cell, HeadingText } from '../../styles/styledComponents/payments/payments.styled'

export const WrapperAdmin = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const SearchBarAdmin = styled.div`
  position: relative;
  border: 1px solid #8d9094;
  width: 60%;
`
export const SearchAdmin = styled.input.attrs({
  placeholder: 'Search',
  id: 'search',
})`
  border: none;
  background: black;
  color: white;
  padding: 6px 0 6px 40px;
  width: 100%;
  z-index: 10;
`

export const SearchIconAdmin = styled(Image)`
  position: absolute;
  top: 6px;
  left: 10px;
`

export const SelectAdmin = styled.select`
  border: 1px solid #fff;
  background: #171717;
  color: white;
  padding: 2px 10px;
`
export const OptionAdmin = styled.option`
  color: white;
  background: #171717;
`

export const HeadingWithSortAdmin = styled(HeadingText)`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const SortAdmin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
export const SelectSortDirection = styled(Image)`
  cursor: pointer;
`

export const MenuCellAdmin = styled(Cell)`
  min-width: 30px;
  display: flex;
  justify-content: center;
`
export const EmptyBlockAdmin = styled.span`
  width: 24px;
  height: 24px;
  display: inline-block;
`

export const UserMenuAdmin = styled.div`
  position: relative;
  color: white;
`
export const MenuItemWrapperAdmin = styled.span`
  width: 178px;
  display: flex;
  padding: 0 12px;
  cursor: pointer;
`

export const MoreAdmin = styled(Image)`
  cursor: pointer;
`
export const BlockAdmin = styled(Image)`
  margin-bottom: -6px;
`

export const TextAdmin = styled.span`
  font-size: 14px;
  font-weight: 400;
  position: relative;
  left: 10px;
`

export const MenuItemsAdmin = styled.div`
  position: absolute;
  padding: 12px 10px 12px 0;
  right: 0;
  z-index: 10;
  background: #171717;
  border: 1px solid #4c4c4c;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const MenuIconAdmin = styled(Image)``
