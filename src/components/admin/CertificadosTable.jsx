import React, { useState } from 'react';
import { inscripciones } from '../../data/inscripciones';
import { datosCursos } from '../../data/datosCursos';
import { estudiantesRegistrados } from '../../data/estudiantes';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const CertificadosTable = () => {
  const [aprobados, setAprobados] = useState([]);

  const generarCertificado = (est, curso) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Certificado de Participación', 105, 30, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Otorgado a: ${est.nombres} ${est.apellidos}`, 20, 60);
    doc.text(`Por su participación en el curso: ${curso.nombre}`, 20, 70);
    doc.text(`Duración: ${curso.duracion}`, 20, 80);
    doc.text(`Ubicación: ${curso.ubicacion}`, 20, 90);
    doc.text('Fecha de emisión: ' + new Date().toLocaleDateString(), 20, 110);

    doc.save(`Certificado_${est.nombres}_${curso.nombre}.pdf`);
  };

  const marcarAprobado = (id) => {
    setAprobados([...aprobados, id]);
  };

  const getEstudiante = (doc) =>
    estudiantesRegistrados.find((e) => e.documento === doc);

  const inscritos = inscripciones.filter((i) => i.pagoConfirmado);

  return (
    <div className="bg-white p-6 rounded shadow w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-institucional">Certificados</h3>
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Estudiante</th>
            <th className="p-3 border">Curso</th>
            <th className="p-3 border">¿Aprobado?</th>
            <th className="p-3 border">Certificado</th>
          </tr>
        </thead>
        <tbody>
          {inscritos.map((insc, i) => {
            const est = getEstudiante(insc.documento);
            const curso = datosCursos[insc.cursoId];
            const idUnico = `${insc.documento}-${insc.cursoId}`;
            const estaAprobado = aprobados.includes(idUnico);

            return (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 border">{est?.nombres} {est?.apellidos}</td>
                <td className="p-3 border">{curso?.nombre}</td>
                <td className="p-3 border">
                  {estaAprobado ? (
                    <span className="text-green-600">✅ Aprobado</span>
                  ) : (
                    <button
                      onClick={() => marcarAprobado(idUnico)}
                      className="bg-institucional text-white px-3 py-1 rounded text-sm hover:bg-presentacionDark"
                    >
                      Marcar aprobado
                    </button>
                  )}
                </td>
                <td className="p-3 border">
                  {estaAprobado ? (
                    <button
                      onClick={() => generarCertificado(est, curso)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded text-sm hover:bg-yellow-500"
                    >
                      Descargar PDF
                    </button>
                  ) : (
                    <span className="text-gray-400 italic">No disponible</span>
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

export default CertificadosTable;