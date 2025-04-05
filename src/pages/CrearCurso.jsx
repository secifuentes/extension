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
        alert('Curso creado correctamente');
        navigate('/admin/cursos');
      } else {
        const error = await res.json();
        alert('Error al crear curso: ' + error?.error);
      }
    } catch (err) {
      console.error('Error al crear curso:', err);
      alert('Error de conexión con el servidor');
    }
  };

  const inputStyle =
    'w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-institucional transition';

  const labelStyle = 'block mb-1 font-medium text-gray-700';

  return (
    <div className="max-w-4xl mx-auto pt-10 p-6">
      <h1 className="text-3xl font-bold text-institucional mb-8 text-center md:text-left">
        Crear nuevo curso
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        {/* Inputs en dos columnas para pantallas grandes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <label className={labelStyle}>{label}</label>
              <input
                name={name}
                value={curso[name]}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
          ))}
        </div>

        {/* Textareas (campos largos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['descripcion', 'Descripción'],
            ['requisitos', 'Requisitos'],
            ['implementos', 'Implementos necesarios'],
            ['beneficios', 'Beneficios'],
          ].map(([name, label]) => (
            <div key={name}>
              <label className={labelStyle}>{label}</label>
              <textarea
                name={name}
                value={curso[name]}
                onChange={handleChange}
                className={`${inputStyle} resize-none`}
                rows={4}
                required
              />
            </div>
          ))}
        </div>

        {/* Botón */}
        <div className="text-center md:text-left pt-4">
          <button
            type="submit"
            className="bg-institucional text-white px-8 py-3 rounded-md hover:bg-presentacionDark transition duration-300"
          >
            Guardar curso
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCurso;