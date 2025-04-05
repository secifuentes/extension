import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';  // Asegúrate de importar esto

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[54px] bg-white">
        {/* Aquí es donde se renderizan las rutas hijas */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;