import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import ProductModal from '../components/ProductModal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product => 
      product.nombre.toLowerCase().includes(search.toLowerCase()) || 
      product.sku.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(results);
  }, [search, products]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto? Se eliminarán también sus movimientos asociados.')) {
      try {
        await deleteProduct(id);
        fetchProducts(); // Recargar lista
      } catch (err) {
        alert('Ocurrió un error al eliminar el producto.');
      }
    }
  };

  const openModalForNew = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  if (loading) return <div className="p-6">Cargando productos...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Productos</h1>
        <button 
          onClick={openModalForNew}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          + Nuevo Producto
        </button>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Buscar por nombre o SKU..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded p-2 shadow-sm"
        />
      </div>

      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 font-semibold text-gray-700">SKU</th>
              <th className="p-3 font-semibold text-gray-700">Nombre</th>
              <th className="p-3 font-semibold text-gray-700">Precio (Venta)</th>
              <th className="p-3 font-semibold text-gray-700">Stock Actual</th>
              <th className="p-3 font-semibold text-gray-700">Stock Mín.</th>
              <th className="p-3 font-semibold text-gray-700 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">No se encontraron productos.</td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{product.sku}</td>
                  <td className="p-3 font-medium">{product.nombre}</td>
                  <td className="p-3">${product.precio_venta}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${product.stock_actual <= product.stock_minimo ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.stock_actual}
                    </span>
                  </td>
                  <td className="p-3">{product.stock_minimo}</td>
                  <td className="p-3 text-center space-x-3">
                    <button onClick={() => openModalForEdit(product)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productToEdit={productToEdit} 
        onSaveSuccess={fetchProducts} 
      />
    </div>
  );
}