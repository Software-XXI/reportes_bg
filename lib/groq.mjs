import Groq from "groq-sdk";

export async function analyzeImage(image) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY no configurada");
  }

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

  return chatCompletion.choices[0]?.message?.content || "Sin respuesta";
}
