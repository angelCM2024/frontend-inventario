const ProductModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando producto en la BD...");
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Registrar Producto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
              <input required type="text" name="nombre" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Código SKU</label>
              <input required type="text" name="sku" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción (Opcional)</label>
              <textarea name="descripcion" rows="2" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio de Compra</label>
              <input required type="number" step="0.01" min="0" name="precio_compra" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio de Venta</label>
              <input required type="number" step="0.01" min="0" name="precio_venta" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="0.00" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
              <input required type="number" name="stock_actual" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="0" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo (Alerta)</label>
              <input required type="number" name="stock_minimo" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" defaultValue="5" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Guardar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
