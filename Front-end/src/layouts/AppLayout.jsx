import { useState } from 'react';

import {
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';

import {
  Storefront,
  AdminPanelSettings,
  Logout,
  Security,
  Inventory2,
  Assessment,
  ReceiptLong,
  Language,
  Menu,
  ChevronLeft,
  Close,
} from '@mui/icons-material';

const menuItems = [
  {
    name: 'Punto de Venta',
    path: '/app/punto-venta',
    icon: Storefront,
    color: 'text-blue-500',
    hover: 'hover:bg-blue-500/10',
  },
  {
    name: 'Historial',
    path: '/app/ventas/historial',
    icon: ReceiptLong,
    color: 'text-green-400',
    hover: 'hover:bg-green-500/10',
  },
  {
    name: 'Inventario',
    path: '/app/inventario',
    icon: Inventory2,
    color: 'text-red-400',
    hover: 'hover:bg-red-500/10',
  },
  {
    name: 'Reportes',
    path: '/app/reportes',
    icon: Assessment,
    color: 'text-indigo-400',
    hover: 'hover:bg-indigo-500/10',
  },
  {
    name: 'Administración',
    path: '/app/admin/usuarios',
    icon: AdminPanelSettings,
    color: 'text-purple-400',
    hover: 'hover:bg-purple-500/10',
  },
  {
    name: 'Bitácora',
    path: '/app/admin/bitacora',
    icon: Security,
    color: 'text-cyan-400',
    hover: 'hover:bg-cyan-500/10',
  },
  {
    name: 'Landing',
    path: '/',
    icon: Language,
    color: 'text-yellow-400',
    hover: 'hover:bg-yellow-500/10',
  },
];

export default function AppLayout() {
  const location = useLocation();

  // Desktop collapse
  const [collapsed, setCollapsed] = useState(false);

  // Mobile sidebar
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          className="
            fixed inset-0 bg-black/60 z-40
            lg:hidden
          "
          onClick={closeMobileMenu}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:relative z-50 lg:z-auto
          h-screen bg-slate-900 border-r border-slate-800
          flex flex-col
          transition-all duration-300

          ${collapsed ? 'lg:w-24' : 'lg:w-72'}

          ${
            mobileOpen
              ? 'translate-x-0 w-72'
              : '-translate-x-full lg:translate-x-0'
          }
        `}
      >

        {/* Header */}
        <div className="h-20 px-4 border-b border-slate-800 flex items-center justify-between">

          {!collapsed && (
            <div>
              <h1 className="text-3xl font-bold text-white">
                Punto <span className="text-blue-500">Cell</span>
              </h1>

              <p className="text-slate-400 text-sm">
                Sistema de Gestión
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">

            {/* Desktop collapse */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="
                hidden lg:flex
                w-10 h-10 rounded-xl
                items-center justify-center
                text-slate-400 hover:text-white
                hover:bg-slate-800
                transition-all
              "
            >
              <ChevronLeft
                className={collapsed ? 'rotate-180' : ''}
              />
            </button>

            {/* Mobile close */}
            <button
              onClick={closeMobileMenu}
              className="
                lg:hidden
                w-10 h-10 rounded-xl
                flex items-center justify-center
                text-slate-400 hover:text-white
                hover:bg-slate-800
              "
            >
              <Close />
            </button>

          </div>

        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">

          <div className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(item.path + '/');

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`
                    group flex items-center
                    ${collapsed ? 'lg:justify-center' : 'gap-4'}
                    px-4 py-3 rounded-2xl
                    transition-all duration-200
                    border

                    ${
                      isActive
                        ? 'bg-slate-800 border-slate-700'
                        : 'border-transparent'
                    }

                    ${item.hover}
                  `}
                >

                  {/* Icon */}
                  <div
                    className="
                      min-w-[44px] h-11
                      rounded-xl
                      flex items-center justify-center
                      bg-slate-800
                    "
                  >
                    <Icon className={item.color} />
                  </div>

                  {/* Text */}
                  {(!collapsed || mobileOpen) && (
                    <div className="flex flex-col overflow-hidden">

                      <span
                        className={`
                          font-semibold whitespace-nowrap
                          ${
                            isActive
                              ? 'text-white'
                              : 'text-slate-300'
                          }
                        `}
                      >
                        {item.name}
                      </span>

                      <span className="text-xs text-slate-500">
                        Acceder al módulo
                      </span>

                    </div>
                  )}

                </Link>
              );
            })}

          </div>

        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">

          <Link
            to="/login"
            className={`
              flex items-center
              ${collapsed ? 'lg:justify-center' : 'gap-3'}
              px-4 py-3
              rounded-2xl
              text-slate-400
              hover:text-white
              hover:bg-slate-800
              transition-all
            `}
          >

            <Logout />

            {(!collapsed || mobileOpen) && (
              <span className="font-medium">
                Cerrar Sesión
              </span>
            )}

          </Link>

        </div>

      </aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 overflow-auto bg-slate-950">

        {/* Topbar */}
        <div className="h-20 border-b border-slate-800 px-4 lg:px-8 flex items-center justify-between lg:hidden">

          <div className="flex items-center gap-4">

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="
                lg:hidden
                w-10 h-10 rounded-xl
                flex items-center justify-center
                text-slate-300
                hover:bg-slate-800
              "
            >
              <Menu />
            </button>

          </div>

        </div>

        {/* Pages */}
        <Outlet />

      </main>

    </div>
  );
}