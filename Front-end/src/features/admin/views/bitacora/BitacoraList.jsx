import React, { useState } from 'react';
import { Button, TextField, InputAdornment, Chip } from '@mui/material';

// Importaciones directas de iconos (100% a prueba de fallos de Vite)
import Security from '@mui/icons-material/Security';
import Search from '@mui/icons-material/Search';
import Login from '@mui/icons-material/Login';
import Warning from '@mui/icons-material/Warning';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Inventory from '@mui/icons-material/Inventory';
import Delete from '@mui/icons-material/Delete';
import Info from '@mui/icons-material/Info';
import Person from '@mui/icons-material/Person';

const BitacoraList = () => {
  // --- ESTADOS: FILTROS ---
  const [filtros, setFiltros] = useState({
    buscar: '',
    fecha: ''
  });

  // --- MOCK DATA: Registros de Auditoría ---
  const [logs] = useState([
    { id: 1, hora: '16/05 14:30:12', sucursal: 'Centro', usuario: 'simon.admin', accion: 'Login Exitoso', detalle: 'Usuario ingresó al sistema', ip: '192.168.1.15' },
    { id: 2, hora: '16/05 14:35:00', sucursal: 'Centro', usuario: 'simon.admin', accion: 'Nueva Venta', detalle: 'Ticket #4582 generado por U$S 1200', ip: '192.168.1.15' },
    { id: 3, hora: '16/05 15:10:45', sucursal: 'La Calera', usuario: 'carlos.vend', accion: 'Login Fallido', detalle: 'Contraseña incorrecta (Intento 1)', ip: '190.22.45.11' },
    { id: 4, hora: '16/05 15:20:10', sucursal: 'Global', usuario: 'Sistema / Anónimo', accion: 'Anular Venta', detalle: 'Se solicitó anulación de Ticket #4580', ip: '127.0.0.1' },
    { id: 5, hora: '16/05 16:05:00', sucursal: 'Centro', usuario: 'simon.admin', accion: 'Ajuste de Inventario', detalle: 'Stock actualizado para iPhone 15 Pro', ip: '192.168.1.15' },
    { id: 6, hora: '16/05 16:30:22', sucursal: 'Centro', usuario: 'ana.vend', accion: 'Consulta Cliente', detalle: 'Búsqueda de historial DNI 35123456', ip: '192.168.1.20' }
  ]);

  // --- LÓGICA DE FILTRADO LOCAL ---
  const logsFiltrados = logs.filter(log => {
    const coincideTexto = log.usuario.toLowerCase().includes(filtros.buscar.toLowerCase()) || 
                          log.accion.toLowerCase().includes(filtros.buscar.toLowerCase()) ||
                          log.detalle.toLowerCase().includes(filtros.buscar.toLowerCase());
    return coincideTexto;
  });

  // --- MANEJADORES ---
  const handleFiltrar = (e) => {
    e.preventDefault();
    console.log("Aplicando filtros:", filtros);
  };

  const limpiarFiltros = () => {
    setFiltros({ buscar: '', fecha: '' });
  };

  // --- FUNCIÓN HELPER: Estilos según la acción (El equivalente a tus IFs de C#) ---
  const getEstiloAccion = (accion) => {
    const acc = accion.toLowerCase();
    if (acc.includes('login') && !acc.includes('fallido')) return { color: 'text-blue-600', Icono: Login };
    if (acc.includes('fallido')) return { color: 'text-red-600', Icono: Warning };
    if (acc.includes('venta')) return { color: 'text-emerald-600', Icono: ShoppingCart };
    if (acc.includes('inventario') || acc.includes('stock')) return { color: 'text-orange-500', Icono: Inventory };
    if (acc.includes('eliminar') || acc.includes('anular')) return { color: 'text-red-500', Icono: Delete };
    return { color: 'text-slate-700', Icono: Info }; // Por defecto
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Security className="text-slate-700" fontSize="large" /> Bitácora de Seguridad
          </h2>
          <Chip label="Últimos 200 movimientos" size="small" className="bg-slate-200 text-slate-700 font-bold" />
        </div>

        {/* PANEL DE BÚSQUEDA */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6">
          <form onSubmit={handleFiltrar} className="flex flex-col md:flex-row gap-4 items-center">
            
            <TextField 
              placeholder="Buscar por usuario, acción, detalle..." 
              size="small" fullWidth
              value={filtros.buscar}
              onChange={(e) => setFiltros({...filtros, buscar: e.target.value})}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search /></InputAdornment> }}
              className="bg-slate-50"
            />
            
            <TextField 
              type="date" size="small"
              value={filtros.fecha}
              onChange={(e) => setFiltros({...filtros, fecha: e.target.value})}
              className="w-full md:w-48 bg-slate-50"
            />

            <div className="flex w-full md:w-auto gap-2">
              <Button type="submit" variant="contained" className="bg-blue-600 font-bold w-full md:w-auto shadow-none">
                Filtrar
              </Button>
              <Button variant="outlined" color="inherit" onClick={limpiarFiltros} className="bg-white font-bold w-full md:w-auto whitespace-nowrap">
                Limpiar
              </Button>
            </div>

          </form>
        </div>

        {/* TABLA DE AUDITORÍA */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white uppercase tracking-wider text-xs">
                <tr>
                  <th className="p-3 pl-4">Hora</th>
                  <th className="p-3">Sucursal</th>
                  <th className="p-3">Usuario</th>
                  <th className="p-3">Acción</th>
                  <th className="p-3">Detalle</th>
                  {/* Ocultamos la IP en celulares para que no se rompa la tabla */}
                  <th className="p-3 hidden md:table-cell">IP</th> 
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logsFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500">
                      No se encontraron registros de auditoría con esos filtros.
                    </td>
                  </tr>
                ) : (
                  logsFiltrados.map((item) => {
                    const { color, Icono } = getEstiloAccion(item.accion);

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 pl-4 font-mono text-slate-500 whitespace-nowrap">
                          {item.hora}
                        </td>
                        <td className="p-3">
                          <Chip label={item.sucursal} size="small" variant="outlined" className="text-slate-500" />
                        </td>
                        <td className="p-3">
                          {item.usuario.includes('Anónimo') ? (
                            <span className="text-slate-400 italic">{item.usuario}</span>
                          ) : (
                            <div className="flex items-center gap-1 font-bold text-slate-700">
                              <Person fontSize="small" className="text-slate-400" /> {item.usuario}
                            </div>
                          )}
                        </td>
                        <td className={`p-3 font-bold whitespace-nowrap ${color} flex items-center gap-2`}>
                          <Icono fontSize="small" /> {item.accion}
                        </td>
                        <td className="p-3 text-slate-600 max-w-xs truncate" title={item.detalle}>
                          {item.detalle}
                        </td>
                        <td className="p-3 font-mono text-xs text-slate-400 hidden md:table-cell">
                          {item.ip}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BitacoraList;