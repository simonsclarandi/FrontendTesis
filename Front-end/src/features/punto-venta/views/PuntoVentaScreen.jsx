import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { VentaProvider, useVenta } from '../context/VentaContext';
import { ClienteSection } from '../components/ClienteSection';
import { CarritoSection } from '../components/CarritoSection';
import { TotalSection } from '../components/TotalSection';
import { ModalNuevoCliente } from '../modals/ModalNuevoCliente';
import { ModalCobro } from '../modals/ModalCobro';

// 1. IMPORTAMOS LOS DATOS FALSOS DIRECTAMENTE AQUÍ
// Asegúrate de que la ruta y los nombres coincidan con lo que exporta tu archivo datosMock.js
import { 
  inventario, 
  metodosPago, 
  localidades, 
  modelos, 
  colores, 
  memorias, 
  clientesMock 
} from '../utils/datosMock'; 

const PuntoVentaContent = () => {
  const navigate = useNavigate();
  const { cliente } = useVenta();
  const [modalClienteOpen, setModalClienteOpen] = useState(false);
  const [modalCobroOpen, setModalCobroOpen] = useState(false);
  const [dniInicial, setDniInicial] = useState('');

  const handleOpenNuevoCliente = (dni) => {
    setDniInicial(dni);
    setModalClienteOpen(true);
  };

  const handleCloseNuevoCliente = () => {
    setModalClienteOpen(false);
    setDniInicial('');
  };

  const handleCobrar = () => {
    setModalCobroOpen(true);
  };

  const handleCloseCobro = () => {
    setModalCobroOpen(false);
  };

  return (
    <div className="w-full min-h-screen p-4 flex flex-col bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-4 flex-1">
        <button onClick={() => navigate('/app')}>Volver al Menú</button>
        
        <div className="w-full lg:w-1/3 flex flex-col gap-4 order-2 lg:order-1">
          <ClienteSection onOpenNuevoCliente={handleOpenNuevoCliente} clientesMock={clientesMock} />
          <TotalSection onCobrar={handleCobrar} />
        </div>

        <div className="w-full lg:flex-1 order-1 lg:order-2 flex flex-col">
          {/* Pasamos el inventario mockeado a la sección del carrito */}
          <CarritoSection inventario={inventario} />
        </div>

      </div>

      <ModalNuevoCliente
        open={modalClienteOpen}
        onClose={handleCloseNuevoCliente}
        dniInicial={dniInicial}
        localidades={localidades}
      />

      <ModalCobro
        open={modalCobroOpen}
        onClose={handleCloseCobro}
        metodosPago={metodosPago}
        modelos={modelos}
        colores={colores}
        memorias={memorias}
      />
    </div>
  );
};

export const PuntoVentaScreen = () => {
  return (
    // 2. SIMULAMOS LOS DATOS GLOBALES DE LA SUCURSAL
    <VentaProvider
      idSucursal={1}
      nombreSucursal="Punto Cell Centro"
      dolarGlobal={1000}
    >
      <PuntoVentaContent />
    </VentaProvider>
  );
};

export default PuntoVentaScreen;