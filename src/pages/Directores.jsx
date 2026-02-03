import { 
  Box, Typography, Grid, Card, CardMedia, Button, Divider, Paper 
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Directores = ({ directores, token, onEdit, onDelete, onAdd }) => {
  return (
    <Box>
      <Typography variant="h3" sx={{ 
        textAlign: 'center', mb: 4, fontWeight: 'bold', 
        color: 'primary.main', textShadow: '0 0 15px #FFD700' 
      }}>
        🌟 LISTA DE DIRECTORES
      </Typography>

      {token && (
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Button 
            variant="contained" 
            size="large" 
            onClick={onAdd} 
            sx={{ boxShadow: '0 0 15px #FFD700' }}
          >
            + AÑADIR DIRECTOR
          </Button>
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
                <Typography variant="h3" sx={{ fontWeight: '900', color: 'primary.main', mb: 1 }}>
                  {director.name} {director.last_name}
                </Typography>
                <Typography variant="h6" sx={{ color: 'secondary.main', mb: 2 }}>
                  {director.age} AÑOS | {director.birth}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                  {director.biography}
                </Typography>

                {token && (
                  <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                    <Button
                      variant="contained" 
                      startIcon={<EditIcon />}
                      sx={{ bgcolor: '#ff9800', boxShadow: '0 0 10px #ff9800', '&:hover': { bgcolor: '#e68a00' } }}
                      onClick={() => onEdit(director)}
                    >
                      EDITAR PERFIL
                    </Button>
                    <Button
                      variant="contained" 
                      color="error" 
                      startIcon={<DeleteIcon />}
                      sx={{ boxShadow: '0 0 10px #f44336' }}
                      onClick={() => onDelete(director.id)}
                    >
                      BORRAR
                    </Button>
                  </Box>
                )}

                <Divider sx={{ my: 3, borderColor: 'rgba(255,215,0,0.2)' }} />
                <Typography variant="h6" sx={{ color: 'primary.main', mb: 2, fontSize: '1rem' }}>
                  FILMOGRAFÍA:
                </Typography>

                <Grid container spacing={2}>
                  {director.movies && director.movies.length > 0 ? (
                    director.movies.map((movie) => (
                      <Grid item xs={12} sm={6} key={movie.id}>
                        <Paper sx={{ 
                          display: 'flex', bgcolor: 'rgba(255,255,255,0.03)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          overflow: 'hidden', borderRadius: 2 
                        }}>
                          {movie.picture && (
                            <Box sx={{ width: 80, height: 100, flexShrink: 0 }}>
                              <img 
                                src={`http://127.0.0.1:8000/media/${movie.picture}`} 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              />
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
  );
};

export default Directores;