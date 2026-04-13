
import React from 'react';
import { UserProfile } from '../types';
import { Plane, Trophy } from 'lucide-react';

export default ({ user, onUpgrade, onSignIn, onLogoClick, onProfileClick }: any) => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b p-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={onLogoClick}>
        <div className="bg-blue-900 text-white p-2 rounded-lg font-sport relative overflow-visible">
          <span className="relative z-10">SF</span>
          <div className="absolute -top-2 -right-2 text-amber-400 rotate-45 group-hover:scale-125 transition-transform">
            <Plane size={14} strokeWidth={3} />
          </div>
          <div className="absolute -bottom-2 -left-2 text-amber-400 group-hover:scale-125 transition-transform">
            <Trophy size={14} strokeWidth={3} />
          </div>
        </div>
        <span className="font-sport text-blue-900 text-xl hidden sm:block">Sportfly</span>
      </div>
      <div className="flex gap-4">
        {!user.isPremium && <button onClick={onUpgrade} className="bg-amber-400 px-4 py-2 rounded-xl font-bold text-xs uppercase">Premium</button>}
        {user.isAuthenticated ? (
          <button onClick={onProfileClick} className="bg-blue-100 p-2 rounded-full px-4 font-bold text-blue-900">{user.email[0].toUpperCase()}</button>
        ) : (
          <button onClick={onSignIn} className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold">Entrar</button>
        )}
      </div>
    </div>
  </header>
);
