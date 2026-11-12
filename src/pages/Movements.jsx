import { useState, useEffect } from 'react';
import { getMovements } from '../services/movementService';
import MovementModal from '../components/MovementModal';

export default function Movements() {
  const [movements, setMovements] = useState([]);
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [filterType, setFilterType] = useState('TODOS');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchMovements = async () => {
    setLoading(true);
    try {
      const data = await getMovements();
      setMovements(data);
      setFilteredMovements(data);
    } catch (err) {
      setError('Error al cargar los movimientos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  useEffect(() => {
    if (filterType === 'TODOS') {
      setFilteredMovements(movements);
    } else {
      setFilteredMovements(movements.filter(m => m.tipo === filterType));
    }
  }, [filterType, movements]);

  if (loading) return <div className="p-6">Cargando historial de movimientos...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Historial de Movimientos</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          + Registrar Movimiento
        </button>
      </div>

      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setFilterType('TODOS')}
          className={`px-4 py-2 rounded ${filterType === 'TODOS' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Todos
        </button>
        <button 
          onClick={() => setFilterType('ENTRADA')}
          className={`px-4 py-2 rounded ${filterType === 'ENTRADA' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Entradas
        </button>
        <button 
          onClick={() => setFilterType('SALIDA')}
          className={`px-4 py-2 rounded ${filterType === 'SALIDA' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Salidas
        </button>
      </div>

      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-semibold text-gray-700">Fecha</th>
              <th className="p-3 font-semibold text-gray-700">Producto</th>
              <th className="p-3 font-semibold text-gray-700">Tipo</th>
              <th className="p-3 font-semibold text-gray-700">Cantidad</th>
              <th className="p-3 font-semibold text-gray-700">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovements.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">No hay movimientos registrados.</td>
              </tr>
            ) : (
              filteredMovements.map((movement) => (
                <tr key={movement.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    {new Date(movement.creado_en).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="p-3 font-medium">
                    {movement.productos?.sku} - {movement.productos?.nombre}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${movement.tipo === 'ENTRADA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {movement.tipo}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{movement.cantidad}</td>
                  <td className="p-3 text-gray-600 text-sm">{movement.motivo || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <MovementModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSaveSuccess={fetchMovements} 
      />
    </div>
  );
}