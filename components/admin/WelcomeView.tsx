
import React from 'react';
import { AdminTab } from '../AdminDashboard';

const WelcomeView: React.FC<{ setActiveTab: (tab: AdminTab) => void }> = ({ setActiveTab }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden mb-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl lg:text-6xl font-black italic tracking-tighter leading-tight mb-6">
            ¡Bienvenido al Centro de Control de Mundo Jácome's!
          </h2>
          <p className="text-slate-300 text-lg lg:text-xl font-medium leading-relaxed opacity-90 mb-10">
            Desde este panel podrás gestionar la presencia digital de tu clínica de manera sencilla y eficiente. 
            Actualiza servicios, gestiona citas médicas, publica nuevas fotos en tu galería y mantén el SEO de tu web 
            siempre al día para seguir siendo la veterinaria líder en Táriba.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setActiveTab('citas')}
              className="bg-brand hover:bg-white hover:text-brand-dark text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95"
            >
              Revisar Citas Hoy
            </button>
            <button 
              onClick={() => setActiveTab('contenidos')}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest border border-white/20 transition-all active:scale-95"
            >
              Editar Contenidos
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">🐾</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Salud Animal</h3>
          <p className="text-slate-500 text-sm font-medium">Cada cambio que haces ayuda a que más dueños confíen en el bienestar de sus mascotas.</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Gestión Rápida</h3>
          <p className="text-slate-500 text-sm font-medium">El sistema de guardado inteligente actualiza solo lo que editas, sin esperas innecesarias.</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-brand-accent text-brand rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">📈</div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Presencia SEO</h3>
          <p className="text-slate-500 text-sm font-medium">Configura tus palabras clave para aparecer en los primeros lugares de Google en Táchira.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
