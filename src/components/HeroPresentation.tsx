import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Layout, 
  CalendarClock, 
  Database, 
  Sparkles, 
  ArrowRight, 
  Terminal,
  Stethoscope,
  Scissors,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, whatsappLink } from '../lib/contact';
import ShaderBackground from './effects/ShaderBackground';

// Listado de servicios destacados
const services = [
  {
    icon: <Layout className="w-6 h-6 text-cyan-400" />,
    title: "Webs & Web Apps",
    desc: "Plataformas web de alto rendimiento, interfaces dinámicas (SPA/SSR) y soluciones escalables."
  },
  {
    icon: <Bot className="w-6 h-6 text-violet-400" />,
    title: "ChatBots con AI",
    desc: "Agentes conversacionales inteligentes entrenados con tu información para atención 24/7.",
    href: "/demo/chatbot"
  },
  {
    icon: <CalendarClock className="w-6 h-6 text-indigo-400" />,
    title: "Sistemas de Turnos",
    desc: "Turneros automatizados con confirmación en tiempo real y recordatorios integrados.",
    href: "/demo/turnos"
  },
  {
    icon: <Database className="w-6 h-6 text-blue-400" />,
    title: "CRMs a Medida",
    desc: "Gestión centralizada de clientes, ventas y métricas clave para optimizar tu operativa.",
    href: "/demo/crm"
  }
];

// Proyectos reales entregados a clientes
const proyectos = [
  {
    icon: <Stethoscope className="w-6 h-6 text-cyan-400" />,
    nombre: "CIMED Mendoza",
    categoria: "Salud",
    desc: "Sitio institucional para un centro médico integral (cardiología, neurología, clínica médica y anatomía patológica) en Ciudad de Mendoza.",
    url: "https://cimed-mendoza.netlify.app/"
  },
  {
    icon: <Scissors className="w-6 h-6 text-violet-400" />,
    nombre: "Hidalgo Gentlemen's Club",
    categoria: "Barbería",
    desc: "Web para una barbería de estilo clásico americano en Mendoza: servicios, turnos online y ubicación.",
    url: "https://hidalgo-gentlemens-club.netlify.app/"
  }
];

export const HeroPresentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-black overflow-hidden relative z-0 font-sans">
      
      {/* Fondo: shader WebGL con luces que siguen el cursor (fixed, cubre todo el viewport) */}
      <ShaderBackground />

      {/* Grid tecnológico sutil por encima del shader */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Header / Navbar básico */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10 border-b border-slate-800/60 backdrop-blur-md bg-slate-950/40">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-cyan-500 to-indigo-600 rounded-lg shadow-lg shadow-cyan-500/20">
            <Terminal className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-wider text-white">
            Tekno<span className="text-cyan-400">.Dev</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Available for new projects
          </span>
          <a
            href="#proyectos"
            className="hidden sm:inline-flex text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-200 px-2 py-2 transition-colors"
          >
            Proyectos
          </a>
          <a
            href="#servicios"
            className="text-xs font-semibold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded-lg transition-all"
          >
            Servicios
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 backdrop-blur-md mb-8 shadow-inner">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">
            Ingeniería de Software & Soluciones Digitales
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Construimos software que impulsa el futuro de tu negocio en{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500">
            Tekno.Dev
          </span>
        </h1>

        {/* Subtítulo descriptivo */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Diseño y desarrollo a medida de aplicaciones web, automatizaciones inteligentes con IA, sistemas de reservas y plataformas de gestión empresarial (CRM).
        </p>

        {/* Botones de acción */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#contacto"
            className="group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
          >
            Iniciar Proyecto
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#servicios"
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium px-7 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
          >
            Explorar Soluciones
          </a>
        </div>
      </section>

      {/* Grid de Servicios y Especialidades */}
      <section id="servicios" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Nuestros Servicios & Especialidades
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Desarrollo robusto, escalable y optimizado para cada etapa de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => {
            const cardClass =
              "group relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20";

            const cardBody = (
              <>
                <div className="p-3 w-fit rounded-xl bg-slate-800/50 border border-slate-700/50 mb-4 group-hover:border-cyan-500/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
                {item.href && (
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:gap-2 transition-all">
                    Ver demo
                    <ArrowRight className="w-3.5 h-3.5" />
                  </p>
                )}
              </>
            );

            return item.href ? (
              <Link key={idx} to={item.href} className={cardClass}>
                {cardBody}
              </Link>
            ) : (
              <div key={idx} className={cardClass}>
                {cardBody}
              </div>
            );
          })}
        </div>
      </section>

      {/* Proyectos realizados */}
      <section id="proyectos" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Proyectos Realizados
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Sitios que ya entregamos a clientes reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proyectos.map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="group relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 w-fit rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-cyan-500/30 transition-colors">
                  {p.icon}
                </div>
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-500 border border-slate-800 rounded-full px-2.5 py-1">
                  {p.categoria}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {p.nombre}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {p.desc}
              </p>
              <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:gap-2 transition-all">
                Visitar sitio
                <ExternalLink className="w-3.5 h-3.5" />
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="relative z-10 max-w-4xl mx-auto px-6 py-20 border-t border-slate-900 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          ¿Hablamos de tu proyecto?
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
          Contanos qué necesitás y te respondemos a la brevedad. La vía más rápida es WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            Escribinos por WhatsApp
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800 text-slate-300 font-medium px-6 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
          >
            <Phone className="w-4 h-4" />
            {CONTACT_PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* Footer minimalista */}
      <footer className="relative z-10 border-t border-slate-900 py-8 text-center text-xs text-slate-600">
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mb-4">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Mail className="w-3.5 h-3.5" />
            {CONTACT_EMAIL}
          </a>
          <a href={`tel:${CONTACT_PHONE_TEL}`} className="inline-flex items-center gap-1.5 hover:text-slate-300 transition-colors">
            <Phone className="w-3.5 h-3.5" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
        <p>© {new Date().getFullYear()} Tekno.Dev — Software Development & AI Solutions.</p>
      </footer>
    </div>
  );
};

export default HeroPresentation;
