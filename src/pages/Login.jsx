import { useState } from "react";
import { login } from "../services/authService";
import { Box, TextField, Button, Typography, InputAdornment } from "@mui/material";
import { Lock, Person } from "@mui/icons-material";

export default function Login({ setToken }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    try {
      const data = await login(username, password);


      const token = data.access_token || data.access;

      if (token) {
        localStorage.setItem("token", token);
        setToken(token);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Credenciales incorrectas o error de servidor");
    }
  };

  return (
    <Box sx={{ p: 4, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        ACCESO ADMINISTRATIVO
      </Typography>

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Usuario"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          size="large"
          sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
        >
          INGRESAR
        </Button>
      </form>
    </Box>
  );
}