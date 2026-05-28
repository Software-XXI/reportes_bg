import { analyzeImage } from "../lib/groq.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Falta la imagen" });
  }

  try {
    const response = await analyzeImage(image);
    return res.json({ response });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return res.status(500).json({ error: message });
  }
}
