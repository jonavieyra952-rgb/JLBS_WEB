import React from 'react';
import type { ServiceItem } from '../types';
import { 
  Shield, Users, MapPin, Scale, Briefcase, Phone, 
  HardHat, Zap, CheckCircle, Home, Car, Settings,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow} from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "react-medium-image-zoom/dist/styles.css";

import Zoom from "react-medium-image-zoom";

// DATOS DE SERVICIOS
// Rutas actualizadas apuntando a la carpeta "public/servicios"
const services: ServiceItem[] = [
  { id: 1, title: 'Seguridad Integral', description: 'Protección para hogares, negocios y empresas.', image: '/servicios/seguridadintegral.webp', icon: Shield },
  { id: 2, title: 'Elementos de Seguridad',  description: 'Personal capacitado y confiable.', image: '/servicios/elementosdesegu.webp', icon: Users },
  { id: 3, title: 'Monitoreo GPS', description: 'Rastreo satelital vehicular 24/7.', image: '/servicios/gps.webp', icon: MapPin },
  { id: 4, title: 'Asesoría Legal', description: 'Apoyo jurídico especializado.', image: '/servicios/asesoralegal.webp', icon: Scale },
  { id: 5, title: 'Servicio de Custodia', description: 'Protección en traslados de mercancía.', image: '/servicios/serviciocustodia.webp', icon: Briefcase },
  { id: 6, title: 'Telefonía Digital', description: 'Renta de equipos de comunicación.', image: '/servicios/renta_telefonia_digital.webp', icon: Phone },
  { id: 7, title: 'Equipo de Seguridad', description: 'Venta de equipo industrial.', image: '/servicios/ventadeequipo.webp', icon: HardHat },
  { id: 8, title: 'Instalaciones Eléctricas', description: 'Mantenimiento preventivo y correctivo.', image: '/servicios/mantenimiento_instalaciones_electricas.webp', icon: Zap },
  { id: 9, title: 'Distribuidor Autorizado', description: 'Socios oficiales de Syscom.', image: '/servicios/distribuidor_autorizado.webp', icon: CheckCircle },
  { id: 10, title: 'Casetas de Vigilancia', description: 'Infraestructura para control de acceso.', image: '/servicios/casetasvigilancia.webp', icon: Home },
  { id: 11, title: 'Renta de Vehículos', description: 'Flotilla disponible para servicios.', image: '/servicios/renta_vehiculos.webp', icon: Car },
  { id: 12, title: 'Instalación de Sistemas', description: 'CCTV, Alarmas y Biométricos.', image: '/servicios/instalaciondesistemas.webp', icon: Settings },
];

export const Services: React.FC = () => {
  return (
    <section
      id="servicios"
      className="py-20 scroll-mt-16 relative bg-[#0a0f1c] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,15,28,0.85), rgba(10,15,28,0.85)), url('https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80')",
      }}
    >
      <div className="container mx-auto px-6">

        {/* TÍTULO */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Soluciones tecnológicas y operativas diseñadas para cubrir todas tus necesidades de seguridad.
          </p>
        </div>

        {/* FLECHAS */}
        <div className="relative w-full flex justify-between items-center z-30 px-4 -mt-6">
          <button
            id="btn-prev"
            className="bg-primary/80 hover:bg-primary text-white p-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
          >
            <ChevronLeft size={26} />
          </button>

          <button
            id="btn-next"
            className="bg-primary/80 hover:bg-primary text-white p-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center"
          >
            <ChevronRight size={26} />
          </button>
        </div>

        {/* CARRUSEL */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 250,
              modifier: 2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: "#btn-prev",
              nextEl: "#btn-next",
            }}
            pagination={{ clickable: true }}
            speed={700}
            centeredSlides={true}
            grabCursor={true}
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1.1 },
              640: { slidesPerView: 1.3 },
              1024: { slidesPerView: 1.7 },
              1280: { slidesPerView: 2.3 },
            }}
            className="pb-20 pt-8"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="relative flex items-center justify-center w-full">
                    <Zoom zoomMargin={40} zoomImg={{ src: service.image }}>
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="
                          max-w-full 
                          max-h-[480px] 
                          object-contain 
                          transition-transform duration-700 ease-out 
                          cursor-pointer
                        "
                      />
                    </Zoom>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
};
