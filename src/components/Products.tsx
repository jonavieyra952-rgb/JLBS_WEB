import React, { useState, useEffect, useCallback } from 'react';
import type { ProductItem } from '../types';
import { X, ZoomIn, Loader2, MessageCircle, ChevronRight, Info, Maximize2, ChevronLeft, Share2, Check, Globe, ExternalLink } from 'lucide-react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { trackWhatsAppClick } from '../lib/analytics';

type ProductProvider = 'syscom' | 'tvc' | 'tecnosinergia';

interface ProviderCatalog {
  id: ProductProvider;
  name: string;
  subtitle: string;
  url: string;
  domain: string;
}

const providers: ProviderCatalog[] = [
  {
    id: 'syscom',
    name: 'Syscom',
    subtitle: 'Seguridad, telecomunicaciones y energía',
    url: 'https://www.syscom.mx/',
    domain: 'syscom.mx',
  },
  {
    id: 'tvc',
    name: 'TVC',
    subtitle: 'Acceso, protección perimetral, audio y automatización',
    url: 'https://tvc.mx/',
    domain: 'tvc.mx',
  },
  {
    id: 'tecnosinergia',
    name: 'Tecnosinergia',
    subtitle: 'Transporte, almacenamiento, acceso e infraestructura',
    url: 'https://tecnosinergia.com/',
    domain: 'tecnosinergia.com',
  },
];

// Catálogo Syscom existente: 8 familias y 3 modelos por familia.
const syscomProducts: ProductItem[] = [
  // Videovigilancia
  { 
    id: 1, 
    category: 'CCTV', 
    title: 'Cámaras IP', 
    description: 'Alta resolución, visión nocturna e IA.', 
    image: '/products/camaras/fondo.webp',
    subProducts: [
      { 
        name: 'PTZ IP 4 Megapixel', 
        image: '/products/camaras/PTZ IP 4 Megapixel.webp', 
        description: 'Cámara PTZ IP 4 MP con zoom 42X, IR 400 m y AutoSeguimiento 3.0, diseñada para vigilancia profesional en exteriores con protección IP67/IK10.'
      },
      { 
        name: 'Cámara Domo 4K', 
        image: '/products/camaras/TandemVu PTZ IP.webp', 
        description: 'Cámara TandemVu PTZ 4 MP + Panorámica 6 MP, con zoom 32X, IR 200 m, luz blanca, Acusense y autoseguimiento, diseñada para vigilancia exterior con protección IP66 y alerta audible/estroboscópica.'
      },
      { 
        name: 'Cámara PTZ 25x', 
        image: '/products/camaras/tandemvu.webp', 
        description: 'Cámara TandemVu Domo PTZ 4 MP + Panorámica 6 MP, con zoom 42X, IR 300 m, luz blanca, autoseguimiento, deep learning y protección IP67 / IK10, ideal para vigilancia exterior de alta precisión.'
      }
    ]
  },
  { 
    id: 2, 
    category: 'CCTV', 
    title: 'Grabadores DVR/NVR', 
    description: 'Respaldo seguro y monitoreo remoto 24/7.', 
    image: '/products/dvrd/fondo.webp',
    subProducts: [
      { 
        name: 'DVR 4 Canales TurboHD + 4 Canales IP', 
        image: '/products/dvrd/DVR 4 Canales.webp', 
        description: 'DVR 4K de 4 canales + 4 IP con detección inteligente, compresión H.265+, audio por Coaxitron y soporte para disco duro de hasta 10 TB. Ideal para sistemas de videovigilancia modernos.'
      },
      { 
        name: 'DVR 4 Canales TURBOHD + 2 Canales IP', 
        image: '/products/dvrd/DVR 4 Canales TURBOHD + 2 Canales IP.webp', 
        description: 'DVR 4K 4 TurboHD + 2 IP con audio bidireccional por Coaxitron, reconocimiento facial y Acusense. Ofrece compatibilidad pentahíbrida, compresión H.265+ y soporte para disco duro de hasta 10 TB, ideal para sistemas de seguridad avanzados.'
      },
      { 
        name: 'SSD PARA VIDEOVIGILANCIA', 
        image: '/products/dvrd/disco.webp', 
        description: 'SSD de 1 TB diseñado para videovigilancia, con operación 24/7, lectura de hasta 560 MB/s y escritura de 520 MB/s. Ideal para DVR y NVR compatibles (epcom, HiLook, Hikvision) y con alta resistencia para grabación continua.'
      }
    ]
  },
  { 
    id: 3, 
    category: 'CCTV', 
    title: 'Kits Completos', 
    description: 'Soluciones "Todo en uno" listas para instalar.', 
    image: '/products/kits/fondo.webp', 
    subProducts: [
      { 
        name: 'KIT TurboHD 1080p', 
        image: '/products/kits/KIT TurboHD 1080p.webp', 
        description: 'Kit TurboHD 1080p con DVR de 4 canales y 4 cámaras metálicas de 2MP con visión nocturna e IP66. Compresión H.265+ y salidas Full HD. Ideal para videovigilancia en exteriores.'
      },
      { 
        name: 'KIT TurboHD 1080p', 
        image: '/products/kits/KIT TurboHD 1080p2.webp', 
        description: 'Kit TurboHD 1080p con DVR de 16 canales y 16 cámaras con micrófono para exterior. Incluye fuente profesional, transceptores y conectores. Cámaras 1080p con IR 25 m y lente 2.8 mm. DVR pentahíbrido con audio por coaxitron y acceso remoto. Perfecto para instalaciones completas.'
      },
      { 
        name: 'Kit Solar IP All in One', 
        image: '/products/kits/Kit Solar IP All in One.webp',
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
    image: '/products/biometricos/fondo.webp',
    subProducts: [
        { 
          name: 'Lector Biométrico de Huella', 
          image: '/products/biometricos/Lector Biométrico de Huella.webp', 
          description: 'Lector biométrico F22-ID con WiFi, pantalla táctil, control de acceso avanzado y soporte para 3,000 huellas y 5,000 tarjetas. Elegante, delgado y compatible con BioTimePro.'
        },
        { 
          name: 'Terminal Min Moe WiFi de Reconocimiento Facial ULTRA RÁPIDO', 
          image: '/products/biometricos/Terminal Min Moe WiFi de Reconocimiento Facial ULTRA RÁPIDO.webp', 
          description: 'Terminal facial MinMoe DS-K1T341CMFW con reconocimiento ultra rápido, WiFi, lectura de hasta 1.5 m y protección IP65. Soporta 3,000 rostros, tarjetas y huellas, además de QR, videoportero y P2P Hik-Connect.'
        },
        { 
          name: 'Módulo Lector de Huella para Biometrico', 
          image: '/products/biometricos/Módulo Lector de Huella para Biometrico.webp', 
          description: 'Módulo lector de huella DS-KAB671F para terminales DS-K1T607E y DS-K1T671M, con integración plug & play, alimentación 5V y diseño resistente a raspaduras para uso en interiores.'
        }
    ]
  },
  { 
    id: 5, 
    category: 'Acceso', 
    title: 'Torniquetes', 
    description: 'Control de flujo peatonal para entradas.', 
    image: '/products/torniquetes/fondo.webp',
    subProducts: [
        { 
          name: 'Torniquete Estético Trípode Bidireccional de Acero Inoxidable', 
          image: '/products/torniquetes/Torniquete Estético Trípode Bidireccional de Acero Inoxidable.webp', 
          description: 'Torniquete estético tipo trípode bidireccional en acero inoxidable SUS304, ideal para interior o exterior protegido. Ofrece 3 millones de ciclos, paso libre en emergencias, LEDs indicadores y capacidad de 35 personas por minuto.'
        },
        { 
          name: 'Torniquete Trípode con Diseño Slim Ultra Estético', 
          image: '/products/torniquetes/Torniquete Trípode con Diseño Slim Ultra Estético.webp', 
          description: 'Torniquete trípode slim de uso rudo con diseño ultra estético en acero inoxidable. Ideal para interior o exterior protegido, con apertura automática en emergencias, LEDs indicadores y operación confiable de alto flujo.'
        },
        { 
          name: 'Torniquete De Cortesía Motorizado', 
          image: '/products/torniquetes/Torniquete De Cortesía Motorizado.webp', 
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
    image: '/products/routers/fondo.webp',
    subProducts: [
        { 
          name: 'Router Empresarial / 1 puerto 10/100/1000 Mbps combo 1 puerto SFP (WAN)', 
          image: '/products/routers/Router Empresarial 1 puerto 10-100-1000 Mbps combo 1 puerto SFP (WAN).webp', 
          description: 'Router empresarial Gigabit con balanceo de cargas, VPN avanzada y capacidad para 200 clientes, ideal para redes corporativas.'
        },
        { 
          name: 'Router Huawei NetEngine para Pequeñas y Medianas Empresas', 
          image: '/products/routers/Router Huawei NetEngine para Pequeñas y Medianas Empresas.webp', 
          description: 'Router Huawei NetEngine AR6121E con SD-WAN, seguridad integrada y alta confiabilidad; ideal para empresas que requieren balanceo de cargas, failover y ranuras de servicio flexibles.'
        },
        { 
          name: 'Router eKit VPN Wi-Fi 7 empresarial', 
          image: '/products/routers/Router eKit VPN Wi-Fi 7 empresarial.webp', 
          description: 'Router empresarial Wi-Fi 7 con controladora para 8 APs, puertos 2.5GE y Gigabit, gestión en la nube y operación sin licencias.'
        }
    ]
  },
  { 
    id: 7, 
    category: 'Redes', 
    title: 'Antenas WiFi', 
    description: 'Enlaces inalámbricos de largo alcance.', 
    image: '/products/antenas/fondo.webp',
    subProducts: [
        { 
          name: 'Antena WiFi de Repuesto para Cámaras IP', 
          image: '/products/antenas/Antena WiFi de Repuesto para Cámaras IP.webp', 
          description: 'Antena WiFi de repuesto para cámaras Hikvision, 3 dBi, frecuencia 2.4–2.5 GHz, con conector terminal pin.'
        },
        { 
          name: 'Antena Omnidireccional de doble banda 2.4', 
          image: '/products/antenas/Antena Omnidireccional de doble banda 2.4.webp', 
          description: 'Antena omnidireccional doble banda 2.4/5 GHz, 5 dBi, cobertura 360°, conector RPSMA, diseño compacto y ligera, ideal para mejorar la señal en entornos inalámbricos.'
        },
        { 
          name: 'Antena WiFi Doble Banda SMA, 3 dBi, Magnetica, cable 1.5M', 
          image: '/products/antenas/Antena WiFi Doble Banda SMA, 3 dBi, Magnetica, cable 1.5M.webp', 
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
    image: '/products/ups/fondo.webp',
    subProducts: [
        { 
          name: 'UPS de 1000 VA', 
          image: '/products/ups/UPS de 1000 VA.webp', 
          description: 'UPS de 1000 VA / 600 W con 6 tomas (4 con respaldo), batería de 12V/9Ah, protección contra sobrecarga y descarga, voltaje de entrada 85–150 V y salida estable 102–132 V. Compacta, fiable y con autonomía prolongada para equipos esenciales.'
        },
        { 
          name: 'UPS 1000VA', 
          image: '/products/ups/UPS 1000VA.webp', 
          description: 'UPS de 1000VA/600W con pantalla LCD, 6 tomas (4 con respaldo), regulación de voltaje, protección RJ45 y onda senoidal simulada. Incluye batería 2×12V/7Ah, salida estable 120Vca y monitoreo en tiempo real.'
        },
        { 
          name: 'UPS de 850VA', 
          image: '/products/ups/UPS de 850VA.webp', 
          description: 'UPS de 850VA/510W línea interactiva con regulador AVR, 4 tomas NEMA (3 con respaldo), salida estable a 120Vca y protección contra picos de voltaje. Ideal para equipos de oficina y pequeños negocios.'
        }
    ]
  },
];

// TVC: familias complementarias a Syscom, con una portada exclusiva y 3 modelos por familia.
const tvcProducts: ProductItem[] = [
  {
    id: 101,
    category: 'Acceso',
    title: 'Chapas y Cerraduras',
    description: 'Soluciones eléctricas y magnéticas para asegurar puertas de distintos materiales.',
    image: '/products/tvc/cerraduras/cover.webp',
    subProducts: [
      { name: 'YLI YM-280N LED', image: '/products/tvc/cerraduras/ym280nled.webp', description: 'Cerradura magnética con LED, fuerza de sujeción de 280 kg y alimentación dual de 12/24 VCD.' },
      { name: 'ZKTECO LM120', image: '/products/tvc/cerraduras/lm120.webp', description: 'Cerradura magnética interior de 120 kg tipo Fail Safe para puertas de madera, vidrio o metal.' },
      { name: 'YLI ABK-702B-L', image: '/products/tvc/cerraduras/abk702bl.webp', description: 'Cerradura eléctrica izquierda con apertura mediante botón o llave para controles de acceso.' },
    ],
  },
  {
    id: 102,
    category: 'Acceso',
    title: 'Videoporteros',
    description: 'Comunicación con visitantes, video en tiempo real y apertura remota de puertas.',
    image: '/products/tvc/videoporteros/cover.webp',
    subProducts: [
      { name: 'DAHUA DHI-KTA04', image: '/products/tvc/videoporteros/kta04.webp', description: 'Kit analógico con monitor de 4.3 pulgadas, cámara de 1.3 MP y apertura de puerta.' },
      { name: 'DAHUA DHI-KTW02', image: '/products/tvc/videoporteros/ktw02.webp', description: 'Kit IP WiFi con monitor de 7 pulgadas, frente de calle de 2 MP, PoE y acceso por tarjeta.' },
      { name: 'DAHUA VTO2211G-WP-S2', image: '/products/tvc/videoporteros/vto2211g.webp', description: 'Frente de calle WiFi ultradelgado de 2 MP con tarjeta Mifare, PoE y protección IP65.' },
    ],
  },
  {
    id: 103,
    category: 'Perimetral',
    title: 'Cercas Eléctricas',
    description: 'Energizadores y accesorios Yonusa para protección de perímetros residenciales e industriales.',
    image: '/products/tvc/cercas/cover.webp',
    subProducts: [
      { name: 'YONUSA Energizador HS', image: '/products/tvc/cercas/energizador-hs.webp', description: 'Energizador de nueva generación para hasta 500 metros lineales e incluye control remoto.' },
      { name: 'YONUSA EY10000127AF', image: '/products/tvc/cercas/ey10000127af.webp', description: 'Energizador de alta frecuencia de 10,000 V con gran cobertura e interfaz para zonas cableadas.' },
      { name: 'YONUSA EYM12000127/NG', image: '/products/tvc/cercas/eym12000127ng.webp', description: 'Energizador modular de hasta 12,500 V, compatible con módulo WiFi y alimentación 110/220 VCA.' },
    ],
  },
  {
    id: 104,
    category: 'Incendio',
    title: 'Detección de Incendio',
    description: 'Detectores de humo, calor y monóxido de carbono para alertamiento temprano.',
    image: '/products/tvc/incendio/cover.webp',
    subProducts: [
      { name: 'AJAX FireProtect 2 RB', image: '/products/tvc/incendio/fireprotect2.webp', description: 'Detector inalámbrico con sensores de humo y temperatura para espacios residenciales o comerciales.' },
      { name: 'AJAX FireProtect 2 RB CO', image: '/products/tvc/incendio/fireprotect2-co.webp', description: 'Detector inalámbrico de humo, calor y monóxido de carbono con alarma integrada.' },
      { name: 'KIDDE KI-OSD', image: '/products/tvc/incendio/ki-osd.webp', description: 'Detector óptico multicriterio inteligente para sistemas direccionables de detección de incendio.' },
    ],
  },
  {
    id: 105,
    category: 'Audio',
    title: 'Audio Profesional',
    description: 'Altavoces amplificados y kits de voceo para comercios, eventos e instalaciones.',
    image: '/products/tvc/audio/cover.webp',
    subProducts: [
      { name: 'Electro-Voice EVOLVE 50M', image: '/products/tvc/audio/evolve50m.webp', description: 'Sistema portátil de columna con mezclador de 8 canales, Bluetooth y subwoofer de 12 pulgadas.' },
      { name: 'BOSCH KIT U60-4UC15-B', image: '/products/tvc/audio/kit-u60.webp', description: 'Kit de audio con amplificador mezclador de 60 W y cuatro bocinas negras de 15 W.' },
      { name: 'BOSCH KIT U240-8UC30-W', image: '/products/tvc/audio/kit-u240.webp', description: 'Sistema de voceo de 240 W con ocho bocinas blancas de 30 W para áreas amplias.' },
    ],
  },
  {
    id: 106,
    category: 'Comunicación',
    title: 'Intercomunicadores',
    description: 'Comunicación de dos vías para asistencia, edificios y unidades móviles.',
    image: '/products/tvc/intercom/cover.webp',
    subProducts: [
      { name: 'DAHUA VTA2502G', image: '/products/tvc/intercom/vta2502g.webp', description: 'Intercomunicador de emergencia de 4 MP con llamada de un toque, protocolo SIP e IP65/IK10.' },
      { name: 'COMMAX CCU-216AGF', image: '/products/tvc/intercom/ccu216agf.webp', description: 'Distribuidor de audio para conectar hasta 16 intercomunicadores departamentales por dos hilos.' },
      { name: 'DAHUA M869', image: '/products/tvc/intercom/m869.webp', description: 'Intercomunicador portátil de dos vías para DVR y NVR móvil con conector de aviación.' },
    ],
  },
  {
    id: 107,
    category: 'Visualización',
    title: 'Monitores Profesionales',
    description: 'Pantallas diseñadas para operación continua en centros de monitoreo y seguridad.',
    image: '/products/tvc/monitores/cover.webp',
    subProducts: [
      { name: 'ZKTECO ZD43-4K', image: '/products/tvc/monitores/zd43-4k.webp', description: 'Monitor profesional UHD de 43 pulgadas con HDMI, VGA, altavoces y operación 24/7.' },
      { name: 'ZKTECO ZD32-2K', image: '/products/tvc/monitores/zd32-2k.webp', description: 'Pantalla profesional Full HD de 32 pulgadas con altavoz y detección automática de señal.' },
      { name: 'DAHUA LM19-L200N', image: '/products/tvc/monitores/lm19-l200n.webp', description: 'Monitor LED de 19 pulgadas para videovigilancia continua, con entradas HDMI y VGA.' },
    ],
  },
  {
    id: 108,
    category: 'Automatización',
    title: 'Hogar Inteligente',
    description: 'Control de iluminación y energía desde aplicaciones móviles y asistentes digitales.',
    image: '/products/tvc/smart-home/cover.webp',
    subProducts: [
      { name: 'AJAX Socket Type B', image: '/products/tvc/smart-home/ajax-socket.webp', description: 'Enchufe inalámbrico inteligente con medición de consumo y control desde la aplicación AJAX.' },
      { name: 'DAHUA DHI-ICS2-W2', image: '/products/tvc/smart-home/ics2-w2.webp', description: 'Enchufe inteligente con programación, protección eléctrica y administración desde DMSS.' },
      { name: 'TP-LINK Tapo L535E', image: '/products/tvc/smart-home/tapo-l535e.webp', description: 'Foco LED RGB WiFi multicolor compatible con automatizaciones y control por voz.' },
    ],
  },
];

// Tecnosinergia: 8 familias distintas, cada una con portada exclusiva y 3 modelos.
const tecnosinergiaProducts: ProductItem[] = [
  {
    id: 201,
    category: 'Transporte',
    title: 'Rastreo GPS Vehicular',
    description: 'Localización 4G para vehículos, activos y paquetes desde plataforma web o app.',
    image: '/products/tecnosinergia/gps/cover.webp',
    subProducts: [
      { name: 'NAVITX NAV21B', image: '/products/tecnosinergia/gps/nav21b.webp', description: 'Rastreador vehicular 4G con Bluetooth, batería de respaldo y opción de corte de combustible.' },
      { name: 'NAVITX NAV27', image: '/products/tecnosinergia/gps/nav27.webp', description: 'Rastreador portátil 4G con autonomía de hasta 30 días, ideal para activos y paquetería.' },
      { name: 'NAVITX NAV24', image: '/products/tecnosinergia/gps/nav24.webp', description: 'Localizador magnético IP67 con batería de hasta 120 días y monitoreo desde web o app.' },
    ],
  },
  {
    id: 202,
    category: 'Transporte',
    title: 'Video Móvil Vehicular',
    description: 'Cámaras y analítica para flotillas, transporte público y soluciones policiales.',
    image: '/products/tecnosinergia/video-movil/cover.webp',
    subProducts: [
      { name: 'STREAMAX MC38', image: '/products/tecnosinergia/video-movil/mc38.webp', description: 'Cámara AHD de 2 MP para montaje en placa vehicular, visión IR e índice de protección IP69K.' },
      { name: 'STREAMAX MCA46', image: '/products/tecnosinergia/video-movil/mca46.webp', description: 'Cámara AHD BSD de 2 MP y lente de 1.8 mm para detección lateral en vehículos.' },
      { name: 'STREAMAX MD50C27-ALPR', image: '/products/tecnosinergia/video-movil/md50c27.webp', description: 'Cámara IP móvil de 5 MP para lectura de placas, con lente de 16 mm e IR de 30 m.' },
    ],
  },
  {
    id: 203,
    category: 'Almacenamiento',
    title: 'Discos Duros',
    description: 'Unidades WD Purple optimizadas para grabación continua en sistemas de seguridad.',
    image: '/products/tecnosinergia/discos/cover.webp',
    subProducts: [
      { name: 'WD Purple WD11PURZ 1 TB', image: '/products/tecnosinergia/discos/wd11purz.webp', description: 'Disco SATA de 1 TB optimizado para videovigilancia y compatible con DVR y NVR.' },
      { name: 'WD Purple WD23PURZ 2 TB', image: '/products/tecnosinergia/discos/wd23purz.webp', description: 'Unidad de 2 TB para operación continua y almacenamiento confiable de grabaciones.' },
      { name: 'WD Purple WD34PURZ 3 TB', image: '/products/tecnosinergia/discos/wd34purz.webp', description: 'Disco CMR de 3 TB con tecnología AllFrame, caché de 256 MB y carga de trabajo elevada.' },
    ],
  },
  {
    id: 204,
    category: 'Acceso',
    title: 'Barreras Vehiculares',
    description: 'Control automatizado de estacionamientos, accesos privados y entradas industriales.',
    image: '/products/tecnosinergia/barreras/cover.webp',
    subProducts: [
      { name: 'ZKTECO CMP300L', image: '/products/tecnosinergia/barreras/cmp300l.webp', description: 'Barrera izquierda de 110 VCA, brazo telescópico y ciclo de apertura o cierre de 3 segundos.' },
      { name: 'ZKTECO CMP300R', image: '/products/tecnosinergia/barreras/cmp300r.webp', description: 'Barrera derecha compatible con paneles de acceso, antenas vehiculares y cámaras LPR.' },
      { name: 'ZKTECO BGM1145R-90', image: '/products/tecnosinergia/barreras/bgm1145r.webp', description: 'Barrera articulada derecha de 90 grados con iluminación y apertura mediante aplicación.' },
    ],
  },
  {
    id: 205,
    category: 'Acceso',
    title: 'Botones de Salida',
    description: 'Apertura sin contacto para puertas, controles de acceso y zonas de alto tránsito.',
    image: '/products/tecnosinergia/botones/cover.webp',
    subProducts: [
      { name: 'AXCEZE AX-B100', image: '/products/tecnosinergia/botones/ax-b100.webp', description: 'Botón vertical sin contacto con LED, distancia de detección y retardo ajustables.' },
      { name: 'AXCEZE AX-B160', image: '/products/tecnosinergia/botones/ax-b160.webp', description: 'Botón de salida blanco sin contacto con configuración de distancia y tiempo de respuesta.' },
      { name: 'AXCEZE AX-B200', image: '/products/tecnosinergia/botones/ax-b200.webp', description: 'Botón metálico sin contacto para exterior con IP68, relevador y LED indicador.' },
    ],
  },
  {
    id: 206,
    category: 'Infraestructura',
    title: 'Accesorios para Rack',
    description: 'Organización, conexión y protección de equipos instalados en gabinetes de 19 pulgadas.',
    image: '/products/tecnosinergia/rack/cover.webp',
    subProducts: [
      { name: 'ENSON ENS-PA24P6', image: '/products/tecnosinergia/rack/ens-pa24p6.webp', description: 'Patch panel Cat6 de 24 puertos, precargado y listo para montaje en rack de 19 pulgadas.' },
      { name: 'ENSON ENS-GRND1', image: '/products/tecnosinergia/rack/ens-grnd1.webp', description: 'Barra de tierra física con aisladores para proteger equipos instalados en racks y gabinetes.' },
      { name: 'BELDEN 9512-1901', image: '/products/tecnosinergia/rack/belden-9512.webp', description: 'Organizador horizontal negro de una unidad de rack con tapa para administración de cableado.' },
    ],
  },
  {
    id: 207,
    category: 'Incendio',
    title: 'Sensores de Humo y Calor',
    description: 'Detección autónoma, inalámbrica y direccionable para distintos tipos de instalación.',
    image: '/products/tecnosinergia/incendio/cover.webp',
    subProducts: [
      { name: 'PAAMON PAM-SMK20', image: '/products/tecnosinergia/incendio/pam-smk20.webp', description: 'Detector autónomo de humo con sirena integrada, instalación sencilla y cobertura de 25 m².' },
      { name: 'DUOSMART CSMD1', image: '/products/tecnosinergia/incendio/csmd1.webp', description: 'Detector inalámbrico de humo a 433.92 MHz compatible con paneles DuoSmart serie C.' },
      { name: 'RESIDEO 1046858', image: '/products/tecnosinergia/incendio/resideo-1046858.webp', description: 'Detector autónomo por ionización con sirena de 85 dB y batería integrada de diez años.' },
    ],
  },
  {
    id: 208,
    category: 'Automatización',
    title: 'Apagadores Inteligentes',
    description: 'Automatización WiFi y Matter para iluminación, escenas y control por voz.',
    image: '/products/tecnosinergia/smart-home/cover.webp',
    subProducts: [
      { name: 'SONOFF T6-1C-120M', image: '/products/tecnosinergia/smart-home/t6-1c.webp', description: 'Apagador touch WiFi de un canal con Matter y compatibilidad con asistentes de voz.' },
      { name: 'SONOFF T6-2C-120M', image: '/products/tecnosinergia/smart-home/t6-2c.webp', description: 'Apagador inteligente de dos canales para controlar iluminación desde app o voz.' },
      { name: 'SONOFF T6-3C-120M', image: '/products/tecnosinergia/smart-home/t6-3c.webp', description: 'Apagador de tres canales con WiFi, Matter, temporizadores y automatizaciones domésticas.' },
    ],
  },
];

const productsByProvider: Record<ProductProvider, ProductItem[]> = {
  syscom: syscomProducts,
  tvc: tvcProducts,
  tecnosinergia: tecnosinergiaProducts,
};

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
      <div className="relative overflow-hidden aspect-[4/3] bg-white">
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
          onError={(e) => { e.currentTarget.src = "/logo.png"; }}
          className={`w-full h-full object-contain p-3 transform group-hover:scale-105 transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm scale-105'}`}
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
  const [activeProvider, setActiveProvider] = useState<ProductProvider>('syscom');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const activeCatalog = providers.find((provider) => provider.id === activeProvider) ?? providers[0];
  const providerProducts = productsByProvider[activeProvider];
  const categories = ['Todos', ...Array.from(new Set(providerProducts.map((product) => product.category)))];
  const filteredProducts = activeCategory === 'Todos'
    ? providerProducts
    : providerProducts.filter((product) => product.category === activeCategory);

  const handleProviderChange = (provider: ProductProvider) => {
    setActiveProvider(provider);
    setActiveCategory('Todos');
    setSelectedProduct(null);
  };

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

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    setCurrentIndex(0);
    setShowMobileDetail(false);
    setCopied(false);
  }, []);

  // NAVEGACIÓN CORREGIDA POR ÍNDICES
  const handleNextVariant = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProduct) return;

    // Total = 1 (General) + Cantidad de Variantes
    const totalItems = 1 + (selectedProduct.subProducts?.length || 0);
    
    // Si no hay variantes, no hacemos nada
    if (totalItems <= 1) return;

    setSlideDirection('right');
    // Ciclo infinito: (actual + 1) % total
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [selectedProduct]);

  const handlePrevVariant = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedProduct) return;

    const totalItems = 1 + (selectedProduct.subProducts?.length || 0);
    
    if (totalItems <= 1) return;

    setSlideDirection('left');
    // Ciclo infinito hacia atrás
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [selectedProduct]);

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
  }, [selectedProduct, showArrows, handleNextVariant, handlePrevVariant, closeModal]);

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
        <img src="/hero/monitor.webp" alt="" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-900/60 to-slate-900/95"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-12">
            <span className="text-accent font-bold tracking-widest uppercase text-xs mb-3">Nuestro Catálogo</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Productos Destacados</h2>
            <p className="text-slate-200 max-w-2xl mx-auto text-lg font-light drop-shadow-md">
                Selecciona una empresa y una familia para consultar sus modelos más destacados.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8" role="tablist" aria-label="Distribuidor">
            {providers.map((provider) => {
              const isActive = activeProvider === provider.id;

              return (
                <button
                  key={provider.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleProviderChange(provider.id)}
                  className={`relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 backdrop-blur-md ${isActive ? 'bg-accent/20 border-accent shadow-lg shadow-cyan-500/20 -translate-y-1' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'}`}
                >
                  <span className={`block text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-slate-200'}`}>{provider.name}</span>
                  <span className="block text-xs text-slate-400 mt-1 leading-relaxed">{provider.subtitle}</span>
                  <span className={`absolute bottom-0 left-0 h-1 bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </button>
              );
            })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12" aria-label={`Familias de productos de ${activeCatalog.name}`}>
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
            <ProductCard key={`${activeProvider}-${product.id}`} product={product} onClick={openModal} />
          ))}
        </div>

        {/* Enlaces visibles a los tres catálogos oficiales */}
        <div id="enlace-catalogo" className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group scroll-mt-32">
            <div className="absolute inset-0 bg-slate-800"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 p-8 md:p-12 lg:p-14">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-2 border border-accent/20">
                      <Globe size={14} /><span>Catálogos en Línea</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight mt-3">Consulte la gama completa de cada empresa</h3>
                  <p className="text-slate-300 text-base md:text-lg max-w-3xl mx-auto mt-3">
                      Abra el catálogo oficial de Syscom, TVC o Tecnosinergia para revisar más modelos y especificaciones. Después, cotice con JLBS Servicios.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {providers.map((provider) => (
                    <a
                      key={`catalog-${provider.id}`}
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/link flex items-center justify-between gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:border-accent hover:bg-white/10 ${activeProvider === provider.id ? 'bg-accent/15 border-accent/60' : 'bg-white/5 border-white/10'}`}
                    >
                      <div className="min-w-0">
                        <span className="block text-xl font-bold text-white">{provider.name}</span>
                        <span className="block text-xs text-slate-400 mt-1">{provider.domain}</span>
                      </div>
                      <span className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 shadow-lg group-hover/link:bg-cyan-500">
                        <ExternalLink className="w-5 h-5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </span>
                    </a>
                  ))}
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
                                onError={(e) => { e.currentTarget.src = "/logo.png"; }}
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
                             <img src={selectedProduct.image} alt="Principal" className="w-full h-full object-contain bg-white p-1" />
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
                                <img src={sub.image} alt={sub.name} className="w-full h-full object-contain bg-white p-1" />
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
                    
                    <div className="mt-4 p-4 bg-slate-800/80 border border-white/10 rounded-xl flex gap-3 relative overflow-hidden group/catalogo">
                         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover/catalogo:opacity-100 transition-opacity"></div>
                        <Globe className="w-5 h-5 text-accent flex-shrink-0 mt-0.5 relative z-10" />
                        <div className="text-sm relative z-10">
                            <p className="text-white font-bold mb-1">Catálogo {activeCatalog.name}</p>
                            <p className="text-slate-400 leading-snug mb-2">
                                ¿Buscas un modelo específico? Encuéntralo en el sitio oficial y cotízalo con nosotros.
                            </p>
                            <a 
                                href={activeCatalog.url}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-accent hover:text-white font-bold transition-colors text-xs uppercase tracking-wide"
                            >
                                Ir a {activeCatalog.domain} <ExternalLink size={12} />
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
                        href={`https://wa.me/527222200018?text=${encodeURIComponent(`Hola JLBS Servicios, me interesa el producto ${previewData.title} del catálogo ${activeCatalog.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick('product_catalog_desktop')}
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
                            href={`https://wa.me/527222200018?text=${encodeURIComponent(`Hola JLBS Servicios, me interesa el producto ${previewData.title} del catálogo ${activeCatalog.name}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('product_catalog_mobile')}
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
