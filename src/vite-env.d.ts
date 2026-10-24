/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_ADS_ID?: string;
  readonly VITE_GOOGLE_ADS_FORM_SEND_TO?: string;
  readonly VITE_GOOGLE_ADS_PHONE_SEND_TO?: string;
  readonly VITE_GOOGLE_ADS_WHATSAPP_SEND_TO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
