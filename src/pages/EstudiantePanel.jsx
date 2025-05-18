import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;



const EstudiantePanel = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [resumen, setResumen] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [mesSeleccionado, setMesSeleccionado] = useState(2);

  useEffect(() => {
  const datos = localStorage.getItem("usuario");

  if (datos) {
    const usuarioParsed = JSON.parse(datos);
    setUsuario(usuarioParsed);

    axios
      .get(`${API}/api/inscripciones/usuario/${usuarioParsed.id}`)
      .then((res) => {
        setResumen(res.data);
      })
      .catch((err) => {
        console.error("❌ Error al obtener datos del panel estudiante:", err);
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

if (!resumen) {
  return <p className="text-center mt-20 text-gray-500">Cargando información del estudiante...</p>;
}

  return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bienvenido, {usuario?.nombre || "Estudiante"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">Tu espacio de aprendizaje personalizado</p>
        </div>
        <button
          onClick={cerrarSesion}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow-sm"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Curso */}
<div className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg">
  <h2 className="text-lg font-semibold text-blue-700 mb-2 flex items-center gap-2">
    📘 Curso inscrito
  </h2>
  <p className="text-gray-700">Nombre: <strong>{resumen?.cursos[0]?.curso || "—"}</strong></p>
  <p className="text-gray-700">Inicio: <strong>{resumen?.cursos[0]?.inicio || "Por confirmar"}</strong></p>
  <p className="text-gray-700">Modalidad: <strong>{resumen?.cursos[0]?.modalidad || "Presencial"}</strong></p>
</div>

        {/* Estado de pago */}
        {/* Estado de pago */}
<div className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg">
  <h2 className="text-lg font-semibold text-green-700 mb-2 flex items-center gap-2">
    💳 Estado de pago
  </h2>
  <p className="text-gray-700">
    Estado:{" "}
    <strong className={resumen?.cursos[0]?.pagoConfirmado ? "text-green-700" : "text-red-700"}>
      {resumen?.cursos[0]?.pagoConfirmado ? "Confirmado ✅" : "Pendiente ❌"}
    </strong>
  </p>
  <p className="text-sm text-gray-500 mt-2">
    {resumen?.cursos[0]?.pagoConfirmado
      ? "Gracias por completar tu pago."
      : "Tu pago aún está pendiente de confirmación."}
  </p>
</div>
      </div>

      {/* Subir soporte */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold text-yellow-600 mb-4 flex items-center gap-2">
          📤 Subir soporte de pago
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <select
  value={mesSeleccionado}
  onChange={(e) => setMesSeleccionado(parseInt(e.target.value))}
  className="border border-gray-300 rounded p-2 w-full sm:w-auto"
>
  <option value={2}>Mes 2</option>
  <option value={3}>Mes 3</option>
</select>
          <input
  type="file"
  accept=".pdf,.jpg,.png"
  onChange={(e) => setArchivo(e.target.files[0])}
  className="border border-gray-300 rounded p-2 w-full sm:w-auto"
/>
          <button
  onClick={async () => {
    if (!archivo) return alert("Selecciona un archivo primero.");
    if (!resumen?.cursos[0]) return alert("No se encontró el curso del estudiante.");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result;

      try {
        setSubiendo(true);
        const res = await axios.put(`${API}/api/inscripciones/pagos-mensuales/${resumen.cursos[0]._id}`, {
          mes: mesSeleccionado, // ✅ esto lo hace dinámico
          comprobante: base64,
        });

        alert("📤 Comprobante enviado con éxito");
      } catch (err) {
        console.error("❌ Error al subir comprobante:", err);
        alert("Ocurrió un error al subir el comprobante.");
      } finally {
        setSubiendo(false);
      }
    };

    reader.readAsDataURL(archivo);
  }}
  disabled={subiendo}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
>
  {subiendo ? "Subiendo..." : "Subir"}
</button>
        </div>
        <p className="text-sm text-gray-400 mt-2">Formatos permitidos: PDF, JPG, PNG. Máx. 5MB</p>
      </div>

      {/* Pagos mensuales realizados */}
{resumen?.cursos[0]?.pagosMensuales?.length > 0 && (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-10 transition hover:shadow-lg">
    <h2 className="text-lg font-semibold text-teal-700 mb-4 flex items-center gap-2">
      📅 Pagos mensuales registrados
    </h2>
    <ul className="space-y-3">
      {resumen.cursos[0].pagosMensuales.map((pago) => (
        <li
          key={pago.mes}
          className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
        >
          <div>
            <p className="font-medium text-gray-800">Mes {pago.mes}</p>
            <p className="text-sm text-gray-500">
              Estado:{" "}
              <span
                className={
                  pago.estado === "verificado" ? "text-green-600" : "text-yellow-600"
                }
              >
                {pago.estado === "verificado" ? "Verificado ✅" : "Pendiente 🕐"}
              </span>
            </p>
          </div>
          <div>
            {pago.comprobante && (
              <a
                href={pago.comprobante}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Ver comprobante
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Materiales */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-10 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-2">
          📂 Materiales del curso
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            <a href="#" className="hover:underline text-blue-600">📄 Guía Unidad 1.pdf</a>
          </li>
          <li>
            <a href="#" className="hover:underline text-blue-600">🎧 Audio Lección 1.mp3</a>
          </li>
          <li>
            <a href="#" className="hover:underline text-blue-600">🖼 Presentación inicial.pptx</a>
          </li>
        </ul>
      </div>

      {/* Notificaciones */}
      <div className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold text-purple-600 mb-4 flex items-center gap-2">
          🔔 Notificaciones recientes
        </h2>
        <ul className="space-y-2 text-gray-700">
          <li>📌 Bienvenida al curso publicada por la docente María Ríos</li>
          <li>📅 Recuerda traer el libro impreso a la próxima clase</li>
          <li>🆕 Se ha subido nuevo material: Unidad 2</li>
        </ul>
      </div>
    </div>
  </div>
); 
};

export default EstudiantePanel;