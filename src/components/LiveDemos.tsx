import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  Camera,
  ChartLine,
  BrainCircuit,
  Smartphone,
  ShoppingBag,
  CalendarCheck,
  ExternalLink,
  LayoutDashboard,
  Play,
  X,
} from 'lucide-react';

// Videos de presentación de GlucoPulse (copiados desde el proyecto de la app).
const GLUCO_TEASER = '/videos/glucopulse-corto.mp4';
const GLUCO_TEASER_POSTER = '/videos/glucopulse-corto.jpg';
const GLUCO_FULL = '/videos/glucopulse-como-funciona.mp4';
const GLUCO_FULL_POSTER = '/videos/glucopulse-como-funciona.jpg';

const glucoFeatures = [
  {
    icon: <ChartLine className="w-4 h-4 text-cyan-400" />,
    text: 'Importa el archivo de tu sensor de glucosa (CGM) y grafica tus lecturas con estadísticas por día, semana y mes.',
  },
  {
    icon: <Camera className="w-4 h-4 text-violet-400" />,
    text: 'Registrás cada comida con una foto: la IA reconoce el plato y estima sus macronutrientes.',
  },
  {
    icon: <Activity className="w-4 h-4 text-rose-400" />,
    text: 'Cruza cada comida con tu curva de glucosa para detectar qué alimentos te disparan picos.',
  },
  {
    icon: <BrainCircuit className="w-4 h-4 text-indigo-400" />,
    text: 'Asistente con IA que conoce tus datos: detecta patrones, comidas problemáticas y te da recomendaciones.',
  },
  {
    icon: <Smartphone className="w-4 h-4 text-emerald-400" />,
    text: 'Se instala en el celular como una app, con cuenta propia y datos guardados en la nube.',
  },
];

const otherDemos = [
  {
    icon: <ShoppingBag className="w-6 h-6 text-amber-400" />,
    nombre: 'Vértice',
    categoria: 'E-commerce',
    desc: 'Tienda online de indumentaria urbana con catálogo, talles, carrito y checkout. Incluye un panel administrador con stock por talle, caja diaria por local, ventas por canal (web y locales) y métricas con gráficos.',
    tags: ['Catálogo + carrito', 'Checkout', 'Stock por talle', 'Panel con métricas'],
    links: [
      { label: 'Ver tienda', url: 'https://vertice-modelo.netlify.app/' },
      { label: 'Ver panel admin', url: 'https://vertice-modelo.netlify.app/admin/' },
    ],
    tip: 'Tip: abrí la tienda y el panel en dos pestañas. Al comprar, el panel actualiza stock y ventas solo.',
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-cyan-400" />,
    nombre: 'Turnos+',
    categoria: 'Turnero online',
    desc: 'Turnero para cualquier negocio que atienda con turno: salud, estética, barberías o estudios profesionales. El cliente reserva 24/7 en 5 pasos, deja una seña online y el profesional recibe la confirmación lista en su WhatsApp.',
    tags: ['Reserva 24/7', 'Seña online', 'Confirmación por WhatsApp', 'Multi-rubro'],
    links: [{ label: 'Probar demo', url: 'https://turneros-online.netlify.app/' }],
    tip: 'Probá cambiar de rubro: la misma plataforma cambia de colores y servicios.',
  },
];

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
}

/** Ventana con el video completo (1 min, con sonido). Se descarga recién al abrirla. */
function VideoModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Video: cómo funciona GlucoPulse AI"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        <video
          src={GLUCO_FULL}
          poster={GLUCO_FULL_POSTER}
          controls
          autoPlay
          playsInline
          className="block max-h-[85vh] w-auto max-w-full aspect-[9/16] rounded-2xl border border-slate-700 shadow-2xl shadow-black/60 bg-black"
        />
      </div>
    </div>
  );
}

export default function LiveDemos() {
  const [videoOpen, setVideoOpen] = useState(false);
  const teaserRef = useRef<HTMLVideoElement>(null);
  const reduced = prefersReducedMotion();

  const openVideo = () => {
    teaserRef.current?.pause();
    setVideoOpen(true);
  };
  const closeVideo = () => {
    setVideoOpen(false);
    if (!reduced) teaserRef.current?.play().catch(() => {});
  };

  return (
    <section id="demos" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Demos en Vivo</h2>
        <p className="text-slate-400 text-sm mt-2">
          Productos que desarrollamos y podés probar ahora mismo desde tu navegador.
        </p>
      </div>

      {/* Destacado: GlucoPulse AI */}
      <article className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm p-6 sm:p-10 mb-6">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[11px] font-medium uppercase tracking-wide text-indigo-300 border border-indigo-800/70 bg-indigo-950/40 rounded-full px-2.5 py-1">
                App con IA
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 border border-slate-800 rounded-full px-2.5 py-1">
                Salud
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              GlucoPulse <span className="text-indigo-400">AI</span>
            </h3>
            <p className="mt-3 text-slate-300 leading-relaxed max-w-2xl">
              Tu glucosa y tus comidas, explicadas con inteligencia artificial. Pensada para personas que usan un
              sensor de glucosa: une sus lecturas con fotos de lo que comen para mostrar, de forma simple, qué
              alimentos les suben el azúcar.
            </p>

            <ul className="mt-6 space-y-3">
              {glucoFeatures.map((f, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                  <span className="mt-0.5 shrink-0 p-1.5 h-fit rounded-lg bg-slate-800/60 border border-slate-700/50">
                    {f.icon}
                  </span>
                  {f.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://glucopulse-ai.netlify.app/#/principal"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-indigo-900/30 transition-all hover:scale-105 active:scale-95"
              >
                Probar la app
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={openVideo}
                className="inline-flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
              >
                <Play className="w-4 h-4 text-indigo-400" />
                Ver cómo funciona
                <span className="text-xs text-slate-500">1 min</span>
              </button>
            </div>
          </div>

          {/* Teléfono con el video corto en loop */}
          <button
            type="button"
            onClick={openVideo}
            aria-label="Ver el video completo de cómo funciona GlucoPulse AI"
            className="group relative mx-auto w-[220px] sm:w-[250px] rounded-[2.2rem] p-2 bg-slate-800 border border-slate-700 shadow-2xl shadow-indigo-950/50 transition-transform hover:-translate-y-1"
          >
            <video
              ref={teaserRef}
              src={GLUCO_TEASER}
              poster={GLUCO_TEASER_POSTER}
              autoPlay={!reduced}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="block w-full aspect-[9/16] object-cover rounded-[1.7rem] bg-black"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-[2.2rem] bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors">
              <span className="p-4 rounded-full bg-white/90 text-slate-950 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all">
                <Play className="w-6 h-6 fill-current" />
              </span>
            </span>
          </button>
        </div>
      </article>

      {/* Otras demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {otherDemos.map((d) => (
          <article
            key={d.nombre}
            className="group relative flex flex-col p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 w-fit rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-cyan-500/30 transition-colors">
                {d.icon}
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 border border-slate-800 rounded-full px-2.5 py-1">
                {d.categoria}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">{d.nombre}</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{d.desc}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <li key={t} className="text-[11px] text-slate-300 bg-slate-800/60 border border-slate-700/50 rounded-md px-2 py-1">
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-slate-500 italic">{d.tip}</p>

            <div className="mt-auto pt-5 flex flex-wrap gap-x-5 gap-y-2">
              {d.links.map((l, i) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:gap-2 transition-all"
                >
                  {i === 0 ? <ExternalLink className="w-3.5 h-3.5" /> : <LayoutDashboard className="w-3.5 h-3.5" />}
                  {l.label}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>

      {videoOpen && <VideoModal onClose={closeVideo} />}
    </section>
  );
}
