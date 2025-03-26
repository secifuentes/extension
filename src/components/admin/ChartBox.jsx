import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { inscripciones } from '../../data/inscripciones';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartBox = () => {
  const pagosConfirmados = inscripciones.filter(i => i.pagoConfirmado).length;
  const pagosPendientes = inscripciones.filter(i => !i.pagoConfirmado).length;

  const data = {
    labels: ['Pagos Confirmados', 'Pagos Pendientes'],
    datasets: [
      {
        label: 'Estado de pagos',
        data: [pagosConfirmados, pagosPendientes],
        backgroundColor: ['#21145F', '#facc15'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-institucional">Resumen de pagos</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default ChartBox;