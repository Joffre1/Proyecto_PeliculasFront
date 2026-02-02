import { Box, CircularProgress, Typography } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';

export default function LoadingScreen() {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', bgcolor: '#141414'
    }}>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <MovieIcon sx={{
          fontSize: 80, color: '#E50914',
          animation: "spin 2s linear infinite",
          "@keyframes spin": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } }
        }} />
      </Box>
      <Typography variant="h6" sx={{ mt: 2, color: 'white', letterSpacing: 2 }}>
        CARGANDO CINE MUNDO...
      </Typography>
    </Box>
  );
}