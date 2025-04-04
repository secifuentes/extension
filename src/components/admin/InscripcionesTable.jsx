import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const InscripcionesTable = () => {
  const [data, setData] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const cargarInscripciones = async () => {
      try {
        const res = await fetch(`${API_URL}/api/inscripciones`);
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error al cargar inscripciones:', error);
      }
    };

    const cargarCursos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cursos`);
        const cursosData = await res.json();
        setCursos(cursosData);
      } catch (error) {
        console.error('Error al cargar cursos:', error);
      }
    };

    cargarInscripciones();
    cargarCursos();
  }, []);

  const confirmarPago = async (index) => {
    const inscripcion = data[index];

    try {
      const res = await fetch(`${API_URL}/api/inscripciones/confirmar-pago/${inscripcion._id}`, {
        method: 'PUT',
      });

      if (res.ok) {
        const actualizado = [...data];
        actualizado[index].pagoConfirmado = true;
        setData(actualizado);
        alert('✅ Pago confirmado correctamente y correo enviado.');
      } else {
        alert('❌ Error al confirmar el pago');
      }
    } catch (err) {
      console.error('Error al confirmar el pago:', err);
      alert('❌ No se pudo conectar con el servidor');
    }
  };

  const eliminarEstudiante = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar esta inscripción?');
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/api/inscripciones/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setData((prev) => prev.filter((i) => i._id !== id));
        alert('✅ Inscripción eliminada correctamente.');
      } else {
        alert('❌ Error al eliminar inscripción');
      }
    } catch (err) {
      console.error('Error al eliminar inscripción:', err);
      alert('❌ No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-institucional">Listado de Inscripciones</h3>

      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">#</th>
            <th className="p-3 border">Documento</th>
            <th className="p-3 border">Curso</th>
            <th className="p-3 border">Presentación</th>
            <th className="p-3 border">Acudiente</th>
            <th className="p-3 border">Estado de Pago</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((insc, index) => {
            const curso = cursos.find((c) => c._id === insc.cursoId);

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{insc.documento}</td>
                <td className="p-3 border">{curso?.nombre || 'Curso no encontrado'}</td>
                <td className="p-3 border">
                  {insc.esEstudiante ? (
                    <span className="text-green-600 font-medium">Sí</span>
                  ) : (
                    <span className="text-red-500 font-medium">No</span>
                  )}
                </td>
                <td className="p-3 border">
                  {insc.acudiente
                    ? `${insc.acudiente} - ${insc.telefonoAcudiente}`
                    : '—'}
                </td>
                <td className="p-3 border">
                  {insc.pagoConfirmado ? (
                    <span className="text-green-700">✔ Confirmado</span>
                  ) : (
                    <span className="text-red-600">❌ Pendiente</span>
                  )}
                </td>
                <td className="p-3 border space-y-1 space-x-1">
                  {!insc.pagoConfirmado && (
                    <button
                      onClick={() => confirmarPago(index)}
                      className="text-sm bg-institucional text-white px-3 py-1 rounded hover:bg-presentacionDark"
                    >
                      Confirmar pago
                    </button>
                  )}
                  <button
                    onClick={() => eliminarEstudiante(insc._id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InscripcionesTable;