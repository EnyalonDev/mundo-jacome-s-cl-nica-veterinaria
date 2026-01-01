
import React from 'react';
import { WEB_CONTENT } from '../../constants/content';

const VariablesView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Variables & SEO</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Configuración técnica de bajo nivel y motores de búsqueda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-brand-accent pb-4">Optimización (SEO)</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Title</label>
              <input type="text" defaultValue={WEB_CONTENT.system.seo.title} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-brand transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Meta Description</label>
              <textarea defaultValue={WEB_CONTENT.system.seo.description} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-brand transition-all resize-none" rows={3} />
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-8">
          <h3 className="text-sm font-black text-brand uppercase tracking-widest border-b border-brand-accent pb-4">Identidad Visual</h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
                <img src={WEB_CONTENT.common.logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <button className="bg-brand-light text-brand px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-brand-accent">Cambiar Logo</button>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Comercial</label>
              <input type="text" defaultValue={WEB_CONTENT.common.name} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-brand transition-all" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariablesView;
