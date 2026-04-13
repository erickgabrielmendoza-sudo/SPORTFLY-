
import React, { useState } from 'react';
import { TravelPackage, UserProfile } from '../types';
import { COMMISSION_FEE_MXN } from '../constants';

interface BookingSummaryProps {
  pkg: TravelPackage;
  user: UserProfile;
  onClose: () => void;
  onConfirmPurchase?: (pkg: TravelPackage, totalSaved: number) => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ pkg, user, onClose, onConfirmPurchase }) => {
  const [view, setView] = useState<'summary' | 'payment' | 'success'>('summary');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const hotelTotal = pkg.hotel ? (pkg.hotel.pricePerNight * (pkg.totalDays - 1 || 1)) : 0;
  const premiumFlightDiscountUnit = user.isPremium ? (pkg.flight.price * 0.1) : 0;
  const unitCommission = user.isPremium ? 0 : COMMISSION_FEE_MXN;
  
  const unitTotal = pkg.event.ticketPrice + (pkg.flight.price - premiumFlightDiscountUnit) + hotelTotal + unitCommission;
  const finalTotal = unitTotal * quantity;
  const totalSavingsGenerated = ((user.isPremium ? COMMISSION_FEE_MXN : 0) + premiumFlightDiscountUnit) * quantity;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // NOTA PARA EL DUEÑO DE SPORTFLY:
    // Para recibir dinero REAL, aquí deberías llamar a la API de Mercado Pago o Stripe.
    // El dinero se depositaría en tu cuenta de vendedor de esa plataforma.
    
    setTimeout(() => {
      setIsProcessing(false);
      if (onConfirmPurchase) onConfirmPurchase(pkg, totalSavingsGenerated);
      setView('success');
    }, 2000);
  };

  if (view === 'success') {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="bg-white rounded-[40px] w-full max-w-2xl p-8 md:p-12 my-8 text-center shadow-2xl animate-in zoom-in duration-300">
           <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
           </div>
           <h2 className="text-3xl font-sport text-blue-900 mb-2">¡Pago Confirmado!</h2>
           <p className="text-gray-500 mb-8">Has ahorrado ${totalSavingsGenerated.toLocaleString()} MXN con Sportfly.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
              <div className="bg-slate-50 border-2 border-dashed border-gray-200 rounded-[32px] p-6">
                <p className="text-[10px] font-black text-blue-900 uppercase mb-4 tracking-widest">E-Ticket Estadio</p>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=STADIUM-${pkg.event.id}`} alt="QR" className="mx-auto w-40 h-40 bg-white p-2 rounded-xl shadow-sm" />
              </div>
              <div className="bg-blue-900 border-2 border-dashed border-blue-800 rounded-[32px] p-6">
                <p className="text-[10px] font-black text-blue-200 uppercase mb-4 tracking-widest">Boarding Pass {pkg.flight.airline}</p>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FLIGHT-${pkg.id}&color=1e3a8a`} alt="QR" className="mx-auto w-40 h-40 bg-white p-2 rounded-xl shadow-sm" />
              </div>
           </div>

           <button onClick={onClose} className="w-full bg-blue-900 text-white py-5 rounded-3xl font-bold uppercase tracking-widest shadow-xl">Ver en mi Perfil</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 my-8">
        <div className="bg-blue-900 p-8 text-white flex justify-between items-center">
          <h2 className="text-2xl font-sport uppercase tracking-tighter">Resumen de Compra</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-8">
          {view === 'summary' ? (
            <>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-gray-100">
                  <span className="text-xs font-black text-gray-500 uppercase">Boletos</span>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-white border border-gray-200 font-bold">-</button>
                    <span className="font-sport">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full bg-white border border-gray-200 font-bold">+</button>
                  </div>
                </div>

                <div className="space-y-2 text-sm border-b pb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Evento: {pkg.event.name}</span>
                    <span className="font-bold text-blue-900">${(pkg.event.ticketPrice * quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vuelo: {pkg.flight.airline}</span>
                    <span className="font-bold text-blue-900">${((pkg.flight.price - premiumFlightDiscountUnit) * quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Comisión Logística Sportfly</span>
                    <span className="font-bold text-blue-900">{user.isPremium ? 'GRATIS' : `$${(COMMISSION_FEE_MXN * quantity).toLocaleString()}`}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs font-black text-gray-400 uppercase">Total a Pagar</span>
                  <span className="text-4xl font-sport text-blue-900 leading-none">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <button onClick={() => setView('payment')} className="w-full bg-blue-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Elegir método de pago</button>
            </>
          ) : (
            <form onSubmit={handlePay} className="space-y-4">
               <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-4">
                 <p className="text-[10px] font-black text-blue-800 uppercase text-center mb-1">Protección Sportfly Secure</p>
                 <p className="text-[11px] text-blue-600 text-center">Tus datos están cifrados de extremo a extremo.</p>
               </div>
               
               <input type="text" placeholder="Nombre en la tarjeta" className="w-full p-4 rounded-2xl bg-slate-50 border border-gray-200 font-bold text-blue-900 outline-none" required />
               <input type="text" placeholder="#### #### #### ####" className="w-full p-4 rounded-2xl bg-slate-50 border border-gray-200 font-bold text-blue-900 outline-none" required />
               
               <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="MM/YY" className="p-4 rounded-2xl bg-slate-50 border border-gray-200 font-bold text-blue-900 outline-none" required />
                 <input type="password" placeholder="CVV" className="p-4 rounded-2xl bg-slate-50 border border-gray-200 font-bold text-blue-900 outline-none" required />
               </div>

               <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full ${isProcessing ? 'bg-gray-400' : 'bg-green-600'} text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all`}
               >
                 {isProcessing ? 'Procesando Sincronización...' : `Pagar $${finalTotal.toLocaleString()}`}
               </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
