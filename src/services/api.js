import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

// Creamos una instancia centralizada
const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para inyectar el Token automáticamente en TODAS las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // CAMBIA 'Bearer' por 'Token' si tu Django no usa JWT
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== DIRECTORES =====

export const createDirector = async (directorData) => {
  // Usamos FormData por si hay fotos
  const response = await api.post("/directores/", directorData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateDirector = async (id, directorData) => {
  const response = await api.patch(`/directores/${id}/`, directorData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteDirector = async (id) => {
  const response = await api.delete(`/directores/${id}/`);
  return response.data;
};

// ===== PELICULAS =====

export const createMovie = async (data) => {
  const response = await api.post("/peliculas/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateMovie = async (id, data) => {
  const response = await api.patch(`/peliculas/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/peliculas/${id}/`);
  return response.data;
};

export default api;