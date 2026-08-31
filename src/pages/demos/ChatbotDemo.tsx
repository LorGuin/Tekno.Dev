import { useEffect, useRef, useState } from 'react';
import { Bot, Send, User } from 'lucide-react';
import DemoLayout from './DemoLayout';

interface Mensaje {
  id: number;
  de: 'bot' | 'user';
  texto: string;
}

const SALUDO_INICIAL =
  '¡Hola! 👋 Soy el asistente virtual de Tekno.Dev (versión demo). Puedo responder algunas preguntas de ejemplo sobre horarios, precios o turnos. Probá escribir algo.';

const RESPUESTAS: { claves: string[]; respuesta: string }[] = [
  {
    claves: ['hola', 'buenas', 'buenos dias', 'buen dia'],
    respuesta: '¡Hola! ¿En qué te puedo ayudar? Puedo contarte sobre horarios, precios o cómo sacar un turno.',
  },
  {
    claves: ['horario', 'hora', 'atienden'],
    respuesta: 'Atendemos de lunes a viernes de 9 a 18hs. Los sábados de 9 a 13hs.',
  },
  {
    claves: ['precio', 'costo', 'cuanto sale', 'cuanto cuesta', 'plan'],
    respuesta: 'Tenemos planes desde un valor mensual accesible según el tamaño de tu negocio. ¿Querés que te pasemos un presupuesto a medida?',
  },
  {
    claves: ['turno', 'reservar', 'reserva', 'cita'],
    respuesta: 'Puedo ayudarte a reservar un turno. Mirá también nuestro demo de Sistema de Turnos en la web para ver cómo se ve del lado del cliente.',
  },
  {
    claves: ['gracias'],
    respuesta: '¡De nada! Cualquier otra consulta, acá estoy 🙂',
  },
];

const RESPUESTA_DEFAULT =
  'Esto es una demo con respuestas de ejemplo. En la versión real, el bot se entrena con la información de tu negocio (catálogo, precios, preguntas frecuentes) y puede responder cualquier cosa relacionada.';

function responderComoBot(texto: string): string {
  const t = texto.toLowerCase();
  const match = RESPUESTAS.find((r) => r.claves.some((clave) => t.includes(clave)));
  return match ? match.respuesta : RESPUESTA_DEFAULT;
}

export default function ChatbotDemo() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [input, setInput] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  useEffect(() => {
    setEscribiendo(true);
    const t = setTimeout(() => {
      setMensajes([{ id: nextId(), de: 'bot', texto: SALUDO_INICIAL }]);
      setEscribiendo(false);
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [mensajes, escribiendo]);

  const enviar = () => {
    const texto = input.trim();
    if (!texto) return;
    setMensajes((prev) => [...prev, { id: nextId(), de: 'user', texto }]);
    setInput('');
    setEscribiendo(true);
    const delay = 500 + Math.random() * 600;
    setTimeout(() => {
      setMensajes((prev) => [...prev, { id: nextId(), de: 'bot', texto: responderComoBot(texto) }]);
      setEscribiendo(false);
    }, delay);
  };

  return (
    <DemoLayout
      icon={<Bot className="w-6 h-6 text-violet-400" />}
      title="ChatBot con IA — demo"
      subtitle="Interfaz de ejemplo con respuestas simuladas (sin conexión a un modelo de IA real). Muestra cómo se vería el widget de atención 24/7."
    >
      <div className="max-w-xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col h-[520px]">
        <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2 bg-slate-900/60">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-violet-500 to-indigo-600">
            <Bot className="w-4 h-4 text-black" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Asistente Tekno.Dev</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> en línea (demo)
            </p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {mensajes.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.de === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.de === 'bot' && (
                <div className="p-1 rounded-full bg-slate-800 shrink-0">
                  <Bot className="w-3.5 h-3.5 text-violet-400" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.de === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 rounded-br-sm'
                    : 'bg-slate-800/80 text-slate-200 rounded-bl-sm'
                }`}
              >
                {m.texto}
              </div>
              {m.de === 'user' && (
                <div className="p-1 rounded-full bg-slate-800 shrink-0">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              )}
            </div>
          ))}

          {escribiendo && (
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-slate-800">
                <Bot className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <div className="bg-slate-800/80 rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:-0.1s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" />
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-800 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && enviar()}
            placeholder="Escribí un mensaje (ej: horarios, precios, turno)..."
            className="flex-1 bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-violet-600/60"
          />
          <button
            onClick={enviar}
            className="p-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:opacity-90 transition-opacity"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DemoLayout>
  );
}
