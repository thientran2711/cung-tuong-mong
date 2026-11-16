/* ================= jbuoi: BUỔI TRANSITION (KIT §74, owner 15/11 "Animation qua buổi … lật trang sách. Kỳ quá", review/buoi-transition) =================
   Replaces the old buổi change (dark ink wipe + paper-page sound + incense curtain, j11 / j18 / j93) with a painted time-of-day transition:
   the scene (already holding the next buổi's light, §56) is veiled by a tinted ink wash that thins out; a small painted sky band slides the sun / moon
   along its arc between the buổi positions; the new buổi name is a brush-calligraphy title with the kit seal. Night -> morning = dawn variant
   (mist + first light). Pace (owner 16/11 15:05Z "nó mờ lắm … nhanh quá"): 1.7 s x BAL.pace = ~3 s (dawn 2 s x BAL.pace = ~3.5 s); FULL SCREEN at every size / orientation (tint + wash cover the whole viewport, the sky band + title are centred in it).
   SEASON + FESTIVAL variants (same owner message): the painted falling sprites of the kit particle layer (§68: petals / lotus / maple leaves / snow, lanterns / gold petals…) + a tint per season; on a festival day (festToday(), the game's own FEST table) the festival's palette, sprites and name win. An optional painted band skin img/fx/buoi-band-<key>.webp (BTR_ART lists the ones that exist) lies over the sky gradient; everything else falls back to the per-buổi look. Tap anywhere = skip (the tap still reaches the game: listener only, never blocks).
   Gọn (Hiệu ứng: Gọn / reduced motion / weak device) = one quick tint fade, nothing else. Bots: nothing.
   Visual only: runs AFTER the state has been applied (curtain() is called after nextBuoi changed S.buoi), never awaited, never touches sync (co-op safe).
   Art (Magnific gpt-2-6, dev/fxwork/buoi): img/fx/buoi-wash (ink wash, used as a mask), buoi-mist, buoi-hills, buoi-orb (sun | moon) — ~130 KB, loaded on first use.
   The Tuần lục page turn is NOT touched (review/page-curl2). A new tuần still shows the dawn() week summary (it only loses the page sound + dark wipe). */
const BTR_BASE="img/fx/";
const BTR_C=[ /* per buổi: tint (veil colour), wash (ink colour), sky gradient top/bottom, title ink */
 {tint:"#f4d9a8",wash:"#c9a070",sky:["#ffe2b0","#f7c88f"],ink:"#3a2616"},
 {tint:"#fff6e0",wash:"#d9cdb0",sky:["#d8ecf4","#fdf3d0"],ink:"#3a2616"},
 {tint:"#f0b678",wash:"#a8683c",sky:["#f4a96c","#f8cf94"],ink:"#3a2010"},
 {tint:"#1d1c44",wash:"#0e0d2a",sky:["#1a1a4a","#3a3470"],ink:"#f3e6c8"}];
/* SEASON variants (key = SEAK: xuan / ha / thu / dong): tint = colour mixed into the buổi tint, fx = painted sprites of the kit particle layer [kind, count], haze = mist drifts (summer heat / winter cold) */
const BTR_SEA={xuan:{tint:"#ffc9d6",fx:[["petal-peach",16],["petal-plum",6]]},ha:{tint:"#ffe08a",fx:[["petal-lotus",10]],haze:"warm"},
 thu:{tint:"#f0983c",fx:[["leaf",16],["osmanthus",6]]},dong:{tint:"#cfe2f4",fx:[["snow",24]],haze:"cold"}};
/* FESTIVAL variants (key = the game's FEST table, j31): palette + sprites + the festival name under the buổi title; they win over the season */
const BTR_FEST={newyear:{tint:"#ee8f80",fx:[["petal-peach",16],["lantern",3]]},nguyentieu:{tint:"#ffc27a",fx:[["lantern",4],["spark",8]]},
 thanhminh:{tint:"#cfe3c6",fx:[["petal-plum",10],["paper",6]]},doanngo:{tint:"#bfe0a8",fx:[["leaf",10],["jade",4]]},
 phoenix:{tint:"#f2cb8a",fx:[["petal-peach",12],["streak",3]]},thattich:{tint:"#b9b4ee",fx:[["orb",4],["spark",10]]},
 trungthu:{tint:"#f6dc92",fx:[["lantern",4],["osmanthus",10]]},trungcuu:{tint:"#f0b868",fx:[["osmanthus",12],["leaf",6]]},
 dongchi:{tint:"#d8e6f6",fx:[["snow",18],["incense",3]]},giaothua:{tint:"#ee8a72",fx:[["petal-peach",12],["lantern",4],["spark",8]]}};
/* painted band skins that exist on the CDN (sample pictures made before the 15:35Z rule "all drawing → Foreman C"; the rest of the art list is in dev/handover/reports/anim-pace.md → Foreman C) */
const BTR_ART={thu:1,trungthu:1};
/* painted palace-style buổi icons img/fx/buoi-ico-<0 sáng|1 trưa|2 chiều|3 tối>.webp (owner 16/11 KIT review 7.5; art by Foreman C): set the flag to 1 when the file is on the CDN; 0 = no icon (today's look) */
const BTR_ICON=[0,0,0,0];
/* sun / moon on a 0..1 arc: t = place along the band, v = visible (0..1) per buổi */
const BTR_POS=[{s:{t:.12,v:1},m:{t:1.1,v:0}},{s:{t:.5,v:1},m:{t:1.1,v:0}},{s:{t:.86,v:1},m:{t:-.1,v:0}},{s:{t:1.08,v:0},m:{t:.5,v:1}}];
let btrPrev=null,btrEl=null,btrEnd=null;
/* the 4 painted pieces (~130 KB, SW-cached after the first fetch) are warmed once the game has been running a while, so the FIRST buổi change already shows them (on demand = not at boot) */
const BTR_KEEP=[];function btrWarm(){try{if(typeof S==="undefined"||!S){setTimeout(btrWarm,7000);return}if(btrStill())return;["wash","mist","hills","orb"].forEach(n=>{const i=new Image();BTR_KEEP.push(i);i.src=BTR_BASE+"buoi-"+n+".webp"})}catch(e){}}
setTimeout(btrWarm,9000);
function btrStill(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function btrKill(){if(btrEnd){const f=btrEnd;btrEnd=null;f()}}
/* which variant plays now: {sea, fest:{k,name}|null}; window.__btrVar = {sea, fest} lets the test / kit sample page force one */
function btrVariant(){const o=window.__btrVar;if(o)return{sea:o.sea||"xuan",fest:o.fest?{k:o.fest,name:(typeof FEST!=="undefined"&&FEST[o.fest]&&FEST[o.fest].name)||""}:null};
 let sea="xuan",fest=null;try{sea=SEAK[SEASON[S.month-1]]||"xuan"}catch(e){}try{const f=typeof festToday==="function"?festToday():null;if(f&&BTR_FEST[f.k])fest={k:f.k,name:f.name||""}}catch(e){}return{sea,fest}}
function btrArc(a,b,W,H){const K=[],n=14;for(let i=0;i<=n;i++){const u=i/n,e=u*u*(3-2*u),t=a.t+(b.t-a.t)*e,v=a.v+(b.v-a.v)*e;
  const x=t*W,y=H*.78-Math.sin(Math.max(0,Math.min(1,t))*Math.PI)*H*.62;K.push({transform:`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`,opacity:Math.max(0,Math.min(1,v*(t<0||t>1?Math.max(0,1-Math.abs(t<0?t:t-1)*8):1)))})}return K}
function buoiShift(){
 try{if(!S||window.__bot||(typeof quiet!=="undefined"&&quiet))return;btrKill();
  try{if(typeof kitSfx==="function")kitSfx((typeof B4L!=="undefined"&&(S.buoi||0)===B4L)?"nightWatch":"buoi")}catch(e){}
  const b=((S.buoi||0)%4+4)%4,prev=btrPrev!=null?btrPrev:(b+3)%4;btrPrev=b;const C=BTR_C[b],V=btrVariant(),VS=BTR_SEA[V.sea]||BTR_SEA.xuan,VF=V.fest?BTR_FEST[V.fest.k]:null,VT=(VF||VS).tint;
  const d=document.createElement("div");d.id="buoitr";d.className="btr b"+b+" s-"+V.sea+(V.fest?" f-"+V.fest.k:"");d.setAttribute("aria-hidden","true");
  /* the variant tint is mixed into the buổi tint (night keeps its dark; a festival colours it more than a season) */
  const mix=VF?34:22;d.style.cssText=`--bt-tint:color-mix(in srgb,${VT} ${mix}%,${C.tint});--bt-wash:color-mix(in srgb,#2a1c10 ${b===3?0:16}%,color-mix(in srgb,${VT} ${Math.round(mix*.6)}%,${C.wash}));--bt-ink:${C.ink};--bt-s0:${C.sky[0]};--bt-s1:${C.sky[1]}`;
  const artKey=V.fest&&BTR_ART[V.fest.k]?V.fest.k:BTR_ART[V.sea]?V.sea:"";
  const still=btrStill(),dawn=b===0&&prev===3,haze=!dawn&&VS.haze&&!VF,dur=still?260:kitPace(dawn?2000:1700);
  d.innerHTML=still?`<i class="btr-tint"></i>`:
   `<i class="btr-tint"></i><i class="btr-wash"></i>${dawn||haze?`<i class="btr-mist${haze?" "+VS.haze:""}"></i>`:""}${dawn?`<i class="btr-light"></i>`:""}<i class="btr-vig"></i>`+
   `<div class="btr-stage"><div class="btr-sky"><i class="btr-skybg"></i>${artKey?`<i class="btr-skin" style="background-image:url(${BTR_BASE}buoi-band-${artKey}.webp)"></i>`:""}<i class="btr-hills"></i><i class="btr-orb btr-sun"></i><i class="btr-orb btr-moon"></i></div>`+
   `<div class="btr-title"><i class="btr-plate"></i>${BTR_ICON[b]?`<i class="btr-ico" style="background-image:url(${BTR_BASE}buoi-ico-${b}.webp)"></i>`:""}<b>${BUOI[b]}</b>${typeof kitSeal==="function"?kitSeal({cls:"btr-seal"}):""}${V.fest&&V.fest.name?`<small class="btr-sub">${V.fest.name}</small>`:""}</div></div>`;
  document.body.appendChild(d);btrEl=d;
  let done=false;const end=ms=>{if(done)return;done=true;btrEnd=null;removeEventListener("pointerdown",skip,true);d.style.transition=`opacity ${ms||250}ms`;d.style.opacity="0";setTimeout(()=>{d.remove();if(btrEl===d)btrEl=null},(ms||250)+30)};
  const skip=()=>end(140);btrEnd=()=>end(0);
  if(!still){
   const A=d.animate?1:0;if(A){
    const dim=dur;d.querySelector(".btr-tint").animate([{opacity:0},{opacity:.96,offset:.1},{opacity:.9,offset:.5},{opacity:0}],{duration:dim,easing:"ease-in-out",fill:"forwards"});
    d.querySelector(".btr-wash").animate([{opacity:0,transform:"translateX(-6%) scale(1.1)"},{opacity:.82,offset:.16},{opacity:.62,offset:.5},{opacity:0,transform:"translateX(7%) scale(1.2)"}],{duration:dim,easing:"ease-in-out",fill:"forwards"});
    d.querySelector(".btr-vig").animate([{opacity:0},{opacity:.85,offset:.2},{opacity:.7,offset:.55},{opacity:0}],{duration:dim,fill:"forwards"});
    const mi=d.querySelector(".btr-mist");if(mi)mi.animate([{opacity:0,transform:"translateX(-4%)"},{opacity:.9,offset:.35},{opacity:0,transform:"translateX(5%)"}],{duration:dim,easing:"ease-in-out",fill:"forwards"});
    const li=d.querySelector(".btr-light");if(li)li.animate([{opacity:0,transform:"translateY(30%) scale(.7)"},{opacity:.95,offset:.5},{opacity:0,transform:"translateY(-6%) scale(1.15)"}],{duration:dim,easing:"ease-out",fill:"forwards"});
    const sk=d.querySelector(".btr-sky");sk.animate([{opacity:0,transform:"translateY(-16px)"},{opacity:1,offset:.16,transform:"none"},{opacity:1,offset:.82},{opacity:0}],{duration:dim,fill:"forwards"});
    const sr=sk.getBoundingClientRect(),orb=Math.max(48,Math.min(100,sr.height*.46)),bw=sr.width,bh=sr.height,P=BTR_POS[prev]||BTR_POS[0],N=BTR_POS[b];d.style.setProperty("--orb",orb+"px");
    const o=(sel,k)=>{const e=d.querySelector(sel);e.animate(btrArc(P[k],N[k],bw-orb,bh-orb),{duration:dim*.78,delay:dim*.1,easing:"ease-in-out",fill:"both"})};o(".btr-sun","s");o(".btr-moon","m");
    const ti=d.querySelector(".btr-title");ti.animate([{opacity:0,transform:"translateY(10px) scale(.96)",filter:"blur(6px)"},{opacity:1,offset:.26,transform:"none",filter:"blur(0)"},{opacity:1,offset:.84},{opacity:0}],{duration:dim,fill:"forwards"});
    const se=d.querySelector(".btr-seal");if(se)se.animate([{opacity:0,transform:"scale(1.9) rotate(-8deg)"},{opacity:0,offset:.4,transform:"scale(1.9) rotate(-8deg)"},{opacity:1,offset:.52,transform:"scale(1) rotate(-2deg)"},{opacity:1}],{duration:dim,fill:"forwards"});
    /* season / festival sprites: the kit particle layer (painted sprites, capped, paused when hidden; Gọn / no layer = nothing); two waves so it falls through the whole moment */
    if(typeof kitFxBurst==="function")(VF?VF.fx:VS.fx).forEach(([k,n],i)=>[.04,.34].forEach(w=>setTimeout(()=>{if(!done)try{kitFxBurst(k,null,Math.ceil(n/2),{scale:1.15,speed:1.25,life:Math.round(kitPace(150))})}catch(e){}},dim*w+i*120)));
    if(dawn&&typeof kitFxBurst==="function")setTimeout(()=>{try{kitFxBurst("glowburst",{x:innerWidth*.5,y:innerHeight*.62},1,{scale:1.8,a0:.8})}catch(e){}},dim*.3);
   }
   addEventListener("pointerdown",skip,true);
  }else if(d.animate)d.querySelector(".btr-tint").animate([{opacity:.7},{opacity:0}],{duration:dur,fill:"forwards"});
  setTimeout(()=>{if(!window.__btrHold)end(still?30:kitPace(260))},dur);
 }catch(e){console.error("buoiShift",e)}}
(function(){const st=document.createElement("style");st.id="btr-css";st.textContent=`
.btr{position:fixed;inset:0;z-index:36;pointer-events:none;overflow:hidden}
.btr>*,.btr-sky>*,.btr-plate{position:absolute;pointer-events:none}.btr-title,.btr-stage{position:absolute}
.btr-tint{inset:0;background:radial-gradient(ellipse 120% 100% at 50% 52%,color-mix(in srgb,var(--bt-tint) 78%,#fff),var(--bt-tint) 55%,color-mix(in srgb,var(--bt-tint) 82%,var(--bt-wash)));opacity:0}
.btr-wash{inset:-14%;background:var(--bt-wash);-webkit-mask:url("${BTR_BASE}buoi-wash.webp") center/cover no-repeat;mask:url("${BTR_BASE}buoi-wash.webp") center/cover no-repeat;opacity:0;will-change:transform,opacity}
.btr-vig{inset:0;background:radial-gradient(ellipse 90% 85% at 50% 50%,#0000 38%,color-mix(in srgb,var(--bt-wash) 78%,#0000) 100%);opacity:0}
.btr-mist{left:-15%;right:-15%;top:22%;bottom:-8%;background:url("${BTR_BASE}buoi-mist.webp") center/100% 100% no-repeat;opacity:0;will-change:transform,opacity}
.btr-mist.warm{filter:sepia(1) saturate(2.2) brightness(1.1)}.btr-mist.cold{filter:hue-rotate(170deg) brightness(1.15)}
.btr-light{left:50%;top:50%;width:min(110vw,760px);aspect-ratio:2/1;margin-left:calc(min(110vw,760px)/-2);margin-top:6%;border-radius:50%;background:radial-gradient(ellipse,#fff3c8dd,#ffd88a66 45%,#ffd88a00 72%);opacity:0;mix-blend-mode:screen}
.btr-stage{inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(14px,3.4vmin,34px);padding:0 16px}
.btr-stage>*{position:relative}
.btr-sky{width:min(92vw,720px);height:clamp(128px,26vmin,220px);opacity:0;flex:none}
.btr-skybg{inset:0;border-radius:64px 64px 18px 18px;background:linear-gradient(var(--bt-s0),var(--bt-s1));-webkit-mask:linear-gradient(90deg,#0000,#000 9%,#000 91%,#0000);mask:linear-gradient(90deg,#0000,#000 9%,#000 91%,#0000);box-shadow:0 0 0 1px #0001,0 8px 28px #0003}
.btr-skin{inset:0;background:center/cover no-repeat;-webkit-mask:linear-gradient(90deg,#0000,#000 9%,#000 91%,#0000);mask:linear-gradient(90deg,#0000,#000 9%,#000 91%,#0000)}
.btr-hills{left:0;right:0;bottom:0;height:80%;background:url("${BTR_BASE}buoi-hills.webp") center bottom/100% 100% no-repeat;opacity:.9;-webkit-mask:linear-gradient(90deg,#0000,#000 9%,#000 91%,#0000);mask:linear-gradient(90deg,#0000,#000 9%,#000 91%,#0000)}
.btr-orb{left:0;top:0;width:var(--orb,52px);height:var(--orb,52px);opacity:0;background:url("${BTR_BASE}buoi-orb.webp") no-repeat;background-size:200% 100%;will-change:transform,opacity}
.btr-sun{background-position:0 0}.btr-moon{background-position:100% 0}
.btr-title{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;column-gap:14px;row-gap:2px;width:min(92vw,640px);min-height:clamp(112px,21vmin,170px);padding:10px 24px;box-sizing:border-box;flex:none}
.btr-plate{inset:0;background:var(--bt-tint);-webkit-mask:url("${BTR_BASE}buoi-wash.webp") center/100% 100% no-repeat;mask:url("${BTR_BASE}buoi-wash.webp") center/100% 100% no-repeat;opacity:.96}
.btr-title b{position:relative;font-family:var(--display);font-weight:700;font-size:clamp(2.1rem,8.5vmin,3.7rem);letter-spacing:.14em;color:var(--bt-ink);text-shadow:0 1px 0 #fff7,0 0 16px color-mix(in srgb,var(--bt-tint) 92%,#fff0);white-space:nowrap}
.btr-ico{position:relative;width:clamp(48px,10vmin,80px);aspect-ratio:1;background:center/contain no-repeat;filter:drop-shadow(0 2px 4px #0003)}
.btr-seal{position:relative;width:clamp(34px,6vmin,50px);height:clamp(34px,6vmin,50px);opacity:0}
.btr-sub{position:relative;flex:1 0 100%;text-align:center;font-family:var(--display);font-size:clamp(.95rem,3vmin,1.25rem);letter-spacing:.22em;color:var(--bt-ink);opacity:.82}
`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§74",title:"buổi transition · buoiShift (qua buổi: nước mực toàn màn, vầng trời, chữ thư pháp; mùa + lễ)",
 html:()=>`<div class="kitpg-row">${[0,1,2,3].map(b=>`<button type="button" class="kbtn alt" onclick="(function(){const s=S.buoi;S.buoi=${b};buoiShift();S.buoi=s})()">${BUOI[b]}</button>`).join("")}</div>`+
 `<div class="kitpg-row">${[["xuan","Xuân"],["ha","Hạ"],["thu","Thu"],["dong","Đông"]].map(([k,n])=>`<button type="button" class="kbtn alt" onclick="(function(){const s=S.buoi;S.buoi=1;window.__btrVar={sea:'${k}'};buoiShift();S.buoi=s;setTimeout(()=>{window.__btrVar=null},60)})()">${n}</button>`).join("")}</div>`+
 `<div class="kitpg-row">${Object.keys(BTR_FEST).map(k=>`<button type="button" class="kbtn alt" onclick="(function(){const s=S.buoi;S.buoi=1;window.__btrVar={sea:'xuan',fest:'${k}'};buoiShift();S.buoi=s;setTimeout(()=>{window.__btrVar=null},60)})()">${(typeof FEST!=="undefined"&&FEST[k]&&FEST[k].name)||k}</button>`).join("")}</div>`})}catch(e){}
