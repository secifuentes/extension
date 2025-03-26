import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

import { inscripciones } from '../../data/inscripciones';
import { datosCursos } from '../../data/datosCursos';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartResumen = () => {
  const cursosIds = Object.keys(datosCursos); // ejemplo: ["1", "2", ..., "9"]

  const inscritosPorCurso = cursosIds.map((id) =>
    inscripciones.filter((i) => i.cursoId.toString() === id).length
  );

  const ingresosPorCurso = cursosIds.map((id) =>
    inscripciones
      .filter((i) => i.cursoId.toString() === id && i.pagoConfirmado)
      .reduce((acc, curr) => {
        const precio = datosCursos[id].precio;
        const descuento = curr.esEstudiante ? 0.9 : 1;
        return acc + precio * descuento;
      }, 0)
  );

  const data = {
    labels: cursosIds.map((id) => datosCursos[id].nombre),
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