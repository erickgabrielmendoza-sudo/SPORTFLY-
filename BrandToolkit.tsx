
import React, { useState } from 'react';

interface AuthModalProps {
  onSuccess: (email: string) => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onSuccess, onClose }) => {
  const [step, setStep] = useState<'method' | 'otp' | 'faceid'>('method');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFaceID = () => {
    setStep('faceid');
    setIsProcessing(true);
    // Simulación de escaneo biométrico
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(email || 'usuario@sportfly.mx');
    }, 2500);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep('otp');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-blue-950/80 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="p-8">
          <button onClick={onClose} className="float-right text-gray-400 hover:text-blue-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white relative">
              <span className="font-sport text-2xl">SF</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">Acceso Seguro</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Sin contraseñas. Protegemos tus datos con biometría y códigos únicos.</p>

          {step === 'method' && (
            <div className="space-y-4">
              <form onSubmit={handleSendOTP} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-blue-900 outline-none transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold hover:bg-blue-950 transition-all flex items-center justify-center gap-2">
                  Recibir Código de Acceso
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
              
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-bold">o usa biometría</span></div>
              </div>

              <button 
                onClick={handleFaceID}
                className="w-full border-2 border-blue-900 text-blue-900 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 11.75c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zm6 0c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-2.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                Iniciar con Face ID / Huella
              </button>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-6 text-center">
              <p className="text-sm text-gray-600">Hemos enviado un código a <strong>{email}</strong></p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input key={i} type="text" maxLength={1} className="w-10 h-12 border-2 border-gray-200 rounded-lg text-center font-bold text-xl focus:border-blue-900 outline-none" />
                ))}
              </div>
              <button 
                onClick={() => onSuccess(email)}
                className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold mt-4"
              >
                Verificar y Entrar
              </button>
            </div>
          )}

          {step === 'faceid' && (
            <div className="text-center py-10">
              <div className={`mx-auto w-24 h-24 rounded-full border-4 border-blue-100 flex items-center justify-center mb-6 ${isProcessing ? 'animate-pulse' : ''}`}>
                 <svg className="w-16 h-16 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <p className="font-bold text-blue-900 text-lg">Escaneando Identidad...</p>
              <p className="text-sm text-gray-500">Mantén tu rostro frente a la cámara</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
