import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EstadoEstudiante = () => {
  const [tipoDoc, setTipoDoc] = useState('');
  const [documento, setDocumento] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const [adminUsuario, setAdminUsuario] = useState('');
  const [adminClave, setAdminClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const buscarEstado = async () => {
    setResultado(null);
    if (!tipoDoc || !documento) return alert('Por favor selecciona el tipo de documento y escribe el número');

    // Mapeo de códigos a nombres completos
    const tipoDocMap = {
      rc: 'Registro Civil',
      ti: 'Tarjeta de Identidad',
      cc: 'Cédula de Ciudadanía',
      ce: 'Cédula de Extranjería',
      pa: 'Pasaporte',
    };

    const tipoDocNombre = tipoDocMap[tipoDoc];

    try {
      const res = await fetch(`${API_URL}/api/inscripciones/estado/${tipoDocNombre}/${documento}`);
      const data = await res.json();
      if (res.ok) {
        setResultado(data);
      } else {
        setResultado({ tipo: 'no-encontrado' });
      }
    } catch (err) {
      console.error('Error al consultar estado:', err);
      setResultado({ tipo: 'error' });
    }
  };

  const validarAdmin = () => {
    if (adminUsuario === 'secifuentes' && adminClave === '1624Scc$') {
      navigate('/admin');
    } else {
      setErrorLogin('Usuario o contraseña incorrectos');
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-institucional">Consulta tu estado de inscripción</h2>
        <p className="text-sm text-gray-600">Verifica si estás inscrito en un curso de Extensión y el estado de tu pago.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm mb-1 font-semibold">Tipo de documento</label>
            <select
              className="w-full border rounded p-2"
              value={tipoDoc}
              onChange={(e) => setTipoDoc(e.target.value)}
            >
              <option value="">Selecciona</option>
              <option value="rc">Registro Civil</option>
              <option value="ti">Tarjeta de Identidad</option>
              <option value="cc">Cédula de Ciudadanía</option>
              <option value="ce">Cédula de Extranjería</option>
              <option value="pa">Pasaporte</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 font-semibold">Número de documento</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
            />
          </div>

          <button
            onClick={buscarEstado}
            className="bg-institucional hover:bg-presentacionDark text-white px-6 py-2 rounded mt-2 sm:mt-0"
          >
            Consultar
          </button>
        </div>

        {/* Resultado */}
        {resultado?.tipo === 'no-encontrado' && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-4 rounded">
            No encontramos registros con ese documento.
          </div>
        )}

        {resultado?.tipo === 'error' && (
          <div className="text-red-700 bg-red-100 border p-4 rounded">
            Ocurrió un error al consultar. Intenta nuevamente.
          </div>
        )}

        {resultado?.tipo !== 'no-encontrado' && resultado?.cursos?.length > 0 && (
          <div className="bg-gray-50 p-4 border rounded space-y-3">
            <p><strong>Nombre:</strong> {resultado.nombres} {resultado.apellidos}</p>
            <p><strong>Correo:</strong> {resultado.correo || 'No disponible'}</p>

            <h4 className="text-lg font-semibold text-institucional mt-4">Cursos inscritos:</h4>
            <ul className="space-y-2">
              {resultado.cursos.map((c, i) => (
                <li key={i} className="border p-3 rounded text-sm bg-white">
                  <p><strong>Curso:</strong> {c.cursoNombre}</p>
                  <p><strong>Forma de pago:</strong> {c.formaPago}</p>
                  <p>
                    <strong>Estado del pago:</strong>{' '}
                    {c.pagoConfirmado ? (
                      <span className="text-green-700 font-semibold">Pago confirmado ✅</span>
                    ) : (
                      <span className="text-yellow-700 font-semibold">Pendiente de verificación ⏳</span>
                    )}
                  </p>
                  <p><strong>Fecha de inscripción:</strong> {formatearFecha(c.fechaInscripcion)}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Acceso oculto para admin */}
      <div className="mt-10 text-center">
        {!mostrarAdmin ? (
          <button
            onClick={() => setMostrarAdmin(true)}
            className="text-xs text-gray-500 hover:underline"
          >
            ℹ️ Acceso restringido
          </button>
        ) : (
          <div className="mt-4 max-w-md mx-auto bg-white border rounded p-4 space-y-2 shadow">
            <h4 className="font-semibold text-sm">Panel administrativo</h4>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full border rounded p-2 text-sm"
              value={adminUsuario}
              onChange={(e) => setAdminUsuario(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full border rounded p-2 text-sm"
              value={adminClave}
              onChange={(e) => setAdminClave(e.target.value)}
            />
            {errorLogin && <p className="text-red-600 text-xs">{errorLogin}</p>}
            <button
              onClick={validarAdmin}
              className="bg-institucional text-white px-4 py-1.5 rounded hover:bg-presentacionDark w-full text-sm"
            >
              Ingresar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstadoEstudiante;