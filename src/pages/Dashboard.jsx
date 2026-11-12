import { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/dashboardService';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProductos: 0,
    valorInventario: 0,
    movimientosRecientes: [],
    alertasStock: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError('Error al cargar los datos del panel.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-6 text-gray-600 animate-pulse">Cargando indicadores en tiempo real...</div>;
  if (error) return <div className="p-6 text-red-600 bg-red-50 rounded">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Panel de Control</h1>
      
      {/* Tarjetas de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Productos</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalProductos}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-green-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Valor Inventario (Costo)</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">
            ${stats.valorInventario.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-red-500">
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Alertas de Stock</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{stats.alertasStock.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Movimientos Recientes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Últimos Movimientos</h2>
            <Link to="/movements" className="text-blue-600 text-sm hover:underline font-medium">Ver historial completo &rarr;</Link>
          </div>
          {stats.movimientosRecientes.length === 0 ? (
            <p className="text-gray-500 text-sm py-4 text-center">No hay movimientos recientes.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stats.movimientosRecientes.map(mov => (
                <li key={mov.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{mov.productos?.nombre || 'Producto eliminado'}</p>
                    <p className="text-xs text-gray-400">{new Date(mov.creado_en).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${mov.tipo === 'ENTRADA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {mov.tipo === 'ENTRADA' ? '+' : '-'}{mov.cantidad}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Alertas Rápidas */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Productos Críticos</h2>
            <Link to="/alerts" className="text-blue-600 text-sm hover:underline font-medium">Ver todas las alertas &rarr;</Link>
          </div>
          {stats.alertasStock.length === 0 ? (
            <div className="text-center py-6 text-green-600">
              <span className="block text-2xl mb-2">✅</span>
              <p className="text-sm font-medium">Inventario saludable.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {stats.alertasStock.map(alerta => (
                <li key={alerta.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{alerta.nombre}</p>
                    <p className="text-xs text-gray-400">SKU: {alerta.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600">{alerta.stock_actual} unid.</p>
                    <p className="text-xs text-gray-400">Mínimo: {alerta.stock_minimo}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}