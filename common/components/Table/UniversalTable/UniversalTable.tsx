import { useState } from 'react'
import { renderTableCell } from '../../../utils/renderTableCell'

import { ArrowsSort } from './ArrowsSort'
import {
  HeadingTextTableUniversal,
  SortTableUniversal,
  TableUniversal,
  TableUniversalHeading,
  TableUniversalRow,
  TitleTableUniversal,
} from './UniversalTable.styled'
import { FormatDataTablePropsType, TableHeaderType } from './types'

export const UniversalTable = ({
  formatTableData,
  selectedSort,
  tableHeadingData,
}: FormatDataTablePropsType) => {
  const [sortDirection, setSortDirection] = useState<boolean | undefined>()
  const [sortName, setSortName] = useState<string>()

  const handleClick = (name: TableHeaderType) => {
    selectedSort(name.back)
    setSortName(name.tableTitle)
    setSortDirection(sortDirection === undefined ? true : !sortDirection)
  }

  return (
    <TableUniversal>
      <TableUniversalHeading>
        {tableHeadingData.map(name => {
          return (
            <HeadingTextTableUniversal
              key={name.tableTitle}
              onClick={name.sort ? () => handleClick(name) : undefined}
            >
              <TitleTableUniversal>
                <p>{name.tableTitle}</p>
                {name.sort && (
                  <SortTableUniversal>
                    <ArrowsSort
                      sortDirection={sortName === name.tableTitle ? sortDirection : undefined}
                    />
                  </SortTableUniversal>
                )}
              </TitleTableUniversal>
            </HeadingTextTableUniversal>
          )
        })}
      </TableUniversalHeading>
      {formatTableData &&
        formatTableData.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TableUniversalRow key={index}>
            {tableHeadingData.map(name => renderTableCell(item, name))}
          </TableUniversalRow>
        ))}
    </TableUniversal>
  )
}
