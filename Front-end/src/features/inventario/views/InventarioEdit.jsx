import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, TextField, MenuItem, Select, FormControl, InputLabel, 
  InputAdornment 
} from '@mui/material';
import { 
  ArrowBack, Save, Edit as EditIcon, Store, LocalShipping, 
  Smartphone, QrCode2, Palette, SdCard, BatteryChargingFull, 
  Sync, AttachMoney, CalendarToday 
} from '@mui/icons-material';

const InventarioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- DATOS MOCK PARA SELECTORES ---
  const sucursales = [{ id: 1, nombre: 'Centro (Córdoba)' }, { id: 2, nombre: 'La Calera' }];
  const proveedores = [{ id: 1, nombre: 'Apple Arg Oficial' }, { id: 2, nombre: 'Miami Impo' }];
  const memorias = [{ id: 1, cap: '128GB' }, { id: 2, cap: '256GB' }, { id: 3, cap: '512GB' }];
  const colores = [{ id: 1, nombre: 'Titanio' }, { id: 2, nombre: 'Space Gray' }, { id: 3, nombre: 'Silver' }];
  
  const [cargando, setCargando] = useState(true);

  // --- ESTADO DEL FORMULARIO ---
  const [formData, setFormData] = useState({
    idProducto: '',
    productoNombre: '',
    imei: '',
    idColor: '',
    idMemoria: '',
    bateria: '',
    ciclos: '',
    precioCosto: '',
    precioMayor: '',
    precioMenor: '',
    idSucursal: '',
    idProveedor: '',
    stock: '',
    observaciones: '',
    createdAt: ''
  });

  const [esSerializado, setEsSerializado] = useState(true);

  // --- CARGA INICIAL DE DATOS (Simulación de API) ---
  useEffect(() => {
    // Aquí harías tu: fetch(`/api/inventario/${id}`)
    setTimeout(() => {
      setFormData({
        idProducto: 1,
        productoNombre: 'iPhone 15 Pro (Titanium)',
        imei: '354890123456789',
        idColor: 1,
        idMemoria: 2,
        bateria: 85,
        ciclos: 142,
        precioCosto: 900,
        precioMayor: 1050,
        precioMenor: 1200,
        idSucursal: 1,
        idProveedor: 1,
        stock: 1,
        observaciones: 'Equipo impecable. Entregado con cable USB-C original.',
        createdAt: '12/05/2026 10:30'
      });
      setEsSerializado(true); // Supongamos que la API nos dice que este producto es serializado
      setCargando(false);
    }, 500);
  }, [id]);

  // --- MANEJADORES ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando actualización a la BD...", formData);
    alert(`✅ Cambios guardados para el producto #${id}`);
    navigate('/app/inventario');
  };

  if (cargando) {
    return <div className="p-10 text-center text-slate-500 font-bold mt-20">Cargando datos del producto...</div>;
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <EditIcon fontSize="large" className="text-blue-600" /> Editar Inventario #{id}
          </h2>
        </div>
        <Button 
          variant="outlined" color="inherit" startIcon={<ArrowBack />}
          onClick={() => navigate('/app/inventario')} className="bg-white"
        >
          Volver
        </Button>
      </div>

      {/* FORMULARIO DE EDICIÓN */}
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
        
        {/* SECCIÓN 1: DETALLES DEL DISPOSITIVO */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2 flex items-center gap-2">
            <Smartphone fontSize="small" /> 1. Detalles del Dispositivo
          </h6>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* El producto normalmente no se cambia una vez ingresado, lo mostramos como solo lectura */}
            <TextField 
              label="Modelo / Producto" size="small" fullWidth
              value={formData.productoNombre} 
              InputProps={{ readOnly: true, className: "bg-slate-50 text-slate-500" }}
            />

            {esSerializado && (
              <TextField 
                label="IMEI / Serial *" name="imei" size="small" required
                value={formData.imei} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><QrCode2 /></InputAdornment> }}
              />
            )}

            <FormControl fullWidth size="small">
              <InputLabel>Color</InputLabel>
              <Select name="idColor" value={formData.idColor} onChange={handleChange} label="Color">
                <MenuItem value=""><em>-- N/A --</em></MenuItem>
                {colores.map(c => <MenuItem key={c.id} value={c.id}>{c.nombre}</MenuItem>)}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Memoria</InputLabel>
              <Select name="idMemoria" value={formData.idMemoria} onChange={handleChange} label="Memoria">
                <MenuItem value=""><em>-- N/A --</em></MenuItem>
                {memorias.map(m => <MenuItem key={m.id} value={m.id}>{m.cap}</MenuItem>)}
              </Select>
            </FormControl>

            {esSerializado && (
              <>
                <TextField 
                  label="Batería (%)" name="bateria" type="number" size="small"
                  value={formData.bateria} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BatteryChargingFull /></InputAdornment> }}
                />
                <TextField 
                  label="Ciclos" name="ciclos" type="number" size="small"
                  value={formData.ciclos} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Sync /></InputAdornment> }}
                />
              </>
            )}
          </div>
        </div>

        {/* SECCIÓN 2: PRECIOS Y COSTOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2 flex items-center gap-2">
            <AttachMoney fontSize="small" /> 2. Precios y Costos (USD)
          </h6>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
            <TextField 
              label="Costo Base" name="precioCosto" type="number" size="small"
              value={formData.precioCosto} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
              className="bg-slate-50"
            />
            <TextField 
              label="Precio Mayorista" name="precioMayor" type="number" size="small"
              value={formData.precioMayor} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
            />
            <TextField 
              label="Precio Público (Venta) *" name="precioMenor" type="number" size="small" required
              value={formData.precioMenor} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
              className="bg-green-50 rounded" color="success"
            />
          </div>
        </div>

        {/* SECCIÓN 3: LOGÍSTICA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2 flex items-center gap-2">
            <Store fontSize="small" /> 3. Logística
          </h6>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormControl fullWidth size="small">
              <InputLabel>Sucursal Actual</InputLabel>
              <Select name="idSucursal" value={formData.idSucursal} onChange={handleChange} label="Sucursal Actual">
                {sucursales.map(s => <MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>)}
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel>Proveedor</InputLabel>
              <Select name="idProveedor" value={formData.idProveedor} onChange={handleChange} label="Proveedor">
                <MenuItem value=""><em>-- Seleccionar --</em></MenuItem>
                {proveedores.map(p => <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>)}
              </Select>
            </FormControl>

            <TextField 
              label="Stock Actual" name="stock" type="number" size="small" 
              value={formData.stock} onChange={handleChange}
              InputProps={{ readOnly: esSerializado }} // Bloqueado si es único
              className={esSerializado ? "bg-slate-50" : ""}
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <CalendarToday fontSize="small" />
            <span><strong>Fecha de Ingreso original:</strong> {formData.createdAt}</span>
          </div>
        </div>

        {/* SECCIÓN 4: OBSERVACIONES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <TextField 
            label="Observaciones (Opcional)" name="observaciones" multiline rows={3} fullWidth
            value={formData.observaciones} onChange={handleChange}
            placeholder="Escribe detalles como 'Se reparó pin de carga', etc."
          />
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-3 pb-10">
          <Button variant="outlined" color="inherit" onClick={() => navigate('/app/inventario')} className="bg-white px-6">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary" startIcon={<Save />} className="bg-blue-600 font-bold px-8 shadow-md">
            GUARDAR CAMBIOS
          </Button>
        </div>

      </form>
    </div>
  );
};

export default InventarioEdit;