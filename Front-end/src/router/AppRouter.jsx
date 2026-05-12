import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AppLayout from '../layouts/AppLayout';
import AdminLayout from '../layouts/AdminLayout';

// Vistas
import LandingPage from '../features/landing/views/LandingPage';
import LoginScreen from '../features/auth/views/LoginScreen';
import PuntoVentaScreen from '../features/punto-venta/views/PuntoVentaScreen';

import UsersScreen from '../features/admin/views/usuarios/UsersScreen';
import RolesScreen from '../features/admin/views/roles/RolesScreen';
import PermissionsScreen from '../features/admin/views/permisos/PermissionsScreen';
import BitacoraList from '../features/admin/views/bitacora/BitacoraList';

import HistorialVentas from '../features/venta/views/HistorialVentas';
import TicketVenta from '../features/venta/views/TicketVenta';

import InventarioList from '../features/inventario/views/InventarioList';
import InventarioCreate from '../features/inventario/views/InventarioCreate';
import InventarioEdit from '../features/inventario/views/InventarioEdit';
import InventarioDetails from '../features/inventario/views/InventarioDetails';

import BalanceList from '../features/reportes/views/BalanceList';

// MOCK
const ventaMock = {
  id: 4582,
  fecha: '07/05/2026 15:30',
  sucursalNombre: 'Centro',
  clienteNombre: 'Simón',
  clienteApellido: 'Sclarandi',
  clienteDni: '12345678',
  vendedorNombre: 'Sistema',
  totalVenta: 1500,
  bonificacion: 0,
  pagos: [
    {
      monto: 1500,
      metodoNombre: 'Efectivo',
      fecha: '07/05/26 15:30',
      cotizacionDolar: 1200,
    },
  ],
  detalleVenta: [
    {
      productoNombre: 'iPhone 15 Pro',
      modelo: '128GB Blue Titanium',
      cantidad: 1,
      subtotal: 1500,
      imei: '354678123456789',
      color: 'Azul Titanium',
      memoria: '128GB',
      bateria: 100,
    },
  ],
};

export default function AppRouter() {
  return (
    <Routes>

      {/* ---------------- PUBLICAS ---------------- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />

      

      {/* ---------------- APP PRINCIPAL ---------------- */}
      <Route path="/app" element={<AppLayout />}>

        {/* Redirección por defecto */}
        <Route
          index
          element={<Navigate to="/app/ventas/historial" />}
        />

        {/* -------- VENTAS -------- */}
        <Route
          path="ventas/historial"
          element={<HistorialVentas />}
        />

        {/* -------- POS FULL SCREEN -------- */}
        <Route
          path="/app/punto-venta"
          element={<PuntoVentaScreen />}
        />

        <Route
          path="ventas/detalle/:id"
          element={<TicketVenta venta={ventaMock} />}
        />

        {/* -------- INVENTARIO -------- */}
        <Route
          path="inventario"
          element={<InventarioList />}
        />

        <Route
          path="inventario/nuevo"
          element={<InventarioCreate />}
        />

        <Route
          path="inventario/editar/:id"
          element={<InventarioEdit />}
        />

        <Route
          path="inventario/detalle/:id"
          element={<InventarioDetails />}
        />

        {/* -------- REPORTES -------- */}
        <Route
          path="reportes"
          element={<BalanceList />}
        />

        {/* -------- ADMIN -------- */}
        <Route path="admin" element={<AdminLayout />}>

          <Route
            index
            element={<Navigate to="/app/admin/usuarios" />}
          />

          <Route
            path="usuarios"
            element={<UsersScreen />}
          />

          <Route
            path="roles"
            element={<RolesScreen />}
          />

          <Route
            path="permisos"
            element={<PermissionsScreen />}
          />

          <Route
            path="bitacora"
            element={<BitacoraList />}
          />

        </Route>

      </Route>

      {/* ---------------- 404 ---------------- */}
      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>
  );
};