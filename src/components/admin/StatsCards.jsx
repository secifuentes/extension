import React from 'react';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Estudiantes activos</h3>
        <p className="text-3xl font-bold mt-2">120</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Cursos activos</h3>
        <p className="text-3xl font-bold mt-2">9</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Ingresos</h3>
        <p className="text-3xl font-bold mt-2">$4.500.000</p>
      </div>
      <div className="bg-white p-6 rounded shadow text-center">
        <h3 className="text-lg font-semibold text-institucional">Docentes asignados</h3>
        <p className="text-3xl font-bold mt-2">5</p>
      </div>
    </div>
  );
};

export default StatsCards;