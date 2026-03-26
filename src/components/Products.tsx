import React, { useState, useEffect, useCallback } from 'react';
import type { ProductItem } from '../types';
import { X, ZoomIn, Loader2, MessageCircle, ChevronRight, Info, Maximize2, ChevronLeft, Share2, Check, Globe, ExternalLink } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

// LISTA DE PRODUCTOS CON RUTAS LOCALES Y VARIANTES DETALLADAS
const products: ProductItem[] = [
  // Videovigilancia
  { 
    id: 1, 
    category: 'CCTV', 
    title: 'Cámaras IP', 
    description: 'Alta resolución, visión nocturna e IA.', 
    image: '/products/camaras/fondo.png',
    subProducts: [
      { 
        name: 'PTZ IP 4 Megapixel', 
        image: '/products/camaras/PTZ IP 4 Megapixel.png', 
        description: 'Cámara PTZ IP 4 MP con zoom 42X, IR 400 m y AutoSeguimiento 3.0, diseñada para vigilancia profesional en exteriores con protección IP67/IK10.'
      },
      { 
        name: 'Cámara Domo 4K', 
        image: '/products/camaras/TandemVu PTZ IP.png', 
        description: 'Cámara TandemVu PTZ 4 MP + Panorámica 6 MP, con zoom 32X, IR 200 m, luz blanca, Acusense y autoseguimiento, diseñada para vigilancia exterior con protección IP66 y alerta audible/estroboscópica.'
      },
      { 
        name: 'Cámara PTZ 25x', 
        image: '/products/camaras/tandemvu.png', 
        description: 'Cámara TandemVu Domo PTZ 4 MP + Panorámica 6 MP, con zoom 42X, IR 300 m, luz blanca, autoseguimiento, deep learning y protección IP67 / IK10, ideal para vigilancia exterior de alta precisión.'
      }
    ]
  },
  { 
    id: 2, 
    category: 'CCTV', 
    title: 'Grabadores DVR/NVR', 
    description: 'Respaldo seguro y monitoreo remoto 24/7.', 
    image: '/products/dvrd/fondo.png',
    subProducts: [
      { 
        name: 'DVR 4 Canales TurboHD + 4 Canales IP', 
        image: '/products/dvrd/DVR 4 Canales.png', 
        description: 'DVR 4K de 4 canales + 4 IP con detección inteligente, compresión H.265+, audio por Coaxitron y soporte para disco duro de hasta 10 TB. Ideal para sistemas de videovigilancia modernos.'
      },
      { 
        name: 'DVR 4 Canales TURBOHD + 2 Canales IP', 
        image: '/products/dvrd/DVR 4 Canales TURBOHD + 2 Canales IP.png', 
        description: 'DVR 4K 4 TurboHD + 2 IP con audio bidireccional por Coaxitron, reconocimiento facial y Acusense. Ofrece compatibilidad pentahíbrida, compresión H.265+ y soporte para disco duro de hasta 10 TB, ideal para sistemas de seguridad avanzados.'
      },
      { 
        name: 'SSD PARA VIDEOVIGILANCIA', 
        image: '/products/dvrd/disco.png', 
        description: 'SSD de 1 TB diseñado para videovigilancia, con operación 24/7, lectura de hasta 560 MB/s y escritura de 520 MB/s. Ideal para DVR y NVR compatibles (epcom, HiLook, Hikvision) y con alta resistencia para grabación continua.'
      }
    ]
  },
  { 
    id: 3, 
    category: 'CCTV', 
    title: 'Kits Completos', 
    description: 'Soluciones "Todo en uno" listas para instalar.', 
    image: '/products/kits/fondo.png', 
    subProducts: [
      { 
        name: 'KIT TurboHD 1080p', 
        image: '/products/kits/KIT TurboHD 1080p.png', 
        description: 'Kit TurboHD 1080p con DVR de 4 canales y 4 cámaras metálicas de 2MP con visión nocturna e IP66. Compresión H.265+ y salidas Full HD. Ideal para videovigilancia en exteriores.'
      },
      { 
        name: 'KIT TurboHD 1080p', 
        image: '/products/kits/KIT TurboHD 1080p2.png', 
        description: 'Kit TurboHD 1080p con DVR de 16 canales y 16 cámaras con micrófono para exterior. Incluye fuente profesional, transceptores y conectores. Cámaras 1080p con IR 25 m y lente 2.8 mm. DVR pentahíbrido con audio por coaxitron y acceso remoto. Perfecto para instalaciones completas.'
      },
      { 
        name: 'Kit Solar IP All in One', 
        image: '/products/kits/Kit Solar IP All in One.png',
        description: 'Cámara solar 4G de 4 MP con visión a color 24/7, detección dual, movimiento PTZ y batería de larga duración. Funciona sin cables ni WiFi. Perfecta para exteriores.'
      }
    ]
  },
  
  // Control de Acceso
  { 
    id: 4, 
    category: 'Acceso', 
    title: 'Biométricos', 
    description: 'Lectura de huella, reconocimiento facial y RFID.', 
    image: '/products/biometricos/fondo.png',
    subProducts: [
        { 
          name: 'Lector Biométrico de Huella', 
          image: '/products/biometricos/Lector Biométrico de Huella.png', 
          description: 'Lector biométrico F22-ID con WiFi, pantalla táctil, control de acceso avanzado y soporte para 3,000 huellas y 5,000 tarjetas. Elegante, delgado y compatible con BioTimePro.'
        },
        { 
          name: 'Terminal Min Moe WiFi de Reconocimiento Facial ULTRA RÁPIDO', 
          image: '/products/biometricos/Terminal Min Moe WiFi de Reconocimiento Facial ULTRA RÁPIDO.png', 
          description: 'Terminal facial MinMoe DS-K1T341CMFW con reconocimiento ultra rápido, WiFi, lectura de hasta 1.5 m y protección IP65. Soporta 3,000 rostros, tarjetas y huellas, además de QR, videoportero y P2P Hik-Connect.'
        },
        { 
          name: 'Módulo Lector de Huella para Biometrico', 
          image: '/products/biometricos/Módulo Lector de Huella para Biometrico.png', 
          description: 'Módulo lector de huella DS-KAB671F para terminales DS-K1T607E y DS-K1T671M, con integración plug & play, alimentación 5V y diseño resistente a raspaduras para uso en interiores.'
        }
    ]
  },
  { 
    id: 5, 
    category: 'Acceso', 
    title: 'Torniquetes', 
    description: 'Control de flujo peatonal para entradas.', 
    image: '/products/torniquetes/fondo.png',
    subProducts: [
        { 
          name: 'Torniquete Estético Trípode Bidireccional de Acero Inoxidable', 
          image: '/products/torniquetes/Torniquete Estético Trípode Bidireccional de Acero Inoxidable.PNG', 
          description: 'Torniquete estético tipo trípode bidireccional en acero inoxidable SUS304, ideal para interior o exterior protegido. Ofrece 3 millones de ciclos, paso libre en emergencias, LEDs indicadores y capacidad de 35 personas por minuto.'
        },
        { 
          name: 'Torniquete Trípode con Diseño Slim Ultra Estético', 
          image: '/products/torniquetes/Torniquete Trípode con Diseño Slim Ultra Estético.PNG', 
          description: 'Torniquete trípode slim de uso rudo con diseño ultra estético en acero inoxidable. Ideal para interior o exterior protegido, con apertura automática en emergencias, LEDs indicadores y operación confiable de alto flujo.'
        },
        { 
          name: 'Torniquete De Cortesía Motorizado', 
          image: '/products/torniquetes/Torniquete De Cortesía Motorizado.PNG', 
          description: 'Torniquete de cortesía motorizado en acero inoxidable con ala de acrílico, operación bidireccional y activación por contacto seco. Compatible con lectores RFID, QR y facial, ideal para accesos de flujo medio y exteriores protegidos.'
        }
    ]
  },
  
  // Redes
  { 
    id: 6, 
    category: 'Redes', 
    title: 'Routers Empresariales', 
    description: 'Conectividad estable y balanceo de carga.', 
    image: '/products/routers/fondo.png',
    subProducts: [
        { 
          name: 'Router Empresarial / 1 puerto 10/100/1000 Mbps combo 1 puerto SFP (WAN)', 
          image: '/products/routers/Router Empresarial 1 puerto 10-100-1000 Mbps combo 1 puerto SFP (WAN).PNG', 
          description: 'Router empresarial Gigabit con balanceo de cargas, VPN avanzada y capacidad para 200 clientes, ideal para redes corporativas.'
        },
        { 
          name: 'Router Huawei NetEngine para Pequeñas y Medianas Empresas', 
          image: '/products/routers/Router Huawei NetEngine para Pequeñas y Medianas Empresas.PNG', 
          description: 'Router Huawei NetEngine AR6121E con SD-WAN, seguridad integrada y alta confiabilidad; ideal para empresas que requieren balanceo de cargas, failover y ranuras de servicio flexibles.'
        },
        { 
          name: 'Router eKit VPN Wi-Fi 7 empresarial', 
          image: '/products/routers/Router eKit VPN Wi-Fi 7 empresarial.png', 
          description: 'Router empresarial Wi-Fi 7 con controladora para 8 APs, puertos 2.5GE y Gigabit, gestión en la nube y operación sin licencias.'
        }
    ]
  },
  { 
    id: 7, 
    category: 'Redes', 
    title: 'Antenas WiFi', 
    description: 'Enlaces inalámbricos de largo alcance.', 
    image: '/products/antenas/fondo.png',
    subProducts: [
        { 
          name: 'Antena WiFi de Repuesto para Cámaras IP', 
          image: '/products/antenas/Antena WiFi de Repuesto para Cámaras IP.PNG', 
          description: 'Antena WiFi de repuesto para cámaras Hikvision, 3 dBi, frecuencia 2.4–2.5 GHz, con conector terminal pin.'
        },
        { 
          name: 'Antena Omnidireccional de doble banda 2.4', 
          image: '/products/antenas/Antena Omnidireccional de doble banda 2.4.PNG', 
          description: 'Antena omnidireccional doble banda 2.4/5 GHz, 5 dBi, cobertura 360°, conector RPSMA, diseño compacto y ligera, ideal para mejorar la señal en entornos inalámbricos.'
        },
        { 
          name: 'Antena WiFi Doble Banda SMA, 3 dBi, Magnetica, cable 1.5M', 
          image: '/products/antenas/Antena WiFi Doble Banda SMA, 3 dBi, Magnetica, cable 1.5M.PNG', 
          description: 'Antena WiFi doble banda con conector RP-SMA, 3 dBi, base magnética y cable de 1.5 m; ideal para mejorar la recepción en 2.4/5 GHz con alta eficiencia y amplio rango de temperatura.'
        }
    ]
  },
  
  // Energía
  { 
    id: 8, 
    category: 'Energía', 
    title: 'UPS y No-Breaks', 
    description: 'Respaldo de energía ante apagones.', 
    image: '/products/ups/fondo.png',
    subProducts: [
        { 
          name: 'UPS de 1000 VA', 
          image: '/products/ups/UPS de 1000 VA.PNG', 
          description: 'UPS de 1000 VA / 600 W con 6 tomas (4 con respaldo), batería de 12V/9Ah, protección contra sobrecarga y descarga, voltaje de entrada 85–150 V y salida estable 102–132 V. Compacta, fiable y con autonomía prolongada para equipos esenciales.'
        },
        { 
          name: 'UPS 1000VA', 
          image: '/products/ups/UPS 1000VA.PNG', 
          description: 'UPS de 1000VA/600W con pantalla LCD, 6 tomas (4 con respaldo), regulación de voltaje, protección RJ45 y onda senoidal simulada. Incluye batería 2×12V/7Ah, salida estable 120Vca y monitoreo en tiempo real.'
        },
        { 
          name: 'UPS de 850VA', 
          image: '/products/ups/UPS de 850VA.PNG', 
          description: 'UPS de 850VA/510W línea interactiva con regulador AVR, 4 tomas NEMA (3 con respaldo), salida estable a 120Vca y protección contra picos de voltaje. Ideal para equipos de oficina y pequeños negocios.'
        }
    ]
  },
];

const categories = ['Todos', 'CCTV', 'Acceso', 'Redes', 'Energía'];

/**
 * Tarjeta de Producto
 */
const ProductCard: React.FC<{ product: ProductItem; onClick: (prod: ProductItem) => void }> = ({ product, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-accent/50 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col shadow-lg hover:shadow-cyan-500/20"
      onClick={() => onClick(product)}
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-800">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=60"; }}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm scale-105'}`}
        />
        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-10 backdrop-blur-[2px] p-4 text-center">
            <div className="bg-accent/80 p-3 rounded-full backdrop-blur-md shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 mb-2">
                 <ZoomIn className="text-white w-6 h-6" />
            </div>
            <span className="text-white font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                Ver Ejemplos
            </span>
        </div>
        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-accent uppercase z-10 shadow-sm border border-white/10">
            {product.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors mb-2">{product.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{product.description}</p>
      </div>
    </div>
  );
};

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  
  // NUEVO: Usamos un índice numérico para la navegación.
  // 0 = Vista General (Producto Principal)
  // 1 = Primera Variante, 2 = Segunda Variante, etc.
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Controla la dirección de la animación
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  const [showMobileDetail, setShowMobileDetail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos' ? products : products.filter(p => p.category === activeCategory);

  // Calcula los datos a mostrar basándose en el índice actual
  const getPreviewData = () => {
    if (!selectedProduct) return null;
    
    // Si índice es 0, mostramos el producto principal (General)
    if (currentIndex === 0) {
        return {
            image: selectedProduct.image,
            title: selectedProduct.title,
            description: selectedProduct.description
        };
    }

    // Si índice > 0, mostramos la variante correspondiente (ajustando índice -1)
    const sub = selectedProduct.subProducts?.[currentIndex - 1];
    if (sub) {
        return {
            image: sub.image,
            title: sub.name,
            description: sub.description || 'Descripción detallada disponible en catálogo.'
        };
    }
    return null;
  };

  const previewData = getPreviewData();

  const openModal = useCallback((product: ProductItem) => {
    setSelectedProduct(product);
    setCurrentIndex(0); // Siempre empezar en General
    setSlideDirection('right');
    setShowMobileDetail(false); 
    setCopied(false);
  }, []);

  const closeModal = () => {
    setSelectedProduct(null);
    setCurrentIndex(0);
    setShowMobileDetail(false);
    setCopied(false);
  };

  // NAVEGACIÓN CORREGIDA POR ÍNDICES
  const handleNextVariant = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProduct) return;

    // Total = 1 (General) + Cantidad de Variantes
    const totalItems = 1 + (selectedProduct.subProducts?.length || 0);
    
    // Si no hay variantes, no hacemos nada
    if (totalItems <= 1) return;

    setSlideDirection('right');
    // Ciclo infinito: (actual + 1) % total
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrevVariant = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProduct) return;

    const totalItems = 1 + (selectedProduct.subProducts?.length || 0);
    
    if (totalItems <= 1) return;

    setSlideDirection('left');
    // Ciclo infinito hacia atrás
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  // Manejador para clics directos en la lista
  const handleVariantClick = (index: number, isGeneral: boolean) => {
    setSlideDirection('right');
    setCurrentIndex(index);
    
    if (window.innerWidth < 768) {
        if (isGeneral) {
            setShowMobileDetail(false);
            const container = document.getElementById('mobile-scroll-container');
            if(container) container.scrollTo({top:0, behavior:'smooth'});
        } else {
            setShowMobileDetail(true);
        }
    }
  };

  const showArrows = (selectedProduct?.subProducts?.length || 0) > 0;
  const animationClass = slideDirection === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  // --- FUNCIÓN DE COMPARTIR ---
  const handleShare = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!previewData) return;

    const shareData = {
        title: `JLBS Servicios - ${previewData.title}`,
        text: `Mira este producto en JLBS Servicios: ${previewData.title}. ${previewData.description}`,
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.log('Error al compartir', error);
        }
    } else {
        try {
            await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('No se pudo copiar', err);
        }
    }
  };

  // ATAJOS DE TECLADO
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!selectedProduct) return;
        
        if (showArrows) {
            if (e.key === 'ArrowRight') handleNextVariant();
            if (e.key === 'ArrowLeft') handlePrevVariant();
        }
        
        if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, showArrows]); // Dependencia simplificada

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const handleCloseMobileDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMobileDetail(false);
  };

  return (
    <section id="productos" className="relative py-20 md:py-28 bg-slate-900 scroll-mt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" alt="Fondo" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/60 to-slate-900/95"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Nuestro Catálogo</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Productos Destacados</h2>
            <p className="text-slate-200 max-w-2xl mx-auto text-lg font-light drop-shadow-md">
                Selecciona una categoría. Haz clic en un producto para ver ejemplos reales.
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border backdrop-blur-md ${activeCategory === cat ? 'bg-accent text-white border-accent shadow-lg shadow-cyan-500/25 scale-105' : 'bg-white/10 text-slate-300 border-white/10 hover:border-white/40 hover:text-white hover:bg-white/20'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={openModal} />
          ))}
        </div>

        {/* ENLACE A SYSCOM (CTA) */}
        <div id="enlace-syscom" className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group scroll-mt-32">
            <div className="absolute inset-0 bg-slate-800"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-8 text-center lg:text-left">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-2 border border-accent/20">
                      <Globe size={14} /><span>Catálogo en Línea</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">Revise nuestra gama completa de soluciones</h3>
                  <p className="text-slate-300 text-lg max-w-xl">
                      Acceda a la lista detallada de nuestro catálogo directamente en la plataforma de <strong>Syscom</strong>. Encuentre especificaciones técnicas, características y la mayor variedad en seguridad electrónica.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a 
                    href="https://www.syscom.mx/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-8 py-4 bg-accent text-white rounded-full font-bold text-lg hover:bg-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1"
                  >
                      <span>Ver Productos</span><ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-slate-500 text-xs text-center mt-3">Sitio oficial de Syscom</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- MODAL PRINCIPAL (LISTA) --- */}
      {selectedProduct && previewData && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-0 md:p-4 backdrop-blur-md animate-fade-in" onClick={closeModal}>
          <div 
            className="bg-slate-900 w-full max-w-5xl h-[100dvh] md:h-auto md:max-h-[90vh] overflow-hidden rounded-none md:rounded-3xl border-0 md:border border-white/10 shadow-2xl relative animate-scale-up flex flex-col md:flex-row" 
            onClick={(e) => e.stopPropagation()}
          >
             
             <button className="absolute top-4 right-4 text-white drop-shadow-md hover:text-accent transition-colors z-[1100] bg-black/50 p-2 rounded-full md:hidden" onClick={closeModal}>
                <X size={24} />
             </button>

             {/* COLUMNA IZQUIERDA: VISUALIZADOR (SOLO DESKTOP) */}
             <div className="hidden md:flex w-full md:w-3/5 bg-black/40 relative h-[35vh] md:h-auto md:min-h-[500px] flex-shrink-0 flex-col group overflow-hidden">
                
                {/* ANIMACIÓN IMAGEN DESKTOP */}
                <div key={previewData.image} className={`absolute inset-0 w-full h-full flex items-center justify-center bg-slate-950 ${animationClass}`}>
                   <div className="relative w-full h-full flex items-center justify-center">
                       <Zoom>
                            <img 
                                src={previewData.image} 
                                alt={previewData.title}
                                className="w-full h-full object-contain"
                                onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80"; }}
                                style={{ width: '100%', height: '100%' }}
                            />
                       </Zoom>
                   </div>
                </div>
                
                {showArrows && (
                  <>
                    <button 
                      onClick={handlePrevVariant}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-accent text-white/70 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10 hover:border-white/30"
                      aria-label="Variante anterior"
                    >
                      <ChevronLeft size={28} />
                    </button>
                    <button 
                      onClick={handleNextVariant}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-accent text-white/70 hover:text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm border border-white/10 hover:border-white/30"
                      aria-label="Variante siguiente"
                    >
                      <ChevronRight size={28} />
                    </button>
                  </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 pointer-events-none"></div>
                
                {/* ANIMACIÓN TEXTO DESKTOP */}
                <div key={previewData.title} className={`absolute bottom-0 left-0 w-full p-8 pt-20 pointer-events-none ${animationClass}`}>
                    <span className="inline-block px-3 py-1 rounded bg-accent text-white text-xs font-bold uppercase mb-3 shadow-lg">
                        {selectedProduct.category}
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-3 drop-shadow-lg leading-tight">{previewData.title}</h3>
                    <p className="text-slate-200 text-lg leading-relaxed drop-shadow-md border-l-4 border-accent pl-4">
                        {previewData.description}
                    </p>
                </div>
             </div>

             {/* COLUMNA DERECHA: SELECCIÓN */}
             <div 
                id="mobile-scroll-container"
                className="w-full md:w-2/5 p-5 md:p-8 bg-slate-900 flex flex-col flex-1 overflow-y-auto custom-scrollbar"
             >
                {/* ENCABEZADO MÓVIL */}
                <div className="md:hidden mb-6 mt-8 relative group/mobile-header">
                    <div className="rounded-xl overflow-hidden bg-slate-800/50 mb-4 border border-white/10 relative h-72 flex items-center justify-center p-4">
                         
                         <div className={`w-full h-full flex items-center justify-center`}>
                             <Zoom>
                                <img 
                                    src={selectedProduct.image} 
                                    alt={selectedProduct.title}
                                    className="w-full h-full object-contain"
                                />
                             </Zoom>
                         </div>
                         <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase shadow-sm z-10 pointer-events-none">
                            {selectedProduct.category}
                         </div>
                    </div>
                     <h3 className="text-2xl font-bold text-white mb-2">{selectedProduct.title}</h3>
                     <p className="text-slate-400 text-sm">{selectedProduct.description}</p>
                </div>

                <div className="hidden md:flex justify-between items-start mb-6">
                    <div>
                        <h4 className="text-xl font-bold text-white">Ejemplos del Catálogo</h4>
                        <p className="text-sm text-slate-400 mt-1">
                            Selecciona una variante para ver detalles
                        </p>
                    </div>
                    <button className="text-slate-400 hover:text-white" onClick={closeModal}>
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-3 flex-1 pb-20 md:pb-0">
                    <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 md:hidden">Selecciona un modelo:</p>

                    <button 
                        onClick={() => handleVariantClick(0, true)} // 0 = General
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 ${currentIndex === 0 ? 'bg-white/10 border-accent/50 ring-1 ring-accent/50' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                    >
                        <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-white/10">
                             <img src={selectedProduct.image} alt="Principal" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-white">General</span>
                            <span className="text-xs text-slate-500">Vista principal</span>
                        </div>
                    </button>

                    <div className="h-px bg-white/10 my-4"></div>

                    {selectedProduct.subProducts && selectedProduct.subProducts.map((sub, idx) => (
                        <button 
                            key={idx}
                            onClick={() => handleVariantClick(idx + 1, false)} // idx + 1 porque 0 es General
                            className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3 group ${currentIndex === (idx + 1) ? 'bg-white/10 border-accent/50 ring-1 ring-accent/50' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                        >
                            <div className="w-16 h-16 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0 border border-white/10 relative">
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h5 className={`font-medium truncate transition-colors ${currentIndex === (idx + 1) ? 'text-accent' : 'text-slate-300 group-hover:text-white'}`}>
                                    {sub.name}
                                </h5>
                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                    <Info size={12} />
                                    <span>Ver detalles</span>
                                </div>
                            </div>
                            <ChevronRight size={16} className={`transition-colors ${currentIndex === (idx + 1) ? 'text-accent' : 'text-slate-600'}`} />
                        </button>
                    ))}
                    
                    <div className="mt-4 p-4 bg-slate-800/80 border border-white/10 rounded-xl flex gap-3 relative overflow-hidden group/syscom">
                         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover/syscom:opacity-100 transition-opacity"></div>
                        <Globe className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 relative z-10" />
                        <div className="text-sm relative z-10">
                            <p className="text-white font-bold mb-1">Catálogo Syscom</p>
                            <p className="text-slate-400 leading-snug mb-2">
                                ¿Buscas un modelo específico? Encuéntralo en el sitio oficial y cotízalo con nosotros.
                            </p>
                            <a 
                                href="https://www.syscom.mx/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-accent hover:text-white font-bold transition-colors text-xs uppercase tracking-wide"
                            >
                                Ir a Syscom.mx <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN DESKTOP (Cotizar + Compartir) */}
                <div className="hidden md:flex mt-8 pt-6 border-t border-white/10 gap-3">
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-lg border border-white/10 text-white hover:bg-white/10 active:scale-95 group/share"
                        title="Compartir producto"
                    >
                         {copied ? (
                             <><Check size={20} className="text-green-500" /> <span className="text-green-500">Copiado</span></>
                         ) : (
                             <><Share2 size={20} className="text-slate-300 group-hover/share:text-white" /> <span>Compartir</span></>
                         )}
                    </button>

                    <a 
                        href={`https://wa.me/527222200018?text=Hola%20JLBS%20Servicios,%20me%20interesa%20el%20producto:%20${encodeURIComponent(previewData.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 active:scale-95"
                    >
                        <MessageCircle size={20} />
                        <span>Cotizar Modelo</span>
                    </a>
                </div>
             </div>
          </div>

          {/* --- VENTANITA FLOTANTE (MÓVIL) --- */}
          {showMobileDetail && (
            <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:hidden animate-fade-in" onClick={(e) => e.stopPropagation()}>
                <div className="bg-slate-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-scale-up" onClick={(e) => e.stopPropagation()}>
                    
                    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                        {/* Animación texto móvil */}
                        <h4 key={previewData.title} className={`font-bold text-white truncate pr-4 ${animationClass}`}>{previewData.title}</h4>
                        
                        <div className="flex items-center gap-2">

                            {/* BOTÓN COMPARTIR MÓVIL (En header de ventanita) */}
                            <button onClick={handleShare} className="bg-black/40 p-1.5 rounded-full text-slate-300 hover:text-white active:bg-accent active:text-white transition-colors">
                                <Share2 size={18} />
                            </button>
                            
                            <button onClick={handleCloseMobileDetail} className="bg-black/40 p-1.5 rounded-full text-slate-300 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-black/40 flex items-center justify-center min-h-[250px] relative group/mobile-popup">
                         {showArrows && (
                            <>
                              <button 
                                onClick={handlePrevVariant}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 active:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
                              >
                                <ChevronLeft size={24} />
                              </button>
                              <button 
                                onClick={handleNextVariant}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 active:bg-accent text-white flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
                              >
                                <ChevronRight size={24} />
                              </button>
                            </>
                         )}

                         <div className="absolute top-2 right-2 z-10 pointer-events-none opacity-50">
                             <Maximize2 size={16} className="text-white" />
                         </div>
                         
                         {/* Animación imagen móvil */}
                         <div key={previewData.image} className={`w-full h-full flex items-center justify-center ${animationClass}`}>
                            <div className={`w-full h-full flex items-center justify-center`}>
                                <Zoom>
                                    <img 
                                        src={previewData.image} 
                                        alt={previewData.title} 
                                        className="w-full h-full max-h-[250px] object-contain"
                                    />
                                </Zoom>
                            </div>
                         </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                        <span className="text-accent text-xs font-bold uppercase mb-2 block">{selectedProduct.category}</span>
                        {/* Animación descripción móvil */}
                        <p key={previewData.description} className={`text-slate-300 text-sm leading-relaxed mb-6 ${animationClass}`}>
                            {previewData.description}
                        </p>
                        
                        <a 
                            href={`https://wa.me/527222200018?text=Hola%20JLBS%20Servicios,%20me%20interesa%20el%20producto:%20${encodeURIComponent(previewData.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
                        >
                            <MessageCircle size={18} />
                            <span>Cotizar por WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
          )}

        </div>
      )}
    </section>
  );
};