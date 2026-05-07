import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Divider, 
  Chip, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper
} from '@mui/material';
import { Print, ArrowBack, MoneyOff, Info } from '@mui/icons-material';

const TicketDetalle = ({ venta }) => {
    if (!venta) {
        return <div className="p-10 text-center">Cargando datos del ticket...</div>;
    }

    const { id } = useParams();
  const ticketRef = useRef();

  // Cálculos equivalentes a la lógica de C#
  const cotizacionRef = venta.pagos?.[0]?.cotizacionDolar || 0;
  const totalPagado = venta.pagos?.reduce((acc, p) => acc + p.monto, 0) || 0;
  const isAdmin = true; // Esto vendría de tu contexto de Auth

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    console.log("Cargando datos para la venta ID:", id);
    // Aquí harías tu fetch(api/ventas/getdetails/id)
  }, [id]);

  return (
    <div className="container mx-auto mt-8 mb-12 px-4 max-w-2xl">
      {/* Tarjeta del Ticket */}
      <Card 
        id="ticketImprimible" 
        ref={ticketRef}
        className="shadow-xl border-none overflow-visible"
        sx={{ borderRadius: 4 }}
      >
        {/* Header */}
        <div className="text-center py-6">
          <Typography variant="h5" className="font-bold">PUNTO APPLE 🍎</Typography>
          <Typography variant="body2" className="text-gray-500">Venta de Dispositivos y Accesorios</Typography>
          <Typography variant="body2" className="text-gray-500">La Calera, Córdoba</Typography>
        </div>

        <CardContent className="pt-0">
          {/* Badge de Ticket ID */}
          <div className="flex justify-center mb-4">
            <Chip 
              label={`Ticket Nº ${venta.id}`} 
              variant="outlined" 
              className="font-bold bg-gray-50"
            />
          </div>

          {/* Info Principal */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
            <div>
              <span className="font-bold">Fecha:</span><br />
              {venta.fecha}
            </div>
            <div className="text-right">
              <span className="font-bold">Sucursal:</span><br />
              {venta.sucursalNombre}
            </div>
          </div>

          {/* Info Cliente/Vendedor */}
          <div className="bg-gray-50 p-3 rounded-lg text-sm mb-6 border border-gray-100">
            <p><strong>Cliente:</strong> {venta.clienteNombre} {venta.clienteApellido}</p>
            <p><strong>DNI:</strong> {venta.clienteDni}</p>
            {cotizacionRef > 0 && (
              <p><strong>Cotización Dólar:</strong> ${cotizacionRef.toLocaleString('es-AR')}</p>
            )}
            <p><strong>Vendedor:</strong> {venta.vendedorNombre || "Sistema"}</p>
          </div>

          {/* Tabla de Productos */}
          <TableContainer component={Paper} elevation={0} className="mb-6">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">Producto</TableCell>
                  <TableCell align="center" className="font-bold">Cant</TableCell>
                  <TableCell align="right" className="font-bold">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {venta.detalleVenta.map((det, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-bold text-gray-800">{det.productoNombre}</div>
                      {det.modelo !== det.productoNombre && (
                        <div className="text-xs text-gray-500">{det.modelo}</div>
                      )}
                      {det.imei && (
                        <div className="mt-2 p-2 bg-gray-100 rounded text-[11px] border border-dashed border-gray-300">
                          <strong>IMEI:</strong> {det.imei} <br />
                          <strong>Color:</strong> {det.color} | <strong>Cap:</strong> {det.memoria} | <strong>Bat:</strong> {det.bateria}%
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="center">{det.cantidad}</TableCell>
                    <TableCell align="right" className="font-bold text-nowrap">
                      U$S {det.subtotal.toLocaleString('en-US')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Totales */}
          <div className="space-y-1 mb-6">
            {venta.bonificacion > 0 && (
              <>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>U$S {(venta.totalVenta + venta.bonificacion).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-red-500 text-sm">
                  <span>Bonificación (-)</span>
                  <span>- U$S {venta.bonificacion.toLocaleString()}</span>
                </div>
              </>
            )}
            <Divider className="my-2 border-gray-800" />
            <div className="flex justify-between items-center">
              <Typography variant="h6" className="font-bold">TOTAL</Typography>
              <Typography variant="h6" className="font-bold text-blue-600">
                U$S {venta.totalVenta.toLocaleString()}
              </Typography>
            </div>
            {cotizacionRef > 0 && (
              <div className="text-right text-xs text-gray-400 italic">
                (Aprox. AR$ {(venta.totalVenta * cotizacionRef).toLocaleString('es-AR')})
              </div>
            )}
          </div>

          {/* Historial de Pagos */}
          <div className="mt-8 border-t border-dashed pt-4">
            <Typography variant="caption" className="font-bold text-gray-400 block mb-2 uppercase tracking-wider">
              Historial de Pagos
            </Typography>
            {venta.pagos.map((pago, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-bold">{pago.metodoNombre}</span>
                    <span className="ml-2 text-xs text-gray-400">({pago.fecha})</span>
                    {pago.esPermuta && (
                      <Chip label="PERMUTA" size="small" className="ml-2 scale-75 bg-gray-200" />
                    )}
                  </div>
                  <span className="font-bold">U$S {pago.monto.toLocaleString()}</span>
                </div>
                {pago.esPermuta && (
                  <div className="ml-4 mt-1 p-2 bg-gray-50 border rounded text-[11px] italic text-gray-500">
                    Recibido: {pago.observacion} <br />
                    IMEI: {pago.imeiDispositivo}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Observaciones y Garantía */}
          {venta.observaciones && (
            <div className="mt-4 p-3 border-t border-dashed border-gray-300">
              <Typography variant="caption" className="font-bold text-gray-500">OBSERVACIONES:</Typography>
              <Typography variant="body2" className="uppercase font-medium">{venta.observaciones}</Typography>
            </div>
          )}

          <div className="text-center mt-10 pt-4 border-t border-gray-100">
            <Typography variant="body2" className="text-gray-400">¡Gracias por tu compra!</Typography>
            <Typography variant="body2" className="font-bold text-gray-600">Tiene garantía de 60 días.</Typography>
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción (No se imprimen) */}
      <div className="mt-8 flex justify-center gap-4 print:hidden">
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<ArrowBack />}
          className="capitalize"
            onClick={() => window.history.back()}
        >
          Volver
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Print />}
          onClick={handlePrint}
          className="bg-zinc-900 hover:bg-zinc-800 capitalize px-8"
        >
          Imprimir Ticket
        </Button>
      </div>

      {/* CSS para Impresión */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #ticketImprimible, #ticketImprimible * { visibility: visible; }
          #ticketImprimible {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            border: none !important;
          }
          .print\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default TicketDetalle;