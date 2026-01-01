
/**
 * ESTRUCTURA DE CONTENIDOS MODULARIZADA - MUNDO JÁCOME'S
 * Cada sección del sitio web tiene su propia constante para facilitar la edición.
 */

// 1. Configuración de Sistema, SEO y Analítica
export const SYSTEM_CONTENT = {
  seo: {
    title: "Mundo Jácome's | Clínica Veterinaria en Táriba, Táchira",
    description: "Centro médico veterinario líder en Táchira. Especialistas en laboratorio clínico, cirugía avanzada y trámites de exportación internacional de mascotas.",
    keywords: "veterinaria tariba, clinica veterinaria tachira, exportacion mascotas venezuela, laboratorio veterinario, cirugia mascotas",
    author: "Mundo Jácome's Digital",
    ogImage: "https://api.nestorovallos.com/media/general/img/2026-01-01/og-image.jpg"
  },
  analytics: {
    googleAnalyticsId: "G-JAC0ME2025",
    facebookPixelId: "PIX-99887766",
    trackingScripts: "<!-- Custom Scripts Here -->"
  },
  config: {
    maintenanceMode: false,
    enableChatbot: true,
    whatsappNumber: "584124506665"
  }
};

// 2. Identidad de Marca y Datos Globales
export const COMMON_CONTENT = {
  name: "Mundo Jácome's",
  tagline: "Clínica Veterinaria",
  logo: "https://api.nestorovallos.com/media/general/img/2026-01-01/images.jpg",
  phone: "0412-4506665",
  address: "Las Vegas de Táriba, Táchira, Venezuela. (Frente a la entrada principal)",
  instagramUrl: "https://www.instagram.com/mundojacomes/",
  instagramHandle: "@mundojacomes"
};

// 3. Navegación (Navbar)
export const NAVBAR_CONTENT = {
  links: [
    { label: 'Servicios', id: 'servicios' },
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Galería', id: 'galeria' },
    { label: 'Opiniones', id: 'testimonios' }
  ],
  cta: "AGENDAR CITA"
};

// 4. Sección Inicio (Hero)
export const HERO_CONTENT = {
  badge: "Atención desde las 8:30 AM",
  title: "Excelencia Médica para el Bienestar de tu Mascota",
  highlight: "Bienestar",
  subtitle: "Somos el centro de referencia en Táriba para diagnósticos precisos, cirugías de alta complejidad y traslados internacionales seguros.",
  ctaPrimary: "Solicitar Cita Ahora",
  ctaSecondary: "Explorar Servicios",
  stats: "Calificación 5.0 basada en más de 250 pacientes felices",
  mainImage: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=800&q=80"
};

// 5. Sección de Servicios - NUMERACIÓN SEGÚN SOLICITUD
export const SERVICES_CONTENT = {
  tag: "Nuestras Especialidades",
  title: "Cuidado Integral y Especializado",
  list: [
    { position: 1, id: 'consulta', title: 'Consulta Médica', description: 'Evaluación exhaustiva por especialistas para garantizar la salud preventiva y curativa de tu mascota.', icon: '🩺' },
    { position: 2, id: 'exportacion', title: 'Exportación Global', description: 'Gestión certificada de trámites INSAI para que tu mascota viaje a cualquier país sin contratiempos.', icon: '✈️', highlight: true },
    { position: 3, id: 'laboratorio', title: 'Laboratorio Clínico', description: 'Equipamiento propio para resultados inmediatos en hematología y química sanguínea.', icon: '🔬' },
    { position: 4, id: 'cirugia', title: 'Cirugía de Avanzada', description: 'Quirófano equipado para procedimientos de tejidos blandos y traumatología especializada.', icon: '✂️' },
    { position: 5, id: 'estetica', title: 'Estética Veterinaria', description: 'Grooming profesional enfocado en la salud dermatológica y el confort de tu peludo.', icon: '🧼' },
    { position: 6, id: 'hospital', title: 'Hospitalización', description: 'Cuidado intensivo y monitoreo constante para pacientes que requieren vigilancia médica.', icon: '🏥' }
  ]
};

// 5.1 Banner de Instalaciones
export const BANNER_CONTENT = {
  title: "Tu Comodidad es Nuestra Prioridad",
  subtitle: "Contamos con instalaciones de primer nivel diseñadas para una visita placentera.",
  description: "Disponemos de estacionamiento privado y garaje gratuito para que tu visita sea sin estrés y totalmente segura.",
  features: ["Estacionamiento Privado", "Garaje Gratuito", "Acceso Seguro"],
  cta: "Cómo llegar"
};

// 6. Sección Nosotros (About)
export const ABOUT_CONTENT = {
  tag: "Trayectoria y Pasión",
  title: "Un legado de amor por los animales en Táchira",
  highlight: "legado de amor",
  experience: {
    value: "15+",
    label: "Años Salvando Vidas"
  },
  images: [
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=400&q=80"
  ],
  paragraphs: [
    "Ubicados estratégicamente en Las Vegas de Táriba, Mundo Jácome's ha evolucionado para convertirse en el hospital veterinario más confiable de la región. Combinamos la calidez humana con tecnología de punta.",
    "Nuestro equipo médico está en constante formación para ofrecer diagnósticos certeros. Desde una consulta de rutina hasta trámites internacionales de viaje, estamos aquí para guiarte en cada paso."
  ],
  features: ["Certificación INSAI", "Resultados el mismo día"]
};

// 7. Galería (Instagram Style)
export const GALLERY_CONTENT = {
  tag: "Momentos Jácome",
  title: "Historias de Recuperación",
  description: "Cada paciente que cruza nuestra puerta se convierte en parte de nuestra familia. Mira nuestra galería de amigos felices.",
  posts: [
    { id: 1, url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', caption: 'Control Mensual' },
    { id: 2, url: 'https://images.unsplash.com/photo-1543466835-00a7907e9ef1?auto=format&fit=crop&w=600&q=80', caption: 'Sesión de Peluquería' },
    { id: 3, url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=600&q=80', caption: 'Gatito en Consulta' },
    { id: 4, url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80', caption: 'Paciencia y Cuidado' },
    { id: 5, url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', caption: 'Mirada Saludable' },
    { id: 6, url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80', caption: 'Post-Operación Exitoso' }
  ]
};

// 8. Opiniones (Testimonials)
export const TESTIMONIALS_CONTENT = {
  tag: "Confianza Comprobada",
  title: "La Voz de Nuestros Clientes",
  rating: "5.0",
  ratingLabel: "Estrellas en Google Maps",
  verificationTag: "Reseñas 100% Reales • Google Business",
  initialReviews: [
    { author: 'Mayerlin Apolinar', text: 'Excelente atención, y ahora que pueden hacer los laboratorios ahí mismo es un alivio!', stars: 5, date: 'Hace 3 semanas' },
    { author: 'Claudia Solano', text: 'Excelente atención y el servicio muy profesional 👌🏻😍...', stars: 5, date: 'Hace 3 semanas' },
    { author: 'Edward Niebles', text: 'Los mejores de la ciudad. Si quieren el bienestar de su mascota es el lugar indicado.', stars: 5, date: 'Hace 3 semanas' },
    { author: 'Adriana Lissette Gonzalez', text: 'La mejor veterinaria ❤️', stars: 5, date: 'Hace 3 semanas' }
  ]
};

// 9. Sección de Contacto y Mapa
export const CONTACT_CONTENT = {
  tag: "Visítanos",
  title: "Estamos en Táriba",
  labels: {
    address: "Dirección",
    phone: "Llamar",
    hours: "Horario"
  },
  hoursDetail: "Recepción de pacientes desde las 8:30 AM",
  hoursDays: "Lunes a Sábado: 8:30 AM - 5:30 PM",
  cta: "Ver en Google Maps",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.535804561845!2d-72.2166!3d7.822557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e666d1374739109%3A0xdbf45d55f3aa1e07!2sMundo%20Jacome's%20%7C%20Cl%C3%ADnica%20Veterinaria!5e0!3m2!1ses!2sve!4v1709241042312!5m2!1ses!2sve",
  googleMapsUrl: "https://www.google.com/maps/place/Mundo+Jacome's+%7C+Cl%C3%ADnica+Veterinaria/@7.8225571,-72.2143455,17z/"
};

// 10. Sistema de Citas (Appointment)
export const APPOINTMENT_CONTENT = {
  title: "Agenda tu Visita",
  steps: ['Servicio', 'Mascota', 'Dueño', 'Fecha', 'Confirmar'],
  demoMode: "Modo Demostración Activo: No se requiere configuración de servidor real.",
  success: {
    title: "Solicitud Envada",
    message: "Tu cita para {petName} ha sido recibida. El equipo de Mundo Jácome's te contactará por WhatsApp para la confirmación final.",
    cta: "Entendido"
  },
  questions: {
    service: "¿Qué servicio buscas?",
    pet: "Datos de la Mascota",
    owner: "Tus Datos de Contacto",
    calendar: "Elige el día",
    hours: "Elige la hora",
    review: "Revisa los detalles"
  },
  formLabels: {
    petName: "Nombre de Mascota",
    petType: "Especie",
    ownerName: "Tu Nombre",
    ownerPhone: "Teléfono (WhatsApp)",
    ownerEmail: "Email"
  },
  placeholders: {
    petName: "Ej: Max",
    ownerPhone: "04124506665",
    ownerEmail: "hola@cliente.com"
  },
  services: [
    { id: 'consulta', name: 'Consulta Médica', description: 'Evaluación general', icon: '🩺' },
    { id: 'peluqueria', name: 'Estética/Baño', description: 'Limpieza e higiene', icon: '🧼' },
    { id: 'vacunacion', name: 'Vacunación', description: 'Refuerzos anuales', icon: '💉' },
    { id: 'laboratorio', name: 'Laboratorio', description: 'Perfiles de sangre', icon: '🔬' },
    { id: 'exportacion', name: 'Exportación', description: 'Trámites INSAI', icon: '✈️' }
  ],
  hours: ['08:30 AM', '09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
  buttons: {
    back: "Atrás",
    next: "Siguiente",
    review: "Resumen",
    edit: "Corregir",
    confirm: "Agendar",
    submitting: "Procesando..."
  }
};

// 11. Footer
export const FOOTER_CONTENT = {
  description: "Centro médico veterinario líder en Táchira con más de 15 años de trayectoria. Comprometidos con el bienestar integral de tus mascotas.",
  sections: {
    company: "Enlaces",
    contact: "Contacto",
    hours: "Horarios"
  },
  copyright: "© 2025 Mundo Jácome's. Todos los derechos reservados.",
  adminLink: "Acceso Administrativo",
  privacyLink: "Política de Privacidad"
};

// 12. ChatBot Inteligente
export const CHATBOT_CONTENT = {
  name: "JácomeHelper",
  role: "IA de Soporte",
  initialMessage: "¡Hola! Soy JácomeHelper 🐾. ¿Tienes dudas sobre trámites de exportación o cuidados de tu mascota?",
  warning: "Consulta siempre a un médico veterinario.",
  placeholders: {
    input: "Dime qué necesitas saber..."
  },
  quickActions: [
    { label: "📅 Agendar", action: "appointment" },
    { label: "📞 Urgencias", action: "call", value: "tel:04124506665" },
    { label: "✈️ Viajes", action: "text", value: "¿Cómo exportar mi perro?" }
  ],
  systemInstruction: "Eres JácomeHelper. Respuestas cortas, amables y profesionales. Tono veterinario experto pero cercano."
};

/**
 * OBJETO PRINCIPAL - Mantiene compatibilidad con los componentes existentes.
 */
export const WEB_CONTENT = {
  system: SYSTEM_CONTENT,
  common: COMMON_CONTENT,
  navbar: NAVBAR_CONTENT,
  hero: HERO_CONTENT,
  services: SERVICES_CONTENT,
  banner: BANNER_CONTENT,
  about: ABOUT_CONTENT,
  gallery: GALLERY_CONTENT,
  testimonials: TESTIMONIALS_CONTENT,
  contactSection: CONTACT_CONTENT,
  appointment: APPOINTMENT_CONTENT,
  footer: FOOTER_CONTENT,
  chatbot: CHATBOT_CONTENT
};
