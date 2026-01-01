
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { WEB_CONTENT } from '../constants/content';

interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
}

const InstagramGallery: React.FC = () => {
  const { gallery } = WEB_CONTENT;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  
  const posts = gallery.posts as GalleryImage[];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [randomRotation, setRandomRotation] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const visiblePosts = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return posts.slice(start, start + itemsPerPage);
  }, [currentPage, posts]);

  const handleNextBatch = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevBatch = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const openImage = (post: GalleryImage) => {
    const index = posts.findIndex(p => p.id === post.id);
    setSelectedIndex(index);
    // Generar rotación aleatoria entre -6 y 6 grados para la entrada
    setRandomRotation(Math.floor(Math.random() * 13) - 6);
    setIsNavigating(false);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const navigateImage = useCallback((direction: 'next' | 'prev') => {
    if (selectedIndex === null) return;
    
    setIsNavigating(true);
    let nextIdx;
    if (direction === 'next') {
      nextIdx = (selectedIndex + 1) % posts.length;
    } else {
      nextIdx = (selectedIndex - 1 + posts.length) % posts.length;
    }
    
    // Pequeño delay para la animación de transición
    setTimeout(() => {
      setSelectedIndex(nextIdx);
    }, 50);
  }, [selectedIndex, posts]);

  // Soporte para teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'Escape') closeImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, navigateImage]);

  const selectedImage = selectedIndex !== null ? posts[selectedIndex] : null;

  return (
    <div className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand font-bold uppercase text-xs tracking-widest mb-2">{gallery.tag}</h2>
            <h3 className="text-4xl font-extrabold text-brand-dark mt-2 leading-tight">{gallery.title}</h3>
            <p className="text-slate-600 mt-4 text-lg">
              {gallery.description}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-2 mr-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentPage === i ? 'w-8 bg-brand' : 'w-2 bg-slate-200'}`}
                />
              ))}
            </div>
            <button 
              onClick={handlePrevBatch}
              className="p-3 rounded-full border border-slate-200 text-brand hover:bg-brand hover:text-white transition-all active:scale-90"
              aria-label="Lote anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={handleNextBatch}
              className="p-3 rounded-full border border-slate-200 text-brand hover:bg-brand hover:text-white transition-all active:scale-90"
              aria-label="Siguiente lote"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        <div key={currentPage} className="grid grid-cols-2 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
          {visiblePosts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => openImage(post)}
              className="relative aspect-square overflow-hidden rounded-[2.5rem] group cursor-pointer shadow-lg bg-brand-accent/20 border-4 border-white transition-all hover:scale-[1.02] active:scale-95"
            >
              <img 
                src={post.url} 
                alt={post.caption || "Paciente"} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand shadow-xl transform scale-50 group-hover:scale-100 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center flex justify-center space-x-2">
           {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentPage === i ? 'w-10 bg-brand' : 'w-2 bg-slate-200'}`}
                />
            ))}
        </div>
      </div>

      {/* Modal Estilo Polaroid Dinámico */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-brand-dark/90 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeImage}
        >
          {/* Controles de navegación */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white text-white hover:text-brand rounded-full transition-all active:scale-90 z-20 group"
          >
            <svg className="w-8 h-8 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/></svg>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white text-white hover:text-brand rounded-full transition-all active:scale-90 z-20 group"
          >
            <svg className="w-8 h-8 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
          </button>

          <button 
            onClick={closeImage}
            className="absolute top-6 right-6 text-white/50 hover:text-white p-3 transition-colors z-20"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          {/* El Marco Polaroid */}
          <div 
            key={selectedImage.id}
            className={`relative max-w-sm sm:max-w-md w-full transition-all duration-500 ease-out transform ${isNavigating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'} ${!isNavigating ? 'animate-polaroid-entry' : ''}`}
            style={{ 
              '--entry-rotate': `${randomRotation}deg`,
              transform: isNavigating ? 'scale(0.95)' : `rotate(${randomRotation}deg) scale(1)`
            } as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-4 sm:p-5 pb-12 sm:pb-20 rounded shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-slate-100">
              <div className="aspect-square w-full overflow-hidden bg-slate-100 mb-6 sm:mb-8 border border-slate-200 rounded-sm">
                <img 
                  src={selectedImage.url} 
                  alt="Polaroid" 
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              <div className="text-center px-2">
                <p className="font-handwriting text-3xl sm:text-4xl text-slate-700 italic leading-none">
                  {selectedImage.caption || "Mundo Jácome's"}
                </p>
                <div className="flex items-center justify-center space-x-3 mt-4">
                  <div className="h-px w-8 bg-slate-100"></div>
                  <p className="text-[9px] text-slate-300 uppercase tracking-[0.4em] font-black">
                    {selectedIndex !== null ? `${selectedIndex + 1} / ${posts.length}` : 'Memoria'}
                  </p>
                  <div className="h-px w-8 bg-slate-100"></div>
                </div>
              </div>
            </div>
            
            {/* Efecto de cinta adhesiva opcional */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/10 backdrop-blur-md rounded-sm border border-white/5 rotate-1"></div>
          </div>
        </div>
      )}

      <style>{`
        @font-face {
          font-family: 'Handwriting';
          src: url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        }
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
        
        @keyframes polaroidEntry {
          0% {
            opacity: 0;
            transform: rotate(0deg) scale(0.4);
          }
          100% {
            opacity: 1;
            transform: rotate(var(--entry-rotate)) scale(1);
          }
        }
        
        .animate-polaroid-entry {
          animation: polaroidEntry 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

export default InstagramGallery;
