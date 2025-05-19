import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

const API = import.meta.env.VITE_API_URL;

const DocentePanel = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem("usuario");

    if (datos) {
      const usuarioParsed = JSON.parse(datos);
      setUsuario(usuarioParsed);

      axios
        .get(`${API}/api/cursos/docente/${usuarioParsed.id}`)
        .then((res) => {
          setCursos(res.data || []);
        })
        .catch((err) => {
          console.error("❌ Error al obtener cursos del docente:", err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <DashboardLayout usuario={usuario} onLogout={cerrarSesion}>
      <div className="px-4 sm:px-8 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📚 Cursos asignados</h1>

        {cursos.length === 0 ? (
          <p className="text-gray-500">No tienes cursos asignados aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cursos.map((curso) => (
              <div
                key={curso._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-blue-700 mb-1">{curso.nombre}</h2>
                <p className="text-sm text-gray-500 mb-2">Modalidad: {curso.modalidad}</p>
                <p className="text-sm text-gray-500 mb-4">Inicio: {curso.inicio}</p>
                <div className="flex gap-3 text-sm">
                  <a href={`/panel/docente/curso/${curso._id}/materiales`} className="text-indigo-600 hover:underline">📂 Materiales</a>
                  <a href={`/panel/docente/curso/${curso._id}/foros`} className="text-teal-600 hover:underline">💬 Foros</a>
                  <a href={`/panel/docente/curso/${curso._id}/asistencia`} className="text-green-600 hover:underline">📝 Asistencia</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DocentePanel;