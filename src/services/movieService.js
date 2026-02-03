import api from "../api/axiosConfig";

export const getPeliculas = () => api.get("peliculas/");

export const createPelicula = (data) => {
  
  return api.post("peliculas/", data);
};

export const updatePelicula = (id, data) => {
  return api.put(`peliculas/${id}/`, data);
};

export const deletePelicula = (id) => api.delete(`peliculas/${id}/`);