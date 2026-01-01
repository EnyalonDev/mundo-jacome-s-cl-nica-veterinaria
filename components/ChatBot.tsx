
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { WEB_CONTENT } from '../constants/content';

interface ChatBotProps {
  onOpenAppointment: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ onOpenAppointment }) => {
  const { chatbot } = WEB_CONTENT;
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: chatbot.initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: `Historial:\n${messages.map(m => `${m.role}: ${m.text}`).join('\n')}\n\nNueva pregunta: ${userMessage}` }] }
        ],
        config: {
          systemInstruction: chatbot.systemInstruction,
          temperature: 0.7,
        }
      });
      const aiText = response.text || '🐾';
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Error de conexión. 🐾' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90]">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="bg-brand hover:bg-brand-dark text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 group relative flex items-center justify-center">
          <div className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-accent"></span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden border border-brand-accent animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-brand p-5 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🐾</div>
              <div><h4 className="font-black text-sm leading-tight">{chatbot.name}</h4><p className="text-[10px] opacity-80 font-bold uppercase tracking-widest">{chatbot.role}</p></div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
          </div>
          <div className="bg-amber-50 px-4 py-2 border-b border-amber-100 flex items-center space-x-2">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
            <p className="text-[10px] text-amber-700 font-bold">{chatbot.warning}</p>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-brand text-white rounded-tr-none' : 'bg-white text-brand-dark rounded-tl-none border border-brand-accent'}`}>{m.text}</div>
              </div>
            ))}
            {isLoading && <div className="flex justify-start"><div className="bg-white border border-brand-accent p-4 rounded-2xl rounded-tl-none shadow-sm"><div className="flex space-x-1"><div className="w-2 h-2 bg-brand rounded-full animate-bounce"></div><div className="w-2 h-2 bg-brand rounded-full animate-bounce [animation-delay:-0.15s]"></div><div className="w-2 h-2 bg-brand rounded-full animate-bounce [animation-delay:-0.3s]"></div></div></div></div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-4 py-2 flex space-x-2 overflow-x-auto no-scrollbar bg-slate-50">
            {chatbot.quickActions.map((qa, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (qa.action === 'appointment') onOpenAppointment();
                  else if (qa.action === 'call') window.location.href = qa.value!;
                  else if (qa.action === 'text') setInput(qa.value!);
                }}
                className="whitespace-nowrap bg-white border border-brand text-brand px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-brand hover:text-white transition-colors flex-shrink-0"
              >
                {qa.label}
              </button>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-brand-accent flex items-center space-x-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={chatbot.placeholders.input} className="flex-grow bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand font-medium" />
            <button type="submit" disabled={!input.trim() || isLoading} className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand disabled:opacity-50 transition-colors shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
