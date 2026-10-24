import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  FileText,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import { submitLeadForm } from '../lib/forms';
import { trackLeadSubmission, trackWhatsAppClick } from '../lib/analytics';

// JLBS: versión corregida V5 — sin barras visibles en el modal de cotización.

type RequestType = 'quote' | 'appointment';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
};

type FormData = {
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  date: string;
  time: string;
  message: string;
};

const contactEmail = 'seguridad@jlbservicios.com';

const createInitialFormData = (interest = ''): FormData => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  interest,
  date: '',
  time: '',
  message: '',
});

const fieldClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10';

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultInterest = '',
}) => {
  const [requestType, setRequestType] = useState<RequestType>('quote');
  const [formData, setFormData] = useState<FormData>(() => createInitialFormData(defaultInterest));
  const [copied, setCopied] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submissionError, setSubmissionError] = useState('');
  const now = new Date();
  const minimumDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .split('T')[0];

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('quote-modal-open');
    document.documentElement.classList.add('quote-modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.classList.remove('quote-modal-open');
      document.documentElement.classList.remove('quote-modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copia el correo electrónico:', contactEmail);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState('sending');
    setSubmissionError('');

    try {
      await submitLeadForm({
        requestType,
        ...formData,
        privacyAccepted,
        source: window.location.href,
      });
      trackLeadSubmission(requestType, formData.interest, window.location.pathname);
      setSubmissionState('success');
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'No pudimos enviar tu solicitud. Intenta nuevamente.',
      );
      setSubmissionState('error');
    }
  };

  const resetForm = () => {
    setFormData(createInitialFormData(defaultInterest));
    setPrivacyAccepted(false);
    setRequestType('quote');
    setSubmissionState('idle');
    setSubmissionError('');
  };

  return (
    <>
      <style>{`
        html.quote-modal-open,
        body.quote-modal-open {
          overflow: hidden !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }

        html.quote-modal-open::-webkit-scrollbar,
        body.quote-modal-open::-webkit-scrollbar,
        .quote-modal-scroll::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .quote-modal-scroll {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      `}</style>

      <div
        className="quote-modal-scroll fixed inset-0 z-[1200] flex items-start justify-center overflow-y-auto bg-slate-950/85 p-3 backdrop-blur-md sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
      >
      <div className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-[0.8fr_1.2fr] animate-scale-up">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white transition hover:bg-cyan-600"
          aria-label="Cerrar ventana de cotización"
        >
          <X size={20} />
        </button>

        <aside className="relative flex flex-col justify-between overflow-hidden bg-black p-7 text-white sm:p-10">
          <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="relative">
            <img
              src="/brand/jlbs-servicios-logo.png"
              alt="JLBS Servicios S.A. de C.V."
              className="mx-auto mb-5 aspect-square w-full max-w-[240px] object-contain lg:mx-0"
            />
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
              <ShieldCheck size={15} /> Atención especializada
            </span>
            <h2 id="quote-modal-title" className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
              Cotizaciones y citas
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              Cuéntanos qué necesitas. La solicitud llegará directamente al equipo de JLBS.
            </p>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Correo de atención
            </span>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href={`mailto:${contactEmail}`}
                className="break-all text-sm font-bold text-white transition hover:text-cyan-300"
              >
                {contactEmail}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-slate-300 transition hover:bg-cyan-500 hover:text-white"
                aria-label="Copiar correo electrónico"
                title="Copiar correo"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
            </div>
          </div>
        </aside>

        <section className="p-6 sm:p-9 lg:p-10">
          {submissionState === 'success' ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 size={42} />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Solicitud recibida
              </p>
              <h3 className="mt-2 text-3xl font-bold text-slate-900">Gracias, {formData.name}</h3>
              <p className="mt-4 max-w-md leading-relaxed text-slate-600">
                Recibimos tu solicitud de {requestType === 'appointment' ? 'cita' : 'cotización'}.
                Un asesor de JLBS se comunicará contigo usando los datos que proporcionaste.
              </p>
              <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition hover:bg-slate-800"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Nueva solicitud
                </button>
              </div>
            </div>
          ) : (
          <>
          <div className="pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Elige una opción</p>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">¿Cómo podemos ayudarte?</h3>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-1.5">
            <button
              type="button"
              onClick={() => setRequestType('quote')}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${
                requestType === 'quote'
                  ? 'bg-white text-cyan-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText size={18} /> Cotización
            </button>
            <button
              type="button"
              onClick={() => setRequestType('appointment')}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${
                requestType === 'appointment'
                  ? 'bg-white text-cyan-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CalendarDays size={18} /> Agendar cita
            </button>
          </div>

          <form
            name="jlbs-leads"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            <input type="hidden" name="form-name" value="jlbs-leads" />
            <p className="hidden" aria-hidden="true">
              <label>
                No llenar este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Nombre completo <span className="text-cyan-600">*</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={updateField}
                  className={`${fieldClass} mt-2`}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Empresa
                <input
                  name="company"
                  value={formData.company}
                  onChange={updateField}
                  className={`${fieldClass} mt-2`}
                  placeholder="Opcional"
                  autoComplete="organization"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Correo electrónico <span className="text-cyan-600">*</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  className={`${fieldClass} mt-2`}
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label className="text-sm font-semibold text-slate-700">
                Teléfono <span className="text-cyan-600">*</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={updateField}
                  className={`${fieldClass} mt-2`}
                  placeholder="722 000 0000"
                  autoComplete="tel"
                  required
                />
              </label>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              Servicio o producto de interés <span className="text-cyan-600">*</span>
              <select
                name="interest"
                value={formData.interest}
                onChange={updateField}
                className={`${fieldClass} mt-2`}
                required
              >
                <option value="" disabled>Selecciona una opción</option>
                <option>Seguridad privada y vigilancia</option>
                <option>Cámaras y videovigilancia</option>
                <option>Control de acceso, chapas y biométricos</option>
                <option>GPS y rastreo vehicular</option>
                <option>Redes y telecomunicaciones</option>
                <option>Instalación o mantenimiento</option>
                <option>Cotización de un producto específico</option>
                <option>Otro servicio</option>
              </select>
            </label>

            {requestType === 'appointment' && (
              <div className="grid gap-4 rounded-2xl border border-cyan-100 bg-cyan-50/60 p-4 sm:grid-cols-2">
                <label className="text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-2"><CalendarDays size={16} /> Fecha solicitada</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={updateField}
                    min={minimumDate}
                    className={`${fieldClass} mt-2 bg-white`}
                    required
                  />
                </label>
                <label className="text-sm font-semibold text-slate-700">
                  <span className="flex items-center gap-2"><Clock3 size={16} /> Horario solicitado</span>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={updateField}
                    className={`${fieldClass} mt-2 bg-white`}
                    required
                  />
                </label>
              </div>
            )}

            <label className="block text-sm font-semibold text-slate-700">
              Cuéntanos qué necesitas
              <textarea
                name="message"
                value={formData.message}
                onChange={updateField}
                className={`${fieldClass} mt-2 min-h-24 resize-y`}
                placeholder="Describe el servicio, producto, cantidad o cualquier detalle importante."
              />
            </label>

            <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-700">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(event) => setPrivacyAccepted(event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                required
              />
              <span>
                He leído y acepto el tratamiento de mis datos conforme al{' '}
                <a
                  href="/aviso-de-privacidad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-cyan-700 underline underline-offset-2"
                >
                  aviso de privacidad
                </a>.
              </span>
            </label>

            {submissionState === 'error' && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                <div className="flex items-start gap-2 font-semibold">
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <span>{submissionError}</span>
                </div>
                <a
                  href="https://wa.me/527222200018?text=Hola%20JLBS%20Servicios,%20no%20pude%20enviar%20el%20formulario%20y%20quiero%20solicitar%20una%20cotizaci%C3%B3n."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('quote_form_error')}
                  className="mt-3 inline-flex items-center gap-2 font-bold text-green-700 underline underline-offset-2"
                >
                  <MessageCircle size={17} /> Continuar por WhatsApp
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={submissionState === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-4 font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 disabled:cursor-wait disabled:opacity-70"
            >
              {submissionState === 'sending' ? <Loader2 size={19} className="animate-spin" /> : <Mail size={19} />}
              {submissionState === 'sending'
                ? 'Enviando solicitud...'
                : requestType === 'appointment'
                  ? 'Enviar solicitud de cita'
                  : 'Enviar cotización'}
              {submissionState !== 'sending' && <Send size={17} />}
            </button>
          </form>
          </>
          )}
        </section>
      </div>
      </div>
    </>
  );
};
