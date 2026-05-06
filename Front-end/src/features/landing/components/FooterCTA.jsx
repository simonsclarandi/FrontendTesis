import { Button } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function FooterCTA() {
  return (
    <footer className="bg-gray-900">
      {/* Sección del Call to Action (El empujón final) */}
      <div className="px-4 py-20 mx-auto text-center max-w-7xl">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          ¿No encuentras el modelo que buscas?
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-400">
          Escríbenos directamente. Cotizamos equipos a pedido, tomamos permutas y resolvemos tus dudas técnicas al instante.
        </p>
        
        {/* Botón de WhatsApp */}
        <Button 
          variant="contained" 
          size="large" 
          startIcon={<WhatsAppIcon />}
          sx={{ 
            backgroundColor: '#22c55e', // Verde WhatsApp Tailwind
            color: 'white',
            padding: '14px 32px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '12px',
            '&:hover': { backgroundColor: '#16a34a' }
          }}
        >
          Consultar por WhatsApp
        </Button>
      </div>

      {/* El Footer real (Copyright y créditos) */}
      <div className="py-8 text-sm text-center text-gray-500 border-t border-gray-800">
        <p className="mb-2">
          📍 La Calera, Córdoba, Argentina | Punto Cell
        </p>
        <p>
          © {new Date().getFullYear()} E-commerce vinculado al sistema de gestión Punto Cell. Desarrollado como proyecto final.
        </p>
      </div>
    </footer>
  );
}