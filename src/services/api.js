import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const createDirector = async (directorData) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${BASE_URL}/directores/`,
    directorData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateDirector = async (id, directorData) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `http://127.0.0.1:8000/api/directores/${id}/`,
    directorData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};


