import { useState, useEffect } from 'react';

const Movements = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const mockProducts = [
      { id: 1, nombre: 'Laptop HP ProBook', sku: 'PROD-001' },
      { id: 2, nombre: 'Monitor Dell 24"', sku: 'PROD-002' }
    ];
    setProducts(mockProducts);

    const mockMovements = [
      { id: 1, producto_nombre: 'Laptop HP ProBook', tipo: 'ENTRADA', cantidad: 20, motivo: 'Compra inicial', creado_en: '2026-11-08 10:00:00' },
      { id: 2, producto_nombre: 'Monitor Dell 24"', tipo: 'SALIDA', cantidad: 2, motivo: 'Venta mostrador', creado_en: '2026-11-08 14:30:00' }
    ];
    setMovements(mockMovements);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando movimiento a la API...");
    e.target.reset();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Registrar Nuevo Movimiento</h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
            <select required name="producto_id" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="">Seleccione un producto...</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>[{p.sku}] - {p.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Movimiento</label>
            <select required name="tipo" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="ENTRADA">Entrada (Sumar stock)</option>
              <option value="SALIDA">Salida (Restar stock)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input required type="number" name="cantidad" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. 10" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Motivo (Opcional)</label>
            <input type="text" name="motivo" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Ej. Compra a proveedor, Producto dañado, Venta..." />
          </div>
          <div className="md:col-span-1">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
              Registrar
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-slate-50">
          <h3 className="font-semibold text-gray-800">Historial de Transacciones</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold">Fecha y Hora</th>
                <th className="p-4 font-semibold">Producto</th>
                <th className="p-4 font-semibold">Tipo</th>
                <th className="p-4 font-semibold">Cantidad</th>
                <th className="p-4 font-semibold">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
              {movements.length > 0 ? (
                movements.map((mov) => (
                  <tr key={mov.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-500 whitespace-nowrap">{mov.creado_en}</td>
                    <td className="p-4 font-medium text-gray-900">{mov.producto_nombre}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold tracking-wide ${
                        mov.tipo === 'ENTRADA' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-900">{mov.cantidad}</td>
                    <td className="p-4 text-gray-500">{mov.motivo || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No hay movimientos registrados.
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

export default Movements;
