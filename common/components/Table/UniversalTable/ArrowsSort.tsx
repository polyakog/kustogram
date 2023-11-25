import down from '../../../../public/img/icons/sort_down.svg'
import downW from '../../../../public/img/icons/sort_down_w.svg'
import up from '../../../../public/img/icons/sort_up.svg'
import upW from '../../../../public/img/icons/sort_up_w.svg'
import { SelectSortDirection } from './UniversalTable.styled'

type ArrowsSortPropsType = {
  sortDirection: boolean | undefined
}
export const ArrowsSort = ({ sortDirection }: ArrowsSortPropsType) => {
  return sortDirection === undefined ? (
    <>
      <SelectSortDirection alt="arrow" src={up} />
      <SelectSortDirection alt="arrow" src={down} />
    </>
  ) : (
    <SelectSortDirection alt="arrow" src={sortDirection ? upW : downW} />
  )
}
