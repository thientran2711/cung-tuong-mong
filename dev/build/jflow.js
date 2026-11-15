/* ================= jflow: MỌI ĐỒ / BẠC VÀO RA ĐỀU QUA kitGain / kitLose (owner 15/11, review/gift-chest) =================
   ONE routing point instead of patching every push: after each render the player's HELD things (Tư trang S.inv, the trâm / y phục slots, the
   veil) and her Bạc are compared with the last snapshot; every difference is shown by exactly one of:
     kitGain(items, {kind, from, title})  given by a person → hộp gấm (giver named) · Thái hậu / Hoàng hậu → mâm thưởng · Hoàng thượng → rương
       (ngự tứ → rương rồng phượng) · Nội vụ phủ → rương chạm vàng · found / looted / hunted → túi gấm ("pouch") · BOUGHT → no box: the tile flies
       into the Tư trang tab, the tab bounces with a ×N badge, coins fly out of the Bạc counter (−N). Several items at once = ONE box per giver.
     kitLose(items, why)  sold → the tile flies off to the eunuch's tray, coins fly into Bạc (+N, counting up) · used / given → the tile drifts away
       · lost / confiscated → the tile fades and falls + a short result line.
     kitCoins(n)  any other Bạc change: coins fly to / from the Bạc counter with ±N.
   Code that already shows its own box (j93 bestow, jrankset rank set) marks its entries (kmMark) so they are not shown twice.
   Hints for removals come from the acts themselves (giveTo → tặng, useItem → dùng, the sale functions → bán, confiscation → thu hồi).
   All short (0.3–2 s), tap to skip; with Cảnh động off / reduced motion only the boxes (static) and a one-line note. NPCs: nothing shown.
   DEMOTION / LÃNH CUNG: everything above the new allowance (trâm / y phục of a higher phẩm, jewellery with IT.rk above her rank; in lãnh cung
   everything above cung nhân) is CONFISCATED with a scene: a Nội vụ phủ eunuch in the kit person dialog (full body left, as the shop), the
   item tiles slide onto his tray one by one, then "Phụng chỉ thu hồi đồ vượt phẩm: …"; the worn ones are taken off first and the y phục is
   replaced by what her rank allows. NPCs: the same rule, silently. ================= */
function kmMark(e){try{if(e&&typeof e==="object")Object.defineProperty(e,"__km",{value:1,enumerable:false,configurable:true})}catch(x){}return e}
const FL={S:null,held:new Set(),bac:0,why:"",whyT:0};
function flHeld(){const H=new Set();(S.inv||[]).forEach(e=>{if(e&&!e.h)H.add(e)});try{if(S.wd){for(const sl of ["tram","y"])if(S.wd[sl]&&S.wd[sl].from!=="base")H.add(S.wd[sl])}}catch(e){}if(S.vl)H.add(S.vl);return H}
function flBase(){FL.S=S;FL.held=flHeld();FL.bac=S.bac|0;FL.why=""}
function flWhy(w){FL.why=w;FL.whyT=Date.now()}
function flOn(){return typeof kmOn==="function"&&kmOn()&&!(typeof isSrv==="function"&&isSrv()&&false)}
function flName(e){if(!e)return"";if(e.wk)return e.wk.n;const w=typeof WD_ITEMS==="object"&&WD_ITEMS[e.k];return w?w.n:IT[e.k]?IT[e.k].n:e.k}
function flImg(e){const w=typeof WD_ITEMS==="object"&&WD_ITEMS[e.k];if(w)return w.icon;try{if(typeof itemArt==="function"){const a=itemArt(e.wk?e:e.k);if(a&&a.src)return a.src}}catch(x){}return typeof kmItemImg==="function"?kmItemImg(e.k):""}
function flTier(e){const w=typeof WD_ITEMS==="object"&&WD_ITEMS[e.k];if(w)return w.g|0;if(e.wk)return Math.min(3,e.wk.ti|0);return typeof kmTierOf==="function"?kmTierOf(e.k,!!(e.nt||(IT[e.k]&&IT[e.k].nt))):0}
function flItem(e){return{n:flName(e),d:IT[e.k]?IT[e.k].d:"",img:flImg(e),tier:flTier(e)}}
function flGiver(e){const f=e.from;if(f==="th")return["tray","Mâm thưởng","Thái hậu ban"];if(f==="hh")return["tray","Mâm thưởng","Hoàng hậu ban"];
 if(f==="emp"||e.giver==="Hoàng thượng")return[(e.nt||(IT[e.k]&&IT[e.k].nt))?"royal":"chest",(e.nt?"Ngự tứ":"Rương bảo vật"),"Hoàng thượng ban"];
 if(f==="nvp")return["chest","Rương chạm vàng","Nội vụ phủ đưa tới"];if(f==="found"||f==="loot"||f==="hunt"||f==="steal")return["pouch","Túi gấm",f==="hunt"?"Thu săn":f==="steal"?"Lấy được":"Nhặt được"];
 if(f==="fam")return["gift","Hộp gấm",(e.giver||"Người nhà")+" tặng"];
 let v=null;try{v=typeof byKey==="function"?byKey(f):null}catch(x){}if(!v&&typeof rivals!=="undefined")v=rivals.find(x=>x.id===f)||null;
 if(v&&v.name)return["gift","Hộp gấm",`${v.name} tặng`];if(e.giver)return["gift","Hộp gấm",`${e.giver} tặng`];if(f&&f!=="me")return["gift","Hộp gấm","Có người tặng"];return null}
/* ---------- the animations ---------- */
function kitGain(items,o){o=o||{};if(!items.length||!flOn())return;if(o.kind==="buy"){flBuy(items,o.cost||0);return}
 const kind=o.kind==="pouch"&&!flPouchArt()?"gift":o.kind;kitReward({kind,title:o.title,from:o.from,items:items.map(flItem),bac:o.bac||0})}
try{if(typeof KM_BOX==="object")KM_BOX.pouch=["mo-pouch","mo-pouch-open","Túi gấm"]}catch(e){}
function flPouchArt(){return !!(typeof KM_BOX==="object"&&KM_BOX.pouch)}
function flTab(){return document.querySelector('[data-tab="inv"]')}
function flBacEl(){return document.getElementById("hud-bac")||document.querySelector('[data-k="bac"]')||document.querySelector('[data-hx="bac"]')||document.querySelector('.hc[data-hx="bac"]')||document.getElementById("hud")}
function flFly(src,from,to,o){o=o||{};if(!src||kmReduced())return;const im=document.createElement("img");im.className="kmfly";im.src=src;im.alt="";im.style.left=from.x+"px";im.style.top=from.y+"px";document.body.appendChild(im);
 const a=im.animate([{transform:"translate(-50%,-50%) scale(.5)",opacity:0},{transform:"translate(-50%,-80%) scale(1.1)",opacity:1,offset:.3},{transform:`translate(calc(-50% + ${to.x-from.x}px),calc(-50% + ${to.y-from.y}px)) scale(.35)`,opacity:o.fade?0:.2}],{duration:o.dur||850,delay:o.delay||0,easing:"cubic-bezier(.4,.1,.3,1)",fill:"forwards"});
 const end=()=>{im.remove();o.onEnd&&o.onEnd()};a.onfinish=end;im.addEventListener("pointerdown",()=>{a.finish()},{once:true})}
function flCenter(el){if(!el)return{x:innerWidth/2,y:40};const r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}}
function flBadge(n){const tb=flTab();if(!tb)return;let b=tb.querySelector(".kmbadge");if(!b){b=document.createElement("b");b.className="kmbadge";tb.appendChild(b)}b.textContent="×"+n;tb.classList.remove("km-pulse");void tb.offsetWidth;tb.classList.add("km-pulse");
 clearTimeout(b.__t);b.__t=setTimeout(()=>b.remove(),2200)}
function kitCoins(n,o){o=o||{};if(!n||!flOn())return;const el=flBacEl(),c=flCenter(el);const lab=document.createElement("div");lab.className="kmcoinlab "+(n>0?"g":"r");lab.style.left=c.x+"px";lab.style.top=(c.y+18)+"px";
 const fin=Math.abs(n);let cur=n>0?0:fin;lab.textContent=(n>0?"+":"−")+(n>0?0:fin);document.body.appendChild(lab);const t0=performance.now();
 const step=t=>{const k=Math.min(1,(t-t0)/700);const v=Math.round(n>0?fin*k:fin);lab.textContent=(n>0?"+":"−")+v;if(k<1&&lab.isConnected)requestAnimationFrame(step)};requestAnimationFrame(step);
 setTimeout(()=>lab.classList.add("out"),1300);setTimeout(()=>lab.remove(),1700);lab.addEventListener("pointerdown",()=>lab.remove(),{once:true});
 if(kmReduced())return;const src=`${KM_DIR}mo-coin-silver.webp`,mid=o.from||{x:innerWidth/2,y:innerHeight*.45};const N=Math.min(6,2+Math.round(fin/20));
 for(let i=0;i<N;i++){const jit={x:mid.x+(i-N/2)*14,y:mid.y+(i%2)*10};if(n>0)flFly(src,jit,c,{delay:i*70,dur:700});else flFly(src,c,{x:jit.x,y:jit.y+60},{delay:i*70,dur:700,fade:1})}}
function flBuy(items,cost){const tb=flTab(),t=flCenter(tb);items.slice(0,4).forEach((e,i)=>flFly(flImg(e),{x:innerWidth/2+(i-1)*40,y:innerHeight*.45},t,{delay:i*120}));flBadge(items.length);if(cost)kitCoins(-cost)}
function kitLose(items,why,o){o=o||{};if(!items.length||!flOn())return;const sold=why==="bán";
 if(!kmReduced()){const tray={x:innerWidth*.85,y:innerHeight*.3};items.slice(0,4).forEach((e,i)=>{const from={x:innerWidth/2+(i-1)*44,y:innerHeight*.45};
  if(sold||why==="tặng"||why==="dùng")flFly(flImg(e),from,sold?tray:{x:from.x,y:from.y-120},{delay:i*120,fade:1,dur:800});
  else{const im=document.createElement("img");im.className="kmfly";im.src=flImg(e);im.style.left=from.x+"px";im.style.top=from.y+"px";document.body.appendChild(im);
   const a=im.animate([{transform:"translate(-50%,-50%)",opacity:1},{transform:"translate(-50%,40%) rotate(18deg)",opacity:0}],{duration:900,delay:i*120,easing:"ease-in",fill:"forwards"});a.onfinish=()=>im.remove();im.addEventListener("pointerdown",()=>a.finish(),{once:true})}})}
 if(!sold&&why!=="tặng"&&why!=="dùng"&&!o.quiet){const L=items.map(flName).join(", ");try{if(typeof resultShow==="function"&&typeof RT!=="undefined"){}}catch(x){}
  try{log(`${why==="thu hồi"?"Bị thu hồi":"Mất"}: ${L}.`)}catch(x){}flNote(`${why==="thu hồi"?"Bị thu hồi":"Mất"}: ${L}`)}}
function flNote(t){if(!flOn())return;const d=document.createElement("div");d.className="kmnote";d.textContent=t;document.body.appendChild(d);d.addEventListener("pointerdown",()=>d.remove(),{once:true});setTimeout(()=>d.classList.add("out"),1800);setTimeout(()=>d.remove(),2200)}
/* ---------- the one diff ---------- */
function flDiff(){if(!S)return;if(FL.S!==S||!flOn()||S.dead){flBase();return}
 const now=flHeld(),before=FL.held;const added=[...now].filter(e=>!before.has(e)&&!e.__km),removed=[...before].filter(e=>!now.has(e));let dB=(S.bac|0)-FL.bac;
 const why=Date.now()-FL.whyT<4000?FL.why:"";flBase();
 if(removed.length){if(dB>0&&(why==="bán"||!why)){kitLose(removed,"bán");kitCoins(dB,{from:{x:innerWidth*.85,y:innerHeight*.3}});dB=0}else kitLose(removed,why||"mất")}
 if(added.length){const buy=added.filter(e=>!e.from&&!e.giver);const rest=added.filter(e=>!buy.includes(e));
  if(buy.length){if(dB<0){kitGain(buy,{kind:"buy",cost:-dB});dB=0}else kitGain(buy,{kind:"pouch",title:"Túi gấm",from:"Nhặt được"})}
  const G={};for(const e of rest){const g=flGiver(e)||["pouch","Túi gấm","Nhặt được"];const k=g.join("|");(G[k]=G[k]||{g,L:[]}).L.push(e)}
  for(const k in G){const {g,L}=G[k];kitGain(L,{kind:g[0],title:g[1],from:g[2],bac:dB>0?dB:0});if(dB>0)dB=0}}
 if(dB)kitCoins(dB)}
/* j93's own inventory diff steps aside (bestow keeps its chest; gifts / buys come from here) */
(function(){if(typeof kmSnap!=="function")return;const s0=kmSnap;kmSnap=function(){const s=s0.apply(this,arguments);s.inv=[];return s}})();
/* code that shows its own box marks its entries; bestow's silver is in its chest */
(function(){const b0=bestow;bestow=function(p){const n0=p&&p.inv?p.inv.length:0;const r=b0.apply(this,arguments);try{if(p===S){S.inv.slice(n0).forEach(kmMark);FL.bac=S.bac|0;FL.held=flHeld()}}catch(e){}return r}})();
if(typeof rsGive==="function"){const g0=rsGive;rsGive=function(p){const n0=p&&p.inv?p.inv.length:0;const r=g0.apply(this,arguments);try{if(p===S){S.inv.slice(n0).forEach(kmMark);FL.held=flHeld()}}catch(e){}return r};window.rsGive=rsGive}
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{(S.inv||[]).forEach(kmMark);flBase()}catch(e){}return r}})();
/* removal hints from the acts */
[["giveTo","tặng"],["useItem","dùng"],["sellItem","bán"],["wkGive","tặng"],["wkSell","bán"],["wdSell","bán"],["wdPawn","bán"],["econSell","bán"]].forEach(([n,w])=>{const f0=window[n];if(typeof f0!=="function")return;window[n]=function(p){if(p===S)flWhy(w);return f0.apply(this,arguments)}});
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{flDiff()}catch(e){console.error("flow",e)}return r}})();
/* ---------- demotion / lãnh cung: confiscation ---------- */
function flAllowP(p){return p.out?0:Math.min(8,rkOf(p)+1)}
function flOver(p){const P=flAllowP(p),r=p.out?-1:rkOf(p);const L=[];try{const w=wdOf(p);for(const sl of ["tram","y"]){const e=w[sl],it=e&&WD_ITEMS[e.k];if(it&&it.P>P&&!(it.nt&&e.own===wdKey(p)))L.push({e,sl})}}catch(x){}
 (p.inv||[]).forEach(e=>{if(!e||e.h)return;const w=typeof WD_ITEMS==="object"&&WD_ITEMS[e.k];if(w){if(w.P>P&&!(w.nt&&e.own===wdKey(p)))L.push({e})}else if(IT[e.k]&&IT[e.k].rk!=null&&IT[e.k].rk>r&&(IT[e.k].sl||IT[e.k].dr))L.push({e})});return L}
function flConfiscate(p){const L=flOver(p);if(!L.length)return[];const w=wdOf(p);
 for(const x of L){if(x.sl){w[x.sl]=null}else{const i=p.inv.indexOf(x.e);if(i>=0)p.inv.splice(i,1)}if(x.e.w)delete x.e.w}
 if(!w.y){let k=null;try{const P=flAllowP(p);const own=(p.inv||[]).filter(e=>e&&!e.h&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==="y"&&WD_ITEMS[e.k].P<=P).sort((a,b)=>WD_ITEMS[b.k].P-WD_ITEMS[a.k].P)[0];
  if(own){p.inv.splice(p.inv.indexOf(own),1);w.y=own}else{k=typeof earnPlainY==="function"?earnPlainY(p):wdDefault(p,"y");if(k)w.y=kmMark({k,src:"nvp",nvp:1,giver:"Nội vụ phủ"})}}catch(e){}}
 return L.map(x=>x.e)}
function flConfScene(items,cold){if(!items.length)return;const names=items.map(flName);
 const tiles=items.map((e,i)=>`<span class="kmconf" style="--i:${i}">${kitItem({src:flImg(e),name:flName(e),grade:flTier(e),size:"md"})}</span>`).join("");
 Q.push({t:cold?"Nội vụ phủ thu hồi đồ":"Thu hồi đồ vượt phẩm",who:typeof pEunCourt==="function"?pEunCourt("ped"):null,
  h:`<div class="kmconfrow">${tiles}</div><p class="kmconfl" style="--n:${items.length}">${cold?"Phụng chỉ, người vào lãnh cung không giữ đồ theo phẩm cũ. Thu hồi":"Phụng chỉ thu hồi đồ vượt phẩm"}: ${names.join(", ")}.</p>`});
 try{log(`Nội vụ phủ thu hồi: ${names.join(", ")}.`)}catch(e){}try{showModal()}catch(e){}}
function flRankCheck(){if(!S||S.dead)return;const st=S.out?-1:(typeof isSrv==="function"&&isSrv())?null:S.rank;if(st==null)return;
 if(S.__flRk==null){S.__flRk=st;return}
 if(st<S.__flRk){const items=flConfiscate(S);items.forEach(kmMark);FL.held=flHeld();flConfScene(items,S.out)}S.__flRk=st;
 for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||v.alive===false)continue;const r=v.out?-1:rkOf(v);if(v.__flRk==null){v.__flRk=r;continue}if(r<v.__flRk)flConfiscate(v);v.__flRk=r}}
(function(){const r0=render;render=function(){try{flRankCheck()}catch(e){console.error("conf",e)}return r0.apply(this,arguments)}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{flRankCheck()}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kflow-css";st.textContent=`
.kmbadge{position:absolute;right:4px;top:2px;font-size:.7rem;background:#a8261c;color:#fff;border-radius:9px;padding:0 5px;pointer-events:none}
[data-tab="inv"]{position:relative}
.kmcoinlab{position:fixed;z-index:9800;transform:translate(-50%,0);font:700 1rem var(--display,serif);padding:1px 8px;border-radius:10px;background:#fffaf0ee;border:1px solid #d6b26a;pointer-events:auto;transition:opacity .35s,transform .35s}
.kmcoinlab.g{color:#2d7a52}.kmcoinlab.r{color:#c23b22}.kmcoinlab.out{opacity:0;transform:translate(-50%,-14px)}
.kmnote{position:fixed;z-index:9800;left:50%;top:18%;transform:translateX(-50%);max-width:min(92vw,420px);background:#fffaf0f2;border:1px solid #d6b26a;border-radius:10px;padding:6px 12px;font-size:.9rem;color:#7a2a1e;box-shadow:0 4px 14px #5a3a2033;transition:opacity .35s}
.kmnote.out{opacity:0}
.kmconfrow{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:4px 0 8px}
.kmconf{animation:kmconf .55s cubic-bezier(.3,.7,.3,1) both;animation-delay:calc(var(--i)*.35s)}
@keyframes kmconf{from{opacity:0;transform:translateX(60px) scale(.8)}to{opacity:1;transform:none}}
.kmconfl{animation:kmconfl .4s ease both;animation-delay:calc(var(--n)*.35s + .2s)}
@keyframes kmconfl{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.kmconf,.kmconfl{animation:none}}
`;document.head.appendChild(st)})();
window.kitGain=kitGain;window.kitLose=kitLose;window.kitCoins=kitCoins;window.kmMark=kmMark;
