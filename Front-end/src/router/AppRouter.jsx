import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import HubScreen from '../features/hub/views/HubScreen'; 
import AdminLayout from '../layouts/AdminLayout';

// Vistas 
import LandingPage from '../features/landing/views/LandingPage';
import LoginScreen from '../features/auth/views/LoginScreen';
import PuntoVentaScreen from '../features/punto-venta/views/PuntoVentaScreen';
import UsersScreen from '../features/admin/views/usuarios/UsersScreen';
import RolesScreen from '../features/admin/views/roles/RolesScreen';
import PermissionsScreen from '../features/admin/views/permisos/PermissionsScreen';
import HistorialVentas from '../features/venta/views/HistorialVentas';
import TicketVenta from '../features/venta/views/TicketVenta';
import InventarioList from '../features/inventario/views/InventarioList';
import InventarioCreate from '../features/inventario/views/InventarioCreate';
import InventarioEdit from '../features/inventario/views/InventarioEdit';
import InventarioDetails from '../features/inventario/views/InventarioDetails';
import BalanceList from '../features/reportes/views/BalanceList';

// --- DATOS DE PRUEBA (MOCK) ---
// Esto simula lo que te devolverá tu API de .NET más adelante
const ventaMock = {
  id: 4582,
  fecha: "07/05/2026 15:30",
  sucursalNombre: "Centro",
  clienteNombre: "Simón",
  clienteApellido: "Sclarandi",
  clienteDni: "12345678",
  vendedorNombre: "Sistema",
  totalVenta: 1500,
  bonificacion: 0,
  pagos: [
    { monto: 1500, metodoNombre: "Efectivo", fecha: "07/05/26 15:30", cotizacionDolar: 1200 }
  ],
  detalleVenta: [
    { 
      productoNombre: "iPhone 15 Pro", 
      modelo: "128GB Blue Titanium", 
      cantidad: 1, 
      subtotal: 1500, 
      imei: "354678123456789", 
      color: "Azul Titanium", 
      memoria: "128GB", 
      bateria: 100 
    }
  ]
};

export const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />

      {/* Ruta Base /app -> Muestra el Selector */}
      <Route path="/app" element={<HubScreen />} />

      {/* --- MÓDULO PUNTO DE VENTA (Sin Sidebar de Admin) --- */}
      {/* El POS se renderiza solo, ocupando toda la pantalla para trabajar cómodo */}
      <Route path="/app/punto-venta" element={<PuntoVentaScreen />} />
      
      {/* --- MÓDULO VENTAS --- */}
      <Route path="/app/ventas/historial" element={<HistorialVentas />} />
      {/* Le pasamos el mock temporalmente como "venta" a la pantalla del ticket */}
      <Route path="/app/ventas/detalle/:id" element={<TicketVenta venta={ventaMock} />} />

      {/* --- MÓDULO INVENTARIO --- */}
      <Route path="/app/inventario" element={<InventarioList />} />
      <Route path="/app/inventario/nuevo" element={<InventarioCreate />} />
      <Route path="/app/inventario/editar/:id" element={<InventarioEdit />} />
      <Route path="/app/inventario/detalle/:id" element={<InventarioDetails />} />

      {/* --- MÓDULO REPORTES / BALANCE --- */}
      <Route path="/app/reportes" element={<BalanceList />} />

      {/* --- MÓDULO ADMINISTRACIÓN (Con Sidebar) --- */}
      <Route path="/app/admin" element={<AdminLayout />}>
        {/* Si entran solo a /admin, los redirige a usuarios por defecto */}
        <Route index element={<Navigate to="/app/admin/usuarios" />} />
        
        <Route path="usuarios" element={<UsersScreen />} />
        <Route path="roles" element={<RolesScreen />} />
        <Route path="permisos" element={<PermissionsScreen />} />

        
      
      </Route>

      {/* Ruta comodín: Si tipean cualquier cosa, van al login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};