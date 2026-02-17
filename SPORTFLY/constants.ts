
export const COMMISSION_FEE_MXN = 560;
export const MEMBERSHIP_MONTHLY_MXN = 170;
export const MEMBERSHIP_ANNUAL_MXN = 1660;

export const LIGA_MX_PROVIDERS: Record<string, string> = {
  "América": "Ticketmaster",
  "Cruz Azul": "Ticketmaster",
  "Pumas": "Ticketmaster",
  "Chivas": "Boletomóvil",
  "Tigres": "Boletomóvil",
  "Monterrey": "Superboletos",
  "Toluca": "Boletomóvil"
};

export const SAMPLE_PACKAGES: any[] = [
  {
    id: 'cl-2026-low-1',
    event: {
      id: 'e-cl1',
      name: 'Pumas vs Mazatlán',
      sport: 'Fútbol - Liga MX',
      date: '2026-01-18',
      location: 'Estadio Olímpico Universitario',
      city: 'CDMX',
      ticketPrice: 350,
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800',
      isLiguilla: false,
      seatZone: 'Económica',
      officialProvider: 'Ticketmaster'
    },
    flight: { airline: 'VivaAerobus', price: 1100, isRoundTrip: true },
    hotel: { name: 'City Express', stars: 3, pricePerNight: 850, imageUrl: '' },
    totalDays: 2,
    commission: 560,
    packageType: 'Full'
  }
];
