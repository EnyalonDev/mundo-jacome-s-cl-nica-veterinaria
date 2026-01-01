
import React from 'react';

const AppointmentsView: React.FC = () => {
  const dummyAppointments = [
    { id: '1', pet: 'Max', owner: 'Carlos Pérez', service: 'Consulta Médica', date: 'Hoy, 10:30 AM', status: 'pending' },
    { id: '2', pet: 'Luna', owner: 'Mayerlin A.', service: 'Exportación', date: 'Mañana, 09:00 AM', status: 'confirmed' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Gestión de Citas</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">Monitorea y confirma las solicitudes de tus clientes</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase">Citas Hoy</p>
            <p className="text-xl font-black text-brand-dark">12</p>
          </div>
          <div className="w-px h-8 bg-slate-100"></div>
          <div className="text-right">
            <p className="text-[9px] font-black text-slate-400 uppercase">Pendientes</p>
            <p className="text-xl font-black text-brand">3</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mascota / Dueño</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Servicio</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha y Hora</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Estado</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {dummyAppointments.map(app => (
              <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <p className="font-black text-slate-900">{app.pet}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{app.owner}</p>
                </td>
                <td className="px-8 py-6 font-bold text-brand-dark text-sm">{app.service}</td>
                <td className="px-8 py-6 font-bold text-slate-600 text-sm">{app.date}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${
                    app.status === 'confirmed' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500 animate-pulse'
                  }`}>
                    {app.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right space-x-2">
                  <button className="p-2.5 bg-brand/10 text-brand rounded-xl hover:bg-brand hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentsView;
