import React, { useState } from 'react';
import { WEB_CONTENT } from '../../constants/content';

/**
 * Claves permitidas para las secciones del contenido web.
 */
type SectionKey = 'navbar' | 'hero' | 'services' | 'banner' | 'about' | 'testimonials' | 'gallery' | 'contactSection' | 'appointment' | 'footer' | 'chatbot';

/**
 * @component ContentView
 * @description Gestor dinámico de contenidos (CMS Interno). 
 * Permite editar cualquier propiedad del archivo WEB_CONTENT mediante trayectorias de puntos.
 */
const ContentView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [localData, setLocalData] = useState<any>(WEB_CONTENT);
  const [isSaving, setIsSaving] = useState(false);

  // Definición de secciones disponibles en el submenú de administración
  const sections: { id: SectionKey; label: string; icon: string }[] = [
    { id: 'navbar', label: 'Menú / Navegación', icon: '🔗' },
    { id: 'hero', label: 'Inicio / Hero', icon: '✨' },
    { id: 'services', label: 'Servicios', icon: '🩺' },
    { id: 'banner', label: 'Instalaciones', icon: '🏥' },
    { id: 'about', label: 'Nosotros', icon: '🏆' },
    { id: 'testimonials', label: 'Opiniones', icon: '💬' },
    { id: 'contactSection', label: 'Contacto & Mapa', icon: '📍' },
    { id: 'appointment', label: 'Textos de Citas', icon: '📝' },
    { id: 'footer', label: 'Pie de Página', icon: '🔽' },
    { id: 'chatbot', label: 'Asistente IA', icon: '🤖' },
  ];

  /**
   * Actualiza un valor en el estado local usando un path de puntos (ej: "hero.title").
   * Esta lógica permite manejar objetos profundamente anidados sin crear funciones específicas para cada campo.
   */
  const handleUpdate = (path: string, value: any) => {
    const keys = path.split('.');
    setLocalData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev)); // Clonación profunda para evitar mutaciones
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  /**
   * Añade un nuevo elemento a un arreglo de datos (ej: añadir una nueva característica al banner).
   */
  const addItemToArray = (path: string, defaultValue: any) => {
    const keys = path.split('.');
    setLocalData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      current.push(defaultValue);
      return next;
    });
  };

  /**
   * Elimina un elemento de un arreglo de datos por su índice.
   */
  const removeItemFromArray = (path: string, index: number) => {
    const keys = path.split('.');
    setLocalData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < keys.length; i++) {
        current = current[keys[i]];
      }
      current.splice(index, 1);
      return next;
    });
  };

  /**
   * Lógica de Guardado Selectivo: Solo envía la sección activa al servidor.
   */
  const saveSection = async (key: SectionKey) => {
    setIsSaving(true);
    const sectionData = localData[key];
    console.log(`Payload enviado para sincronización de sección: ${key}`, sectionData);
    
    // Simulación de persistencia en base de datos
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
    alert(`Sección "${key}" actualizada correctamente en el sistema.`);
  };

  /**
   * Sub-componente de entrada de datos (Input) reutilizable.
   * Resuelve automáticamente el valor actual basado en el path proporcionado.
   * Fix: Added 'key' property to the interface to prevent TypeScript errors in .map() iterations.
   */
  const Input = ({ label, path, area = false, type = "text" }: { label: string; path: string; area?: boolean; type?: string; key?: React.Key }) => {
    const val = path.split('.').reduce((o, k) => o?.[k], localData);
    return (
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
        {area ? (
          <textarea 
            value={val || ''} 
            onChange={e => handleUpdate(path, e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold outline-none focus:border-brand transition-all resize-none"
            rows={3}
          />
        ) : (
          <input 
            type={type}
            value={val || ''} 
            onChange={e => handleUpdate(path, e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold outline-none focus:border-brand transition-all"
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Administrador de Contenidos</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Personaliza cada texto e imagen de tu web</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navegación lateral de secciones */}
        <nav className="lg:col-span-1 space-y-2 max-h-[70vh] overflow-y-auto no-scrollbar pr-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
                activeSection === s.id ? 'bg-brand text-white shadow-xl shadow-brand/20 border-transparent' : 'text-slate-400 hover:text-brand bg-white border border-slate-100'
              }`}
            >
              <span className="text-lg">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        {/* Formulario de edición dinámico */}
        <div className="lg:col-span-3">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{sections.find(s => s.id === activeSection)?.icon}</span>
                <h3 className="text-xl font-black text-slate-900">{sections.find(s => s.id === activeSection)?.label}</h3>
              </div>
              <button 
                onClick={() => saveSection(activeSection)}
                disabled={isSaving}
                className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand shadow-xl transition-all disabled:opacity-50 active:scale-95 flex items-center space-x-2"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span>Guardar Cambios</span>
                )}
              </button>
            </div>

            {/* Renderizado condicional de campos según la sección activa */}
            <div className="grid grid-cols-1 gap-8">
              {activeSection === 'navbar' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Texto Botón Principal (CTA)" path="navbar.cta" />
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Enlaces del Menú</p>
                    {localData.navbar.links.map((link: any, i: number) => (
                      <div key={i} className="flex gap-4 items-end">
                        <Input label="Etiqueta" path={`navbar.links.${i}.label`} />
                        <Input label="ID Sección" path={`navbar.links.${i}.id`} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'hero' && (
                <>
                  <Input label="Etiqueta Superior (Badge)" path="hero.badge" />
                  <Input label="Título Principal" path="hero.title" />
                  <Input label="Palabra a Resaltar" path="hero.highlight" />
                  <Input label="Descripción / Subtítulo" path="hero.subtitle" area />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Botón Primario" path="hero.ctaPrimary" />
                    <Input label="Botón Secundario" path="hero.ctaSecondary" />
                  </div>
                  <Input label="Texto de Estadísticas / Rating" path="hero.stats" />
                  <Input label="URL Imagen Principal" path="hero.mainImage" />
                </>
              )}

              {activeSection === 'services' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Etiqueta de Sección" path="services.tag" />
                    <Input label="Título de Sección" path="services.title" />
                  </div>
                  <div className="space-y-6 pt-6 border-t border-slate-50">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Lista de Servicios</p>
                    {localData.services.list.map((s: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input label="ID Único" path={`services.list.${i}.id`} />
                          <Input label="Icono (Emoji)" path={`services.list.${i}.icon`} />
                          <Input label="Posición" path={`services.list.${i}.position`} type="number" />
                        </div>
                        <Input label="Título del Servicio" path={`services.list.${i}.title`} />
                        <Input label="Descripción Detallada" path={`services.list.${i}.description`} area />
                        <div className="flex items-center space-x-4">
                          <label className="text-[10px] font-black text-slate-400 uppercase">¿Destacar este servicio?</label>
                          <input type="checkbox" checked={s.highlight || false} onChange={e => handleUpdate(`services.list.${i}.highlight`, e.target.checked)} className="w-5 h-5 accent-brand" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'banner' && (
                <>
                  <Input label="Título del Banner" path="banner.title" />
                  <Input label="Subtítulo / Etiqueta" path="banner.subtitle" />
                  <Input label="Descripción" path="banner.description" area />
                  <Input label="Texto Botón (CTA)" path="banner.cta" />
                  <div className="space-y-4 pt-4">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Características (Features)</p>
                    {localData.banner.features.map((f: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <input value={f} onChange={e => handleUpdate(`banner.features.${i}`, e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold" />
                        <button onClick={() => removeItemFromArray('banner.features', i)} className="text-red-400 hover:text-red-600">×</button>
                      </div>
                    ))}
                    <button onClick={() => addItemToArray('banner.features', 'Nueva característica')} className="text-[10px] font-black text-brand uppercase">+ Añadir Característica</button>
                  </div>
                </>
              )}

              {activeSection === 'about' && (
                <>
                  <Input label="Etiqueta" path="about.tag" />
                  <Input label="Título" path="about.title" />
                  <Input label="Palabra a Resaltar" path="about.highlight" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Valor Experiencia" path="about.experience.value" />
                    <Input label="Etiqueta Experiencia" path="about.experience.label" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Imágenes de Collage (URLs)</p>
                    {localData.about.images.map((img: string, i: number) => (
                      <Input key={i} label={`Imagen ${i+1}`} path={`about.images.${i}`} />
                    ))}
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Párrafos</p>
                    {localData.about.paragraphs.map((p: string, i: number) => (
                      <Input key={i} label={`Párrafo ${i+1}`} path={`about.paragraphs.${i}`} area />
                    ))}
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Características Clave</p>
                    {localData.about.features.map((f: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <input value={f} onChange={e => handleUpdate(`about.features.${i}`, e.target.value)} className="flex-1 px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'testimonials' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Etiqueta" path="testimonials.tag" />
                    <Input label="Título" path="testimonials.title" />
                    <Input label="Rating General" path="testimonials.rating" />
                    <Input label="Etiqueta de Rating" path="testimonials.ratingLabel" />
                  </div>
                  <Input label="Etiqueta de Verificación" path="testimonials.verificationTag" />
                  <div className="space-y-4 pt-4">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Reseñas Destacadas</p>
                    {localData.testimonials.initialReviews.map((r: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input label="Autor" path={`testimonials.initialReviews.${i}.author`} />
                          <Input label="Fecha" path={`testimonials.initialReviews.${i}.date`} />
                        </div>
                        <Input label="Texto" path={`testimonials.initialReviews.${i}.text`} area />
                        <Input label="Estrellas (1-5)" path={`testimonials.initialReviews.${i}.stars`} type="number" />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'contactSection' && (
                <>
                  <Input label="Etiqueta" path="contactSection.tag" />
                  <Input label="Título" path="contactSection.title" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input label="Label Dirección" path="contactSection.labels.address" />
                    <Input label="Label Teléfono" path="contactSection.labels.phone" />
                    <Input label="Label Horario" path="contactSection.labels.hours" />
                  </div>
                  <Input label="Detalle Horario" path="contactSection.hoursDetail" />
                  <Input label="Días Horario" path="contactSection.hoursDays" />
                  <Input label="Texto Botón" path="contactSection.cta" />
                  <Input label="URL Google Maps" path="contactSection.googleMapsUrl" />
                  <Input label="URL Embed de Mapa (Iframe)" path="contactSection.mapEmbedUrl" />
                </>
              )}

              {activeSection === 'appointment' && (
                <>
                  <Input label="Título Principal" path="appointment.title" />
                  <Input label="Mensaje Modo Demo" path="appointment.demoMode" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Título Éxito" path="appointment.success.title" />
                    <Input label="Mensaje Éxito (Usa {petName})" path="appointment.success.message" area />
                    <Input label="Botón Éxito" path="appointment.success.cta" />
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Preguntas del Formulario</p>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Paso Servicio" path="appointment.questions.service" />
                      <Input label="Paso Mascota" path="appointment.questions.pet" />
                      <Input label="Paso Dueño" path="appointment.questions.owner" />
                      <Input label="Paso Calendario" path="appointment.questions.calendar" />
                      <Input label="Paso Horas" path="appointment.questions.hours" />
                      <Input label="Paso Resumen" path="appointment.questions.review" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Labels de Campos</p>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Mascota" path="appointment.formLabels.petName" />
                      <Input label="Especie" path="appointment.formLabels.petType" />
                      <Input label="Nombre Dueño" path="appointment.formLabels.ownerName" />
                      <Input label="Teléfono Dueño" path="appointment.formLabels.ownerPhone" />
                      <Input label="Email Dueño" path="appointment.formLabels.ownerEmail" />
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Botones del Formulario</p>
                    <div className="grid grid-cols-3 gap-4">
                      <Input label="Atrás" path="appointment.buttons.back" />
                      <Input label="Siguiente" path="appointment.buttons.next" />
                      <Input label="Resumen" path="appointment.buttons.review" />
                      <Input label="Editar" path="appointment.buttons.edit" />
                      <Input label="Confirmar" path="appointment.buttons.confirm" />
                      <Input label="Enviando" path="appointment.buttons.submitting" />
                    </div>
                  </div>
                </>
              )}

              {activeSection === 'footer' && (
                <>
                  <Input label="Descripción General" path="footer.description" area />
                  <div className="grid grid-cols-3 gap-4">
                    <Input label="Sección Enlaces" path="footer.sections.company" />
                    <Input label="Sección Contacto" path="footer.sections.contact" />
                    <Input label="Sección Horarios" path="footer.sections.hours" />
                  </div>
                  <Input label="Texto Copyright" path="footer.copyright" />
                  <Input label="Link Administrador" path="footer.adminLink" />
                  <Input label="Créditos / Privacidad" path="footer.privacyLink" />
                </>
              )}

              {activeSection === 'chatbot' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Nombre IA" path="chatbot.name" />
                    <Input label="Rol IA" path="chatbot.role" />
                  </div>
                  <Input label="Mensaje Inicial" path="chatbot.initialMessage" area />
                  <Input label="Advertencia Médica" path="chatbot.warning" />
                  <Input label="Placeholder Input" path="chatbot.placeholders.input" />
                  <Input label="Instrucción de Sistema (Prompt)" path="chatbot.systemInstruction" area />
                  <div className="space-y-4 pt-4">
                    <p className="text-[10px] font-black text-brand uppercase tracking-widest">Acciones Rápidas</p>
                    {localData.chatbot.quickActions.map((qa: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Input label="Label" path={`chatbot.quickActions.${i}.label`} />
                        <Input label="Acción" path={`chatbot.quickActions.${i}.action`} />
                        <Input label="Valor" path={`chatbot.quickActions.${i}.value`} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentView;