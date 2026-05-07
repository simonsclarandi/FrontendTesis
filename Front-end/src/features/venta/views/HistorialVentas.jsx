import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, TextField, InputAdornment, Dialog, DialogTitle, 
  DialogContent, DialogActions, IconButton, Chip, Tooltip,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { 
  FilterList, 
  DeleteSweep as Eraser,
  Add, 
  Description as FileText, 
  Delete as Trash, 
  History as Clock, 
  CheckCircle, 
  Block as Ban, 
  Paid as Payments,
  Visibility,
  PriceCheck,
  ArrowBack
} from '@mui/icons-material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const HistorialVentas = () => {
  const navigate = useNavigate();

  // --- ESTADOS: DATOS ---
  const [ventas, setVentas] = useState([
    { id: 4582, fecha: '12/05/2024 18:30', clienteNombre: 'Juan Pérez', sucursalNombre: 'Centro', totalVenta: 1250, estado: 'Vendido' },
    { id: 4583, fecha: '13/05/2024 10:15', clienteNombre: 'Ana Lopez', sucursalNombre: 'La Calera', totalVenta: 900, estado: 'Anulada' }
  ]);

  const [deudas, setDeudas] = useState([
    { idVenta: 4582, idPago: 101, cliente: 'Juan Pérez', monto: 500.00, vencimiento: '2024-06-01', diasRestantes: 5 },
    { idVenta: 4580, idPago: 102, cliente: 'Marcos Sosa', monto: 1200.00, vencimiento: '2024-05-10', diasRestantes: -10 }
  ]);

  /* Estados vacíos
  const [ventas, setVentas] = useState([]);
  const [deudas, setDeudas] = useState([]);
  const [cargando, setCargando] = useState(false);
  */

  /*
  useEffect(() => {
    // Cuando el componente carga por primera vez, pedimos las ventas
    cargarVentas(filtros);
  }, []);
  */

  // --- ESTADOS: FILTROS Y MODALES ---
  const [filtros, setFiltros] = useState({
    cliente: '', producto: '', vendedor: '', desde: null, hasta: null, montoMin: ''
  });

  const [openDeudas, setOpenDeudas] = useState(false);
  const [openCobro, setOpenCobro] = useState(false);
  const [cobroData, setCobroData] = useState({
    idPago: null,
    cliente: '',
    montoDeuda: 0,
    montoAAbonar: 0,
    metodoPago: 1
  });

  // --- FUNCIONES LÓGICA ---
  const handleInputChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiarFiltros = () => {
    setFiltros({ cliente: '', producto: '', vendedor: '', desde: null, hasta: null, montoMin: '' });
  };

  const abrirModalCobro = (deuda) => {
    setCobroData({
      idPago: deuda.idPago,
      cliente: deuda.cliente,
      montoDeuda: deuda.monto,
      montoAAbonar: deuda.monto, // Sugerimos el total
      metodoPago: 1
    });
    setOpenCobro(true);
  };

  const confirmarCobro = () => {
    console.log("Registrando cobro...", cobroData);
    alert(`✅ Pago de U$S ${cobroData.montoAAbonar} registrado para ${cobroData.cliente}`);
    setOpenCobro(false);
    // Aquí harías el re-fetch de deudas
  };

  /* --- FUNCIONES DE API ---
  const aplicarFiltros = (e) => {
    e.preventDefault();
    // Llamamos a la API con el estado actual de los filtros
    cargarVentas(filtros);
  };

  const abrirModalDeudas = () => {
    cargarDeudas(); // Pedimos los datos frescos
    setOpenDeudas(true); // Abrimos el modal
  };

  const confirmarCobro = async () => {
    try {
      // Hacemos el POST a tu API
      const response = await fetch('https://tu-api.com/api/pagos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cobroData)
      });

      if (response.ok) {
        alert(`✅ Pago registrado exitosamente.`);
        setOpenCobro(false);
        cargarDeudas(); // Recargamos la lista de deudas para actualizarla
        cargarVentas(filtros); // Recargamos la tabla principal
      }
    } catch (error) {
      alert("Error al registrar el pago.");
    }
  };
  */

  /* --- LLAMADAS A LA API ---

  const cargarVentas = async (filtrosAplicar) => {
    setCargando(true);
    try {
      // 1. Limpiamos los filtros vacíos y formateamos las fechas
      const queryParams = new URLSearchParams();
      if (filtrosAplicar.cliente) queryParams.append('cliente', filtrosAplicar.cliente);
      if (filtrosAplicar.desde) queryParams.append('desde', filtrosAplicar.desde.format('YYYY-MM-DD'));
      if (filtrosAplicar.hasta) queryParams.append('hasta', filtrosAplicar.hasta.format('YYYY-MM-DD'));
      // ... agregar el resto de filtros

      // 2. Hacemos la petición (Ajusta la URL a tu backend real)
      const response = await fetch(`https://tu-api.com/api/ventas?${queryParams.toString()}`);
      
      if (!response.ok) throw new Error('Error en la red');
      
      const data = await response.json();
      setVentas(data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      alert("Hubo un problema al cargar el historial.");
    } finally {
      setCargando(false);
    }
  };

  const cargarDeudas = async () => {
    try {
      const response = await fetch(`https://tu-api.com/api/deudas/pendientes`);
      const data = await response.json();
      setDeudas(data);
    } catch (error) {
      console.error("Error al obtener deudas:", error);
    }
  }; */

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate('/app')} 
            className="text-gray-500 capitalize"
        >
            Menú Principal
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
            <FileText sx={{ color: '#1e293b' }} /> Historial de Ventas
          </h2>
          <div className="h-1 w-16 bg-blue-600 mx-auto rounded-full mt-1"></div>
        </div>
        <Button 
          variant="contained" color="success" startIcon={<Add />}
          className="bg-green-600 hover:bg-green-700 shadow-md capitalize px-6"
            onClick={() => navigate('/app/punto-venta')}
        >
          Nueva Venta
        </Button>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 mb-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField label="Cliente o DNI" name="cliente" size="small" fullWidth value={filtros.cliente} onChange={handleInputChange} />
            <TextField label="Producto" name="producto" size="small" fullWidth value={filtros.producto} onChange={handleInputChange} />
            <TextField label="Vendedor" name="vendedor" size="small" fullWidth value={filtros.vendedor} onChange={handleInputChange} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde" value={filtros.desde}
                onChange={(val) => setFiltros({...filtros, desde: val})}
                slotProps={{ textField: { size: 'small', sx: { width: 160 } } }}
              />
              <DatePicker
                label="Hasta" value={filtros.hasta}
                onChange={(val) => setFiltros({...filtros, hasta: val})}
                slotProps={{ textField: { size: 'small', sx: { width: 160 } } }}
              />
            </LocalizationProvider>
            
            <TextField 
              label="Monto Mín" name="montoMin" type="number" size="small" sx={{ width: 130 }}
              InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
              value={filtros.montoMin} onChange={handleInputChange}
            />

            <div className="flex-1 flex justify-end gap-2">
              <Button 
                variant="outlined" color="error" startIcon={<Clock />}
                onClick={() => setOpenDeudas(true)}
                className="font-bold border-red-100 bg-red-50/50 hover:bg-red-50"
              >
                Cuentas por Cobrar
              </Button>
              <IconButton onClick={limpiarFiltros} title="Limpiar Filtros" className="bg-gray-100">
                <Eraser />
              </IconButton>
              <Button variant="contained" startIcon={<FilterList />} className="bg-slate-800 px-8 shadow-none">
                Filtrar
              </Button> 
            </div>
          </div>
        </form>
      </div>

      {/* Tabla Principal */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase"># ID</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Fecha</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Total</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Estado</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ventas.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-700">#{item.id}</td>
                <td className="p-4 text-sm text-slate-600">{item.fecha}</td>
                <td className="p-4 text-sm font-medium text-slate-700">{item.clienteNombre}</td>
                <td className="p-4 font-bold text-emerald-600">U$S {item.totalVenta.toLocaleString()}</td>
                <td className="p-4 text-center">
                  <Chip 
                    label={item.estado} size="small" 
                    color={item.estado === 'Vendido' ? 'success' : 'error'}
                    variant="soft" className="font-bold text-[10px]"
                  />
                </td>
                <td className="p-4 text-right">
                  <Tooltip title="Ver Detalle">
                    <IconButton size="small" color="primary" onClick={() => navigate(`/app/ventas/detalle/${item.id}`)}>
                      <Visibility fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Anular">
                    <IconButton size="small" color="error">
                      <Trash fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL 1: Lista de Deudas */}
      <Dialog open={openDeudas} onClose={() => setOpenDeudas(false)} maxWidth="md" fullWidth>
        <DialogTitle className="bg-red-600 text-white flex items-center gap-2">
          <Payments /> Cuentas por Cobrar
        </DialogTitle>
        <DialogContent dividers className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 sticky top-0">
              <tr className="border-b">
                <th className="p-4 text-left">Cliente / Venta</th>
                <th className="p-4 text-right">Deuda</th>
                <th className="p-4 text-center">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {deudas.map((deuda) => (
                <tr key={deuda.idPago} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold">{deuda.cliente}</div>
                    <div className="text-xs text-gray-500">Venta #{deuda.idVenta} • Vence: {deuda.vencimiento}</div>
                  </td>
                  <td className="p-4 text-right font-bold text-red-600">U$S {deuda.monto.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <Chip 
                      label={deuda.diasRestantes < 0 ? `Venció hace ${Math.abs(deuda.diasRestantes)} días` : `Faltan ${deuda.diasRestantes} días`}
                      color={deuda.diasRestantes < 0 ? 'error' : 'warning'}
                      size="small" className="text-[10px]"
                    />
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="contained" color="success" size="small" 
                      startIcon={<PriceCheck />} onClick={() => navigate(`/app/ventas/detalle/${deuda.idVenta}`)}
                      className="bg-green-600 capitalize"
                    >
                      Cobrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeudas(false)} color="inherit">Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* MODAL 2: Registrar Cobro (Formulario) */}
      <Dialog open={openCobro} onClose={() => setOpenCobro(false)} maxWidth="xs" fullWidth>
        <DialogTitle className="bg-emerald-600 text-white text-center text-sm font-bold uppercase tracking-widest">
           Registrar Cobro
        </DialogTitle>
        <DialogContent className="pt-6 text-center">
          <div className="mb-4">
            <div className="text-xs text-gray-400 uppercase font-bold">Cobrando a</div>
            <div className="text-lg font-bold text-slate-800">{cobroData.cliente}</div>
            <div className="mt-2 inline-block px-4 py-1 bg-red-50 text-red-600 rounded-full border border-red-100 text-sm font-bold">
              Debe: U$S {cobroData.montoDeuda.toFixed(2)}
            </div>
          </div>

          <TextField 
            label="Monto a Abonar (U$S)" 
            fullWidth type="number"
            value={cobroData.montoAAbonar}
            onChange={(e) => setCobroData({...cobroData, montoAAbonar: e.target.value})}
            className="mb-4"
            slotProps={{
                input: {
                className: "text-2xl font-bold text-emerald-600"
                }
            }}
          />

          <FormControl fullWidth size="small" className="text-left mt-2">
            <InputLabel>Método de Pago</InputLabel>
            <Select
              value={cobroData.metodoPago}
              label="Método de Pago"
              onChange={(e) => setCobroData({...cobroData, metodoPago: e.target.value})}
            >
              <MenuItem value={1}>Efectivo</MenuItem>
              <MenuItem value={2}>Transferencia</MenuItem>
              <MenuItem value={3}>Permuta</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50">
          <Button 
            fullWidth variant="contained" color="success" 
            className="bg-emerald-600 py-3 font-bold"
            onClick={confirmarCobro}
          >
            CONFIRMAR PAGO
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default HistorialVentas;