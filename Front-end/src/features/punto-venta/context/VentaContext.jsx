import { createContext, useContext, useState, useEffect } from 'react';

  const VentaContext = createContext();

  export const VentaProvider = ({ children, idSucursal, nombreSucursal, dolarGlobal }) => {
    // Estados principales (reemplazan las variables globales del CSHTML)
    const [carrito, setCarrito] = useState([]);
    const [pagos, setPagos] = useState([]);
    const [cliente, setCliente] = useState(null);
    const [esMayorista, setEsMayorista] = useState(false);
    const [bonificacion, setBonificacion] = useState(0);

    // Cargar desde localStorage al iniciar (equivalente a recuperarEstadoDeVenta)
    useEffect(() => {
      const guardado = localStorage.getItem('pdv_estado');
      if (guardado) {
        try {
          const estado = JSON.parse(guardado);
          if (estado.carrito) setCarrito(estado.carrito);
          if (estado.cliente) setCliente(estado.cliente);
          if (estado.esMayorista) setEsMayorista(estado.esMayorista);
        } catch (e) {
          console.error('Error cargando estado:', e);
        }
      }
    }, []);

    // Guardar en localStorage cuando cambia (equivalente a guardarEstadoDeVenta)
    useEffect(() => {
      localStorage.setItem('pdv_estado', JSON.stringify({
        carrito,
        cliente,
        esMayorista
      }));
    }, [carrito, cliente, esMayorista]);

    // Calcular totales
    const totalVenta = carrito.reduce((sum, item) => sum + item.Subtotal, 0);
    const totalAjustado = totalVenta - bonificacion;

    // Función agregarAlCarrito (migra tu lógica original)
    const agregarAlCarrito = (producto) => {
      const existente = carrito.find(x => x.IdInventario === producto.idInventario);
      const cantActual = existente ? existente.Cantidad : 0;

      if (cantActual + 1 > producto.stock) {
        alert(`⚠️ No hay suficiente stock. Disponibles: ${producto.stock}`);
        return;
      }

      const precioAUsar = esMayorista
        ? (producto.precioMayor || producto.precio)
        : producto.precio;

      if (existente) {
        // Actualizar cantidad
        setCarrito(carrito.map(item =>
          item.IdInventario === producto.idInventario
            ? {
                ...item,
                Cantidad: item.Cantidad + 1,
                PrecioUnitario: precioAUsar,
                Subtotal: (item.Cantidad + 1) * precioAUsar
              }
            : item
        ));
      } else {
        // Agregar nuevo
        setCarrito([...carrito, {
          IdProducto: producto.id,
          NombreProducto: producto.nombre,
          Cantidad: 1,
          PrecioUnitario: precioAUsar,
          Subtotal: precioAUsar,
          StockMax: producto.stock,
          IdInventario: producto.idInventario
        }]);
      }
    };

    const eliminarDelCarrito = (index) => {
      setCarrito(carrito.filter((_, i) => i !== index));
    };

    // Recalcular precios cuando cambia el modo mayorista
    const toggleMayorista = (nuevoValor) => {
      setEsMayorista(nuevoValor);

      // Actualizar precios del carrito existente
      setCarrito(carrito.map(item => {
        const productoOriginal = window.inventario?.find(p => p.idInventario === item.IdInventario);
        if (productoOriginal) {
          const nuevoPrecio = nuevoValor
            ? (productoOriginal.precioMayor || productoOriginal.precio)
            : productoOriginal.precio;
          return {
            ...item,
            PrecioUnitario: nuevoPrecio,
            Subtotal: item.Cantidad * nuevoPrecio
          };
        }
        return item;
      }));
    };

    const vaciarTodo = () => {
      localStorage.removeItem('pdv_estado');
      setCarrito([]);
      setPagos([]);
      setCliente(null);
      setBonificacion(0);
      setEsMayorista(false);
    };

    return (
      <VentaContext.Provider value={{
        // Estados
        carrito, setCarrito,
        pagos, setPagos,
        cliente, setCliente,
        esMayorista, setEsMayorista,
        bonificacion, setBonificacion,
        // Datos del servidor
        idSucursal, nombreSucursal, dolarGlobal,
        // Cálculos
        totalVenta, totalAjustado,
        // Funciones
        agregarAlCarrito, eliminarDelCarrito, toggleMayorista, vaciarTodo
      }}>
        {children}
      </VentaContext.Provider>
    );
  };

  // Hook personalizado para usar el contexto
  export const useVenta = () => {
    const context = useContext(VentaContext);
    if (!context) throw new Error('useVenta debe usarse dentro de VentaProvider');
    return context;
  };