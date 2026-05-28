import { a2 as createComponent, af as renderHead, ai as renderScript, ak as renderTemplate } from '../chunks/astro/server_Dvs7a59B.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es" data-astro-cid-j7pv25f6> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="theme-color" content="#0a0a0a"><title>Reportes BG</title>${renderHead()}</head> <body data-astro-cid-j7pv25f6> <header data-astro-cid-j7pv25f6>Reportes BG</header> <div class="preview-container" data-astro-cid-j7pv25f6> <video id="video" autoplay playsinline muted data-astro-cid-j7pv25f6></video> <img id="capturedPreview" alt="Preview" data-astro-cid-j7pv25f6> <div class="spinner" id="spinner" data-astro-cid-j7pv25f6></div> <div class="placeholder" id="placeholder" data-astro-cid-j7pv25f6>
Presiona "Abrir cámara" para empezar
</div> </div> <div class="error-text" id="errorText" data-astro-cid-j7pv25f6></div> <div class="result-area" id="resultArea" data-astro-cid-j7pv25f6> <p id="resultText" data-astro-cid-j7pv25f6></p> <div class="result-footer" data-astro-cid-j7pv25f6> <button class="btn-copy" id="btnCopy" data-astro-cid-j7pv25f6>📋 Copiar</button> </div> </div> <div class="bottom-bar" data-astro-cid-j7pv25f6> <button class="btn btn-primary" id="btnMain" data-astro-cid-j7pv25f6>Abrir cámara</button> <button class="btn btn-secondary" id="btnUpload" style="display:none" data-astro-cid-j7pv25f6>
Subir imagen
</button> <input type="file" id="fileInput" accept="image/*" data-astro-cid-j7pv25f6> </div> ${renderScript($$result, "/home/xxi/personal_projects/reportes_bg/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/home/xxi/personal_projects/reportes_bg/src/pages/index.astro", void 0);

const $$file = "/home/xxi/personal_projects/reportes_bg/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
