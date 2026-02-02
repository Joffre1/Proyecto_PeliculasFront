import { useEffect, useState } from "react";
import { getPeliculas, deletePelicula } from "../services/peliculaService";
import PeliculaForm from "./PeliculaForm";

const MovieList = () => {

  const [peliculas, setPeliculas] = useState([]);
  const [peliculaEditando, setPeliculaEditando] = useState(null);

  const cargarPeliculas = async () => {
    const data = await getPeliculas();
    setPeliculas(data);
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const handleDelete = async (id) => {
    await deletePelicula(id);
    cargarPeliculas();
  };

  return (
    <div>

      <h2>Películas</h2>

      <PeliculaForm
        peliculaEditando={peliculaEditando}
        onSuccess={() => {
          setPeliculaEditando(null);
          cargarPeliculas();
        }}
      />

      <ul>
        {peliculas.map((p) => (
          <li key={p.id}>

            <h3>{p.titulo}</h3>
            <p>{p.descripcion}</p>
            <p>{p.anio}</p>

            {p.imagen && (
              <img
                src={`http://127.0.0.1:8000${p.imagen}`}
                width="150"
                alt="portada"
              />
            )}

            <button onClick={() => setPeliculaEditando(p)}>
              Editar
            </button>

            <button onClick={() => handleDelete(p.id)}>
              Eliminar
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
};

export default MovieList;
