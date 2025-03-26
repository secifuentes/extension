import React from 'react';

const DocentePanel = () => {
  return (
    <div className="max-w-4xl mx-auto pt-6 pb-12">
      <h2 className="text-2xl font-bold mb-6">Panel Docente</h2>

      <div className="border p-4 rounded shadow mb-6">
        <p><strong>Nombre:</strong> Profe María López</p>
        <p><strong>Correo:</strong> docente@lapresentaciongirardota.edu.co</p>
        <p><strong>Cursos a cargo:</strong></p>
        <ul className="ml-4 list-disc text-sm mt-2">
          <li>Inglés Teens (12-14) B1</li>
          <li>Ajedrez</li>
        </ul>
      </div>

      <div className="border p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Opciones</h3>
        <button className="bg-institucional text-white px-3 py-2 rounded mb-2 block">Ver estudiantes inscritos</button>
        <button className="bg-institucional text-white px-3 py-2 rounded mb-2 block">Enviar correo a estudiantes</button>
        <button className="bg-institucional text-white px-3 py-2 rounded block">Marcar certificados</button>
      </div>
    </div>
  );
};

export default DocentePanel;