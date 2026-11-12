import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Movements from './pages/Movements';
import Alerts from './pages/Alerts';
import Login from './pages/Login';

const ProtectedRoute = ({ session, children }) => {
  if (!session) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center bg-slate-50 text-slate-600">Cargando sesión...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" replace />} />

        <Route path="/" element={<ProtectedRoute session={session}><Layout session={session} /></ProtectedRoute>}>
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