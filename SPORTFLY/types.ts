
export interface SportEvent {
  id: string;
  name: string;
  sport: string;
  date: string;
  location: string;
  city: string;
  ticketPrice: number;
  imageUrl: string;
  isLiguilla: boolean;
  seatZone: 'Económica' | 'Preferente' | 'VIP/Palco';
  officialProvider?: string;
}

export interface Flight {
  id: string;
  airline: 'AeroMéxico' | 'Volaris' | 'VivaAerobus';
  departure: string;
  arrival: string;
  price: number;
  isRoundTrip: boolean;
  evaluationNote?: string;
  isVerified?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  pricePerNight: number;
  imageUrl: string;
  isVerified?: boolean;
}

export interface TravelPackage {
  id: string;
  event: SportEvent;
  flight: Flight;
  hotel?: Hotel;
  totalDays: number;
  commission: number;
  isPremiumOnly?: boolean;
  packageType: 'Full' | 'FlightOnly';
  purchaseDate?: string;
  savingsGenerated?: number;
}

export interface TrackedEvent {
  id: string;
  eventName: string;
  initialPrice: number;
  currentPrice: number;
  lastChecked: string;
  status: 'Bajando' | 'Estable' | 'Subiendo';
}

export interface UserProfile {
  purchaseCount: number;
  totalSaved: number;
  isPremium: boolean;
  premiumType?: 'Mensual' | 'Anual';
  isAuthenticated: boolean;
  email?: string;
  favoriteTeam?: string;
  travelHistory: TravelPackage[];
  trackedEvents: TrackedEvent[];
  notifications: {
    matchAlerts: boolean;
    priceDrops: boolean;
    teamNews: boolean;
  };
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: TravelPackage[];
  error: string | null;
  flightMode: 'roundTrip' | 'oneWay';
}
