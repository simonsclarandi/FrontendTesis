import { Avatar, IconButton, Typography } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Team() {
  const members = [
    {
      name: 'Simón',
      role: 'Desarrollador Full-Stack',
      avatarText: 'S', 
      linkedin: '#', // Reemplazar con tu link
      github: '#', // Reemplazar con tu link
    },
    {
      name: '[Nombre del Compañero]',
      role: 'Analista Funcional & QA',
      avatarText: 'C',
      linkedin: '#',
      github: '#',
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="px-4 mx-auto max-w-7xl">
        
        {/* Encabezado */}
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            El equipo detrás del código
          </h2 >
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Somos estudiantes de la Facultad de Lenguas. Este ecosistema fue diseñado integrando una landing comercial conectada en tiempo real a nuestro sistema de administración integral.
          </p>
        </div>

        {/* Grilla de Integrantes */}
        <div className={`grid grid-cols-1 gap-12 ${members.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
          {members.map((member, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-8 transition-shadow bg-gray-50 rounded-3xl hover:shadow-lg border border-gray-100"
            >
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: '3rem', 
                  bgcolor: '#2563eb',
                  mb: 4,
                  border: '4px solid white',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              >
                {member.avatarText}
              </Avatar>

              <Typography variant="h6" className="font-bold text-gray-900">
                {member.name}
              </Typography>
              
              <Typography variant="subtitle1" className="mb-4 font-medium text-blue-600">
                {member.role}
              </Typography>
              
              <p className="mb-6 text-sm leading-relaxed text-center text-gray-600">
                Enfocado en crear soluciones prácticas, eficientes y escalables para transformar la gestión de comercios reales.
              </p>

              <div className="flex gap-2">
                <IconButton 
                  component="a" 
                  href={member.linkedin} 
                  target="_blank" 
                  sx={{ color: '#0a66c2', '&:hover': { bgcolor: '#0a66c210' } }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  component="a" 
                  href={member.github} 
                  target="_blank" 
                  sx={{ color: '#1f2328', '&:hover': { bgcolor: '#1f232810' } }}
                >
                  <GitHubIcon />
                </IconButton>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}