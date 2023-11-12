import { OptionAdmin, SelectAdmin } from './Admin.styled'

type Select = {
  initialValue: string
  options: string[]
}

export const SelectStatusAdmin = ({ options, initialValue }: Select) => {
  return (
    <SelectAdmin defaultValue="Not selected">
      <OptionAdmin hidden selected>
        {initialValue}
      </OptionAdmin>
      {options.map(option => (
        <OptionAdmin key={option}>{option}</OptionAdmin>
      ))}
    </SelectAdmin>
  )
}
