
import { GoogleGenAI } from "@google/genai";
import { BAKERY_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBakeryAdvice = async (userPrompt: string) => {
  const productContext = BAKERY_PRODUCTS.map(p => 
    `${p.name} (R${p.price.toFixed(2)}): ${p.description}`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful, charming, and slightly witty bakery assistant named "Rosie" at "Rosé & Crumb Bakery". 
      The bakery is aesthetically pink, elegant, and serves high-end treats in South Africa.
      
      Here is our current menu:
      ${productContext}
      
      User asks: ${userPrompt}
      
      Respond in a way that matches the pink, elegant bakery aesthetic. Recommend specific items from our menu if they fit the user's needs. Use ZAR (R) currency for all prices. If they want something custom, encourage them to describe their dream cake.`,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oh dear, our ovens are a bit overwhelmed! I'm having trouble thinking right now, but our Blush Velvet Cupcakes are always a great choice!";
  }
};
