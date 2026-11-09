import { useState, useEffect } from 'react';
import ProductModal from '../components/ProductModal'; 

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const mockProducts = [
      { 
        id: 1, 
        sku: 'PROD-001', 
        nombre: 'Laptop HP ProBook', 
        descripcion: 'Laptop corporativa 15 pulgadas, 16GB RAM',
        precio_compra: 700.00, 
        precio_venta: 850.00, 
        stock_actual: 15, 
        stock_minimo: 5 
      },
      { 
        id: 2, 
        sku: 'PROD-002', 
        nombre: 'Monitor Dell 24"', 
        descripcion: 'Monitor IPS Full HD',
        precio_compra: 110.00, 
        precio_venta: 150.00, 
        stock_actual: 4, 
        stock_minimo: 10 
      }
    ];
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors whitespace-nowrap"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Nombre</th>
                <th className="p-4 font-semibold">Precio Compra</th>
                <th className="p-4 font-semibold">Precio Venta</th>
                <th className="p-4 font-semibold">Stock Actual</th>
                <th className="p-4 font-semibold">Stock Mín.</th>
                <th className="p-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-mono">{product.sku}</td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{product.nombre}</div>
                      <div className="text-gray-500 text-xs truncate max-w-xs">{product.descripcion}</div>
                    </td>
                    <td className="p-4">${product.precio_compra.toFixed(2)}</td>
                    <td className="p-4">${product.precio_venta.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock_actual <= product.stock_minimo ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {product.stock_actual}
                      </span>
                    </td>
                    <td className="p-4">{product.stock_minimo}</td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">Editar</button>
                      <button className="text-red-600 hover:text-red-800 font-medium">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Products;
