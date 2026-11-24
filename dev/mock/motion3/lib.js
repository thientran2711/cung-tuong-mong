/* MOTION-DESIGN-2 in-page helpers (runs INSIDE the real built game frame). NOT game code: a mock of three KIT REQUESTS
   kitHand (hand of cards), kitRing (item ring, shared with RING-DESIGN), kitFlyTo (deltas fly one by one to their HUD cell / Tư trang tab).
   Every visible piece is an existing kit part: kitScene layer + Sc.fig (§93.1/93.2), kitDlgBox (§93.3), the real option card .kopt (§88, odds meter .kodm,
   Tốn/Được/Bại rows, kitHintRow «Gợi ý»), kit picture frame .ksart, kit panel .kpanel, real result card (resultShow), real HUD cells .kst, kitItem tiles, kit buttons .kbtn.
   NEW CSS below = layout/motion of the requested parts only (positions, transforms, opacity) — marked KIT REQUEST. Motion = transform + opacity only. */
window.MD3=(function(){
const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const pace=()=>{try{return BAL.pace||1}catch(e){return 1}};
const R=e=>e.getBoundingClientRect();
const css=`/* KIT REQUEST kitHand / kitRing / kitFlyTo — layout + motion only */
.md3-hand{position:absolute;left:0;right:0;bottom:0;z-index:6;pointer-events:none}
.md3-card{position:absolute;pointer-events:auto;transform-origin:50% 100%;will-change:transform,opacity;cursor:pointer;-webkit-tap-highlight-color:transparent}
.md3-card>.md3-face{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;margin:0;padding:5px 5px 4px;display:flex;flex-direction:column;gap:3px;border-radius:12px;overflow:hidden}
.md3-card .ksart{flex:1 1 auto;margin:0!important;width:100%!important;height:auto!important;min-height:0}
.md3-card .ksart img{width:100%;height:100%;object-fit:cover}
.md3-card .kan{display:block;text-align:center;font-size:var(--md3fs,13px);line-height:1.18;font-weight:700;white-space:normal;overflow-wrap:anywhere}
.md3-card .kodm{align-self:center;transform:scale(.86);transform-origin:50% 50%;margin:-2px 0}
.md3-card .ksart-chip{display:none!important}.md3-plainart{display:none}.md3-plain .md3-face{background:#fbf1df!important;justify-content:center;align-items:center}.md3-plain .kan{padding:0 3px}.md3-plain .kan{font-size:calc(var(--md3fs,13px)*1.25)!important}
.md3-glow{position:absolute;inset:-7px;border-radius:16px;box-shadow:0 0 18px 6px rgba(255,206,110,.95),0 0 0 3px #e7b94a;opacity:0;pointer-events:none}
.md3-back{position:absolute;inset:0;border-radius:12px;background:url(${CDN}kit/card-back.webp) center/cover;backface-visibility:hidden;pointer-events:none}
.md3-plate{z-index:7!important}
.md3-plate .kopt{pointer-events:none;width:100%;margin:0}
.md3-tile.md3-far .kitn,.md3-tile.md3-far .kgchip{visibility:hidden}
.md3-fly{position:fixed;z-index:99990;pointer-events:none;will-change:transform,opacity;left:0;top:0}
.md3-dim .figimg,.md3-dim .kscn-fig{transition:none}
`;
function ensureCss(){if(document.getElementById('md3-css'))return;const s=document.createElement('style');s.id='md3-css';s.textContent=css;document.head.appendChild(s)}
/* kit scene at NORMAL brightness (owner OD 24/11 ~09:05Z: no whole-screen darkening, no blur on the background): veil off, blur off — REPORTED to MAIN, not changed in the kit */
function sceneBright(L){const bg=L.querySelector('.kscn-bg'),vl=L.querySelector('.kscn-veil');if(bg){bg.style.filter='none';bg.style.inset='0'}if(vl)vl.style.display='none'}
/* face zones of kit scene figures (top of the painted bbox) — used to PROVE no plate/card/box covers a face */
function faceBoxes(L){return L.figs.map(f=>{const r=R(f),o=f.ob||{l:0,r:1,t:0,b:1};const pw=(o.r-o.l)*r.width,ph=(o.b-o.t)*r.height,cx=r.left+(o.l+o.r)/2*r.width;
 return {l:cx-pw*.22,r:cx+pw*.22,t:r.top+o.t*r.height,b:r.top+o.t*r.height+ph*(f.__half?.24:.15)}})}
function hit(a,b){const n=x=>x.l!=null?x:{l:x.left,r:x.right,t:x.top,b:x.bottom};a=n(a);b=n(b);return !(a.r<=b.l||b.r<=a.l||a.b<=b.t||b.b<=a.t)}
function faceCheck(L,els){const F=faceBoxes(L);const out=[];els.forEach(e=>{if(!e||!e.isConnected)return;const r=R(e);if(r.width<2)return;F.forEach((f,i)=>{if(hit(f,r))out.push({fig:i,el:e.className.split(' ')[0]})})});return out}
/* rAF frame-time probe */
function probeStart(){const P=window.__md3p={d:[],last:0,on:1};const f=t=>{if(!P.on)return;if(P.last)P.d.push(t-P.last);P.last=t;requestAnimationFrame(f)};requestAnimationFrame(f);return P}
function probeStop(){const P=window.__md3p;if(!P)return null;P.on=0;const d=P.d.slice().sort((a,b)=>a-b);const q=x=>d.length?d[Math.min(d.length-1,Math.floor(x*d.length))]:0;
 const dropped=P.d.reduce((s,x)=>s+Math.max(0,Math.round(x/16.67)-1),0);return {n:d.length,p50:+q(.5).toFixed(1),p95:+q(.95).toFixed(1),max:+(d[d.length-1]||0).toFixed(1),dropped}}
/* REAL game acts (law 4 / 6c): the Hành sự tab's own act cards — names, pictures and the Cần/Tốn/Được/Kèm rows + odds meters are the game's own (numbers come from BAL through the game's act engine, nothing typed here).
   Returns detached clones; the tab is restored. odds:true = only acts that carry an odds meter (.kodm); odds:false = only acts without one («plain» cards). */
/* fixture: the whole cast has MET her, so no kit name / act text shows «???» (the kit stranger rule itself is untouched; FLIGHT-UI's kitNoUnk will cover it in the build) */
function meetAll(){try{S.met=S.met||{};const K=k61S();(rivals||[]).forEach(v=>{if(v&&v.id!=null&&S.met[v.id]==null)S.met[v.id]=0});if(K)(k61All()||[]).forEach(e=>{try{K[kOf61(e)]=Math.max(+K[kOf61(e)]||0,2)}catch(x){}})}catch(e){}}
function acts(n,odds){meetAll();const old=window.tab;try{window.tab='act';render()}catch(e){}
 const all=[...document.querySelectorAll('#panel .ka.kart')].filter(c=>c.querySelector('.kan'));
 const pick=all.filter(c=>odds==null?true:odds?!!c.querySelector('.kodm'):!c.querySelector('.kodm'));const out=pick.slice(0,n).map(c=>c.cloneNode(true));
 if(out.length<n){all.forEach(c=>{if(out.length<n&&!out.some(o=>o.dataset.kart===c.dataset.kart&&o.querySelector('.kan').textContent===c.querySelector('.kan').textContent))out.push(c.cloneNode(true))})}
 try{window.tab=old;render()}catch(e){}return out}
/* decode every picture of a node list BEFORE it is dealt (pre-decode: no decode work while the deal animates) */
function decodeAll(nodes){const ims=[];nodes.forEach(n=>n.querySelectorAll('img').forEach(i=>{i.loading='eager';i.decoding='sync';ims.push(i)}));return Promise.all(ims.map(i=>new Promise(r=>{if(i.complete&&i.naturalWidth){(i.decode?i.decode():Promise.resolve()).then(r,r);return}const t=setTimeout(r,6000);i.onload=()=>{clearTimeout(t);(i.decode?i.decode():Promise.resolve()).then(r,r)};i.onerror=()=>{clearTimeout(t);r()};const s=i.src;i.src='';i.src=s}))).then(()=>ims.length)}
async function preload(urls){await Promise.all(urls.map(u=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=u;if(i.decode)i.decode().then(r,r)})))}
return {meetAll,acts,decodeAll,CDN,wait,pace,R,ensureCss,sceneBright,faceBoxes,faceCheck,probeStart,probeStop,preload}})();
