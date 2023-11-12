import { OptionAdmin, SelectAdmin } from './Admin.styled'

export const SelectStatusAdmin = () => {
  return (
    <SelectAdmin defaultValue="Not selected">
      <OptionAdmin hidden selected>
        Not selected
      </OptionAdmin>
      <OptionAdmin>Blocked</OptionAdmin>
      <OptionAdmin>Not Blocked</OptionAdmin>
    </SelectAdmin>
  )
}
