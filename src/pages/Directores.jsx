import { useEffect, useState } from "react";
import { getDirectores } from "../services/directorService";

function Directores() {
  const [directores, setDirectores] = useState([]);

  useEffect(() => {
    getDirectores()
      .then(res => setDirectores(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Lista de Directores</h1>

      {directores.map(d => (
        <p key={d.id}>{d.nombre}</p>
      ))}
    </div>
  );
}

export default Directores;
