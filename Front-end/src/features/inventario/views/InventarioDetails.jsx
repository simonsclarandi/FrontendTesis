import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Chip } from '@mui/material';
import { 
  Info, Edit, ArrowBack, Smartphone, QrCode2, Palette, SdCard, 
  BatteryChargingFull, Sync, Warning, MonetizationOn, Storefront, 
  LocalShipping, CalendarToday, ShoppingCart, Receipt 
} from '@mui/icons-material';

const InventarioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // --- MOCK DATA: Simulamos el estado de autenticación ---
  const isAdmin = true; // Cámbialo a false para probar cómo se oculta el Costo y el botón Editar

  // --- MOCK DATA: Simulamos la carga de la API ---
  const [item, setItem] = useState(null);
  const [ventaAsociada, setVentaAsociada] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simulamos el delay de una API (fetch)
    setTimeout(() => {
      setItem({
        id: id || 101, // Usamos el ID de la URL si existe
        producto: "iPhone 15 Pro",
        modelo: "256GB Natural Titanium",
        imei: "354890123456789",
        color: "Titanio",
        memoria: "256GB",
        bateria: 85,
        ciclos: 142,
        observaciones: "Equipo impecable. Entregado con cable USB-C original y funda de regalo.",
        precioCosto: 900,
        precioMayor: 1050,
        precioMenor: 1200,
        sucursal: "Centro (Córdoba)",
        proveedor: "Apple Arg Oficial",
        stock: 0, // Ponemos 0 para probar la alerta de venta
        createdAt: "12/05/2026 10:30"
      });

      // Simulamos el ViewBag.VentaAsociada
      setVentaAsociada({
        idTicket: 4582,
        fecha: "15/05/2026",
        clienteNombre: "Simón",
        clienteApellido: "Sclarandi"
      });

      setCargando(false);
    }, 500); // 500ms de carga falsa
  }, [id]);

  if (cargando) {
    return <div className="p-10 text-center text-slate-500 font-bold mt-20">Cargando ficha técnica...</div>;
  }

  if (!item) {
    return <div className="p-10 text-center text-red-500 font-bold mt-20">Error: Producto no encontrado.</div>;
  }

  // Lógica de colores adaptada a Tailwind
  const colorBateriaMui = item.bateria > 80 ? "success" : item.bateria > 50 ? "warning" : "error";
  const colorStock = item.stock > 2 ? "bg-blue-100 text-blue-800" : item.stock > 0 ? "bg-orange-100 text-orange-800" : "bg-red-100 text-red-800";

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto mb-10">

        {/* --- TARJETA PRINCIPAL --- */}
        <div className="bg-white shadow-md border-0 rounded-2xl overflow-hidden">
          
          {/* Cabecera Oscura */}
          <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
            <h5 className="mb-0 font-bold text-xl flex items-center gap-2">
              <Info /> Ficha Técnica #{item.id}
            </h5>
            <div className="flex gap-2">
              {isAdmin && (
                <Button 
                  variant="outlined" color="inherit" size="small" startIcon={<Edit />}
                  onClick={() => navigate(`/app/inventario/editar/${item.id}`)}
                  className="border-slate-500 text-slate-200 hover:border-white hover:text-white"
                >
                  Editar
                </Button>
              )}
              <Button 
                variant="contained" color="inherit" size="small" startIcon={<ArrowBack />}
                onClick={() => navigate('/app/inventario')}
                className="bg-white text-slate-900 hover:bg-slate-200 font-bold"
              >
                Volver
              </Button>
            </div>
          </div>

          <div className="p-8">
            {/* 1. SECCIÓN DISPOSITIVO */}
            <div className="mb-8">
              <h6 className="text-slate-500 uppercase font-bold text-sm mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Smartphone fontSize="small" /> Dispositivo
              </h6>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="bg-slate-50 rounded-full p-6 text-slate-400 border border-slate-100">
                  <Smartphone sx={{ fontSize: 60 }} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 w-full">
                  <div className="md:col-span-2">
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Producto / Modelo</label>
                    <h4 className="font-bold text-slate-800 text-xl">{item.producto}</h4>
                    <p className="text-slate-500 text-sm">{item.modelo}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">IMEI / Serial</label>
                    <div className="text-lg font-mono text-slate-700 mt-1">
                      {item.imei ? item.imei : "---"}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Color</label>
                    <Chip label={`🎨 ${item.color || "N/A"}`} size="small" variant="outlined" className="font-bold" />
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Memoria</label>
                    <Chip label={`💾 ${item.memoria || "N/A"}`} size="small" className="bg-slate-800 text-white font-bold" />
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Batería</label>
                    {item.bateria !== null ? (
                      <div className="flex items-center gap-1">
                        <BatteryChargingFull color={colorBateriaMui} />
                        <span className={`font-bold text-${colorBateriaMui}`}>{item.bateria}%</span>
                      </div>
                    ) : <span className="text-slate-400 text-sm">- No aplica -</span>}
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Ciclos</label>
                    {item.ciclos !== null ? (
                      <div className="flex items-center gap-1 text-slate-700">
                        <Sync fontSize="small" /> <span className="font-bold">{item.ciclos}</span>
                      </div>
                    ) : <span className="text-slate-400 text-sm">- No aplica -</span>}
                  </div>
                </div>
              </div>

              {/* Observaciones */}
              {item.observaciones && (
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Warning className="text-yellow-600" fontSize="small" />
                    <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Observaciones / Detalles</span>
                  </div>
                  <p className="text-slate-700 text-sm italic ml-6">"{item.observaciones}"</p>
                </div>
              )}
            </div>

            {/* 2. SECCIÓN LISTA DE PRECIOS */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
              <h6 className="text-slate-500 uppercase font-bold text-sm mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                <MonetizationOn fontSize="small" /> Lista de Precios
              </h6>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
                {isAdmin && (
                  <div className="pt-2 md:pt-0">
                    <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Costo</label>
                    <h5 className="text-slate-500 font-bold text-xl mt-1">U$S {item.precioCosto.toLocaleString()}</h5>
                  </div>
                )}
                <div className={`pt-4 md:pt-0 ${!isAdmin ? 'md:border-none' : ''}`}>
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mayorista</label>
                  <h5 className="text-slate-800 font-bold text-xl mt-1">U$S {(item.precioMayor || 0).toLocaleString()}</h5>
                </div>
                <div className="pt-4 md:pt-0">
                  <label className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Precio Público</label>
                  <h3 className="text-emerald-600 font-bold text-3xl mt-1">U$S {item.precioMenor.toLocaleString()}</h3>
                </div>
              </div>
            </div>

            {/* 3. SECCIÓN UBICACIÓN Y STOCK */}
            <div>
              <h6 className="text-slate-500 uppercase font-bold text-sm mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Storefront fontSize="small" /> Ubicación y Stock
              </h6>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Sucursal</label>
                  <div className="flex items-center gap-2 text-slate-800">
                    <Storefront className="text-blue-600" fontSize="small" />
                    <span className="font-bold">{item.sucursal || "Sin Asignar"}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Proveedor</label>
                  <div className="flex items-center gap-2 text-slate-700">
                    <LocalShipping className="text-slate-400" fontSize="small" />
                    <span>{item.proveedor || "Desconocido"}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">Stock Disponible</label>
                  <span className={`px-4 py-1.5 rounded-full font-bold text-sm ${colorStock}`}>
                    {item.stock} Unidades
                  </span>
                </div>
              </div>
              
              <div className="text-right mt-6 text-xs text-slate-400 italic flex justify-end items-center gap-1">
                <CalendarToday fontSize="inherit" /> Ingresado al sistema: {item.createdAt}
              </div>
            </div>

          </div>
        </div>

        {/* --- ALERTAS DE STOCK CERO --- */}
        {item.stock === 0 && ventaAsociada ? (
          <div className="mt-6 bg-white border border-orange-200 shadow-sm rounded-xl p-5 flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full text-orange-500">
              <ShoppingCart fontSize="large" />
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-slate-800 text-lg">Este producto fue vendido</h5>
              <p className="text-slate-600 text-sm">
                Se vendió el <strong className="text-slate-800">{ventaAsociada.fecha}</strong> al cliente <strong className="text-slate-800">{ventaAsociada.clienteNombre} {ventaAsociada.clienteApellido}</strong>.
              </p>
            </div>
            <div>
              <Button 
                variant="contained" className="bg-slate-800 hover:bg-slate-700 font-bold whitespace-nowrap"
                startIcon={<Receipt />} onClick={() => navigate(`/app/ventas/detalle/${ventaAsociada.idTicket}`)}
              >
                VER TICKET
              </Button>
            </div>
          </div>
        ) : item.stock === 0 && !ventaAsociada ? (
          <div className="mt-6 bg-slate-100 border border-slate-200 rounded-xl p-4 text-center text-slate-500 text-sm font-bold flex items-center justify-center gap-2">
            <Box fontSize="small" /> Producto sin stock. No se encontró una venta directa asociada recientemente.
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default InventarioDetails;