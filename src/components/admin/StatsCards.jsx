import React, { useEffect, useState } from 'react';
import {
  FaUserGraduate,
  FaBookOpen,
  FaDollarSign,
  FaChalkboardTeacher,
  FaEye,
  FaChartBar,
  FaUserClock,
  FaPlus, 
  FaClipboardList,
  FaUserTie,
  FaFileInvoiceDollar,
  FaEyeSlash,  // <---- AÑADIR ESTO
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, isPrivate = false }) => {
  const [visible, setVisible] = useState(!isPrivate);

  return (
    <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow hover:shadow-lg transition-all">
      <div className="flex items-center gap-4">
        <div className="bg-institucional/10 text-institucional p-3 rounded-full text-xl">
          <Icon />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold">
            {isPrivate
              ? visible
                ? value
                : '****'
              : value}
          </p>
        </div>
      </div>
      {isPrivate && (
        <button
          onClick={() => setVisible(!visible)}
          className="text-gray-400 hover:text-institucional transition"
          title={visible ? 'Ocultar' : 'Mostrar'}
        >
          {visible ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
    </div>
  );
};

const StatsCards = () => {
  const [stats, setStats] = useState({
    estudiantes: 0,
    cursos: 0,
    ingresos: 0,
    docentes: 0,
    inscripcionesTotales: 0,
  });

  const [usuariosOnline, setUsuariosOnline] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        const resStats = await fetch(`${API}/api/estadisticas`);
        const dataStats = await resStats.json();

        setStats({
          ...dataStats,
          inscripcionesTotales: dataStats.estudiantes * 2, // Para que se vea bien en el dashboard (debes ajustar esto según tu lógica)
        });

        const resOnline = await fetch(`${API}/api/visitas/activos`);
        const dataOnline = await resOnline.json();
        setUsuariosOnline(dataOnline.enLinea || 0);

        setLoading(false);
      } catch (error) {
        console.error('❌ Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Cargando datos del dashboard...</p>;
  }

  return (
    <div className="space-y-10">
      {/* Título */}
      <h1 className="text-2xl font-bold text-institucional">Panel administrativo</h1>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard icon={FaUserGraduate} label="Estudiantes activos" value={stats.estudiantes} />
        <StatCard icon={FaBookOpen} label="Cursos activos" value={stats.cursos} />
        <StatCard icon={FaDollarSign} label="Ingresos" value={`$${stats.ingresos.toLocaleString()}`} isPrivate />
        <StatCard icon={FaChalkboardTeacher} label="Docentes asignados" value={stats.docentes} />
        <StatCard icon={FaChartBar} label="Total inscripciones" value={stats.inscripcionesTotales} />
        <StatCard icon={FaEye} label="Usuarios en línea" value={usuariosOnline} />
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-institucional">Accesos rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/crear-curso" className="bg-institucional text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-presentacionDark transition text-sm font-semibold">
            <FaPlus /> Crear curso
          </Link>
          <Link to="/admin/inscripciones" className="bg-institucional text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-presentacionDark transition text-sm font-semibold">
            <FaClipboardList /> Ver inscripciones
          </Link>
          <Link to="/admin/docentes" className="bg-institucional text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-presentacionDark transition text-sm font-semibold">
            <FaUserTie /> Asignar docentes
          </Link>
          <Link to="/admin/contabilidad" className="bg-institucional text-white px-4 py-3 rounded-lg flex items-center gap-2 hover:bg-presentacionDark transition text-sm font-semibold">
            <FaFileInvoiceDollar /> Contabilidad
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;