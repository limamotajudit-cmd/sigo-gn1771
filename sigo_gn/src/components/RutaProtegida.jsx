import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {
  // 1. Verificamos si existe la clave "sigoUsuario" en el localStorage
  const usuarioGuardado = localStorage.getItem('sigoUsuario');

  // 2. Si no existe la clave, redirige automáticamente a la página de inicio de sesión (/)
  if (!usuarioGuardado) {
    return <Navigate to="/" replace />;
  }

  // 3. Si la clave sí existe, muestra el contenido protegido (children)
  return children;
}