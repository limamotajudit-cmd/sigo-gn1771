import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/LAyout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RutaProtegida from './components/RutaProtegida';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Ruta principal: Inicio de sesión */}
          <Route path="/" element={<Login />} />

          {/* Ruta protegida: Panel de control (Dashboard) */}
          <Route
            path="/dashboard"
            element={
              <RutaProtegida>
                <Dashboard />
              </RutaProtegida>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}