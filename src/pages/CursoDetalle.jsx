import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL;
console.log("✅ API_URL usado en fetch:", API_URL);


const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#f2f2f2] rounded-lg p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <h4 className="font-semibold text-institucional">{title}</h4>
        <span className="text-xl font-bold text-institucional">{open ? '−' : '+'}</span>
      </div>
      {open && (
        <div
          className="mt-2 text-sm text-gray-600"
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
};

const CursoDetalle = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [curso, setCurso] = useState(null);
  const [descripcionExpandida, setDescripcionExpandida] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [inscripcionExitosa, setInscripcionExitosa] = useState(false);
  const [mostrarBotonFlotante, setMostrarBotonFlotante] = useState(true);
  const formularioRef = React.useRef(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState('');
  
  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cursos/con-inscritos`);
        const data = await res.json();
        const cursoEncontrado = data.find(c => c.slug === slug);
        setCurso(cursoEncontrado);
      } catch (err) {
        console.error('❌ Error al cargar el curso:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCurso();
  }, [slug]);

  

  useLayoutEffect(() => {
    if (!formularioRef.current) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('📌 ¿Formulario visible?:', entry.isIntersecting);
        setMostrarBotonFlotante(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
  
    observer.observe(formularioRef.current);
  
    return () => observer.disconnect();
  }, [mostrarFormulario, inscripcionExitosa]);

  const [documento, setDocumento] = useState('');
  const [tipoDoc, setTipoDoc] = useState('');
  const [datosEstudiante, setDatosEstudiante] = useState(null);
  const [yaInscrito, setYaInscrito] = useState(false);
  const [esMenor, setEsMenor] = useState(false);
  const [modoPago, setModoPago] = useState(''); // ✅ empieza vacío
  const [comprobanteBase64, setComprobanteBase64] = useState('');
  const [cargando, setCargando] = useState(false); // Estado para controlar si estamos cargando
  const [verificando, setVerificando] = useState(false);
  
  

// ✅ Detectar si es móvil
const [esMovil, setEsMovil] = useState(false);


useEffect(() => {
  const manejarResize = () => {
    setEsMovil(window.innerWidth < 768);
  };

  manejarResize(); // detectar al cargar
  window.addEventListener('resize', manejarResize);

  return () => window.removeEventListener('resize', manejarResize);
}, []);


  const calcularSiEsMenor = (fechaNacimiento) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const cumple = hoy.getMonth() > nacimiento.getMonth() ||
      (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() >= nacimiento.getDate());
    return (cumple ? edad : edad - 1) < 18;
  };

  const verificarEstudiante = async () => {
    console.log("🔎 Verificando inscripción con:", tipoDoc, documento);
    setVerificando(true);
  
    try {
      const url = `${API_URL}/api/inscripciones/estado/${encodeURIComponent(tipoDoc)}/${documento}`;
      console.log("📡 Consultando inscripciones en:", url);
  
      const res = await fetch(url);
  
      if (res.status === 404) {
        console.log("❌ No está inscrito aún. Buscando en estudiantes...");
  
        // 🔵 Nueva búsqueda en estudiantes
        const resEstudiante = await fetch(`${API_URL}/api/inscripciones/buscar-estudiante/${encodeURIComponent(tipoDoc)}/${documento}`);
        
        if (resEstudiante.status === 404) {
          console.log("❌ No encontrado ni como inscrito ni como estudiante.");
          setDatosEstudiante(null);
          setMostrarFormulario(true);
          setYaInscrito(false);
          return;
        }
  
        const estudiante = await resEstudiante.json();
        console.log("✅ Estudiante encontrado en base de datos de estudiantes:", estudiante);
  
        setDatosEstudiante(estudiante);
        setMostrarFormulario(true);
        setYaInscrito(false);
        return;
      }
  
      const estudianteInscrito = await res.json();
  
      const yaInscritoEnCurso = estudianteInscrito.cursos.some(c => c.cursoNombre === curso.nombre);
  
      if (yaInscritoEnCurso) {
        setYaInscrito(true);
        setMostrarFormulario(false);
        return;
      }
  
      setDatosEstudiante(estudianteInscrito);
      setMostrarFormulario(true);
      setYaInscrito(false);
  
    } catch (error) {
      console.error("❌ Error al verificar estudiante:", error);
      alert("Hubo un error al verificar. Intenta nuevamente.");
    } finally {
      setVerificando(false);
    }
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

  if (loading) return <p className="p-10 text-center">Cargando curso...</p>;
if (!curso) return <p className="p-10 text-center text-red-600">Curso no encontrado</p>;
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
    {(curso.horarios || [curso.horario]).map((h, index) => (
  <p key={index}>{h}</p>
))}
  </div>
</div>

{/* Descripción del curso - Fuera de la caja de precios */}
<div className="bg-[#f2f2f2] p-6 rounded-xl shadow-sm text-sm text-gray-800">
  <p className="text-institucional font-semibold mb-2 text-base">Descripción del curso</p>
  
  <p
  className={`text-gray-700 whitespace-pre-line ${
    esMovil && !descripcionExpandida ? 'line-clamp-3 overflow-hidden' : ''
  }`}
>
  {curso.descripcion}
</p>


  {/* Botón para expandir (solo en móviles) */}
{esMovil && (
  <button
    onClick={() => setDescripcionExpandida(!descripcionExpandida)}
    className="mt-2 text-sm text-institucional font-semibold hover:underline focus:outline-none"
  >
    {descripcionExpandida ? 'Ver menos' : 'Ver más'}
  </button>
)}
</div>

          <div>
            <AccordionItem title="Requisitos" content={curso.requisitos} />
            <AccordionItem title="Implementos necesarios" content={curso.implementos} />
            <AccordionItem title="Beneficios" content={curso.beneficios} />
            <AccordionItem title="Edad" content={curso.edad} />
            <AccordionItem title="Métodos de pago" content="Puedes realizar tu pago por consignación o transferencia a la cuenta de ahorros <strong>Bancolombia No. 39900005178</strong> a nombre del <strong>Instituto Parroquial Nuestra Señora de la Presentación</strong>. Recuerda subir el comprobante en el formulario de inscripción para completar tu proceso. Este curso se abrirá solo si se alcanza el número mínimo de inscritos." />
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
<div className="mt-1 space-y-2">
  <label className="block font-semibold">Tipo de documento:</label>
  <select
    className="w-full border p-2 rounded"
    value={tipoDoc}
    onChange={(e) => setTipoDoc(e.target.value)}
    required
  >
    <option value="">Selecciona tipo</option>
    <option value="Registro Civil">Registro Civil</option>
    <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
    <option value="Cédula de Extranjería">Cédula de Extranjería</option>
    <option value="Pasaporte">Pasaporte</option>
  </select>

  <label className="block font-semibold mt-2">Número de documento:</label>
  <input type="tel" className="w-full border p-2 rounded" value={documento} onChange={(e) => setDocumento(e.target.value)} required />

  <button
  className="mt-4 bg-institucional text-white px-5 py-2 rounded hover:bg-presentacionDark"
  onClick={verificarEstudiante}
  disabled={verificando}
>
  {verificando ? 'Consultando...' : 'Inscribirme'}
</button>
</div>

          {yaInscrito && (
            <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded mt-6">
              Ya estás inscrito en este curso 
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
                <form ref={formularioRef} id="formulario-inscripcion"
                onSubmit={async (e) => {
                  console.log("🟢 Formulario enviado");
                  e.preventDefault();
                  setCargando(true);
                
                  if (!comprobanteBase64) {
                    alert('⚠️ Debes subir el comprobante de pago antes de finalizar tu inscripción.');
                    setCargando(false);
                    return;
                  }
                
                  const form = e.target;
                
                  // 👉 Datos básicos obligatorios
                  const data = {
                    nombres: datosEstudiante?.nombres || form.nombres.value.trim(),
                    apellidos: datosEstudiante?.apellidos || form.apellidos.value.trim(),
                    documento,
                    tipoDocumento: tipoDoc,
                    correo: datosEstudiante?.correo || form.correo.value.trim(),
                    telefono: datosEstudiante?.telefono || form.telefono.value.trim(),
                    fechaNacimiento: form.fechaNacimiento.value,
                    cursoId: curso._id,
                    cursoNombre: curso.nombre,
                    esEstudiante: !!datosEstudiante,
                    formaPago: modoPago,
                    valorPagado: total,
                    pagoConfirmado: false,
                    comprobante: comprobanteBase64,
                  };
                  
                  // Si es menor, agregar datos de acudiente
                  if (esMenor) {
                    data.acudiente = form.acudiente.value.trim();
                    data.telefonoAcudiente = form.telefonoAcudiente.value.trim();
                  }
                  
                  // Si es Ajedrez, agregar horario seleccionado
                  if (curso.nombre === 'Ajedrez Iniciación') {
                    if (!horarioSeleccionado) {
                      alert('⚠️ Debes seleccionar un horario para Ajedrez.');
                      setCargando(false);
                      return;
                    }
                    data.horarioSeleccionado = horarioSeleccionado;
                  }

                  // ✅ Aseguramos que siempre existan estos campos
data.acudiente = data.acudiente || 'N/A';
data.telefonoAcudiente = data.telefonoAcudiente || 'N/A';
data.horarioSeleccionado = data.horarioSeleccionado || 'N/A';
                  
                  // 🚨 Validar manualmente antes de enviar
                  for (const [key, value] of Object.entries(data)) {
                    if (value === undefined || value === null || value === '' || (typeof value === 'string' && value.trim() === '')) {
                      alert(`⚠️ El campo "${key}" es obligatorio. Completa todos los datos.`);
                      setCargando(false);
                      return;
                    }
                  }
                
                  console.log('➡ Enviando inscripción a:', `${API_URL}/api/inscripciones`);
                  console.log("📤 Enviando datos:", data);
                
                  try {
                    const res = await fetch(`${API_URL}/api/inscripciones`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                    });
                
                    const result = await res.json();
                    if (res.ok) {
                      setInscripcionExitosa(true);
                    } else if (res.status === 409 || result.mensaje?.includes('inscrito')) {
                      setYaInscrito(true);
                      setMostrarFormulario(false);
                    } else {
                      console.error('❌ Error inesperado:', result);
                    }
                  } catch (err) {
                    console.error('❌ Error al enviar inscripción:', err);
                    alert('No se pudo conectar con el servidor');
                  } finally {
                    setCargando(false);
                  }
                }}

                  className="space-y-4"
                >
                  <label className="block font-semibold">Forma de pago:</label>
                  <select
                  className="w-full border p-2 rounded"
                  value={modoPago}
                  onChange={(e) => setModoPago(e.target.value)}
                  required
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="trimestral">Curso completo (3 meses)</option>
                    <option value="mensual">Pago mensual</option>
                  </select>

                  {/* Mostrar el campo de horario solo si el curso es "Ajedrez Iniciación" */}
                  {curso.nombre === 'Ajedrez Iniciación' || curso.nombre === 'Inglés para Niños Nivel A1 - A2' ? (
  <div className="mt-4">
    <label className="block font-semibold">Selecciona tu horario:</label>
    <select
      className="w-full border p-2 rounded"
      value={horarioSeleccionado}
      onChange={(e) => setHorarioSeleccionado(e.target.value)}
      required
    >
      <option value="">Selecciona un horario</option>
      {curso.horarios.map((h, index) => (
        <option key={index} value={h}>{h}</option>
      ))}
    </select>
  </div>
) : null}

                  <input name="nombres" type="text" placeholder="Nombres" className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`} defaultValue={datosEstudiante?.nombres || ''} readOnly={!!datosEstudiante} required />
                  <input name="apellidos" type="text" placeholder="Apellidos" className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`} defaultValue={datosEstudiante?.apellidos || ''} readOnly={!!datosEstudiante} required />
                  <input name="correo" type="email" placeholder="Correo electrónico" className={`w-full p-2 border rounded ${datosEstudiante ? 'bg-gray-100 text-gray-500' : ''}`} defaultValue={datosEstudiante?.correo || ''} readOnly={!!datosEstudiante} required />
                  <input name="telefono" type="tel" placeholder="Celular" className="w-full p-2 border rounded" defaultValue={datosEstudiante?.telefono || ''} required />
                  <label className="block font-semibold text-gray-700">Fecha de nacimiento:</label>
<input
  type="date"
  name="fechaNacimiento"
  className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-institucional placeholder-gray-500"
  required
  onChange={(e) => setEsMenor(calcularSiEsMenor(e.target.value))}
  placeholder="Selecciona tu fecha de nacimiento"
/>

                  {esMenor && (
                    <>
                      <input name="acudiente" type="text" placeholder="Nombre del acudiente" className="w-full p-2 border rounded" required />
                      <input name="telefonoAcudiente" type="tel" placeholder="Teléfono del acudiente" className="w-full p-2 border rounded" required />
                    </>
                  )}

<label className="block font-semibold">Comprobante de pago:</label>
<input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setComprobanteBase64(reader.result.split(',')[1]);
    };
    reader.readAsDataURL(file);
  }}
  className="w-full p-2 border rounded"
  required // <-- Aquí fijo
/>

{modoPago === 'mensual' && (
  <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded text-sm">
    Para el pago mensual, deberás cargar tus comprobantes mes a mes desde el <strong>enlace de consulta</strong> que recibirás por correo.
  </div>
)}

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

                  <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded shadow text-sm space-y-1">
  <p className="font-semibold text-blue-700">Forma de pago:</p>
  <p>Consignación o transferencia a la cuenta de ahorros <strong>Bancolombia No. 39900005178</strong>, a nombre del <strong>Instituto Parroquial Nuestra Señora de la Presentación</strong>.</p>
  <p className="mt-2">Adjunta el comprobante para validar tu inscripción.</p>
</div>

<button
  type="submit"
  disabled={cargando}
  onClick={() => console.log("✅ Clic en botón detectado")}
  style={{ zIndex: 9999, position: 'relative' }}
  className={`w-full py-2 rounded transition-all duration-200 ${
    cargando
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-institucional hover:bg-presentacionDark text-white'
  }`}
>
  {cargando ? 'Enviando...' : 'Finalizar inscripción'}
</button>
                </form>
              )}
            </div>
          )}
          
{/* Aviso sobre apertura del curso */}
<div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded shadow text-sm">
  ⚠️ <strong>Importante:</strong> Este curso se habilitará únicamente si se cumple con el número mínimo de personas inscritas.
  <br />
  ¡Comparte con tus amigos y aseguren juntos su cupo!
</div>



        </div>
      </div>

\{/* Botón flotante solo visible en móviles 
{mostrarBotonFlotante && !yaInscrito && !inscripcionExitosa && (
  <div className="md:hidden fixed bottom-4 left-0 right-0 flex justify-center z-50">
    <button
      onClick={() => {
        document
          .getElementById("formulario-inscripcion")
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
      className="bg-institucional text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-presentacionDark transition"
    >
      Inscribirme ahora
    </button>
  </div>
)}*/}
    </div>
  );
};

export default CursoDetalle;