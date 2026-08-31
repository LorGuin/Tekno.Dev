import { useMemo, useState } from 'react';
import {
  Database,
  Search,
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  Wallet,
} from 'lucide-react';
import DemoLayout from './DemoLayout';
import {
  contactosDemo,
  pedidosDemo,
  metricasDemo,
  type Contacto,
  type EstadoCliente,
  type EstadoPedido,
  type Pedido,
} from '../../data/crmDemoData';

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

const ESTADOS_CLIENTE: EstadoCliente[] = ['Nuevo lead', 'En negociación', 'Cliente cerrado', 'Inactivo'];
const ESTADOS_PEDIDO: EstadoPedido[] = ['Pendiente de pago', 'En preparación', 'Enviado/Entregado', 'Cobrado'];

const estadoClienteStyle: Record<EstadoCliente, string> = {
  'Nuevo lead': 'text-cyan-300 bg-cyan-950/50 border-cyan-800/60',
  'En negociación': 'text-amber-300 bg-amber-950/50 border-amber-800/60',
  'Cliente cerrado': 'text-emerald-300 bg-emerald-950/50 border-emerald-800/60',
  Inactivo: 'text-slate-400 bg-slate-800/50 border-slate-700/60',
};

const estadoPedidoStyle: Record<EstadoPedido, string> = {
  'Pendiente de pago': 'text-amber-300 bg-amber-950/50 border-amber-800/60',
  'En preparación': 'text-indigo-300 bg-indigo-950/50 border-indigo-800/60',
  'Enviado/Entregado': 'text-violet-300 bg-violet-950/50 border-violet-800/60',
  Cobrado: 'text-emerald-300 bg-emerald-950/50 border-emerald-800/60',
};

const mensajeWhatsapp = (p: Pedido) => {
  switch (p.estado) {
    case 'Pendiente de pago':
      return `Hola ${p.contactoNombre}, tu pedido #${p.id} quedó pendiente de pago. ¿Te paso el link para abonarlo?`;
    case 'En preparación':
      return `Hola ${p.contactoNombre}, tu pedido #${p.id} ya está en preparación. Te aviso apenas esté listo.`;
    case 'Enviado/Entregado':
      return `Hola ${p.contactoNombre}, tu pedido #${p.id} ya está listo/enviado.`;
    case 'Cobrado':
      return `Hola ${p.contactoNombre}, ¡gracias! Tu pedido #${p.id} quedó cobrado y cerrado.`;
  }
};

const waLink = (telefono: string, mensaje: string) =>
  `https://wa.me/${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`;

type Tab = 'contactos' | 'ventas' | 'dashboard';

function Contactos() {
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState<EstadoCliente | 'Todos'>('Todos');
  const [seleccionado, setSeleccionado] = useState<Contacto | null>(null);

  const filtrados = useMemo(() => {
    return contactosDemo.filter((c) => {
      const matchTexto =
        c.nombre.toLowerCase().includes(query.toLowerCase()) ||
        c.empresa.toLowerCase().includes(query.toLowerCase());
      const matchEstado = filtro === 'Todos' || c.estado === filtro;
      return matchTexto && matchEstado;
    });
  }, [query, filtro]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o empresa..."
              className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-600/60"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['Todos', ...ESTADOS_CLIENTE] as const).map((e) => (
            <button
              key={e}
              onClick={() => setFiltro(e)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                filtro === e
                  ? 'bg-cyan-500 text-slate-950 border-cyan-500'
                  : 'text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtrados.map((c) => (
            <button
              key={c.id}
              onClick={() => setSeleccionado(c)}
              className={`w-full text-left p-4 rounded-xl border transition-colors ${
                seleccionado?.id === c.id
                  ? 'border-cyan-600/60 bg-slate-900/80'
                  : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-white">{c.nombre}</p>
                  <p className="text-xs text-slate-500">{c.empresa}</p>
                </div>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${estadoClienteStyle[c.estado]}`}>
                  {c.estado}
                </span>
              </div>
            </button>
          ))}
          {filtrados.length === 0 && (
            <p className="text-sm text-slate-500 py-6 text-center">No hay contactos que coincidan con la búsqueda.</p>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        {seleccionado ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 sticky top-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold text-white">{seleccionado.nombre}</p>
                <p className="text-xs text-slate-500">{seleccionado.empresa} · {seleccionado.telefono}</p>
              </div>
              <button onClick={() => setSeleccionado(null)} className="text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs uppercase tracking-wide text-slate-500 mt-5 mb-2">Notas</p>
            <div className="space-y-2">
              {seleccionado.notas.map((n, i) => (
                <div key={i} className="text-sm bg-slate-950/60 border border-slate-800/60 rounded-lg p-3">
                  <p className="text-slate-300">{n.texto}</p>
                  <p className="text-[11px] text-slate-600 mt-1">{n.fecha}</p>
                </div>
              ))}
              {seleccionado.notas.length === 0 && <p className="text-sm text-slate-600">Sin notas todavía.</p>}
            </div>

            <p className="text-xs uppercase tracking-wide text-slate-500 mt-5 mb-2">Compras anteriores</p>
            <div className="space-y-2">
              {seleccionado.compras.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-slate-950/60 border border-slate-800/60 rounded-lg p-3">
                  <div>
                    <p className="text-slate-300">{c.producto}</p>
                    <p className="text-[11px] text-slate-600">{c.fecha}</p>
                  </div>
                  <p className="text-slate-200 font-medium">{currency.format(c.monto)}</p>
                </div>
              ))}
              {seleccionado.compras.length === 0 && <p className="text-sm text-slate-600">Todavía no compró nada.</p>}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
            Elegí un contacto de la lista para ver su historial de notas y compras.
          </div>
        )}
      </div>
    </div>
  );
}

function Ventas() {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosDemo);

  const mover = (id: string, dir: 1 | -1) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const idx = ESTADOS_PEDIDO.indexOf(p.estado);
        const next = ESTADOS_PEDIDO[Math.min(Math.max(idx + dir, 0), ESTADOS_PEDIDO.length - 1)];
        return { ...p, estado: next };
      }),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {ESTADOS_PEDIDO.map((estado) => {
        const items = pedidos.filter((p) => p.estado === estado);
        const total = items.reduce((acc, p) => acc + p.monto, 0);
        return (
          <div key={estado} className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${estadoPedidoStyle[estado]}`}>
                {estado}
              </span>
              <span className="text-[11px] text-slate-500">{items.length}</span>
            </div>
            <p className="text-xs text-slate-500 px-1 -mt-2">{currency.format(total)}</p>

            <div className="space-y-2 min-h-[80px]">
              {items.map((p) => (
                <div key={p.id} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
                  <p className="text-sm font-medium text-white">{p.contactoNombre}</p>
                  <p className="text-xs text-slate-500">{p.producto}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-slate-400">#{p.id} · {currency.format(p.monto)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => mover(p.id, -1)}
                        className="p-1 rounded border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30"
                        disabled={estado === ESTADOS_PEDIDO[0]}
                        aria-label="Mover a estado anterior"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => mover(p.id, 1)}
                        className="p-1 rounded border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30"
                        disabled={estado === ESTADOS_PEDIDO[ESTADOS_PEDIDO.length - 1]}
                        aria-label="Mover a estado siguiente"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <a
                      href={waLink(p.telefono, mensajeWhatsapp(p))}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 hover:text-emerald-300"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DashboardTab() {
  const { ventasMesActual, ventasMesAnterior, clientesActivos, productoTop } = metricasDemo;
  const delta = ((ventasMesActual - ventasMesAnterior) / ventasMesAnterior) * 100;
  const positivo = delta >= 0;
  const maxVenta = Math.max(ventasMesActual, ventasMesAnterior);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Ventas del mes</p>
            <Wallet className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{currency.format(ventasMesActual)}</p>
          <p className={`flex items-center gap-1 text-xs mt-1 ${positivo ? 'text-emerald-400' : 'text-rose-400'}`}>
            {positivo ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(delta).toFixed(0)}% vs. mes anterior
          </p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Producto más vendido</p>
            <Package className="w-4 h-4 text-violet-400" />
          </div>
          <p className="text-base font-semibold text-white mt-2 leading-snug">{productoTop}</p>
        </div>

        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">Clientes activos</p>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mt-2">{clientesActivos}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-5">
        <p className="text-xs text-slate-500 mb-4">Ventas: mes anterior vs. mes actual</p>
        <div className="flex items-end gap-8 h-36">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-16 rounded-t-md bg-slate-700"
              style={{ height: `${(ventasMesAnterior / maxVenta) * 100}%` }}
            />
            <p className="text-[11px] text-slate-500">Mes anterior</p>
            <p className="text-xs text-slate-400">{currency.format(ventasMesAnterior)}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-16 rounded-t-md bg-gradient-to-t from-cyan-500 to-indigo-500"
              style={{ height: `${(ventasMesActual / maxVenta) * 100}%` }}
            />
            <p className="text-[11px] text-slate-500">Mes actual</p>
            <p className="text-xs text-slate-400">{currency.format(ventasMesActual)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CrmDemo() {
  const [tab, setTab] = useState<Tab>('contactos');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'contactos', label: 'Contactos' },
    { id: 'ventas', label: 'Ventas / Pedidos' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  return (
    <DemoLayout
      icon={<Database className="w-6 h-6 text-blue-400" />}
      title="CRMs a Medida — demo"
      subtitle="Gestión de contactos, tablero de pedidos con acción directa a WhatsApp y métricas clave. Datos de ejemplo, no editable de forma permanente."
    >
      <div className="flex gap-2 mb-6 border-b border-slate-800/80">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? 'border-cyan-500 text-white'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'contactos' && <Contactos />}
      {tab === 'ventas' && <Ventas />}
      {tab === 'dashboard' && <DashboardTab />}
    </DemoLayout>
  );
}
