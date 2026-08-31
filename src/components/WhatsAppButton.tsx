import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../lib/contact';

/**
 * Botón flotante de WhatsApp, visible en toda la web (landing + demos).
 */
export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full shadow-lg shadow-emerald-900/40 p-4 transition-all hover:scale-105 active:scale-95"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30 pointer-events-none" />
      <MessageCircle className="w-6 h-6 relative" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pl-1 transition-all duration-300 whitespace-nowrap text-sm font-semibold relative">
        Escribinos
      </span>
    </a>
  );
}
