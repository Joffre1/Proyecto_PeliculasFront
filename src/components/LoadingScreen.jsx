import { Box, CircularProgress, Typography } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';

export default function LoadingScreen() {
  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center', 
      height: '100vh', 
      bgcolor: '#050A18' 
    }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
        
       
        <CircularProgress 
          size={100} 
          thickness={2} 
          sx={{ color: '#FFD700' }} 
        />

        
        <Box sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MovieIcon sx={{ 
            fontSize: 40, 
            color: '#FFD700',
            animation: "pulse 1.5s ease-in-out infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)", opacity: 1 },
              "50%": { transform: "scale(1.2)", opacity: 0.7 },
              "100%": { transform: "scale(1)", opacity: 1 }
            }
          }} />
        </Box>
      </Box>

      <Typography variant="h6" sx={{ color: '#FFD700', letterSpacing: 4, fontWeight: 'bold' }}>
        VIAJANDO A LAS ESTRELLAS...
      </Typography>
    </Box>
  );
}