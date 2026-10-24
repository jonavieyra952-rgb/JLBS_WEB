import React, { useState } from 'react';
import {
  BellRing,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock3,
  HardDrive,
  MapPin,
  MessageCircle,
  MoonStar,
  Phone,
  ShieldCheck,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { Contact } from '../components/Contact';
import { CookieConsent } from '../components/CookieConsent';
import { QuoteModal } from '../components/QuoteModal';
import { WhatsAppBtn } from '../components/WhatsAppBtn';
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics';

const whatsappUrl =
  'https://wa.me/527222200018?text=Hola%20JLBS%20Servicios,%20quiero%20una%20cotizaci%C3%B3n%20de%20c%C3%A1maras%20de%20seguridad.';

const benefits = [
  {
    icon: Smartphone,
    title: 'Monitoreo desde tu celular',
    description: 'Consulta las cámaras compatibles desde cualquier lugar mediante su aplicación móvil.',
  },
  {
    icon: BellRing,
    title: 'Alertas de movimiento',
    description: 'Recibe notificaciones cuando el sistema compatible detecte actividad en las zonas vigiladas.',
  },
  {
    icon: MoonStar,
    title: 'Vigilancia nocturna',
    description: 'Mantén visibilidad durante la noche con equipos seleccionados para las condiciones del inmueble.',
  },
  {
    icon: HardDrive,
    title: 'Opciones de grabación',
    description: 'Elige almacenamiento local, microSD, DVR, NVR o nube según el equipo y tus necesidades.',
  },
  {
    icon: ShieldCheck,
    title: 'Instalación profesional',
    description: 'Planeamos ubicación, cableado, configuración y ángulos para reducir puntos ciegos.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento y soporte',
    description: 'Realizamos diagnóstico, limpieza, ajustes y correcciones para sistemas existentes.',
  },
];

const faqs = [
  {
    question: '¿Cuántas cámaras necesita un inmueble?',
    answer:
      'Depende de los accesos, dimensiones, iluminación y áreas que quieras vigilar. Podemos recomendar una distribución después de conocer el inmueble y tus prioridades.',
  },
  {
    question: '¿Puedo revisar las cámaras desde mi celular?',
    answer:
      'Sí, cuando el modelo y la conexión lo permiten. Durante la instalación configuramos la aplicación compatible y explicamos su uso básico.',
  },
  {
    question: '¿Es obligatorio pagar almacenamiento en la nube?',
    answer:
      'No en todos los equipos. Existen opciones con microSD, DVR o NVR. La alternativa adecuada depende del tiempo de grabación y del nivel de respaldo que necesites.',
  },
  {
    question: '¿También dan mantenimiento a cámaras ya instaladas?',
    answer:
      'Sí. Podemos revisar fallas de imagen, conexión, grabación, alimentación, cableado y configuración. El alcance se confirma después del diagnóstico.',
  },
  {
    question: '¿En qué zonas trabajan?',
    answer:
      'Brindamos atención en distintas zonas metropolitanas y municipios cercanos. Compártenos tu ubicación y confirmaremos cobertura y tiempos al solicitar la cotización.',
  },
];

export const CameraLandingPage: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-white">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-3" aria-label="Ir al inicio de JLBS Servicios">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg">
              <img src="/logo.png" alt="JLBS Servicios" className="h-full w-full object-contain" />
            </span>
            <span className="leading-tight">
              <strong className="block text-lg text-white">JLBS Servicios</strong>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Seguridad y videovigilancia</span>
            </span>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:+527222200018"
              onClick={() => trackPhoneClick('camera_landing_header')}
              className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 sm:flex"
            >
              <Phone size={17} /> 722 220 0018
            </a>
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-cyan-500"
            >
              Cotizar
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-slate-950 pb-20 pt-36 text-white sm:pt-40 lg:pb-28 lg:pt-48">
          <div className="absolute inset-0 opacity-30">
            <img
              src="/hero/camara.webp"
              alt=""
              className="h-full w-full object-cover"
              aria-hidden="true"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-900/60" />
          <div className="container relative mx-auto grid items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                <ShieldCheck size={16} /> Videovigilancia profesional
              </span>
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Cámaras de seguridad para{' '}
                <span className="text-cyan-400">hogares, negocios y empresas</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Venta, instalación y mantenimiento de sistemas de videovigilancia. Protege accesos,
                patios y áreas importantes, y monitorea equipos compatibles desde tu celular.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('camera_landing_hero')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                >
                  <MessageCircle size={21} /> Cotizar por WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/15"
                >
                  Solicitar cotización <ChevronRight size={20} />
                </button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <span className="flex items-center gap-2"><CheckCircle2 size={17} className="text-cyan-400" /> Atención personalizada</span>
                <span className="flex items-center gap-2"><MapPin size={17} className="text-cyan-400" /> Cobertura metropolitana</span>
                <span className="flex items-center gap-2"><Clock3 size={17} className="text-cyan-400" /> Cotización sin compromiso</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-6 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <img
                  src="/hero/camara.webp"
                  alt="Cámara de seguridad disponible con JLBS Servicios"
                  className="aspect-square w-full rounded-3xl object-cover"
                  width="900"
                  height="900"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Solución completa</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Más que colocar una cámara</h2>
              <p className="mt-4 leading-relaxed text-slate-300">
                Te ayudamos a elegir el equipo, ubicarlo correctamente y dejarlo configurado para un uso sencillo.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-20 text-white sm:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
                  <Camera size={19} /> Servicios disponibles
                </span>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Una solución según tu espacio</h2>
                <p className="mt-5 leading-relaxed text-slate-300">
                  Podemos trabajar con cámaras Wi-Fi, sistemas cableados, grabadores y accesorios de distintas marcas.
                  La propuesta se prepara según la cobertura, conectividad y tiempo de grabación que necesites.
                </p>
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-4 font-bold transition hover:bg-cyan-500"
                >
                  Cuéntanos qué necesitas <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Venta de equipos', 'Seleccionamos cámaras y accesorios compatibles con tus necesidades.'],
                  ['Instalación', 'Revisamos ubicación, montaje, cableado y configuración del sistema.'],
                  ['Mantenimiento', 'Diagnosticamos fallas y damos servicio preventivo o correctivo.'],
                ].map(([title, description], index) => (
                  <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <span className="text-4xl font-black text-cyan-400/30">0{index + 1}</span>
                    <h3 className="mt-5 font-bold">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 text-white sm:py-24">
          <div className="container mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Cobertura de servicio</p>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Atención en zonas metropolitanas</h2>
              <p className="mt-5 leading-relaxed text-slate-300">
                Brindamos atención en distintas zonas metropolitanas y municipios cercanos. Compártenos tu ubicación
                y confirmaremos cobertura y disponibilidad antes de programar la visita.
              </p>
              <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 shrink-0 text-cyan-300" size={24} />
                  <div>
                    <h3 className="font-bold text-white">¿Quieres confirmar la cobertura?</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      Envíanos tu ubicación aproximada por WhatsApp y te confirmaremos cobertura antes de programar una visita.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Preguntas frecuentes</p>
              <div className="mt-4 space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg transition hover:border-cyan-400/30 hover:bg-white/10">
                    <summary className="cursor-pointer list-none pr-8 font-bold text-white marker:hidden">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900 py-16 text-white">
          <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 lg:flex-row lg:text-left">
            <div>
              <h2 className="text-3xl font-bold">Protege tus espacios con una solución adecuada</h2>
              <p className="mt-3 text-cyan-50">Solicita información y recibe atención del equipo de JLBS Servicios.</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('camera_landing_final_cta')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 font-bold shadow-lg transition hover:bg-[#20bd5a]"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="rounded-xl bg-slate-950 px-6 py-4 font-bold shadow-lg transition hover:bg-slate-900"
              >
                Formulario de cotización
              </button>
            </div>
          </div>
        </section>
      </main>

      <Contact />
      <WhatsAppBtn
        message="Hola JLBS Servicios, quiero una cotización de cámaras de seguridad."
        source="camera_landing_floating"
      />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultInterest="Cámaras y videovigilancia"
      />
      <CookieConsent />
    </div>
  );
};