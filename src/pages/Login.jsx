import { useState } from "react";
import { login } from "../services/authService";

function Login({ setToken }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.access_token);

      setToken(data.access_token);

    } catch {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}

export default Login;
