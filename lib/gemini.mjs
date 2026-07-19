import { GoogleGenAI } from "@google/genai";

export async function analyzeImage(image) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY no configurada");
  }

  const ai = new GoogleGenAI({ apiKey });

  const interaction = await ai.interactions.create({
    model: "gemini-3-flash-preview",
    input: [
      {
        type: "text",
        text: `Eres un asistente de generación de reportes de recogida de material. Analiza la imagen y extrae la mayor cantidad de información posible.

Devuelve ÚNICAMENTE el reporte en el siguiente formato, llenando los campos con lo que observes en la imagen o inferencias razonables. Si un campo no se puede determinar, déjalo en blanco. En el material agregalo en lista separando por renglón. No agregues texto adicional, ni explicaciones, ni comentarios, así DESCRIPCIÓN (CANTIDAD).

REPORTE DE ENTREGA
👨🏻‍🚒 OPERADOR:
📲 CEL:
📆 FECHA:
📍 UBICACION:
👨🏼‍💼 ENCARGADO DEL LUGAR:
🏧 MARCA:
🚚 CONDUCTOR:
🛒 MATERIAL:
‼️ NOVEDAD:`,
      },
      {
        type: "image",
        data: image,
        mime_type: "image/jpeg",
      },
    ],
  });

  return interaction.output_text || "Sin respuesta";
}
