import React, { useState, useEffect } from 'react';

const EnviarCorreo = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [inscripciones, setInscripciones] = useState([]);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/cursos`)
      .then((res) => res.json())
      .then((data) => setCursos(data));
  }, []);

  const cargarInscritos = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/inscripciones`);
    const data = await res.json();
    const filtrados = data.filter(i => i.cursoNombre === cursoSeleccionado && i.pagoConfirmado);
    setInscripciones(filtrados);
  };

  const enviarCorreos = async () => {
    if (!cursoSeleccionado) return alert("Selecciona un curso");

    setEnviando(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/correos/enviar-masivo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursoNombre: cursoSeleccionado }),
      });

      const data = await res.json();
      alert(`✅ ${data.enviados} correos enviados con éxito.`);
    } catch (err) {
      console.error('❌ Error al enviar correos:', err);
      alert('Ocurrió un error al enviar los correos.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-institucional mb-4">📧 Enviar correos a inscritos</h1>

      <label className="block mb-2 font-medium">Selecciona un curso:</label>
      <select
        value={cursoSeleccionado}
        onChange={(e) => setCursoSeleccionado(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      >
        <option value="">-- Selecciona un curso --</option>
        {cursos.map((c, i) => (
          <option key={i} value={c.nombre}>{c.nombre}</option>
        ))}
      </select>

      <button
        onClick={cargarInscritos}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Ver inscritos confirmados
      </button>

      {inscripciones.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-1">
            <strong>{inscripciones.length}</strong> inscritos confirmados en <strong>{cursoSeleccionado}</strong>.
          </p>
          <button
            onClick={enviarCorreos}
            className={`mt-2 px-6 py-2 rounded text-white ${enviando ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={enviando}
          >
            {enviando ? 'Enviando...' : 'Enviar correos'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EnviarCorreo;