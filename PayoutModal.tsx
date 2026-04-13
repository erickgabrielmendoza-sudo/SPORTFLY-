
import React from 'react';

export default ({ onClose }: any) => (
  <div className="fixed bottom-6 left-4 right-4 z-[100] bg-blue-900 p-6 rounded-[32px] text-white flex flex-col md:flex-row items-center gap-6 shadow-2xl border border-white/10 animate-in slide-in-from-bottom-full">
    <div className="bg-white text-blue-900 p-4 rounded-2xl font-sport">SF</div>
    <div className="flex-grow text-center md:text-left">
      <h4 className="font-sport text-lg">SPORTFLY EN TU CELULAR</h4>
      <p className="text-blue-200 text-xs">Acceso offline a tus boletos y alertas de liguilla.</p>
    </div>
    <div className="flex gap-2 w-full md:w-auto">
      <button className="flex-1 md:flex-none bg-white text-blue-900 px-6 py-3 rounded-xl font-bold text-xs uppercase">Google Play</button>
      <button className="flex-1 md:flex-none bg-blue-800 px-6 py-3 rounded-xl font-bold text-xs uppercase">App Store</button>
      <button onClick={onClose} className="p-2 opacity-50">×</button>
    </div>
  </div>
);
