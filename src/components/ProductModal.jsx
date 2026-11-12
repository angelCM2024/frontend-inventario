import { useState, useEffect } from 'react';
import { createProduct, updateProduct, checkSkuExists } from '../services/productService';

export default function ProductModal({ isOpen, onClose, productToEdit, onSaveSuccess }) {
  const initialFormState = {
    nombre: '',
    sku: '',
    descripcion: '',
    precio_compra: '',
    precio_venta: '',
    stock_minimo: 5
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData(initialFormState);
    }
    setError(null);
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validaciones numéricas
      const precioCompra = parseFloat(formData.precio_compra);
      const precioVenta = parseFloat(formData.precio_venta);
      const stockMin = parseInt(formData.stock_minimo, 10);

      if (precioCompra < 0 || precioVenta < 0 || stockMin < 0) {
        throw new Error('Los precios y el stock mínimo no pueden ser negativos.');
      }

      // Validar SKU único
      const skuExists = await checkSkuExists(formData.sku, productToEdit?.id);
      if (skuExists) {
        throw new Error('El SKU ingresado ya pertenece a otro producto.');
      }

      const productPayload = {
        nombre: formData.nombre,
        sku: formData.sku,
        descripcion: formData.descripcion,
        precio_compra: precioCompra,
        precio_venta: precioVenta,
        stock_minimo: stockMin
      };

      if (productToEdit) {
        await updateProduct(productToEdit.id, productPayload);
      } else {
        await createProduct(productPayload);
      }

      onSaveSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar el producto.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre *</label>
            <input required type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SKU *</label>
            <input required type="text" name="sku" value={formData.sku} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea name="descripcion" value={formData.descripcion || ''} onChange={handleChange} className="w-full border rounded p-2" rows="2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Precio Compra *</label>
              <input required type="number" step="0.01" min="0" name="precio_compra" value={formData.precio_compra} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Precio Venta *</label>
              <input required type="number" step="0.01" min="0" name="precio_venta" value={formData.precio_venta} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Stock Mínimo *</label>
            <input required type="number" min="0" name="stock_minimo" value={formData.stock_minimo} onChange={handleChange} className="w-full border rounded p-2" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}