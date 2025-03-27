import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { datosCursos } from '../data/datosCursos';
import { estudiantesRegistrados } from '../data/estudiantes';
import { inscripciones } from '../data/inscripciones';

const API_URL = import.meta.env.VITE_API_URL;

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#f2f2f2] rounded-lg p-4 mb-3 shadow-sm">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h4 className="font-semibold text-institucional">{title}</h4>
        <span className="text-xl font-bold text-institucional">
          {open ? '−' : '+'}
        </span>
      </div>
      {open && <p className="mt-2 text-sm text-gray-600">{content}</p>}
    </div>
  );
};

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
  const [comprobanteBase64, setComprobanteBase64] = useState('');

  const calcularSiEsMenor = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const cumple =
      hoy.getMonth() > nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
    return (cumple ? edad : edad - 1) < 18;
  };

  const verificarEstudiante = () => {
    const yaExiste = inscripciones.find(
      (i) => i.documento === documento && i.cursoId === id
    );
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

  let total = 0;
  let descuentoAplicado = 0;
  let textoDescuento = 'No aplica';

  if (modoPago === 'mensual') {
    if (datosEstudiante) {
      total = valorMensual * 0.9;
      descuentoAplicado = 10;
      textoDescuento = '10% (Familia Presentación)';
    } else {
      total = valorMensual;
    }
  } else {
    if (datosEstudiante) {
      total = valorTrimestral * 0.85;
      descuentoAplicado = 15;
      textoDescuento = '15% (10% familia + 5% curso completo)';
    } else {
      total = valorTrimestral * 0.95;
      descuentoAplicado = 5;
      textoDescuento = '5% (por pagar curso completo)';
    }
  }

  total = parseInt(total.toFixed(0));

  if (!curso) return <p className="p-10 text-center">Curso no encontrado</p>;

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
          <button
            onClick={() => window.history.back()}
            className="text-institucional hover:underline"
          >
            ← Volver a cursos
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 mt-4 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
        {/* Columna Izquierda */}
        <div className="flex flex-col gap-6">
          <div className="aspect-[3/2.7] overflow-hidden rounded-xl shadow-md">
            <img
              src={curso.imagen}
              alt={curso.nombre}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-[#f2f2f2] p-6 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 shadow-sm">
            <div>
              <p className="text-institucional font-semibold">Modalidad:</p>
              <p>{curso.modalidad}</p>
            </div>
            <div>
              <p className="text-institucional font-semibold">Duración:</p>
              <p>{curso.duracion}</p>
            </div>
            <div>
              <p className="text-institucional font-semibold">Ubicación:</p>
              <p>{curso.ubicacion}</p>
            </div>
            <div>
              <p className="text-institucional font-semibold">Inicio:</p>
              <p>{curso.inicio}</p>
            </div>
            <div>
              <p className="text-institucional font-semibold">Fin:</p>
              <p>{curso.fin}</p>
            </div>
          </div>

          <div>
            <AccordionItem title="Requisitos" content={curso.requisitos} />
            <AccordionItem title="Implementos necesarios" content={curso.implementos} />
            <AccordionItem title="Beneficios" content={curso.beneficios} />
            <AccordionItem title="Edad" content={curso.edad} />
            <AccordionItem title="Curso con reserva previa" content={curso.reserva} />
          </div>
        </div>

        {/* Continúa en PARTE 2 */}
        {/* Columna Derecha */}
<div className="flex flex-col gap-6">
  <h2 className="text-3xl font-bold text-institucional">{curso.nombre}</h2>

  {/* Precios */}
  <div className="border border-gray-200 p-6 rounded shadow space-y-6 bg-white">
    <div>
      <p className="text-xl font-semibold text-gray-800">Valor mensual</p>
      <p className="text-3xl font-bold text-institucional">${valorMensual.toLocaleString()}</p>
    </div>

    <div>
      <p className="text-xl font-semibold text-gray-800 mt-4">Curso completo (3 meses)</p>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-gray-500 line-through text-xl">${valorTrimestral.toLocaleString()}</span>
        <span className="text-2xl font-bold text-green-600">${total.toLocaleString()}</span>
        <span className="text-sm text-green-700 font-medium">({textoDescuento})</span>
      </div>
    </div>

    <div className="bg-[#f1f5fb] border border-institucional p-5 rounded text-[15px] text-gray-800 leading-relaxed">
      Si haces parte de la <strong>Familia Presentación</strong>, tienes un <strong>10% exclusivo</strong> en tu inscripción.
      <br />
      Y al pagar los tres meses, se suma el <strong>5% que ya incluye el curso</strong>.
      <br />
      <span className="font-semibold text-institucional">
        ¡Disfruta un 15% de descuento total por anticipado!
      </span>
    </div>
  </div>

  {/* Descripción */}
  <h3 className="text-lg font-semibold text-institucional">Descripción del curso</h3>
  <p className="text-sm text-gray-700">{curso.descripcion}</p>

  {/* Formulario inscripción */}
  <div className="mt-6 space-y-2">
    <label className="block font-semibold">Tipo de documento:</label>
    <select
      className="w-full border p-2 rounded"
      value={tipoDoc}
      onChange={(e) => setTipoDoc(e.target.value)}
      required
    >
      <option value="">Selecciona tipo</option>
      <option value="cc">Cédula</option>
      <option value="ti">Tarjeta de Identidad</option>
    </select>

    <label className="block font-semibold mt-2">Número de documento:</label>
    <input
      type="text"
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
          <p className="mt-1">Estamos verificando tu comprobante de pago. Te enviaremos una confirmación pronto.</p>
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
              pagoConfirmado: false,
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
          <label className="block font-semibold">Forma de pago:</label>
          <select
            className="w-full border p-2 rounded"
            value={modoPago}
            onChange={(e) => setModoPago(e.target.value)}
          >
            <option value="trimestral">Curso completo (3 meses)</option>
            <option value="mensual">Pago mensual</option>
          </select>

          <input
            name="nombres"
            type="text"
            placeholder="Nombres"
            className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`}
            defaultValue={datosEstudiante?.nombres || ''}
            readOnly={!!datosEstudiante}
            required
          />

          <input
            name="apellidos"
            type="text"
            placeholder="Apellidos"
            className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`}
            defaultValue={datosEstudiante?.apellidos || ''}
            readOnly={!!datosEstudiante}
            required
          />
          {/* Aquí continúa con el resto del formulario */}
        </form>
      )}
    </div>
  )}
</div>
</div>
</div>
);
};

export default CursoDetalle;