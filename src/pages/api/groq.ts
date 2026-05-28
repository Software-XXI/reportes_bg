import type { APIRoute } from "astro";
import Groq from "groq-sdk";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { image } = body;

    if (!image) {
      return new Response(JSON.stringify({ error: "Falta la imagen" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = import.meta.env.GROQ_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GROQ_API_KEY no configurada" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const groq = new Groq({ apiKey });

    const chatCompletion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
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

    return new Response(
      JSON.stringify({
        response:
          chatCompletion.choices[0]?.message?.content || "Sin respuesta",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error interno del servidor";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
