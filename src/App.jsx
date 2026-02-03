import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Directores from "./pages/Directores"; // Nueva importación
import DirectorForm from "./components/DirectorForm";
import MovieForm from "./components/MovieForm";
import Movies from "./pages/Movies";
import ConfirmDialog from "./components/ConfirmDialog";
import { deleteDirector, deleteMovie } from "./services/api";
import { useSnackbar } from "./Context/SnackbarContext";
import api from "./api/axiosConfig";
import MovieIcon from '@mui/icons-material/Movie';
import {
  Container, Typography, Button, AppBar, Toolbar, Box, Dialog,
  createTheme, ThemeProvider, CssBaseline, GlobalStyles, CircularProgress
} from "@mui/material";

const StarryBackground = () => (
  <GlobalStyles styles={{
    "@keyframes move-twinkle": { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "-10000px 5000px" } },
    ".stars-container": {
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      width: "100%", height: "100%",
      background: "#050A18 url(https://www.transparenttextures.com/patterns/stardust.png) repeat top center",
      zIndex: -1, animation: "move-twinkle 200s linear infinite"
    }
  }} />
);

const starryTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FFD700' },
    secondary: { main: '#B388FF' },
    background: { default: '#050A18', paper: '#0D1428' },
  }
});

const LoadingScreen = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', bgcolor: '#050A18' }}>
    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
      <CircularProgress size={100} thickness={2} sx={{ color: '#FFD700' }} />
      <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MovieIcon sx={{ 
          fontSize: 40, color: '#FFD700', animation: "pulse 1.5s ease-in-out infinite",
          "@keyframes pulse": { "0%": { transform: "scale(1)", opacity: 1 }, "50%": { transform: "scale(1.2)", opacity: 0.7 }, "100%": { transform: "scale(1)", opacity: 1 } }
        }} />
      </Box>
    </Box>
    <Typography variant="h6" sx={{ color: '#FFD700', letterSpacing: 5, fontWeight: 'bold' }}>VIAJANDO A LAS ESTRELLAS...</Typography>
  </Box>
);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [directores, setDirectores] = useState([]);
  const [directorSeleccionado, setDirectorSeleccionado] = useState(null);
  const [movieSeleccionada, setMovieSeleccionada] = useState(null);
  const [tabActual, setTabActual] = useState("directores");
  const [openDialog, setOpenDialog] = useState(false);
  const [accionEliminar, setAccionEliminar] = useState(null);
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [openDirectorModal, setOpenDirectorModal] = useState(false);
  const [openMovieModal, setOpenMovieModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const cargarDirectores = async () => {
    setLoading(true);
    try {
      const response = await api.get("directores/");
      setDirectores(response.data);
    } catch (error) { console.error(error); }
    finally { setTimeout(() => setLoading(false), 800); }
  };

  useEffect(() => { cargarDirectores(); }, []);

  const confirmarEliminarDirector = (id) => {
    setAccionEliminar(() => async () => {
      await deleteDirector(id);
      showSnackbar("Director eliminado de la galaxia");
      cargarDirectores();
      setOpenDialog(false);
    });
    setOpenDialog(true);
  };

  const confirmarEliminarMovie = (id) => {
    setAccionEliminar(() => async () => {
      await deleteMovie(id);
      showSnackbar("Película eliminada");
      cargarDirectores();
      setOpenDialog(false);
    });
    setOpenDialog(true);
  };

  if (loading) return <LoadingScreen />;

  return (
    <ThemeProvider theme={starryTheme}>
      <CssBaseline />
      <StarryBackground />
      <div className="stars-container" />

      <Box sx={{ flexGrow: 1, minHeight: '100vh', pb: 6 }}>
        <AppBar position="sticky" elevation={0} sx={{ background: 'rgba(5, 10, 24, 0.8)', backdropFilter: 'blur(20px)' }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'primary.main', letterSpacing: 4 }}>✨ CINE MUNDO</Typography>
            <Box sx={{ mr: 2 }}>
              <Button onClick={() => setTabActual("directores")} sx={{ color: tabActual === "directores" ? 'primary.main' : 'white' }}>Directores</Button>
              <Button onClick={() => setTabActual("peliculas")} sx={{ color: tabActual === "peliculas" ? 'primary.main' : 'white' }}>Películas</Button>
            </Box>
            {token ? (
              <Button color="error" variant="contained" onClick={() => { localStorage.removeItem("token"); setToken(null); }}>Cerrar Sesión</Button>
            ) : (
              <Button color="primary" variant="contained" onClick={() => setOpenLoginModal(true)}>Iniciar Sesión</Button>
            )}
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 6 }}>
          {tabActual === "directores" ? (
            <Directores 
              directores={directores}
              token={token}
              onEdit={(d) => { setDirectorSeleccionado(d); setOpenDirectorModal(true); }}
              onDelete={confirmarEliminarDirector}
              onAdd={() => setOpenDirectorModal(true)}
            />
          ) : (
            <Movies
              directores={directores}
              token={token}
              onEdit={(m) => { setMovieSeleccionada(m); setOpenMovieModal(true); }}
              onDelete={confirmarEliminarMovie}
              onAdd={() => setOpenMovieModal(true)}
              recargar={cargarDirectores}
            />
          )}
        </Container>
      </Box>

      <Dialog open={openLoginModal} onClose={() => setOpenLoginModal(false)}><Login setToken={(t) => { setToken(t); setOpenLoginModal(false); }} /></Dialog>
      <Dialog open={openDirectorModal} onClose={() => { setOpenDirectorModal(false); setDirectorSeleccionado(null); }} fullWidth maxWidth="sm">
        <Box sx={{ p: 3, bgcolor: 'background.paper' }}><DirectorForm directorSeleccionado={directorSeleccionado} limpiarSeleccion={() => { setOpenDirectorModal(false); setDirectorSeleccionado(null); }} recargar={cargarDirectores} /></Box>
      </Dialog>
      <Dialog open={openMovieModal} onClose={() => { setOpenMovieModal(false); setMovieSeleccionada(null); }} fullWidth maxWidth="md">
        <Box sx={{ p: 3, bgcolor: 'background.paper' }}><MovieForm movieSeleccionada={movieSeleccionada} limpiarMovie={() => { setOpenMovieModal(false); setMovieSeleccionada(null); }} directores={directores} recargar={cargarDirectores} /></Box>
      </Dialog>
      <ConfirmDialog open={openDialog} title="SISTEMA" message="¿Deseas eliminar este registro?" onClose={() => setOpenDialog(false)} onConfirm={accionEliminar} />
    </ThemeProvider>
  );
}

export default App;