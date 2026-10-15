import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarios } from '../Data/usuarios';

export default function Login() {
  // Estados de React (useState) para controlar los campos y el mensaje de error
  const [usuarioInput, setUsuarioInput] = useState('');
  const [contrasenaInput, setContrasenaInput] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  
  const navigate = useNavigate();

  // Función que se ejecuta al presionar el botón "Ingresar"
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validar si los datos ingresados coinciden con algún usuario de la lista
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuarioInput && u.contrasena === contrasenaInput
    );

    if (usuarioEncontrado) {
      // Si las credenciales son correctas:
      // 1. Extraemos la contraseña para NO guardarla en localStorage por seguridad
      const { contrasena, ...datosSinPassword } = usuarioEncontrado;
      
      // 2. Guardamos la información en localStorage bajo la clave "sigoUsuario"
      localStorage.setItem('sigoUsuario', JSON.stringify(datosSinPassword));
      
      // 3. Redirigimos automáticamente a la ruta /dashboard
      navigate('/dashboard');
    } else {
      // Si las credenciales son incorrectas, mostramos el mensaje de error debajo del formulario
      setMensajeError('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  return (
    <div className="card">
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#0d3b66' }}>
        Inicio de Sesión
      </h2>

      <form onSubmit={handleLogin}>
        {/* Campo de Usuario */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Usuario:
          </label>
          <input
            type="text"
            value={usuarioInput}
            onChange={(e) => setUsuarioInput(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Escribe tu usuario"
            required
          />
        </div>

        {/* Campo de Contraseña */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Contraseña:
          </label>
          <input
            type="password"
            value={contrasenaInput}
            onChange={(e) => setContrasenaInput(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Escribe tu contraseña"
            required
          />
        </div>

        {/* Mensaje de error visible si las credenciales fallan */}
        {mensajeError && (
          <p style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
            {mensajeError}
          </p>
        )}

        {/* Botón de envío */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.7rem',
            backgroundColor: '#0d3b66',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}