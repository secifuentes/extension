import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Estudiante = () => {
  const [perfil, setPerfil] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    axios
      .get('https://extensionlapresentacion.com/api/mi-perfil', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPerfil(res.data);
      })
      .catch((err) => {
        console.error('Error al cargar perfil:', err);
        setError('⚠️ Sesión inválida. Por favor inicia sesión.');
        navigate('/login');
      });
  }, []);

  if (error) {
    return <p className="text-red-600 text-center mt-8">{error}</p>;
  }

  if (!perfil) {
    return <p className="text-center mt-8">Cargando perfil...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">👋 Bienvenido, {perfil.nombres}</h1>
      <p><strong>Correo:</strong> {perfil.correo}</p>
      <p><strong>Rol:</strong> {perfil.rol}</p>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Estudiante;