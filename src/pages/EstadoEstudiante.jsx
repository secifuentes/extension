import React, { useState } from 'react';
import { inscripciones } from '../data/inscripciones';
import { estudiantesRegistrados } from '../data/estudiantes';
import { useNavigate } from 'react-router-dom';

const adminCredenciales = {
  usuario: 'secifuentes',
  clave: '1624Scc$',
};

const EstadoEstudiante = () => {
  const [documento, setDocumento] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [correoAdmin, setCorreoAdmin] = useState('');
  const [clave, setClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const navigate = useNavigate();

  const buscarEstado = () => {
    const cursosInscritos = inscripciones.filter(i => i.documento === documento);
    const estudiante = estudiantesRegistrados.find(e => e.documento === documento);

    if (!estudiante && cursosInscritos.length === 0) {
      setResultado({ tipo: 'no-encontrado' });
      return;
    }

    setResultado({
      tipo: 'ok',
      nombre: estudiante ? `${estudiante.nombres} ${estudiante.apellidos}` : 'No registrado',
      correo: estudiante?.correo || '',
      estado: estudiante ? 'Activo' : 'No registrado',
      cursos: cursosInscritos.map(i => ({
        ...i,
        curso: datosCursos[i.cursoId] || { nombre: 'Curso no encontrado' },
      })),
    });
  };

  const validarAdmin = () => {
    if (correoAdmin === adminCredenciales.usuario && clave === adminCredenciales.clave) {
      navigate('/admin');
    } else {
      setErrorLogin('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-institucional mb-4 text-center">Consulta tu estado de inscripción</h2>
      <p className="mb-6 text-center text-gray-600">
        Ingresa tu número de documento para ver tus cursos y el estado del proceso.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          placeholder="Número de documento"
          className="flex-1 border p-2 rounded text-center"
        />
        <button
          onClick={buscarEstado}
          className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
        >
          Consultar
        </button>
      </div>

      {resultado?.tipo === 'no-encontrado' && (
        <div className="text-red-600 bg-red-100 border border-red-200 p-4 rounded text-center">
          No encontramos registros con ese número de documento.
        </div>
      )}

      {resultado?.tipo === 'ok' && (
        <div className="bg-white border p-4 rounded shadow space-y-4">
          <p className="text-lg"><strong>Nombre:</strong> {resultado.nombre}</p>
          <p className="text-sm text-gray-600"><strong>Correo:</strong> {resultado.correo}</p>

          {resultado.cursos.length > 0 ? (
            <>
              <h4 className="text-lg font-semibold text-institucional mt-4">Cursos inscritos:</h4>
              <div className="space-y-4">
                {resultado.cursos.map((c, i) => (
                  <div key={i} className="border rounded p-4 bg-gray-50 shadow-sm">
                    <p className="text-institucional font-semibold">{c.curso.nombre}</p>
                    <p className="mt-1 text-sm text-gray-700">
                      Estado del pago:{' '}
                      {c.pagoConfirmado ? (
                        <span className="text-green-600 font-semibold">✅ Confirmado</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">⏳ En proceso de verificación</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>No estás inscrito en ningún curso actualmente.</p>
          )}
        </div>
      )}

      {/* Login admin camuflado */}
      <div className="mt-10 text-center text-sm">
        {!mostrarLogin ? (
          <button
            onClick={() => setMostrarLogin(true)}
            className="text-gray-500 underline hover:text-institucional"
          >
            ¿Tienes acceso especial?
          </button>
        ) : (
          <div className="mt-4 space-y-3 bg-white p-4 border rounded shadow-sm">
            <h4 className="text-md font-semibold text-institucional">Acceso administrativo</h4>
            <input
              type="text"
              placeholder="Usuario"
              value={correoAdmin}
              onChange={(e) => setCorreoAdmin(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full border p-2 rounded"
            />
            {errorLogin && <div className="text-red-600 text-sm">{errorLogin}</div>}
            <button
              onClick={validarAdmin}
              className="w-full bg-institucional text-white px-4 py-2 rounded hover:bg-presentacionDark"
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstadoEstudiante;