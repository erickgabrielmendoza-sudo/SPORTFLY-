
import React, { useState } from 'react';

const BrandToolkit: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'assets' | 'infra' | 'google' | 'apple'>('assets');

  const logoSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" rx="200" fill="#1E3A8A"/>
    <path d="M250 750L450 250H574L774 750H630L580 610H444L394 750H250ZM475 510H549L512 400L475 510Z" fill="white"/>
    <path d="M800 200L650 320L800 440V200Z" fill="#3B82F6">
      <animateTransform attributeName="transform" type="translate" values="0 0; 0 -30; 0 0" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>`;

  const infraData = [
    { title: "Hosting (Web)", provider: "Vercel Edge Network", desc: "Latencia de 20ms en todo México para cargas instantáneas." },
    { title: "Base de Datos", provider: "Supabase / Firebase", desc: "Sincronización en tiempo real de boletos y disponibilidad." },
    { title: "Pagos", provider: "Stripe / Mercado Pago", desc: "Cifrado de grado bancario para transacciones liguilla." },
    { title: "IA Engine", provider: "Google Gemini 2.5", desc: "Generación de itinerarios dinámicos por ciudad." }
  ];

  return (
    <div className="fixed inset-0 z-[400] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      <div className="bg-white rounded-[40px] max-w-4xl w-full my-8 shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-3xl font-sport text-blue-900 leading-none">SPORTFLY POWER KIT</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-1">Lanzamiento & Web Ready</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-blue-900 p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex bg-slate-50 p-2 gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'assets', label: 'Logos' },
            { id: 'infra', label: 'Web & Infra' },
            { id: 'google', label: 'Play Store' },
            { id: 'apple', label: 'App Store' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`min-w-[120px] flex-1 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-blue-900 text-white shadow-lg' : 'text-gray-500 hover:bg-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8 overflow-y-auto">
          {activeTab === 'assets' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="w-48 h-48 bg-blue-900 rounded-[32px] flex items-center justify-center shadow-xl shadow-blue-200 shrink-0">
                   <div dangerouslySetInnerHTML={{ __html: logoSvg.replace('width="1024" height="1024"', 'width="130" height="130"') }} />
                </div>
                <div className="space-y-6 flex-grow text-center md:text-left">
                  <div>
                    <h4 className="font-black text-blue-900 text-sm uppercase tracking-widest mb-2">Identidad Web Oficial</h4>
                    <p className="text-xs text-gray-500 mb-4">Usa este activo para el favicon de la página web y perfiles sociales oficiales.</p>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100 w-full md:w-auto">
                      Descargar Assets Web
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'infra' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {infraData.map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">{item.title}</p>
                  <p className="font-bold text-blue-900 mb-2">{item.provider}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
              <div className="md:col-span-2 mt-4 p-6 bg-blue-900 rounded-3xl text-white">
                <h4 className="font-sport text-lg mb-2">ESTRATEGIA DOMINIO .MX</h4>
                <p className="text-xs text-blue-100">Registrar sportfly.mx y sportfly.app. Redirigir el .mx a la landing de Vercel para SEO local en México.</p>
              </div>
            </div>
          )}

          {activeTab === 'google' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Nombre en Tienda</p>
                <p className="font-bold text-blue-900">Sportfly: Boletos y Viajes Liga MX</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl">
                <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Descripción Corta</p>
                <p className="text-sm text-gray-600">Sincroniza tus entradas, vuelos y hoteles en un solo paso seguro.</p>
              </div>
            </div>
          )}

          {activeTab === 'apple' && (
             <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-center">
                   <p className="text-blue-900 font-bold mb-2 text-sm">Optimizado para iOS 18</p>
                   <p className="text-xs text-blue-700">Integración nativa con Apple Wallet para boletos de estadio offline.</p>
                </div>
             </div>
          )}
        </div>

        <div className="p-6 bg-blue-50 border-t border-blue-100 sticky bottom-0 text-center">
           <p className="text-[9px] text-blue-800 font-black uppercase tracking-[0.2em]">
             WWW.SPORTFLY.MX • VERSIÓN 1.2.0 LAUNCH READY
           </p>
        </div>
      </div>
    </div>
  );
};

export default BrandToolkit;
