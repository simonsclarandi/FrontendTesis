import { Button } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-white to-gray-50 md:py-24">
      
      <div className="max-w-4xl mx-auto text-center">
        {/* Título E-commerce */}
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
          Tu próximo equipo, <span className="text-blue-600">al mejor precio</span>
        </h1>
        
        {/* Subtítulo E-commerce */}
        <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-600">
          Encuentra los últimos modelos, repuestos originales y el servicio técnico más confiable para tu dispositivo.
        </p>

        {/* Botón Call to Action para la tienda */}
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<ShoppingBagIcon />}
          sx={{ 
            backgroundColor: '#2563eb', 
            padding: '14px 32px',
            fontSize: '1.1rem',
            textTransform: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
            '&:hover': { backgroundColor: '#1d4ed8' }
          }}
        >
          Ver Catálogo Online
        </Button>
      </div>

    </section>
  );
}