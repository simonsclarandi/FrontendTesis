import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, TextField, Dialog, DialogTitle, DialogContent, 
  DialogActions, IconButton, Chip, Tooltip, Switch, FormControlLabel, Select, MenuItem 
} from '@mui/material';
import { 
  Search, Add, Edit, Visibility, LocalShipping, 
  Store, Lock, QrCode2, BatteryChargingFull, Sync, PointOfSale
} from '@mui/icons-material';

const InventarioList = () => {
  const navigate = useNavigate();

  // --- ESTADOS Y SIMULACIÓN DE DATOS ---
  const [sucursalActual, setSucursalActual] = useState(1); // 1 = Mi sucursal, 2 = Otra
  const miSucursalReal = 1;
  const esMiStock = sucursalActual === miSucursalReal;

  const [mostrarAgotados, setMostrarAgotados] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  // Modal de transferencia
  const [openModal, setOpenModal] = useState(false);
  const [productoTransferir, setProductoTransferir] = useState(null);

  // Datos de prueba (Sustituirá a tu Model de C#)
  const [inventario] = useState([
    { 
      id: 101, producto: 'iPhone 15 Pro', modelo: '256GB Natural Titanium', imei: '354890123456789', 
      color: 'Titanio', memoria: '256GB', bateria: 100, ciclos: 0, stock: 1, precioMenor: 1200, esSerializado: true
    },
    { 
      id: 102, producto: 'Funda MagSafe', modelo: 'iPhone 15 Pro', imei: null, 
      color: 'Transparente', memoria: null, bateria: null, ciclos: null, stock: 15, precioMenor: 45, esSerializado: false
    },
    { 
      id: 103, producto: 'MacBook Air M2', modelo: '8-Core CPU, 8GB RAM', imei: 'C02F9321PL', 
      color: 'Space Gray', memoria: '256GB SSD', bateria: 85, ciclos: 142, stock: 0, precioMenor: 950, esSerializado: true
    }
  ]);

  // --- LÓGICA DE FILTRADO LOCAL ---
  const inventarioFiltrado = inventario.filter(item => {
    const coincideBusqueda = item.producto.toLowerCase().includes(busqueda.toLowerCase()) || 
                             (item.imei && item.imei.includes(busqueda));
    const coincideStock = mostrarAgotados ? true : item.stock > 0;
    return coincideBusqueda && coincideStock;
  });

  // --- MANEJADORES DE MODAL ---
  const abrirTransferencia = (item) => {
    setProductoTransferir({ ...item, cantidadPedir: 1 });
    setOpenModal(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">

      <button onClick={() => navigate('/app')}>Volver al Menú</button>
      
      {/* 1. HEADER Y SELECTOR DE SUCURSAL */}
      <div className={`bg-white p-5 rounded-2xl shadow-sm border-t-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${esMiStock ? 'border-t-blue-500' : 'border-t-orange-400'}`}>
        <div>
          <h6 className={`text-xs font-bold uppercase mb-1 ${esMiStock ? 'text-blue-600' : 'text-orange-500'}`}>
            {esMiStock ? <><Store fontSize="small" className="mr-1"/> Estás en tu sucursal</> : <><Lock fontSize="small" className="mr-1"/> Modo Lectura: Sucursal Ajena</>}
          </h6>
          <h3 className={`text-2xl font-bold ${esMiStock ? 'text-slate-800' : 'text-orange-600'}`}>
            {sucursalActual === 1 ? 'Centro (Córdoba)' : 'La Calera'}
          </h3>
        </div>

        {/* Agregamos w-full para que ocupe todo el ancho en móvil, y justify-between para separar el texto del select */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
          <span className="text-sm font-bold text-slate-500 whitespace-nowrap">Ver Stock de:</span>
          <Select 
            size="small" 
            value={sucursalActual} 
            onChange={(e) => setSucursalActual(e.target.value)}
            className="bg-white font-bold flex-1 sm:flex-none sm:min-w-[150px]"
          >
            <MenuItem value={1}>Centro (Córdoba)</MenuItem>
            <MenuItem value={2}>La Calera</MenuItem>
          </Select>
        </div>
      </div>

      {/* 2. BARRA DE BÚSQUEDA Y BOTONES DE ACCIÓN */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        
        {/* Buscador y switch de agotados (Apilados en móvil muy chico, lado a lado en mediano) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-1">
          <TextField 
            placeholder="Buscar equipo, modelo, IMEI..." 
            size="small" 
            fullWidth
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            InputProps={{ startAdornment: <Search className="text-slate-400 mr-2" /> }}
            className="bg-white shadow-sm"
          />
          <div className="bg-white px-4 py-1.5 rounded-lg border border-slate-200 shadow-sm whitespace-nowrap self-start sm:self-auto">
            <FormControlLabel 
              control={<Switch size="small" checked={mostrarAgotados} onChange={(e) => setMostrarAgotados(e.target.checked)} />} 
              label={<span className="text-sm font-bold text-slate-600">Ver Agotados</span>} 
            />
          </div>
        </div>

        {/* Botones apilados (flex-col) en móvil, y en fila (sm:flex-row) en PC. Ocupan el 100% del ancho en móvil */}
        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <Button 
            variant="outlined" color="success" startIcon={<PointOfSale />}
            onClick={() => navigate('/app/punto-venta')} 
            className="w-full sm:w-auto bg-white font-bold"
          >
            Ir a Caja
          </Button>
          {(esMiStock) && (
            <Button 
              variant="contained" color="primary" startIcon={<Add />}
              onClick={() => navigate('/app/inventario/nuevo')} 
              className="w-full sm:w-auto font-bold shadow-md bg-blue-600"
            >
              Nuevo Ingreso
            </Button>
          )}
        </div>
      </div>

      {/* 3. TABLA PRINCIPAL */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Dispositivo / IMEI</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Características</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Stock</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Precio Venta</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventarioFiltrado.length === 0 ? (
                <tr><td colSpan="5" className="p-8 text-center text-slate-500">No se encontraron productos.</td></tr>
              ) : (
                inventarioFiltrado.map((item) => (
                  <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${item.stock === 0 ? 'opacity-60 bg-slate-50' : ''}`}>
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{item.producto}</div>
                      <div className="text-sm text-slate-500">{item.modelo}</div>
                      {item.imei && (
                        <div className="text-xs text-slate-400 mt-1 font-mono flex items-center">
                          <QrCode2 fontSize="inherit" className="mr-1"/> {item.imei}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {item.color && <Chip label={`🎨 ${item.color}`} size="small" variant="outlined" />}
                        {item.memoria && <Chip label={`💾 ${item.memoria}`} size="small" className="bg-slate-800 text-white" />}
                        {item.bateria !== null && (
                          <Chip 
                            label={`🔋 ${item.bateria}%`} size="small" 
                            color={item.bateria > 80 ? 'success' : 'warning'} className="font-bold" 
                          />
                        )}
                        {item.ciclos !== null && <Chip label={<><Sync fontSize="inherit" className="mr-1"/>{item.ciclos} cy</>} size="small" color="info" variant="outlined" />}
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Chip 
                        label={`${item.stock} un.`} 
                        color={item.stock === 0 ? 'error' : item.stock <= 2 ? 'warning' : 'default'}
                        className={`font-bold ${item.stock > 2 ? 'bg-slate-100' : ''}`}
                      />
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-emerald-600 text-lg">U$S {item.precioMenor.toLocaleString()}</div>
                    </td>
                    <td className="p-4 text-right">
                      {esMiStock ? (
                        <>
                          <Tooltip title="Editar">
                            <IconButton size="small" color="primary" onClick={() => navigate(`/app/inventario/editar/${item.id}`)}><Edit fontSize="small" /></IconButton>
                          </Tooltip>
                          <Tooltip title="Ver Detalle">
                            <IconButton size="small" color="default" onClick={() => navigate(`/app/inventario/detalle/${item.id}`)}><Visibility fontSize="small" /></IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip title="Solicitar Traspaso">
                          <Button 
                            variant="contained" color="warning" size="small" startIcon={<LocalShipping />}
                            className="bg-orange-500 font-bold" onClick={() => abrirTransferencia(item)}
                          >
                            Traer
                          </Button>
                        </Tooltip>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL DE TRANSFERENCIA */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-orange-500 text-white font-bold flex items-center">
          <LocalShipping className="mr-2" /> Solicitar Transferencia
        </DialogTitle>
        <DialogContent className="pt-6 text-center">
          <p className="text-slate-500 text-sm mb-1">Vas a solicitar el producto:</p>
          <h4 className="font-bold text-xl text-blue-600 mb-4">{productoTransferir?.producto}</h4>
          
          {productoTransferir?.esSerializado ? (
            <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-200">
              <strong>Producto Único:</strong> Se transferirá la unidad completa (Stock: 1).
            </div>
          ) : (
            <div className="text-left">
              <label className="font-bold text-sm text-slate-700">Cantidad a transferir</label>
              <div className="flex items-center mt-2">
                <Button variant="outlined" onClick={() => setProductoTransferir({...productoTransferir, cantidadPedir: Math.max(1, productoTransferir.cantidadPedir - 1)})}>-</Button>
                <TextField 
                  value={productoTransferir?.cantidadPedir} 
                  inputProps={{ className: "text-center font-bold" }}
                  className="mx-2 w-20"
                />
                <Button variant="outlined" onClick={() => setProductoTransferir({...productoTransferir, cantidadPedir: Math.min(productoTransferir.stock, productoTransferir.cantidadPedir + 1)})}>+</Button>
              </div>
              <div className="text-right text-xs text-slate-500 mt-1">
                Stock máximo: <strong>{productoTransferir?.stock}</strong>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-4 bg-slate-50">
          <Button onClick={() => setOpenModal(false)} color="inherit">Cancelar</Button>
          <Button variant="contained" color="warning" className="bg-orange-500 font-bold">
            Confirmar Traspaso
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default InventarioList;