import { Card, CardContent, Typography, Button } from '@mui/material';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import HandymanIcon from '@mui/icons-material/Handyman';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Services() {
  const services = [
    {
      title: 'Equipos Apple',
      description: 'Encuentra el iPhone, iPad o Mac perfecto para ti. Equipos nuevos y seminuevos verificados con garantía.',
      icon: <SmartphoneIcon sx={{ fontSize: 48, color: '#111827' }} /> // Gris muy oscuro, estilo Apple
    },
    {
      title: 'Servicio Técnico',
      description: 'Reparaciones en el día. Cambio de batería, módulos y diagnóstico especializado con repuestos de alta calidad.',
      icon: <HandymanIcon sx={{ fontSize: 48, color: '#111827' }} />
    },
    {
      title: 'Accesorios Premium',
      description: 'Fundas, cargadores originales, AirPods y todo lo que necesitas para proteger y potenciar tu dispositivo.',
      icon: <HeadphonesIcon sx={{ fontSize: 48, color: '#111827' }} />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        
        {/* Encabezado de la sección */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Todo para tu dispositivo en un solo lugar
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Calidad, confianza y atención personalizada para que disfrutes al máximo de tu tecnología.
          </p>
        </div>

        {/* Grilla de Servicios (3 columnas en PC, 1 en celular) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card 
              key={index} 
              sx={{ 
                height: '100%', 
                borderRadius: '16px', 
                boxShadow: '0 4px 20px -2px rgb(0 0 0 / 0.05)',
                border: '1px solid #f3f4f6',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': { 
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -4px rgb(0 0 0 / 0.1)',
                  borderColor: '#e5e7eb'
                } 
              }}
            >
              <CardContent sx={{ p: 5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="flex items-center justify-center w-16 h-16 mb-6 bg-gray-100 rounded-2xl">
                  {service.icon}
                </div>
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, color: '#111827' }}>
                  {service.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6, flexGrow: 1 }}>
                  {service.description}
                </Typography>
                
                {/* Botón sutil para ver más */}
                <Button 
                  variant="text" 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    justifyContent: 'flex-start',
                    padding: 0,
                    color: '#2563eb', // Azul para el enlace
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'transparent', color: '#1d4ed8', textDecoration: 'underline' }
                  }}
                >
                  Ver opciones
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}