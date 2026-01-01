
import React from 'react';
import { WEB_CONTENT } from '../../constants/content';

const GalleryView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Gestión de Galería</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Administra las fotos de tus pacientes y casos de éxito</p>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {WEB_CONTENT.gallery.posts.map((post) => (
            <div key={post.id} className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative group">
              <img src={post.url} className="w-full h-full object-cover" alt="Galería" />
              <div className="absolute inset-0 bg-brand/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button className="bg-white text-brand p-3 rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button className="bg-white text-red-500 p-3 rounded-xl shadow-lg hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
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
  );
};

export default GalleryView;
