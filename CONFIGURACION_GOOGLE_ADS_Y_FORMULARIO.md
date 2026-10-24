# Configuración pendiente después de publicar

El código ya contiene el formulario real, los eventos de conversión y el consentimiento de cookies. Después del primer despliegue completa estos pasos.

## 1. Confirmar el formulario en Netlify

1. Ejecuta `npm run build`.
2. Publica la carpeta `dist`.
3. En Netlify abre **Forms** y confirma que aparezca `jlbs-leads`.
4. Envía una prueba desde la web publicada.
5. En **Project configuration > Notifications > Form submission notifications**, agrega el correo `seguridad@jlbservicios.com`.

Los registros se guardarán en Netlify aunque la notificación por correo todavía no esté configurada.

## 2. Crear los identificadores de medición

Copia `.env.example` como `.env.local` y reemplaza los valores de ejemplo:

- `VITE_GA_MEASUREMENT_ID`: identificador de Google Analytics 4 con formato `G-...`.
- `VITE_GOOGLE_ADS_ID`: identificador general de Google Ads con formato `AW-...`.
- `VITE_GOOGLE_ADS_FORM_SEND_TO`: conversión de formulario.
- `VITE_GOOGLE_ADS_PHONE_SEND_TO`: conversión de clic en teléfono.
- `VITE_GOOGLE_ADS_WHATSAPP_SEND_TO`: conversión de clic en WhatsApp.

No publiques el archivo `.env.local` en repositorios. Después de cambiar los identificadores ejecuta nuevamente `npm run build` y publica el nuevo `dist`.

## 3. Eventos preparados

- `generate_lead`: formulario enviado y confirmado.
- `phone_click`: clic en el teléfono.
- `whatsapp_click`: clic en WhatsApp.

El formulario solo registra una conversión cuando el servidor confirma la recepción; no cuando la persona comienza a llenarlo.

## 4. Validación recomendada

1. Acepta las cookies de medición en la web.
2. Usa Tag Assistant para confirmar que la etiqueta cargue.
3. Prueba cada botón una sola vez.
4. Revisa **Tiempo real** en Google Analytics.
5. Confirma que Google Ads reciba las conversiones antes de activar una campaña con presupuesto alto.

## 5. Aviso de privacidad

El sitio incluye un aviso de privacidad integral basado en los datos y finalidades visibles del formulario. Antes de una campaña pública, JLBS debe validarlo con la persona responsable de privacidad o con asesoría jurídica, especialmente si se agregan nuevas finalidades, proveedores o transferencias.
