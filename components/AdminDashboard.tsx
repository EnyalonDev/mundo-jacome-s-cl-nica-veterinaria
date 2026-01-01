
import React, { useState } from 'react';
import { WEB_CONTENT } from '../constants/content';

// Importamos mini-versiones de los componentes para la previsualización
import Hero from './Hero';
import About from './About';
import MapSection from './MapSection';

interface AdminDashboardProps {
  onClose: () => void;
}

type MainTab = 'appointments' | 'content' | 'photoManager' | 'settings';
type ContentSubTab = 'seo' | 'general' | 'hero' | 'about' | 'services' | 'banner' | 'chatbot' | 'contact';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<MainTab>('appointments');
  const [contentTab, setContentTab] = useState<ContentSubTab>('seo');
  const [localContent, setLocalContent] = useState<any>(WEB_CONTENT);

  const handleContentChange = (path: string, value: any) => {
    const keys = path.split('.');
    setLocalContent((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const InputField = ({ label, path, tip, type = "text" }: { label: string, path: string, tip: string, type?: "text" | "textarea" }) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], localContent);

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-xs font-black text-slate-700 uppercase tracking-widest">{label}</label>
          <span className="text-[9px] text-brand font-bold bg-brand-accent/30 px-2 py-0.5 rounded uppercase">{tip}</span>
        </div>
        {type === "text" ? (
          <input 
            type="text" 
            value={value || ''} 
            onChange={(e) => handleContentChange(path, e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-bold outline-none focus:border-brand transition-all shadow-sm" 
          />
        ) : (
          <textarea 
            value={value || ''} 
            rows={3} 
            onChange={(e) => handleContentChange(path, e.target.value)}
            className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-bold outline-none focus:border-brand transition-all resize-none shadow-sm" 
          />
        )}
      </div>
    );
  };

  const ToggleField = ({ label, path, tip }: { label: string, path: string, tip: string }) => {
    const value = path.split('.').reduce((obj, key) => obj?.[key], localContent);
    return (
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div>
          <p className="text-xs font-black text-slate-700 uppercase tracking-widest">{label}</p>
          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{tip}</p>
        </div>
        <button 
          onClick={() => handleContentChange(path, !value)}
          className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${value ? 'bg-brand' : 'bg-slate-300'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${value ? 'translate-x-7' : 'translate-x-1'}`}></div>
        </button>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-brand-accent text-center">
          <h2 className="text-3xl font-black text-brand-dark italic mb-8">Admin Mundo Jácome</h2>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <input type="email" placeholder="Usuario" defaultValue="nestor@nestor.com" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-300 text-slate-900 bg-white outline-none focus:border-brand transition-all font-bold" required />
            <input type="password" placeholder="Contraseña" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-300 text-slate-900 bg-white outline-none focus:border-brand transition-all font-bold" required />
            <button className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black hover:bg-brand transition-all shadow-xl uppercase tracking-widest">Acceder al Sistema</button>
          </form>
          <button onClick={onClose} className="mt-8 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">Volver a la Página Pública</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">MJ</div>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-none">Panel de Control</h1>
            <p className="text-[9px] text-brand font-bold uppercase tracking-[0.2em] mt-1">SISTEMA MUNDO JÁCOME</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={onClose} className="text-slate-400 hover:text-brand font-bold text-xs uppercase tracking-widest transition-colors">Vista Previa Front</button>
          <div className="h-4 w-px bg-slate-200"></div>
          <button onClick={() => setIsLoggedIn(false)} className="text-red-500 font-bold text-xs uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl transition-all hover:bg-red-100">Cerrar Sesión</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-24 lg:w-72 bg-white border-r border-slate-200 p-4 lg:p-6 flex flex-col space-y-2">
          {[
            { id: 'appointments', label: 'Citas', icon: '📅' },
            { id: 'content', label: 'Contenidos', icon: '✍️' },
            { id: 'photoManager', label: 'Galería', icon: '🖼️' },
            { id: 'settings', label: 'Variables', icon: '⚙️' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as MainTab)}
              className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 p-4 lg:px-6 lg:py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-brand text-white shadow-xl shadow-brand/20' : 'text-slate-400 hover:bg-slate-50 hover:text-brand'}`}
            >
              <span className="text-xl lg:text-lg">{item.icon}</span>
              <span className="hidden lg:block">{item.label}</span>
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-slate-50/50">
          
          {activeTab === 'content' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Administrador de Contenidos</h2>
                  <p className="text-slate-500 font-bold mt-2 uppercase tracking-widest text-[10px]">Gestiona cada sección del sitio web</p>
                </div>
                <button 
                  onClick={() => alert('Sincronizado con base de datos')}
                  className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand shadow-xl transition-all"
                >
                  Guardar Cambios
                </button>
              </div>

              <div className="flex space-x-2 bg-white p-2 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar shadow-sm">
                {[
                  { id: 'seo', label: 'SEO & Sistema' },
                  { id: 'general', label: 'General' },
                  { id: 'hero', label: 'Inicio' },
                  { id: 'services', label: 'Servicios' },
                  { id: 'banner', label: 'Instalaciones' },
                  { id: 'about', label: 'Nosotros' },
                  { id: 'contact', label: 'Contacto' },
                  { id: 'chatbot', label: 'ChatBot' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setContentTab(sub.id as ContentSubTab)}
                    className={`px-6 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${contentTab === sub.id ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'text-slate-400 hover:text-brand hover:bg-slate-50'}`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-12 h-fit">
                  {contentTab === 'services' && (
                    <div className="space-y-10">
                      <div className="space-y-4">
                         <InputField label="Etiqueta de Sección" path="services.tag" tip="Tag" />
                         <InputField label="Título Principal" path="services.title" tip="H2" />
                      </div>
                      <div className="pt-8 border-t border-slate-100">
                        <h4 className="text-xs font-black text-brand uppercase mb-6">Tarjetas Individuales</h4>
                        <div className="space-y-6">
                          {localContent.services.list.map((service: any, index: number) => (
                            <div key={index} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                               <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-black text-brand uppercase tracking-widest">ID: {service.id}</span>
                                  <ToggleField label="" path={`services.list.${index}.highlight`} tip="Destacar" />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                 <InputField label="Posición" path={`services.list.${index}.position`} tip="Número Orden" />
                                 <InputField label="Icono" path={`services.list.${index}.icon`} tip="Emoji" />
                               </div>
                               <InputField label="Título" path={`services.list.${index}.title`} tip="Nombre" />
                               <InputField label="Descripción" path={`services.list.${index}.description`} tip="Resumen" type="textarea" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {contentTab === 'seo' && (
                    <div className="space-y-10">
                      <InputField label="Título de la Página" path="system.seo.title" tip="Meta Title" />
                      <InputField label="Meta Descripción" path="system.seo.description" tip="Cuerpo SEO" type="textarea" />
                      <ToggleField label="ChatBot Inteligente" path="system.config.enableChatbot" tip="Activa asistente Gemini" />
                    </div>
                  )}
                  {contentTab === 'general' && (
                    <div className="space-y-6">
                      <InputField label="Nombre de Clínica" path="common.name" tip="Header & Footer" />
                      <InputField label="Teléfono de Contacto" path="common.phone" tip="Formato local" />
                    </div>
                  )}
                  {contentTab === 'hero' && (
                    <div className="space-y-6">
                      <InputField label="Título Principal" path="hero.title" tip="H1" />
                      <InputField label="Párrafo Descriptivo" path="hero.subtitle" tip="Subtítulo" type="textarea" />
                    </div>
                  )}
                </div>

                <div className="space-y-6 sticky top-24">
                  <div className="flex items-center space-x-3 text-slate-400 mb-2 px-2">
                    <span className="text-[10px] font-black uppercase tracking-widest">Previsualización en Vivo</span>
                    <div className="h-px flex-1 bg-slate-200"></div>
                  </div>
                  
                  <div className="bg-white rounded-[3rem] border-4 border-slate-200 shadow-2xl overflow-hidden transform scale-[0.95] origin-top h-[750px] overflow-y-auto no-scrollbar ring-8 ring-slate-100/50">
                    {contentTab === 'hero' && <Hero onOpenAppointment={() => {}} onNavigate={() => {}} />}
                    {contentTab === 'services' && (
                      <div className="py-10 bg-white">
                        <div className="text-center px-4 mb-8">
                           <h2 className="text-brand font-bold text-[10px] uppercase">{localContent.services.tag}</h2>
                           <h3 className="text-2xl font-extrabold text-slate-900">{localContent.services.title}</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 px-6">
                           {[...localContent.services.list].sort((a: any, b: any) => (a.position || 0) - (b.position || 0)).map((s: any, i: number) => (
                             <div key={i} className={`p-6 rounded-3xl border-2 transition-all relative ${s.highlight ? 'bg-brand text-white border-brand' : 'bg-slate-50 border-transparent'}`}>
                                <span className="absolute top-2 right-4 text-xs font-black opacity-20">#{s.position}</span>
                                <span className="text-2xl mb-2 block">{s.icon}</span>
                                <h4 className="font-bold mb-1">{s.title}</h4>
                                <p className="text-[11px] opacity-80">{s.description}</p>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}
                    {contentTab === 'about' && <About />}
                    {contentTab === 'contact' && <MapSection />}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in duration-500">
               <div className="text-6xl mb-6 opacity-30">🗓️</div>
               <h2 className="text-3xl font-black text-slate-900 tracking-tighter italic">Gestión de Citas</h2>
               <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Módulo de sincronización en tiempo real con Firebase</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
