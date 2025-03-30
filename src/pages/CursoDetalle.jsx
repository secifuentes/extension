import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { estudiantesRegistrados } from '../data/estudiantes';
import { inscripciones } from '../data/inscripciones';

const API_URL = import.meta.env.VITE_API_URL;

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#f2f2f2] rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <h4 className="font-semibold text-institucional">{title}</h4>
        <span className="text-xl font-bold text-institucional">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <p className="mt-2 text-sm text-gray-600" style={{ whiteSpace: 'pre-line' }}>
          {content}
        </p>
      )}
    </div>
  );
};

const CursoDetalle = () => {
  const { slug } = useParams();
  const [curso, setCurso] = useState(null);

useEffect(() => {
  const fetchCurso = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cursos/con-inscritos`);
      const data = await res.json();
      console.log('Datos recibidos:', data);  // Esto imprime los datos recibidos
      const cursoEncontrado = data.find(c => c.slug === slug);
      setCurso(cursoEncontrado);
    } catch (err) {
      console.error('❌ Error al cargar el curso:', err);
    }
  };

  fetchCurso();
}, [slug]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [documento, setDocumento] = useState('');
  const [tipoDoc, setTipoDoc] = useState('');
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [esMenor, setEsMenor] = useState(false);
  const [inscripcionExitosa, setInscripcionExitosa] = useState(false);
  const [modoPago, setModoPago] = useState('trimestral');
  const [comprobanteBase64, setComprobanteBase64] = useState('');
  const [cargando, setCargando] = useState(false); // Estado para controlar si estamos cargando

  const calcularSiEsMenor = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const cumple = hoy.getMonth() > nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
    return (cumple ? edad : edad - 1) < 18;
  };

  const verificarEstudiante = () => {
    const yaExiste = inscripciones.find((i) => i.documento === documento && i.cursoId === curso._id);
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

  const valorMensual = curso ? curso.precio : 0;
  const valorTrimestral = valorMensual * 3;

  let total = 0;
  let descuentoAplicado = 0;
  let textoDescuento = 'No aplica';

  if (modoPago === 'mensual') {
    if (datosEstudiante) {
      total = valorMensual * 0.95;
      descuentoAplicado = 5;
      textoDescuento = '5% (Familia Presentación)';
    } else {
      total = valorMensual;
    }
  } else {
    if (datosEstudiante) {
      total = valorTrimestral * 0.90;
      descuentoAplicado = 10;
      textoDescuento = '10% (5% familia + 5% curso completo)';
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
          <button onClick={() => window.history.back()} className="text-institucional hover:underline">
            ← Volver a cursos
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">

        {/* Columna izquierda */}
        <div className="flex flex-col gap-6">
          <div className="aspect-[3/2.7] overflow-hidden rounded-xl shadow-md">
            <img src={curso.imagen} alt={curso.nombre} className="w-full h-full object-cover" />
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
    <p className="text-institucional font-semibold">Horario:</p>
    <p>{curso.horario}</p>
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

        {/* Columna derecha */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-institucional">{curso.nombre}</h2>

          {/* Bloque visual de precios */}
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

  <div className="bg-gradient-to-br from-[#f7f9fc] to-white border border-institucional rounded-xl p-6 shadow-md">
    <div className="flex items-center gap-3 mb-3">
      <div className="text-2xl">💙</div>
      <h3 className="text-lg font-bold text-institucional">Beneficio para Familia Presentación</h3>
    </div>

    <p className="text-gray-700 mb-3">
      Accede a un <span className="font-semibold text-institucional">descuento exclusivo</span> solo por ser parte de la casa:
    </p>

    <ul className="list-disc list-inside space-y-1 text-gray-800">
      <li><strong>5%</strong> si pagas el valor mensual.</li>
      <li><strong>10%</strong> si pagas el curso completo (3 meses).</li>
    </ul>

    <p className="mt-4 text-sm text-gray-700">
      Ingresa tu documento en el formulario y el descuento se aplicará automáticamente.
    </p>

    <p className="mt-1 font-semibold text-institucional text-sm">¡Aprovéchalo!</p>
  </div>

  {datosEstudiante && modoPago === 'trimestral' && (
    <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800 font-medium">
      Obtuviste un <strong>10% de descuento</strong> por ser parte de la Familia Presentación y pagar el curso completo.
      <br />
      <span className="font-bold">Total a pagar: ${total.toLocaleString()}</span>
    </div>
  )}
</div>

{/* Descripción del curso - Fuera de la caja de precios */}
<div className="mt-6">
  <p className="text-xl font-semibold text-gray-800">Descripción del curso</p>
  <p className="text-sm text-gray-600 mt-2" style={{ whiteSpace: 'pre-line' }}>
    {curso.descripcion}
  </p>
</div>

{/* Banner informativo con ícono estilizado y texto atractivo */}
<div className="bg-white border-l-4 border-blue-600 text-blue-700 p-4 mb-6 flex items-center rounded-lg shadow-lg">
  <div className="mr-4 text-3xl">
    <i className="fas fa-info-circle"></i> {/* Ícono de información estilizado */}
  </div>
  <div>
    <p className="text-xl font-semibold">Inscríbete al curso y asegura tu cupo</p>
    <p className="text-sm mt-1 text-gray-600">
    Ingresa los datos de la persona que realizará el curso
    </p>
  </div>
</div>

{/* Formulario de inscripción */}
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
  <input type="tel" className="w-full border p-2 rounded" value={documento} onChange={(e) => setDocumento(e.target.value)} required />

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
                      cursoId: curso._id,
                      cursoNombre: curso.nombre,
                      esEstudiante: !!datosEstudiante,
                      formaPago: modoPago,
                      valorPagado: total,
                      pagoConfirmado: false,
                      comprobante: comprobanteBase64,
                    };

                    console.log('➡ Enviando inscripción a:', `${API_URL}/api/inscripciones`);
                    console.log("📤 Enviando datos:", data);
                    console.log("➡ Enviando inscripción a:", `${API_URL}/api/inscripciones`);
                    

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
                      console.error('❌ Error al enviar inscripción:', err);
                      alert('No se pudo conectar con el servidor');
                    }
                  }}
                  className="space-y-4"
                >
                  <label className="block font-semibold">Forma de pago:</label>
                  <select className="w-full border p-2 rounded" value={modoPago} onChange={(e) => setModoPago(e.target.value)}>
                    <option value="trimestral">Curso completo (3 meses)</option>
                    <option value="mensual">Pago mensual</option>
                  </select>

                  <input name="nombres" type="text" placeholder="Nombres" className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`} defaultValue={datosEstudiante?.nombres || ''} readOnly={!!datosEstudiante} required />
                  <input name="apellidos" type="text" placeholder="Apellidos" className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`} defaultValue={datosEstudiante?.apellidos || ''} readOnly={!!datosEstudiante} required />
                  <input name="correo" type="email" placeholder="Correo electrónico" className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`} defaultValue={datosEstudiante?.correo || ''} readOnly={!!datosEstudiante} required />
                  <input name="telefono" type="tel" placeholder="Celular" className="w-full p-2 border rounded" defaultValue={datosEstudiante?.telefono || ''} required />
                  <label className="block font-semibold text-gray-700">Fecha de nacimiento:</label>
                  <input type="date" name="fechaNacimiento" className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-institucional placeholder-gray-500" required onChange={(e) => setEsMenor(calcularSiEsMenor(e.target.value))} placeholder="Selecciona tu fecha de nacimiento" />

                  {esMenor && (
                    <>
                      <input name="acudiente" type="text" placeholder="Nombre del acudiente" className="w-full p-2 border rounded" required />
                      <input name="telefonoAcudiente" type="tel" placeholder="Teléfono del acudiente" className="w-full p-2 border rounded" required />
                    </>
                  )}

<input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setComprobanteBase64(reader.result.split(',')[1]); // solo el base64
    };
    reader.readAsDataURL(file);
  }}
  className="w-full p-2 border rounded"
  required
/>

                  {/* RESUMEN DEL PAGO FINAL */}
                  <div className="bg-white border border-dashed border-institucional p-4 rounded text-sm space-y-2">
                    <p className="font-semibold mb-2 text-institucional text-base">Resumen del pago</p>

                    <p><strong>Curso:</strong> {curso.nombre}</p>
                    <p><strong>Forma de pago:</strong> {modoPago === 'mensual' ? 'Pago mensual' : 'Curso completo (3 meses)'}</p>
                    <p><strong>Valor original:</strong> ${modoPago === 'mensual' ? valorMensual.toLocaleString() : valorTrimestral.toLocaleString()}</p>
                    <p><strong>Descuento aplicado:</strong> {textoDescuento}</p>

                    {datosEstudiante && modoPago === 'trimestral' && (
  <div className="bg-green-50 border border-green-200 p-3 rounded text-sm text-green-800 font-medium">
    Obtuviste un <strong>10% de descuento</strong> por ser parte de la Familia Presentación y pagar el curso completo.
    <br />
    <span className="font-bold">Total a pagar: ${total.toLocaleString()}</span>
  </div>
)}

                    <div className="mt-3 pt-3 border-t">
                      <p className="text-lg font-bold text-institucional">
                        Total a pagar: ${total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-institucional text-white py-2 rounded hover:bg-presentacionDark">
                    Finalizar inscripción
                  </button>
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