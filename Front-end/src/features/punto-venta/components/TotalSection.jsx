import {
  FormControlLabel, Switch,
  Button, Divider
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useVenta } from '../context/VentaContext';

export const TotalSection = ({ onCobrar }) => {
  const {
    totalVenta,
    esMayorista,
    dolarGlobal,
    carrito,
    cliente,
    toggleMayorista
  } = useVenta();

  const totalArs = totalVenta * dolarGlobal;

  const formatArs = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });

  const handleToggleMayorista = (e) => {
    const nuevoValor = e.target.checked;
    toggleMayorista(nuevoValor);
    alert(nuevoValor ? "📉 Precios Mayoristas APLICADOS" : "📈 Precios Minoristas RESTAURADOS");
  };

  const handleCobrar = () => {
    if (carrito.length === 0) {
      alert("⚠️ El carrito está vacío.");
      return;
    }
    if (!cliente) {
      alert("⚠️ Falta seleccionar el CLIENTE.");
      return;
    }
    onCobrar();
  };

  return (
    // 1. ESTRUCTURA PRINCIPAL: Usamos un simple div en lugar de Card. 
    // Tailwind maneja el color exacto, bordes redondeados y sombras.
    <div className="bg-[#020f30] text-white p-6 rounded-xl shadow-lg flex flex-col items-center w-full flex-1">
      
      {/* 2. INTERACTIVIDAD: Mantenemos el Switch de MUI */}
      <FormControlLabel
        control={
          <Switch
            checked={esMayorista}
            onChange={handleToggleMayorista}
          />
        }
        label={
          <span className="text-yellow-400 font-bold flex items-center gap-2">
            <InventoryIcon /> PRECIO MAYORISTA
          </span>
        }
        className="mb-4"
      />

      {/* 3. TIPOGRAFÍAS PURAS: Reemplazamos <Typography> por p y h2 con Tailwind */}
      <div className="flex flex-col items-center w-full flex-1 justify-center">
        <p className="text-gray-300 text-lg mb-1">TOTAL</p>
        <h2 className="text-green-400 font-bold text-5xl mb-2">
          U$S {totalVenta.toFixed(2)}
        </h2>

        {/* Separador de MUI */}
        <Divider className="border-gray-600 w-full my-4" />

        <h3 className="text-blue-300 font-semibold text-2xl">
          {formatArs.format(totalArs)}
        </h3>

        {/* 4. LAYOUT SIMPLE: Reemplazamos <Box> por un div */}
        <div className="flex justify-center items-center mt-3 gap-2">
          <span className="text-gray-400 text-sm">Cotización: 1 USD = $</span>
          <span className="font-bold text-lg">{dolarGlobal}</span>
        </div>
      </div>

      {/* 5. BOTÓN HÍBRIDO: Tailwind para el layout/forma, sx para colores específicos */}
      <Button
        variant="contained"
        onClick={handleCobrar}
        startIcon={<AttachMoneyIcon />}
        className="w-full mt-6 py-3 text-lg font-bold rounded-xl normal-case shadow-md transition-colors"
        sx={{ 
          backgroundColor: '#02631e', 
          '&:hover': { backgroundColor: 'white', color: '#02631e' }
        }}
      >
        COBRAR
      </Button>
    </div>
  );
};