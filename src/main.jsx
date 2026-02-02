import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SnackbarProvider } from "./Context/SnackbarContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

// Creamos un tema moderno estilo "Streaming"
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#E50914' }, // Rojo Cine/Netflix
    background: {
      default: '#141414', // Fondo casi negro
      paper: '#1f1f1f',   // Tarjetas un poco más claras
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Esto resetea los estilos y pone el fondo oscuro */}
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);