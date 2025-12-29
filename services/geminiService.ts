import { InfractionData } from "../types";

/**
 * AI services have been disabled.
 */
export const analyzeTicketImage = async (base64Image: string, mimeType: string): Promise<Partial<InfractionData>> => {
  console.warn("AI services are disabled.");
  return {};
};

export const generateDefenseArgument = async (data: InfractionData): Promise<string> => {
    console.warn("AI services are disabled.");
    return "Funcionalidade de IA desativada.";
}