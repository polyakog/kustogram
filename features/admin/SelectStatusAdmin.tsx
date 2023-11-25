import { ChangeEvent } from 'react'

import { OptionAdmin, SelectAdmin } from './Admin.styled'

type Select = {
  handleSelect: (event: ChangeEvent<HTMLSelectElement>) => void
  initialValue: string
  options: string[]
  selected: string
  sortByStatus?: (status: string) => void
}

export const SelectStatusAdmin = ({
  options,
  initialValue,
  handleSelect,
  selected,
  sortByStatus,
}: Select) => {
  const handleClick = () => {
    if (sortByStatus) {
      sortByStatus(selected)
    }
  }

  return (
    <SelectAdmin
      defaultValue={selected}
      onChange={event => handleSelect(event)}
      onClick={handleClick}
    >
      <OptionAdmin hidden selected>
        {initialValue}
      </OptionAdmin>
      {options.map(option => (
        <OptionAdmin key={option} value={option}>
          {option}
        </OptionAdmin>
      ))}
    </SelectAdmin>
  )
}
