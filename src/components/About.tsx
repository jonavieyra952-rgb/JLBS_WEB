import React from 'react';
import { Target, Eye, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="relative py-24 md:py-32 overflow-hidden">
      
      {/* --- FONDO DE IMAGEN CON OVERLAY --- */}
      <div className="absolute inset-0 z-0">
        {/* Imagen de fondo (Edificio moderno / Tecnología) */}
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Fondo corporativo" 
          className="w-full h-full object-cover"
        />
        {/* Capa oscura encima para que se lea el texto (Gradiente azul oscuro) */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary/95"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* SECCIÓN: QUIÉNES SOMOS */}
        <section id="quienes" className="mb-20 scroll-mt-24 text-center">
            <div className="max-w-4xl mx-auto">
                <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3 block animate-fade-in">
                    Nuestra Esencia
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    Quiénes Somos
                </h2>
                <div className="w-24 h-1.5 bg-accent mx-auto mb-10 rounded-full"></div>
                
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                    Somos una empresa dedicada a ofrecer <strong className="text-white font-semibold">servicios de seguridad integral</strong> con los más altos estándares de calidad, disciplina y lealtad. 
                    <br className="hidden md:block" />
                    Nuestra prioridad es generar confianza, tranquilidad y certeza a cada uno de nuestros clientes, respaldados por años de experiencia y tecnología de vanguardia.
                </p>
            </div>
        </section>

        {/* SECCIÓN: TARJETAS (MISIÓN / VISIÓN) - Estilo Glassmorphism */}
        <section id="mision" className="grid md:grid-cols-3 gap-8 scroll-mt-24">
          
          {/* Card 1: Misión */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-cyan-500/40 transition-all duration-300">
              <Target className="text-accent group-hover:text-white transition-colors" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
            <p className="text-slate-300 leading-relaxed">
              Salvaguardar la integridad física y el patrimonio de nuestros usuarios mediante servicios profesionales personalizados y eficaces.
            </p>
          </div>

          {/* Card 2: Visión */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-cyan-500/40 transition-all duration-300">
              <Eye className="text-accent group-hover:text-white transition-colors" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
            <p className="text-slate-300 leading-relaxed">
              Ser líderes en el sector de seguridad integral, reconocidos por nuestra innovación tecnológica y compromiso con la tranquilidad de nuestros clientes.
            </p>
          </div>

          {/* Card 3: Compromiso */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-2">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-cyan-500/40 transition-all duration-300">
              <Award className="text-accent group-hover:text-white transition-colors" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Compromiso</h3>
            <p className="text-slate-300 leading-relaxed">
              Trabajamos con lealtad y disciplina. Somos distribuidores oficiales de marcas líderes como <strong className="text-white">Syscom</strong>, garantizando calidad en cada proyecto.
            </p>
          </div>

        </section>
      </div>
    </div>
  );
};