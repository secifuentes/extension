import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const ContabilidadResumen = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [costos, setCostos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setCargando(true);
      try {
        const [resCursos, resInscripciones, resCostos] = await Promise.all([
          fetch(`${API_URL}/api/cursos`),
          fetch(`${API_URL}/api/inscripciones`),
          fetch(`${API_URL}/api/costos`),
        ]);

        const dataCursos = await resCursos.json();
        const dataInscripciones = await resInscripciones.json();
        const dataCostos = await resCostos.json();

        setCursos(dataCursos);
        setInscripciones(dataInscripciones);
        setCostos(dataCostos);
      } catch (err) {
        console.error('❌ Error al cargar contabilidad:', err);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, []);

  const confirmados = inscripciones.filter(i => i.pagoConfirmado);
  const pendientes = inscripciones.filter(i => !i.pagoConfirmado);

  const totalIngresos = confirmados.reduce((acc, curr) => {
    const curso = cursos.find(c => c._id === curr.cursoId);
    const precio = curso?.precio || 0;
    const descuento = curr.esEstudiante ? 0.9 : 1;
    return acc + precio * descuento;
  }, 0);

  const totalCostos = costos.reduce((acc, curr) => acc + curr.valor, 0);
  const utilidadNeta = totalIngresos - totalCostos;

  const ingresosPorCurso = cursos.map((curso) => {
    const ingresos = confirmados
      .filter(i => i.cursoId === curso._id)
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
    <div className="bg-gray-50 p-4 sm:p-6 rounded-md min-h-screen">
      <h2 className="text-2xl font-bold text-institucional mb-6">Panel de Contabilidad</h2>

      {cargando ? (
        <p className="text-center text-gray-600">Cargando información contable...</p>
      ) : (
        <>
          {/* Totales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white text-sm font-medium mb-10">
            <div className="bg-[#21145F] p-4 rounded shadow">
              <p>Total ingresos confirmados</p>
              <p className="text-2xl font-bold">${totalIngresos.toLocaleString()}</p>
            </div>
            <div className="bg-yellow-500 text-black p-4 rounded shadow">
              <p>Total costos (egresos)</p>
              <p className="text-2xl font-bold">${totalCostos.toLocaleString()}</p>
            </div>
            <div className="bg-green-600 p-4 rounded shadow">
              <p>Utilidad neta</p>
              <p className="text-2xl font-bold">${utilidadNeta.toLocaleString()}</p>
            </div>
          </div>

          {/* Ingresos por curso */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3 text-institucional">Ingresos por Curso</h3>
            <div className="bg-white border rounded-md divide-y">
              {ingresosPorCurso.map((curso, i) => (
                <div key={i} className="flex justify-between px-4 py-3">
                  <span>{curso.nombre}</span>
                  <span className="font-semibold">${curso.ingresos.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Costos detallados */}
          <div>
            <h3 className="text-lg font-bold mb-3 text-institucional">Costos registrados</h3>
            <div className="bg-white border rounded-md divide-y">
              {costos.map((costo, i) => (
                <div key={i} className="flex justify-between px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium">{costo.descripcion}</p>
                    <p className="text-gray-500">{new Date(costo.fecha).toLocaleDateString()}</p>
                  </div>
                  <p className="font-semibold">${costo.valor.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContabilidadResumen;