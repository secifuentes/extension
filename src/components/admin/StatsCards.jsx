import React, { useEffect, useState } from 'react';

const StatsCards = () => {
  const [stats, setStats] = useState({
    estudiantes: 0,
    cursos: 0,
    ingresos: 0,
    docentes: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/estadisticas`);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('❌ Error al obtener estadísticas:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Estudiantes activos</h3>
        <p className="text-3xl font-bold mt-2">{stats.estudiantes}</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Cursos activos</h3>
        <p className="text-3xl font-bold mt-2">{stats.cursos}</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Ingresos</h3>
        <p className="text-3xl font-bold mt-2">${stats.ingresos.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Docentes asignados</h3>
        <p className="text-3xl font-bold mt-2">{stats.docentes}</p>
      </div>
    </div>
  );
};

export default StatsCards;