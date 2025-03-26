import React, { useState } from 'react';
import { inscripciones } from '../../data/inscripciones';
import { datosCursos } from '../../data/datosCursos';
import { estudiantesRegistrados } from '../../data/estudiantes';

const InscripcionesTable = () => {
  const [data, setData] = useState(inscripciones);

  const confirmarPago = (index) => {
    const actualizado = [...data];
    actualizado[index].pagoConfirmado = true;
    setData(actualizado);
    alert('✅ Pago confirmado correctamente.');
    // Aquí podrías integrar lógica para persistir en DB real
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
            <th className="p-3 border">Estado de Pago</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((insc, index) => {
            const estudiante = estudiantesRegistrados.find(e => e.documento === insc.documento);
            const curso = datosCursos[insc.cursoId];

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{insc.documento}</td>
                <td className="p-3 border">{curso?.nombre || 'Curso no encontrado'}</td>
                <td className="p-3 border">
                  {estudiante ? (
                    <span className="text-green-600 font-medium">Sí</span>
                  ) : (
                    <span className="text-red-500 font-medium">No</span>
                  )}
                </td>
                <td className="p-3 border">
                  {insc.pagoConfirmado ? (
                    <span className="text-green-700">✔ Confirmado</span>
                  ) : (
                    <span className="text-red-600">❌ Pendiente</span>
                  )}
                </td>
                <td className="p-3 border">
                  {!insc.pagoConfirmado && (
                    <button
                      onClick={() => confirmarPago(index)}
                      className="text-sm bg-institucional text-white px-3 py-1 rounded hover:bg-presentacionDark"
                    >
                      Confirmar pago
                    </button>
                  )}
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