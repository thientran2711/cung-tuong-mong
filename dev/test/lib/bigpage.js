/* KK63 HARNESS-BIGPAGE (MAIN 183, root found by TMK-WARN-2): a test that serves the WHOLE game page with route.fulfill({body}) (or {path}) sends it
   over the DevTools protocol in one message; past ~20.65 MB the page target CLOSES on the first tab click (no crash / nav event). LIVE 5fb13d60 is
   20.59 MB, so every branch reaches it soon.
   FIX (one line per test): `require('./lib/bigpage')` (path relative to the test) BEFORE launching. It wraps chromium/firefox/webkit .launch /
   .launchPersistentContext so that every route handler registered on a context or page gets a route whose fulfill(), for a body over BIG bytes
   (default 4 MB, env BIGPAGE_MIN), serves the bytes from a tiny local HTTP server and CONTINUES the request there (route.continue({url})):
   same URL in the page (http://ctm.test/…, LIVE url, game.local …: localStorage, relative paths, other routes unchanged), same status / type,
   never through the protocol. Small bodies (images, 404s, json) keep the normal fulfill. A browser launched with a proxy must bypass 127.0.0.1.
   Explicit form for new tests: `await require('./lib/bigpage').pageRoute(ctx, match, html)`.
   Test: node dev/test/bigpage-check.js (a 21.4 MB page: plain fulfill closes on a tab click, the patched one survives). */
const http=require('http');const fs=require('fs');
const BIG=+(process.env.BIGPAGE_MIN||4e6);const SRV=new Map();let seq=0;
function serve(body,ct,status){const key=body;if(SRV.has(key))return SRV.get(key);
 const p=new Promise((ok,ko)=>{const s=http.createServer((q,r)=>{r.writeHead(status||200,{'content-type':ct||'text/html; charset=utf-8','content-length':Buffer.byteLength(body),'cache-control':'no-store','access-control-allow-origin':'*'});r.end(q.method==='HEAD'?undefined:body)});
  s.on('error',ko);s.listen(0,'127.0.0.1',()=>{s.unref();ok(`http://127.0.0.1:${s.address().port}/b${seq++}`)})});SRV.set(key,p);return p}
function hdr(o,k){const h=o.headers||{};for(const x of Object.keys(h))if(x.toLowerCase()===k)return h[x];return null}
const patchedRoute=new WeakSet();
function patchRoute(r){const P=Object.getPrototypeOf(r);if(!P||patchedRoute.has(P))return;patchedRoute.add(P);const f0=P.fulfill;
 P.fulfill=async function(o){try{if(o&&!o.response){let body=o.body;if(body==null&&o.path)body=fs.statSync(o.path).size>BIG?fs.readFileSync(o.path):null;
   if(body!=null&&(typeof body==='string'?Buffer.byteLength(body):body.length)>BIG){const ct=o.contentType||hdr(o,'content-type')||(o.path&&/\.html?$/.test(o.path)?'text/html; charset=utf-8':'application/octet-stream');
    const u=await serve(typeof body==='string'?body:Buffer.from(body),ct,o.status);return this.continue({url:u})}}}catch(e){}return f0.call(this,o)}}
const wrapH=h=>typeof h!=='function'?h:(h.__bp||(h.__bp=function(r,q){try{patchRoute(r)}catch(e){}return h.apply(this,arguments)}));
const patchedObj=new WeakSet();
function patchRoutable(o){const P=o&&Object.getPrototypeOf(o);if(!P||patchedObj.has(P))return o;patchedObj.add(P);
 if(P.route){const r0=P.route;P.route=function(m,h,opt){return r0.call(this,m,wrapH(h),opt)}}
 if(P.unroute){const u0=P.unroute;P.unroute=function(m,h){return u0.call(this,m,h&&h.__bp||h)}}
 if(P.newPage&&!P.__bpNP){const n0=P.newPage;P.newPage=async function(){const pg=await n0.apply(this,arguments);patchRoutable(pg);return pg}}
 if(P.newContext){const c0=P.newContext;P.newContext=async function(){const c=await c0.apply(this,arguments);patchRoutable(c);return c}}
 return o}
function patchType(t){if(!t||t.__bp)return;t.__bp=1;const l0=t.launch,p0=t.launchPersistentContext;
 if(l0)t.launch=async function(){const b=await l0.apply(this,arguments);patchRoutable(b);return b};
 if(p0)t.launchPersistentContext=async function(){const c=await p0.apply(this,arguments);patchRoutable(c);(c.pages()||[]).forEach(patchRoutable);return c}}
try{const pw=require('playwright');['chromium','firefox','webkit'].forEach(k=>patchType(pw[k]))}catch(e){}
async function pageRoute(ctx,match,html,ct){patchRoutable(ctx);const local=await serve(html,ct);await ctx.route(match,r=>r.request().method()==='GET'?r.continue({url:local}):r.fulfill({status:200,body:html,contentType:ct||'text/html; charset=utf-8'}));return local}
module.exports={pageRoute,serve,patchRoutable};
