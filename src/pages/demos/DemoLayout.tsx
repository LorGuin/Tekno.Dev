import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FlaskConical } from 'lucide-react';

interface DemoLayoutProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function DemoLayout({ icon, title, subtitle, children }: DemoLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Tekno.Dev
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/50 px-3 py-1 rounded-full">
            <FlaskConical className="w-3.5 h-3.5" />
            Demo — datos de ejemplo, no conectado a un negocio real
          </span>
        </div>

        <div className="flex items-start gap-4 mb-10">
          <div className="p-3 w-fit rounded-xl bg-slate-900/60 border border-slate-800">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">{subtitle}</p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
