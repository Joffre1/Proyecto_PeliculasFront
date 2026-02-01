import { useState, useEffect } from "react";
import { createDirector, updateDirector } from "../services/api";

function DirectorForm({ directorSeleccionado, limpiarSeleccion }) {

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [birth, setBirth] = useState("");
  const [biography, setBiography] = useState("");

  useEffect(() => {
    if(directorSeleccionado){
      setName(directorSeleccionado.name);
      setLastName(directorSeleccionado.last_name);
      setAge(directorSeleccionado.age);
      setBirth(directorSeleccionado.birth);
      setBiography(directorSeleccionado.biography);
    }
  }, [directorSeleccionado]);

  const handleSubmit = async () => {

    const data = {
      name,
      last_name: lastName,
      age,
      birth,
      biography
    };

    if(directorSeleccionado){
      await updateDirector(directorSeleccionado.id, data);
      alert("Director actualizado");
      limpiarSeleccion();
    } else {
      await createDirector(data);
      alert("Director creado");
    }

    window.location.reload();
  };

  return (
    <div>
      <h2>{directorSeleccionado ? "Editar Director" : "Crear Director"}</h2>

      <input value={name} placeholder="Nombre" onChange={e => setName(e.target.value)} />
      <input value={lastName} placeholder="Apellido" onChange={e => setLastName(e.target.value)} />
      <input value={age} placeholder="Edad" onChange={e => setAge(e.target.value)} />
      <input type="date" value={birth} onChange={e => setBirth(e.target.value)} />
      <textarea value={biography} placeholder="Biografía" onChange={e => setBiography(e.target.value)} />

      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
}

export default DirectorForm;
