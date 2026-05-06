import { Card, CardMedia, CardContent, Typography, Button, Chip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function CatalogHighlight() {
  // Un arreglo con productos de prueba (luego puedes conectarlo a tu base de datos)
  const products = [
    {
      name: 'iPhone 15 Pro Max',
      capacity: '256GB',
      price: 'U$S 1.199',
      status: 'Nuevo',
      // Aquí pondrás la ruta de tu imagen, ej: '/assets/iphone15.jpg'
      imagePlaceholder: 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=Foto+iPhone+15' 
    },
    {
      name: 'iPhone 14 Pro',
      capacity: '128GB',
      price: 'U$S 899',
      status: 'Seminuevo',
      imagePlaceholder: 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=Foto+iPhone+14'
    },
    {
      name: 'AirPods Pro',
      capacity: '2da Gen',
      price: 'U$S 249',
      status: 'Nuevo',
      imagePlaceholder: 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=Foto+AirPods'
    },
    {
      name: 'Apple Watch Series 9',
      capacity: '45mm',
      price: 'U$S 399',
      status: 'Nuevo',
      imagePlaceholder: 'https://placehold.co/400x500/f3f4f6/a1a1aa?text=Foto+Watch'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl">
        
        {/* Encabezado */}
        <div className="flex flex-col items-center justify-between mb-12 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
              Equipos Destacados
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Los modelos más buscados, con entrega inmediata.
            </p>
          </div>
          <Button 
            variant="text" 
            sx={{ mt: { xs: 2, md: 0 }, color: '#2563eb', fontWeight: 'bold', textTransform: 'none' }}
          >
            Ver todo el catálogo →
          </Button>
        </div>

        {/* Grilla de Productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Card 
              key={index} 
              sx={{ 
                borderRadius: '16px', 
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}
            >
              {/* Espacio para la foto */}
              <div className="relative">
                <CardMedia
                  component="img"
                  height="250"
                  image={product.imagePlaceholder}
                  alt={product.name}
                  sx={{ height: 250, objectFit: 'cover' }}
                />
                {/* Etiqueta de Nuevo/Seminuevo flotando sobre la imagen */}
                <Chip 
                  label={product.status} 
                  size="small"
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12, 
                    backgroundColor: product.status === 'Nuevo' ? '#10b981' : '#f59e0b', // Verde si es nuevo, naranja si es seminuevo
                    color: 'white',
                    fontWeight: 'bold'
                  }} 
                />
              </div>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}>
                  {product.capacity}
                </Typography>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 2, color: '#111827' }}>
                  {product.name}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'black', color: '#2563eb', mb: 3 }}>
                  {product.price}
                </Typography>

                <Button 
                  variant="outlined" 
                  fullWidth 
                  startIcon={<ShoppingCartIcon />}
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    borderColor: '#e5e7eb',
                    color: '#374151',
                    '&:hover': { borderColor: '#2563eb', backgroundColor: '#eff6ff', color: '#2563eb' }
                  }}
                >
                  Añadir al carrito
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}