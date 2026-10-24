import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import {
  Antenna,
  Bell,
  Building2,
  Cable,
  Camera,
  Cloud,
  Database,
  Fingerprint,
  HardDrive,
  KeyRound,
  Network,
  Phone,
  PhoneCall,
  Radio,
  Router,
  ShieldAlert,
  ShieldCheck,
  Signal,
  SignalHigh,
  Speaker,
  Video,
  Wifi,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  icon: LucideIcon;
}

interface Distributor {
  id: string;
  name: string;
  label: string;
  description: string;
  brands: Brand[];
}

const syscomBrands: Brand[] = [
  { id: 1, name: 'HIKVISION', icon: Camera },
  { id: 2, name: 'EPCOM', icon: Radio },
  { id: 3, name: 'UBIQUITI', icon: Wifi },
  { id: 4, name: 'ZKTECO', icon: Fingerprint },
  { id: 5, name: 'HONEYWELL', icon: ShieldAlert },
  { id: 6, name: 'HILOOK', icon: Video },
  { id: 7, name: 'LINKEDPRO', icon: Cable },
  { id: 8, name: 'PANDUIT', icon: Network },
  { id: 9, name: 'GRANDSTREAM', icon: Phone },
  { id: 10, name: 'FANVIL', icon: PhoneCall },
  { id: 11, name: 'MIKROTIK', icon: Router },
  { id: 12, name: 'CAMBIUM', icon: SignalHigh },
  { id: 13, name: 'DSC', icon: Bell },
  { id: 14, name: 'ROSSLARE', icon: KeyRound },
  { id: 15, name: 'BELDEN', icon: Network },
  { id: 16, name: 'ENSON', icon: Speaker },
  { id: 17, name: 'RUIJIE', icon: Cloud },
  { id: 18, name: 'MIMOSA', icon: Antenna },
  { id: 19, name: 'TOTAL GROUND', icon: Zap },
  { id: 20, name: 'SEAGATE', icon: HardDrive },
  { id: 21, name: 'WESTERN DIGITAL', icon: Database },
  { id: 22, name: 'NETPOINT', icon: Signal },
];

const tvcBrands: Brand[] = [
  { id: 1, name: 'DAHUA', icon: Camera },
  { id: 2, name: 'ZKTECO', icon: Fingerprint },
  { id: 3, name: 'DSC', icon: Bell },
  { id: 4, name: 'VIVOTEK', icon: Video },
  { id: 5, name: 'BOSCH', icon: ShieldAlert },
  { id: 6, name: 'AJAX SYSTEMS', icon: ShieldCheck },
  { id: 7, name: 'UBIQUITI', icon: Wifi },
  { id: 8, name: 'TP-LINK', icon: Router },
  { id: 9, name: 'JOHNSON CONTROLS', icon: Building2 },
  { id: 10, name: 'CDP', icon: Zap },
  { id: 11, name: 'SEAGATE', icon: HardDrive },
  { id: 12, name: 'WESTERN DIGITAL', icon: Database },
];

const tecnosinergiaBrands: Brand[] = [
  { id: 1, name: 'UNV', icon: Camera },
  { id: 2, name: 'UNIARCH', icon: Video },
  { id: 3, name: 'MERIVA', icon: ShieldCheck },
  { id: 4, name: 'AJAX SYSTEMS', icon: Bell },
  { id: 5, name: 'ZKTECO', icon: Fingerprint },
  { id: 6, name: 'RESIDEO', icon: ShieldAlert },
  { id: 7, name: 'TP-LINK', icon: Wifi },
  { id: 8, name: 'GRANDSTREAM', icon: Phone },
  { id: 9, name: 'MIKROTIK', icon: Router },
  { id: 10, name: 'BELDEN', icon: Network },
  { id: 11, name: 'ENSON', icon: Cable },
  { id: 12, name: 'CYBERPOWER', icon: Zap },
];

const distributors: Distributor[] = [
  {
    id: 'syscom',
    name: 'Syscom',
    label: 'Seguridad y telecomunicaciones',
    description:
      'Tecnología profesional para videovigilancia, radiocomunicación, control de acceso, redes e infraestructura.',
    brands: syscomBrands,
  },
  {
    id: 'tvc',
    name: 'TVC',
    label: 'Seguridad electrónica y TI',
    description:
      'Marcas reconocidas en videovigilancia, intrusión, automatización, acceso, energía y almacenamiento.',
    brands: tvcBrands,
  },
  {
    id: 'tecnosinergia',
    name: 'Tecnosinergia',
    label: 'Soluciones integrales de tecnología',
    description:
      'Equipamiento destacado para CCTV, redes, cableado estructurado, alarmas, incendio y control de acceso.',
    brands: tecnosinergiaBrands,
  },
];

interface DistributorCardProps {
  distributor: Distributor;
  index: number;
}

const DistributorCard: React.FC<DistributorCardProps> = ({ distributor, index }) => (
  <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/20 transition-colors duration-300 hover:border-accent/30">
    <div className="grid gap-6 border-b border-white/5 px-5 py-6 md:grid-cols-[minmax(250px,0.8fr)_1.7fr] md:items-center md:px-8 md:py-7">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-sm font-bold text-accent">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 md:text-xs">
            Distribuidor mayorista
          </span>
        </div>

        <h4 className="text-2xl font-bold text-white md:text-3xl">
          Alianza con <span className="text-accent">{distributor.name}</span>
        </h4>
      </div>

      <div className="md:border-l md:border-white/10 md:pl-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent/80">
          {distributor.label}
        </p>
        <p className="max-w-3xl text-sm font-light leading-relaxed text-slate-400 md:text-base">
          {distributor.description}
        </p>
      </div>
    </div>

    <div className="relative bg-slate-950/45 px-2 py-3 md:px-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={1.45}
        loop
        speed={3000 + index * 250}
        allowTouchMove
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          reverseDirection: index === 1,
        }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 14 },
          640: { slidesPerView: 2.6, spaceBetween: 16 },
          768: { slidesPerView: 3.2, spaceBetween: 18 },
          1024: { slidesPerView: 4.3, spaceBetween: 20 },
          1280: { slidesPerView: 5.2, spaceBetween: 22 },
        }}
        className={`brands-swiper brands-swiper-${distributor.id} w-full`}
        aria-label={`Marcas destacadas de ${distributor.name}`}
      >
        {distributor.brands.map((brand) => (
          <SwiperSlide key={`${distributor.id}-${brand.id}`} className="py-3">
            <div className="group flex min-h-16 items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 transition-all duration-300 hover:border-accent/25 hover:bg-white/[0.06]">
              <brand.icon
                aria-hidden="true"
                className="shrink-0 text-slate-500 transition-colors duration-300 group-hover:text-accent"
                size={25}
                strokeWidth={1.6}
              />
              <span className="select-none whitespace-nowrap font-mono text-sm font-bold uppercase tracking-wider text-slate-400 md:text-base">
                {brand.name}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-slate-950/90 to-transparent md:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-slate-950/90 to-transparent md:w-20" />
    </div>
  </article>
);

export const Brands: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-slate-950 py-16 md:py-24">
      <style>{`
        .brands-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .brands-swiper .swiper-wrapper {
            transition-duration: 0ms !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        <header className="mx-auto mb-10 flex max-w-4xl flex-col items-center text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent md:text-xs">
            <ShieldCheck size={14} />
            <span>Garantía, variedad y respaldo</span>
          </div>

          <h3 className="mb-4 text-3xl font-bold leading-tight text-white md:text-5xl">
            Marcas líderes de nuestros{' '}
            <span className="text-accent">aliados estratégicos</span>
          </h3>

          <p className="max-w-3xl text-sm font-light leading-relaxed text-slate-400 md:text-lg">
            Integramos soluciones de fabricantes reconocidos a través de los principales mayoristas de seguridad y tecnología en México.
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          {distributors.map((distributor, index) => (
            <DistributorCard
              key={distributor.id}
              distributor={distributor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};