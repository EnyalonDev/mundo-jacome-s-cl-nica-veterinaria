
import React, { useState } from 'react';
import AdminSidebar from './admin/AdminSidebar';
import AdminHeader from './admin/AdminHeader';
import WelcomeView from './admin/WelcomeView';
import ContentView from './admin/ContentView';
import GalleryView from './admin/GalleryView';
import VariablesView from './admin/VariablesView';
import AppointmentsView from './admin/AppointmentsView';

export type AdminTab = 'inicio' | 'contenidos' | 'galeria' | 'variables' | 'citas';

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('inicio');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-brand-accent text-center animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 bg-brand rounded-3xl mx-auto mb-8 flex items-center justify-center text-white text-3xl italic font-black shadow-xl shadow-brand/20">MJ</div>
          <h2 className="text-3xl font-black text-brand-dark italic mb-2">Panel Administrativo</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Mundo Jácome's Backend</p>
          <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
            <input type="email" placeholder="Usuario" defaultValue="admin@mundojacomes.com" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-900 bg-slate-50 outline-none focus:border-brand transition-all font-bold" required />
            <input type="password" placeholder="Contraseña" className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 text-slate-900 bg-slate-50 outline-none focus:border-brand transition-all font-bold" required />
            <button className="w-full bg-brand-dark text-white py-5 rounded-2xl font-black hover:bg-brand transition-all shadow-xl uppercase tracking-widest active:scale-95">Ingresar al Sistema</button>
          </form>
          <button onClick={onClose} className="mt-8 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">Volver al Sitio Público</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand selection:text-white">
      <AdminHeader onClose={onClose} onLogout={() => setIsLoggedIn(false)} />
      
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'inicio' && <WelcomeView setActiveTab={setActiveTab} />}
            {activeTab === 'contenidos' && <ContentView />}
            {activeTab === 'galeria' && <GalleryView />}
            {activeTab === 'variables' && <VariablesView />}
            {activeTab === 'citas' && <AppointmentsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
