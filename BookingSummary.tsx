
import React from 'react';
import { COMMISSION_FEE_MXN } from '../constants';

export default ({ pkg, user, onSelect }: any) => {
  const price = pkg.event.ticketPrice + pkg.flight.price + (user.isPremium ? 0 : COMMISSION_FEE_MXN);
  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-lg border hover:shadow-2xl transition-all">
      <img src={pkg.event.imageUrl} className="h-48 w-full object-cover" />
      <div className="p-6">
        <h3 className="font-sport text-blue-900 text-xl mb-2">{pkg.event.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{pkg.event.city} • {pkg.flight.airline}</p>
        <div className="border-t pt-4 flex justify-between items-end">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase">Total Pack</p>
            <p className="text-3xl font-sport text-blue-900">${price.toLocaleString()}</p>
          </div>
          <button onClick={() => onSelect(pkg)} className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold text-xs">RESERVAR</button>
        </div>
      </div>
    </div>
  );
};
