import React from 'react';
import { ArrowLeft, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { CookieConsent } from '../components/CookieConsent';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="border-b border-slate-200 py-8 last:border-0">
    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">{children}</div>
  </section>
);

export const PrivacyPage: React.FC = () => (
  <div className="min-h-screen bg-slate-100 font-sans">
    <header className="bg-slate-950 text-white">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1.5">
            <img src="/logo.png" alt="JLBS Servicios" className="h-full w-full object-contain" />
          </span>
          <span className="font-bold">JLBS Servicios</span>
        </a>
        <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white">
          <ArrowLeft size={17} /> Volver al sitio
        </a>
      </div>
    </header>

    <main className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-slate-950 to-slate-800 px-6 py-12 text-white sm:px-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            <ShieldCheck size={16} /> Protección de datos
          </span>
          <h1 className="mt-5 text-3xl font-bold sm:text-4xl">Aviso de privacidad integral</h1>
          <p className="mt-3 text-sm text-slate-300">Última actualización: 7 de agosto de 2026</p>
        </div>

        <div className="px-6 py-4 sm:px-12">
          <Section title="1. Responsable del tratamiento">
            <p>
              <strong>JLBS Servicios S.A. de C.V.</strong>, con domicilio en Gral. Venustiano Carranza #504,
              Int-2, Col. Universidad, C.P. 50130, Toluca, Estado de México, es responsable del uso y
              protección de los datos personales recabados mediante este sitio web.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <a href="mailto:seguridad@jlbservicios.com" className="flex items-center gap-2 font-semibold text-cyan-700"><Mail size={17} /> seguridad@jlbservicios.com</a>
              <a href="tel:+527222200018" className="flex items-center gap-2 font-semibold text-cyan-700"><Phone size={17} /> 722 220 0018</a>
              <span className="flex items-center gap-2 font-semibold text-slate-700"><MapPin size={17} /> Toluca, Estado de México</span>
            </div>
          </Section>

          <Section title="2. Datos personales que recabamos">
            <p>Los formularios pueden solicitar nombre, empresa opcional, correo electrónico, teléfono, servicio de interés, mensaje y, cuando corresponda, fecha y horario solicitados para una cita.</p>
            <p>El sitio también puede procesar datos técnicos como dirección IP, navegador, dispositivo, páginas visitadas y procedencia de la visita cuando la persona acepta las cookies de medición.</p>
            <p>No solicitamos intencionalmente datos personales sensibles mediante los formularios. Te pedimos no incluir información sensible o innecesaria en el campo de mensaje.</p>
          </Section>

          <Section title="3. Finalidades primarias">
            <p>Utilizamos los datos para responder solicitudes de información, elaborar y dar seguimiento a cotizaciones, programar citas, contactar al solicitante, prestar soporte relacionado con los servicios y conservar evidencia de la atención proporcionada.</p>
          </Section>

          <Section title="4. Medición y publicidad">
            <p>Con tu consentimiento podemos usar herramientas de analítica y publicidad para medir visitas, formularios, clics en WhatsApp y llamadas, evaluar campañas y mejorar el sitio. Estas cookies son opcionales y puedes rechazarlas sin impedir el uso del formulario.</p>
            <p>Puedes modificar tu decisión desde la opción “Preferencias de cookies” disponible en el pie del sitio.</p>
          </Section>

          <Section title="5. Encargados, transferencias y conservación">
            <p>Podemos utilizar proveedores de alojamiento web, recepción de formularios, correo, analítica y publicidad que procesan información por cuenta de JLBS y que pueden operar infraestructura fuera de México. No vendemos los datos personales recibidos mediante el sitio.</p>
            <p>También podremos comunicar información cuando exista una obligación legal o una solicitud válida de autoridad competente. Conservaremos los datos únicamente durante el tiempo necesario para atender las finalidades descritas y las obligaciones aplicables.</p>
          </Section>

          <Section title="6. Derechos ARCO y revocación del consentimiento">
            <p>Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos, así como revocar tu consentimiento o limitar su uso, enviando un correo a <a href="mailto:seguridad@jlbservicios.com" className="font-semibold text-cyan-700">seguridad@jlbservicios.com</a> con el asunto “Derechos ARCO”.</p>
            <p>La solicitud debe describir el derecho que deseas ejercer y proporcionar información suficiente para identificar tus datos y comunicarte la respuesta. JLBS podrá solicitar los elementos necesarios para verificar la identidad de la persona titular o de su representante.</p>
          </Section>

          <Section title="7. Cookies y tecnologías similares">
            <p>Las cookies técnicas permiten el funcionamiento básico del sitio. Las cookies opcionales de analítica y publicidad solo se habilitan después de aceptar la medición en el aviso mostrado en pantalla.</p>
            <p>También puedes eliminar o bloquear cookies desde la configuración de tu navegador. Al hacerlo, algunas funciones de medición dejarán de operar.</p>
          </Section>

          <Section title="8. Cambios al aviso">
            <p>Este aviso puede actualizarse por cambios legales, operativos o tecnológicos. La versión vigente se publicará permanentemente en esta dirección e indicará la fecha de su última actualización.</p>
          </Section>
        </div>
      </article>
    </main>
    <CookieConsent />
  </div>
);
