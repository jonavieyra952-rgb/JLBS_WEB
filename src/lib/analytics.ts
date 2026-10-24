type ConsentChoice = 'granted' | 'denied';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

const CONSENT_KEY = 'jlbs-analytics-consent';
const SCRIPT_ID = 'jlbs-google-tag';

const tagIds = [
  import.meta.env.VITE_GA_MEASUREMENT_ID,
  import.meta.env.VITE_GOOGLE_ADS_ID,
].filter((value): value is string => Boolean(value && !value.includes('XXXX')));

function ensureDataLayer() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

function setConsentDefaults() {
  ensureDataLayer();
  window.gtag?.('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
}

function loadGoogleTag() {
  if (!tagIds.length || document.getElementById(SCRIPT_ID)) return;

  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagIds[0])}`;
  document.head.appendChild(script);

  window.gtag?.('js', new Date());
  tagIds.forEach((id) => window.gtag?.('config', id));
}

export function initializeAnalytics() {
  if (typeof window === 'undefined') return;
  setConsentDefaults();

  const storedChoice = window.localStorage.getItem(CONSENT_KEY) as ConsentChoice | null;
  if (storedChoice === 'granted') {
    updateAnalyticsConsent('granted');
  }
}

export function getAnalyticsConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  return value === 'granted' || value === 'denied' ? value : null;
}

export function updateAnalyticsConsent(choice: ConsentChoice) {
  ensureDataLayer();
  window.localStorage.setItem(CONSENT_KEY, choice);
  const value = choice === 'granted' ? 'granted' : 'denied';

  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });

  if (choice === 'granted') loadGoogleTag();
}

export function openCookieSettings() {
  window.dispatchEvent(new Event('jlbs:open-cookie-settings'));
}

function sendAdsConversion(sendTo: string | undefined) {
  if (!sendTo || sendTo.includes('XXXX') || getAnalyticsConsent() !== 'granted') return;
  window.gtag?.('event', 'conversion', { send_to: sendTo });
}

export function trackWhatsAppClick(source: string) {
  if (getAnalyticsConsent() !== 'granted') return;
  window.gtag?.('event', 'whatsapp_click', { contact_method: 'WhatsApp', source });
  sendAdsConversion(import.meta.env.VITE_GOOGLE_ADS_WHATSAPP_SEND_TO);
}

export function trackPhoneClick(source: string) {
  if (getAnalyticsConsent() !== 'granted') return;
  window.gtag?.('event', 'phone_click', { contact_method: 'Teléfono', source });
  sendAdsConversion(import.meta.env.VITE_GOOGLE_ADS_PHONE_SEND_TO);
}

export function trackLeadSubmission(requestType: string, interest: string, source: string) {
  if (getAnalyticsConsent() !== 'granted') return;
  window.gtag?.('event', 'generate_lead', {
    method: requestType === 'appointment' ? 'Cita' : 'Formulario de cotización',
    service: interest,
    source,
  });
  sendAdsConversion(import.meta.env.VITE_GOOGLE_ADS_FORM_SEND_TO);
}
