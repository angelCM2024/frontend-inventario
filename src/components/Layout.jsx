import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient'; // <-- Importar supabase

const Layout = ({ session }) => { // <-- Recibir session como prop
  const location = useLocation();
  const navigate = useNavigate();

  // <-- Crear la función handleLogout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  // Array de navegación con iconos SVG incorporados
  const navItems = [
    { 
      path: '/', 
      label: 'Panel de Control',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    },
    { 
      path: '/productos', 
      label: 'Productos',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    },
    { 
      path: '/movimientos', 
      label: 'Entradas y Salidas',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    },
    { 
      path: '/alertas', 
      label: 'Alertas de Stock',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      
      {/* Sidebar Mejorado */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-10">
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            InventarioWeb
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white font-medium shadow-md' 
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <svg className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Perfil Real / Logout en la base del Sidebar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm uppercase">
              {/* <-- Mostrar la primera letra del correo real */}
              {session?.user?.email?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Usuario</p>
              {/* <-- Mostrar el correo real de Supabase */}
              <p className="text-xs text-slate-400 truncate">
                {session?.user?.email || 'Cargando...'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout} // <-- Usar la nueva función aquí
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header Superior Limpio */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 z-0 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-800">
            {navItems.find(i => i.path === location.pathname)?.label || 'Panel de Control'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        {/* Renderizado de Páginas */}
        <div className="flex-1 overflow-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;