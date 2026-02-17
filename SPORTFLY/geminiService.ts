
import { GoogleGenAI, Type } from "@google/genai";
import { TravelPackage } from "./types";
import { COMMISSION_FEE_MXN, LIGA_MX_PROVIDERS } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const searchSportPackages = async (query: string, flightMode: 'roundTrip' | 'oneWay'): Promise<TravelPackage[]> => {
  const model = 'gemini-3-flash-preview';
  const prompt = `Actúa como Sportfly. Genera paquetes para: "${query}". 
  Incluye vuelos (isRoundTrip: ${flightMode === 'roundTrip'}) y opciones de hotel si es Full. 
  Usa formato JSON compatible con TravelPackage array.`;

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
              packageType: { type: Type.STRING, enum: ['Full', 'FlightOnly'] },
              event: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  city: { type: Type.STRING },
                  ticketPrice: { type: Type.NUMBER },
                  imageUrl: { type: Type.STRING },
                  seatZone: { type: Type.STRING }
                }
              },
              flight: {
                type: Type.OBJECT,
                properties: { 
                  airline: { type: Type.STRING }, 
                  price: { type: Type.NUMBER },
                  isRoundTrip: { type: Type.BOOLEAN }
                }
              },
              hotel: { type: Type.OBJECT, nullable: true },
              totalDays: { type: Type.NUMBER }
            }
          }
        }
      }
    });
    return JSON.parse(response.text).map((pkg: any) => ({ ...pkg, commission: COMMISSION_FEE_MXN }));
  } catch (error) {
    throw new Error("Error de sincronización.");
  }
};

export const generateItinerary = async (packageName: string, city: string): Promise<string> => {
  const response = await ai.models.generateContent({ 
    model: 'gemini-3-flash-preview', 
    contents: `Crea un itinerario para un fan de fútbol en ${city} para el evento ${packageName}.` 
  });
  return response.text || "No disponible.";
};
