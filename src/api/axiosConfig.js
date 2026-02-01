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
