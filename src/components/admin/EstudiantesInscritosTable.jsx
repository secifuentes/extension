import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const EstudiantesInscritosTable = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');
  const [filtroPago, setFiltroPago] = useState('');
  const [filtroPresentacion, setFiltroPresentacion] = useState('');

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const fetchInscripciones = async () => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones`);
      const data = await res.json();
      setInscripciones(data);
    } catch (err) {
      console.error('❌ Error al cargar inscripciones:', err);
    }
  };

  const confirmarPago = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones/confirmar-pago/${id}`, {
        method: 'PUT',
      });

      if (res.ok) {
        alert('✅ Pago confirmado');
        fetchInscripciones();
      } else {
        alert('❌ No se pudo confirmar el pago');
      }
    } catch (err) {
      console.error('Error confirmando pago:', err);
    }
  };

  const enviarRecordatorio = async (correo, cursoNombre) => {
    try {
      const res = await fetch(`${API_URL}/api/recordatorio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, cursoNombre }),
      });

      if (res.ok) {
        alert(`📩 Recordatorio enviado a ${correo}`);
      } else {
        alert('❌ Error al enviar el recordatorio');
      }
    } catch (err) {
      console.error('Error enviando recordatorio:', err);
    }
  };

  const eliminarTodas = async () => {
    const c1 = confirm('¿Eliminar todas las inscripciones?');
    if (!c1) return;
    const c2 = confirm('⚠️ Esto no se puede deshacer. ¿Seguro que deseas continuar?');
    if (!c2) return;

    try {
      const res = await fetch(`${API_URL}/api/inscripciones`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('✅ Inscripciones eliminadas');
        fetchInscripciones();
      } else {
        alert('❌ Error al eliminar');
      }
    } catch (err) {
      console.error('Error al eliminar:', err);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  // 🔎 Filtros
  const filtrados = inscripciones.filter((est) => {
    const texto = `${est.nombres} ${est.apellidos} ${est.documento} ${est.correo}`.toLowerCase();
    const coincideBusqueda = texto.includes(busqueda.toLowerCase());

    const coincideCurso = filtroCurso ? est.cursoNombre === filtroCurso : true;
    const coincidePago =
      filtroPago === 'pendiente'
        ? !est.pagoConfirmado
        : filtroPago === 'confirmado'
        ? est.pagoConfirmado
        : true;
    const coincidePresentacion =
      filtroPresentacion === 'si'
        ? est.esEstudiante
        : filtroPresentacion === 'no'
        ? !est.esEstudiante
        : true;

    return coincideBusqueda && coincideCurso && coincidePago && coincidePresentacion;
  });

  // Obtener cursos únicos para el filtro
  const cursosUnicos = [...new Set(inscripciones.map((i) => i.cursoNombre))];

  return (
    <div className="p-4 overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h2 className="text-2xl font-bold text-institucional">Estudiantes Inscritos</h2>
        <button
          onClick={eliminarTodas}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
        >
          Eliminar todos
        </button>
      </div>

      {/* Buscador y filtros */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre, documento o correo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-2 border rounded w-full sm:w-1/3"
        />

        <select
          value={filtroCurso}
          onChange={(e) => setFiltroCurso(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos los cursos</option>
          {cursosUnicos.map((curso, i) => (
            <option key={i} value={curso}>
              {curso}
            </option>
          ))}
        </select>

        <select
          value={filtroPago}
          onChange={(e) => setFiltroPago(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos los pagos</option>
          <option value="confirmado">Pagos confirmados</option>
          <option value="pendiente">Pagos pendientes</option>
        </select>

        <select
          value={filtroPresentacion}
          onChange={(e) => setFiltroPresentacion(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos</option>
          <option value="si">Familia Presentación</option>
          <option value="no">Externos</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-2 py-2">Tipo Doc</th>
            <th className="border px-2 py-2">Documento</th>
            <th className="border px-2 py-2">Nombre</th>
            <th className="border px-2 py-2">Correo</th>
            <th className="border px-2 py-2">Teléfono</th>
            <th className="border px-2 py-2">Curso</th>
            <th className="border px-2 py-2">Presentación</th>
            <th className="border px-2 py-2">Forma de Pago</th>
            <th className="border px-2 py-2">Valor Pagado</th>
            <th className="border px-2 py-2">Comprobante</th>
            <th className="border px-2 py-2">Fecha</th>
            <th className="border px-2 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((est) => (
            <tr key={est._id} className="hover:bg-gray-50">
              <td className="border px-2 py-2">{est.tipoDocumento}</td>
              <td className="border px-2 py-2">{est.documento}</td>
              <td className="border px-2 py-2">{est.nombres} {est.apellidos}</td>
              <td className="border px-2 py-2">{est.correo}</td>
              <td className="border px-2 py-2">{est.telefono}</td>
              <td className="border px-2 py-2">{est.cursoNombre}</td>
              <td className="border px-2 py-2 text-center">
                {est.esEstudiante ? '✅' : '—'}
              </td>
              <td className="border px-2 py-2 capitalize">{est.formaPago}</td>
              <td className="border px-2 py-2">${est.valorPagado?.toLocaleString()}</td>
              <td className="border px-2 py-2">
                {est.comprobante ? (
                  <a
                    href={`data:image/png;base64,${est.comprobante}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`data:image/png;base64,${est.comprobante}`}
                      alt="Comprobante"
                      className="w-12 h-12 object-contain rounded shadow"
                    />
                  </a>
                ) : (
                  <span className="text-gray-400">No cargado</span>
                )}
              </td>
              <td className="border px-2 py-2">{formatearFecha(est.fechaInscripcion)}</td>
              <td className="border px-2 py-2 flex flex-col gap-2">
                {!est.pagoConfirmado && (
                  <>
                    <button
                      onClick={() => confirmarPago(est._id)}
                      className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-800"
                    >
                      Confirmar pago
                    </button>
                    <button
                      onClick={() => enviarRecordatorio(est.correo, est.cursoNombre)}
                      className="bg-yellow-500 text-white text-xs px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Recordatorio
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EstudiantesInscritosTable;