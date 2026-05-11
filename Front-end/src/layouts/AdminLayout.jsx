import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // ¡Importación directa y segura!

// Ajusta la ruta de importación según dónde hayas puesto tu Sidebar
import Sidebar from '../features/admin/components/Sidebar'; 

export default function AdminLayout() {
  // Estado para controlar si el menú está abierto o cerrado en móviles
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* 1. OVERLAY (Fondo oscuro) PARA MÓVILES */}
      {/* Si el menú está abierto en celular, mostramos un fondo semitransparente que al tocarlo cierra el menú */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. CONTENEDOR DEL SIDEBAR */}
      {/* - fixed: Flota en móvil
        - md:relative: Se ancla a la cuadrícula en PC
        - -translate-x-full: Oculto a la izquierda por defecto
        - md:translate-x-0: Siempre visible en PC
      */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform bg-slate-900 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        {/* Le pasamos la función onClose por si quieres poner un botón "X" dentro de tu componente Sidebar */}
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* 3. ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col w-full h-full min-w-0">
        
        {/* NAVBAR MÓVIL (Solo visible en pantallas chicas) */}
        <div className="md:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between border-b border-gray-200 z-30">
          <div className="flex items-center gap-3">
            <IconButton onClick={() => setSidebarOpen(true)} edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <h1 className="font-bold text-slate-800 text-lg m-0">Punto Cell</h1>
          </div>
        </div>
        
        {/* CONTENIDO DE LA PANTALLA (Outlet) */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}