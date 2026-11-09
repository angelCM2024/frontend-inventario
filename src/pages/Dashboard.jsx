const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Total Productos</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">124</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium">Movimientos (Hoy)</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
          <h3 className="text-red-500 text-sm font-medium">Alertas de Stock</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">3</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-64">
        <h3 className="font-semibold text-gray-800 mb-4">Últimas transacciones</h3>
        <p className="text-gray-500 text-sm">Aquí irá la tabla de movimientos recientes consumida desde tu API...</p>
      </div>
    </div>
  );
};

export default Dashboard;
