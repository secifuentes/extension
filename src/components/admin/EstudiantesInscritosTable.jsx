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
  const [expandirTarjeta, setExpandirTarjeta] = useState(null);
  const [modalImagen, setModalImagen] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetchInscripciones();
  }, []);

  const fetchInscripciones = async () => {
    try {
      setCargando(true);
      const res = await fetch(`${API_URL}/api/inscripciones`);
      const data = await res.json();

      const ordenado = [...data].sort((a, b) => new Date(b.fechaInscripcion) - new Date(a.fechaInscripcion));
      setInscripciones(ordenado);
    } catch (err) {
      console.error('❌ Error al cargar inscripciones:', err);
    } finally {
      setCargando(false);
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

  const confirmarPagoMensual = async (id, mes) => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones/pagos-mensuales/${id}/confirmar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mes })
      });
  
      if (res.ok) {
        alert(`✅ Pago del ${mes} confirmado`);
        fetchInscripciones(); // Recarga los datos
      } else {
        alert('❌ Error al confirmar el pago');
      }
    } catch (err) {
      console.error('Error confirmando pago mensual:', err);
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

  const cursosUnicos = [...new Set(inscripciones.map((i) => i.cursoNombre))];

  const filtrados = inscripciones
    .filter((est) => {
      const texto = `${est.nombres} ${est.apellidos} ${est.documento} ${est.correo}`.toLowerCase();
      return texto.includes(busqueda.toLowerCase());
    })
    .filter((est) => (filtroCurso ? est.cursoNombre === filtroCurso : true))
    .filter((est) =>
      filtroPago === 'pendiente' ? !est.pagoConfirmado :
      filtroPago === 'confirmado' ? est.pagoConfirmado : true
    )
    .filter((est) =>
      filtroPresentacion === 'si' ? est.esEstudiante :
      filtroPresentacion === 'no' ? !est.esEstudiante : true
    );

  const exportarExcel = () => {
    const datos = filtrados.map((est) => ({
      Nombre: `${est.nombres} ${est.apellidos}`,
      Documento: est.documento,
      Correo: est.correo,
      Curso: est.cursoNombre,
      Presentación: est.esEstudiante ? 'Sí' : 'No',
      Valor: est.valorPagado,
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
    const columnas = ['Nombre', 'Curso', 'Correo', 'Valor', 'Presentación'];
    const filas = filtrados.map((est) => [
      `${est.nombres} ${est.apellidos}`,
      est.cursoNombre,
      est.correo,
      `$${est.valorPagado}`,
      est.esEstudiante ? 'Sí' : 'No',
    ]);

    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 20,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [33, 20, 95] },
    });

    doc.text('Listado de Estudiantes Inscritos', 14, 15);
    doc.save('inscripciones.pdf');
  };

  return (
    <div className="pt-6 px-4 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold text-institucional">Estudiantes Inscritos</h2>
        <button
          onClick={eliminarTodas}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Eliminar todos
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="p-3 border rounded-md w-full sm:w-1/3"
        />
        <select value={filtroCurso} onChange={(e) => setFiltroCurso(e.target.value)} className="p-3 border rounded-md">
          <option value="">Todos los cursos</option>
          {cursosUnicos.map((curso, i) => (
            <option key={i} value={curso}>{curso}</option>
          ))}
        </select>
        <select value={filtroPago} onChange={(e) => setFiltroPago(e.target.value)} className="p-3 border rounded-md">
          <option value="">Todos los pagos</option>
          <option value="confirmado">Confirmado</option>
          <option value="pendiente">Pendiente</option>
        </select>
        <select value={filtroPresentacion} onChange={(e) => setFiltroPresentacion(e.target.value)} className="p-3 border rounded-md">
          <option value="">Todos</option>
          <option value="si">Presentación</option>
          <option value="no">Externos</option>
        </select>
      </div>

      {/* Exportar */}
      <div className="flex justify-between mb-4 text-sm text-gray-700">
        <p>Mostrando <strong>{filtrados.length}</strong> de <strong>{inscripciones.length}</strong> inscritos</p>
        <div className="flex gap-4">
          <button onClick={exportarExcel} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Exportar Excel</button>
          <button onClick={exportarPDF} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Exportar PDF</button>
        </div>
      </div>

      {/* Cargando */}
      {cargando && (
        <p className="text-center text-gray-600 mt-10 text-lg">Cargando estudiantes inscritos...</p>
      )}

{/* Tarjetas */}
      {!cargando && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filtrados.map((est, idx) => (
            <div key={est._id} className="bg-white border rounded-lg shadow p-4">
              <h3 className="font-bold text-lg mb-1">{est.nombres} {est.apellidos}</h3>
              <p className="text-sm"><strong>Curso:</strong> {est.cursoNombre}</p>
              <p className="text-sm"><strong>Presentación:</strong> {est.esEstudiante ? 'Sí' : 'No'}</p>
              <p className="text-sm"><strong>Valor:</strong> ${est.valorPagado?.toLocaleString()}</p>

              <div className="my-2">
                {est.comprobante ? (
                  <button onClick={() => setModalImagen(est.comprobante)} className="text-blue-600 underline text-sm">Ver comprobante</button>
                ) : <span className="text-gray-400 text-sm">Sin comprobante</span>}
              </div>

              <div className="flex flex-col gap-2 mt-2">
                {!est.pagoConfirmado && (
                  <>
                    <button
                    onClick={() => confirmarPago(est._id)}
                    className="w-full bg-green-600 text-white text-xs py-2 px-3 rounded hover:bg-green-700 transition"
                    >
                      Confirmar pago
                    </button>
                    
                    <button
                      onClick={() => enviarRecordatorio(est.correo, est.cursoNombre)}
                      className="w-full bg-yellow-500 text-white text-xs py-2 px-3 rounded hover:bg-yellow-600 transition"
                    >
                      Recordatorio
                    </button>
                  </>
                )}
                <button
                  onClick={() => eliminarEstudiante(est._id)}
                  className="bw-full bg-red-600 text-white text-xs py-2 px-3 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>

              <button
              onClick={() => setExpandirTarjeta(expandirTarjeta === est._id ? null : est._id)}
                className="text-blue-500 text-sm mt-3"
              >
                {expandirTarjeta === idx ? 'Ver menos' : 'Ver más'}
              </button>

              {expandirTarjeta === est._id && (
                <div className="mt-3 text-sm text-gray-600 space-y-1 break-words max-w-full">
                  <p><strong>Correo:</strong> {est.correo}</p>
                  <p><strong>Documento:</strong> {est.documento}</p>
                  <p><strong>Teléfono:</strong> {est.telefono}</p>
                  <p><strong>Acudiente:</strong> {est.acudiente || '—'} {est.telefonoAcudiente && `- ${est.telefonoAcudiente}`}</p>
                  <p><strong>Forma de pago:</strong> {est.formaPago || '—'}</p>
                  <p><strong>Fecha inscripción:</strong> {formatearFecha(est.fechaInscripcion)}</p>
                </div>
              )}
              

              {est.formaPago === 'mensual' && (
  <div className="mt-4 border-t pt-3 space-y-2">
    <p className="text-sm font-semibold text-institucional">Pagos mensuales adicionales:</p>

    {[2, 3].map((mes) => {
      const pago = est.pagosMensuales?.find((p) => p.mes === mes);
      const tieneComprobante = !!pago?.comprobante;
      const estaVerificado = pago?.estado === 'verificado';

      return (
        <div key={mes} className="space-y-1">
          <p><strong>Mes {mes}:</strong></p>

          {tieneComprobante ? (
            <button
              onClick={() => setModalImagen(pago.comprobante)}
              className="text-blue-600 underline text-xs"
            >
              Ver comprobante mes {mes}
            </button>
          ) : (
            <p className="text-xs text-gray-500">No enviado aún</p>
          )}

          {estaVerificado ? (
            <span className="ml-2 text-green-700 font-semibold text-xs">✅ Confirmado</span>
          ) : (
            <button
              disabled={!tieneComprobante}
              onClick={() => confirmarPagoMensual(est._id, mes)}
              className={`ml-2 px-2 py-1 rounded text-xs transition ${
                tieneComprobante
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirmar mes {mes}
            </button>
          )}
        </div>
      );
    })}
  </div>
)}
            </div>
          ))}
        </div>
      )}

      {/* Modal comprobante */}
      {modalImagen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full relative">
            <button onClick={() => setModalImagen(null)} className="absolute top-2 right-3 text-xl font-bold text-gray-600">&times;</button>
            <img src={`data:image/png;base64,${modalImagen}`} alt="Comprobante" className="w-full rounded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EstudiantesInscritosTable;