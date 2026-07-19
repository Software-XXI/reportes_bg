import { GoogleGenAI } from "@google/genai";

const ERROR_MESSAGES = {
  API_KEY: "Error de autenticación. Revisa la configuración de la API.",
  QUOTA: "Límite de uso alcanzado. Intenta más tarde.",
  IMAGE: "No se pudo procesar la imagen. Verifica que sea válida.",
  MODEL: "El modelo no está disponible temporalmente.",
  RATE_LIMIT: "Demasiadas solicitudes. Espera unos segundos.",
  DEFAULT: "Error al procesar la solicitud. Intenta de nuevo.",
};

export async function analyzeImage(image) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.API_KEY);
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3-flash-preview",
      input: [
        {
          type: "text",
          text: `Eres un asistente de generación de reportes de recogida de material. Analiza la imagen y extrae la mayor cantidad de información posible.

Devuelve ÚNICAMENTE el reporte en el siguiente formato, llenando los campos con lo que observes en la imagen o inferencias razonables. Si un campo no se puede determinar, déjalo en blanco.

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

    return interaction.output_text || "No se pudo generar el reporte.";
  } catch (error) {
    const status = error.status || error.code;
    const message = error.message || "";

    if (status === 400 || message.includes("image") || message.includes("base64")) {
      throw new Error(ERROR_MESSAGES.IMAGE);
    }
    if (status === 403 || message.includes("API_KEY")) {
      throw new Error(ERROR_MESSAGES.API_KEY);
    }
    if (status === 429 || message.includes("quota") || message.includes("rate")) {
      throw new Error(ERROR_MESSAGES.RATE_LIMIT);
    }
    if (status === 404 || message.includes("model") || message.includes("not found")) {
      throw new Error(ERROR_MESSAGES.MODEL);
    }

    throw new Error(ERROR_MESSAGES.DEFAULT);
  }
}
