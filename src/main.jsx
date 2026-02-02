import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "./Context/SnackbarContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E50914' },
    background: {
      default: '#141414',
      paper: '#1f1f1f',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);