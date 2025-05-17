import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const EnviarCorreo = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [asunto, setAsunto] = useState('');
  const [mensajeHtml, setMensajeHtml] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/inscripciones`)
      .then(res => res.json())
      .then(setInscripciones)
      .catch(err => console.error('Error al obtener inscripciones:', err));
  }, []);

  const toggleSeleccion = (id) => {
    setSeleccionados(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const enviarCorreos = async () => {
    if (seleccionados.length === 0) return alert('Selecciona al menos un estudiante.');
    if (!asunto || !mensajeHtml) return alert('Asunto y mensaje son obligatorios.');

    try {
      const res = await fetch(`${API_URL}/api/correos/enviar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inscripcionesIds: seleccionados, asunto, mensajeHtml })
      });

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      console.error('Error al enviar correos:', err);
      alert('Ocurrió un error al enviar los correos.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📩 Enviar correo a estudiantes</h2>

      <textarea
        className="w-full border p-2 mb-3 rounded"
        placeholder="Asunto del correo"
        value={asunto}
        onChange={(e) => setAsunto(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-4 rounded h-48"
        placeholder="Mensaje en HTML (puedes usar {{nombre}}, {{curso}}, {{horario}})"
        value={mensajeHtml}
        onChange={(e) => setMensajeHtml(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
        onClick={enviarCorreos}
      >
        Enviar correo
      </button>

      <h3 className="text-lg font-semibold mb-2">Seleccionar estudiantes:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {inscripciones.map((est) => (
          <label key={est._id} className="flex items-center space-x-2 bg-white shadow-sm p-3 rounded border">
            <input
              type="checkbox"
              checked={seleccionados.includes(est._id)}
              onChange={() => toggleSeleccion(est._id)}
            />
            <span>{est.nombres} {est.apellidos} — {est.cursoNombre}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default EnviarCorreo;