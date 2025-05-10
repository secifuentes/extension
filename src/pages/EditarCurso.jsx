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

  if (!curso) return <p className="text-center py-10 text-gray-500 text-lg">Cargando curso...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-institucional mb-8 text-center sm:text-left">
        Editar Curso
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md"
      >
        {[
  ['nombre', 'Nombre del curso'],
  ['precio', 'Precio'],
  ['imagen', 'URL de imagen'],
  ['modalidad', 'Modalidad'],
  ['duracion', 'Duración'],
  ['ubicacion', 'Ubicación'],
  ['edad', 'Edad'],
  ['reserva', 'Reserva'],
].map(([name, label]) => (
  <div key={name} className="flex flex-col">
    <label className="text-sm text-gray-700 mb-1">{label}</label>
    <input
      name={name}
      value={curso[name] || ''}
      onChange={handleChange}
      className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-institucional outline-none transition"
      required
    />
  </div>
))}

{/* Campo de horarios separado */}
<div className="sm:col-span-2 flex flex-col">
  <label className="text-sm text-gray-700 mb-1">Horarios (uno por línea)</label>
  <textarea
    name="horarios"
    value={(curso.horarios || []).join('\n')}
    onChange={(e) =>
      setCurso({
        ...curso,
        horarios: e.target.value.split('\n').map(h => h.trim()).filter(Boolean),
      })
    }
    className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-institucional outline-none transition resize-y"
    rows={4}
    required
  />
</div>
        {[
          ['descripcion', 'Descripción'],
          ['requisitos', 'Requisitos'],
          ['implementos', 'Implementos'],
          ['beneficios', 'Beneficios'],
        ].map(([name, label]) => (
          <div key={name} className="sm:col-span-2 flex flex-col">
            <label className="text-sm text-gray-700 mb-1">{label}</label>
            <textarea
              name={name}
              value={curso[name] || ''}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 focus:ring-2 focus:ring-institucional outline-none transition resize-none"
              rows={3}
              required
            />
          </div>
        ))}

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-institucional text-white py-3 rounded-lg font-semibold hover:bg-presentacionDark transition"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCurso;