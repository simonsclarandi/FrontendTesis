import { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Typography, FormControl, 
  InputLabel, Select, MenuItem, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useVenta } from '../context/VentaContext';

export const ModalNuevoCliente = ({ open, onClose, dniInicial, localidades }) => {
  const { setCliente } = useVenta();
  const [formData, setFormData] = useState({
    dni: '', nombre: '', apellido: '', celular: '', email: '', calle: '', numero: '', piso: '', depto: '', idLocalidad: ''
  });

  useEffect(() => { 
    if (open && dniInicial) {
      setFormData(prev => ({ ...prev, dni: dniInicial }));
    }
  }, [open, dniInicial]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleDniChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 8) setFormData(prev => ({ ...prev, dni: value }));
  };

  const guardarCliente = async () => {
    const requeridos = ['dni', 'nombre', 'apellido', 'celular', 'email', 'calle', 'numero'];
    const faltantes = requeridos.filter(campo => !formData[campo]);
    
    if (faltantes.length > 0) return alert('⚠️ Faltan datos obligatorios: ' + faltantes.join(', '));
    if (formData.dni.length !== 8) return alert('El DNI debe tener 8 dígitos');

    const datos = {
      Dni: formData.dni, Nombre: formData.nombre, Apellido: formData.apellido,
      Email: formData.email, Celular: formData.celular, Calle: formData.calle,
      Numero: formData.numero, Piso: formData.piso || null, Depto: formData.depto || null,
      IdLocalidad: formData.idLocalidad ? parseInt(formData.idLocalidad) : null
    };

    try {
      const response = await fetch('/Clientes/CrearRapido', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos)
      });
      const data = await response.json();
      
      if (data.success) {
        setCliente({ id: data.id, nombre: data.nombre, dni: formData.dni });
        onClose();
        setFormData({ dni: '', nombre: '', apellido: '', celular: '', email: '', calle: '', numero: '', piso: '', depto: '', idLocalidad: '' });
        alert('✅ Cliente guardado correctamente.');
      } else {
        alert('⚠️ Error: ' + data.message);
      }
    } catch (error) { 
      alert('❌ Error al guardar el cliente.'); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
          <PersonAddIcon /> Alta Rápida de Cliente
        </Typography>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
          Los campos con (*) son obligatorios por sistema.
        </Typography>

        <div className="grid grid-cols-12 gap-4">
          {/* Fila 1 */}
          <div className="col-span-12 md:col-span-4">
            <TextField label="DNI *" name="dni" value={formData.dni} onChange={handleDniChange} fullWidth size="small" inputProps={{ maxLength: 8, inputMode: 'numeric' }} placeholder="Ej: 12345678" />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <TextField label="Nombre *" name="nombre" value={formData.nombre} onChange={handleChange} fullWidth size="small" />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <TextField label="Apellido *" name="apellido" value={formData.apellido} onChange={handleChange} fullWidth size="small" />
          </div>

          {/* Fila 2 */}
          <div className="col-span-12 md:col-span-6">
            <TextField label="Celular *" name="celular" value={formData.celular} onChange={handleChange} fullWidth size="small" inputProps={{ maxLength: 11 }} placeholder="Ej: 3512345678" />
          </div>
          <div className="col-span-12 md:col-span-6">
            <TextField label="Email *" name="email" value={formData.email} onChange={handleChange} fullWidth size="small" type="email" placeholder="cliente@email.com" />
          </div>

          {/* Separador */}
          <div className="col-span-12">
            <hr className="border-gray-200 my-2" />
          </div>

          {/* Fila 3: Dirección */}
          <div className="col-span-12 md:col-span-6">
            <TextField label="Calle *" name="calle" value={formData.calle} onChange={handleChange} fullWidth size="small" placeholder="Ej: Av. Colón" />
          </div>
          <div className="col-span-4 md:col-span-2">
            <TextField label="N° *" name="numero" value={formData.numero} onChange={handleChange} fullWidth size="small" placeholder="1234" />
          </div>
          <div className="col-span-4 md:col-span-2">
            <TextField label="Piso" name="piso" value={formData.piso} onChange={handleChange} fullWidth size="small" placeholder="-" />
          </div>
          <div className="col-span-4 md:col-span-2">
            <TextField label="Depto" name="depto" value={formData.depto} onChange={handleChange} fullWidth size="small" placeholder="-" />
          </div>

          {/* Fila 4 */}
          <div className="col-span-12 md:col-span-6">
            <FormControl fullWidth size="small">
              <InputLabel>Localidad</InputLabel>
              <Select name="idLocalidad" value={formData.idLocalidad} onChange={handleChange} label="Localidad">
                <MenuItem value=""><em>-- Seleccioná --</em></MenuItem>
                {localidades?.map(loc => (
                  <MenuItem key={loc.value} value={loc.value}>{loc.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ p: 3, backgroundColor: 'grey.50', borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
          Cancelar
        </Button>
        <Button
          onClick={guardarCliente}
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          sx={{ 
            px: 4, 
            fontWeight: 'bold', 
            textTransform: 'none', 
            borderRadius: '8px',
            boxShadow: 2 
          }}
        >
          GUARDAR CLIENTE
        </Button>
      </DialogActions>
    </Dialog>
  );
};