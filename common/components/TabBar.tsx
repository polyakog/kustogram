import { TFunction } from 'i18next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

import { baseTheme } from '../../styles/styledComponents/theme'

/* Компонента для создания блока с вкладками.
   Пропсы: baseUrl - общий url для всех вкладок,
           titleList - объект с названиями вкладок (name) и соответсвующими url для редиректа (ref)
                     который добавляется к основному baseUrl
*/

type TabBarProps = {
  baseUrl: string
  t: TFunction
  titleList: {
    name: string
    ref: string
  }[]
}

export const TabBar = ({ baseUrl, titleList, t }: TabBarProps) => {
  const location = usePathname()
  const isActive = (name: string) => (location.includes(name) ? 'active' : '')

  return (
    <StyledNavigation>
      {titleList.map((item, index) => {
        if (index === 0) {
          return (
            <StyledItem
              key={item.name}
              active={location === baseUrl ? 'active' : ''}
              href={`${baseUrl}/${item.ref}`}
            >
              {t(item.name)}
            </StyledItem>
          )
        }

        return (
          <StyledItem key={item.name} active={isActive(item.ref)} href={`${baseUrl}/${item.ref}`}>
            {t(item.name)}
          </StyledItem>
        )
      })}
    </StyledNavigation>
  )
}

const StyledNavigation = styled.header`
  transition: all;
  width: 100%;
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledItem = styled(Link)<{ active: string }>`
  display: inline-block;
  width: 100%;
  max-width: 726px;

  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${props =>
    props.active === 'active' ? baseTheme.colors.accent[500] : baseTheme.colors.dark[100]};
  text-align: center;
  white-space: nowrap;
  text-decoration: none;

  padding: 5px 15px;
  border-bottom: ${props =>
    props.active === 'active'
      ? `2px solid ${baseTheme.colors.accent[500]}`
      : `2px solid ${baseTheme.colors.dark[100]}`};

  &:hover {
    color: ${baseTheme.colors.dark[300]};
    border-bottom: 2px solid ${baseTheme.colors.dark[300]};
  }
`
