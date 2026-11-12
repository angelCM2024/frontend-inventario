import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Movements from './pages/Movements';
import Alerts from './pages/Alerts';
import Login from './pages/Login';

// Este componente envuelve el panel. Si no hay sesión, te manda al login.
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('auth_token') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Todas las rutas del panel ahora están protegidas */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="movimientos" element={<Movements />} />
          <Route path="alertas" element={<Alerts />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;