import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de rol: cambiar según el correo
    const correo = e.target.correo.value;

    if (correo.includes('@lapresentaciongirardota.edu.co')) {
      navigate('/admin');
    } else if (correo.includes('docente')) {
      navigate('/docente');
    } else {
      navigate('/estudiante');
    }
  };

  return (
    <div className="max-w-md mx-auto pt-12 pb-12">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" name="correo" required placeholder="Correo electrónico" className="w-full border p-2 rounded" />
        <input type="password" name="clave" required placeholder="Contraseña" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-institucional text-white px-4 py-2 rounded w-full">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;