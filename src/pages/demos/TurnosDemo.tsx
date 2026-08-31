import { useMemo, useState } from 'react';
import { CalendarClock, Check, Clock, MessageCircle } from 'lucide-react';
import DemoLayout from './DemoLayout';

const HOY = new Date();

function formatearDia(offset: number) {
  const d = new Date(HOY);
  d.setDate(d.getDate() + offset);
  const nombre = d.toLocaleDateString('es-AR', { weekday: 'short' });
  const numero = d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
  return { key: offset, nombre: nombre.replace('.', ''), numero };
}

const DIAS = Array.from({ length: 6 }, (_, i) => formatearDia(i));

const HORARIOS_BASE = ['09:00', '09:45', '10:30', '11:15', '13:00', '13:45', '14:30', '16:00', '16:45', '17:30'];

// Algunos turnos ya ocupados, distintos según el día para que se sienta "real"
function ocupadosPorDia(dia: number): string[] {
  const patrones: Record<number, string[]> = {
    0: ['10:30', '13:00', '16:45'],
    1: ['09:00', '09:45', '17:30'],
    2: ['14:30'],
    3: ['09:00', '11:15', '13:45', '16:00'],
    4: ['10:30', '16:45'],
    5: ['09:45', '13:00'],
  };
  return patrones[dia] ?? [];
}

const PROXIMOS_TURNOS = [
  { nombre: 'Valentina Cruz', servicio: 'Consulta inicial', dia: 'Hoy', hora: '11:15' },
  { nombre: 'Franco Medina', servicio: 'Seguimiento', dia: 'Mañana', hora: '09:45' },
  { nombre: 'Julieta Sosa', servicio: 'Consulta inicial', dia: 'Mañana', hora: '16:00' },
];

export default function TurnosDemo() {
  const [diaSel, setDiaSel] = useState(0);
  const [horaSel, setHoraSel] = useState<string | null>(null);
  const [nombre, setNombre] = useState('');
  const [confirmado, setConfirmado] = useState<{ dia: string; hora: string; nombre: string } | null>(null);

  const ocupados = useMemo(() => ocupadosPorDia(diaSel), [diaSel]);

  const reservar = () => {
    if (!horaSel || !nombre.trim()) return;
    const dia = DIAS.find((d) => d.key === diaSel)!;
    setConfirmado({ dia: `${dia.nombre} ${dia.numero}`, hora: horaSel, nombre: nombre.trim() });
  };

  const nuevaReserva = () => {
    setConfirmado(null);
    setHoraSel(null);
    setNombre('');
  };

  return (
    <DemoLayout
      icon={<CalendarClock className="w-6 h-6 text-indigo-400" />}
      title="Sistema de Turnos — demo"
      subtitle="Turnero de ejemplo: elegís día y horario, reservás y ves la confirmación al instante. Los horarios ocupados son datos ficticios."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {confirmado ? (
            <div className="rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-600/50 flex items-center justify-center mx-auto mb-4">
                <Check className="w-6 h-6 text-emerald-400" />
              </div>
              <p className="text-lg font-semibold text-white">¡Turno confirmado!</p>
              <p className="text-sm text-slate-400 mt-1">
                {confirmado.nombre}, tu turno quedó para el <span className="text-slate-200">{confirmado.dia}</span> a las{' '}
                <span className="text-slate-200">{confirmado.hora}</span>.
              </p>
              <div className="mt-5 mx-auto max-w-sm text-left bg-slate-950/60 border border-slate-800 rounded-lg p-3 flex items-start gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-400">
                  Recordatorio automático (ejemplo): "Hola {confirmado.nombre}, te esperamos {confirmado.dia} a las{' '}
                  {confirmado.hora}. Cualquier cambio avisanos por acá."
                </p>
              </div>
              <button
                onClick={nuevaReserva}
                className="mt-6 text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                Reservar otro turno
              </button>
            </div>
          ) : (
            <>
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Elegí un día</p>
              <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
                {DIAS.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => {
                      setDiaSel(d.key);
                      setHoraSel(null);
                    }}
                    className={`shrink-0 w-16 rounded-xl border py-2.5 text-center transition-colors ${
                      diaSel === d.key
                        ? 'border-cyan-500 bg-cyan-950/40 text-white'
                        : 'border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-[11px] capitalize">{d.nombre}</p>
                    <p className="text-sm font-semibold">{d.numero}</p>
                  </button>
                ))}
              </div>

              <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Horarios disponibles</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                {HORARIOS_BASE.map((h) => {
                  const ocupado = ocupados.includes(h);
                  return (
                    <button
                      key={h}
                      disabled={ocupado}
                      onClick={() => setHoraSel(h)}
                      className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 text-sm transition-colors ${
                        ocupado
                          ? 'border-slate-900 text-slate-700 line-through cursor-not-allowed'
                          : horaSel === h
                            ? 'border-cyan-500 bg-cyan-500 text-slate-950 font-semibold'
                            : 'border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {h}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="flex-1 bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-600/60"
                />
                <button
                  onClick={reservar}
                  disabled={!horaSel || !nombre.trim()}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  Reservar turno
                </button>
              </div>
            </>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">Próximos turnos (ejemplo)</p>
          <div className="space-y-2">
            {PROXIMOS_TURNOS.map((t, i) => (
              <div key={i} className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-3">
                <p className="text-sm font-medium text-white">{t.nombre}</p>
                <p className="text-xs text-slate-500">{t.servicio}</p>
                <p className="text-xs text-cyan-400 mt-1">{t.dia} · {t.hora}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoLayout>
  );
}
