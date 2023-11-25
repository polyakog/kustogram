import { FC, useState } from 'react'

import PageSizeSelector from 'features/settings/PageSizeSelector'
import { TFunction } from 'i18next'
import Image from 'next/image'
import { styled } from 'styled-components'
import { baseTheme } from 'styles/styledComponents/theme'

import next from '../../public/img/icons/nextOut.svg'
import prev from '../../public/img/icons/prevOut.svg'

/*
    Компонента для отрисовки пагинации типа: < 1 2 3 4 5 ... 332 > 
    с возможностью изменения количества элементов, отображаемых на странице
*/

const PagesNavigation: FC<PropsType> = ({
  pagesCount, // общее количество страниц
  pageNumber, // текущая страница
  pageSize, // количество элементов, отображаемых на странице
  onPageChange, // функция, выполняемая при изменении страницы
  onPageSizeChange, // функция выполняемая при изменении количества элементов, отображаемых на странице
  t,
}) => {
  const visiblePageNumber = 5
  const pages: Array<number> = []

  const [isFirst, setIsFirst] = useState(true) // определение, является ли отображаемый блок страниц первым
  const [isLast, setIsLast] = useState(false) // определение, является ли отображаемый блок страниц последним
  const [firstPageInLine, setFirstPageInLine] = useState(1) // первый номер страницы в блоке

  if (pagesCount <= visiblePageNumber + 1 && !isLast) {
    setIsLast(true)
  }
  // создание массива номеров, отображаемых в данном блоке
  for (
    let i = firstPageInLine;
    i < pagesCount && i <= firstPageInLine + visiblePageNumber - 1;
    i++
  ) {
    pages.push(i)
  }

  // обработчик нажатия стрелки вправо
  const onPageNext = (firstPage: number) => {
    setIsFirst(false)
    if (firstPage + visiblePageNumber >= pagesCount) {
      setIsLast(true)
    }
    if (firstPage < pagesCount) {
      setFirstPageInLine(firstPage)
    }
  }

  // обработчик нажатия стрелки влево
  const onPagePrev = (firstPage: number) => {
    setIsLast(false)
    setFirstPageInLine(firstPage)
    if (firstPage === 1) {
      setIsFirst(true)
    }
  }

  return (
    <StyledPagination>
      <StyledArrow
        alt="prev"
        ishidden={isFirst.toString()}
        src={prev}
        style={{ height: 16, width: 16 }}
        onClick={() => {
          onPagePrev(firstPageInLine - visiblePageNumber + 1)
        }}
      />
      {pages.map(p => {
        return (
          <StyledPageNumber
            key={p}
            isactive={(p === pageNumber).toString()}
            onClick={() => {
              onPageChange(p)
            }}
          >
            {p}
          </StyledPageNumber>
        )
      })}
      {!isLast && <StyledText>...</StyledText>}
      <StyledPageNumber
        isactive={(pagesCount === pageNumber).toString()}
        onClick={() => {
          onPageChange(pagesCount)
        }}
      >
        {pagesCount}
      </StyledPageNumber>

      <StyledArrow
        alt="next"
        ishidden={isLast.toString()}
        src={next}
        style={{ height: 16, width: 16 }}
        onClick={() => {
          onPageNext(firstPageInLine + visiblePageNumber - 1)
        }}
      />
      <PageSizeSelector pageSize={pageSize} t={t} onPageSizeChange={onPageSizeChange} />
    </StyledPagination>
  )
}

export default PagesNavigation

// Types

type PropsType = {
  onPageChange: (pageNum: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageNumber: number
  pageSize: number
  pagesCount: number
  t: TFunction
}

type DivPropsType = {
  isactive: string
}

type ImagePropsType = {
  ishidden: string
}

// Style
const StyledPageNumber = styled.div<DivPropsType>`
  width: 22px;
  height: 22px;

  margin: 6px;
  border: 1px solid ${baseTheme.colors.light['100']};

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${baseTheme.colors.light['100']};

  background: ${props => (props.isactive === 'true' ? baseTheme.colors.light['100'] : '')};
  color: ${props =>
    props.isactive === 'true' ? baseTheme.colors.dark['900'] : baseTheme.colors.light['100']};
`
const StyledPagination = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
`
// position: absolute;   для StyledPagination работает криво.
// bottom: 50px;

export const StyledText = styled.div`
  margin: 6px;
`
const StyledArrow = styled(Image)<ImagePropsType>`
  cursor: pointer;
  margin: auto 0px;
  z-index: 10;
  visibility: ${props => (props.ishidden === 'true' ? 'hidden' : '')};
`
