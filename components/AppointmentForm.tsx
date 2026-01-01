
import React, { useState, useMemo } from 'react';
import { db, isConfigValid } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { WEB_CONTENT } from '../constants/content';

interface AppointmentFormProps {
  onClose: () => void;
}

type Step = 'SERVICE' | 'PET' | 'OWNER' | 'CALENDAR' | 'REVIEW' | 'SUCCESS';

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const { appointment } = WEB_CONTENT;
  const [step, setStep] = useState<Step>('SERVICE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    serviceId: '',
    serviceName: '',
    petName: '',
    petType: 'Perro',
    petBreed: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    date: null as Date | null,
    time: ''
  });

  const stepsOrder: Step[] = ['SERVICE', 'PET', 'OWNER', 'CALENDAR', 'REVIEW', 'SUCCESS'];
  const currentStepIndex = stepsOrder.indexOf(step);

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) { days.push(null); }
    for (let d = 1; d <= daysInMonth; d++) { days.push(new Date(year, month, d)); }
    return days;
  }, [currentMonth]);

  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectService = (id: string, name: string) => {
    setFormData({ ...formData, serviceId: id, serviceName: name });
    setStep('PET');
  };

  const selectDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return;
    setFormData({ ...formData, date, time: '' });
  };

  const handleNext = () => {
    const nextStep = stepsOrder[currentStepIndex + 1];
    if (nextStep) setStep(nextStep);
  };

  const handleBack = () => {
    const prevStep = stepsOrder[currentStepIndex - 1];
    if (prevStep) setStep(prevStep);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!isConfigValid || !db) {
      setTimeout(() => { setStep('SUCCESS'); setIsSubmitting(false); }, 1000);
      return;
    }

    try {
      await addDoc(collection(db, "appointments"), { ...formData, status: 'pending', createdAt: serverTimestamp() });
      setStep('SUCCESS');
    } catch (error) {
      alert("Error al agendar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2 px-1">
        {appointment.steps.map((label, idx) => (
          <span key={label} className={`text-[9px] uppercase tracking-tighter font-bold ${idx <= currentStepIndex ? 'text-brand' : 'text-slate-300'}`}>
            {label}
          </span>
        ))}
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
        <div className="h-full bg-brand transition-all duration-500 ease-out" style={{ width: `${((currentStepIndex + 1) / (stepsOrder.length - 1)) * 100}%` }} />
      </div>
    </div>
  );

  if (step === 'SUCCESS') {
    return (
      <div className="text-center py-12 px-4 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-xl">
          <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-extrabold text-brand-dark mb-4">{appointment.success.title}</h2>
        <p className="text-slate-600 mb-10 leading-relaxed max-w-sm mx-auto">
          {appointment.success.message.replace('{petName}', formData.petName)}
        </p>
        <button onClick={onClose} className="w-full bg-brand-dark text-white py-5 rounded-2xl font-bold hover:bg-brand transition-all shadow-xl">{appointment.success.cta}</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-brand-dark tracking-tight">{appointment.title}</h2>
        {!isConfigValid && <p className="text-amber-600 text-[10px] font-bold uppercase mt-1">{appointment.demoMode}</p>}
      </div>

      <ProgressBar />

      <div className="min-h-[450px]">
        {step === 'SERVICE' && (
          <div className="animate-in slide-in-from-right-8 duration-300">
            <h3 className="text-lg font-bold text-brand-dark mb-6">{appointment.questions.service}</h3>
            <div className="grid grid-cols-2 gap-4">
              {appointment.services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => selectService(s.id, s.name)}
                  className={`p-5 rounded-3xl border-2 text-left transition-all hover:border-brand hover:bg-brand/5 group ${formData.serviceId === s.id ? 'border-brand bg-brand/5' : 'border-slate-100 bg-slate-50/50'}`}
                >
                  <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform">{s.icon}</span>
                  <p className="font-extrabold text-brand-dark text-sm leading-tight">{s.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{s.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'PET' && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
            <h3 className="text-lg font-bold text-brand-dark">{appointment.questions.pet}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">{appointment.formLabels.petName}</label>
                <input required type="text" name="petName" value={formData.petName} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand outline-none bg-slate-50/50 font-medium" placeholder={appointment.placeholders.petName} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">{appointment.formLabels.petType}</label>
                <select name="petType" value={formData.petType} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand outline-none bg-slate-50/50 font-bold">
                  <option value="Perro">🐶 Perro</option>
                  <option value="Gato">🐱 Gato</option>
                  <option value="Otro">🐰 Otro</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleBack} className="w-1/3 py-5 rounded-2xl font-bold border-2 border-slate-100 text-slate-400">{appointment.buttons.back}</button>
              <button type="button" onClick={handleNext} disabled={!formData.petName} className="w-2/3 bg-brand text-white py-5 rounded-2xl font-extrabold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all">{appointment.buttons.next}</button>
            </div>
          </div>
        )}

        {step === 'OWNER' && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
            <h3 className="text-lg font-bold text-brand-dark">{appointment.questions.owner}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">{appointment.formLabels.ownerName}</label>
                <input required type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand outline-none bg-slate-50/50 font-medium" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">{appointment.formLabels.ownerPhone}</label>
                  <input required type="tel" name="ownerPhone" value={formData.ownerPhone} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand outline-none bg-slate-50/50 font-medium" placeholder={appointment.placeholders.ownerPhone} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">{appointment.formLabels.ownerEmail}</label>
                  <input required type="email" name="ownerEmail" value={formData.ownerEmail} onChange={handleChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-brand outline-none bg-slate-50/50 font-medium" placeholder={appointment.placeholders.ownerEmail} />
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleBack} className="w-1/3 py-5 rounded-2xl font-bold border-2 border-slate-100 text-slate-400">{appointment.buttons.back}</button>
              <button type="button" onClick={handleNext} disabled={!formData.ownerName || !formData.ownerPhone || !formData.ownerEmail} className="w-2/3 bg-brand text-white py-5 rounded-2xl font-extrabold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all">{appointment.buttons.next}</button>
            </div>
          </div>
        )}

        {step === 'CALENDAR' && (
          <div className="animate-in slide-in-from-right-8 duration-300 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-brand-dark">{appointment.questions.calendar}</h3>
                <div className="flex gap-2">
                  <button onClick={handlePrevMonth} className="p-2 hover:bg-brand/10 rounded-full text-brand">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                  </button>
                  <span className="font-bold text-sm text-brand min-w-[120px] text-center capitalize">
                    {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={handleNextMonth} className="p-2 hover:bg-brand/10 rounded-full text-brand">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['D','L','M','M','J','V','S'].map(d => <span key={d} className="text-[10px] font-bold text-slate-300">{d}</span>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, i) => {
                  const isSelected = formData.date && date && date.toDateString() === formData.date.toDateString();
                  const isPast = date && date < new Date(new Date().setHours(0,0,0,0));
                  return (
                    <button key={i} disabled={!date || isPast} onClick={() => date && selectDate(date)} className={`aspect-square rounded-xl text-xs font-bold transition-all flex items-center justify-center ${ !date ? 'invisible' : isPast ? 'text-slate-200 cursor-not-allowed' : isSelected ? 'bg-brand text-white shadow-lg' : 'hover:bg-brand/10 text-slate-600' }`}>
                      {date ? date.getDate() : ''}
                    </button>
                  );
                })}
              </div>
            </div>

            {formData.date && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <h3 className="text-lg font-bold text-brand-dark mb-4">{appointment.questions.hours}</h3>
                <div className="grid grid-cols-3 gap-3">
                  {appointment.hours.map(h => (
                    <button key={h} onClick={() => setFormData({ ...formData, time: h })} className={`py-3 rounded-2xl text-[11px] font-bold border-2 transition-all ${ formData.time === h ? 'border-brand bg-brand text-white' : 'border-slate-100 text-slate-600 hover:border-brand/30' }`}>
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleBack} className="w-1/3 py-5 rounded-2xl font-bold border-2 border-slate-100 text-slate-400">{appointment.buttons.back}</button>
              <button type="button" onClick={handleNext} disabled={!formData.date || !formData.time} className="w-2/3 bg-brand text-white py-5 rounded-2xl font-extrabold shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all">{appointment.buttons.review}</button>
            </div>
          </div>
        )}

        {step === 'REVIEW' && (
          <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
            <h3 className="text-lg font-bold text-brand-dark">{appointment.questions.review}</h3>
            
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border-2 border-slate-100 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl grayscale pointer-events-none">
                {appointment.services.find(s => s.id === formData.serviceId)?.icon}
              </div>
              <div className="flex justify-between items-start border-b border-slate-200 pb-4 relative z-10">
                <div>
                  <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Servicio</p>
                  <p className="font-extrabold text-brand-dark text-xl">{formData.serviceName}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{appointment.formLabels.petName}</p>
                  <p className="font-bold text-slate-700">{formData.petName} <span className="text-xs text-slate-400 font-normal">({formData.petType})</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Dueño</p>
                  <p className="font-bold text-slate-700">{formData.ownerName}</p>
                </div>
                <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fecha y Hora</p>
                    <p className="font-extrabold text-brand-dark capitalize">{formData.date?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                  </div>
                  <div className="bg-brand/10 px-4 py-2 rounded-xl"><p className="text-brand font-extrabold text-sm">{formData.time}</p></div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={handleBack} disabled={isSubmitting} className="w-1/3 py-5 rounded-2xl font-bold border-2 border-slate-100 text-slate-400">{appointment.buttons.edit}</button>
              <button onClick={handleSubmit} disabled={isSubmitting} className="w-2/3 bg-brand-dark text-white py-5 rounded-2xl font-extrabold shadow-2xl shadow-brand-dark/30 hover:bg-brand transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div><span>{appointment.buttons.submitting}</span></>
                ) : (
                  <span>{appointment.buttons.confirm}</span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
