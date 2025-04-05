import React, { useEffect, useState } from 'react';
import {
  FaUserGraduate,
  FaBookOpen,
  FaDollarSign,
  FaChalkboardTeacher,
  FaEye,
  FaCalendarAlt,
  FaChartBar,
  FaUserClock,
} from 'react-icons/fa';

// Componente para una tarjeta de estadística
const StatCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all">
    <div className="bg-institucional/10 text-institucional p-3 rounded-full text-xl">
      <Icon />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

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

  const [usuariosOnline, setUsuariosOnline] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/estadisticas`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('❌ Error al cargar estadísticas:', error);
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

    const fetchOnline = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/visitas/activos`);
        const data = await res.json();
        setUsuariosOnline(data.enLinea || 0);
      } catch (error) {
        console.error('❌ Error al cargar usuarios en línea:', error);
      }
    };

    const cargarTodo = async () => {
      setLoading(true);
      await Promise.all([fetchEstadisticas(), fetchVisitas(), fetchOnline()]);
      setLoading(false);
    };

    cargarTodo();

    const interval = setInterval(() => {
      cargarTodo();
    }, 30000); // cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Cargando estadísticas...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-institucional mb-6">Resumen General</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard icon={FaUserGraduate} label="Estudiantes activos" value={stats.estudiantes} />
        <StatCard icon={FaBookOpen} label="Cursos activos" value={stats.cursos} />
        <StatCard icon={FaDollarSign} label="Ingresos" value={`$${stats.ingresos.toLocaleString()}`} />
        <StatCard icon={FaChalkboardTeacher} label="Docentes asignados" value={stats.docentes} />
        <StatCard icon={FaEye} label="Visitas hoy" value={visitas.hoy} />
        <StatCard icon={FaCalendarAlt} label="Visitas este mes" value={visitas.mes} />
        <StatCard icon={FaChartBar} label="Total visitas" value={visitas.total} />
        <StatCard icon={FaUserClock} label="Usuarios en línea" value={usuariosOnline} />
      </div>
    </div>
  );
};

export default StatsCards;