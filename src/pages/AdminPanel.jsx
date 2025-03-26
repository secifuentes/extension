import React from 'react';

const AdminPanel = () => {
  return (
    <div className="max-w-6xl mx-auto pt-6 pb-12">
      <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Resumen General</h3>
          <ul className="text-sm space-y-1">
            <li>🧑‍🎓 Estudiantes inscritos: 124</li>
            <li>📚 Cursos activos: 9</li>
            <li>💵 Pagos pendientes: 6</li>
            <li>📄 Certificados pendientes: 3</li>
          </ul>
        </div>

        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Gestión rápida</h3>
          <ul className="text-sm space-y-2">
            <li><button className="bg-institucional text-white px-3 py-1 rounded">Ver cursos</button></li>
            <li><button className="bg-institucional text-white px-3 py-1 rounded">Ver estudiantes</button></li>
            <li><button className="bg-institucional text-white px-3 py-1 rounded">Pagos y contabilidad</button></li>
            <li><button className="bg-institucional text-white px-3 py-1 rounded">Panel de docentes</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;