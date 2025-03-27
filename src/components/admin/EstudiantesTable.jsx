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

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-institucional">Inscripciones registradas</h2>
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
            <th className="px-4 py-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((ins) => (
            <tr key={ins._id}>
              <td className="px-4 py-2 border">{ins.nombres} {ins.apellidos}</td>
              <td className="px-4 py-2 border">{ins.tipoDocumento.toUpperCase()} {ins.documento}</td>
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
              <td className="px-4 py-2 border capitalize">{ins.formaPago}</td>
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
              <td className="px-4 py-2 border">
                {!ins.pagoConfirmado && (
                  <button
                    onClick={() => confirmarPago(ins._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
                  >
                    Confirmar Pago
                  </button>
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