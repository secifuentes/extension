import React, { useState, useEffect } from 'react';

const DocentesTable = () => {
  const [docentes, setDocentes] = useState([]);
  const [cursos, setCursos] = useState([]); // Estado para cursos cargados desde la base de datos

  // Cargar docentes y cursos desde la API
  useEffect(() => {
    const fetchDocentes = async () => {
      // Simulamos la carga de docentes, puedes reemplazar esto con tu backend
      const docentesData = await fetch('/api/docentes'); // Reemplaza con tu URL real
      const docentesJson = await docentesData.json();
      setDocentes(docentesJson);
    };

    const fetchCursos = async () => {
      // Cargar cursos desde la base de datos
      const cursosData = await fetch('/api/cursos'); // Reemplaza con tu URL real
      const cursosJson = await cursosData.json();
      setCursos(cursosJson); // Almacenamos los cursos en el estado
    };

    fetchDocentes();
    fetchCursos();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para marcar pago
  const marcarPagado = (index) => {
    const actualizados = [...docentes];
    actualizados[index].pago = true;
    setDocentes(actualizados);
    alert('✅ Quincena marcada como pagada.');
  };

  // Función para actualizar observación
  const actualizarObservacion = (index, nuevaObs) => {
    const actualizados = [...docentes];
    actualizados[index].observaciones = nuevaObs;
    setDocentes(actualizados);
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4 text-institucional">Gestión de Docentes</h3>

      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Nombre</th>
            <th className="p-3 border">Correo</th>
            <th className="p-3 border">Cursos asignados</th>
            <th className="p-3 border">Pago</th>
            <th className="p-3 border">Observaciones</th>
            <th className="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((doc, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-3 border">{doc.nombre}</td>
              <td className="p-3 border">{doc.correo}</td>
              <td className="p-3 border">
                <ul className="list-disc list-inside">
                  {doc.cursos.map((id) => {
                    const curso = cursos.find(c => c._id === id); // Buscar el curso en los cursos cargados
                    return <li key={id}>{curso ? curso.nombre : 'Curso no encontrado'}</li>;
                  })}
                </ul>
              </td>
              <td className="p-3 border">
                {doc.pago ? (
                  <span className="text-green-700">✔ Pagado</span>
                ) : (
                  <span className="text-red-600">❌ Pendiente</span>
                )}
              </td>
              <td className="p-3 border">
                <textarea
                  rows={2}
                  className="w-full p-2 border rounded text-sm"
                  value={doc.observaciones}
                  onChange={(e) => actualizarObservacion(i, e.target.value)}
                />
              </td>
              <td className="p-3 border">
                {!doc.pago && (
                  <button
                    onClick={() => marcarPagado(i)}
                    className="bg-institucional text-white px-3 py-1 rounded hover:bg-presentacionDark text-sm"
                  >
                    Marcar pagado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocentesTable;