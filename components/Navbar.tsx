
import React, { useState } from 'react';
import { WEB_CONTENT } from '../constants/content';

interface NavbarProps {
  onOpenAppointment: () => void;
  onNavigate: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAppointment, onNavigate }) => {
  const { navbar, common } = WEB_CONTENT;
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-accent shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <button onClick={() => handleLinkClick('inicio')} className="flex items-center space-x-4 text-left group">
            <div className="relative w-16 h-16 rounded-full border-2 border-brand overflow-hidden shadow-lg transform transition-transform group-hover:scale-105">
              <img 
                src={common.logo} 
                alt="Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter text-brand-dark italic">{common.name}</span>
              <span className="text-[9px] uppercase tracking-widest text-brand font-bold bg-brand-accent/30 px-2 py-0.5 rounded self-start">{common.tagline}</span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            {navbar.links.map(link => (
              <button 
                key={link.id} 
                onClick={() => handleLinkClick(link.id)}
                className="text-slate-600 hover:text-brand font-bold transition-all text-[10px] uppercase tracking-[0.2em]"
              >
                {link.label}
              </button>
            ))}
            <button 
              onClick={onOpenAppointment}
              className="bg-brand hover:bg-brand-dark text-white px-8 py-3.5 rounded-2xl font-black transition-all shadow-lg shadow-brand/20 active:scale-95"
            >
              {navbar.cta}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand p-2">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-brand-accent p-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
          {navbar.links.map(link => (
            <button 
              key={link.id} 
              onClick={() => handleLinkClick(link.id)} 
              className="block w-full text-left py-3 text-slate-700 hover:text-brand font-black uppercase text-sm tracking-widest"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={() => { onOpenAppointment(); setIsOpen(false); }}
            className="w-full bg-brand text-white py-5 rounded-2xl font-black shadow-xl"
          >
            {navbar.cta}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
