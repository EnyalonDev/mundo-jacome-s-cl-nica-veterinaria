
import React, { useState } from 'react';
import { WEB_CONTENT } from '../../constants/content';

const VariablesView: React.FC = () => {
  const [localData, setLocalData] = useState<any>(WEB_CONTENT);
  const [isSaving, setIsSaving] = useState(false);

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

  const saveVariables = async () => {
    setIsSaving(true);
    console.log("Guardando Variables de Sistema e Identidad", localData.system, localData.common);
    await new Promise(r => setTimeout(r, 1000));
    setIsSaving(false);
    alert("Variables de sistema actualizadas.");
  };

  const Input = ({ label, path, area = false, type = "text" }: { label: string, path: string, area?: boolean, type?: string }) => {
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
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Variables & SEO</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Configuración técnica y de identidad de marca</p>
        </div>
        <button 
          onClick={saveVariables}
          disabled={isSaving}
          className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand shadow-xl transition-all"
        >
          {isSaving ? "Guardando..." : "Guardar Variables"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SEO */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-brand-accent pb-4 flex items-center gap-2">
            <span>🌐</span> Optimización SEO
          </h3>
          <div className="space-y-6">
            <Input label="Meta Title" path="system.seo.title" />
            <Input label="Meta Description" path="system.seo.description" area />
            <Input label="Keywords (Comas)" path="system.seo.keywords" area />
            <Input label="Autor" path="system.seo.author" />
            <Input label="URL Imagen OG (Compartir)" path="system.seo.ogImage" />
          </div>
        </div>

        {/* Identidad Común */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-brand-accent pb-4 flex items-center gap-2">
            <span>🆔</span> Identidad de Marca
          </h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <div className="w-24 h-24 bg-white rounded-3xl overflow-hidden border-2 border-white shadow-lg">
                <img src={localData.common.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                 <Input label="URL del Logo" path="common.logo" />
              </div>
            </div>
            <Input label="Nombre de Clínica" path="common.name" />
            <Input label="Tagline / Slogan" path="common.tagline" />
            <Input label="Teléfono Público" path="common.phone" />
            <Input label="Dirección Corta" path="common.address" area />
          </div>
        </div>

        {/* Analítica y Scripts */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-brand-accent pb-4 flex items-center gap-2">
            <span>📊</span> Analítica & Scripts
          </h3>
          <div className="space-y-6">
            <Input label="Google Analytics ID" path="system.analytics.googleAnalyticsId" />
            <Input label="Facebook Pixel ID" path="system.analytics.facebookPixelId" />
            <Input label="Scripts Personalizados (Header/Body)" path="system.analytics.trackingScripts" area />
          </div>
        </div>

        {/* Configuración de Sistema */}
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-brand-accent pb-4 flex items-center gap-2">
            <span>⚙️</span> Configuración Global
          </h3>
          <div className="space-y-6">
            <Input label="WhatsApp para Citas (58...)" path="system.config.whatsappNumber" />
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Modo Mantenimiento</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Oculta el sitio temporalmente</p>
              </div>
              <input type="checkbox" checked={localData.system.config.maintenanceMode} onChange={e => handleUpdate('system.config.maintenanceMode', e.target.checked)} className="w-6 h-6 accent-brand" />
            </div>
            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Habilitar ChatBot</p>
                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Activación de IA Gemini</p>
              </div>
              <input type="checkbox" checked={localData.system.config.enableChatbot} onChange={e => handleUpdate('system.config.enableChatbot', e.target.checked)} className="w-6 h-6 accent-brand" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Redes Sociales</label>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Instagram URL" path="common.instagramUrl" />
                <Input label="Instagram User" path="common.instagramHandle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariablesView;
