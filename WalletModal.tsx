
import React from 'react';

interface ItineraryModalProps {
  content: string;
  onClose: () => void;
  title: string;
}

const ItineraryModal: React.FC<ItineraryModalProps> = ({ content, onClose, title }) => {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-xl">
      <div className="bg-white rounded-[40px] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col">
        <div className="bg-blue-900 p-8 text-white shrink-0 relative">
          <button onClick={onClose} className="absolute top-6 right-6 hover:bg-white/10 p-2 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-400 text-blue-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">IA Sportfly Guide</span>
          </div>
          <h2 className="text-3xl font-sport leading-none">{title}</h2>
        </div>
        
        <div className="p-8 overflow-y-auto prose prose-blue max-w-none">
          <div className="space-y-4 text-slate-700 leading-relaxed font-medium">
            {content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          
          <div className="mt-10 p-6 bg-slate-50 rounded-3xl border border-dashed border-gray-200">
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-2">💡 Nota de Sportfly</h4>
            <p className="text-[11px] text-gray-500 italic">Este itinerario ha sido optimizado por IA considerando la ubicación del estadio y las tendencias locales para el Clausura 2026.</p>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <button onClick={onClose} className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-950 transition-all">Entendido, ¡A Rockear!</button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryModal;
