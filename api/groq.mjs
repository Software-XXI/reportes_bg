import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image } = req.body;

  if (!image) {
    return res.status(400).json({ error: "Falta la imagen" });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY no configurada" });
  }

  try {
    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente que analiza imágenes. Describe detalladamente en español lo que ves en la imagen. Sé conciso pero informativo.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Describe lo que ves en esta imagen:" },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    return res.json({
      response:
        chatCompletion.choices[0]?.message?.content || "Sin respuesta",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return res.status(500).json({ error: message });
  }
}
