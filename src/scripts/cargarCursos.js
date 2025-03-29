import { datosCursos } from '../data/datosCursos';

const API_URL = import.meta.env.VITE_API_URL;

export const cargarCursosEnBackend = async () => {
  for (const [id, curso] of Object.entries(datosCursos)) {
    const data = {
      ...curso,
      nombre: curso.nombre,
      precio: curso.precio,
      imagen: curso.imagen,
      modalidad: curso.modalidad,
      duracion: curso.duracion,
      ubicacion: curso.ubicacion,
      horario: curso.horario,
      requisitos: curso.requisitos,
      implementos: curso.implementos,
      beneficios: curso.beneficios,
      edad: curso.edad,
      reserva: curso.reserva,
      descripcion: curso.descripcion,
    };

    try {
      const res = await fetch(`${API_URL}/api/cursos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log(`✅ Curso creado: ${data.nombre}`, result);
    } catch (err) {
      console.error(`❌ Error al crear curso: ${data.nombre}`, err);
    }
  }
};