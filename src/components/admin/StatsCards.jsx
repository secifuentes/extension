import React, { useEffect, useState } from 'react';

const StatsCards = () => {
  const [stats, setStats] = useState({
    estudiantes: 0,
    cursos: 0,
    ingresos: 0,
    docentes: 0,
  });

  const [visitas, setVisitas] = useState({
    hoy: 0,
    mes: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/estadisticas`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('❌ Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVisitas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visitas/estadisticas`);
        const data = await res.json();
        setVisitas(data);
      } catch (error) {
        console.error('❌ Error al cargar visitas:', error);
      }
    };

    fetchEstadisticas();
    fetchVisitas();
  }, []);

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Cargando estadísticas...</p>;
  }

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

      {/* Nuevas tarjetas de visitas */}
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Visitas hoy</h3>
        <p className="text-3xl font-bold mt-2">{visitas.hoy}</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Visitas este mes</h3>
        <p className="text-3xl font-bold mt-2">{visitas.mes}</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Total visitas</h3>
        <p className="text-3xl font-bold mt-2">{visitas.total}</p>
      </div>
    </div>
  );
};

export default StatsCards;