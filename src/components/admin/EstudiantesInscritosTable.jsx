import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const EstudiantesInscritosTable = () => {
  const [inscripciones, setInscripciones] = useState([]);

  useEffect(() => {
    const fetchInscripciones = async () => {
      try {
        const res = await fetch(`${API_URL}/api/inscripciones`);
        const data = await res.json();
        setInscripciones(data);
      } catch (err) {
        console.error('❌ Error al cargar inscripciones:', err);
      }
    };

    fetchInscripciones();
  }, []);

  const confirmarPago = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones/confirmar-pago/${id}`, {
        method: 'PUT',
      });

      if (res.ok) {
        alert('✅ Pago confirmado');
        const actualizadas = inscripciones.map((i) =>
          i._id === id ? { ...i, pagoConfirmado: true } : i
        );
        setInscripciones(actualizadas);
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

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-institucional">Estudiantes Inscritos</h2>
      <table className="min-w-full bg-white border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="border px-4 py-2">Tipo Doc</th>
            <th className="border px-4 py-2">Documento</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Correo</th>
            <th className="border px-4 py-2">Teléfono</th>
            <th className="border px-4 py-2">Curso</th>
            <th className="border px-4 py-2">Presentación</th>
            <th className="border px-4 py-2">Forma de Pago</th>
            <th className="border px-4 py-2">Valor Pagado</th>
            <th className="border px-4 py-2">Comprobante</th>
            <th className="border px-4 py-2">Fecha</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((est) => (
            <tr key={est._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{est.tipoDocumento}</td>
              <td className="border px-4 py-2">{est.documento}</td>
              <td className="border px-4 py-2">{est.nombres} {est.apellidos}</td>
              <td className="border px-4 py-2">{est.correo}</td>
              <td className="border px-4 py-2">{est.telefono}</td>
              <td className="border px-4 py-2">{est.cursoNombre}</td>
              <td className="border px-4 py-2">
                {est.esEstudiante ? (
                  <span className="text-green-600 font-semibold">Sí</span>
                ) : (
                  <span className="text-gray-500">No</span>
                )}
              </td>
              <td className="border px-4 py-2 capitalize">{est.formaPago}</td>
              <td className="border px-4 py-2">${est.valorPagado?.toLocaleString()}</td>
              <td className="border px-4 py-2">
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
              <td className="border px-4 py-2">{formatearFecha(est.fechaInscripcion)}</td>
              <td className="border px-4 py-2 flex flex-col gap-2">
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

export default EstudiantesInscritosTable;