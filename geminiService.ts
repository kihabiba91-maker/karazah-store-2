
import { GoogleGenAI } from "@google/genai";

export const generateDescription = async (productName: string): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey || apiKey === 'undefined' || apiKey === '') {
    return "من أشهى حلوياتنا المنزلية، صُنعت يدوياً بمكونات طازجة وجودة عالية لتمنحك طعماً لا يُنسى.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `اكتب وصفاً تسويقياً قصيراً جداً وشهياً باللغة العربية لمنتج حلويات يسمى "${productName}" لمتجر اسمه "كرزة".`,
    });
    return response.text || "وصفة كرزة الخاصة، محضرة بعناية فائقة لتناسب ذوقكم الرفيع.";
  } catch (error) {
    return "تجربة مذاق فريدة تجمع بين الحب والإتقان في كل قطعة.";
  }
};
