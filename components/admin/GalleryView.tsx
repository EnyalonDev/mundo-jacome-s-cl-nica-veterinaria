
import React, { useState } from 'react';
import { WEB_CONTENT } from '../../constants/content';

const GalleryView: React.FC = () => {
  const [localData, setLocalData] = useState<any>(WEB_CONTENT.gallery);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdate = (path: string, value: any) => {
    setLocalData((prev: any) => ({
      ...prev,
      [path]: value
    }));
  };

  const saveGallery = async () => {
    setIsSaving(true);
    console.log("Guardando Galería", localData);
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
    alert("Configuración de galería guardada.");
  };

  const removePost = (id: number) => {
    setLocalData((prev: any) => ({
      ...prev,
      posts: prev.posts.filter((p: any) => p.id !== id)
    }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Gestión de Galería</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Administra las fotos de tus pacientes y casos de éxito</p>
        </div>
        <button 
          onClick={saveGallery}
          disabled={isSaving}
          className="bg-brand-dark text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand shadow-xl transition-all active:scale-95"
        >
          {isSaving ? "Guardando..." : "Guardar Todo"}
        </button>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Etiqueta</label>
            <input value={localData.tag} onChange={e => handleUpdate('tag', e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-brand" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Título Sección</label>
            <input value={localData.title} onChange={e => handleUpdate('title', e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-brand" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Descripción</label>
            <textarea value={localData.description} onChange={e => handleUpdate('description', e.target.value)} className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 font-bold outline-none focus:border-brand resize-none" rows={2} />
          </div>
        </div>

        <div className="pt-10 border-t border-slate-50">
          <p className="text-[10px] font-black text-brand uppercase tracking-widest mb-6">Fotos en Galería</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {localData.posts.map((post: any) => (
              <div key={post.id} className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative group shadow-sm">
                <img src={post.url} className="w-full h-full object-cover" alt="Galería" />
                <div className="absolute inset-0 bg-brand/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-[10px] text-white font-bold mb-4 line-clamp-2">{post.caption}</p>
                  <div className="flex space-x-2">
                    <button className="bg-white text-brand p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => removePost(post.id)} className="bg-white text-red-500 p-2.5 rounded-xl shadow-lg hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="aspect-square rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 hover:text-brand hover:border-brand transition-all group">
              <span className="text-4xl mb-2 group-hover:scale-125 transition-transform">+</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Subir Foto</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryView;
