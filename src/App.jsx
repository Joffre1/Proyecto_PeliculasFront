import { useEffect, useState } from "react";
import Login from "./pages/Login";
import DirectorForm from "./components/DirectorForm";
import MovieForm from "./components/MovieForm";
import Movies from "./pages/Movies";
import ConfirmDialog from "./components/ConfirmDialog";
import { deleteDirector, deleteMovie } from "./services/api";
import { useSnackbar } from "./Context/SnackbarContext";
import api from "./api/axiosConfig";
import MovieIcon from '@mui/icons-material/Movie';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container, Typography, Card, CardContent, CardMedia,
  Button, Grid, AppBar, Toolbar, Box, Paper, Divider, Dialog,
  createTheme, ThemeProvider, CssBaseline, GlobalStyles
} from "@mui/material";

const StarryBackground = () => (
  <GlobalStyles styles={{
    "@keyframes move-twinkle": { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "-10000px 5000px" } },
    "@keyframes spin": { from: { transform: "rotate(0deg)" }, to: { transform: "rotate(360deg)" } },
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
    <MovieIcon sx={{ fontSize: 100, color: '#FFD700', animation: "spin 2s linear infinite" }} />
    <Typography variant="h6" sx={{ mt: 2, color: '#FFD700', letterSpacing: 5 }}>VIAJANDO A LAS ESTRELLAS...</Typography>
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
              <Button color="error" variant="contained" onClick={() => { localStorage.removeItem("token"); setToken(null); }}>Cerrar Seción</Button>
            ) : (
              <Button color="primary" variant="contained" onClick={() => setOpenLoginModal(true)}>Iniciar Sesión</Button>
            )}
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 6 }}>
          {tabActual === "directores" ? (
            <Box>
              <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'primary.main', textShadow: '0 0 15px #FFD700' }}>
                🌟 LISTA DE DIRECTORES
              </Typography>

              {token && (
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                  <Button variant="contained" size="large" onClick={() => setOpenDirectorModal(true)} sx={{ boxShadow: '0 0 15px #FFD700' }}>+ AÑADIR DIRECTOR</Button>
                </Box>
              )}

              <Grid container spacing={5}>
                {directores.map((director) => (
                  <Grid item xs={12} key={director.id}>
                    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                      {director.picture && (
                        <CardMedia
                          component="img"
                          sx={{ width: { xs: '100%', md: 450 }, height: { xs: 400, md: 'auto' }, objectFit: 'cover' }}
                          image={`http://127.0.0.1:8000/media/${director.picture}`}
                        />
                      )}
                      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 4 }}>
                        <Typography variant="h3" sx={{ fontWeight: '900', color: 'primary.main', mb: 1 }}>{director.name} {director.last_name}</Typography>
                        <Typography variant="h6" sx={{ color: 'secondary.main', mb: 2 }}>{director.age} AÑOS | {director.birth}</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>{director.biography}</Typography>

                        {token && (
                          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                            <Button
                              variant="contained" startIcon={<EditIcon />}
                              sx={{ bgcolor: '#ff9800', boxShadow: '0 0 10px #ff9800', '&:hover': { bgcolor: '#e68a00' } }}
                              onClick={() => { setDirectorSeleccionado(director); setOpenDirectorModal(true); }}
                            >EDITAR PERFIL</Button>
                            <Button
                              variant="contained" color="error" startIcon={<DeleteIcon />}
                              sx={{ boxShadow: '0 0 10px #f44336' }}
                              onClick={() => confirmarEliminarDirector(director.id)}
                            >BORRAR</Button>
                          </Box>
                        )}

                        <Divider sx={{ my: 3, borderColor: 'rgba(255,215,0,0.2)' }} />
                        <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontSize: '1rem' }}>FILMOGRAFÍA:</Typography>

                        <Grid container spacing={2}>
                          {director.movies && director.movies.length > 0 ? (
                            director.movies.map((movie) => (
                              <Grid item xs={12} sm={6} key={movie.id}>
                                <Paper sx={{ display: 'flex', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', borderRadius: 2 }}>
                                  {movie.picture && (
                                    <Box sx={{ width: 80, height: 100, flexShrink: 0 }}>
                                      <img src={`http://127.0.0.1:8000/media/${movie.picture}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </Box>
                                  )}
                                  <Box sx={{ p: 2 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{movie.title}</Typography>
                                    <Typography variant="caption" sx={{ color: 'primary.main' }}>{movie.year}</Typography>
                                  </Box>
                                </Paper>
                              </Grid>
                            ))
                          ) : (
                            <Grid item xs={12}>
                              <Box sx={{ p: 2, textAlign: 'center', border: '1px dashed rgba(255,215,0,0.3)', borderRadius: 2 }}>
                                <Typography variant="body2" sx={{ color: 'primary.main', fontStyle: 'italic' }}>
                                  ✨ Este director aún no ha registrado obras.
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Movies
              directores={directores}
              token={token}
              onEdit={(m) => { setMovieSeleccionada(m); setOpenMovieModal(true); }}
              onDelete={(id) => confirmarEliminarMovie(id)}
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