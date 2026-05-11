import { Link } from 'react-router-dom';
import { Storefront, AdminPanelSettings, Logout, Security } from '@mui/icons-material';

export default function HubScreen() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Punto <span className="text-blue-500">Cell</span></h1>
        <p className="text-slate-400">Selecciona un módulo para comenzar</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full mx-auto">
        
        {/* Tarjeta Punto de Venta */}
        <Link to="/app/punto-venta" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.5)]">
          <div className="bg-blue-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
            <Storefront sx={{ fontSize: 40, color: '#3b82f6' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Punto de Venta</h2>
          <p className="text-slate-400 text-sm">Facturación, carrito, clientes y cobros.</p>
        </Link>

        {/* Tarjeta Historial de Ventas */}
        <Link to="/app/ventas/historial" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-green-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(34,197,189,0.5)]">
          <div className="bg-green-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-colors">
            <Storefront sx={{ fontSize: 40, color: '#22c5bd' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Historial de Ventas</h2>
          <p className="text-slate-400 text-sm">Consulta y analiza todas las transacciones realizadas.</p>
        </Link>

        {/* Tarjeta Administración */}
        <Link to="/app/admin/usuarios" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(168,85,247,0.5)]">
          <div className="bg-purple-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
            <AdminPanelSettings sx={{ fontSize: 40, color: '#a855f7' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Administración</h2>
          <p className="text-slate-400 text-sm">Gestión de usuarios, roles, permisos y reportes.</p>
        </Link>

        {/* Tarjeta Landing Page */}
        <Link to="/" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-yellow-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(234,179,8,0.5)]">
          <div className="bg-yellow-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
            <Storefront sx={{ fontSize: 40, color: '#eaae54' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Landing Page</h2>
          <p className="text-slate-400 text-sm">Visualiza y edita la página principal de tu tienda.</p>
        </Link>

        {/* Tarjeta Inventario */}
        <Link to="/app/inventario" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-red-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(239,68,68,0.5)]">
          <div className="bg-red-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-colors">
            <Storefront sx={{ fontSize: 40, color: '#ef4444' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Inventario</h2>
          <p className="text-slate-400 text-sm">Gestiona tu stock y productos.</p>
        </Link>

        {/* Tarjeta Reportes / Balance */}
        <Link to="/app/reportes" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-indigo-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(99,102,241,0.5)]">
          <div className="bg-indigo-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
            <Storefront sx={{ fontSize: 40, color: '#6366f1' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Reportes / Balance</h2>
          <p className="text-slate-400 text-sm">Accede a informes detallados y al balance financiero.</p>
        </Link>

        {/* Tarjeta Bitácora de Seguridad */}
        <Link to="/app/admin/bitacora" className="group flex-1 bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-15px_rgba(59,130,246,0.5)]">
          <div className="bg-blue-500/10 w-20 h-20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
            <Security sx={{ fontSize: 40, color: '#3b82f6' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bitácora de Seguridad</h2>
          <p className="text-slate-400 text-sm">Consulta y analiza los eventos de seguridad de tu sistema.</p>
        </Link>

      </div>

      {/* Botón de salir */}
      <div className="mt-16">
        <Link to="/login" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
          <Logout fontSize="small" /> Cerrar Sesión
        </Link>
      </div>
    </div>
  );
}