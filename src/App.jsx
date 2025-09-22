import React, { useEffect } from 'react';
import LandingRedirect from './pages/LandingRedirect';

const App = () => {
  useEffect(() => {
    if (!import.meta.env.VITE_API_URL) {
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/visitas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pagina: window.location.pathname }),
    }).catch(() => {
      // Silently ignore analytics errors to avoid breaking the landing page experience.
    });
  }, []);

  return <LandingRedirect />;
};

export default App;
