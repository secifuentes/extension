import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const InscripcionesTable = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // Estado para controlar el estudiante seleccionado
  const [search, setSearch] = useState('');

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredInscripciones = inscripciones.filter((inscripcion) =>
    inscripcion.nombres.toLowerCase().includes(search.toLowerCase()) ||
    inscripcion.apellidos.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (ins) => {
    if (selectedStudent && selectedStudent._id === ins._id) {
      setSelectedStudent(null); // Si el estudiante ya está seleccionado, lo deseleccionamos
    } else {
      setSelectedStudent(ins); // Seleccionamos el estudiante
    }
  };

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

  const enviarRecordatorio = async (correo, cursoNombre) => {
    try {
      const res = await fetch(`${API_URL}/api/recordatorio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, cursoNombre }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(`📬 Recordatorio enviado a ${correo}`);
      } else {
        alert('❌ Error al enviar recordatorio');
      }
    } catch (err) {
      console.error('Error al enviar recordatorio:', err);
      alert('❌ No se pudo enviar recordatorio');
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

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={handleSearch}
        className="mb-4 px-4 py-2 border rounded"
      />

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
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredInscripciones.map((ins) => (
            <React.Fragment key={ins._id}>
              <tr
                onClick={() => handleRowClick(ins)} // Al hacer clic, muestra los detalles
                className="cursor-pointer"
              >
                <td className="px-4 py-2 border">
                  {ins.nombres} {ins.apellidos}
                </td>
                {/* Resto de las celdas */}
              </tr>
              {selectedStudent && selectedStudent._id === ins._id && (
                <tr>
                  <td colSpan="10" className="px-4 py-2 border bg-gray-100">
                    <div>
                      <h3 className="text-lg font-semibold">Detalles del Estudiante</h3>
                      <p><strong>Correo:</strong> {ins.correo}</p>
                      <p><strong>Teléfono:</strong> {ins.telefono}</p>
                      <p><strong>Curso:</strong> {ins.cursoNombre}</p>
                      <p><strong>Forma de pago:</strong> {ins.formaPago}</p>
                      <p><strong>Valor pagado:</strong> ${ins.valorPagado?.toLocaleString()}</p>
                      <p><strong>Fecha de inscripción:</strong> {formatearFecha(ins.fechaInscripcion)}</p>
                      <button
                        onClick={() => confirmarPago(ins._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
                      >
                        Confirmar pago
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InscripcionesTable;