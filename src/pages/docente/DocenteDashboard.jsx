// src/pages/docente/DocenteDashboard.jsx
import React from 'react';

const cursosFicticios = [
  { id: 'curso1', nombre: 'Arte para niños', horario: 'Sábados 9 AM', estudiantes: 12 },
  { id: 'curso2', nombre: 'Música y ritmo', horario: 'Martes 4 PM', estudiantes: 8 },
];

const DocenteDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-institucional">Mis Cursos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cursosFicticios.map((curso) => (
          <div key={curso.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-gray-800">{curso.nombre}</h3>
            <p className="text-sm text-gray-600">Horario: {curso.horario}</p>
            <p className="text-sm text-gray-600">Estudiantes: {curso.estudiantes}</p>
            <a
              href={`/docente/estudiantes/${curso.id}`}
              className="mt-3 inline-block text-sm text-institucional font-semibold hover:underline"
            >
              Ver estudiantes →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocenteDashboard;