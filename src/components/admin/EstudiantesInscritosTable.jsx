import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
        alert(`Recordatorio enviado a ${correo}`);
      } else {
        alert('❌ Error al enviar el recordatorio');
      }
    } catch (err) {
      console.error('Error enviando recordatorio:', err);
    }
  };

  const eliminarEstudiante = async (id) => {
    const confirmar = confirm('¿Eliminar este estudiante?');
    if (!confirmar) return;

    try {
      const res = await fetch(`${API_URL}/api/inscripciones/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('✅ Estudiante eliminado');
        fetchInscripciones();
      } else {
        alert('❌ No se pudo eliminar');
      }
    } catch (err) {
      console.error('Error eliminando estudiante:', err);
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

  const exportarExcel = () => {
    const datos = filtrados.map((est) => ({
      'Tipo Documento': est.tipoDocumento,
      Documento: est.documento,
      Nombres: est.nombres,
      Apellidos: est.apellidos,
      Correo: est.correo,
      Teléfono: est.telefono,
      Curso: est.cursoNombre,
      'Presentación': est.esEstudiante ? 'Sí' : 'No',
      'Acudiente / Teléfono': est.acudiente
        ? `${est.acudiente} - ${est.telefonoAcudiente}`
        : '—',
      'Valor Pagado': est.valorPagado,
      'Fecha Inscripción': formatearFecha(est.fechaInscripcion),
    }));

    const ws = XLSX.utils.json_to_sheet(datos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inscripciones');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'inscripciones.xlsx');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    const columnas = [
      'Tipo Doc', 'Documento', 'Nombre', 'Correo',
      'Teléfono', 'Curso', 'Presentación',
      'Pago', 'Valor', 'Fecha'
    ];

    const filas = filtrados.map((est) => [
      est.tipoDocumento,
      est.documento,
      `${est.nombres} ${est.apellidos}`,
      est.correo,
      est.telefono,
      est.cursoNombre,
      est.esEstudiante ? 'Sí' : 'No',
      est.formaPago,
      `$${est.valorPagado}`,
      formatearFecha(est.fechaInscripcion)
    ]);

    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 20,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [33, 20, 95] },
    });

    doc.text('Listado de Estudiantes Inscritos', 14, 15);
    doc.save('inscripciones.pdf');
  };

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

  const cursosUnicos = [...new Set(inscripciones.map((i) => i.cursoNombre))];

  return (
    <div className="pt-6 p-4 bg-gray-50">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h2 className="text-2xl font-bold text-institucional">Estudiantes Inscritos</h2>
        <button
          onClick={eliminarTodas}
          className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-300"
        >
          Eliminar todos
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre, documento o correo"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-institucional"
        />

        <select
          value={filtroCurso}
          onChange={(e) => setFiltroCurso(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institucional"
        >
          <option value="">Todos los cursos</option>
          {cursosUnicos.map((curso, i) => (
            <option key={i} value={curso}>{curso}</option>
          ))}
        </select>

        <select
          value={filtroPago}
          onChange={(e) => setFiltroPago(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institucional"
        >
          <option value="">Todos los pagos</option>
          <option value="confirmado">Pagos confirmados</option>
          <option value="pendiente">Pagos pendientes</option>
        </select>

        <select
          value={filtroPresentacion}
          onChange={(e) => setFiltroPresentacion(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-institucional"
        >
          <option value="">Todos</option>
          <option value="si">Familia Presentación</option>
          <option value="no">Externos</option>
        </select>
      </div>

      {/* Exportar */}
      <div className="flex flex-wrap justify-between items-center mb-6 text-sm text-gray-700">
        <p>
          Mostrando <strong>{filtrados.length}</strong> de <strong>{inscripciones.length}</strong> inscritos
        </p>
        <div className="flex gap-4">
          <button
            onClick={exportarExcel}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Exportar Excel
          </button>
          <button
            onClick={exportarPDF}
            className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Tarjetas responsivas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((est) => (
          <div key={est._id} className="bg-white border border-gray-300 rounded-lg shadow p-4 space-y-2">
            <div className="font-semibold text-lg text-gray-800">{est.nombres} {est.apellidos}</div>
            <div className="text-sm text-gray-500">Documento: {est.documento}</div>
            <div className="text-sm text-gray-500">Correo: {est.correo}</div>
            <div className="text-sm text-gray-500">Teléfono: {est.telefono}</div>
            <div className="text-sm text-gray-500">Curso: {est.cursoNombre}</div>
            <div className="text-sm text-gray-500">Presentación: {est.esEstudiante ? 'Sí' : 'No'}</div>
            <div className="text-sm text-gray-500">Acudiente: {est.acudiente ? `${est.acudiente} - ${est.telefonoAcudiente}` : '—'}</div>
            <div className="text-sm text-gray-500">Valor pagado: ${est.valorPagado?.toLocaleString()}</div>
            <div className="text-sm text-gray-500">
              Comprobante:{' '}
              {est.comprobante ? (
                <a href={`data:image/png;base64,${est.comprobante}`} target="_blank" rel="noreferrer">
                  <img src={`data:image/png;base64,${est.comprobante}`} alt="Comprobante" className="w-16 h-16 object-contain mt-1 rounded shadow" />
                </a>
              ) : (
                'No cargado'
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              {!est.pagoConfirmado && (
                <>
                  <button
                    onClick={() => confirmarPago(est._id)}
                    className="bg-green-600 text-white text-xs px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Confirmar pago
                  </button>
                  <button
                    onClick={() => enviarRecordatorio(est.correo, est.cursoNombre)}
                    className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Recordatorio
                  </button>
                </>
              )}
              <button
                onClick={() => eliminarEstudiante(est._id)}
                className="bg-red-600 text-white text-xs px-3 py-1 rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstudiantesInscritosTable;