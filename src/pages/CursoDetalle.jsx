import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { datosCursos } from '../data/datosCursos';
import { estudiantesRegistrados } from '../data/estudiantes';
import { inscripciones } from '../data/inscripciones';

const API_URL = import.meta.env.VITE_API_URL;

const CursoDetalle = () => {
  const { id } = useParams();
  const curso = datosCursos[id];

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [documento, setDocumento] = useState('');
  const [tipoDoc, setTipoDoc] = useState('');
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [esMenor, setEsMenor] = useState(false);
  const [inscripcionExitosa, setInscripcionExitosa] = useState(false);
  const [modoPago, setModoPago] = useState('trimestral');

  const calcularSiEsMenor = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const cumple = hoy.getMonth() > nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
    return (cumple ? edad : edad - 1) < 18;
  };

  const verificarEstudiante = () => {
    const yaExiste = inscripciones.find((i) => i.documento === documento && i.cursoId === id);
    if (yaExiste) {
      setYaInscrito(true);
      setMostrarFormulario(false);
      return;
    }

    const estudiante = estudiantesRegistrados.find(
      (e) => e.documento === documento && e.tipoDocumento === tipoDoc
    );

    setDatosEstudiante(estudiante || null);
    setYaInscrito(false);
    setMostrarFormulario(true);
  };

  const valorMensual = curso.precio;
  const valorTrimestral = valorMensual * 3;

  // Cálculo de descuentos:
  let total = 0;
  let descuentoAplicado = 0;

  if (modoPago === 'mensual') {
    if (datosEstudiante) {
      total = valorMensual * 0.9;
      descuentoAplicado = 10;
    } else {
      total = valorMensual;
    }
  } else {
    if (datosEstudiante) {
      total = valorTrimestral * 0.85;
      descuentoAplicado = 15;
    } else {
      total = valorTrimestral * 0.95;
      descuentoAplicado = 5;
    }
  }

  total = parseInt(total.toFixed(0));

  if (!curso) return <p className="p-10 text-center">Curso no encontrado</p>;

  return (
    <div className="pt-[72px] max-w-4xl mx-auto px-6 pb-16">
      <h2 className="text-3xl font-bold text-institucional mb-2">{curso.nombre}</h2>
      <p className="text-sm text-gray-700 mb-6">{curso.descripcion}</p>

      <div className="bg-[#f2f2f2] p-6 rounded-xl shadow space-y-2 text-sm text-gray-800 mb-8">
        <p><strong>💰 Valor mensual:</strong> ${valorMensual.toLocaleString()}</p>
        <p><strong>📦 Valor curso completo (3 meses):</strong> <span className="line-through text-gray-500">${valorTrimestral.toLocaleString()}</span></p>

        {modoPago === 'mensual' && datosEstudiante && (
          <p className="text-green-600 font-bold">🎁 Descuento familiar: 10% aplicado</p>
        )}

        {modoPago === 'trimestral' && (
          <p className="text-green-600 font-bold">
            🎁 {datosEstudiante ? 'Descuento total 15% aplicado (familia + curso completo)' : '5% de descuento por pagar el curso completo'}
          </p>
        )}
      </div>

      {/* Verificación */}
      <div className="space-y-4">
        <label>Tipo de documento:</label>
        <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} className="border p-2 rounded w-full">
          <option value="">Selecciona tipo</option>
          <option value="cc">Cédula</option>
          <option value="ti">Tarjeta de Identidad</option>
        </select>

        <label>Número de documento:</label>
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <button
          onClick={verificarEstudiante}
          className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
        >
          Inscribirme
        </button>
      </div>

      {yaInscrito && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mt-6">
          Ya estás inscrito en este curso 🎓
        </div>
      )}

      {mostrarFormulario && !yaInscrito && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
          {inscripcionExitosa ? (
            <div className="bg-green-50 border border-green-300 text-green-800 p-6 rounded shadow text-center">
              <h3 className="text-2xl font-bold">¡Felicitaciones! 🎉</h3>
              <p className="mt-2">Te has inscrito al curso <strong>{curso.nombre}</strong>.</p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;

                const data = {
                  nombres: datosEstudiante?.nombres || form.nombres.value,
                  apellidos: datosEstudiante?.apellidos || form.apellidos.value,
                  documento,
                  tipoDocumento: tipoDoc,
                  correo: datosEstudiante?.correo || form.correo.value,
                  telefono: datosEstudiante?.telefono || form.telefono.value,
                  fechaNacimiento: form.fechaNacimiento.value,
                  cursoId: parseInt(id),
                  cursoNombre: curso.nombre,
                  esEstudiante: !!datosEstudiante,
                  formaPago: modoPago,
                  valorPagado: total,
                  pagoConfirmado: false
                };

                try {
                  const res = await fetch(`${API_URL}/api/inscripciones`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                  });

                  const result = await res.json();
                  if (res.ok) {
                    setInscripcionExitosa(true);
                  } else {
                    alert('Error al guardar inscripción');
                  }
                } catch (err) {
                  alert('No se pudo conectar con el servidor');
                  console.error(err);
                }
              }}
              className="space-y-4"
            >
              <input name="nombres" type="text" placeholder="Nombres" defaultValue={datosEstudiante?.nombres || ''} readOnly={!!datosEstudiante} className="w-full p-2 border rounded" required />
              <input name="apellidos" type="text" placeholder="Apellidos" defaultValue={datosEstudiante?.apellidos || ''} readOnly={!!datosEstudiante} className="w-full p-2 border rounded" required />
              <input name="correo" type="email" placeholder="Correo electrónico" defaultValue={datosEstudiante?.correo || ''} readOnly={!!datosEstudiante} className="w-full p-2 border rounded" required />
              <input name="telefono" type="tel" placeholder="Teléfono" defaultValue={datosEstudiante?.telefono || ''} readOnly={!!datosEstudiante} className="w-full p-2 border rounded" required />
              <input name="fechaNacimiento" type="date" className="w-full p-2 border rounded" required onChange={(e) => setEsMenor(calcularSiEsMenor(e.target.value))} />

              <label className="block font-semibold mt-4">Forma de pago:</label>
              <select className="w-full border p-2 rounded" value={modoPago} onChange={(e) => setModoPago(e.target.value)}>
                <option value="trimestral">Curso completo (3 meses)</option>
                <option value="mensual">Pago mensual</option>
              </select>

              <input type="file" className="w-full p-2 border rounded" required />

              <div className="bg-white border border-dashed border-institucional p-4 rounded text-sm">
                <p className="font-semibold mb-2 text-institucional">Resumen del pago:</p>
                <p>Curso: <span className="font-medium">{curso.nombre}</span></p>
                <p>Forma de pago: {modoPago === 'mensual' ? 'Mensual' : 'Curso completo (3 meses)'}</p>
                <p>Valor original: ${modoPago === 'mensual' ? valorMensual.toLocaleString() : valorTrimestral.toLocaleString()}</p>
                <p>Descuento aplicado: {descuentoAplicado ? `${descuentoAplicado}%` : 'No aplica'}</p>
                <p className="mt-2 font-bold text-lg text-institucional">Total a pagar: ${total.toLocaleString()}</p>
              </div>

              <button type="submit" className="w-full bg-institucional text-white py-2 rounded hover:bg-presentacionDark">Finalizar inscripción</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CursoDetalle;