
import React from 'react';
import { WEB_CONTENT } from '../constants/content';

const MapSection: React.FC = () => {
  const { contactSection, common } = WEB_CONTENT;

  return (
    <div className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-brand-accent">
          <div className="lg:w-2/5 p-12 lg:p-16 space-y-10">
            <div>
              <h2 className="text-brand font-bold uppercase text-xs tracking-widest mb-2">{contactSection.tag}</h2>
              <h3 className="text-4xl font-extrabold text-brand-dark mt-2">{contactSection.title}</h3>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-lg">{contactSection.labels.address}</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">{common.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-lg">{contactSection.labels.phone}</h4>
                  <p className="text-brand font-bold text-2xl tracking-tighter">{common.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-dark text-lg">{contactSection.labels.hours}</h4>
                  <p className="text-slate-600 font-medium italic">{contactSection.hoursDetail}</p>
                  <p className="text-slate-600">{contactSection.hoursDays}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href={contactSection.googleMapsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-brand-dark text-white px-8 py-5 rounded-2xl font-bold hover:bg-brand transition-all shadow-2xl shadow-brand-dark/20"
              >
                <span>{contactSection.cta}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="lg:w-3/5 h-[500px] lg:h-auto bg-brand-accent/30 relative">
            <iframe 
              src={contactSection.mapEmbedUrl} 
              className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
