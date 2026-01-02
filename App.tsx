
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Banner from './components/Banner';
import About from './components/About';
import Testimonials from './components/Testimonials';
import AppointmentForm from './components/AppointmentForm';
import Footer from './components/Footer';
import MapSection from './components/MapSection';
import InstagramGallery from './components/InstagramGallery';
import ChatBot from './components/ChatBot';
import AdminDashboard from './components/AdminDashboard';
import { WEB_CONTENT, THEMES } from './constants/content';

/**
 * @component App
 * @description Componente raíz que orquestar la navegación entre la vista pública y el panel administrativo.
 */
const App: React.FC = () => {
  // Estado para el tema visual activo (Permite cambio en tiempo real para el cliente)
  const [activeTheme, setActiveTheme] = useState<keyof typeof THEMES>(
    (WEB_CONTENT.system.config.activeTheme as keyof typeof THEMES) || 'vibrant'
  );

  // Estado para controlar la visibilidad del modal de citas
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  
  // Estado de vista principal: 'public' para clientes, 'admin' para gestión
  const [view, setView] = useState<'public' | 'admin'>('public');

  /**
   * Efecto para aplicar el tema visual basado en el estado activo.
   */
  useEffect(() => {
    const themeColors = THEMES[activeTheme];
    const root = document.documentElement;
    root.style.setProperty('--color-brand-light', themeColors.light);
    root.style.setProperty('--color-brand-main', themeColors.main);
    root.style.setProperty('--color-brand-dark', themeColors.dark);
    root.style.setProperty('--color-brand-accent', themeColors.accent);
  }, [activeTheme]);

  /**
   * Efecto para manejar el cambio de vista basado en el hash de la URL.
   */
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setView('admin');
      } else {
        setView('public');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleAppointmentModal = () => setIsAppointmentModalOpen(!isAppointmentModalOpen);
  
  const toggleTheme = () => {
    setActiveTheme(prev => prev === 'vibrant' ? 'classic' : 'vibrant');
  };

  /**
   * Función de navegación suave (Smooth Scroll)
   */
  const navigateTo = (sectionId: string) => {
    setView('public');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const openAdmin = () => setView('admin');
  const closeAdmin = () => setView('public');

  // Renderizado condicional del Panel Administrativo
  if (view === 'admin') {
    return <AdminDashboard onClose={closeAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-light transition-colors duration-700">
      <Navbar 
        onOpenAppointment={toggleAppointmentModal} 
        onNavigate={navigateTo}
      />
      
      <main className="flex-grow">
        <section id="inicio">
          <Hero 
            onOpenAppointment={toggleAppointmentModal} 
            onNavigate={navigateTo}
          />
        </section>
        
        <section id="servicios">
          <Services />
        </section>

        <Banner />

        <section id="nosotros">
          <About />
        </section>

        <section id="galeria">
          <InstagramGallery />
        </section>

        <section id="testimonios">
          <Testimonials />
        </section>

        <section id="ubicacion">
          <MapSection />
        </section>
      </main>

      <Footer 
        onNavigate={navigateTo} 
        onOpenAdmin={openAdmin} 
        onToggleTheme={toggleTheme}
        currentTheme={activeTheme}
      />

      <ChatBot onOpenAppointment={toggleAppointmentModal} />

      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden relative">
            <button 
              onClick={toggleAppointmentModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
              aria-label="Cerrar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-8">
              <AppointmentForm onClose={toggleAppointmentModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
