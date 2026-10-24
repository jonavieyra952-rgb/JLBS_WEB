export type LeadFormPayload = {
  requestType: 'quote' | 'appointment';
  name: string;
  company: string;
  email: string;
  phone: string;
  interest: string;
  date: string;
  time: string;
  message: string;
  privacyAccepted: boolean;
  source: string;
};

const FORM_NAME = 'jlbs-leads';

export async function submitLeadForm(payload: LeadFormPayload) {
  const body = new URLSearchParams({
    'form-name': FORM_NAME,
    'bot-field': '',
    tipo_solicitud: payload.requestType === 'appointment' ? 'Agendar cita' : 'Cotización',
    nombre: payload.name,
    empresa: payload.company || 'No indicada',
    correo: payload.email,
    telefono: payload.phone,
    interes: payload.interest,
    fecha: payload.date,
    hora: payload.time,
    mensaje: payload.message || 'Sin comentarios adicionales.',
    privacidad_aceptada: payload.privacyAccepted ? 'Sí' : 'No',
    pagina_origen: payload.source,
    fecha_envio: new Date().toISOString(),
  });

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!response.ok) {
    throw new Error(`No se pudo enviar la solicitud (${response.status}).`);
  }
}
