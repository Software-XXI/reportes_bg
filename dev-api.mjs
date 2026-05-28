import { createServer } from "http";
import { analyzeImage } from "./lib/groq.mjs";

const PORT = 3001;

createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/api/groq" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      try {
        const { image } = JSON.parse(body);
        if (!image) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "Falta la imagen" }));
        }
        const response = await analyzeImage(image);
        res.writeHead(200);
        res.end(JSON.stringify({ response }));
      } catch (error) {
        res.writeHead(500);
        res.end(
          JSON.stringify({
            error:
              error instanceof Error
                ? error.message
                : "Error interno del servidor",
          })
        );
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not found" }));
  }
}).listen(PORT, () => {
  console.log(`API dev server: http://localhost:${PORT}`);
});
