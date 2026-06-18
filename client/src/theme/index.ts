import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7c4dff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "input:-webkit-autofill": {
          WebkitBoxShadow: "0 0 0 1000px transparent inset",
          WebkitTextFillColor: "inherit",
          transition: "background-color 5000s ease-in-out 0s",
        },
      },
    },
  },
});

export default theme;
