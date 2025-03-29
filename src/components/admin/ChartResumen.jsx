import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { inscripciones } from '../../data/inscripciones'; // Suponiendo que las inscripciones siguen siendo estáticas

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartResumen = () => {
  const [cursos, setCursos] = useState([]); // Estado para almacenar los cursos

  // Cargar cursos desde la API o base de datos
  useEffect(() => {
    const fetchCursos = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cursos`);
      const data = await res.json();
      setCursos(data); // Guardamos los cursos en el estado
    };
    fetchCursos();
  }, []);

  // Si los cursos no han cargado aún, mostrar un mensaje
  if (cursos.length === 0) {
    return <div>Cargando cursos...</div>;
  }

  const cursosIds = cursos.map((curso) => curso._id); // Obtenemos los ids de los cursos

  const inscritosPorCurso = cursosIds.map((id) =>
    inscripciones.filter((i) => i.cursoId.toString() === id).length
  );

  const ingresosPorCurso = cursosIds.map((id) =>
    inscripciones
      .filter((i) => i.cursoId.toString() === id && i.pagoConfirmado)
      .reduce((acc, curr) => {
        const curso = cursos.find(c => c._id === id);
        const precio = curso ? curso.precio : 0;
        const descuento = curr.esEstudiante ? 0.9 : 1;
        return acc + precio * descuento;
      }, 0)
  );

  const data = {
    labels: cursosIds.map((id) => cursos.find((curso) => curso._id === id)?.nombre), // Obtenemos el nombre del curso
    datasets: [
      {
        label: 'Estudiantes inscritos',
        data: inscritosPorCurso,
        backgroundColor: '#21145F',
      },
      {
        label: 'Ingresos ($)',
        data: ingresosPorCurso,
        backgroundColor: '#facc15',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full">
      <h3 className="text-lg font-semibold mb-4 text-institucional">Inscripciones e ingresos por curso</h3>
      <Bar data={data} />
    </div>
  );
};

export default ChartResumen;