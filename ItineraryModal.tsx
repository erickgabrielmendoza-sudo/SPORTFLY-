
import React from 'react';
import { UserProfile, TravelPackage, TrackedEvent } from '../types';
import { COMMISSION_FEE_MXN } from '../constants';

interface ProfileViewProps {
  user: UserProfile;
  onClose: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onLogout: () => void;
  onViewItinerary?: (pkg: TravelPackage) => void;
  onViewWallet?: (pkg: TravelPackage) => void;
  onViewPayout?: () => void;
  onRemoveTracker?: (id: string) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onClose, onUpdateUser, onLogout, onViewItinerary, onViewWallet, onViewPayout, onRemoveTracker }) => {
  const displaySavings = user.totalSaved > 0 ? user.totalSaved : user.travelHistory.reduce((acc, pkg) => acc + (pkg.savingsGenerated || COMMISSION_FEE_MXN), 0);

  return (
    <div className="fixed inset-0 z-[350] flex justify-end bg-blue-950/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto flex flex-col">
        {/* Header Perfil */}
        <div className="bg-blue-900 p-8 text-white relative shrink-0">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex items-center gap-6 mb-4">
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black shadow-xl ${user.isPremium ? 'bg-amber-400 text-blue-900 border-4 border-white' : 'bg-white text-blue-900'}`}>
              {user.isPremium ? '👑' : user.email?.[0].toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-sport leading-none">MI PANEL</h2>
              <p className="text-blue-200 text-sm mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8 flex-grow">
          
          {/* SIMULADOR DE AHORRO */}
          <section className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl border-b-4 border-amber-400">
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-4">Simulador de Impacto Sportfly</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-5xl font-sport text-white tracking-tighter">${displaySavings.toLocaleString()}</h3>
              <span className="text-xs font-bold text-blue-300">MXN AHORRADOS</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[9px] text-amber-400 font-black uppercase mb-1">Cero Comisiones</p>
                <p className="text-lg font-sport leading-none">${(user.purchaseCount * COMMISSION_FEE_MXN).toLocaleString()}</p>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[9px] text-blue-300 font-black uppercase mb-1">True-Sync Vuelos</p>
                <p className="text-lg font-sport leading-none">${Math.floor(displaySavings - (user.purchaseCount * COMMISSION_FEE_MXN)).toLocaleString()}</p>
              </div>
            </div>

            {user.isMerchant && (
              <button 
                onClick={onViewPayout}
                className="w-full mt-6 bg-amber-400 text-blue-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-900/20 hover:scale-[1.02] transition-transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                Configuración de Cobros
              </button>
            )}
          </section>

          {/* RASTREADOR DE PRECIOS */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Radar de Precios Live</h3>
              <div className="flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping"></div>
                 <span className="text-[9px] font-black text-amber-500 uppercase">Sincronizado</span>
              </div>
            </div>
            
            {user.trackedEvents.length > 0 ? (
              <div className="space-y-3">
                {user.trackedEvents.map((tracker) => (
                  <div key={tracker.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between group">
                    <div>
                      <p className="text-[10px] font-black text-blue-900 uppercase leading-none mb-1">{tracker.eventName}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 line-through">${tracker.initialPrice}</span>
                        <span className="text-sm font-black text-blue-900">${tracker.currentPrice}</span>
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                          tracker.status === 'Bajando' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {tracker.status}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveTracker && onRemoveTracker(tracker.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 border-2 border-dashed border-slate-100 rounded-[32px] p-8 text-center">
                <p className="text-xl mb-2">📡</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activa el Radar en tus partidos favoritos</p>
              </div>
            )}
          </section>

          {/* BÓVEDA DIGITAL / TICKETS */}
          <section>
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Bóveda de Boletos Sincronizados</h3>
            {user.travelHistory.length > 0 ? (
              <div className="space-y-4">
                {user.travelHistory.map((pkg) => (
                  <div key={pkg.id} className="group relative overflow-hidden bg-white border border-gray-200 rounded-[32px] p-6 hover:border-blue-900 transition-all shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl">🏟️</div>
                         <div>
                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">{pkg.event.date}</p>
                            <p className="text-sm font-black text-blue-900 uppercase leading-none">{pkg.event.name}</p>
                         </div>
                      </div>
                      <div className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-[7px] font-black uppercase border border-green-200">
                        LISTO PARA USAR
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onViewWallet && onViewWallet(pkg)}
                        className="flex-grow bg-blue-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                        Ver Boletos
                      </button>
                      <button 
                        onClick={() => onViewItinerary && onViewItinerary(pkg)}
                        className="w-14 bg-slate-50 text-blue-900 rounded-2xl flex items-center justify-center border border-slate-100 hover:bg-slate-100 transition-colors"
                        title="Ver Itinerario IA"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-[40px] border-2 border-dashed border-gray-100">
                <p className="text-3xl mb-3">🎫</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tus tickets aparecerán aquí después de la compra</p>
              </div>
            )}
          </section>
        </div>

        <div className="p-8 border-t border-gray-100 shrink-0">
          <button onClick={onLogout} className="w-full py-4 rounded-2xl border-2 border-red-100 text-red-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 transition-colors">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
