import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { datosCursos } from '../data/datosCursos';
import { estudiantesRegistrados } from '../data/estudiantes';
import { inscripciones } from '../data/inscripciones';

const API_URL = import.meta.env.VITE_API_URL;

const CursoDetalle = () => {
  const { id } = useParams();
  const curso = datosCursos[id];

  // Estado para gestionar el formulario y la inscripción
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [documento, setDocumento] = useState('');
  const [tipoDoc, setTipoDoc] = useState('');
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [inscripcionExitosa, setInscripcionExitosa] = useState(false); // Estado para mostrar mensaje de éxito
  const [comprobanteBase64, setComprobanteBase64] = useState('');

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

  // Función para manejar el archivo de comprobante de pago
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setComprobanteBase64(reader.result.split(',')[1]); // Convertimos a base64
    };
    reader.readAsDataURL(file);
  };

  // Función para manejar el envío de los datos de inscripción
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const form = e.target;

    const data = {
      nombres: datosEstudiante?.nombres || form.nombres.value,
      apellidos: datosEstudiante?.apellidos || form.apellidos.value,
      documento,
      tipoDocumento: tipoDoc,
      correo: datosEstudiante?.correo || form.correo.value,
      telefono: datosEstudiante?.telefono || form.telefono.value,
      fechaNacimiento: form.fechaNacimiento.value,
      cursoId: id,
      cursoNombre: curso.nombre,
      esEstudiante: !!datosEstudiante,
      formaPago: 'mensual', // O 'trimestral', depende de tu lógica
      valorPagado: 0, // Ajusta el valor real aquí
      pagoConfirmado: false, // El pago aún no está confirmado
      comprobante: comprobanteBase64,
    };

    try {
      const res = await fetch(`${API_URL}/api/inscripciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setInscripcionExitosa(true); // Mostrar el mensaje de éxito
      } else {
        alert('Error al guardar inscripción');
      }
    } catch (err) {
      console.error('❌ Error al enviar inscripción:', err);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="pt-[72px]">
      <div className="max-w-7xl mx-auto px-6 mt-2">
        <div className="inline-block bg-[#f9f9f9] py-2 px-4 text-xs text-gray-500 uppercase rounded">
          Extensión La Presentación Girardota
        </div>

        <div className="pt-2 pb-4 flex flex-col md:flex-row justify-between text-sm text-gray-600 border-b mt-2">
          <p>
            Inicio / Cursos de Extensión /{' '}
            <span className="text-institucional font-semibold">{curso.nombre}</span>
          </p>
          <button onClick={() => window.history.back()} className="text-institucional hover:underline">
            ← Volver a cursos
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        {/* Columna izquierda (sin cambios) */}
        <div className="flex flex-col gap-6">
          <div className="aspect-[3/2.7] overflow-hidden rounded-xl shadow-md">
            <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover" />
          </div>

          <div className="bg-[#f2f2f2] p-6 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 shadow-sm">
            {/* Detalles del curso (sin cambios) */}
          </div>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-institucional">{curso.nombre}</h2>

          {/* Resumen de precios */}
          <div className="border border-gray-200 p-6 rounded shadow space-y-6 bg-white">
            {/* Precios y descuentos (sin cambios) */}
          </div>

          {/* Descripción del curso */}
          <div className="mt-6">
            <p className="text-xl font-semibold text-gray-800">Descripción del curso</p>
            <p className="text-sm text-gray-600 mt-2">{curso.descripcion}</p>
          </div>

          {/* Título motivador */}
          <div className="mt-4 mb-2">
            <h3 className="text-xl font-semibold text-institucional leading-tight">
              Inscríbete al curso y asegura tu cupo
            </h3>
            <p className="text-sm text-gray-700 mt-1">
              Empieza ingresando tu tipo y número de documento.
            </p>
          </div>

          {/* Formulario de inscripción */}
          {inscripcionExitosa && (
            <div className="bg-green-50 border border-green-300 text-green-800 p-6 rounded shadow text-center">
              <h3 className="text-2xl font-bold">¡Felicitaciones! 🎉</h3>
              <p className="mt-2">Te has inscrito al curso <strong>{curso.nombre}</strong>.</p>
              <p className="mt-1">Pronto recibirás un mensaje confirmando tu pago una vez verifiquemos el comprobante que subiste.</p>
            </div>
          )}

          {/* Verificación de estudiante */}
          <div className="mt-6 space-y-2">
            <label className="block font-semibold">Tipo de documento:</label>
            <select
              className="w-full border p-2 rounded"
              value={tipoDoc}
              onChange={(e) => setTipoDoc(e.target.value)}
              required
            >
              <option value="">Selecciona tipo</option>
              <option value="rc">Registro Civil</option>
              <option value="ti">Tarjeta de Identidad</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ce">Cédula de Extranjería</option>
              <option value="pa">Pasaporte</option>
            </select>

            <label className="block font-semibold mt-2">Número de documento:</label>
            <input
              type="tel"
              className="w-full border p-2 rounded"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />

            <button
              className="mt-4 bg-institucional text-white px-5 py-2 rounded hover:bg-presentacionDark"
              onClick={verificarEstudiante}
            >
              Inscribirme
            </button>
          </div>

          {mostrarFormulario && !yaInscrito && (
            <form onSubmit={handleSubmit}>
              {/* Formulario de datos del estudiante */}
              <input
                name="nombres"
                type="text"
                placeholder="Nombres"
                className="w-full p-2 border rounded"
                defaultValue={datosEstudiante?.nombres || ''}
                readOnly={!!datosEstudiante}
                required
              />
              <input
                name="apellidos"
                type="text"
                placeholder="Apellidos"
                className="w-full p-2 border rounded"
                defaultValue={datosEstudiante?.apellidos || ''}
                readOnly={!!datosEstudiante}
                required
              />
              <input
                name="correo"
                type="email"
                placeholder="Correo electrónico"
                className="w-full p-2 border rounded"
                defaultValue={datosEstudiante?.correo || ''}
                readOnly={!!datosEstudiante}
                required
              />
              <input
                name="telefono"
                type="tel"
                placeholder="Celular"
                className="w-full p-2 border rounded"
                defaultValue={datosEstudiante?.telefono || ''}
                required
              />
              <input
                type="date"
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />

              <button type="submit" className="w-full bg-institucional text-white py-2 rounded hover:bg-presentacionDark">
                Finalizar inscripción
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CursoDetalle;