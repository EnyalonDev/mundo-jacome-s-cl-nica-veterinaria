
import React from 'react';
import { AdminTab } from '../AdminDashboard';

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: '🏠' },
    { id: 'citas', label: 'Gestión de Citas', icon: '📅' },
    { id: 'contenidos', label: 'Contenidos', icon: '✍️' },
    { id: 'galeria', label: 'Galería', icon: '🖼️' },
    { id: 'variables', label: 'Variables & SEO', icon: '⚙️' },
  ];

  return (
    <aside className="w-24 lg:w-72 bg-white border-r border-slate-200 p-4 lg:p-6 flex flex-col space-y-2 z-20 shadow-sm">
      <div className="hidden lg:block mb-8 px-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Menú Principal</p>
      </div>
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id as AdminTab)}
          className={`w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-4 p-4 lg:px-6 lg:py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all group ${
            activeTab === item.id 
              ? 'bg-brand text-white shadow-xl shadow-brand/20' 
              : 'text-slate-400 hover:bg-slate-50 hover:text-brand'
          }`}
        >
          <span className={`text-xl lg:text-lg transition-transform group-hover:scale-110 ${activeTab === item.id ? 'scale-110' : ''}`}>
            {item.icon}
          </span>
          <span className="hidden lg:block">{item.label}</span>
        </button>
      ))}
      
      <div className="mt-auto pt-10 px-4 hidden lg:block">
        <div className="bg-brand-accent/30 p-4 rounded-2xl border border-brand-accent">
          <p className="text-[9px] font-black text-brand uppercase tracking-widest mb-1">Estado del Servidor</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-bold text-brand-dark">Sincronizado</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
