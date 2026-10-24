import React, { useEffect, useState } from 'react';
import { Cookie, ShieldCheck } from 'lucide-react';
import {
  getAnalyticsConsent,
  initializeAnalytics,
  updateAnalyticsConsent,
} from '../lib/analytics';

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(() => getAnalyticsConsent() === null);

  useEffect(() => {
    initializeAnalytics();

    const openSettings = () => setIsOpen(true);
    window.addEventListener('jlbs:open-cookie-settings', openSettings);
    return () => window.removeEventListener('jlbs:open-cookie-settings', openSettings);
  }, []);

  const saveChoice = (choice: 'granted' | 'denied') => {
    updateAnalyticsConsent(choice);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[1400] mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:bottom-5 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4">
          <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 sm:flex">
            <Cookie size={22} />
          </div>
          <div>
            <p className="flex items-center gap-2 font-bold text-slate-900">
              Privacidad y medición <ShieldCheck size={17} className="text-cyan-600" />
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Utilizamos cookies opcionales para conocer el rendimiento del sitio y de nuestras campañas.
              Puedes aceptarlas o continuar sin medición. Consulta el{' '}
              <a href="/aviso-de-privacidad/" className="font-semibold text-cyan-700 underline underline-offset-2">
                aviso de privacidad
              </a>.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => saveChoice('denied')}
            className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Rechazar opcionales
          </button>
          <button
            type="button"
            onClick={() => saveChoice('granted')}
            className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-700"
          >
            Aceptar medición
          </button>
        </div>
      </div>
    </div>
  );
};
