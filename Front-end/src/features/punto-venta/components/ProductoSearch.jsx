import { useState } from 'react';
  import {
    Autocomplete, TextField, Button,
    Box
  } from '@mui/material';
  import AddIcon from '@mui/icons-material/Add';
  import { useVenta } from '../context/VentaContext';

  export const ProductoSearch = ({ inventario }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const { agregarAlCarrito, esMayorista } = useVenta();

    // Opciones formateadas para el autocomplete
    const opciones = inventario.map(item => ({
      label: `${item.nombre} - U$S ${item.precio}${item.stock > 0 ? ` (Stock: ${item.stock})` : ''}`,
      value: item.nombre,
      datos: item
    }));

    const handleSelect = (event, option) => {
      if (option) {
        setSelectedProduct(option.datos);
      }
    };

    // Soporte para escáner de códigos (Enter)
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const codigo = inputValue.trim();

        if (!codigo) return;

        const encontrado = inventario.find(item =>
          item.nombre.toLowerCase().includes(codigo.toLowerCase()) ||
          (item.imei && item.imei === codigo)
        );

        if (encontrado) {
          agregarAlCarrito(encontrado);
          setInputValue('');
          setSelectedProduct(null);
        } else {
          alert("⚠️ El IMEI o producto escaneado no se encuentra en el stock.");
          // Seleccionar todo para el próximo escaneo
          event.target.select();
        }
      }
    };

    const handleAgregar = () => {
      if (selectedProduct) {
        agregarAlCarrito(selectedProduct);
        setSelectedProduct(null);
        setInputValue('');
      }
    };

    // Calcular precio a mostrar
    const precioMostrado = selectedProduct
      ? (esMayorista ? selectedProduct.precioMayor || selectedProduct.precio : selectedProduct.precio)
      : '';

    return (
      <Box className="flex flex-col md:flex-row gap-3 items-end">
        <Box className="flex-1 w-full">
          <Autocomplete
            freeSolo
            options={opciones}
            inputValue={inputValue}
            onInputChange={(e, value) => setInputValue(value)}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar Producto"
                placeholder="Escribí nombre, modelo o escaneá IMEI..."
                fullWidth
                size="small"
                onKeyDown={handleKeyDown}
              />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.datos.idInventario || option.label}>
                <Box>
                  <div className="font-medium">{option.datos.nombre}</div>
                  <div className="text-xs text-gray-500">
                    U$S {option.datos.precio} | Stock: {option.datos.stock}
                    {option.datos.bateria && ` | Bat: ${option.datos.bateria}%`}
                    {option.datos.ciclos && ` | Ciclos: ${option.datos.ciclos}`}
                  </div>
                </Box>
              </li>
            )}
          />
        </Box>

        <TextField
          label="Precio Unit."
          value={precioMostrado ? `U$S ${precioMostrado}` : ''}
          InputProps={{ readOnly: true }}
          size="small"
          className="w-full md:w-40"
        />

        <Button
          variant="contained"
          onClick={handleAgregar}
          disabled={!selectedProduct}
          startIcon={<AddIcon />}
          sx={{ 
            backgroundColor: '#1976d2', 
            color: 'white', 
            textTransform: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
            '&:hover': { backgroundColor: 'white', color: '#1976d2' }
          }}
        >
          AGREGAR
        </Button>
      </Box>
    );
  };