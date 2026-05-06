import {
  Card, CardContent, Table, TableBody, TableCell, TableHead,
  TableRow, IconButton, Box, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useVenta } from '../context/VentaContext';
import { ProductoSearch } from './ProductoSearch';

export const CarritoSection = ({ inventario }) => {
  const { carrito, eliminarDelCarrito } = useVenta();

  return (
    // 1. TARJETA MUI: elevation para la sombra oficial y flex-1 para estirarse
    <Card elevation={3} sx={{ borderRadius: '12px', display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      
      {/* 2. HEADER: Reemplazamos CardHeader por un Box idéntico al de ClienteSection para consistencia */}
      <Box sx={{ backgroundColor: '#616161', color: 'white', px: 3, py: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
          <ShoppingCartIcon /> Carrito de Compras
        </Typography>
      </Box>

      {/* 3. CardContent Flexible: Ocupa el resto de la tarjeta */}
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3, '&:last-child': { pb: 3 } }}>
        
        {/* Buscador: Div estructural de Tailwind en lugar de Box */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4 shrink-0">
          <ProductoSearch inventario={inventario} />
        </div>

        {/* 4. CONTENEDOR DE TABLA: flex-1 y overflow-auto crean el scroll interno */}
        <div className="border border-gray-200 rounded-xl flex-1 overflow-auto bg-white">
          {/* stickyHeader mantiene los títulos arriba al scrollear */}
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: 'grey.800', color: 'white', fontWeight: 'bold' }}>Producto</TableCell>
                {/* Usamos el prop nativo align="right" de MUI en lugar de text-right */}
                <TableCell align="right" sx={{ bgcolor: 'grey.800', color: 'white', fontWeight: 'bold', width: 100 }}>Precio</TableCell>
                <TableCell align="center" sx={{ bgcolor: 'grey.800', color: 'white', fontWeight: 'bold', width: 80 }}>Cant.</TableCell>
                <TableCell align="right" sx={{ bgcolor: 'grey.800', color: 'white', fontWeight: 'bold', width: 100 }}>Subtotal</TableCell>
                <TableCell sx={{ bgcolor: 'grey.800', width: 50 }}></TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {carrito.length === 0 ? (
                <TableRow>
                  {/* align="center" nativo de MUI */}
                  <TableCell colSpan={5} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                    No hay productos en el carrito
                  </TableCell>
                </TableRow>
              ) : (
                carrito.map((item, index) => (
                  <TableRow
                    key={index}
                    hover
                    // Zebra striping al estilo MUI puro
                    sx={{ '&:nth-of-type(even)': { bgcolor: 'grey.50' } }}
                  >
                    <TableCell>{item.NombreProducto}</TableCell>
                    <TableCell align="right">
                      U$S {item.PrecioUnitario.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <span className="font-bold bg-gray-100 px-2 py-1 rounded">{item.Cantidad}</span>
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                      U$S {item.Subtotal.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => eliminarDelCarrito(index)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};