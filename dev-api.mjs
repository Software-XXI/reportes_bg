import { createServer } from "http";
import { analyzeImage } from "./lib/gemini.mjs";

const PORT = 3001;

function jsonResponse(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

createServer(async (req, res) => {
  try {
    if (req.url === "/api/gemini" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("error", () => {
        jsonResponse(res, 400, { error: "Error al recibir la solicitud." });
      });
      req.on("end", async () => {
        try {
          let parsed;
          try {
            parsed = JSON.parse(body);
          } catch {
            return jsonResponse(res, 400, { error: "Formato de solicitud inválido." });
          }

          const { image } = parsed;
          if (!image) {
            return jsonResponse(res, 400, { error: "Falta la imagen." });
          }

          const response = await analyzeImage(image);
          jsonResponse(res, 200, { response });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Error interno del servidor.";
          jsonResponse(res, 500, { error: message });
        }
      });
    } else {
      jsonResponse(res, 404, { error: "Ruta no encontrada." });
    }
  } catch {
    jsonResponse(res, 500, { error: "Error interno del servidor." });
  }
}).listen(PORT, () => {
  console.log(`API dev server: http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err.message);
});
