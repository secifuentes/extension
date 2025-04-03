import React, { useState } from 'react';

const FaqItem = ({ pregunta, respuesta }) => {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm transition hover:shadow-md">
      <button
        onClick={() => setAbierto(!abierto)}
        className="w-full text-left flex justify-between items-center text-institucional font-semibold text-lg focus:outline-none"
      >
        <span>{pregunta}</span>
        <span className="text-xl transition-transform duration-300">
          {abierto ? '−' : '+'}
        </span>
      </button>

      <div
        className={`mt-3 text-gray-700 text-base transition-all duration-300 ease-in-out ${
          abierto ? 'max-h-96 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <p className="pt-2 leading-relaxed">{respuesta}</p>
      </div>
    </div>
  );
};

export default FaqItem;