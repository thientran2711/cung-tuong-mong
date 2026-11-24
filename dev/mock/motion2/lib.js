/* MOTION-DESIGN-2 in-page helpers (runs INSIDE the real built game frame). NOT game code: a mock of three KIT REQUESTS
   kitHand (hand of cards), kitRing (item ring, shared with RING-DESIGN), kitFlyTo (deltas fly one by one to their HUD cell / Tư trang tab).
   Every visible piece is an existing kit part: kitScene layer + Sc.fig (§93.1/93.2), kitDlgBox (§93.3), the real option card .kopt (§88, odds meter .kodm,
   Tốn/Được/Bại rows, kitHintRow «Gợi ý»), kit picture frame .ksart, kit panel .kpanel, real result card (resultShow), real HUD cells .kst, kitItem tiles, kit buttons .kbtn.
   NEW CSS below = layout/motion of the requested parts only (positions, transforms, opacity) — marked KIT REQUEST. Motion = transform + opacity only. */
window.MD2=(function(){
const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const pace=()=>{try{return BAL.pace||1}catch(e){return 1}};
const R=e=>e.getBoundingClientRect();
const css=`/* KIT REQUEST kitHand / kitRing / kitFlyTo — layout + motion only */
.md2-hand{position:absolute;left:0;right:0;bottom:0;z-index:6;pointer-events:none}
.md2-card{position:absolute;pointer-events:auto;transform-origin:50% 100%;will-change:transform,opacity;cursor:pointer;-webkit-tap-highlight-color:transparent}
.md2-card>.md2-face{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;margin:0;padding:5px 5px 4px;display:flex;flex-direction:column;gap:3px;border-radius:12px;overflow:hidden}
.md2-card .ksart{flex:1 1 auto;margin:0!important;width:100%!important;height:auto!important;min-height:0}
.md2-card .ksart img{width:100%;height:100%;object-fit:cover}
.md2-card .kan{display:block;text-align:center;font-size:var(--md2fs,13px);line-height:1.18;font-weight:700;white-space:normal;overflow-wrap:anywhere}
.md2-card .kodm{align-self:center;transform:scale(.86);transform-origin:50% 50%;margin:-2px 0}
.md2-glow{position:absolute;inset:-7px;border-radius:16px;box-shadow:0 0 18px 6px rgba(255,206,110,.95),0 0 0 3px #e7b94a;opacity:0;pointer-events:none}
.md2-back{position:absolute;inset:0;border-radius:12px;background:url(${CDN}kit/card-back.webp) center/cover;backface-visibility:hidden;pointer-events:none}
.md2-plate{z-index:7!important}
.md2-plate .kopt{pointer-events:none;width:100%;margin:0}
.md2-tile.md2-far .kitn,.md2-tile.md2-far .kgchip{visibility:hidden}
.md2-fly{position:fixed;z-index:99990;pointer-events:none;will-change:transform,opacity;left:0;top:0}
.md2-dim .figimg,.md2-dim .kscn-fig{transition:none}
`;
function ensureCss(){if(document.getElementById('md2-css'))return;const s=document.createElement('style');s.id='md2-css';s.textContent=css;document.head.appendChild(s)}
/* kit scene at NORMAL brightness (owner OD 24/11 ~09:05Z: no whole-screen darkening, no blur on the background): veil off, blur off — REPORTED to MAIN, not changed in the kit */
function sceneBright(L){const bg=L.querySelector('.kscn-bg'),vl=L.querySelector('.kscn-veil');if(bg){bg.style.filter='none';bg.style.inset='0'}if(vl)vl.style.display='none'}
/* face zones of kit scene figures (top of the painted bbox) — used to PROVE no plate/card/box covers a face */
function faceBoxes(L){return L.figs.map(f=>{const r=R(f),o=f.ob||{l:0,r:1,t:0,b:1};const pw=(o.r-o.l)*r.width,ph=(o.b-o.t)*r.height,cx=r.left+(o.l+o.r)/2*r.width;
 return {l:cx-pw*.22,r:cx+pw*.22,t:r.top+o.t*r.height,b:r.top+o.t*r.height+ph*(f.__half?.24:.15)}})}
function hit(a,b){const n=x=>x.l!=null?x:{l:x.left,r:x.right,t:x.top,b:x.bottom};a=n(a);b=n(b);return !(a.r<=b.l||b.r<=a.l||a.b<=b.t||b.b<=a.t)}
function faceCheck(L,els){const F=faceBoxes(L);const out=[];els.forEach(e=>{if(!e||!e.isConnected)return;const r=R(e);if(r.width<2)return;F.forEach((f,i)=>{if(hit(f,r))out.push({fig:i,el:e.className.split(' ')[0]})})});return out}
/* rAF frame-time probe */
function probeStart(){const P=window.__md2p={d:[],last:0,on:1};const f=t=>{if(!P.on)return;if(P.last)P.d.push(t-P.last);P.last=t;requestAnimationFrame(f)};requestAnimationFrame(f);return P}
function probeStop(){const P=window.__md2p;if(!P)return null;P.on=0;const d=P.d.slice().sort((a,b)=>a-b);const q=x=>d.length?d[Math.min(d.length-1,Math.floor(x*d.length))]:0;
 const dropped=P.d.reduce((s,x)=>s+Math.max(0,Math.round(x/16.67)-1),0);return {n:d.length,p50:+q(.5).toFixed(1),p95:+q(.95).toFixed(1),max:+(d[d.length-1]||0).toFixed(1),dropped}}
async function preload(urls){await Promise.all(urls.map(u=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=u;if(i.decode)i.decode().then(r,r)})))}
return {CDN,wait,pace,R,ensureCss,sceneBright,faceBoxes,faceCheck,probeStart,probeStop,preload}})();
