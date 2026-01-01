
import React, { useState } from 'react';
import { WEB_CONTENT } from '../../constants/content';

type SectionKey = 'hero' | 'about' | 'services' | 'banner' | 'contactSection' | 'chatbot';

const ContentView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [localData, setLocalData] = useState<any>(WEB_CONTENT);
  const [isSaving, setIsSaving] = useState(false);

  const sections = [
    { id: 'hero', label: 'Inicio / Hero', icon: '✨' },
    { id: 'services', label: 'Servicios', icon: '🩺' },
    { id: 'banner', label: 'Instalaciones', icon: '🏥' },
    { id: 'about', label: 'Nosotros', icon: '🏆' },
    { id: 'contactSection', label: 'Contacto & Mapa', icon: '📍' },
    { id: 'chatbot', label: 'Asistente IA', icon: '🤖' },
  ];

  const handleUpdate = (path: string, value: any) => {
    const keys = path.split('.');
    setLocalData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const saveSection = async (key: SectionKey) => {
    setIsSaving(true);
    // Lógica para enviar SOLO los datos de la sección 'key'
    const sectionData = localData[key];
    console.log(`Guardando selectivamente sección: ${key}`, sectionData);
    
    // Simulación de delay de API
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    alert(`Sección "${key}" actualizada correctamente en el servidor.`);
  };

  const Input = ({ label, path, area = false }: { label: string, path: string, area?: boolean }) => {
    const val = path.split('.').reduce((o, k) => o?.[k], localData);
    return (
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
        {area ? (
          <textarea 
            value={val || ''} 
            onChange={e => handleUpdate(path, e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-900 font-bold outline-none focus:border-brand transition-all resize-none"
            rows={4}
          />
        ) : (
          <input 
            type="text" 
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Administrador de Contenidos</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Personaliza cada texto e imagen de tu web</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sub-Menú Lateral */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as SectionKey)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
                activeSection === s.id ? 'bg-white text-brand shadow-sm border border-slate-100' : 'text-slate-400 hover:text-brand'
              }`}
            >
              <span className="text-lg">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Formulario de Sección */}
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
                  <span>Guardar {sections.find(s => s.id === activeSection)?.label}</span>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {activeSection === 'hero' && (
                <>
                  <Input label="Título Principal" path="hero.title" />
                  <Input label="Palabra Resaltada" path="hero.highlight" />
                  <Input label="Descripción (Subtítulo)" path="hero.subtitle" area />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Etiqueta Superior" path="hero.badge" />
                    <Input label="Botón Primario" path="hero.ctaPrimary" />
                  </div>
                </>
              )}

              {activeSection === 'about' && (
                <>
                  <Input label="Título de Sección" path="about.title" />
                  <Input label="Etiqueta" path="about.tag" />
                  <Input label="Párrafo Historia" path="about.paragraphs.0" area />
                  <Input label="Párrafo Misión" path="about.paragraphs.1" area />
                </>
              )}

              {activeSection === 'services' && (
                <div className="space-y-10">
                  <Input label="Título de Servicios" path="services.title" />
                  <div className="space-y-6 pt-6">
                    {localData.services.list.map((s: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                        <div className="flex justify-between">
                           <span className="text-[10px] font-black text-brand uppercase">Servicio #{s.position}</span>
                           <span className="text-xs font-bold text-slate-400 italic">{s.id}</span>
                        </div>
                        <Input label="Nombre del Servicio" path={`services.list.${i}.title`} />
                        <Input label="Descripción Corta" path={`services.list.${i}.description`} area />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'banner' && (
                <>
                  <Input label="Título Banner" path="banner.title" />
                  <Input label="Descripción Comodidad" path="banner.description" area />
                </>
              )}

              {activeSection === 'contactSection' && (
                <>
                  <Input label="Título Mapa" path="contactSection.title" />
                  <Input label="Horario Texto" path="contactSection.hoursDays" />
                </>
              )}

              {activeSection === 'chatbot' && (
                <>
                  <Input label="Nombre Asistente IA" path="chatbot.name" />
                  <Input label="Mensaje Inicial" path="chatbot.initialMessage" area />
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
