import { Button } from '@mui/material';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
      
      {/* Logo o Nombre del Local */}
      <div className="text-2xl font-black tracking-tighter text-gray-900">
        PUNTO<span className="text-blue-600">CELL</span>
      </div>
      
      {/* Enlaces de la tienda (Ocultos en celulares, visibles en PC) */}
      <div className="hidden space-x-8 md:flex">
        <a href="#" className="font-medium text-gray-600 transition-colors hover:text-blue-600">Inicio</a>
        <a href="#" className="font-medium text-gray-600 transition-colors hover:text-blue-600">Catálogo</a>
        <a href="#" className="font-medium text-gray-600 transition-colors hover:text-blue-600">Servicio Técnico</a>
      </div>

      {/* Botón de Acceso Interno */}
      <Button 
        component={Link} 
        to="/login" 
        variant="outlined" 
        size="small"
        startIcon={<LockPersonIcon />}
        sx={{ 
          color: '#4b5563', 
          borderColor: '#e5e7eb',
          textTransform: 'none',
          fontWeight: 'bold',
          borderRadius: '8px',
          '&:hover': { backgroundColor: '#f3f4f6', borderColor: '#d1d5db' }
        }}
      >
        Gestión Empleados
      </Button>

    </nav>
  );
}