import React, { useState, useEffect } from 'react';

const InscripcionesTable = () => {
  const [inscripciones, setInscripciones] = useState([]);

  // Cargar las inscripciones desde el backend
  const cargarInscripciones = async () => {
    const res = await fetch('https://extension-backend-app-3f0e27c4f9ad.herokuapp.com/api/inscripciones');
    const data = await res.json();
    setInscripciones(data);
  };

  useEffect(() => {
    cargarInscripciones();
  }, []);

  // Confirmar el pago
  const confirmarPago = async (id) => {
    try {
      const res = await fetch(`https://extension-backend-app-3f0e27c4f9ad.herokuapp.com/api/inscripciones/confirmar-pago/${id}`, {
        method: 'PUT',
      });
      const result = await res.json();
      if (res.ok) {
        alert('✅ Pago confirmado');
        // Recargar las inscripciones después de confirmar el pago
        cargarInscripciones();
      } else {
        alert('❌ Error al confirmar el pago');
      }
    } catch (err) {
      console.error('Error al confirmar el pago:', err);
      alert('❌ No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Nombres</th>
            <th className="px-4 py-2 border">Curso</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Acción</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((inscripcion) => (
            <tr key={inscripcion._id}>
              <td className="px-4 py-2 border">{inscripcion.nombres} {inscripcion.apellidos}</td>
              <td className="px-4 py-2 border">{inscripcion.cursoNombre}</td>
              <td className="px-4 py-2 border">
                {inscripcion.pagoConfirmado ? 'Pago Confirmado' : 'Pago Pendiente'}
              </td>
              <td className="px-4 py-2 border">
                {!inscripcion.pagoConfirmado && (
                  <button
                    onClick={() => confirmarPago(inscripcion._id)}
                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
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