import { Outlet, Link, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Panel de Control' },
    { path: '/productos', label: 'Productos' },
    { path: '/movimientos', label: 'Entradas y Salidas' },
    { path: '/alertas', label: 'Alertas de Stock' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-700">
          InventarioWeb
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded transition-colors ${
                location.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-slate-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h2 className="text-xl font-semibold text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.label || 'Panel'}
          </h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
