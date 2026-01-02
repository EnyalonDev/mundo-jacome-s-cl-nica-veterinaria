
import React from 'react';
import { WEB_CONTENT } from '../constants/content';

interface FooterProps {
  onNavigate: (id: string) => void;
  onOpenAdmin: () => void;
  onToggleTheme?: () => void;
  currentTheme?: string;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin, onToggleTheme, currentTheme }) => {
  const { footer, common, navbar, contactSection } = WEB_CONTENT;
  return (
    <footer className="bg-brand-dark text-slate-400 py-20 border-t-8 border-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-white leading-none italic">{common.name}</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-brand font-bold mt-1">{common.tagline}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm">
              {footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-extrabold text-xs mb-6 uppercase tracking-[0.2em] border-l-4 border-brand pl-4">{footer.sections.company}</h3>
            <ul className="space-y-3 font-medium text-xs">
              {navbar.links.map(link => (
                <li key={link.id}><button onClick={() => onNavigate(link.id)} className="hover:text-brand transition-colors">{link.label}</button></li>
              ))}
              <li><button onClick={() => onNavigate('ubicacion')} className="hover:text-brand transition-colors">Contacto</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-extrabold text-xs mb-6 uppercase tracking-[0.2em] border-l-4 border-brand pl-4">{footer.sections.contact}</h3>
            <p className="text-xs mb-2">{common.address.split(',')[0]}.</p>
            <p className="text-brand font-black text-lg">{common.phone}</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
              <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-2">{footer.sections.hours}</p>
              <p className="text-xs leading-relaxed text-slate-300">
                {contactSection.hoursDays}
              </p>
            </div>

            {/* BOTÓN PROVISIONAL PARA CAMBIO DE TEMA */}
            {onToggleTheme && (
              <button 
                onClick={onToggleTheme}
                className="w-full group flex items-center justify-between bg-gradient-to-r from-brand to-brand-dark p-4 rounded-2xl border border-white/10 shadow-lg hover:scale-[1.02] transition-all"
              >
                <div className="text-left">
                  <p className="text-[9px] font-black text-white/60 uppercase tracking-widest">Previsualizar</p>
                  <p className="text-[11px] font-black text-white uppercase tracking-tighter">
                    {currentTheme === 'vibrant' ? 'Tema: Clásico (Marrón)' : 'Tema: Vibrante (Naranja)'}
                  </p>
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm group-hover:rotate-12 transition-transform">
                  🎨
                </div>
              </button>
            )}
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold tracking-widest uppercase">
          <p className="opacity-40">{footer.copyright}</p>
          <div className="flex flex-col md:flex-row items-center md:space-x-8 gap-4">
            <button 
              onClick={(e) => { e.preventDefault(); onOpenAdmin(); }}
              className="text-brand hover:text-white transition-colors"
            >
              {footer.adminLink}
            </button>
            <a 
              href="https://www.nestorovallos.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="opacity-40 hover:opacity-100 hover:text-brand transition-all text-center md:text-right"
            >
              {footer.privacyLink}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
