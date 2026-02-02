import { useState } from "react";
import { Grid, Typography, Card, CardContent, CardMedia, Button, Box, Dialog, Divider, Rating } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import api from "../api/axiosConfig";

const Movies = ({ directores, token, onEdit, onDelete, onAdd, recargar }) => {
  const [openDetalleModal, setOpenDetalleModal] = useState(false);
  const [movieDetalle, setMovieDetalle] = useState(null);
  const todasLasPeliculas = directores.flatMap(d => d.movies || []);


  const handleRatingChange = async (movieId, newValue) => {
    try {
      await api.patch(`peliculas/${movieId}/`, { rating: newValue });
      recargar();
    } catch (error) {
      console.error("Error al calificar:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold', color: 'primary.main', textShadow: '0 0 15px #FFD700' }}>🎬 CARTELERA COMPLETA</Typography>

      {token && (
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Button variant="contained" size="large" onClick={onAdd} sx={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}>+ AÑADIR PELÍCULA</Button>
        </Box>
      )}

      <Grid container spacing={4}>
        {todasLasPeliculas.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card sx={{ height: '100%' }}>
              {movie.picture && <CardMedia component="img" height="400" image={`http://127.0.0.1:8000/media/${movie.picture}`} />}
              <CardContent sx={{ textAlign: 'center', bgcolor: 'rgba(13, 20, 40, 0.95)' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{movie.title}</Typography>


                <Box sx={{ my: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <Rating
                    name={`rating-${movie.id}`}
                    value={movie.rating || 0}
                    precision={1}
                    readOnly={!token}
                    icon={<StarIcon sx={{ color: '#FFD700' }} fontSize="inherit" />}
                    emptyIcon={<StarIcon sx={{ color: 'rgba(255,215,0,0.2)' }} fontSize="inherit" />}
                    onChange={(event, newValue) => handleRatingChange(movie.id, newValue)}
                  />
                  <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    ({movie.rating || 0})
                  </Typography>
                </Box>

                <Typography variant="body2" color="secondary" sx={{ mb: 2 }}>{movie.year} | {movie.genre}</Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button variant="outlined" startIcon={<InfoIcon />} fullWidth onClick={() => { setMovieDetalle(movie); setOpenDetalleModal(true); }}>Ver Detalles</Button>

                  {token && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button
                        variant="contained" color="warning" fullWidth startIcon={<EditIcon />} onClick={() => onEdit(movie)}
                        sx={{ boxShadow: '0 0 10px #ff9800' }}
                      >Editar</Button>
                      <Button
                        variant="contained" color="error" fullWidth startIcon={<DeleteIcon />} onClick={() => onDelete(movie.id)}
                        sx={{ boxShadow: '0 0 10px #f44336' }}
                      >Borrar</Button>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Dialog open={openDetalleModal} onClose={() => setOpenDetalleModal(false)} fullWidth maxWidth="sm">
        {movieDetalle && (
          <Box sx={{ p: 4, bgcolor: 'background.paper' }}>
            <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>{movieDetalle.title}</Typography>
            <Divider sx={{ my: 2, opacity: 0.1 }} />
            <Typography><strong>⭐ Calificación:</strong> {movieDetalle.rating || 0} / 5</Typography>
            <Typography><strong>📅 Año:</strong> {movieDetalle.year}</Typography>
            <Typography><strong>🎭 Género:</strong> {movieDetalle.genre}</Typography>
            <Typography sx={{ mt: 2 }}><strong>📝 Sinopsis:</strong></Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{movieDetalle.synopsis}</Typography>
            <Button variant="contained" fullWidth onClick={() => setOpenDetalleModal(false)} sx={{ mt: 4 }}>Regresar</Button>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default Movies;