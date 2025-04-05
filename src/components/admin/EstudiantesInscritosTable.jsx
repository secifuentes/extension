import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaPlus, FaMinus } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const EstudiantesInscritosTable = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCurso, setFiltroCurso] = useState('');
  const [filtroPago, setFiltroPago] = useState('');
  const [filtroPresentacion, setFiltroPresentacion] = useState('');
  const [expandedRows, setExpandedRows] = useState({});

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

  const handleExpandRow = (id) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
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

  return (
    <div className="pt-16 p-4 overflow-x-auto bg-gray-50">
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <h2 className="text-2xl font-bold text-institucional">Estudiantes Inscritos</h2>
      </div>

      {/* Buscador y filtros */}
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
          {/** Aquí se deben listar los cursos */}
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

      {/* 📄 Exportar y resumen */}
      <div className="flex flex-wrap justify-between items-center mb-6 text-sm text-gray-700">
        <p>
          Mostrando <strong>{filtrados.length}</strong> de <strong>{inscripciones.length}</strong> inscritos
        </p>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Exportar Excel
          </button>
          <button className="bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition duration-300">
            Exportar PDF
          </button>
        </div>
      </div>

      {/* 🧾 Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm rounded-lg shadow-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Tipo Doc</th>
              <th className="px-4 py-2">Documento</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Curso</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((est) => (
              <tr key={est._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{est.tipoDocumento}</td>
                <td className="px-4 py-2">{est.documento}</td>
                <td className="px-4 py-2">{est.nombres} {est.apellidos}</td>
                <td className="px-4 py-2">{est.cursoNombre}</td>
                <td className="px-4 py-2 flex flex-col gap-2">
                  <button
                    onClick={() => handleExpandRow(est._id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {expandedRows[est._id] ? <FaMinus /> : <FaPlus />} Más
                  </button>
                  {expandedRows[est._id] && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p><strong>Correo:</strong> {est.correo}</p>
                      <p><strong>Teléfono:</strong> {est.telefono}</p>
                      <p><strong>Acudiente:</strong> {est.acudiente || 'N/A'}</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EstudiantesInscritosTable;