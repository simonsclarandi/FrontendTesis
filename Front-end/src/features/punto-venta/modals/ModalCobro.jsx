import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, Alert, Paper,
  List, ListItem, ListItemText, IconButton, Divider,
  Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import { useVenta } from '../context/VentaContext';

// Formato moneda ARS
const formatArs = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

export const ModalCobro = ({ open, onClose, metodosPago, modelos, colores, memorias }) => {
  const {
    carrito, totalVenta, pagos, setPagos, dolarGlobal, 
    cliente, idSucursal, vaciarTodo
  } = useVenta();

  // ... (Toda tu lógica de estados: bonificacion, motivoBonif, observaciones, metodoPago, montoPago, subTransferencias, permuta, fechaVencimiento) ...
  const [bonificacion, setBonificacion] = useState(0);
  const [motivoBonif, setMotivoBonif] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [metodoPago, setMetodoPago] = useState(1);
  const [montoPago, setMontoPago] = useState('');
  const [subTransferencias, setSubTransferencias] = useState([]);
  const [banco, setBanco] = useState('');
  const [subMonto, setSubMonto] = useState('');
  const [permuta, setPermuta] = useState({
    idModelo: '', idColor: '', idMemoria: '', bateria: '', ciclos: '', imei: '', observacion: ''
  });
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  const totalAjustado = totalVenta - bonificacion;
  const totalPagado = pagos.reduce((sum, p) => sum + p.Monto, 0);
  const restante = totalAjustado - totalPagado;

  useEffect(() => {
    if (open) {
      setPagos([]); setBonificacion(0); setMontoPago(totalVenta.toFixed(2));
      setSubTransferencias([]); setFechaVencimiento('');
      setPermuta({ idModelo: '', idColor: '', idMemoria: '', bateria: '', ciclos: '', imei: '', observacion: '' });
    }
  }, [open, totalVenta]);

  const metodoSeleccionado = metodosPago?.find(m => m.value === metodoPago);
  const esTransferencia = metodoSeleccionado?.label?.toLowerCase().includes('transferencia');
  const esPermuta = metodoSeleccionado?.label?.toLowerCase().includes('permuta');
  const esCredito = metodoSeleccionado?.label?.toLowerCase().includes('cuotas');

  // ... (Toda tu lógica de agregarSubTransferencia, eliminarSubTransferencia, useEffect(subTransferencias), agregarPago, eliminarPago, procesarVenta SE MANTIENE EXACTAMENTE IGUAL) ...
  const agregarSubTransferencia = () => {
    if (!banco || !subMonto) return alert('Completá banco y monto');
    const monto = parseFloat(subMonto);
    if (isNaN(monto) || monto <= 0) return alert('Monto inválido');
    setSubTransferencias([...subTransferencias, { banco, monto }]);
    setBanco(''); setSubMonto('');
  };

  useEffect(() => {
    if (esTransferencia) setMontoPago(subTransferencias.reduce((sum, t) => sum + t.monto, 0).toFixed(2));
  }, [subTransferencias, esTransferencia]);

  const eliminarSubTransferencia = (index) => setSubTransferencias(subTransferencias.filter((_, i) => i !== index));

  const agregarPago = () => {
    const monto = parseFloat(montoPago);
    if (isNaN(monto) || monto <= 0) return alert('Ingresá un monto válido');

    let observacionPago = ''; let esApple = false; let datosExtra = {};

    if (esTransferencia && subTransferencias.length === 0) return alert('Agregá al menos una cuenta de transferencia');

    if (esPermuta) {
      if (!permuta.idModelo || !permuta.idColor || !permuta.idMemoria) return alert('Faltan datos del equipo');
      if (!permuta.imei) return alert('El IMEI es OBLIGATORIO');
      if (!permuta.bateria) return alert('Falta porcentaje de batería');
      if (!permuta.observacion) return alert('Falta observación');

      esApple = true;
      const modeloText = modelos?.find(m => m.value === permuta.idModelo)?.label || '';
      const memoriaText = memorias?.find(m => m.value === permuta.idMemoria)?.label || '';
      observacionPago = `Toma: ${modeloText} ${memoriaText} - IMEI: ${permuta.imei} (Bat: ${permuta.bateria}% / ${permuta.ciclos || 0} cy - ${permuta.observacion})`;
      datosExtra = {
        idModelo: parseInt(permuta.idModelo) || null, idColor: parseInt(permuta.idColor) || null,
        idMemoria: parseInt(permuta.idMemoria) || null, bateria: permuta.bateria,
        ciclos: permuta.ciclos ? parseInt(permuta.ciclos) : null, detalleEstado: permuta.observacion, imei: permuta.imei
      };
    }

    if (esCredito) {
      if (!fechaVencimiento) return alert('Seleccioná FECHA LÍMITE');
      const partes = fechaVencimiento.split('-');
      observacionPago = `A Pagar antes del: ${partes[2]}/${partes[1]}/${partes[0]}`;
      datosExtra.fechaVencimiento = fechaVencimiento;
    }

    if (esTransferencia) observacionPago = 'Destinos: ' + subTransferencias.map(t => `${t.banco} ($${t.monto.toFixed(2)})`).join(' + ');

    setPagos([...pagos, { IdMetodoPago: parseInt(metodoPago), NombreMetodo: metodoSeleccionado.label, Monto: monto, Cotizacion: dolarGlobal, Observacion: observacionPago, EsApple: esApple, ...datosExtra }]);
    setMontoPago(''); setSubTransferencias([]); setFechaVencimiento('');
    setPermuta({ idModelo: '', idColor: '', idMemoria: '', bateria: '', ciclos: '', imei: '', observacion: '' });
  };

  const eliminarPago = (index) => setPagos(pagos.filter((_, i) => i !== index));

  const procesarVenta = async () => {
    if (restante > 0.01) return alert(`⚠️ Aún falta cubrir U$S ${restante.toFixed(2)}`);
    if (pagos.length === 0) return alert('No hay pagos registrados');

    const ventaRequest = {
      IdCliente: parseInt(cliente?.id) || 0, IdSucursal: parseInt(idSucursal) || 1, ObservacionesVenta: observaciones,
      Bonificacion: bonificacion, MotivoBonificacion: motivoBonif, TotalVenta: totalAjustado,
      Productos: carrito.map(item => ({ IdProducto: parseInt(item.IdProducto) || 0, Cantidad: parseInt(item.Cantidad) || 1, PrecioUnitario: parseFloat(item.PrecioUnitario) || 0, IdInventario: parseInt(item.IdInventario) || 0 })),
      Pagos: pagos.map(p => ({
        IdMetodoPago: parseInt(p.IdMetodoPago) || 1, Monto: parseFloat(p.Monto) || 0, Cotizacion: parseFloat(p.Cotizacion) || 1,
        Observacion: p.Observacion || '', EsApple: p.EsApple || false, Imei: p.Imei || null, IdModelo: p.IdModelo || null,
        IdColor: p.IdColor || null, IdMemoria: p.IdMemoria || null, Bateria: p.Bateria || null, Ciclos: p.Ciclos || null,
        FechaVencimiento: p.FechaVencimiento || null, DetalleEstado: p.DetalleEstado || null
      }))
    };

    try {
      const response = await fetch('/PuntoVenta/ProcesarVenta', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ventaRequest) });
      const data = await response.json();
      if (data.success) { alert(`✅ Venta registrada con éxito. Ticket #${data.idVenta}`); vaciarTodo(); onClose(); } 
      else { alert(`⚠️ Error: ${data.message}`); }
    } catch (error) { alert('❌ Error de conexión'); }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
          💵 Finalizar Venta
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
      </DialogTitle>

      <DialogContent className="p-0">
        {/* LAYOUT PRINCIPAL: 3 Columnas flexibles en desktop, apiladas en móvil */}
        <div className="flex flex-col md:flex-row w-full h-full min-h-[600px] divide-y md:divide-y-0 md:divide-x border-b">
          
          {/* COLUMNA 1: Ajustes */}
          <div className="w-full md:w-1/3 flex flex-col p-6 bg-gray-50">
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
              🏷️ Ajustes
            </Typography>

            <div className="flex flex-col gap-4 flex-1">
              <TextField label="Bonificación ($)" type="number" fullWidth size="small" value={bonificacion || ''} onChange={(e) => setBonificacion(Math.min(parseFloat(e.target.value) || 0, totalVenta))}
                InputProps={{ startAdornment: <Typography sx={{ color: '#ed6c02', fontWeight: 'bold', mr: 1 }}>-</Typography> }} />
              <TextField label="Motivo del descuento" fullWidth size="small" value={motivoBonif} onChange={(e) => setMotivoBonif(e.target.value)} placeholder="Ej: Atención comercial..." />
              <TextField label="Observaciones" multiline rows={3} fullWidth size="small" value={observaciones} onChange={(e) => setObservaciones(e.target.value)} placeholder="Notas internas..." />
            </div>

            <Divider className="my-4" />

            <div className="text-center">
              <Typography variant="caption" color="text.secondary">Total Venta</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>U$S {totalVenta.toFixed(2)}</Typography>
              {bonificacion > 0 && <Typography variant="caption" sx={{ color: '#d32f2f', display: 'block' }}>(Desc. - U$S {bonificacion.toFixed(2)})</Typography>}

              <Alert severity="success" sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>TOTAL A PAGAR</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.dark' }}>U$S {totalAjustado.toFixed(2)}</Typography>
              </Alert>
            </div>
          </div>

          {/* COLUMNA 2: Pagos Registrados */}
          <div className="w-full md:w-1/3 flex flex-col p-6 bg-white">
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold', mb: 3 }}>
              Pagos Registrados
            </Typography>

            <Paper variant="outlined" sx={{ flex: 1, overflow: 'auto', minHeight: '300px', mb: 3, bgcolor: '#fafafa' }}>
              {pagos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-70">
                  <span className="text-4xl mb-2">💸</span>
                  <p>Aún no hay pagos cargados</p>
                </div>
              ) : (
                <List dense>
                  {pagos.map((pago, index) => (
                    <ListItem key={index} secondaryAction={<IconButton onClick={() => eliminarPago(index)} color="error" size="small"><DeleteIcon /></IconButton>} className="border-b last:border-0">
                      <ListItemText
                        primary={
                          <div className="flex items-center gap-1">
                            <CheckCircleIcon color="success" fontSize="small" />
                            <span className="font-bold text-sm text-gray-800">{pago.NombreMetodo}</span>
                          </div>
                        }
                        secondary={
                          <div className="flex flex-col mt-1">
                            {pago.Observacion && <span className="text-xs text-gray-500">{pago.Observacion}</span>}
                            <div className="mt-1">
                              <span className="font-bold text-gray-900">U$S {pago.Monto.toFixed(2)}</span>
                              <span className="text-xs text-gray-400 ml-2">≈ {formatArs.format(pago.Monto * pago.Cotizacion)}</span>
                            </div>
                          </div>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>

            <div className="p-4 bg-gray-50 rounded-xl border">
              <div className="flex justify-between font-bold border-b pb-2 mb-2 text-gray-700">
                <span>Pagado:</span>
                <span className="text-green-700">U$S {totalPagado.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between font-bold text-lg ${restante <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span>Resta:</span>
                <span>{restante <= 0 ? `¡CUBIERTO! (${Math.abs(restante).toFixed(2)} a favor)` : `U$S ${restante.toFixed(2)}`}</span>
              </div>
            </div>
          </div>

          {/* COLUMNA 3: Agregar Pago */}
          <div className="w-full md:w-1/3 flex flex-col p-6 bg-gray-50">
            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 3 }}>
              Agregar Nuevo Pago
            </Typography>

            <Paper elevation={2} sx={{ p: 3, borderRadius: '12px' }}>
              <div className="flex flex-col gap-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Forma de Pago</InputLabel>
                  <Select value={metodoPago} onChange={(e) => { setMetodoPago(e.target.value); setSubTransferencias([]); setPermuta({ idModelo: '', idColor: '', idMemoria: '', bateria: '', ciclos: '', imei: '', observacion: '' }); setFechaVencimiento(''); }} label="Forma de Pago">
                    {metodosPago?.map(m => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
                  </Select>
                </FormControl>

                <div>
                  <TextField label="Monto (U$S)" type="number" fullWidth size="small" value={montoPago} onChange={(e) => setMontoPago(e.target.value)} disabled={esTransferencia}
                    InputProps={{ startAdornment: <Typography sx={{ bgcolor: '#2e7d32', color: 'white', px: 1.5, py: 0.5, borderRadius: '4px', mr: 1, fontSize: '0.875rem' }}>U$S</Typography> }} />
                  <Typography variant="caption" sx={{ textAlign: 'right', display: 'block', color: 'text.secondary', mt: 0.5 }}>
                    ≈ {formatArs.format((parseFloat(montoPago) || 0) * dolarGlobal)}
                  </Typography>
                </div>

                {/* SUB-FORMULARIOS (Usan Grid 12 de Tailwind) */}
                {esTransferencia && (
                  <Alert severity="info" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>Desglose de Transferencias</Typography>
                    
                    <div className="grid grid-cols-12 gap-2 mb-3">
                      <div className="col-span-12 sm:col-span-5"><TextField label="Banco" size="small" fullWidth value={banco} onChange={(e) => setBanco(e.target.value)} /></div>
                      <div className="col-span-8 sm:col-span-4"><TextField label="Monto" type="number" size="small" fullWidth value={subMonto} onChange={(e) => setSubMonto(e.target.value)} /></div>
                      <div className="col-span-4 sm:col-span-3">
                        <Button variant="contained" color="info" size="small" fullWidth onClick={agregarSubTransferencia} sx={{ height: '100%', minWidth: 0 }}><AddIcon /></Button>
                      </div>
                    </div>

                    <List dense sx={{ maxHeight: 120, overflow: 'auto', bgcolor: 'white', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                      {subTransferencias.length === 0 ? (
                        <ListItem><ListItemText primary="Sin cuentas" sx={{ textAlign: 'center', color: 'text.secondary', fontStyle: 'italic' }} /></ListItem>
                      ) : (
                        subTransferencias.map((t, i) => (
                          <ListItem key={i} dense secondaryAction={<IconButton size="small" onClick={() => eliminarSubTransferencia(i)} color="error"><DeleteIcon fontSize="small" /></IconButton>}>
                            <ListItemText primary={`${t.banco}: U$S ${t.monto.toFixed(2)}`} primaryTypographyProps={{ variant: 'body2' }} />
                          </ListItem>
                        ))
                      )}
                    </List>
                    <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 'bold', mt: 1 }}>Total: U$S {subTransferencias.reduce((s, t) => s + t.monto, 0).toFixed(2)}</Typography>
                  </Alert>
                )}

                {esPermuta && (
                  <Alert severity="warning" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>📱 Datos del Equipo</Typography>
                    
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-6"><FormControl fullWidth size="small"><InputLabel>Modelo</InputLabel><Select value={permuta.idModelo} onChange={(e) => setPermuta({...permuta, idModelo: e.target.value})} label="Modelo"><MenuItem value=""><em>Seleccionar...</em></MenuItem>{modelos?.map(m => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}</Select></FormControl></div>
                      <div className="col-span-6"><FormControl fullWidth size="small"><InputLabel>Color</InputLabel><Select value={permuta.idColor} onChange={(e) => setPermuta({...permuta, idColor: e.target.value})} label="Color"><MenuItem value=""><em>Seleccionar...</em></MenuItem>{colores?.map(c => <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>)}</Select></FormControl></div>
                      <div className="col-span-6"><FormControl fullWidth size="small"><InputLabel>Memoria</InputLabel><Select value={permuta.idMemoria} onChange={(e) => setPermuta({...permuta, idMemoria: e.target.value})} label="Memoria"><MenuItem value=""><em>Seleccionar...</em></MenuItem>{memorias?.map(m => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}</Select></FormControl></div>
                      <div className="col-span-3"><TextField label="Bat %" type="number" size="small" fullWidth value={permuta.bateria} onChange={(e) => setPermuta({...permuta, bateria: e.target.value})} /></div>
                      <div className="col-span-3"><TextField label="Ciclos" type="number" size="small" fullWidth value={permuta.ciclos} onChange={(e) => setPermuta({...permuta, ciclos: e.target.value})} /></div>
                      <div className="col-span-12"><TextField label="IMEI *" size="small" fullWidth value={permuta.imei} onChange={(e) => setPermuta({...permuta, imei: e.target.value})} /></div>
                      <div className="col-span-12"><TextField label="Detalle (Rayas, golpes...) *" size="small" fullWidth value={permuta.observacion} onChange={(e) => setPermuta({...permuta, observacion: e.target.value})} /></div>
                    </div>
                  </Alert>
                )}

                {esCredito && (
                  <Alert severity="error" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>Registro de Deuda</Typography>
                    <TextField label="Fecha Límite de Pago *" type="date" fullWidth size="small" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} InputLabelProps={{ shrink: true }} />
                  </Alert>
                )}

                <Button variant="contained" color="success" fullWidth onClick={agregarPago} startIcon={<AddIcon />} sx={{ mt: 1, py: 1.5, fontWeight: 'bold', textTransform: 'none', borderRadius: '8px' }}>
                  AGREGAR PAGO
                </Button>
              </div>
            </Paper>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: 'grey.100' }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: 'none', fontWeight: 'medium' }}>
          Cancelar
        </Button>
        <Button variant="contained" color="primary" onClick={procesarVenta} disabled={restante > 0.01} sx={{ px: 4, fontWeight: 'bold', textTransform: 'none', borderRadius: '8px', boxShadow: 2 }}>
          ✅ CONFIRMAR VENTA
        </Button>
      </DialogActions>
    </Dialog>
  );
};