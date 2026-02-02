import { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Box, InputAdornment, Avatar } from "@mui/material";
import { updateDirector, createDirector } from "../services/api"; // Asegúrate de que las rutas sean correctas
import { convertirBase64 } from "../utils/base64";
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

export default function DirectorForm({ directorSeleccionado, limpiarSeleccion, recargar }) {
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    age: "",
    birth: "",
    biography: "",
    picture: ""
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (directorSeleccionado) {
      setFormData({
        name: directorSeleccionado.name || "",
        last_name: directorSeleccionado.last_name || "",
        age: directorSeleccionado.age || "",
        birth: directorSeleccionado.birth || "",
        biography: directorSeleccionado.biography || "",
        picture: ""
      });
      if (directorSeleccionado.picture) {
        setPreview(`http://127.0.0.1:8000/media/${directorSeleccionado.picture}`);
      }
    } else {
      setPreview(null);
    }
  }, [directorSeleccionado]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertirBase64(file);
    setFormData({ ...formData, picture: base64 });
    setPreview(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = {
      name: formData.name,
      last_name: formData.last_name,
      age: parseInt(formData.age),
      birth: formData.birth,
      biography: formData.biography
    };


    if (formData.picture && formData.picture.startsWith("data:image")) {
      dataToSend.picture = formData.picture;
    }

    try {
      if (directorSeleccionado) {
        await updateDirector(directorSeleccionado.id, dataToSend);
      } else {
        await createDirector(dataToSend);
      }
      recargar();
      limpiarSeleccion();
    } catch (error) {
      console.error("Error detallado:", error.response?.data);
      alert("Error al guardar: " + JSON.stringify(error.response?.data));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        {directorSeleccionado ? "Editar Director" : "Nuevo Director"}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Nombre" required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth label="Apellido" required
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth label="Edad" type="number" required
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth label="Fecha de Nacimiento" type="date" required
            InputLabelProps={{ shrink: true }}
            value={formData.birth}
            onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><CakeIcon /></InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth multiline rows={3} label="Biografía"
            value={formData.biography}
            onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
          />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Avatar src={preview} sx={{ width: 80, height: 80 }} />
            <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
              Cambiar Foto
              <input type="file" hidden accept="image/*" onChange={handleImage} />
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button fullWidth variant="contained" type="submit">
            {directorSeleccionado ? "Guardar Cambios" : "Registrar"}
          </Button>
          <Button fullWidth variant="outlined" onClick={limpiarSeleccion} color="inherit">
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}