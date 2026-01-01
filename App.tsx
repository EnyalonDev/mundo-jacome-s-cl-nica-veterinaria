
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

const App: React.FC = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [view, setView] = useState<'public' | 'admin'>('public');

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
  
  const navigateTo = (sectionId: string) => {
    setView('public');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const openAdmin = () => setView('admin');
  const closeAdmin = () => setView('public');

  if (view === 'admin') {
    return <AdminDashboard onClose={closeAdmin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
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

      <Footer onNavigate={navigateTo} onOpenAdmin={openAdmin} />

      <ChatBot onOpenAppointment={toggleAppointmentModal} />

      {isAppointmentModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden relative">
            <button 
              onClick={toggleAppointmentModal}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
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
