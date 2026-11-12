import { useState, useEffect } from 'react';
import { createMovement } from '../services/movementService';
import { getProducts } from '../services/productService';

export default function MovementModal({ isOpen, onClose, onSaveSuccess }) {
  const initialFormState = {
    producto_id: '',
    tipo: 'ENTRADA',
    cantidad: '',
    motivo: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData([initialFormState]);
      setError(null);
      fetchProducts();
    }
  }, [isOpen]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError('Error al cargar la lista de productos.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const cantidad = parseInt(formData.cantidad, 10);
      if (cantidad <= 0) {
        throw new Error('La cantidad debe ser mayor a cero.');
      }

      await createMovement({
        producto_id: formData.producto_id,
        tipo: formData.tipo,
        cantidad: cantidad,
        motivo: formData.motivo
      });

      onSaveSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Error al registrar el movimiento.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Registrar Movimiento</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Producto *</label>
            <select required name="producto_id" value={formData.producto_id} onChange={handleChange} className="w-full border rounded p-2 bg-white">
              <option value="" disabled>Seleccione un producto</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.sku} - {p.nombre} (Stock: {p.stock_actual})</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tipo *</label>
              <select required name="tipo" value={formData.tipo} onChange={handleChange} className="w-full border rounded p-2 bg-white">
                <option value="ENTRADA">Entrada (+)</option>
                <option value="SALIDA">Salida (-)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cantidad *</label>
              <input required type="number" min="1" name="cantidad" value={formData.cantidad} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Motivo / Justificación</label>
            <textarea name="motivo" value={formData.motivo} onChange={handleChange} className="w-full border rounded p-2" rows="2" placeholder="Ej: Compra a proveedor, Venta, Merma..." />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit" disabled={loading || !formData.producto_id} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Guardando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}