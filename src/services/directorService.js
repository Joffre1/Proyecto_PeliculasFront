import api from "../api/axiosConfig";

export const getDirectores = () => {
  return api.get("directores/");
};
