
import React from 'react';
import { TravelPackage } from '../types';

interface WalletModalProps {
  pkg: TravelPackage;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ pkg, onClose }) => {
  return (
    <div className="fixed inset-0 z-[600] bg-blue-950/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-md w-full my-8 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6 px-4">
          <h2 className="text-2xl font-sport text-white">MI BÓVEDA</h2>
          <button onClick={onClose} className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-8 pb-10">
          {/* TICKET DE ESTADIO */}
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl relative">
            <div className="bg-blue-900 p-6 text-white flex justify-between items-center border-b border-dashed border-white/20">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-300">Acceso Oficial Estadio</p>
                <h3 className="text-xl font-sport">{pkg.event.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black bg-amber-400 text-blue-900 px-2 py-1 rounded-md uppercase">Sportfly ID</span>
              </div>
            </div>
            
            <div className="p-8 text-center bg-white">
              <div className="flex justify-around mb-8">
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Zona</p>
                  <p className="font-bold text-blue-900">{pkg.event.seatZone}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Puerta</p>
                  <p className="font-bold text-blue-900">7 - A</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-400 uppercase">Fecha</p>
                  <p className="font-bold text-blue-900">{pkg.event.date}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-3xl border-2 border-dashed border-gray-100 mb-6 inline-block">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=STADIUM-ACCESS-${pkg.id}`} 
                  alt="QR Estadio" 
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">Escanea en el torniquete oficial</p>
              
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Guardar en Dispositivo
              </button>
            </div>
          </div>

          {/* PASE DE ABORDAR */}
          <div className="bg-blue-600 rounded-[32px] overflow-hidden shadow-2xl relative text-white">
             <div className="p-6 flex justify-between items-center bg-blue-700/50">
               <div>
                  <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Boarding Pass</p>
                  <h3 className="text-xl font-sport">{pkg.flight.airline}</h3>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-black uppercase">{pkg.flight.isRoundTrip ? 'Ida y Vuelta' : 'Solo Ida'}</p>
               </div>
             </div>
             
             <div className="p-8">
               <div className="flex justify-between items-center mb-8">
                  <div className="text-left">
                    <p className="text-3xl font-sport">MEX</p>
                    <p className="text-[9px] font-black uppercase opacity-60">CDMX</p>
                  </div>
                  <div className="flex-grow px-4 flex items-center gap-2">
                    <div className="h-px bg-white/30 flex-grow"></div>
                    <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                    <div className="h-px bg-white/30 flex-grow"></div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-sport">DEST</p>
                    <p className="text-[9px] font-black uppercase opacity-60">{pkg.event.city}</p>
                  </div>
               </div>

               <div className="bg-white p-6 rounded-3xl mb-6">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FLIGHT-PASS-${pkg.id}&color=2563eb`} 
                    alt="QR Vuelo" 
                    className="w-40 h-40 mx-auto"
                  />
                  <p className="text-blue-900 text-center font-black text-[10px] mt-4 uppercase">Confirmación Sincronizada Sportfly</p>
               </div>
               
               <div className="p-4 bg-white/10 rounded-2xl text-[9px] font-black text-center uppercase tracking-widest">
                  Presenta este código en el mostrador de {pkg.flight.airline}
               </div>
             </div>
          </div>
          
          <div className="text-center px-8">
             <p className="text-blue-300 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
               Protección de Identidad Garantizada • Sportfly Security
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
