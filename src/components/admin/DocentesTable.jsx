import React, { useState } from 'react';
import { docentes as datosOriginales } from '../../data/docentes';

const DocentesTable = () => {
  const [docentes, setDocentes] = useState(datosOriginales);

  const marcarPagado = (index) => {
    const actualizados = [...docentes];
    actualizados[index].pago = true;
    setDocentes(actualizados);
    alert('✅ Quincena marcada como pagada.');
  };

  const actualizarObservacion = (index, nuevaObs) => {
    const actualizados = [...docentes];
    actualizados[index].observaciones = nuevaObs;
    setDocentes(actualizados);
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-institucional">Gestión de Docentes</h3>

      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Correo</th>
            <th className="p-3 border">Cursos asignados</th>
            <th className="p-3 border">Pago</th>
            <th className="p-3 border">Observaciones</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((doc, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3 border">{doc.nombre}</td>
              <td className="p-3 border">{doc.correo}</td>
              <td className="p-3 border">
                <ul className="list-disc list-inside">
                  {doc.cursos.map((id) => (
                    <li key={id}>{datosCursos[id]?.nombre || 'Curso no encontrado'}</li>
                  ))}
                </ul>
              </td>
              <td className="p-3 border">
                {doc.pago ? (
                  <span className="text-green-700">✔ Pagado</span>
                ) : (
                  <span className="text-red-600">❌ Pendiente</span>
                )}
              </td>
              <td className="p-3 border">
                <textarea
                  rows={2}
                  className="w-full p-2 border rounded text-sm"
                  value={doc.observaciones}
                  onChange={(e) => actualizarObservacion(i, e.target.value)}
                />
              </td>
              <td className="p-3 border">
                {!doc.pago && (
                  <button
                    onClick={() => marcarPagado(i)}
                    className="bg-institucional text-white px-3 py-1 rounded hover:bg-presentacionDark text-sm"
                  >
                    Marcar pagado
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

export default DocentesTable;