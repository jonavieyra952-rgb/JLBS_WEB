import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { 
  ShieldCheck, 
  Camera, 
  Radio, 
  Wifi, 
  Fingerprint, 
  ShieldAlert, 
  Video, 
  Cable, 
  Network, 
  Phone, 
  PhoneCall, 
  Router, 
  SignalHigh, 
  Bell, 
  KeyRound, 
  Speaker, 
  Cloud, 
  Antenna, 
  Zap, 
  HardDrive, 
  Database, 
  Signal
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Interfaz para tipado
interface Brand {
    id: number;
    name: string;
    icon: LucideIcon;
}

// Lista ampliada con ÍCONOS representativos de la industria de cada marca
const brands: Brand[] = [
  { id: 1, name: 'HIKVISION', icon: Camera },          // CCTV
  { id: 2, name: 'EPCOM', icon: Radio },               // Radiocomunicación
  { id: 3, name: 'UBIQUITI', icon: Wifi },             // Redes Inalámbricas
  { id: 4, name: 'ZKTECO', icon: Fingerprint },        // Control de Acceso
  { id: 5, name: 'HONEYWELL', icon: ShieldAlert },     // Fuego / Alarmas
  { id: 6, name: 'HILOOK', icon: Video },              // Video
  { id: 7, name: 'LINKEDPRO', icon: Cable },           // Cableado
  { id: 8, name: 'PANDUIT', icon: Network },           // Infraestructura
  { id: 9, name: 'GRANDSTREAM', icon: Phone },         // Telefonía IP
  { id: 10, name: 'FANVIL', icon: PhoneCall },         // Intercomunicadores
  { id: 11, name: 'MIKROTIK', icon: Router },          // Routing
  { id: 12, name: 'CAMBIUM', icon: SignalHigh },       // Enlaces
  { id: 13, name: 'DSC', icon: Bell },                 // Intrusión
  { id: 14, name: 'ROSSLARE', icon: KeyRound },        // Acceso
  { id: 15, name: 'BELDEN', icon: Network },           // Conectividad
  { id: 16, name: 'ENSON', icon: Speaker },            // Audio / PA
  { id: 17, name: 'RUIJIE', icon: Cloud },             // Cloud Networking
  { id: 18, name: 'MIMOSA', icon: Antenna },           // Microondas
  { id: 19, name: 'TOTAL GROUND', icon: Zap },         // Tierra física / Energía
  { id: 20, name: 'SEAGATE', icon: HardDrive },        // Almacenamiento
  { id: 21, name: 'WESTERN D.', icon: Database },      // Discos Duros
  { id: 22, name: 'NETPOINT', icon: Signal }           // Antenas
];

export const Brands: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-950 border-y border-white/5 relative overflow-hidden">
      {/* Estilo local para forzar la animación lineal continua y suave */}
      <style>{`
        .brands-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4 animate-fade-in">
              <ShieldCheck size={14} />
              <span>Garantía y Respaldo</span>
            </div>
            
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Alianza Estratégica con <span className="text-accent">Syscom</span>
            </h3>
            
            <p className="text-slate-400 text-sm md:text-lg font-light leading-relaxed">
              Como distribuidores autorizados, ponemos a su alcance la tecnología de las marcas líderes a nivel global. Acceda al inventario más completo de seguridad y telecomunicaciones directamente con nosotros.
            </p>
        </div>

        {/* CARRUSEL DE MARCAS */}
        <div className="relative w-full mask-gradient-sides">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={40}
              slidesPerView={2} // Móvil
              loop={true}
              speed={2500} // Velocidad ajustada para lectura cómoda
              allowTouchMove={false} // Evita que el usuario pare el carrusel manualmente
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 30 },
                640: { slidesPerView: 3, spaceBetween: 40 },
                768: { slidesPerView: 4, spaceBetween: 50 },
                1024: { slidesPerView: 5, spaceBetween: 60 },
                1280: { slidesPerView: 6, spaceBetween: 80 },
              }}
              className="brands-swiper w-full"
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.id} className="flex items-center justify-center py-4">
                  {/* Contenedor del Logo (Icono + Texto) */}
                  <div className="group flex items-center gap-3 px-4 py-2 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all duration-300">
                    
                    {/* Ícono de la marca */}
                    <div className="text-slate-600 group-hover:text-accent transition-colors duration-300">
                        <brand.icon size={28} strokeWidth={1.5} />
                    </div>

                    {/* Nombre de la marca */}
                    <span className="text-lg md:text-xl font-bold text-slate-500 whitespace-nowrap select-none group-hover:text-white transition-colors duration-300 tracking-wider font-mono uppercase">
                      {brand.name}
                    </span>
                    
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Sombras laterales para efecto de profundidad */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};
