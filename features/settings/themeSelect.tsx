import { createTheme } from '@mui/material/styles'
import { baseTheme } from 'styles/styledComponents/theme'

export const theme = createTheme({
  palette: {
    primary: {
      main: baseTheme.colors.accent[700],
    },
    text: {
      primary: baseTheme.colors.light[100],
    },
  },
  components: {
    MuiFormControl: {
      // стили для контейнера
      styleOverrides: {
        root: {
          border: '1px solid',
          borderColor: baseTheme.colors.dark['300'],
          backgroundColor: baseTheme.colors.dark[500],

          borderRadius: '2px',
          width: '60px',
          minWidth: '55px',
          height: '24px',
          margin: '6px',
        },
      },
    },
    MuiSelect: {
      // стили для поля отображения выбранного значения
      styleOverrides: {
        select: {
          padding: '0px',
          paddingLeft: '8px',
          paddingTop: '2px',
          color: baseTheme.colors.light['100'],
        },
        icon: {
          fill: baseTheme.colors.light['100'],
          left: '35px',
        },
      },
    },
    MuiMenu: {
      // стили для выпадающего меню
      styleOverrides: {
        paper: {
          backgroundColor: baseTheme.colors.dark[300],
        },
      },
    },

    MuiOutlinedInput: {
      // стили для мистической рамки
      styleOverrides: {
        notchedOutline: {
          border: '0px',
        },
      },
    },
  },
})
