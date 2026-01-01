
import React from 'react';
import { WEB_CONTENT } from '../constants/content';

const Banner: React.FC = () => {
  const { banner } = WEB_CONTENT;

  return (
    <div className="py-12 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-dark rounded-[3rem] p-10 md:p-20 relative overflow-hidden shadow-2xl group transition-all hover:scale-[1.01]">
          {/* Elementos Decorativos */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-brand/20 rounded-full blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-brand/10 rounded-full blur-[80px] opacity-30"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="lg:w-7/12 space-y-8 text-center lg:text-left">
              <div className="inline-block px-5 py-2 bg-brand/30 rounded-full border border-white/20 backdrop-blur-sm">
                <p className="text-white font-black text-[11px] uppercase tracking-[0.3em]">{banner.subtitle}</p>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tighter italic">
                {banner.title}
              </h2>
              
              <p className="text-slate-300 text-base md:text-lg font-bold leading-relaxed max-w-xl opacity-90">
                {banner.description}
              </p>
            </div>

            <div className="lg:w-4/12 w-full">
              <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/20 space-y-6 shadow-2xl">
                {banner.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-5 group/item">
                    <div className="w-12 h-12 bg-brand rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg group-hover/item:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white font-black text-xs tracking-widest uppercase">{feature}</span>
                  </div>
                ))}
                
                <div className="pt-6">
                  <button 
                    onClick={() => {
                        const el = document.getElementById('ubicacion');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white hover:bg-brand text-brand-dark hover:text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all shadow-2xl shadow-black/40 active:scale-95 flex items-center justify-center space-x-3"
                  >
                    <span>{banner.cta}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
