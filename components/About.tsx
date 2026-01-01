
import React from 'react';
import { WEB_CONTENT } from '../constants/content';

const About: React.FC = () => {
  const { about } = WEB_CONTENT;
  return (
    <div id="nosotros" className="py-24 bg-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-20">
        
        {/* Collage de Imágenes */}
        <div className="lg:w-1/2 relative h-[500px] w-full max-w-[500px] lg:max-w-none">
          <div className="absolute top-10 left-0 w-3/4 aspect-[4/5] z-10 group transition-all duration-500 hover:z-30">
            <img 
              src={about.images[0]} 
              alt="Clínica Mundo Jácome" 
              className="rounded-[3rem] shadow-xl w-full h-full object-cover border-8 border-white transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
            />
          </div>

          <div className="absolute top-0 right-0 w-1/2 aspect-square z-20 group transition-all duration-500 hover:z-40">
            <img 
              src={about.images[1]} 
              alt="Mascota Feliz" 
              className="rounded-[2.5rem] shadow-2xl w-full h-full object-cover border-8 border-white transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2"
            />
          </div>

          <div className="absolute bottom-4 right-10 w-2/5 aspect-square z-25 group transition-all duration-500 hover:z-40">
            <img 
              src={about.images[2]} 
              alt="Cuidado Profesional" 
              className="rounded-3xl shadow-2xl w-full h-full object-cover border-4 border-white transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>

          <div className="absolute -bottom-6 left-1/4 bg-brand-dark text-white p-6 rounded-3xl shadow-2xl z-40 transform hover:scale-105 transition-transform">
            <p className="text-4xl font-extrabold mb-0 leading-none">{about.experience.value}</p>
            <p className="text-brand text-[10px] font-black uppercase tracking-[0.2em]">{about.experience.label}</p>
          </div>
        </div>

        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-4">
            <h2 className="text-brand font-black uppercase text-xs tracking-[0.3em]">{about.tag}</h2>
            <h3 className="text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight">
              {about.title.split(about.highlight)[0]}
              <span className="text-brand">{about.highlight}</span>
              {about.title.split(about.highlight)[1]}
            </h3>
          </div>
          
          <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.features.map((f, i) => (
              <div key={i} className="flex items-center space-x-3 bg-white p-4 rounded-2xl border border-brand-accent shadow-sm transition-colors hover:bg-brand-accent/20">
                <div className="p-1.5 bg-brand rounded-lg">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                </div>
                <p className="text-brand-dark font-black text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
