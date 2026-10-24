
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Terminal, ShieldCheck, FileText, BadgeCheck } from 'lucide-react';
import { openCookieSettings, trackPhoneClick } from '../lib/analytics';

export const Contact: React.FC = () => {
  const email = "seguridad@jlbservicios.com";
  
  // --- CONFIGURACIÓN DEL DESARROLLADOR ---
  const developerName = "Ing. en TI Jonathan Ivan Colin Vieyra";
  const developerEmail = "ivancolin2002@gmail.com";
  // -----------------------------------------------------------

  return (
    <footer id="contacto" className="bg-[#020617] text-white pt-20 pb-10 relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6">
        
        {/* --- GRID SUPERIOR DE 3 COLUMNAS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-start mb-16">
          
          {/* Columna 1: Identidad, Redes e INFORMACIÓN LEGAL */}
          <div className="space-y-8">
            {/* Logo y Título */}
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl shadow-lg shrink-0">
                <img src="/logo.png" alt="JLBS" className="w-16 h-16 object-contain" />
              </div>
              <div className="flex flex-col leading-[0.85]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <span className="text-3xl font-bold text-white uppercase tracking-tighter">Seguridad</span>
                <span className="text-3xl font-bold text-cyan-500 uppercase tracking-tighter">Privada</span>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-slate-400 text-lg font-light leading-relaxed max-w-sm">
              Empresa líder en seguridad integral y soluciones tecnológicas. Comprometidos con tu tranquilidad.
            </p>

            {/* Redes Sociales */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/people/JLBS-servicios/61566738910445/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de JLBS Servicios" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300"><Facebook size={18} /></a>
              <a href="https://www.instagram.com/jlbs_servicios" target="_blank" rel="noopener noreferrer" aria-label="Instagram de JLBS Servicios" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-pink-600 transition-all duration-300"><Instagram size={18} /></a>
            </div>

            {/* INFORMACIÓN LEGAL (RAZÓN SOCIAL Y CERTIFICACIONES) - TAMAÑO AUMENTADO Y POPPINS */}
            <div className="pt-10 border-t border-white/5 space-y-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <div>
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.3em] block mb-2">Razón Social</span>
                <p className="text-lg md:text-xl font-black text-white tracking-tight leading-tight">
                  "JLBS SERVICIOS S.A. DE C.V."
                </p>
              </div>

              <div className="grid gap-6">
                <div className="flex items-center gap-4 group/item">
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                    <ShieldCheck size={22} className="text-cyan-500 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Autorización</span>
                    <p className="text-sm font-bold text-slate-200 tracking-wide uppercase">SS/43/26-01/II-SP</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 group/item">
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                    <FileText size={22} className="text-cyan-500 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">REPSE</span>
                    <p className="text-sm font-bold text-slate-200 tracking-wide uppercase">STPS/UTD/DGIFT/AR189740/2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl">
                    <BadgeCheck size={22} className="text-cyan-500 shrink-0" />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Reg. Patronal</span>
                    <p className="text-sm font-bold text-slate-200 tracking-wide uppercase">C-67-70403-10-6</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2: Contacto y Mapa */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-cyan-500" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Llámanos</span>
                  <a href="tel:+527222200018" onClick={() => trackPhoneClick('footer')} className="text-lg font-bold text-slate-200 hover:text-white transition-colors">722 220 0018</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-cyan-500" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Escríbenos</span>
                  <a href={`mailto:${email}`} className="text-lg font-bold text-slate-200 hover:text-white transition-colors">seguridad@jlbservicios.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-cyan-500" />
                </div>
                <div>
                  <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-0.5">Ubicación</span>
                  <p className="text-slate-200 text-sm leading-snug font-medium">
                    Gral. Venustiano Carranza #504, Int-2<br />
                    Col. Universidad, C.P. 50130<br />
                    Toluca, Estado de México
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa a Color */}
            <div className="w-full h-44 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.023306934246!2d-99.66444892415175!3d19.28135694550882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cd89be17666359%3A0x6e2688330773322!2sGral.%20Venustiano%20Carranza%20504%2C%20Universidad%2C%2050130%20Toluca%20de%20Lerdo%2C%20M%C3%A9x.!5e0!3m2!1ses-419!2smx!4v1709230123456!5m2!1ses-419!2smx" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" title="Ubicación JLBS"
              ></iframe>
            </div>
          </div>

          {/* Columna 3: Horario de Atención */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">Horario de Atención</h3>
            <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/5 space-y-8 shadow-2xl">
              <div>
                <span className="block text-cyan-500 text-[10px] font-bold uppercase tracking-widest mb-2">Lunes – Viernes</span>
                <p className="text-white text-2xl font-bold">9:00 AM – 6:00 PM</p>
              </div>
              <div>
                <span className="block text-cyan-500 text-[10px] font-bold uppercase tracking-widest mb-2">Sábado</span>
                <p className="text-white text-2xl font-bold">9:00 AM – 2:00 PM</p>
              </div>
              <div>
                <span className="block text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-2">Domingo</span>
                <p className="text-slate-500 text-xl font-bold italic tracking-wide">Cerrado</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- COPYRIGHT Y CRÉDITOS FINALES --- */}
        <div className="border-t border-white/5 pt-10 flex flex-col xl:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-xs font-medium tracking-tight text-center md:text-left">
            © {new Date().getFullYear()} JLBS Servicios S.A. de C.V. <span className="mx-2 opacity-30">|</span> Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-400">
            <a href="/aviso-de-privacidad/" className="transition hover:text-white">Aviso de privacidad</a>
            <button type="button" onClick={openCookieSettings} className="transition hover:text-white">Preferencias de cookies</button>
            <a href="/camaras-de-seguridad-toluca/" className="transition hover:text-white">Cámaras para hogares</a>
          </div>

          <div className="flex items-center gap-4 bg-white/[0.03] px-5 py-2.5 rounded-full border border-white/5">
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <Terminal size={14} className="text-cyan-500" />
              <span>Desarrollado por <span className="text-slate-200 font-bold">{developerName}</span></span>
            </div>
            <span className="text-slate-800 text-xs">|</span>
            <div className="flex items-center gap-1.5">
               <Mail size={12} className="text-slate-500" />
               <a href={`mailto:${developerEmail}`} className="text-[10px] font-bold text-slate-500 hover:text-cyan-500 transition-colors">{developerEmail}</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
