import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const EditarCurso = () => {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cursos/con-inscritos`);
        const data = await res.json();
        const encontrado = data.find(c => c._id === id);
        if (encontrado) setCurso(encontrado);
      } catch (err) {
        console.error('❌ Error al cargar el curso:', err);
      }
    };
    fetchCurso();
  }, [id]);

  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/cursos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(curso),
      });

      if (res.ok) {
        alert('✅ Curso actualizado correctamente');
        navigate('/admin/cursos');
      } else {
        const error = await res.json();
        alert('❌ Error al actualizar: ' + error?.error);
      }
    } catch (err) {
      console.error('❌ Error al guardar cambios:', err);
      alert('Error de conexión con el servidor');
    }
  };

  if (!curso) return <p className="p-6">Cargando curso...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-institucional mb-6">Editar curso</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded">
        {[
          ['nombre', 'Nombre del curso'],
          ['precio', 'Precio'],
          ['imagen', 'URL de imagen'],
          ['modalidad', 'Modalidad'],
          ['duracion', 'Duración'],
          ['ubicacion', 'Ubicación'],
          ['horario', 'Horario'],
          ['edad', 'Edad'],
          ['reserva', 'Reserva'],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            <input
              name={name}
              value={curso[name] || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {[
          ['descripcion', 'Descripción'],
          ['requisitos', 'Requisitos'],
          ['implementos', 'Implementos'],
          ['beneficios', 'Beneficios'],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            <textarea
              name={name}
              value={curso[name] || ''}
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
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarCurso;