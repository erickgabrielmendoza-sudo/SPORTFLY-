
import { GoogleGenAI, Type } from "@google/genai";
import { TravelPackage } from "./types";
import { COMMISSION_FEE_MXN } from "./constants";

// Inicialización directa según estándares de seguridad
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchSportPackages = async (query: string, flightMode: 'roundTrip' | 'oneWay'): Promise<TravelPackage[]> => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Actúa como Sportfly, la plataforma líder de viajes deportivos en México. 
  Genera 3 paquetes atractivos de viaje para: "${query}". 
  Reglas:
  - Vuelos: isRoundTrip es ${flightMode === 'roundTrip'}.
  - Evento: Debe ser en México (Liga MX, Selección, etc.).
  - Precios: En Pesos Mexicanos (MXN).
  - Ciudad: Basada en el equipo o estadio.
  
  Devuelve un array JSON compatible con TravelPackage.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              packageType: { type: Type.STRING },
              event: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  city: { type: Type.STRING },
                  ticketPrice: { type: Type.NUMBER },
                  imageUrl: { type: Type.STRING },
                  seatZone: { type: Type.STRING },
                  date: { type: Type.STRING }
                },
                required: ["name", "city", "ticketPrice", "imageUrl", "date"]
              },
              flight: {
                type: Type.OBJECT,
                properties: { 
                  airline: { type: Type.STRING }, 
                  price: { type: Type.NUMBER },
                  isRoundTrip: { type: Type.BOOLEAN }
                },
                required: ["airline", "price", "isRoundTrip"]
              },
              totalDays: { type: Type.NUMBER }
            },
            required: ["id", "packageType", "event", "flight", "totalDays"]
          }
        }
      }
    });
    
    const results = JSON.parse(response.text);
    return results.map((pkg: any) => ({ 
      ...pkg, 
      commission: COMMISSION_FEE_MXN 
    }));
  } catch (error) {
    console.error("Error en búsqueda:", error);
    throw new Error("No pudimos sincronizar los vuelos en este momento.");
  }
};

export const generateItinerary = async (packageName: string, city: string): Promise<string> => {
  const response = await ai.models.generateContent({ 
    model: 'gemini-3-flash-preview', 
    contents: `Como guía experto de Sportfly, crea un itinerario de 48 horas para un fan que visita ${city} para ver ${packageName}. Incluye lugares para comer cerca del estadio y transporte seguro.` 
  });
  return response.text;
};
