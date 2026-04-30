// Configuración de WhatsApp con mensajes automáticos por sección
// Cambia el número de teléfono aquí si es necesario

export const WHATSAPP_NUMBER = "573232312333"; // Número de teléfono en formato internacional (sin signos ni espacios)

// Mensajes predefinidos por sección
export const whatsappMessages = {
  hero: "¡Hola! Me interesa conocer más información sobre sus servicios de podología. ¿Podrían ayudarme?",
  services: "Hola, me gustaría saber más detalles sobre los servicios que ofrecen en PodoCare.",
  benefits: "¡Hola! Quiero conocer más sobre los tratamientos y cuidados que realizan en PodoCare.",
  gallery: "Hola, me gustaría conocer más sobre los tratamientos y resultados de PodoCare.",
  contact: "¡Hola! Me gustaría agendar una cita en PodoCare. ¿Cuándo tienen disponibilidad?",
  general: "Hola, quiero más información sobre PodoCare."
} as const;

// Función para generar URL de WhatsApp con mensaje automático
export const generateWhatsAppURL = (section: keyof typeof whatsappMessages): string => {
  const message = whatsappMessages[section];
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

// Función para abrir WhatsApp con mensaje automático
export const openWhatsApp = (section: keyof typeof whatsappMessages): void => {
  const url = generateWhatsAppURL(section);
  window.open(url, '_blank', 'noopener,noreferrer');
};