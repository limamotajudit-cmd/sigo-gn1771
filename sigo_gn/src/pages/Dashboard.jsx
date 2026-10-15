import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // 1. Leemos los datos del usuario guardados en localStorage
  const usuarioGuardado = localStorage.getItem('sigoUsuario');
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : {};

  // 2. Función para cerrar sesión
  const handleLogout = () => {
    // Borramos la clave de sesión en localStorage
    localStorage.removeItem('sigoUsuario');
    
    // Redirigimos al usuario de vuelta al inicio de sesión
    navigate('/');
  };

  return (
    <div className="card" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: '#0d3b66', marginBottom: '1rem' }}>
        Bienvenido, {usuario.nombre || 'Oficial'}
      </h2>

      <p style={{ marginBottom: '1.5rem', color: '#555', fontSize: '1.1rem' }}>
        Rol en el sistema: <strong>{usuario.rol || 'Oficial'}</strong>
      </p>

      {/* Botón de cierre de sesión */}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#c53030',
          color: 'white',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}