
import React from 'react';
import { WEB_CONTENT } from '../constants/content';

interface HeroProps {
  onOpenAppointment: () => void;
  onNavigate: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenAppointment, onNavigate }) => {
  const { hero } = WEB_CONTENT;
  return (
    <div className="relative overflow-hidden bg-brand-light pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-brand-accent text-brand font-bold text-sm shadow-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-brand animate-pulse"></span>
            <span>{hero.badge}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-brand-dark leading-tight">
            {hero.title.split(hero.highlight)[0]}
            <span className="text-brand">{hero.highlight}</span>
            {hero.title.split(hero.highlight)[1]}
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button 
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-8 py-4 bg-brand hover:bg-brand-dark text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand/30 transition-all transform hover:-translate-y-1"
            >
              {hero.ctaPrimary}
            </button>
            <button 
              onClick={() => onNavigate('servicios')}
              className="w-full sm:w-auto px-8 py-4 bg-white border border-brand-accent text-brand-dark hover:bg-brand-accent rounded-2xl font-bold text-lg transition-all"
            >
              {hero.ctaSecondary}
            </button>
          </div>
          <p className="text-slate-500 text-sm">
            {hero.stats}
          </p>
        </div>
        
        <div className="lg:w-1/2 relative">
          <img 
            src={hero.mainImage} 
            alt="Atención Veterinaria" 
            className="relative rounded-[3rem] shadow-2xl w-full h-[550px] object-cover border-[12px] border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
