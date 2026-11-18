/* ================= jbuoi: BUỔI BANNER (KIT §74; owner 18/11 ~06:20Z CANON OVERWRITE of the 15/11 ink-wash transition) =================
   On every buổi change she STAYS on the game screen: no other scene, no veil, no sky band, no new painting. ONLY the buổi title ("Buổi trưa" …) shows, in a
   RECTANGLE kit plaque (the §31.2 stage-plaque look: --k3pl ground, 1 px --line, radius 8), just under the bottom edge of the fixed top bar (.hud), semi-transparent
   (BTR_OP = 0.80; owner "70 %, 85 %", the 70 / 80 / 85 ladder was shown to her; hook window.__btrOp), brief fade in / hold / out (kitPace(860) = ~1.5 s at BAL.pace 1.75; Gọn 0.7 s).
   The scene light change (§56) is the only background change. Tap anywhere = continue at once (listener only; the tap still reaches the game).
   Visual only: runs AFTER the state has been applied (curtain() calls it after nextBuoi changed S.buoi), never awaited, never touches sync (co-op plays it locally). Bots / quiet: nothing.
   A new tuần still shows the dawn() week summary (j18). Night -> morning reads "Buổi sáng" like any other change. */
const BTR_OP=.8;
let btrEl=null,btrEnd=null;
function btrStill(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function btrKill(){if(btrEnd){const f=btrEnd;btrEnd=null;f()}}
function buoiShift(){
  try{if(!S||window.__bot||(typeof quiet!=="undefined"&&quiet))return;btrKill();
   try{if(typeof kitSfx==="function")kitSfx((typeof B4L!=="undefined"&&(S.buoi||0)===B4L)?"nightWatch":"buoi")}catch(e){}
   const b=((S.buoi||0)%4+4)%4,op=window.__btrOp!=null?+window.__btrOp:BTR_OP;
   const d=document.createElement("div");d.id="buoitr";d.className="btr b"+b;d.setAttribute("aria-hidden","true");
   const h=document.querySelector("header.hud"),r=h?h.getBoundingClientRect():null;d.style.top=Math.max(0,r&&r.height?Math.round(r.bottom+6):0)+"px";d.style.setProperty("--btr-op",op);
   d.innerHTML=`<b class="btr-t">${BUOI[b]}</b>`;document.body.appendChild(d);btrEl=d;
   const still=btrStill(),dur=still?700:kitPace(860),fin=still?120:kitPace(150),fout=still?220:kitPace(240);
   let done=false;const end=ms=>{if(done)return;done=true;btrEnd=null;removeEventListener("pointerdown",skip,true);d.style.transition=`opacity ${ms}ms`;d.style.opacity="0";setTimeout(()=>{d.remove();if(btrEl===d)btrEl=null},ms+30)};
   const skip=()=>end(60);btrEnd=()=>end(0);addEventListener("pointerdown",skip,true);
   if(d.animate)d.animate([{opacity:0},{opacity:op,offset:fin/dur},{opacity:op,offset:Math.max(fin/dur,1-fout/dur)},{opacity:0}],{duration:dur,fill:"forwards"});
   setTimeout(()=>{if(!window.__btrHold)end(30)},dur);
  }catch(e){console.error("buoiShift",e)}}
(function(){const st=document.createElement("style");st.id="btr-css";st.textContent=`
.btr{position:fixed;left:0;right:0;z-index:36;display:flex;justify-content:center;pointer-events:none;opacity:0}
.btr-t{pointer-events:none;display:block;box-sizing:border-box;min-width:min(60vw,220px);max-width:92vw;padding:6px 26px;text-align:center;white-space:nowrap;background:var(--k3pl,rgba(255,250,240,.88));border:1px solid var(--line);border-radius:8px;box-shadow:0 1px 4px #3a20101f;font-family:var(--display);font-weight:700;font-size:clamp(1.1rem,3.4vmin,1.6rem);letter-spacing:.14em;color:var(--ink)}
`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§74",title:"buổi banner · buoiShift (qua buổi: chỉ tên buổi trong khung chữ nhật dưới thanh trên, mờ nhẹ)",
  html:()=>`<div class="kitpg-row">${[0,1,2,3].map(b=>`<button type="button" class="kbtn alt" onclick="(function(){const s=S.buoi;S.buoi=${b};buoiShift();S.buoi=s})()">${BUOI[b]}</button>`).join("")}</div>`})}catch(e){}
