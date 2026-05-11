import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, TextField, MenuItem, Select, FormControl, InputLabel, 
  InputAdornment, Autocomplete, Dialog, DialogTitle, DialogContent, 
  DialogActions, Switch, FormControlLabel, Alert 
} from '@mui/material';
import { 
  ArrowBack, Save, Inventory, Store, LocalShipping, 
  Smartphone, QrCode2, Palette, SdCard, BatteryChargingFull, 
  Sync, AttachMoney, Add
} from '@mui/icons-material';

const InventarioCreate = () => {
  const navigate = useNavigate();

  // --- DATOS MOCK (Simulando la API temporalmente) ---
  const sucursales = [{ id: 1, nombre: 'Centro (Córdoba)' }, { id: 2, nombre: 'La Calera' }];
  const proveedores = [{ id: 1, nombre: 'Apple Arg Oficial' }, { id: 2, nombre: 'Miami Impo' }];
  const memorias = [{ id: 1, cap: '128GB' }, { id: 2, cap: '256GB' }, { id: 3, cap: '512GB' }];
  const tiposDispositivo = [{ id: 1, nombre: 'Celular' }, { id: 2, nombre: 'Accesorio' }, { id: 3, nombre: 'Tablet' }];
  
  const [productosMock, setProductosMock] = useState([
    { id: 1, nombre: 'iPhone 15 Pro', modelo: 'Titanium', esSerializado: true },
    { id: 2, nombre: 'Funda Silicona', modelo: 'iPhone 15', esSerializado: false }
  ]);

  // --- ESTADOS DEL FORMULARIO ---
  const [formData, setFormData] = useState({
    idSucursal: 1,
    idProveedor: '',
    idProducto: null,
    imei: '',
    color: '',
    idMemoria: '',
    bateria: '',
    ciclos: '',
    precioCosto: '',
    precioMayor: '',
    precioMenor: '',
    stock: 1,
    observaciones: ''
  });

  const [esSerializado, setEsSerializado] = useState(true); // Controla qué campos se ven

  // --- ESTADOS DEL MODAL (NUEVO PRODUCTO) ---
  const [openModal, setOpenModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '', marca: '', idTipo: '', esSerializado: true
  });

  // --- MANEJADORES ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProductoSelect = (event, newValue) => {
    if (newValue && newValue.inputValue) {
      // Si el usuario presiona "Crear nuevo..."
      setNuevoProducto({ ...nuevoProducto, nombre: newValue.inputValue });
      setOpenModal(true);
    } else if (newValue) {
      // Si selecciona un producto existente
      setFormData({ ...formData, idProducto: newValue.id });
      setEsSerializado(newValue.esSerializado);
      
      // Ajustamos el stock automáticamente según el tipo
      if (newValue.esSerializado) {
        setFormData(prev => ({ ...prev, stock: 1, imei: '' }));
      } else {
        setFormData(prev => ({ ...prev, imei: '', bateria: '', ciclos: '' }));
      }
    } else {
      setFormData({ ...formData, idProducto: null });
    }
  };

  const guardarProductoRapido = () => {
    // Simulamos que la API crea el producto y nos devuelve un ID
    const newId = productosMock.length + 1;
    const productoCreado = { 
      id: newId, 
      nombre: nuevoProducto.nombre, 
      modelo: 'N/A', 
      esSerializado: nuevoProducto.esSerializado 
    };
    
    setProductosMock([...productosMock, productoCreado]);
    
    // Auto-seleccionamos el producto recién creado
    setFormData({ ...formData, idProducto: newId, stock: nuevoProducto.esSerializado ? 1 : 1 });
    setEsSerializado(nuevoProducto.esSerializado);
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Guardando Ingreso en la BD...", formData);
    alert("✅ Ingreso guardado correctamente (Simulación)");
    navigate('/app/inventario');
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 max-w-5xl mx-auto">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            <Inventory fontSize="large" className="text-blue-600" /> Nuevo Ingreso de Stock
          </h2>
          <p className="text-slate-500 mt-1">Completa los datos para registrar mercadería en el sistema.</p>
        </div>
        <Button 
          variant="outlined" color="inherit" startIcon={<ArrowBack />}
          onClick={() => navigate('/app/inventario')} className="bg-white"
        >
          Volver al Listado
        </Button>
      </div>

      {/* FORMULARIO PRINCIPAL */}
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-6">
        
        {/* SECCIÓN 1: DATOS GENERALES */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2 flex items-center gap-2">
            <Store fontSize="small" /> 1. Datos Generales
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <FormControl fullWidth size="small">
              <InputLabel>Sucursal Destino</InputLabel>
              <Select name="idSucursal" value={formData.idSucursal} onChange={handleChange} label="Sucursal Destino">
                {sucursales.map(s => <MenuItem key={s.id} value={s.id}>{s.nombre}</MenuItem>)}
              </Select>
            </FormControl>
            
            <FormControl fullWidth size="small">
              <InputLabel>Proveedor</InputLabel>
              <Select name="idProveedor" value={formData.idProveedor} onChange={handleChange} label="Proveedor">
                <MenuItem value=""><em>-- Seleccionar Proveedor --</em></MenuItem>
                {proveedores.map(p => <MenuItem key={p.id} value={p.id}>{p.nombre}</MenuItem>)}
              </Select>
            </FormControl>
          </div>

          {/* Autocomplete de Productos */}
          <Autocomplete
            options={productosMock}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option;
              if (option.inputValue) return option.inputValue;
              return `${option.nombre} (${option.modelo})`;
            }}
            filterOptions={(options, params) => {
              const filtered = options.filter(o => o.nombre.toLowerCase().includes(params.inputValue.toLowerCase()));
              const isExisting = options.some(o => o.nombre.toLowerCase() === params.inputValue.toLowerCase());
              if (params.inputValue !== '' && !isExisting) {
                filtered.push({ inputValue: params.inputValue, isNew: true });
              }
              return filtered;
            }}
            onChange={handleProductoSelect}
            renderOption={(props, option) => (
              <li {...props}>
                {option.isNew ? <span className="text-blue-600 font-bold"><Add fontSize="small" className="mr-1"/> Crear nuevo: "{option.inputValue}"</span> : `${option.nombre} (${option.modelo})`}
              </li>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Buscar Producto *" required size="small" placeholder="Escribí el nombre (ej: iPhone 13)..." />
            )}
          />
        </div>

        {/* SECCIÓN 2: DETALLES TÉCNICOS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2 flex items-center gap-2">
            <Smartphone fontSize="small" /> 2. Detalles Técnicos
          </h6>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Si es Serializado (Celular, Mac, etc) mostramos IMEI */}
            {esSerializado && (
              <TextField 
                label="IMEI / Serial *" name="imei" size="small" required
                value={formData.imei} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><QrCode2 /></InputAdornment> }}
              />
            )}

            <TextField 
              label="Color" name="color" size="small"
              value={formData.color} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><Palette /></InputAdornment> }}
            />

            <FormControl fullWidth size="small">
              <InputLabel>Capacidad</InputLabel>
              <Select name="idMemoria" value={formData.idMemoria} onChange={handleChange} label="Capacidad">
                <MenuItem value=""><em>-- N/A --</em></MenuItem>
                {memorias.map(m => <MenuItem key={m.id} value={m.id}>{m.cap}</MenuItem>)}
              </Select>
            </FormControl>

            {/* Batería y Ciclos solo si es un equipo (Serializado) */}
            {esSerializado && (
              <>
                <TextField 
                  label="Estado Batería (%)" name="bateria" type="number" size="small"
                  value={formData.bateria} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><BatteryChargingFull /></InputAdornment> }}
                />
                <TextField 
                  label="Ciclos de Batería" name="ciclos" type="number" size="small"
                  value={formData.ciclos} onChange={handleChange}
                  InputProps={{ startAdornment: <InputAdornment position="start"><Sync /></InputAdornment> }}
                />
              </>
            )}
          </div>
        </div>

        {/* SECCIÓN 3: FINANZAS Y CANTIDAD */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-4 border-b pb-2 flex items-center gap-2">
            <AttachMoney fontSize="small" /> 3. Finanzas y Cantidad
          </h6>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <TextField 
              label="Costo Unitario" name="precioCosto" type="number" size="small"
              value={formData.precioCosto} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
            />
            <TextField 
              label="Precio Mayorista" name="precioMayor" type="number" size="small"
              value={formData.precioMayor} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
            />
            <TextField 
              label="Precio Público *" name="precioMenor" type="number" size="small" required
              value={formData.precioMenor} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
              className="bg-green-50 rounded" color="success"
            />
          </div>

          <Alert severity={esSerializado ? "info" : "success"} className="flex items-center">
            <div className="flex items-center gap-4 w-full">
              <span className="font-bold whitespace-nowrap">Cantidad Inicial:</span>
              <TextField 
                name="stock" type="number" size="small" 
                value={formData.stock} onChange={handleChange}
                InputProps={{ readOnly: esSerializado }} // Si es serializado, no puede cambiar de 1
                className="w-24 bg-white"
              />
              <span className="text-sm text-slate-600">
                {esSerializado 
                  ? "Producto Único: El stock siempre es 1. (Requiere IMEI)" 
                  : "Stock Masivo: Ingresa la cantidad total que llegó."}
              </span>
            </div>
          </Alert>
        </div>

        {/* SECCIÓN 4: OBSERVACIONES Y SUBMIT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <TextField 
            label="Observaciones (Opcional)" name="observaciones" multiline rows={3} fullWidth
            value={formData.observaciones} onChange={handleChange}
            placeholder="Escribe detalles como 'Viene sin caja original', 'Pequeña marca en pantalla', etc."
          />
        </div>

        <div className="flex justify-end gap-3 pb-10">
          <Button variant="outlined" color="inherit" onClick={() => navigate('/app/inventario')} className="bg-white px-6">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary" startIcon={<Save />} className="bg-blue-600 font-bold px-8 shadow-md">
            Guardar Ingreso
          </Button>
        </div>

      </form>

      {/* MODAL: CREAR PRODUCTO RÁPIDO */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle className="bg-blue-600 text-white font-bold flex items-center gap-2">
          <Add /> Crear Nuevo Producto
        </DialogTitle>
        <DialogContent className="pt-6 space-y-4">
          <TextField 
            label="Nombre del Producto *" fullWidth size="small"
            value={nuevoProducto.nombre} onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
          />
          
          {/* Aquí iría el Autocomplete de Marca, por ahora un texto */}
          <TextField 
            label="Marca" fullWidth size="small"
            value={nuevoProducto.marca} onChange={(e) => setNuevoProducto({...nuevoProducto, marca: e.target.value})}
          />

          <FormControl fullWidth size="small">
            <InputLabel>Tipo de Dispositivo</InputLabel>
            <Select 
              value={nuevoProducto.idTipo} 
              onChange={(e) => setNuevoProducto({...nuevoProducto, idTipo: e.target.value})} 
              label="Tipo de Dispositivo"
            >
              {tiposDispositivo.map(t => <MenuItem key={t.id} value={t.id}>{t.nombre}</MenuItem>)}
            </Select>
          </FormControl>

          <div className="bg-slate-50 p-4 border rounded-xl mt-4">
            <FormControlLabel 
              control={<Switch checked={nuevoProducto.esSerializado} onChange={(e) => setNuevoProducto({...nuevoProducto, esSerializado: e.target.checked})} color="primary" />} 
              label={<span className="font-bold text-slate-700">¿Es Serializado? (Tiene IMEI/Serie)</span>} 
            />
            <p className="text-xs text-slate-500 mt-1 ml-10">Activalo para Celulares, Tablets, Consolas. Desactivalo para Fundas, Cables.</p>
          </div>

        </DialogContent>
        <DialogActions className="p-4 bg-slate-50">
          <Button onClick={() => setOpenModal(false)} color="inherit">Cancelar</Button>
          <Button variant="contained" color="primary" onClick={guardarProductoRapido} className="font-bold bg-blue-600">
            Guardar y Seleccionar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default InventarioCreate;