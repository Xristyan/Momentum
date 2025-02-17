"use client";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonOwnProps {
    rounded: true;
  }
}

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: "#7214FF",
          contrastText: "#fff",
        },
        AppBar: {
          darkBg: "#081028",
        },

        background: {
          default: "#081028",
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  typography: {
    htmlFontSize: 10,
    fontSize: 14,
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { rounded: true },
          style: {
            borderRadius: "3.6rem",
          },
        },
      ],
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1536,
      xxl: 1920,
    },
  },
});

export default theme;
