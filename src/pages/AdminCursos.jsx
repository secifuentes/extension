import React, { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const AdminCursos = () => {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
      const data = await res.json();
      setCursos(data);
    };
    fetchCursos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-institucional mb-6">Gestión de Cursos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cursos.map((curso) => (
          <div key={curso._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={curso.imagen}
              alt={curso.nombre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-institucional">{curso.nombre}</h3>
              <p className="text-sm text-gray-600 mb-1">{curso.modalidad} • {curso.duracion}</p>
              <p className="text-sm text-gray-600 mb-2">{curso.ubicacion}</p>
              <p className="text-sm font-medium text-green-700">Inscritos: {curso.inscritos}</p>
              <p className="text-sm text-gray-500 mt-2">💰 Valor mensual: ${curso.precio.toLocaleString()}</p>

              <div className="mt-4 flex justify-between">
                <button className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  Editar
                </button>
                <button className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCursos;