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
const K=window.KCDN={base:IMG_BASE,rewrites:0,retries:0,hidden:0};
window.IMG_BASE=IMG_BASE;window.IMG_U=IMG_U;
if(!IMG_BASE)return;
/* 1. manifests */
const F=window.fetch&&window.fetch.bind(window);
if(F)window.fetch=function(u,o){const s=typeof u==="string"?u:(u&&u.url)||"";
 const abs=s&&/^(\.\/)?img\/[^?]*\.json(\?|$)/.test(s)?IMG_BASE+s.replace(/^\.\//,""):s;
 if(!abs.startsWith(IMG_BASE)||!/\.json(\?|$)/.test(abs))return F(u,o);
 return F(abs===s?u:abs,o).then(r=>{if(!r.ok)return r;return r.text().then(t=>new Response(t.replace(/"(\.\/)?img\//g,'"'+IMG_BASE+"img/"),{status:r.status,statusText:r.statusText,headers:r.headers}))})};
/* 2. failed pictures */
const SAME=location.origin+location.pathname.replace(/[^/]*$/,"");
document.addEventListener("error",e=>{const el=e.target;if(!el||el.tagName!=="IMG")return;const s=el.currentSrc||el.src||"";
 if(s.startsWith(SAME+"img/")){e.stopImmediatePropagation();K.rewrites++;el.src=IMG_BASE+s.slice(SAME.length);return}
 if(!s.startsWith(IMG_BASE))return;
 if(!el.__cdnTry){el.__cdnTry=1;e.stopImmediatePropagation();K.retries++;setTimeout(()=>{el.src=s+(s.includes("?")?"&":"?")+"r=1"},1500);return}
 if(!el.onerror&&!el.hasAttribute("onerror")){K.hidden++;el.style.visibility="hidden"}},true);
})();
