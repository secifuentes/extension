// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const correo = e.target.correo.value;
    const clave = e.target.clave.value;

    try {
      const res = await axios.post('https://extensionlapresentacion.com/api/login', {
        correo,
        password: clave,
      });

      const { token, usuario } = res.data;
      localStorage.setItem('token', token);

      // Redirige según el rol
      if (usuario.rol === 'admin') {
        navigate('/admin');
      } else if (usuario.rol === 'docente') {
        navigate('/docente');
      } else {
        navigate('/estudiante');
      }
    } catch (error) {
      setMensaje(error.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-md mx-auto pt-12 pb-12">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          name="correo"
          required
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="clave"
          required
          placeholder="Contraseña"
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-institucional text-white px-4 py-2 rounded w-full">
          Ingresar
        </button>
      </form>
      {mensaje && <p className="text-red-600 mt-2">{mensaje}</p>}
    </div>
  );
};

export default Login;