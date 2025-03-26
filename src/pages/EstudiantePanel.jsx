import React from 'react';

const EstudiantePanel = () => {
  return (
    <div className="max-w-3xl mx-auto pt-6 pb-12">
      <h2 className="text-xl font-bold mb-4">Mi Panel</h2>
      <div className="border p-4 rounded shadow">
        <p><strong>Nombre:</strong> Jonathan Cardona Elejalde</p>
        <p><strong>Documento:</strong> 1035877236</p>
        <p><strong>Correo:</strong> jocardonae@gmail.com</p>
        <hr className="my-3" />
        <h3 className="font-semibold mb-2">Mis cursos</h3>
        <ul className="text-sm space-y-1">
          <li>🎵 Iniciación Musical – <span className="text-green-600">Pago confirmado</span></li>
          <li>📘 Inglés Teens B1 – <span className="text-red-600">Pago pendiente</span></li>
        </ul>
        <button className="mt-4 bg-institucional text-white px-3 py-2 rounded">Subir comprobante</button>
      </div>
    </div>
  );
};

export default EstudiantePanel;