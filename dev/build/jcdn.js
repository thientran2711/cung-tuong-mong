/* ================= jcdn: PICTURES FROM CLOUDFLARE (owner 11/15 01:30Z "toàn bộ ảnh đưa lên Cloudflare") — dev/art/CDN.md =================
   Every picture (img/…) lives in the R2 bucket ctm-img, served by the Worker below; nothing under img/ is in git any more.
   IMG_BASE is THE one constant: dev/build/assemble.py reads it from this line and rewrites every "img/…", 'img/…', `img/…`, url(img/…)
   in the game source to IMG_BASE+"img/…" (so source code keeps writing plain "img/x.webp"). Build with CTM_IMG_BASE= (empty) to keep
   relative paths for a local test against pulled pictures (python3 dev/site/cdn_sync.py --pull all).
   At run time this module (first in assemble.py):
   1. manifests: fetch() of a *.json under IMG_BASE has every "img/…" value made absolute (FIGURES*.json, EVENTS.json, MANIFEST.json,
      map-hotspots.json…), so new art + manifest pushed with cdn_sync shows without rebuilding the game (j39 re-reads every 5 min).
   2. a picture that fails: same-origin img/… (old save, missed path) → moved to IMG_BASE; a CDN picture → one retry after 1.5 s
      (?r=1); still failing → the element's own onerror runs, or (none) the picture is hidden (visibility) so no broken icon shows.
   Test hook: window.KCDN {base, rewrites, retries, hidden}. */
const IMG_BASE="https://ctm-img.victoria-tntt.workers.dev/";
const IMG_U=p=>typeof p==="string"&&/^(\.\/)?img\//.test(p)?IMG_BASE+p.replace(/^\.\//,""):p;
(function(){
const K=window.KCDN={base:IMG_BASE,rewrites:0,retries:0,hidden:0,mretries:0,mfail:0};
window.IMG_BASE=IMG_BASE;window.IMG_U=IMG_U;
/* 1. manifests — THE one loader of every img/*.json (FIGURES*, ACTS, INFO, TN, EVENTS, *-fit, hotspots…). review/coop-fig-retry: a weak line made the
   first read fail (offline blip, 5xx, 429, cut-off body = bad JSON) and the callers (j28 one-shot, j39, jht, jkc, jkcg, j73, jfigx…) just swallowed it,
   so the full-body figures stayed blank until the next 5-min re-read. Now a failed / non-ok / unparsable read is retried here, MRETRY back-off waits
   (1 s, 2.5 s, 6 s = bounded, ~9.5 s at most); 404 / 403 / 410 = the file is really absent (optional manifests) = no retry; browser offline (navigator.onLine false) = no retry (nothing can arrive; the service-worker cache path stays). The caller's own .then
   runs once, after the good answer, so it re-draws exactly as on a good line. No second copy of this anywhere. Test hook: KCDN.mretries / mfail. */
const MRETRY=[1000,2500,6000],NORETRY={404:1,403:1,410:1};
const F=window.fetch&&window.fetch.bind(window);
const wrap=(r,t)=>new Response(IMG_BASE?t.replace(/"(\.\/)?img\//g,'"'+IMG_BASE+"img/"):t,{status:r.status,statusText:r.statusText,headers:r.headers});
if(F)window.fetch=function(u,o){const s=typeof u==="string"?u:(u&&u.url)||"";
 const abs=s&&/^(\.\/)?img\/[^?]*\.json(\?|$)/.test(s)?IMG_BASE+s.replace(/^\.\//,""):s;
 if(!abs.startsWith(IMG_BASE)||!/\.json(\?|$)/.test(abs)||(!IMG_BASE&&!/^(\.\/)?img\//.test(s))||(o&&o.method&&String(o.method).toUpperCase()!=="GET"))return F(u,o);
 const go=n=>{const again=(r,t,err)=>{if(n<MRETRY.length&&navigator.onLine!==false&&!(r&&r.ok===false&&NORETRY[r.status])){K.mretries++;return new Promise(ok=>setTimeout(ok,MRETRY[n])).then(()=>go(n+1))}
   K.mfail++;if(r)return t!=null?wrap(r,t):r;throw err};
  return F(abs===s?u:abs,o).then(r=>{if(!r.ok)return again(r);return r.text().then(t=>{try{JSON.parse(t)}catch(e){return again(r,t)}return wrap(r,t)},e=>again(null,null,e))},e=>again(null,null,e))};
 return go(0)};
if(!IMG_BASE)return;
/* 2. failed pictures */
const SAME=location.origin+location.pathname.replace(/[^/]*$/,"");
document.addEventListener("error",e=>{const el=e.target;if(!el||el.tagName!=="IMG")return;const s=el.currentSrc||el.src||"";
 if(s.startsWith(SAME+"img/")){e.stopImmediatePropagation();K.rewrites++;el.src=IMG_BASE+s.slice(SAME.length);return}
 if(!s.startsWith(IMG_BASE))return;
 if(!el.__cdnTry){el.__cdnTry=1;e.stopImmediatePropagation();K.retries++;setTimeout(()=>{el.src=s+(s.includes("?")?"&":"?")+"r=1"},1500);return}
 if(!el.onerror&&!el.hasAttribute("onerror")){K.hidden++;el.style.visibility="hidden"}},true);
})();
