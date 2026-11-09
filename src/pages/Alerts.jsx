import { useState, useEffect } from 'react';
import { getAlerts } from '../services/dashboardService';
import { Link } from 'react-router-dom';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts();
        setAlerts(data);
      } catch (err) {
        setError('Error al cargar las alertas de inventario.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  if (loading) return <div className="p-6 animate-pulse">Analizando niveles de stock...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Alertas de Reposición</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-50 border-b border-red-100">
              <th className="p-4 font-semibold text-red-800 text-sm">SKU</th>
              <th className="p-4 font-semibold text-red-800 text-sm">Producto</th>
              <th className="p-4 font-semibold text-red-800 text-sm text-center">Stock Actual</th>
              <th className="p-4 font-semibold text-red-800 text-sm text-center">Stock Mínimo</th>
              <th className="p-4 font-semibold text-red-800 text-sm text-center">Déficit</th>
              <th className="p-4 font-semibold text-red-800 text-sm text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-12 text-center">
                  <div className="flex flex-col items-center justify-center text-green-600">
                    <svg className="w-16 h-16 mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span className="text-xl font-bold text-gray-800">¡Todo en orden!</span>
                    <span className="text-sm text-gray-500 mt-2">Ningún producto está por debajo de su nivel mínimo permitido.</span>
                  </div>
                </td>
              </tr>
            ) : (
              alerts.map((alerta) => (
                <tr key={alerta.id} className="border-b border-gray-50 hover:bg-red-50/50 transition-colors">
                  <td className="p-4 font-medium text-gray-600 text-sm">{alerta.sku}</td>
                  <td className="p-4 text-gray-800 font-medium">{alerta.nombre}</td>
                  <td className="p-4 text-center">
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700">
                      {alerta.stock_actual}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 text-center text-sm">{alerta.stock_minimo}</td>
                  <td className="p-4 font-bold text-red-600 text-center text-sm">
                    {alerta.stock_minimo - alerta.stock_actual} unid.
                  </td>
                  <td className="p-4 text-center">
                    <Link 
                      to="/movements" 
                      className="text-sm bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50 shadow-sm"
                    >
                      Ingresar stock
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}