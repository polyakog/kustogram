import { FC } from 'react'

import { ThemeProvider } from '@emotion/react'
import { FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { TFunction } from 'i18next'

import { StyledText } from './Pagination'
import { theme } from './themeSelect'

/*
    Компонента выбора количества элементов, отображемых на странице
*/

type PropsType = {
  onPageSizeChange: (pageSize: number) => void
  pageSize: number
  t: TFunction
}

const PageSizeSelector: FC<PropsType> = ({ pageSize, onPageSizeChange, t }) => {
  // обработчик изменения количества элементов на странице
  const handleChange = (event: SelectChangeEvent) => {
    onPageSizeChange(Number(event.target.value))
  }

  return (
    <>
      <StyledText>{t('show')}</StyledText>
      <ThemeProvider theme={theme}>
        <FormControl size="small" sx={{ m: 1 }}>
          <Select id="pageSize" value={pageSize.toString()} onChange={handleChange}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
      <StyledText>{t('on_page')}</StyledText>
    </>
  )
}

export default PageSizeSelector
