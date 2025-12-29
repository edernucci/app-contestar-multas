import { GoogleGenAI, Type } from "@google/genai";
import { InfractionData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes an image of a traffic ticket/fine and extracts relevant data.
 */
export const analyzeTicketImage = async (base64Image: string, mimeType: string): Promise<Partial<InfractionData>> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Efficient model for image extraction
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: `Analyze this image of a traffic fine or vehicle document. 
            Extract the license plate, date of occurrence (YYYY-MM-DD), time, and the concessionaire or authority responsible.
            Return the data strictly as a valid JSON object. Do not wrap the response in markdown code blocks.
            
            Expected JSON structure:
            {
              "plate": "ABC-1234",
              "date": "YYYY-MM-DD",
              "time": "HH:MM",
              "concessionaire": "Name of Authority"
            }`
          },
        ],
      },
      // Config for JSON mode removed as it is not supported by gemini-2.5-flash-image
    });

    let jsonText = response.text || "{}";
    
    // Clean up potential markdown formatting from the response
    jsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
        return JSON.parse(jsonText);
    } catch (parseError) {
        console.warn("Failed to parse AI response as JSON:", jsonText);
        return {};
    }
  } catch (error) {
    console.error("Error analyzing ticket image:", error);
    throw error;
  }
};

/**
 * Generates a defense argument based on the infraction details.
 */
export const generateDefenseArgument = async (data: InfractionData): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Draft a formal and polite defense argument (in Portuguese) for a traffic violation contestation.
            
            Details:
            Plate: ${data.plate}
            Date: ${data.date}
            Authority: ${data.concessionaire}
            Context: The user claims the signage was poor and obscured by vegetation.

            Keep it professional, concise (under 150 words), and ready to be submitted to a Brazilian traffic authority.`,
        });

        return response.text || "";
    } catch (error) {
        console.error("Error generating defense:", error);
        return "Não foi possível gerar a defesa automaticamente no momento.";
    }
}
