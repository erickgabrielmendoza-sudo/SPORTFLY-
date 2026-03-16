
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PackageCard from './components/PackageCard';
import BookingSummary from './components/BookingSummary';
import AuthModal from './components/AuthModal';
import BrandToolkit from './components/BrandToolkit';
import PremiumModal from './components/PremiumModal';
import ProfileView from './components/ProfileView';
import DownloadPrompt from './components/DownloadPrompt';
import WalletModal from './components/WalletModal';
import { SearchState, TravelPackage, UserProfile } from './types';
import { searchSportPackages } from './geminiService';
import { SAMPLE_PACKAGES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    purchaseCount: 0, totalSaved: 0, isPremium: false, isAuthenticated: false,
    travelHistory: [], trackedEvents: [], notifications: { matchAlerts: true, priceDrops: true, teamNews: true }
  });

  const [search, setSearch] = useState<SearchState>({ query: '', isSearching: false, results: [], error: null, flightMode: 'roundTrip' });
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showToolkit, setShowToolkit] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [wallet, setWallet] = useState<TravelPackage | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowDownload(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.query.trim()) return;
    
    setSearch(p => ({ ...p, isSearching: true, error: null }));
    try {
      const results = await searchSportPackages(search.query, search.flightMode);
      setSearch(p => ({ ...p, results, isSearching: false }));
    } catch (err) { 
      setSearch(p => ({ ...p, isSearching: false, error: "No pudimos conectar con los servidores de la liga. Reintenta." })); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Header 
        user={user} 
        onUpgrade={() => setShowPremium(true)} 
        onSignIn={() => setShowAuth(true)} 
        onProfileClick={() => setShowProfile(true)} 
        onLogoClick={() => setShowToolkit(true)} 
      />
      
      <main>
        {/* Hero Section Re-imagined */}
        <section className="relative bg-[#0a192f] py-28 px-4 text-center overflow-hidden">
          {/* Abstract background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-block bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 mb-6">
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Oficial Partner Liga MX 2026</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-sport mb-6 text-white tracking-tighter">
              SPORT<span className="text-amber-400">FLY</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200/80 mb-12 max-w-2xl mx-auto font-medium">
              Vuelos, hoteles y boletos oficiales sincronizados en tiempo real para el fan verdadero.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
              <input 
                className={`w-full p-6 md:p-8 rounded-[32px] text-blue-900 font-bold text-lg outline-none shadow-2xl transition-all border-4 ${search.isSearching ? 'border-amber-400 bg-white' : 'border-transparent bg-white/95 focus:bg-white focus:border-blue-500'}`}
                placeholder="¿A qué estadio vamos hoy?"
                value={search.query}
                onChange={e => setSearch(p => ({ ...p, query: e.target.value }))}
                disabled={search.isSearching}
              />
              <button 
                type="submit"
                disabled={search.isSearching}
                className="absolute right-4 top-4 bottom-4 px-8 bg-blue-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
              >
                {search.isSearching ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>BUSCAR <span className="hidden sm:inline">VUELOS</span></>
                )}
              </button>
            </form>

            {search.error && (
              <p className="mt-4 text-red-400 text-sm font-bold bg-red-400/10 inline-block px-4 py-2 rounded-xl">{search.error}</p>
            )}
          </div>
        </section>

        {/* Results / Featured Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-xs font-black text-blue-900/40 uppercase tracking-[0.3em] mb-2">Resultados en Tiempo Real</h2>
              <h3 className="text-3xl font-sport text-blue-900">Paquetes Disponibles</h3>
            </div>
            {search.results.length > 0 && (
              <button onClick={() => setSearch(p => ({...p, results: []}))} className="text-xs font-bold text-blue-600 hover:underline">Limpiar búsqueda</button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {search.isSearching ? (
              // Skeleton Loading
              [1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-[32px] p-6 space-y-4 animate-pulse-soft border border-slate-100">
                  <div className="h-48 bg-slate-100 rounded-2xl"></div>
                  <div className="h-6 bg-slate-100 w-3/4 rounded-md"></div>
                  <div className="h-4 bg-slate-100 w-1/2 rounded-md"></div>
                </div>
              ))
            ) : (
              (search.results.length > 0 ? search.results : SAMPLE_PACKAGES).map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} user={user} onSelect={setSelectedPackage} />
              ))
            )}
          </div>
        </section>
      </main>

      {/* Modales y Overlays */}
      {showDownload && <DownloadPrompt onClose={() => setShowDownload(false)} />}
      {showAuth && <AuthModal onSuccess={e => {setUser(p => ({...p, isAuthenticated: true, email: e})); setShowAuth(false)}} onClose={() => setShowAuth(false)} />}
      {showPremium && <PremiumModal onSubscribe={() => setUser(p => ({...p, isPremium: true}))} onClose={() => setShowPremium(false)} />}
      {showProfile && <ProfileView user={user} onClose={() => setShowProfile(false)} onUpdateUser={setUser} onLogout={() => setUser(p => ({...p, isAuthenticated: false, isPremium: false}))} onViewWallet={setWallet} />}
      {selectedPackage && <BookingSummary pkg={selectedPackage} user={user} onClose={() => setSelectedPackage(null)} onConfirmPurchase={(p) => setUser(u => ({...u, travelHistory: [p, ...u.travelHistory], purchaseCount: u.purchaseCount + 1}))} />}
      {wallet && <WalletModal pkg={wallet} onClose={() => setWallet(null)} />}
      {showToolkit && <BrandToolkit onClose={() => setShowToolkit(false)} />}
    </div>
  );
};

export default App;
