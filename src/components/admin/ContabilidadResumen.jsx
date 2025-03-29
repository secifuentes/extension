import React, { useState, useEffect } from 'react';
import { inscripciones } from '../../data/inscripciones'; // Suponiendo que las inscripciones se mantienen así

const ContabilidadResumen = () => {
  const [cursos, setCursos] = useState([]);  // Estado para almacenar los cursos

  // Cargar cursos desde la API o base de datos
  useEffect(() => {
    const fetchCursos = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/cursos`);
      const data = await res.json();
      setCursos(data); // Establecer los cursos en el estado
    };

    fetchCursos();
  }, []);

  // Si los cursos no han cargado aún, mostrar un mensaje
  if (cursos.length === 0) {
    return <div>Cargando cursos...</div>;
  }

  // Filtrar inscripciones confirmadas y pendientes
  const confirmados = inscripciones.filter(i => i.pagoConfirmado);
  const pendientes = inscripciones.filter(i => !i.pagoConfirmado);

  // Calcular total de ingresos confirmados
  const totalIngresos = confirmados.reduce((acc, curr) => {
    const curso = cursos.find(c => c._id === curr.cursoId); // Obtener el curso correspondiente
    const precio = curso ? curso.precio : 0;
    const descuento = curr.esEstudiante ? 0.9 : 1;
    return acc + precio * descuento;
  }, 0);

  // Calcular ingresos por curso
  const ingresosPorCurso = cursos.map((curso) => {
    const ingresos = confirmados
      .filter(i => i.cursoId.toString() === curso._id.toString())
      .reduce((acc, i) => {
        const descuento = i.esEstudiante ? 0.9 : 1;
        return acc + curso.precio * descuento;
      }, 0);
    return {
      nombre: curso.nombre,
      ingresos,
    };
  });

  return (
    <div className="bg-white p-6 rounded shadow w-full space-y-6">
      <h3 className="text-lg font-semibold text-institucional">Resumen Contable</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="bg-[#21145F] text-white p-4 rounded">
          <p>Total ingresos confirmados</p>
          <p className="text-2xl font-bold">${totalIngresos.toLocaleString()}</p>
        </div>
        <div className="bg-yellow-400 text-black p-4 rounded">
          <p>Pagos pendientes</p>
          <p className="text-2xl font-bold">{pendientes.length}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <p>Pagos confirmados</p>
          <p className="text-2xl font-bold">{confirmados.length}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-bold text-institucional mb-2">Ingresos por curso:</h4>
        <ul className="space-y-2">
          {ingresosPorCurso.map((c, i) => (
            <li key={i} className="border-b py-2 flex justify-between">
              <span>{c.nombre}</span>
              <span className="font-medium">${c.ingresos.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContabilidadResumen;