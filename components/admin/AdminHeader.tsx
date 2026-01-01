
import React from 'react';

interface HeaderProps {
  onClose: () => void;
  onLogout: () => void;
}

const AdminHeader: React.FC<HeaderProps> = ({ onClose, onLogout }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-brand-dark rounded-2xl flex items-center justify-center text-white font-black italic shadow-lg">MJ</div>
        <div>
          <h1 className="text-lg font-black text-slate-900 leading-none">Mundo Jácome's</h1>
          <p className="text-[9px] text-brand font-bold uppercase tracking-[0.2em] mt-1">Gestión Centralizada v2.5</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <button 
          onClick={onClose}
          className="hidden md:flex items-center space-x-2 text-slate-400 hover:text-brand font-bold text-[10px] uppercase tracking-widest transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          <span>Vista Pública</span>
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 leading-none">Administrador</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Super User</p>
          </div>
          <button 
            onClick={onLogout}
            className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-100 transition-all active:scale-95"
            title="Cerrar Sesión"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
