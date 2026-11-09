import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const mockAlerts = [
      {
        id: 2,
        sku: 'PROD-002',
        nombre: 'Monitor Dell 24"',
        stock_actual: 4,
        stock_minimo: 10,
        faltante_sugerido: 6
      },
      {
        id: 5,
        sku: 'PROD-005',
        nombre: 'Mouse Inalámbrico Logitech',
        stock_actual: 0,
        stock_minimo: 5,
        faltante_sugerido: 5
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Atención Requerida
            </h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                Hay {alerts.length} producto(s) que han alcanzado o superado su límite de stock mínimo. 
                Se recomienda realizar el reabastecimiento sugerido para evitar desabastecimiento.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Producto</th>
                <th className="p-4 font-semibold text-center">Stock Actual</th>
                <th className="p-4 font-semibold text-center">Stock Mínimo</th>
                <th className="p-4 font-semibold text-center">Faltante Sugerido</th>
                <th className="p-4 font-semibold text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
              {alerts.length > 0 ? (
                alerts.map((item) => (
                  <tr key={item.id} className="hover:bg-red-50/50 transition-colors">
                    <td className="p-4 font-mono text-gray-500">{item.sku}</td>
                    <td className="p-4 font-medium text-gray-900">{item.nombre}</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                        {item.stock_actual}
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium text-gray-500">
                      {item.stock_minimo}
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-bold text-orange-600">
                        +{item.faltante_sugerido}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <Link 
                        to="/movimientos"
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm underline"
                      >
                        Registrar Entrada
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg className="w-12 h-12 text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-lg font-medium text-gray-900">Inventario Saludable</p>
                      <p>Ningún producto está por debajo del stock mínimo.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
