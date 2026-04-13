
import React from 'react';
import { MEMBERSHIP_MONTHLY_MXN, MEMBERSHIP_ANNUAL_MXN, COMMISSION_FEE_MXN } from '../constants';

interface PremiumModalProps {
  onClose: () => void;
  onSubscribe: (type: 'Mensual' | 'Anual') => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose, onSubscribe }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-xl">
      <div className="bg-white rounded-[40px] w-full max-w-4xl overflow-hidden shadow-2xl animate-in zoom-in duration-300 flex flex-col md:flex-row border border-white/20">
        {/* Left Side: ROI Focus */}
        <div className="bg-blue-900 p-8 md:p-12 text-white md:w-5/12 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20">
            <svg className="w-64 h-64 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          
          <div>
            <h2 className="text-4xl font-sport mb-6 relative z-10">SPORTFLY <span className="text-amber-400">PREMIUM</span></h2>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 mb-8 backdrop-blur-sm">
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Cálculo de Ahorro Anual</p>
              <p className="text-sm text-blue-100 italic">"Con 3 viajes al año, tu membresía anual se paga sola y empiezas a generar ganancias."</p>
            </div>
            
            <ul className="space-y-6 relative z-10">
              {[
                { icon: '💎', title: 'SIN COMISIONES', desc: `Ahorras $${COMMISSION_FEE_MXN} por cada paquete.` },
                { icon: '✈️', title: 'VUELOS ELITE', desc: '10% OFF directo en todas las aerolíneas.' },
                { icon: '🎟️', title: 'VENTA ANTICIPADA', desc: 'Acceso a Liguilla antes que nadie.' }
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="font-bold text-amber-400 text-xs tracking-widest uppercase">{b.title}</p>
                    <p className="text-[11px] text-blue-200">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 mt-8 border-t border-white/10">
            <p className="text-[9px] text-blue-300 uppercase font-black tracking-widest">Sportfly Sincronización Oficial 2026</p>
          </div>
        </div>

        {/* Right Side: Plans */}
        <div className="p-8 md:p-12 md:w-7/12 bg-slate-50 relative flex flex-col">
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-blue-900 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <h3 className="text-xl font-bold text-blue-900 mb-8">Elige tu estrategia de ahorro</h3>
          
          <div className="space-y-6 flex-grow">
            {/* Plan Anual - El que nos interesa vender */}
            <button 
              onClick={() => onSubscribe('Anual')}
              className="w-full bg-white p-8 rounded-[32px] border-4 border-amber-400 text-left flex justify-between items-center relative shadow-2xl hover:scale-[1.02] transition-all"
            >
              <div className="absolute -top-4 right-8 bg-amber-400 text-blue-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">MÁXIMO AHORRO</div>
              <div>
                <p className="font-sport text-blue-900 text-xl leading-none mb-1">PLAN ANUAL</p>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Un solo pago al año</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">Ahorras $380</span>
                  <span className="text-[10px] text-gray-400">vs mensual</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-sport text-blue-900 leading-none">${MEMBERSHIP_ANNUAL_MXN}</p>
                <p className="text-[10px] text-gray-400 font-black uppercase mt-1">MXN / TOTAL</p>
              </div>
            </button>

            {/* Plan Mensual */}
            <button 
              onClick={() => onSubscribe('Mensual')}
              className="w-full bg-white p-6 rounded-[32px] border-2 border-slate-200 hover:border-blue-900 transition-all text-left flex justify-between items-center group shadow-sm"
            >
              <div>
                <p className="font-bold text-blue-900 uppercase tracking-widest">Plan Mensual</p>
                <p className="text-xs text-gray-400">Sin compromisos a largo plazo</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900">${MEMBERSHIP_MONTHLY_MXN}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">MXN / MES</p>
              </div>
            </button>
          </div>

          <div className="mt-10 p-4 bg-blue-50 rounded-2xl flex items-center gap-3">
            <span className="text-xl">💳</span>
            <p className="text-[10px] text-blue-800 font-bold">Aceptamos todas las tarjetas de crédito mexicanas y Apple Pay.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
