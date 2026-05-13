import React, { useState, useEffect } from 'react';
import { 
  Button, TextField, MenuItem, Select, FormControl, InputLabel, 
  InputAdornment, Autocomplete, Alert, Switch, FormControlLabel // <-- Agregamos estos dos
} from '@mui/material';
import { 
  Save, Store, Smartphone, QrCode2, Palette, BatteryChargingFull, 
  Sync, AttachMoney, Add
} from '@mui/icons-material';
import { inventarioService } from '../../../services/inventarioServices';

const InventarioForm = ({ initialData, isEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  // const [esSerializado, setEsSerializado] = useState(true);
  const [listaModelos, setListaModelos] = useState([]);
  const [listaColores, setListaColores] = useState([]);
  const [listaMemorias, setListaMemorias] = useState([]);
  const [listaSucursales, setListaSucursales] = useState([]);
  const [listaProveedores, setListaProveedores] = useState([]);

  // Si initialData cambia (por ejemplo, cuando la API en Editar termina de cargar), actualizamos el estado
  useEffect(() => {
    setFormData(initialData);
    // Acá podrías agregar lógica para determinar si es serializado según el producto
  }, [initialData]);

  // Buscar los artículos a la base de datos cuando carga el formulario
  useEffect(() => {
    const cargarDesplegables = async () => {
      try {
        // Disparamos todas las peticiones a la vez
        const [
          resModelos, 
          resColores, 
          resMemorias, 
          resSucursales, 
          resProveedores
        ] = await Promise.all([
          inventarioService.getModelos(),
          inventarioService.getColores(),
          inventarioService.getMemorias(),
          inventarioService.getSucursales(),
          inventarioService.getProveedores()
        ]);
        
        // Limpiamos la data (por si el backend devuelve un { status: 'success', data: [...] })
        setListaModelos(Array.isArray(resModelos) ? resModelos : (resModelos.data || []));
        setListaColores(Array.isArray(resColores) ? resColores : (resColores.data || []));
        setListaMemorias(Array.isArray(resMemorias) ? resMemorias : (resMemorias.data || []));
        setListaSucursales(Array.isArray(resSucursales) ? resSucursales : (resSucursales.data || []));
        setListaProveedores(Array.isArray(resProveedores) ? resProveedores : (resProveedores.data || []));

      } catch (error) {
        console.error("Error al cargar los datos del formulario:", error);
      }
    };

    cargarDesplegables();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="max-w-5xl mx-auto space-y-6">
      
      {/* SECCIÓN 1: DETALLES DEL DISPOSITIVO */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h6 className="text-slate-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
            <Smartphone fontSize="small" /> 1. Detalles del Producto
          </h6>
          
          {/* EL NUEVO INTERRUPTOR */}
          <FormControlLabel
            control={
              <Switch 
                checked={formData.esSerializado} 
                onChange={(e) => setFormData({ ...formData, esSerializado: e.target.checked })} 
                color="primary"
              />
            }
            label={formData.esSerializado ? "📱 Equipo Serializado (Celular/Tablet)" : "🔌 Accesorio o Repuesto"}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Autocomplete
            options={listaModelos}
            // Usamos Nombre con 'N' mayúscula porque así viene de tu SQL ahora
            getOptionLabel={(option) => option.Nombre || option.nombre || ''}
            value={listaModelos.find(m => (m.Id === formData.idModeloArticulo || m.id === formData.idModeloArticulo)) || null}
            onChange={(event, newValue) => {
                const selectedId = newValue ? (newValue.Id || newValue.id) : '';
                setFormData({ ...formData, idModeloArticulo: selectedId });
            }}
            renderInput={(params) => (
                <TextField 
                {...params} 
                label="Seleccionar Modelo *" 
                required 
                size="small" 
                />
            )}
            />

          {formData.esSerializado && (
            <TextField 
              label="IMEI / Serial *" name="imei" size="small" required
              value={formData.imei || ''} onChange={handleChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><QrCode2 /></InputAdornment> }}
            />
          )}

          {/* COLOR */}
          <FormControl fullWidth size="small">
            <InputLabel>Color</InputLabel>
            <Select name="idColor" value={formData.idColor || ''} onChange={handleChange} label="Color">
              <MenuItem value=""><em>-- N/A --</em></MenuItem>
              {listaColores.map(c => (
                <MenuItem key={c.id || c.Id} value={c.id || c.Id}>
                  {c.Nombre || c.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* MEMORIA */}
          <FormControl fullWidth size="small">
            <InputLabel>Memoria</InputLabel>
            <Select name="idMemoria" value={formData.idMemoria || ''} onChange={handleChange} label="Memoria">
              <MenuItem value=""><em>-- N/A --</em></MenuItem>
              {listaMemorias.map(m => (
                <MenuItem key={m.id || m.Id} value={m.id || m.Id}>
                  {/* Acá atajamos 'Capacidad' que es el nombre real en tu SQL */}
                  {m.Capacidad || m.capacidad || m.Nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.esSerializado && (
            <>
              <TextField 
                label="Batería (%)" name="bateria" type="number" size="small" min="0" max="100"
                value={formData.bateria || ''} onChange={handleChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><BatteryChargingFull /></InputAdornment> }}
              />
              <TextField 
                label="Ciclos" name="ciclos" type="number" size="small" min="0" 
                value={formData.ciclos || ''} onChange={handleChange}
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
            value={formData.precioCosto || ''} onChange={handleChange}
            InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
          />
          <TextField 
            label="Precio Mayorista" name="precioMayor" type="number" size="small"
            value={formData.precioMayor || ''} onChange={handleChange}
            InputProps={{ startAdornment: <InputAdornment position="start">U$S</InputAdornment> }}
          />
          <TextField 
            label="Precio Público (Venta) *" name="precioMenor" type="number" size="small" required
            value={formData.precioMenor || ''} onChange={handleChange}
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
          {/* SUCURSAL */}
          <FormControl fullWidth size="small">
            <InputLabel>Sucursal</InputLabel>
            <Select name="idSucursal" value={formData.idSucursal || ''} onChange={handleChange} label="Sucursal">
              {listaSucursales.map(s => (
                <MenuItem key={s.id || s.Id} value={s.id || s.Id}>
                  {s.Nombre || s.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* PROVEEDOR */}
          <FormControl fullWidth size="small">
            <InputLabel>Proveedor</InputLabel>
            <Select name="idProveedor" value={formData.idProveedor || ''} onChange={handleChange} label="Proveedor">
              <MenuItem value=""><em>-- Seleccionar --</em></MenuItem>
              {listaProveedores.map(p => (
                <MenuItem key={p.Id || p.id} value={p.Id || p.id}>
                  {p.Nombre || p.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField 
            label="Stock Actual" name="stock" type="number" size="small" 
            value={formData.stock || 1} onChange={handleChange}
            InputProps={{ readOnly: formData.esSerializado }}
            className={formData.esSerializado ? "bg-slate-50" : ""}
          />
        </div>
      </div>

      {/* SECCIÓN 4: OBSERVACIONES */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <TextField 
          label="Observaciones (Opcional)" name="observaciones" multiline rows={3} fullWidth
          value={formData.observaciones || ''} onChange={handleChange}
          placeholder="Escribe detalles adicionales..."
        />
      </div>

      {/* BOTONES */}
      <div className="flex justify-end gap-3 pb-10">
        <Button variant="outlined" color="inherit" onClick={onCancel} className="bg-white px-6">
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary" startIcon={<Save />} className="bg-blue-600 font-bold px-8 shadow-md">
          {isEdit ? "GUARDAR CAMBIOS" : "GUARDAR INGRESO"}
        </Button>
      </div>
    </form>
  );
};

export default InventarioForm;