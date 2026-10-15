import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Encabezado con personalización */}
      <header style={{ backgroundColor: '#1a365d', color: 'white', padding: '1rem', textAlign: 'center' }}>
        <h1>SIGO-GN · Unidad 71</h1>
      </header>

      {/* Contenedor principal donde irá el Login o Dashboard */}
      <main style={{ flex: 1, padding: '2rem' }}>
        {children}
      </main>
    </div>
  );
}