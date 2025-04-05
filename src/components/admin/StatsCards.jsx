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

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <div className="bg-institucional/10 text-institucional p-3 rounded-full text-xl">
      <Icon />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const StatsCards = ({ stats, visitas, usuariosOnline }) => {
  return (
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
  );
};

export default StatsCards;