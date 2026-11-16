/* ================= jbuoi: BUỔI TRANSITION (KIT §74, owner 15/11 "Animation qua buổi … lật trang sách. Kỳ quá", review/buoi-transition) =================
   Replaces the old buổi change (dark ink wipe + paper-page sound + incense curtain, j11 / j18 / j93) with a painted time-of-day transition:
   the scene (already holding the next buổi's light, §56) is veiled by a tinted ink wash that thins out; a small painted sky band slides the sun / moon
   along its arc between the buổi positions; the new buổi name is a brush-calligraphy title with the kit seal. Night -> morning = dawn variant
   (mist + first light). ~1.7 s (dawn 2 s). Tap anywhere = skip (the tap still reaches the game: listener only, never blocks).
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
/* sun / moon on a 0..1 arc: t = place along the band, v = visible (0..1) per buổi */
const BTR_POS=[{s:{t:.12,v:1},m:{t:1.1,v:0}},{s:{t:.5,v:1},m:{t:1.1,v:0}},{s:{t:.86,v:1},m:{t:-.1,v:0}},{s:{t:1.08,v:0},m:{t:.5,v:1}}];
let btrPrev=null,btrEl=null,btrEnd=null;
function btrStill(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function btrKill(){if(btrEnd){const f=btrEnd;btrEnd=null;f()}}
function btrArc(a,b,W,H){const K=[],n=14;for(let i=0;i<=n;i++){const u=i/n,e=u*u*(3-2*u),t=a.t+(b.t-a.t)*e,v=a.v+(b.v-a.v)*e;
  const x=t*W,y=H*.78-Math.sin(Math.max(0,Math.min(1,t))*Math.PI)*H*.62;K.push({transform:`translate(${x.toFixed(1)}px,${y.toFixed(1)}px)`,opacity:Math.max(0,Math.min(1,v*(t<0||t>1?Math.max(0,1-Math.abs(t<0?t:t-1)*8):1)))})}return K}
function buoiShift(){
 try{if(!S||window.__bot||(typeof quiet!=="undefined"&&quiet))return;btrKill();
  try{if(typeof kitSfx==="function")kitSfx((typeof B4L!=="undefined"&&(S.buoi||0)===B4L)?"nightWatch":"buoi")}catch(e){}
  const b=((S.buoi||0)%4+4)%4,prev=btrPrev!=null?btrPrev:(b+3)%4;btrPrev=b;const C=BTR_C[b];
  const d=document.createElement("div");d.id="buoitr";d.className="btr b"+b;d.setAttribute("aria-hidden","true");d.style.cssText=`--bt-tint:${C.tint};--bt-wash:${C.wash};--bt-ink:${C.ink};--bt-s0:${C.sky[0]};--bt-s1:${C.sky[1]}`;
  const still=btrStill(),dawn=b===0&&prev===3,dur=still?260:dawn?2000:1700;
  d.innerHTML=still?`<i class="btr-tint"></i>`:
   `<i class="btr-tint"></i><i class="btr-wash"></i>${dawn?`<i class="btr-mist"></i><i class="btr-light"></i>`:""}`+
   `<div class="btr-sky"><i class="btr-skybg"></i><i class="btr-hills"></i><i class="btr-orb btr-sun"></i><i class="btr-orb btr-moon"></i></div>`+
   `<div class="btr-title"><i class="btr-plate"></i><b>${BUOI[b]}</b>${typeof kitSeal==="function"?kitSeal({cls:"btr-seal"}):""}</div>`;
  document.body.appendChild(d);btrEl=d;
  let done=false;const end=ms=>{if(done)return;done=true;btrEnd=null;removeEventListener("pointerdown",skip,true);d.style.transition=`opacity ${ms||250}ms`;d.style.opacity="0";setTimeout(()=>{d.remove();if(btrEl===d)btrEl=null},(ms||250)+30)};
  const skip=()=>end(140);btrEnd=()=>end(0);
  if(!still){
   const A=d.animate?1:0;if(A){
    const dim=dur;d.querySelector(".btr-tint").animate([{opacity:.85},{opacity:.55,offset:.35},{opacity:0}],{duration:dim,easing:"ease-out",fill:"forwards"});
    d.querySelector(".btr-wash").animate([{opacity:.9,transform:"translateX(-6%) scale(1.15)"},{opacity:.6,offset:.4},{opacity:0,transform:"translateX(7%) scale(1.25)"}],{duration:dim,easing:"ease-in-out",fill:"forwards"});
    const mi=d.querySelector(".btr-mist");if(mi)mi.animate([{opacity:0,transform:"translateX(-4%)"},{opacity:.8,offset:.35},{opacity:0,transform:"translateX(5%)"}],{duration:dim,easing:"ease-in-out",fill:"forwards"});
    const li=d.querySelector(".btr-light");if(li)li.animate([{opacity:0,transform:"translateY(30%) scale(.7)"},{opacity:.9,offset:.5},{opacity:0,transform:"translateY(-6%) scale(1.15)"}],{duration:dim,easing:"ease-out",fill:"forwards"});
    const sk=d.querySelector(".btr-sky");sk.animate([{opacity:0,transform:"translateY(-14px)"},{opacity:1,offset:.18,transform:"none"},{opacity:1,offset:.8},{opacity:0}],{duration:dim,fill:"forwards"});
    const bw=Math.min(innerWidth*.86,540),bh=96,P=BTR_POS[prev]||BTR_POS[0],N=BTR_POS[b];const o=(sel,k)=>{const e=d.querySelector(sel);e.animate(btrArc(P[k],N[k],bw-40,bh-40),{duration:dim*.78,delay:dim*.1,easing:"ease-in-out",fill:"both"})};o(".btr-sun","s");o(".btr-moon","m");
    const ti=d.querySelector(".btr-title");ti.animate([{opacity:0,transform:"translateY(8px) scale(.96)",filter:"blur(5px)"},{opacity:1,offset:.28,transform:"none",filter:"blur(0)"},{opacity:1,offset:.8},{opacity:0}],{duration:dim,fill:"forwards"});
    const se=d.querySelector(".btr-seal");if(se)se.animate([{opacity:0,transform:"scale(1.9) rotate(-8deg)"},{opacity:0,offset:.38,transform:"scale(1.9) rotate(-8deg)"},{opacity:1,offset:.5,transform:"scale(1) rotate(-2deg)"},{opacity:1}],{duration:dim,fill:"forwards"});
    if(dawn&&typeof kitFxBurst==="function"&&!btrStill())setTimeout(()=>{try{kitFxBurst("glowburst",{x:innerWidth*.5,y:innerHeight*.62},1,{scale:1.6,a0:.7})}catch(e){}},dim*.3);
   }
   addEventListener("pointerdown",skip,true);
  }else if(d.animate)d.querySelector(".btr-tint").animate([{opacity:.7},{opacity:0}],{duration:dur,fill:"forwards"});
  setTimeout(()=>{if(!window.__btrHold)end(still?30:260)},dur);
 }catch(e){console.error("buoiShift",e)}}
(function(){const st=document.createElement("style");st.id="btr-css";st.textContent=`
.btr{position:fixed;inset:0;z-index:36;pointer-events:none;overflow:hidden}
.btr>*,.btr-sky>*,.btr-plate{position:absolute;pointer-events:none}.btr-title{position:absolute}
.btr-tint{inset:0;background:radial-gradient(ellipse at 50% 55%,var(--bt-tint),color-mix(in srgb,var(--bt-tint) 70%,#fff0));opacity:0}
.btr-wash{left:-25%;right:-25%;top:-10%;bottom:-10%;background:var(--bt-wash);-webkit-mask:url("${BTR_BASE}buoi-wash.webp") center/100% 100% no-repeat;mask:url("${BTR_BASE}buoi-wash.webp") center/100% 100% no-repeat;opacity:0;will-change:transform,opacity}
.btr-mist{left:-15%;right:-15%;top:25%;bottom:-5%;background:url("${BTR_BASE}buoi-mist.webp") center/100% 100% no-repeat;opacity:0;will-change:transform,opacity}
.btr-light{left:50%;top:50%;width:min(80vw,520px);aspect-ratio:2/1;margin-left:calc(min(80vw,520px)/-2);margin-top:5%;border-radius:50%;background:radial-gradient(ellipse,#fff3c8cc,#ffd88a55 45%,#ffd88a00 72%);opacity:0;mix-blend-mode:screen}
.btr-sky{left:50%;top:max(15%,52px);width:min(86vw,540px);height:96px;margin-left:calc(min(86vw,540px)/-2);opacity:0}
.btr-skybg{inset:0;border-radius:48px 48px 14px 14px;background:linear-gradient(var(--bt-s0),var(--bt-s1));-webkit-mask:linear-gradient(90deg,#0000,#000 12%,#000 88%,#0000);mask:linear-gradient(90deg,#0000,#000 12%,#000 88%,#0000);box-shadow:0 0 0 1px #0001}
.btr-hills{left:0;right:0;bottom:0;height:80%;background:url("${BTR_BASE}buoi-hills.webp") center bottom/100% 100% no-repeat;opacity:.85;-webkit-mask:linear-gradient(90deg,#0000,#000 12%,#000 88%,#0000);mask:linear-gradient(90deg,#0000,#000 12%,#000 88%,#0000)}
.btr-orb{left:0;top:0;width:40px;height:40px;opacity:0;background:url("${BTR_BASE}buoi-orb.webp") no-repeat;background-size:200% 100%;will-change:transform,opacity}
.btr-sun{background-position:0 0}.btr-moon{background-position:100% 0}
.btr-title{left:0;right:0;top:calc(max(15%,52px) + 118px);display:flex;align-items:center;justify-content:center;gap:12px}
.btr-plate{left:50%;top:50%;width:min(86vw,420px);height:110px;margin:-55px 0 0 calc(min(86vw,420px)/-2);background:var(--bt-tint);-webkit-mask:url("${BTR_BASE}buoi-wash.webp") center/100% 100% no-repeat;mask:url("${BTR_BASE}buoi-wash.webp") center/100% 100% no-repeat;opacity:.9}
.btr-title b{position:relative;font-family:var(--display);font-weight:700;font-size:clamp(1.7rem,6vw,2.4rem);letter-spacing:.14em;color:var(--bt-ink);text-shadow:0 1px 0 #fff6,0 0 14px color-mix(in srgb,var(--bt-tint) 90%,#fff0);white-space:nowrap}
.btr-seal{position:relative;width:34px;height:34px;opacity:0}
`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§74",title:"buổi transition · buoiShift (qua buổi: nước mực, vầng trời, chữ thư pháp)",
 html:()=>`<div class="kitpg-row">${[0,1,2,3].map(b=>`<button type="button" class="kbtn alt" onclick="(function(){const s=S.buoi;S.buoi=${b};buoiShift();S.buoi=s})()">${BUOI[b]}</button>`).join("")}</div>`})}catch(e){}
