import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askCulturalExpert = async (query: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Tidak dapat terhubung ke arsip budaya (Kunci API hilang).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `Anda adalah tetua bijak dan kurator ahli budaya serta tekstil Toraja (Tenun Toraja). 
        Nada bicara Anda hormat, mistis, namun informatif dan modern. Gunakan Bahasa Indonesia yang baik, baku namun puitis.
        Jelaskan makna di balik pola (seperti Pa'tedong, Pa'ssura, dll.), proses pewarnaan alami, dan makna spiritual dari warna (Merah, Kuning, Hitam, Putih).
        Jaga jawaban tetap ringkas (di bawah 100 kata).`,
      }
    });
    return response.text || "Para roh sedang diam hari ini. Silakan coba lagi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Koneksi ke kearifan leluhur tidak dapat dibangun saat ini.";
  }
};