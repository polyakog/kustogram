import { createTheme } from '@mui/material/styles'
import { theme } from 'common/components/Calendar/theme'
import { baseTheme } from 'styles/styledComponents/theme'

export const themeError = createTheme({
  ...theme,
  components: {
    ...theme.components,
    MuiTextField: {
      ...theme.components?.MuiTextField,
      styleOverrides: {
        ...theme.components?.MuiTextField?.styleOverrides,
        root: {
          border: '1px solid',
          borderColor: baseTheme.colors.danger[500],
          borderRadius: '2px',
          backgroundColor: baseTheme.colors.dark[500],
        },
      },
    },
  },
})
