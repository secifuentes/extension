import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const adminCredenciales = {
  usuario: 'secifuentes',
  clave: '1624Scc$',
};

const EstadoEstudiante = () => {
  const [tipoDoc, setTipoDoc] = useState('rc');
  const [documento, setDocumento] = useState('');
  const [resultado, setResultado] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [correoAdmin, setCorreoAdmin] = useState('');
  const [clave, setClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const buscarEstado = async () => {
    setCargando(true);
    setResultado(null);

    try {
      const estudianteRes = await fetch(`${API_URL}/api/estudiantes/${tipoDoc}/${documento}`);
      const estudiante = estudianteRes.ok ? await estudianteRes.json() : null;

      const inscripcionesRes = await fetch(`${API_URL}/api/inscripciones`);
      const todasInscripciones = await inscripcionesRes.json();
      const inscrito = todasInscripciones.filter(i => i.documento === documento);

      if (!estudiante && inscrito.length === 0) {
        setResultado({ tipo: 'no-encontrado' });
      } else {
        setResultado({
          tipo: 'ok',
          nombre: estudiante ? `${estudiante.nombres} ${estudiante.apellidos}` : 'No registrado',
          correo: estudiante?.correo || '',
          estado: estudiante ? 'Activo' : 'No registrado',
          cursos: inscrito,
        });
      }
    } catch (error) {
      console.error('❌ Error al buscar:', error);
      alert('Error al buscar la información. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
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
      <h2 className="text-3xl font-bold text-institucional mb-4">Consulta tu estado de inscripción</h2>
      <p className="mb-6 text-sm text-gray-600">
        Ingresa tu número de documento para saber si estás inscrito a un curso.
      </p>

      {/* Formulario de búsqueda */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={tipoDoc}
          onChange={(e) => setTipoDoc(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="rc">Registro Civil</option>
          <option value="ti">Tarjeta de Identidad</option>
          <option value="cc">Cédula de Ciudadanía</option>
          <option value="ce">Cédula de Extranjería</option>
          <option value="pa">Pasaporte</option>
        </select>
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
          {cargando ? 'Consultando...' : 'Consultar'}
        </button>
      </div>

      {/* Resultado */}
      {resultado?.tipo === 'no-encontrado' && (
        <div className="text-red-600 bg-red-100 border border-red-200 p-4 rounded">
          No encontramos registros con ese número de documento.
        </div>
      )}

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
                  <li key={i} className="border rounded p-3 text-sm bg-gray-50">
                    <p><strong>Curso:</strong> {c.cursoNombre}</p>
                    <p>
                      <strong>Pago:</strong>{' '}
                      {c.pagoConfirmado ? (
                        <span className="text-green-600 font-semibold">Confirmado ✅</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Pendiente de verificación ⏳</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No estás inscrito en ningún curso actualmente.</p>
          )}
        </div>
      )}

      {/* Acceso admin con doble clic sutil */}
      <div className="mt-10 text-center">
        {!mostrarLogin ? (
          <button
            onDoubleClick={() => setMostrarLogin(true)}
            className="text-xs text-gray-400 underline"
            title="Acceso oculto"
          >
            .
          </button>
        ) : (
          <div className="space-y-3 max-w-md mx-auto border p-4 rounded shadow mt-6">
            <h4 className="text-md font-semibold">Acceso administrador</h4>
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
            {errorLogin && (
              <div className="text-red-600 text-sm">{errorLogin}</div>
            )}
            <button
              onClick={validarAdmin}
              className="bg-institucional text-white px-6 py-2 rounded hover:bg-presentacionDark"
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