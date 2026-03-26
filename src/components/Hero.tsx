import React, { useState } from 'react';
import { ChevronRight, ZoomIn, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Datos para el carrusel
// NOTA: Asegúrate de guardar tus imágenes en la carpeta 'public/hero/' con estos nombres
// o cambia las rutas aquí para que coincidan con tus archivos.
const baseItems = [
  { 
    title: "Biométricos", 
    img: "/hero/biometrico.png" 
  },
  { 
    title: "Cámaras de Seguridad", 
    img: "/hero/camara.png" 
  },
  { 
    title: "Rastreo GPS", 
    img: "/hero/gps.png" 
  },
  { 
    title: "Monitores", 
    img: "/hero/monitor.png" 
  },
  { 
    title: "Routers y Switches", 
    img: "/hero/router.png" 
  },
  { 
    title: "Accesorios y Cables", 
    img: "/hero/cable.png" 
  },
];

// DUPLICAMOS los ítems para que Swiper tenga suficientes diapositivas para el efecto "loop" infinito
// sin que desaparezcan elementos al hacer scroll en pantallas grandes.
const carouselItems = [...baseItems, ...baseItems];

export const Hero: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section id="inicio" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-32 md:py-40 lg:py-48 gap-y-10">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop"
            alt="Seguridad Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/60"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-y-12 lg:gap-x-12 items-center">
          
          {/* === COLUMNA IZQUIERDA: Texto Principal === */}
          <div className="flex flex-col justify-center text-center lg:text-left gap-y-8 lg:gap-y-10 order-1">
            
            {/* Badge & Título */}
            <div className="space-y-6 lg:space-y-8">
              <div className="flex justify-center lg:justify-start">
                <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-slate-800/50 border border-slate-600 backdrop-blur-sm shadow-sm">
                    <span className="text-accent text-[10px] md:text-xs lg:text-sm font-bold tracking-widest uppercase">
                    Más de 18 años de experiencia
                    </span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                Seguridad Integral <br className="hidden lg:block" />
                <span className="text-accent block mt-2">Confíanza y Tecnología</span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed lg:leading-tight font-light">
              Protegemos lo que más te importa con soluciones avanzadas en vigilancia, control de acceso y personal altamente capacitado.
            </p>
            
            {/* Botón Servicios */}
            <div className="flex justify-center lg:justify-start pt-4">
              <a
                href="#servicios"
                className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 rounded-full bg-accent text-white font-semibold hover:bg-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2 transform hover:-translate-y-1 text-base md:text-lg"
              >
                Nuestros Servicios <ChevronRight size={20} />
              </a>
            </div>
          </div>

          {/* === COLUMNA DERECHA: Carrusel de Productos === */}
          <div className="order-2 w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[550px] mx-auto lg:ml-auto lg:mr-0 flex flex-col items-center lg:items-end mt-8 lg:mt-0">
              
              {/* 1. Descripción sobre el carrusel */}
              <div className="text-center lg:text-right mb-6 md:mb-8 space-y-3 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Tecnología de Vanguardia
                  </h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto">
                      Explora nuestra amplia gama de productos: desde Cámaras de Seguridad de alta definición hasta sistemas biométricos avanzados.
                  </p>
              </div>

              {/* 2. Carrusel Swiper */}
              <div className="w-full">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    spaceBetween={20} 
                    speed={800}
                    loop={true}
                    navigation={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 150,
                      modifier: 1.5,
                      slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                    className="w-full py-6 md:py-8 hero-swiper mb-8 px-2"
                >
                    {carouselItems.map((item, index) => (
                    <SwiperSlide key={index} className="!w-[240px] sm:!w-[280px] md:!w-[300px]">
                        <div 
                          className="relative group rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-sm transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
                          onClick={() => setSelectedImage(item.img)}
                        >
                          <div className="aspect-[4/3] overflow-hidden relative">
                              {/* 
                                  IMPORTANTE: object-cover asegura que la imagen cubra todo el espacio
                                  sin deformarse, sin importar si la subiste horizontal o vertical.
                              */}
                              <img 
                                src={item.img} 
                                alt={item.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    // Fallback por si la imagen local no existe aún
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80";
                                }} 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>
                              
                              {/* Overlay de Zoom */}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white w-10 h-10 drop-shadow-md" />
                              </div>
                              <div className="absolute bottom-2 right-2 md:hidden opacity-70">
                                 <ZoomIn className="text-white w-5 h-5 drop-shadow-md" />
                              </div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full p-4 text-center">
                              <h3 className="text-lg font-bold text-white tracking-wide">{item.title}</h3>
                          </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              {/* 3. Botón Ver Productos */}
              <div className="w-full flex justify-center lg:justify-end">
                <a
                  href="#productos"
                  className="w-full sm:w-auto px-8 py-3 rounded-full bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 hover:border-white/40 transition-all backdrop-blur-sm transform hover:-translate-y-1 text-base shadow-lg text-center"
                >
                  Ver Catálogo Completo
                </a>
              </div>
          </div>

        </div>
      </section>

      {/* Modal Lightbox para Zoom */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 p-2 md:p-4 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-accent transition-colors z-[1100] bg-slate-800/80 p-2 rounded-full backdrop-blur border border-white/10"
            aria-label="Cerrar imagen"
          >
            <X size={28} className="md:w-8 md:h-8" />
          </button>
          
          <img
            src={selectedImage}
            alt="Vista ampliada"
            className="w-auto h-auto max-w-full max-h-[85vh] md:max-h-[90vh] rounded-lg shadow-2xl object-contain animate-scale-up"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </>
  );
};