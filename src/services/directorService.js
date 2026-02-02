import api from "../api/axiosConfig";

export const getDirectores = () => api.get("directores/");

export const getDirectorById = (id) => api.get(`directores/${id}/`);

export const updateDirector = (id, data) => {
  return api.put(`directores/${id}/`, data); 
};

export const createDirector = (data) => {
  return api.post(`directores/`, data);
};

export const deleteDirector = (id) => api.delete(`directores/${id}/`);