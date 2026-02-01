import { useEffect, useState } from "react";
import Login from "./pages/Login";
import DirectorForm from "./components/DirectorForm";


function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [directores, setDirectores] = useState([]);
  const [directorSeleccionado, setDirectorSeleccionado] = useState(null);

  useEffect(() => {

    if(token){
      fetch("http://127.0.0.1:8000/api/directores/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => setDirectores(data))
        .catch(error => console.error(error));
    }

  }, [token]);

  // Si NO hay token → mostrar login
  if(!token){
    return <Login setToken={setToken} />;
  }

  return (
    
    <div>
      <h1>Lista de Directores</h1>
          <DirectorForm 
  directorSeleccionado={directorSeleccionado}
  limpiarSeleccion={() => setDirectorSeleccionado(null)}
/>
      {directores.map(director => (
        <div key={director.id} style={{border:"1px solid gray", margin:"10px", padding:"10px"}}>
          

          <h2>{director.name} {director.last_name}</h2>

          <p>Edad: {director.age}</p>
          <p>Fecha nacimiento: {director.birth}</p>
          <p>{director.biography}</p>

          {director.picture && (
            <img
              src={`http://127.0.0.1:8000/media/${director.picture}`}
              width="150"
            />
          )}

          <h3>Películas:</h3>

          {director.movies.length === 0 ? (
  <p>No tiene películas registradas</p>
) : (
  <ul>
    {director.movies.map(movie => (
      <li key={movie.id}>
        {movie.title} ({movie.year})

        <br />

        {movie.picture && (
          <img
            src={`http://127.0.0.1:8000/media/${movie.picture}`}
            width="120"
          />
        )}
      </li>
    ))}
  </ul>
)}

<button onClick={() => setDirectorSeleccionado(director)}>
  Editar
</button>

        </div>
      ))}

    </div>
  );
}

export default App;
