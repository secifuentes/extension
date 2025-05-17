import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const EnviarCorreo = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [inscripciones, setInscripciones] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [asunto, setAsunto] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/cursos`)
      .then(res => res.json())
      .then(setCursos);
  }, []);

  const cargarInscritos = async () => {
    const res = await fetch(`${API_URL}/api/inscripciones`);
    const data = await res.json();
    const confirmados = data.filter(i => i.cursoNombre === cursoSeleccionado && i.pagoConfirmado);
    setInscripciones(confirmados);
    setSeleccionados(confirmados.map(i => i._id)); // Por defecto todos seleccionados
  };

  const toggleSeleccionado = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const enviarCorreos = async () => {
    if (!asunto || !mensaje || seleccionados.length === 0) {
      alert("Debes escribir el asunto, el mensaje y seleccionar estudiantes.");
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_URL}/api/correos/enviar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inscripcionesIds: seleccionados,
          asunto,
          mensajeHtml: mensaje
        }),
      });

      const data = await res.json();
      alert(`✅ ${data.message}`);
    } catch (err) {
      console.error(err);
      alert("❌ Error al enviar correos");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-institucional">📧 Enviar correos a estudiantes</h1>

      <label className="block mb-2 font-medium">Selecciona curso:</label>
      <select
        value={cursoSeleccionado}
        onChange={(e) => setCursoSeleccionado(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">-- Selecciona un curso --</option>
        {cursos.map((c) => (
          <option key={c._id} value={c.nombre}>{c.nombre}</option>
        ))}
      </select>

      <button
        onClick={cargarInscritos}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        Cargar estudiantes
      </button>

      {inscripciones.length > 0 && (
        <>
          <p className="mb-2 text-sm text-gray-700">
            <strong>{inscripciones.length}</strong> estudiantes encontrados.
          </p>

          <div className="mb-4">
            <label className="block font-medium">Asunto del correo:</label>
            <input
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              placeholder="Ej: Bienvenido al curso de Inglés"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium">
  Mensaje (usa <code>{{nombre}}</code>, <code>{{curso}}</code>, <code>{{horario}}</code>):
</label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              rows={6}
              className="w-full border p-2 rounded mt-1"
              placeholder="Ej: Hola {{nombre}}, recuerda que tu curso de {{curso}} inicia el martes. Tu horario es {{horario}}."
            />
          </div>

          <div className="mb-6 space-y-2">
            <h3 className="font-bold">Selecciona los estudiantes:</h3>
            {inscripciones.map((i) => (
              <label key={i._id} className="block text-sm">
                <input
                  type="checkbox"
                  checked={seleccionados.includes(i._id)}
                  onChange={() => toggleSeleccionado(i._id)}
                  className="mr-2"
                />
                {i.nombres} {i.apellidos} - {i.correo}
              </label>
            ))}
          </div>

          <button
            onClick={enviarCorreos}
            disabled={enviando}
            className={`w-full py-3 rounded text-white font-bold ${
              enviando ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {enviando ? 'Enviando...' : 'Enviar correos'}
          </button>
        </>
      )}
    </div>
  );
};

export default EnviarCorreo;