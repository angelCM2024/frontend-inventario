import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Movements from './pages/Movements';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
          <Route path="movimientos" element={<Movements />} />
          <Route path="alertas" element={<Alerts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
