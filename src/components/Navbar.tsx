import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "../types";

const navItems: NavItem[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Quiénes Somos", href: "#quienes" },
  { label: "Misión", href: "#mision" },
  { label: "Servicios", href: "#servicios" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-2 border-white/5"
          : "bg-transparent py-3 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* LOGO + MARCA ACTUALIZADA (SEGURIDAD PRIVADA) */}
        <a href="#inicio" className="flex items-center gap-2 sm:gap-4 group z-50 relative">
          {/* Contenedor de Imagen */}
          <div className={`relative bg-white rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 ${
             scrolled ? "p-1.5" : "p-1.5 sm:p-2"
          }`}>
            <img
              src="/logo.png"
              alt="Seguridad Privada"
              className={`object-contain transition-all duration-300 ${
                scrolled
                  ? "w-8 h-8 sm:w-10 sm:h-10"
                  : "w-10 h-10 sm:w-14 sm:h-14"
              }`}
            />
          </div>

          {/* Texto de la Marca en Dos Renglones con Poppins */}
          <div className="flex flex-col justify-center leading-[0.9] transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <span className={`font-bold text-white tracking-tight transition-all duration-300 ${
                scrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}>
              Seguridad
            </span>
            <span className={`font-bold text-accent tracking-tight transition-all duration-300 ${
                scrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}>
              Privada
            </span>
          </div>
        </a>

        {/* MENÚ DESKTOP */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors uppercase tracking-wider py-2 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contacto"
            className="px-6 py-2.5 rounded-full bg-accent text-white text-sm font-semibold hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5"
          >
            Cotizar
          </a>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          className="lg:hidden text-white hover:text-accent transition-colors p-2 z-50 rounded-full hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      <div
        className={`fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out lg:hidden ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative flex flex-col items-center space-y-6 w-full px-8 text-center max-h-screen overflow-y-auto py-20">
           <div className="bg-white p-4 rounded-2xl shadow-xl mb-4 transform transition-transform hover:scale-105">
            <img
                src="/logo.png"
                alt="Seguridad Privada"
                className="w-20 h-20 object-contain"
            />
          </div>

          <div className="flex flex-col w-full max-w-xs space-y-2">
            {navItems.map((item, idx) => (
                <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 text-xl sm:text-2xl font-medium py-3 rounded-xl transition-all duration-300 border-b border-white/5 last:border-0"
                style={{ transitionDelay: `${idx * 50}ms` }}
                >
                {item.label}
                </a>
            ))}
          </div>

          <a
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="mt-8 px-12 py-4 rounded-full bg-accent text-white text-xl font-bold hover:bg-cyan-500 transition-all shadow-xl hover:shadow-cyan-500/40 w-full max-w-xs transform active:scale-95"
          >
            Cotizar Ahora
          </a>
        </div>
      </div>
    </nav>
  );
};