import 'piccolore';
import { a4 as decodeKey } from './chunks/astro/server_Dvs7a59B.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DDEFNdEO.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/xxi/personal_projects/reportes_bg/","cacheDir":"file:///home/xxi/personal_projects/reportes_bg/node_modules/.astro/","outDir":"file:///home/xxi/personal_projects/reportes_bg/dist/","srcDir":"file:///home/xxi/personal_projects/reportes_bg/src/","publicDir":"file:///home/xxi/personal_projects/reportes_bg/public/","buildClientDir":"file:///home/xxi/personal_projects/reportes_bg/dist/client/","buildServerDir":"file:///home/xxi/personal_projects/reportes_bg/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/groq","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/groq\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"groq","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/groq.ts","pathname":"/api/groq","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"[data-astro-cid-j7pv25f6],[data-astro-cid-j7pv25f6]:before,[data-astro-cid-j7pv25f6]:after{box-sizing:border-box;margin:0;padding:0}body{font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;background:#0a0a0a;color:#f0f0f0;min-height:100dvh;display:flex;flex-direction:column}header[data-astro-cid-j7pv25f6]{text-align:center;padding:16px;font-size:18px;font-weight:600;letter-spacing:.5px;color:#ccc;flex-shrink:0}.preview-container[data-astro-cid-j7pv25f6]{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#111;min-height:240px}#video[data-astro-cid-j7pv25f6],#capturedPreview[data-astro-cid-j7pv25f6]{width:100%;height:100%;object-fit:contain;display:none}.placeholder[data-astro-cid-j7pv25f6]{color:#555;font-size:15px;text-align:center;padding:20px}.spinner[data-astro-cid-j7pv25f6]{width:40px;height:40px;border:3px solid #222;border-top-color:#888;border-radius:50%;animation:spin .8s linear infinite;display:none}@keyframes spin{to{transform:rotate(360deg)}}.result-area[data-astro-cid-j7pv25f6]{display:none;padding:20px;max-height:35vh;overflow-y:auto;background:#141414;border-top:1px solid #222;flex-shrink:0}.result-area[data-astro-cid-j7pv25f6].show{display:block}.result-area[data-astro-cid-j7pv25f6] p[data-astro-cid-j7pv25f6]{font-size:15px;line-height:1.6;color:#ddd;white-space:pre-wrap}.error-text[data-astro-cid-j7pv25f6]{color:#ff6b6b;font-size:13px;text-align:center;padding:10px 16px;display:none;flex-shrink:0}.error-text[data-astro-cid-j7pv25f6].show{display:block}.result-footer[data-astro-cid-j7pv25f6]{display:flex;justify-content:flex-end;margin-top:12px}.btn-copy[data-astro-cid-j7pv25f6]{background:none;border:1px solid #333;color:#888;padding:6px 14px;border-radius:8px;font-size:13px;cursor:pointer;transition:.15s}.btn-copy[data-astro-cid-j7pv25f6]:active{background:#1a1a1a}.btn-copy[data-astro-cid-j7pv25f6].copied{color:#8fdaaf;border-color:#2a6a4a}.bottom-bar[data-astro-cid-j7pv25f6]{padding:16px 20px;padding-bottom:calc(16px + env(safe-area-inset-bottom));flex-shrink:0;background:#0a0a0a;display:flex;flex-direction:column;gap:10px}.btn[data-astro-cid-j7pv25f6]{width:100%;padding:18px;font-size:17px;font-weight:600;border:none;border-radius:14px;cursor:pointer;transition:background .2s,transform .1s;touch-action:manipulation}.btn[data-astro-cid-j7pv25f6]:active{transform:scale(.97)}.btn-primary[data-astro-cid-j7pv25f6]{background:#3a6ea5;color:#fff}.btn-primary[data-astro-cid-j7pv25f6]:active{background:#2d5885}.btn-primary[data-astro-cid-j7pv25f6].loading{background:#2a4a6a;pointer-events:none}.btn-primary[data-astro-cid-j7pv25f6].done{background:#2a6a4a}.btn-primary[data-astro-cid-j7pv25f6].done:active{background:#1f5238}.btn-secondary[data-astro-cid-j7pv25f6]{background:#2a2a2a;color:#f0f0f0;border:1px solid #444}.btn-secondary[data-astro-cid-j7pv25f6]:active{background:#3a3a3a}#fileInput[data-astro-cid-j7pv25f6]{display:none}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/xxi/personal_projects/reportes_bg/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/groq@_@ts":"pages/api/groq.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BNQVpcGN.mjs","/home/xxi/personal_projects/reportes_bg/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_ARH02TiS.mjs","/home/xxi/personal_projects/reportes_bg/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Dn8cKCPc.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/home/xxi/personal_projects/reportes_bg/src/pages/index.astro?astro&type=script&index=0&lang.ts","(function(){const n=document.getElementById(\"video\"),a=document.getElementById(\"capturedPreview\"),u=document.getElementById(\"placeholder\"),d=document.getElementById(\"spinner\"),s=document.getElementById(\"btnMain\"),p=document.getElementById(\"btnUpload\"),f=document.getElementById(\"fileInput\"),i=document.getElementById(\"errorText\"),g=document.getElementById(\"resultArea\"),v=document.getElementById(\"resultText\"),r=document.getElementById(\"btnCopy\");let c=null,h=!1;function y(){n.style.display=\"none\",a.style.display=\"none\",d.style.display=\"none\",u.style.display=\"none\",i.classList.remove(\"show\"),g.classList.remove(\"show\")}function m(e){y(),u.textContent=e,u.style.display=\"block\"}function o(e,t){s.textContent=e,s.className=\"btn btn-primary\",t&&s.classList.add(t),s.style.display=\"block\",p.style.display=\"none\"}async function b(){try{c=await navigator.mediaDevices.getUserMedia({video:{facingMode:\"environment\",width:{ideal:1920}},audio:!1}),n.srcObject=c,y(),n.style.display=\"block\",h=!0,o(\"Capturar foto\")}catch(e){console.error(e),m('No se pudo acceder a la cámara. Usa \"Subir imagen\".'),s.style.display=\"none\",p.style.display=\"block\",h=!1}}function w(){c&&(c.getTracks().forEach(e=>e.stop()),c=null),n.srcObject=null,h=!1}function x(){const e=document.createElement(\"canvas\");return e.width=n.videoWidth,e.height=n.videoHeight,e.getContext(\"2d\").drawImage(n,0,0),e.toDataURL(\"image/jpeg\",.8).split(\",\")[1]}async function E(e){o(\"Analizando...\",\"loading\"),d.style.display=\"block\",i.classList.remove(\"show\");try{const t=await fetch(\"/api/groq\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({image:e})}),l=await t.json();if(!t.ok)throw new Error(l.error||\"Error del servidor\");n.style.display=\"none\",a.style.display=\"block\",v.textContent=l.response,g.classList.add(\"show\"),o(\"Nueva foto\",\"done\"),d.style.display=\"none\"}catch(t){i.textContent=t.message,i.classList.add(\"show\"),o(\"Reintentar\",\"\"),d.style.display=\"none\"}}function C(e){const t=new FileReader;t.onload=function(l){const L=l.target.result.split(\",\")[1];a.src=l.target.result,y(),a.style.display=\"block\",E(L)},t.readAsDataURL(e)}s.addEventListener(\"click\",function(){const e=s.textContent;if(e===\"Abrir cámara\"){m(\"Solicitando cámara...\"),o(\"Abrir cámara\",\"loading\"),b();return}if(e===\"Capturar foto\"){const t=x();a.src=`data:image/jpeg;base64,${t}`,y(),a.style.display=\"block\",w(),E(t);return}if(e===\"Nueva foto\"){w(),a.style.display=\"none\",g.classList.remove(\"show\"),i.classList.remove(\"show\"),m('Presiona \"Abrir cámara\" para empezar'),o(\"Abrir cámara\");return}if(e===\"Reintentar\"){i.classList.remove(\"show\"),a.style.display=\"none\",m(\"Solicitando cámara...\"),o(\"Abrir cámara\",\"loading\"),b();return}}),p.addEventListener(\"click\",function(){f.click()}),f.addEventListener(\"change\",function(){this.files&&this.files[0]&&C(this.files[0])}),r.addEventListener(\"click\",async function(){try{await navigator.clipboard.writeText(v.textContent),r.textContent=\"✓ Copiado\",r.classList.add(\"copied\"),setTimeout(()=>{r.textContent=\"📋 Copiar\",r.classList.remove(\"copied\")},2e3)}catch{}}),s.addEventListener(\"contextmenu\",function(e){e.preventDefault(),f.click()})})();"]],"assets":[],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"actionBodySizeLimit":1048576,"serverIslandNameMap":[],"key":"2WWWr2rWxKnx2ancbvl6ivk593UhXPDtPgK3oFTufi4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
