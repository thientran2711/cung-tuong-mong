
/* ================= jmark: kitMeMark — "this is HER" marker over the player's head (owner 11/15: "không biết ai là mình") =================
   kitMeMark(figEl): a small painted palace emblem (img/kit/me-mark.webp, gpt-2-6, transparent) floating just above the head of HER figure.
   One component for every place her full-body figure is drawn: the stage (#mefig, whatever slot she stands in) and dialogs / event stages
   (kitStageFig → figure.kesf.kesme). Never on anyone else (callers pass only her figure; kitMeMark also refuses a figure not marked as hers).
   Position: centred on the head (opaque top rows of the figure art, measured once per picture), bottom of the emblem 2 px above the hair.
   It never covers the scene title (#sc-t) or the stage plaques/chips (#kshL, #kshR, .k3chips…): if it would, it is nudged down onto the hair.
   Motion: slow float + soft glow pulse, only when "Cảnh động" (OPT.fxon) is on and the system does not ask for reduced motion.
   Data: KIT_MEMARK {src, h (fraction of her figure height), min, max (px)}. ============================================================= */
window.KIT_MEMARK=window.KIT_MEMARK||{src:"img/kit/me-mark.webp",h:.115,min:30,max:76,ar:.62};
const KMM_HEAD={};
/* head centre of a figure picture: mean x of the opaque pixels in the top 10 % of the body; t = top of the body (fractions) */
function kmmHead(src,cb){const o=KMM_HEAD[src];if(o&&o.v)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KMM_HEAD[src]=e;
 const im=new Image();im.decoding="async";im.crossOrigin="anonymous";
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f()}catch(x){}})};
 im.onload=()=>{let v={t:0,x:.5};try{const h=200,w=Math.max(1,Math.round(im.naturalWidth*h/im.naturalHeight));const c=document.createElement("canvas");c.width=w;c.height=h;
   const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;let t=-1,b=-1;
   for(let y=0;y<h;y++){const q=y*w*4;for(let i=0;i<w;i++)if(d[q+i*4+3]>60){if(t<0)t=y;b=y;break}}
   if(t>=0){const lim=t+Math.max(2,Math.round((b-t)*.1));let sx=0,n=0;for(let y=t;y<=lim;y++){const q=y*w*4;for(let i=0;i<w;i++)if(d[q+i*4+3]>60){sx+=i;n++}}v={t:t/h,x:n?sx/n/w:.5}}}catch(x){}done(v)};
 im.onerror=()=>done({t:0,x:.5});im.src=src;return null}
function kmmMotion(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kmmIsMe(fig){return!!fig&&(fig.id==="mefig"||!!fig.closest(".kesme"))}
/* rectangles the emblem must never cover */
function kmmAvoid(){const L=[];document.querySelectorAll("#sc-t h2,#kshL,#kshR,.k3chips,.kchip,.kmnote,#j59metag .tag").forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.height>0)L.push(r)});return L}
function kitMeMark(fig){try{
 if(!fig||!kmmIsMe(fig)||!fig.isConnected)return null;const host=fig.offsetParent||fig.parentElement;if(!host)return null;
 let mk=host.querySelector(":scope>.kmemark");
 if(!mk){mk=document.createElement("span");mk.className="kmemark";mk.setAttribute("aria-hidden","true");
  mk.innerHTML=`<img src="${KIT_MEMARK.src}" alt="" draggable="false" onerror="this.parentNode&&this.parentNode.remove()">`;host.appendChild(mk)}
 const src=fig.currentSrc||fig.getAttribute("src")||"";const hd=src?kmmHead(src,()=>kitMeMark(fig)):{t:0,x:.5};if(!hd){mk.style.visibility="hidden";return mk}
 const fr=fig.getBoundingClientRect(),hr=host.getBoundingClientRect();if(fr.height<20){mk.style.visibility="hidden";return mk}
 /* object-fit: contain → the drawn picture box inside the element */
 let bx=fr.left,by=fr.top,bw=fr.width,bh=fr.height;const nw=fig.naturalWidth,nh=fig.naturalHeight;
 if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}
 const H=Math.round(Math.max(KIT_MEMARK.min,Math.min(KIT_MEMARK.max,bh*KIT_MEMARK.h))),W=Math.round(H*KIT_MEMARK.ar);
 const cx=bx+bw*hd.x,headTop=by+bh*hd.t;let top=headTop-2-H;
 const hostTop=hr.top+2;if(top<hostTop)top=hostTop;
 /* never over the scene title / plaques / chips: push it down below them (onto the hair) */
 for(const r of kmmAvoid()){if(cx+W/2>r.left&&cx-W/2<r.right&&top<r.bottom&&top+H>r.top)top=Math.max(top,r.bottom+2)}
 mk.style.cssText=`left:${(cx-hr.left-W/2+host.scrollLeft).toFixed(1)}px;top:${(top-hr.top+host.scrollTop).toFixed(1)}px;width:${W}px;height:${H}px`;
 mk.classList.toggle("kmmove",kmmMotion());mk.style.visibility="";return mk}catch(e){return null}}
/* drop markers whose figure is gone (scene change, dialog closed) */
function kmmSweep(){document.querySelectorAll(".kmemark").forEach(m=>{const h=m.parentElement;if(!h||!(h.querySelector("#mefig")||h.querySelector(".kesme img.kesimg")||h.closest(".kesme")))m.remove()})}
function kmmAll(){kmmSweep();const me=document.getElementById("mefig");if(me)kitMeMark(me);document.querySelectorAll(".kesme img.kesimg").forEach(kitMeMark)}
let kmmT=0;function kmmSched(){clearTimeout(kmmT);requestAnimationFrame(kmmAll);kmmT=setTimeout(()=>{kmmAll();setTimeout(kmmAll,700)},250)}
/* stage: after every renderStage (figure sizes settle a little later: re-place twice) */
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{kmmSched()}catch(e){}return r}})();
/* dialogs / event stages: her figure carries .kesme */
(function(){if(typeof kitStageFig!=="function")return;const f0=kitStageFig;kitStageFig=function(p,o){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);if(q&&typeof S!=="undefined"&&q===S&&h)h=h.replace('<figure class="kesf"','<figure class="kesf kesme"')}catch(e){}return h}})();
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kmmSched()}catch(e){}return r}})();
addEventListener("resize",kmmSched);
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&(t.id==="mefig"||t.classList.contains("kesimg")))kmmSched()},true);
try{new MutationObserver(()=>{if(document.getElementById("mefig")||document.querySelector(".kesme"))kmmSched();else kmmSweep()}).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src","class","hidden"]})}catch(e){}
(function(){const st=document.createElement("style");st.id="kmm-css";st.textContent=`
.kmemark{position:absolute;z-index:6;pointer-events:none;display:block;filter:drop-shadow(0 1px 1.5px #3a1d1099) drop-shadow(0 0 3px #fff3c4cc)}
.kmemark>img{position:relative;display:block;width:100%;height:100%;object-fit:contain}
.kmemark::before{content:"";position:absolute;left:-45%;right:-45%;top:-12%;bottom:-12%;border-radius:50%;background:radial-gradient(closest-side,#fff8e6e6,#fff3d0a0 45%,#fff3d000 100%);pointer-events:none}
.kesme .kesfi{position:relative}
@media (prefers-reduced-motion:no-preference){
 .kmemark.kmmove{animation:kmmGlow 3.2s ease-in-out infinite}
 .kmemark.kmmove>img{animation:kmmFloat 3.2s ease-in-out infinite}}
@keyframes kmmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes kmmGlow{0%,100%{filter:drop-shadow(0 1px 1.5px #3a1d1099) drop-shadow(0 0 2px #fff3c4aa)}50%{filter:drop-shadow(0 1px 1.5px #3a1d1099) drop-shadow(0 0 8px #ffe39a)}}
 .kmemark.kmmove::before{animation:kmmHalo 3.2s ease-in-out infinite}
@keyframes kmmHalo{0%,100%{opacity:.75;transform:scale(.94)}50%{opacity:1;transform:scale(1.06)}}
`;document.head.appendChild(st)})();
