import React, { useState } from 'react';
import { inscripciones } from '../data/inscripciones';
import { estudiantesRegistrados } from '../data/estudiantes';
import { useNavigate } from 'react-router-dom';

const adminCredenciales = {
  usuario: 'secifuentes',  // Cambiamos correo por 'secifuentes' como usuario
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
    if (
      correoAdmin === adminCredenciales.usuario &&  // Comparamos con 'secifuentes' como usuario
      clave === adminCredenciales.clave
    ) {
      navigate('/admin');
    } else {
      setErrorLogin('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-institucional mb-4">Consulta tu estado</h2>
      <p className="mb-6 text-sm text-gray-600">
        Ingresa tu número de documento para consultar si estás inscrito y tu estado actual.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          placeholder="Número de documento"
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={buscarEstado}
          className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
        >
          Consultar
        </button>
      </div>

      {/* Resultado si no se encuentra */}
      {resultado?.tipo === 'no-encontrado' && (
        <div className="text-red-600 bg-red-100 border border-red-200 p-4 rounded">
          No encontramos registros con ese número de documento.
        </div>
      )}

      {/* Resultado si se encuentra */}
      {resultado?.tipo === 'ok' && (
        <div className="bg-white border p-4 rounded shadow space-y-4">
          <p><strong>Nombre:</strong> {resultado.nombre}</p>
          <p><strong>Correo:</strong> {resultado.correo}</p>
          <p><strong>Estado:</strong> <span className="text-green-600 font-medium">{resultado.estado}</span></p>

          {resultado.cursos.length > 0 ? (
            <>
              <h4 className="text-lg font-semibold mt-4">Cursos inscritos:</h4>
              <ul className="space-y-2">
                {resultado.cursos.map((c, i) => (
                  <li key={i} className="border rounded p-3 text-sm">
                    <p><strong>Curso:</strong> {c.curso.nombre}</p>
                    <p><strong>Estado del pago:</strong> {c.pagoConfirmado ? 'Pago confirmado ✅' : 'Pago pendiente ⏳'}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No estás inscrito en ningún curso actualmente.</p>
          )}
        </div>
      )}

      {/* LOGIN ADMIN SIEMPRE VISIBLE ABAJO */}
      <div className="mt-10 border-t pt-6">
        {!mostrarLogin ? (
          <button
            onClick={() => setMostrarLogin(true)}
            className="text-sm text-institucional underline hover:text-presentacionDark"
          >
            ¿Eres administrador? Iniciar sesión
          </button>
        ) : (
          <div className="space-y-3">
            <h4 className="text-md font-semibold">Acceso para administradores</h4>
            <input
              type="text"  // Cambiamos el input de correo a nombre de usuario
              placeholder="Usuario (secifuentes)"
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
            {errorLogin && (
              <div className="text-red-600 text-sm">{errorLogin}</div>
            )}
            <button
              onClick={validarAdmin}
              className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
            >
              Acceder al panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EstadoEstudiante;