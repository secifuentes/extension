import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-0 bg-white">{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;