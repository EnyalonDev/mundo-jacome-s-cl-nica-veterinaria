
import React from 'react';
import { WEB_CONTENT } from '../constants/content';

const Services: React.FC = () => {
  const { services } = WEB_CONTENT;
  
  // Ordenamos por posición para asegurar el despliegue correcto
  const sortedServices = [...services.list].sort((a, b) => (a.position || 0) - (b.position || 0));

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand font-bold tracking-widest uppercase text-xs">{services.tag}</h2>
          <p className="mt-2 text-4xl font-extrabold text-brand-dark sm:text-5xl">
            {services.title}
          </p>
          <div className="w-24 h-1 bg-brand mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedServices.map((service, index) => (
            <div 
              key={service.id || index} 
              className={`group p-10 rounded-[2.5rem] transition-all duration-500 border-2 relative overflow-hidden ${
                service.highlight 
                  ? 'bg-brand text-white border-brand shadow-2xl shadow-brand/30' 
                  : 'bg-brand-light border-transparent hover:border-brand-accent hover:bg-white hover:shadow-xl hover:shadow-brand/5'
              }`}
            >
              {/* Número de posición decorativo */}
              <div className={`absolute -top-4 -right-4 text-7xl font-black opacity-[0.05] italic select-none pointer-events-none ${
                service.highlight ? 'text-white' : 'text-brand'
              }`}>
                {String(service.position).padStart(2, '0')}
              </div>

              <div className={`text-4xl mb-8 w-20 h-20 flex items-center justify-center rounded-3xl shadow-inner transition-transform group-hover:scale-110 ${
                service.highlight ? 'bg-white/20' : 'bg-white'
              }`}>
                {service.icon}
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                 <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                   service.highlight ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand'
                 }`}>
                   #{service.position}
                 </span>
                 <h3 className={`text-2xl font-extrabold ${service.highlight ? 'text-white' : 'text-brand-dark'}`}>
                   {service.title}
                 </h3>
              </div>
              
              <p className={`leading-relaxed text-lg ${service.highlight ? 'text-white/90' : 'text-slate-600'}`}>
                {service.description}
              </p>
              
              {service.highlight && (
                <div className="mt-6 pt-6 border-t border-white/20 flex items-center space-x-2 font-bold text-sm">
                  <span>VIAJA SEGURO</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
