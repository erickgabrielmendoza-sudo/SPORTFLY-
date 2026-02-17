
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PackageCard from './components/PackageCard';
import BookingSummary from './components/BookingSummary';
import AuthModal from './components/AuthModal';
import BrandToolkit from './components/BrandToolkit';
import PremiumModal from './components/PremiumModal';
import ProfileView from './components/ProfileView';
import ItineraryModal from './components/ItineraryModal';
import WalletModal from './components/WalletModal';
import DownloadPrompt from './components/DownloadPrompt';
import { SearchState, TravelPackage, UserProfile } from './types';
import { searchSportPackages, generateItinerary } from './geminiService';
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
  const [itinerary, setItinerary] = useState<{content: string, title: string} | null>(null);
  const [wallet, setWallet] = useState<TravelPackage | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowDownload(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(p => ({ ...p, isSearching: true }));
    try {
      const results = await searchSportPackages(search.query, search.flightMode);
      setSearch(p => ({ ...p, results, isSearching: false }));
    } catch (err) { setSearch(p => ({ ...p, isSearching: false })); }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={user} onUpgrade={() => setShowPremium(true)} onSignIn={() => setShowAuth(true)} onProfileClick={() => setShowProfile(true)} onLogoClick={() => setShowToolkit(true)} />
      
      <main>
        <section className="bg-blue-900 py-24 px-4 text-center text-white relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-7xl font-sport mb-6">SPORT<span className="text-amber-400">FLY</span></h1>
            <p className="text-xl text-blue-200 mb-12">Vuelos, hoteles y boletos oficiales en una sola transacción.</p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <input 
                className="w-full p-6 rounded-full text-blue-900 font-bold text-lg outline-none shadow-2xl" 
                placeholder="¿A qué estadio vamos?"
                value={search.query}
                onChange={e => setSearch(p => ({ ...p, query: e.target.value }))}
              />
            </form>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {(search.results.length > 0 ? search.results : SAMPLE_PACKAGES).map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} user={user} onSelect={setSelectedPackage} onTrack={() => {}} />
          ))}
        </section>
      </main>

      {showDownload && <DownloadPrompt onClose={() => setShowDownload(false)} />}
      {showAuth && <AuthModal onSuccess={e => {setUser(p => ({...p, isAuthenticated: true, email: e})); setShowAuth(false)}} onClose={() => setShowAuth(false)} />}
      {showPremium && <PremiumModal onSubscribe={() => setUser(p => ({...p, isPremium: true}))} onClose={() => setShowPremium(false)} />}
      {showProfile && <ProfileView user={user} onClose={() => setShowProfile(false)} onUpdateUser={setUser} onLogout={() => setUser(p => ({...p, isAuthenticated: false}))} onViewWallet={setWallet} />}
      {selectedPackage && <BookingSummary pkg={selectedPackage} user={user} onClose={() => setSelectedPackage(null)} onConfirmPurchase={(p) => setUser(u => ({...u, travelHistory: [p, ...u.travelHistory]}))} />}
      {wallet && <WalletModal pkg={wallet} onClose={() => setWallet(null)} />}
      {showToolkit && <BrandToolkit onClose={() => setShowToolkit(false)} />}
    </div>
  );
};

export default App;
