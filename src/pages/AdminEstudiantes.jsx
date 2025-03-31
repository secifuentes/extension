import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    // Solicitar datos al backend
    axios.get('http://localhost:5050/api/estudiantes')
      .then(response => setEstudiantes(response.data))
      .catch(error => console.error('Error al obtener estudiantes:', error));
  }, []);

  return (
    <div>
      <h1>Estudiantes</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo de Documento</th>
            <th>Documento</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(estudiante => (
            <tr key={estudiante._id}>
              <td>{estudiante.nombres} {estudiante.apellidos}</td>
              <td>{estudiante.tipoDocumento}</td>
              <td>{estudiante.documento}</td>
              <td>{estudiante.correo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEstudiantes;