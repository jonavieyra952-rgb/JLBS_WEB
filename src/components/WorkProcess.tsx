import React from 'react';
import { MessageSquare, ClipboardCheck, FileText, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Contacto",
    desc: "Platíquenos sus necesidades vía WhatsApp o llamada."
  },
  {
    icon: ClipboardCheck,
    title: "Evaluación",
    desc: "Realizamos un diagnóstico técnico en su ubicación sin costo."
  },
  {
    icon: FileText,
    title: "Propuesta",
    desc: "Diseñamos una solución técnica y económica a su medida."
  },
  {
    icon: ShieldCheck,
    title: "Implementación",
    desc: "Instalación profesional y puesta en marcha inmediata."
  }
];

export const WorkProcess: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-reveal">
          <span className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Metodología JLBS</span>
          <h2 className="text-4xl font-bold text-white mb-6">¿Cómo garantizamos su <span className="text-gradient-cyan">Seguridad</span>?</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Línea conectora (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -translate-y-12"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group animate-reveal" style={{ animationDelay: `${i * 0.2}s` }}>
              <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500 bg-gradient-to-br from-slate-800 to-slate-950">
                <step.icon size={32} className="text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};