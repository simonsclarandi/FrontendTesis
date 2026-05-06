// Datos mock para pruebas de desarrollo (sin backend)

export const inventario = [
  {
    id: 1,
    idInventario: 1,
    nombre: 'iPhone 13 Pro 128GB Gris Espacial',
    precio: 800,
    precioMayor: 750,
    stock: 5,
    imei: '354829104857201',
    bateria: 85,
    ciclos: 120
  },
  {
    id: 2,
    idInventario: 2,
    nombre: 'iPhone 14 Pro 256GB Morado',
    precio: 1000,
    precioMayor: 950,
    stock: 3,
    imei: '354829104857202',
    bateria: 92,
    ciclos: 45
  },
  {
    id: 3,
    idInventario: 3,
    nombre: 'Samsung Galaxy S23 Ultra 512GB Negro',
    precio: 1200,
    precioMayor: 1150,
    stock: 2,
    bateria: 88,
    ciclos: 60
  },
  {
    id: 4,
    idInventario: 4,
    nombre: 'AirPods Pro 2da Gen',
    precio: 250,
    precioMayor: 230,
    stock: 10
  },
  {
    id: 5,
    idInventario: 5,
    nombre: 'Apple Watch Series 8 45mm',
    precio: 400,
    precioMayor: 380,
    stock: 4
  },
  {
    id: 6,
    idInventario: 6,
    nombre: 'iPhone 12 64GB Azul',
    precio: 600,
    precioMayor: 570,
    stock: 8,
    imei: '354829104857203',
    bateria: 78,
    ciclos: 200
  },
  {
    id: 7,
    idInventario: 7,
    nombre: 'iPad Air 64GB WiFi',
    precio: 550,
    precioMayor: 520,
    stock: 3
  },
  {
    id: 8,
    idInventario: 8,
    nombre: 'MacBook Air M2 256GB',
    precio: 1100,
    precioMayor: 1050,
    stock: 2
  }
];

export const metodosPago = [
  { value: 1, label: 'Efectivo' },
  { value: 2, label: 'Transferencia Bancaria' },
  { value: 3, label: 'Permuta' },
  { value: 4, label: 'Crédito Personal / Cuotas' },
  { value: 5, label: 'Tarjeta de Débito' },
  { value: 6, label: 'Tarjeta de Crédito' }
];

export const localidades = [
  { value: 1, label: 'Córdoba Capital' },
  { value: 2, label: 'Villa Carlos Paz' },
  { value: 3, label: 'Río Cuarto' },
  { value: 4, label: 'Alta Gracia' },
  { value: 5, label: 'Jesús María' },
  { value: 6, label: 'Cruz del Eje' }
];

export const modelos = [
  { value: 1, label: 'iPhone 11' },
  { value: 2, label: 'iPhone 12' },
  { value: 3, label: 'iPhone 13' },
  { value: 4, label: 'iPhone 14' },
  { value: 5, label: 'iPhone 15' },
  { value: 6, label: 'Samsung Galaxy S22' },
  { value: 7, label: 'Samsung Galaxy S23' }
];

export const colores = [
  { value: 1, label: 'Negro' },
  { value: 2, label: 'Blanco' },
  { value: 3, label: 'Gris Espacial' },
  { value: 4, label: 'Azul' },
  { value: 5, label: 'Morado' },
  { value: 6, label: 'Verde' },
  { value: 7, label: 'Rojo' }
];

export const memorias = [
  { value: 1, label: '64GB' },
  { value: 2, label: '128GB' },
  { value: 3, label: '256GB' },
  { value: 4, label: '512GB' },
  { value: 5, label: '1TB' }
];

// Clientes de prueba predefinidos
export const clientesMock = [
  { id: 1, dni: '12345678', nombre: 'Juan Pérez', apellido: 'Pérez', celular: '3512345678', email: 'juan.perez@email.com' },
  { id: 2, dni: '23456789', nombre: 'María García', apellido: 'García', celular: '3513456789', email: 'maria.garcia@email.com' },
  { id: 3, dni: '34567890', nombre: 'Carlos López', apellido: 'López', celular: '3514567890', email: 'carlos.lopez@email.com' },
  { id: 4, dni: '45678901', nombre: 'Ana Martínez', apellido: 'Martínez', celular: '3515678901', email: 'ana.martinez@email.com' },
  { id: 5, dni: '56789012', nombre: 'Roberto Sánchez', apellido: 'Sánchez', celular: '3516789012', email: 'roberto.sanchez@email.com' }
];

// Configuración del servidor
export const configServidor = {
  idSucursal: 1,
  nombreSucursal: 'Sucursal Centro',
  dolarGlobal: 1050
};
