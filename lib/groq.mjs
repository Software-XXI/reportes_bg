import Groq from "groq-sdk";

export async function analyzeImage(image) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY no configurada");
  }

  const groq = new Groq({ apiKey });

  const chatCompletion = await groq.chat.completions.create({
    model: "qwen/qwen3.6-27b",
    messages: [
      {
        role: "system",
        content: `Eres un asistente de generación de reportes de recogida de material. Analiza la imagen y extrae la mayor cantidad de información posible.
          Devuelve ÚNICAMENTE el reporte en el siguiente formato, llenando los campos con lo que observes en la imagen o inferencias razonables. Si un campo no se puede determinar, déjalo en blanco.
          REPORTE DE ENTREGA
          👨🏻‍🚒 OPERADOR: [nombres de operadores si se ven o se infieren]
          📲 CEL: [Déjalo en blanco]
          📆 FECHA: [fecha actual si se infiere del contexto, o déjalo en blanco]
          📍 UBICACION: [lugar reconocible en la imagen]
          👨🏼‍💼 ENCARGADO DEL LUGAR: [persona a cargo si se identifica o contacto si se ve alguno]
          🏧 MARCA: [la marca normalmente se intuye de la descripción, observa la marca que más se repite en la descripción]
          🚚 CONDUCTOR: [conductor si se identifica]
          🛒 MATERIAL: [describe el material que ves y cantidad en este formato: nombre (cantidad) ]
          ‼️ NOVEDAD: Déjalo en blanco`,
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
