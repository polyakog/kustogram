import { baseTheme } from "../../styles/styledComponents/theme";

export const useButtonColorType = () => {
  const handler = (theme: string) => {
    switch (theme) {
      case "primary":
        return {
          background: `${baseTheme.colors.accent[500]}`,
          color: `${baseTheme.colors.light[100]}`,
          "&:hover": {
            background: `${baseTheme.colors.accent[100]}`
          },
          "&:active": {
            background: `${baseTheme.colors.accent[700]}`,
            color: `${baseTheme.colors.light[500]}`
          },
          "&.disabled": {
            background: `${baseTheme.colors.accent[900]}`,
            color: `${baseTheme.colors.light[900]}`
          }
        };
      case "secondary":
        return {
          background: `${baseTheme.colors.dark[300]}`,
          color: `${baseTheme.colors.light[100]}`,
          "&:hover": {
            background: `${baseTheme.colors.dark[100]}`
          },
          " &:active ": {
            background: "#212121"
          },
          "&.disabled ": {
            background: `${baseTheme.colors.dark[100]}`,
            color: "#8D9094"
          }
        };
      case "outlined":
        return {
          color: `${baseTheme.colors.accent[500]}`,
          border: `1px solid ${baseTheme.colors.accent[500]}`,
          background: "none",
          "&:hover": {
            color: `${baseTheme.colors.accent[100]}`,
            border: `1px solid ${baseTheme.colors.accent[100]}`
          },
          "&:active": {
            color: `${baseTheme.colors.accent[700]}`,
            border: `1px solid ${baseTheme.colors.accent[700]}`
          },
          "&.disabled": {
            color: `${baseTheme.colors.accent[900]}`,
            border: `1px solid ${baseTheme.colors.accent[900]}`
          }
        };
      case "clear":
        return {
          "max-width": "100px",
          "max-height": "36px",
          color: `${baseTheme.colors.accent[500]}`,
          padding: "0",
          border: "none",
          background: "none",
          outline: "none",
          "&:hover": {
            color: `${baseTheme.colors.accent[100]}`
          },
          "&:active": {
            color: `${baseTheme.colors.accent[700]}`
          },
          "&.disabled": {
            color: `${baseTheme.colors.accent[900]}`
          }
        };
      default:
        return {
          background: `${baseTheme.colors.accent[500]}`,
          color: `${baseTheme.colors.light[100]}`
        };
    }
  };

  return { handler };
};
