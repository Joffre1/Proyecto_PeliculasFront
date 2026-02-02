import { useState, useEffect } from "react";
import { createMovie, updateMovie } from "../services/api";
import { convertirBase64 } from "../utils/base64";
import { useSnackbar } from "../Context/SnackbarContext";
import { 
  TextField, Button, Typography, Box, 
  MenuItem, InputAdornment, Avatar, Rating, Paper 
} from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

function MovieForm({ movieSeleccionada, limpiarMovie, directores, recargar }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [year, setYear] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState(0);
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (movieSeleccionada) {
      setTitle(movieSeleccionada.title || "");
      setGenre(movieSeleccionada.genre || "");
      setDuration(movieSeleccionada.duration || "");
      setYear(movieSeleccionada.year || "");
      setSynopsis(movieSeleccionada.synopsis || "");
      setDirector(movieSeleccionada.director || "");
      setRating(movieSeleccionada.rating || 0);
      if (movieSeleccionada.picture) {
        setPreview(`http://127.0.0.1:8000/media/${movieSeleccionada.picture}`);
      }
    }
  }, [movieSeleccionada]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertirBase64(file);
    setPicture(base64);
    setPreview(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, genre, duration: parseInt(duration), year: parseInt(year), synopsis, director, rating: parseInt(rating) };
    if (picture) data.picture = picture;
    try {
      if (movieSeleccionada) {
        await updateMovie(movieSeleccionada.id, data);
        showSnackbar("Película actualizada", "success");
      } else {
        await createMovie(data);
        showSnackbar("Película guardada", "success");
      }
      limpiarFormulario();
      recargar();
    } catch (error) { showSnackbar("Error al guardar", "error"); }
  };

  const limpiarFormulario = () => {
    setTitle(""); setGenre(""); setDuration(""); setYear("");
    setSynopsis(""); setDirector(""); setPicture(""); setPreview(null);
    setRating(0); limpiarMovie();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main', textAlign: 'center', letterSpacing: 2 }}>
        {movieSeleccionada ? "EDITAR PELÍCULA" : "REGISTRAR PELÍCULA"}
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        gap: 4, 
        alignItems: 'stretch' // Obliga a ambas columnas a tener la misma altura
      }}>
        
        {/* COLUMNA IZQUIERDA: PÓSTER */}
        <Box sx={{ width: { xs: '100%', md: '350px' }, flexShrink: 0 }}>
          <Paper variant="outlined" sx={{ 
            p: 3, 
            textAlign: 'center', 
            bgcolor: 'rgba(255,255,255,0.02)', 
            border: '1px dashed #FFD700',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>PÓSTER</Typography>
              <Avatar src={preview} variant="rounded" sx={{ width: '100%', height: 420, mb: 2, border: '1px solid #FFD700', boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)' }}>
                <MovieIcon sx={{ fontSize: 80 }} />
              </Avatar>
            </Box>
            
            <Box>
              <Button variant="contained" component="label" fullWidth startIcon={<PhotoCamera />} sx={{ mb: 2, fontWeight: 'bold' }}>
                SUBIR PÓSTER
                <input type="file" hidden accept="image/*" onChange={handleImage} />
              </Button>
              <Typography variant="caption" sx={{ color: 'primary.main', display: 'block', mb: 1 }}>VALORACIÓN</Typography>
              <Rating value={rating} size="large" onChange={(e, v) => setRating(v)} />
            </Box>
          </Paper>
        </Box>

        {/* COLUMNA DERECHA: CAMPOS (OCUPA TODO EL RESTO) */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          
          <TextField 
            fullWidth label="Título de la Obra" required 
            value={title} onChange={e => setTitle(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><MovieIcon color="primary"/></InputAdornment> }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              fullWidth label="Género" required 
              value={genre} onChange={e => setGenre(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><TheaterComedyIcon color="primary"/></InputAdornment> }}
            />
            <TextField 
              select fullWidth label="Director a cargo" required 
              value={director} onChange={e => setDirector(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon color="primary"/></InputAdornment> }}
            >
              {directores.map(d => <MenuItem key={d.id} value={d.id}>{d.name} {d.last_name}</MenuItem>)}
            </TextField>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField 
              fullWidth label="Duración" type="number" required 
              value={duration} onChange={e => setDuration(e.target.value)}
              InputProps={{ 
                startAdornment: <InputAdornment position="start"><AccessTimeIcon color="primary"/></InputAdornment>,
                endAdornment: <InputAdornment position="end">min</InputAdornment>
              }}
            />
            <TextField 
              fullWidth label="Año de Lanzamiento" type="number" required 
              value={year} onChange={e => setYear(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><CalendarTodayIcon color="primary"/></InputAdornment> }}
            />
          </Box>

          {/* Sinopsis que se expande para llenar el hueco */}
          <TextField 
            fullWidth multiline rows={10} label="Sinopsis detallada" 
            value={synopsis} onChange={e => setSynopsis(e.target.value)} 
            sx={{ 
              flexGrow: 1,
              '& .MuiInputBase-root': { height: '100%', alignItems: 'flex-start' } 
            }}
          />

          {/* Botones alineados al fondo de la columna derecha */}
          <Box sx={{ 
  display: 'flex', 
  gap: 3,           // Espacio entre botones ligeramente reducido
  mt: 'auto', 
  pt: 2,            // Un pequeño respiro arriba de los botones
  justifyContent: 'center' // Los alinea a la derecha si no quieres que ocupen todo
}}>
  <Button 
    type="submit" 
    variant="contained" 
    size="medium"   // Cambiado de large a medium
    sx={{ 
      py: 1,        // Altura moderada (antes estaba en 2 o 0)
      px: 4,        // Espacio horizontal para que no se vean comprimidos
      fontWeight: 'bold', 
      fontSize: '0.9rem', // Texto un poco más pequeño
      boxShadow: '0 4px 10px rgba(255, 215, 0, 0.2)',
      minWidth: '150px'   // Asegura un tamaño mínimo decente
    }}
  >
    {movieSeleccionada ? "ACTUALIZAR" : "GUARDAR"}
  </Button>
  
  <Button 
    variant="outlined" 
    color="inherit" 
    size="medium" 
    onClick={limpiarFormulario}
    sx={{ 
      py: 1, 
      px: 4, 
      fontWeight: 'bold',
      fontSize: '0.9rem',
      minWidth: '150px'
    }}
  >
    CANCELAR
  </Button>
</Box>
        </Box>

      </Box>
    </Box>
  );
}

export default MovieForm;