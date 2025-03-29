import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const CrearCurso = () => {
  const [curso, setCurso] = useState({
    nombre: '',
    precio: '',
    imagen: '',
    modalidad: '',
    duracion: '',
    ubicacion: '',
    descripcion: '',
    requisitos: '',
    implementos: '',
    beneficios: '',
    edad: '',
    reserva: '',
    horario: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/cursos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso),
      });

      if (res.ok) {
        alert('✅ Curso creado correctamente');
        navigate('/admin/cursos');
      } else {
        const error = await res.json();
        alert('❌ Error al crear curso: ' + error?.error);
      }
    } catch (err) {
      console.error('❌ Error al crear curso:', err);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-institucional mb-6">Crear nuevo curso</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
        {[
          ['nombre', 'Nombre del curso'],
          ['precio', 'Precio (solo número)'],
          ['imagen', 'URL de la imagen (/cursos/archivo.jpg)'],
          ['modalidad', 'Modalidad'],
          ['duracion', 'Duración'],
          ['ubicacion', 'Ubicación'],
          ['horario', 'Horario'],
          ['edad', 'Rango de edad'],
          ['reserva', '¿Requiere reserva?'],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            <input
              name={name}
              value={curso[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {[
          ['descripcion', 'Descripción'],
          ['requisitos', 'Requisitos'],
          ['implementos', 'Implementos necesarios'],
          ['beneficios', 'Beneficios'],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            <textarea
              name={name}
              value={curso[name]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows={3}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
        >
          Guardar curso
        </button>
      </form>
    </div>
  );
};

export default CrearCurso;