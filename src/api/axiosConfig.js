import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    // PRUEBA ESTO: Revisa si en tu login guardaste el token como "token" o como "access_token"
    const token = localStorage.getItem("token") || localStorage.getItem("access_token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("✅ Token encontrado y pegado al Header");
    } else {
      console.error("❌ ERROR: No hay ningún token en LocalStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;