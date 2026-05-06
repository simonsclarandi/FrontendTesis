import { Outlet } from 'react-router-dom';
// Ajusta la ruta de importación según dónde hayas puesto tu Sidebar
import Sidebar from '../features/admin/components/Sidebar'; 

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Tu menú lateral fijo */}
      <Sidebar />

      {/* El área principal donde se renderizarán las distintas pantallas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Aquí podrías poner un Navbar superior si lo necesitas */}
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {/* Aquí es donde la magia ocurre: Outlet renderiza la ruta hija activa */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}