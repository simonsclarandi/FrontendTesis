import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import HubScreen from '../features/hub/views/HubScreen'; // <-- La nueva pantalla
import AdminLayout from '../layouts/AdminLayout';

// Vistas (Márcalas como comentarios si aún no has movido los archivos)
import LandingPage from '../features/landing/views/LandingPage';
import LoginScreen from '../features/auth/views/LoginScreen';
import PuntoVentaScreen from '../features/punto-venta/views/PuntoVentaScreen';
import UsersScreen from '../features/admin/views/usuarios/UsersScreen';
import RolesScreen from '../features/admin/views/roles/RolesScreen';
import PermissionsScreen from '../features/admin/views/permisos/PermissionsScreen';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />

      {/* Ruta Base /app -> Muestra el Selector */}
      <Route path="/app" element={<HubScreen />} />

      {/* --- MÓDULO PUNTO DE VENTA (Sin Sidebar de Admin) --- */}
      {/* El POS se renderiza solo, ocupando toda la pantalla para trabajar cómodo */}
      <Route path="/app/punto-venta" element={<PuntoVentaScreen />} />

      {/* --- MÓDULO ADMINISTRACIÓN (Con Sidebar) --- */}
      <Route path="/app/admin" element={<AdminLayout />}>
        {/* Si entran solo a /admin, los redirige a usuarios por defecto */}
        <Route index element={<Navigate to="/app/admin/usuarios" />} />
        
        <Route path="usuarios" element={<UsersScreen />} />
        <Route path="roles" element={<RolesScreen />} />
        <Route path="permisos" element={<PermissionsScreen />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};