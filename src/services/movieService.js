import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getPeliculas = async () => {
  const response = await axios.get(`${BASE_URL}/peliculas/`);
  return response.data;
};

export const createPelicula = async (data) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/peliculas/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};

export const updatePelicula = async (id, data) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${BASE_URL}/peliculas/${id}/`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};

export const deletePelicula = async (id) => {

  const token = localStorage.getItem("token");

  await axios.delete(`${BASE_URL}/peliculas/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
