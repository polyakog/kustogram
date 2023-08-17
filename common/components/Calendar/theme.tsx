import { baseTheme } from "styles/styledComponents/theme";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: baseTheme.colors.accent[700]
    },
    text: {
      primary: baseTheme.colors.light[100]
    },
    action: {
      disabled: baseTheme.colors.dark[100]
      // hover: baseTheme.colors.dark[100],
    }
  },
  components: {
    MuiDateCalendar: {
      // стили для поля с календарем
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.colors.dark[500]
        }
      }
    },
    MuiPickersDay: {
      // стили для дней в каледндаре
      styleOverrides: {
        root: {
          ":hover": {
            backgroundColor: baseTheme.colors.accent[700]
          },
          "&.Mui-disabled:not(.Mui-selected)": {
            color: baseTheme.colors.dark[100]
          },
          ":not(.Mui-selected)": {
            borderColor: baseTheme.colors.accent[700]
          },
          "&.Mui-selected": {
            backgroundColor: "transparent",
            color: baseTheme.colors.accent[700]
          }
        }
      }
    },
    MuiIconButton: {
      // стили для кнопок с иконками
      styleOverrides: {
        root: {
          color: baseTheme.colors.light[100]
        }
      }
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekDayLabel: {
          // стили для дней недели
          color: baseTheme.colors.dark[100]
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            // стили для кнопок, которые не активны
            color: baseTheme.colors.dark[100]
          }
        }
      }
    },
    MuiPickersArrowSwitcher: {
      // стили для стрелок переключения месяцев
      styleOverrides: {
        button: {
          backgroundColor: baseTheme.colors.dark[100]
        }
      }
    },
    MuiTextField: {
      // стили для поля отображения даты
      defaultProps: {
        size: "small"
      },
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: baseTheme.colors.dark[100],
          borderRadius: "2px",
          backgroundColor: baseTheme.colors.dark[500]
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // стили для поля отображения даты при активации календаря (hover, selected, focused...)
        notchedOutline: {
          border: "none"
        },
        input: {
          paddingLeft: "8px",
          fontSize: "16px"
        }
      }
    }
  }
});
