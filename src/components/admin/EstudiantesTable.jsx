import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const InscripcionesTable = () => {
  const [inscripciones, setInscripciones] = useState([]);

  const cargarInscripciones = async () => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones`);
      const data = await res.json();
      setInscripciones(data);
    } catch (error) {
      console.error('Error al cargar inscripciones:', error);
    }
  };

  useEffect(() => {
    cargarInscripciones();
  }, []);

  const confirmarPago = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones/confirmar-pago/${id}`, {
        method: 'PUT',
      });
      const result = await res.json();
      if (res.ok) {
        alert('✅ Pago confirmado');
        cargarInscripciones();
      } else {
        alert('❌ Error al confirmar el pago');
      }
    } catch (err) {
      console.error('Error al confirmar el pago:', err);
      alert('❌ No se pudo conectar con el servidor');
    }
  };

  const enviarRecordatorio = async (correo, cursoNombre) => {
    try {
      const res = await fetch(`${API_URL}/api/recordatorio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, cursoNombre }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(`📬 Recordatorio enviado a ${correo}`);
      } else {
        alert('❌ Error al enviar recordatorio');
      }
    } catch (err) {
      console.error('Error al enviar recordatorio:', err);
      alert('❌ No se pudo enviar recordatorio');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const eliminarTodasInscripciones = async () => {
    const confirmacion1 = window.confirm('¿Estás seguro de que quieres eliminar todas las inscripciones?');
    if (!confirmacion1) return; // Si el usuario cancela, no hace nada.

    const confirmacion2 = window.confirm('¡Atención! Esta acción no se puede deshacer. ¿Estás seguro de que deseas continuar?');
    if (!confirmacion2) return; // Si el usuario cancela, no hace nada.

    try {
      const res = await fetch(`${API_URL}/api/inscripciones`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (res.ok) {
        alert('✅ Todas las inscripciones han sido eliminadas');
        cargarInscripciones(); // Actualiza la lista de inscripciones
      } else {
        alert('❌ Error al eliminar las inscripciones');
      }
    } catch (err) {
      console.error('Error al eliminar inscripciones:', err);
      alert('❌ No se pudo eliminar las inscripciones');
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-institucional">Inscripciones registradas</h2>
      <button
        onClick={eliminarTodasInscripciones}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 mb-4"
      >
        Eliminar todas las inscripciones
      </button>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border">Nombre</th>
            <th className="px-4 py-2 border">Documento</th>
            <th className="px-4 py-2 border">Correo</th>
            <th className="px-4 py-2 border">Teléfono</th>
            <th className="px-4 py-2 border">¿Familia Presentación?</th>
            <th className="px-4 py-2 border">Curso</th>
            <th className="px-4 py-2 border">Forma de pago</th>
            <th className="px-4 py-2 border">Valor pagado</th>
            <th className="px-4 py-2 border">Comprobante</th>
            <th className="px-4 py-2 border">Fecha inscripción</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((ins) => (
            <tr key={ins._id}>
              <td className="px-4 py-2 border">{ins.nombres} {ins.apellidos}</td>
              <td className="px-4 py-2 border">{ins.tipoDocumento?.toUpperCase()} {ins.documento}</td>
              <td className="px-4 py-2 border">{ins.correo}</td>
              <td className="px-4 py-2 border">{ins.telefono}</td>
              <td className="px-4 py-2 border">
                {ins.esEstudiante ? (
                  <span className="text-green-600 font-semibold">Sí</span>
                ) : (
                  <span className="text-gray-600">No</span>
                )}
              </td>
              <td className="px-4 py-2 border">{ins.cursoNombre}</td>
              <td className="px-4 py-2 border">
                {ins.formaPago === 'mensual' ? (
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Mensual</span>
                ) : (
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Curso completo</span>
                )}
              </td>
              <td className="px-4 py-2 border">${ins.valorPagado?.toLocaleString()}</td>
              <td className="px-4 py-2 border">
                {ins.comprobante ? (
                  <a
                    href={`data:image/png;base64,${ins.comprobante}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver comprobante"
                  >
                    <img
                      src={`data:image/png;base64,${ins.comprobante}`}
                      alt="Comprobante"
                      className="w-16 h-16 object-contain border rounded shadow"
                    />
                  </a>
                ) : (
                  <span className="text-gray-500">No cargado</span>
                )}
              </td>
              <td className="px-4 py-2 border">{formatearFecha(ins.fechaInscripcion)}</td>
              <td className="px-4 py-2 border space-y-2 flex flex-col">
                {!ins.pagoConfirmado && (
                  <>
                    <button
                      onClick={() => confirmarPago(ins._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
                    >
                      Confirmar pago
                    </button>

                    <button
                      onClick={() => enviarRecordatorio(ins.correo, ins.cursoNombre)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Enviar recordatorio
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

export default InscripcionesTable;