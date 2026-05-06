import { useState } from 'react';
import {
  TextField, Button, Alert,
  InputAdornment, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StoreIcon from '@mui/icons-material/Store';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import { useVenta } from '../context/VentaContext';

export const ClienteSection = ({ onOpenNuevoCliente, clientesMock }) => {
  const { cliente, setCliente, nombreSucursal } = useVenta();
  const [dni, setDni] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [noEncontrado, setNoEncontrado] = useState(false);

  // Buscar cliente (primero en mock, luego intenta backend)
  const handleBuscar = async () => {
    if (!dni || dni.length !== 8) {
      alert('El DNI debe tener 8 números exactos');
      return;
    }

    setBuscando(true);
    try {
      // Intenta buscar en el backend
      const response = await fetch(`/Clientes/BuscarPorDni?dni=${dni}`);
      const data = await response.json();

      if (data.encontrado) {
        setCliente({
          id: data.id,
          nombre: data.nombre,
          dni: dni
        });
        setNoEncontrado(false);
      } else {
        setNoEncontrado(true);
      }
    } catch (error) {
      // Si falla el backend, usa datos mock para pruebas
      console.log('Backend no disponible, usando datos mock para pruebas');
      const clienteEncontrado = clientesMock?.find(c => c.dni === dni);

      if (clienteEncontrado) {
        setCliente({
          id: clienteEncontrado.id,
          nombre: `${clienteEncontrado.nombre} ${clienteEncontrado.apellido}`,
          dni: dni
        });
        setNoEncontrado(false);
      } else {
        setNoEncontrado(true);
      }
    } finally {
      setBuscando(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleBuscar();
  };

  const limpiarCliente = () => {
    setCliente(null);
    setDni('');
    setNoEncontrado(false);
  };

  // Solo permitir números
  const handleDniChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 8) setDni(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden shrink-0">
      
      {/* HEADER */}
      <div className="bg-[#1976d2] text-white px-4 py-3 flex justify-between items-center">
        <h2 className="flex items-center gap-2 font-bold text-lg m-0">
          <PersonIcon /> Cliente
        </h2>
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-md text-sm">
          <StoreIcon fontSize="small" />
          <span>{nombreSucursal}</span>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="p-4">
        {!cliente ? (
          <>
            <TextField
              fullWidth
              label="DNI del Cliente"
              value={dni}
              onChange={handleDniChange}
              onKeyPress={handleKeyPress}
              placeholder="Ingresá DNI y presiona Enter..."
              variant="outlined"
              size="small"
              error={dni.length > 0 && dni.length !== 8}
              helperText={dni.length > 0 && dni.length !== 8 ? "Debe tener 8 dígitos" : ""}
              slotProps={{
                htmlInput: { 
                  maxLength: 8, 
                  inputMode: 'numeric' 
                },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleBuscar} disabled={buscando} color="primary">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />

            {noEncontrado && (
              <Alert severity="warning" className="mt-4 flex flex-col gap-2">
                <p className="font-bold text-orange-800 m-0 mb-2">
                  Cliente no encontrado
                </p>
               <Button
                  variant="outlined"
                  color="warning" // Usamos la paleta nativa de MUI en lugar de text-orange-600
                  fullWidth
                  onClick={() => onOpenNuevoCliente(dni)}
                  sx={{ 
                    py: 1.5, // Padding vertical
                    borderRadius: '12px',
                    textTransform: 'none', // Quita las mayúsculas automáticas
                    fontSize: '1rem',
                    fontWeight: 500,
                  }}
                >
                  ➕ Crear Cliente Nuevo
                </Button>
              </Alert>
            )}
          </>
        ) : (
          <Alert
            severity="success"
            className="flex items-center"
            action={
              <Button
                size="small"
                color="error"
                onClick={limpiarCliente}
                startIcon={<CloseIcon />}
                className="normal-case"
              >
                Cambiar
              </Button>
            }
          >
            <div className="flex items-center gap-2 text-green-900">
              <PersonIcon color="success" />
              <span className="font-bold">{cliente.nombre}</span>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
};