export type EstadoCliente = 'Nuevo lead' | 'En negociación' | 'Cliente cerrado' | 'Inactivo';
export type EstadoPedido = 'Pendiente de pago' | 'En preparación' | 'Enviado/Entregado' | 'Cobrado';

export interface Nota {
  fecha: string;
  texto: string;
}

export interface Compra {
  fecha: string;
  producto: string;
  monto: number;
}

export interface Contacto {
  id: string;
  nombre: string;
  empresa: string;
  telefono: string;
  estado: EstadoCliente;
  notas: Nota[];
  compras: Compra[];
}

export interface Pedido {
  id: string;
  contactoId: string;
  contactoNombre: string;
  telefono: string;
  producto: string;
  monto: number;
  estado: EstadoPedido;
  fecha: string;
}

export const contactosDemo: Contacto[] = [
  {
    id: 'c1',
    nombre: 'Martina Gómez',
    empresa: 'Panadería La Espiga',
    telefono: '5492611234567',
    estado: 'Cliente cerrado',
    notas: [
      { fecha: '2026-08-12', texto: 'Pidió presupuesto para sistema de turnos para su local.' },
      { fecha: '2026-08-20', texto: 'Firmó el plan mensual. Onboarding programado.' },
    ],
    compras: [
      { fecha: '2026-08-22', producto: 'Plan Mini-CRM Mensual', monto: 45000 },
    ],
  },
  {
    id: 'c2',
    nombre: 'Lucas Fernández',
    empresa: 'Estudio Fernández & Asoc.',
    telefono: '5492615551234',
    estado: 'En negociación',
    notas: [
      { fecha: '2026-08-18', texto: 'Interesado en chatbot con IA para atención de clientes.' },
    ],
    compras: [],
  },
  {
    id: 'c3',
    nombre: 'Rocío Álvarez',
    empresa: 'Boutique Rocío',
    telefono: '5492613339876',
    estado: 'Nuevo lead',
    notas: [
      { fecha: '2026-08-27', texto: 'Completó el formulario de contacto de la web.' },
    ],
    compras: [],
  },
  {
    id: 'c4',
    nombre: 'Diego Torres',
    empresa: 'Torres Repuestos',
    telefono: '5492614447890',
    estado: 'Cliente cerrado',
    notas: [
      { fecha: '2026-07-02', texto: 'Cliente desde julio. Pidió agregar más usuarios al CRM.' },
    ],
    compras: [
      { fecha: '2026-07-05', producto: 'Plan Mini-CRM Mensual', monto: 45000 },
      { fecha: '2026-08-05', producto: 'Plan Mini-CRM Mensual', monto: 45000 },
    ],
  },
  {
    id: 'c5',
    nombre: 'Sabrina Ríos',
    empresa: 'Consultorio Ríos',
    telefono: '5492612229988',
    estado: 'Inactivo',
    notas: [
      { fecha: '2026-05-14', texto: 'Probó el demo, no siguió por presupuesto.' },
    ],
    compras: [],
  },
  {
    id: 'c6',
    nombre: 'Nicolás Paz',
    empresa: 'Paz Indumentaria',
    telefono: '5492616668821',
    estado: 'En negociación',
    notas: [
      { fecha: '2026-08-25', texto: 'Quiere ver el tablero de pedidos antes de decidir.' },
    ],
    compras: [],
  },
];

export const pedidosDemo: Pedido[] = [
  {
    id: '1042',
    contactoId: 'c1',
    contactoNombre: 'Martina Gómez',
    telefono: '5492611234567',
    producto: 'Setup inicial + capacitación',
    monto: 30000,
    estado: 'Cobrado',
    fecha: '2026-08-22',
  },
  {
    id: '1043',
    contactoId: 'c4',
    contactoNombre: 'Diego Torres',
    telefono: '5492614447890',
    producto: 'Plan Mini-CRM Mensual',
    monto: 45000,
    estado: 'Enviado/Entregado',
    fecha: '2026-08-24',
  },
  {
    id: '1044',
    contactoId: 'c2',
    contactoNombre: 'Lucas Fernández',
    telefono: '5492615551234',
    producto: 'Demo chatbot IA',
    monto: 0,
    estado: 'En preparación',
    fecha: '2026-08-26',
  },
  {
    id: '1045',
    contactoId: 'c6',
    contactoNombre: 'Nicolás Paz',
    telefono: '5492616668821',
    producto: 'Plan Mini-CRM Mensual',
    monto: 45000,
    estado: 'Pendiente de pago',
    fecha: '2026-08-28',
  },
  {
    id: '1046',
    contactoId: 'c3',
    contactoNombre: 'Rocío Álvarez',
    telefono: '5492613339876',
    producto: 'Sistema de turnos a medida',
    monto: 60000,
    estado: 'Pendiente de pago',
    fecha: '2026-08-29',
  },
];

export const metricasDemo = {
  ventasMesActual: 120000,
  ventasMesAnterior: 88000,
  clientesActivos: 2,
  productoTop: 'Plan Mini-CRM Mensual',
};
