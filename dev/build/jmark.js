
/* ================= jmark: kitMeMark — "this is HER" marker over the player's head (owner 11/15: "không biết ai là mình") =================
   kitMeMark(figEl): a small painted palace hair-ornament emblem floating above the head of HER figure. One component for every place her
   full-body figure is drawn: the stage (#mefig, whatever slot she stands in) and dialogs / event stages (kitStageFig → figure.kesf.kesme).
   Never on anyone else (kitMeMark refuses a figure that is not marked as hers).
   EIGHT markers, one per rank 0→7 (owner 11/15): img/kit/me-mark-<r>.webp (gpt-2-6, transparent, no tassel), growing in grandeur:
   0 ivory plum blossom · 1 silver orchid + green jade · 2 silver flower + aquamarine · 3 jade lotus bud (Tần) · 4 amethyst chrysanthemum + luan ·
   5 ruby peony · 6 gold phoenix on a jade cloud · 7 amber-gold phoenix with spread wings (Hoàng hậu; owner 11/15 swap). Size factor KIT_MEMARK.sc[r].
   ONE PLACEMENT RULE: marker bottom = TOP OF HER HEAD (first opaque row of the figure art, hair ornaments included) − gap, gap = KIT_MEMARK.gap ×
   her drawn figure height (same fraction for every figure, size and screen). Never covers the head; when there is not enough room above the head
   (dialogs, the scene title) the marker SHRINKS instead (down to KIT_MEMARK.tiny px).
   Motion: squash-and-bounce loop (17/11), only with Cảnh động on and no reduced motion. A very faint soft shadow keeps it readable on busy paintings.
   ITEMS: markers are owned items (S.meMarks = ranks owned; S.meMark = the one she shows, null = highest owned). Every promotion gives that rank's
   marker (shown in the rank chest of review/gift-chest — jrankset rsChest/kitReward kind "chest" — via the hook below); old saves get every rank
   up to the current one on load. Tư trang has a "Dấu ấn" tab; tapping a marker → "Dùng" switches to it (any owned one, older ones too). ===== */
window.KIT_MEMARK=window.KIT_MEMARK||{h:.085,gap:.012,min:26,max:72,tiny:12,big:1.05,sc:[.78,.84,.9,.95,1,1.06,1.14,1.22]};
const KMM_NAMES=["Mai ngà","Lan bạc ngọc bích","Hoa bạc ngọc lam","Búp sen ngọc","Cúc tím chim loan","Mẫu đơn hồng ngọc","Phượng vàng mây ngọc","Cánh phượng hổ phách"];
/* ---------- owned markers (save data) ---------- */
function kmmRankNow(){try{if(!S||S.out)return null;if(typeof isSrv==="function"&&isSrv())return null;return Math.max(0,Math.min(7,S.rank|0))}catch(e){return null}}
function kmmOwned(){try{if(!S)return[];const r=kmmRankNow();if(!Array.isArray(S.meMarks)){S.meMarks=[];if(r!=null)for(let i=0;i<=r;i++)S.meMarks.push(i)}
 else if(r!=null&&!S.meMarks.includes(r)){for(let i=0;i<=r;i++)if(!S.meMarks.includes(i))S.meMarks.push(i)}S.meMarks.sort((a,b)=>a-b);return S.meMarks}catch(e){return[]}}
function kmmCur(){const L=kmmOwned();if(!L.length)return null;const c=S.meMark;return c!=null&&L.includes(c)?c:L[L.length-1]}
function kmmSrc(r){return `img/kit/me-mark-${r}.webp`}
window.kitMeMarkUse=function(r){const L=kmmOwned();if(!L.includes(r))return false;S.meMark=r;kmmSched();return true};
/* ---------- head measurement (once per picture) ---------- */
const KMM_HEAD={};
/* x = mean x of the opaque pixels in the top 10 % of the body; t = first opaque row (hair ornaments included); fractions of the picture */
function kmmHead(src,cb){const o=KMM_HEAD[src];if(o&&o.v)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KMM_HEAD[src]=e;
 const im=new Image();im.decoding="async";im.crossOrigin="anonymous";
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f()}catch(x){}})};
 im.onload=()=>{let v={t:0,x:.5};try{const h=400,w=Math.max(1,Math.round(im.naturalWidth*h/im.naturalHeight));const c=document.createElement("canvas");c.width=w;c.height=h;
   const g=c.getContext("2d",{willReadFrequently:true});g.drawImage(im,0,0,w,h);const d=g.getImageData(0,0,w,h).data;let t=-1,b=-1;
   for(let y=0;y<h;y++){const q=y*w*4;let n=0;for(let i=0;i<w;i++)if(d[q+i*4+3]>60)n++;if(n>=2){if(t<0)t=y;b=y}}
   if(t>=0){const lim=t+Math.max(2,Math.round((b-t)*.1));let sx=0,n=0;for(let y=t;y<=lim;y++){const q=y*w*4;for(let i=0;i<w;i++)if(d[q+i*4+3]>60){sx+=i;n++}}v={t:t/h,x:n?sx/n/w:.5}}}catch(x){}done(v)};
 im.onerror=()=>done({t:0,x:.5});im.src=src;return null}
function kitMeMapMark(){try{const r=kmmCur();if(r==null)return"";return `<span class="kmmapmk${kmmMotion()?" kmmove":""}" aria-hidden="true" style="--kmm-mapsc:${((KIT_MEMARK.sc[r]||1)*(KIT_MEMARK.big||1)).toFixed(3)}"><img alt="" draggable="false" src="${kmmSrc(r)}" onerror="this.parentNode.style.display='none'"></span>`}catch(e){return""}}
function kmmMotion(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kmmIsMe(fig){return!!fig&&(fig.id==="mefig"||!!fig.closest(".kesme"))}
function kmmAvoid(){const L=[];document.querySelectorAll("#sc-t h2,#kshL,#kshR,.k3chips,.kchip,.kmnote,#j59metag .tag").forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.height>0)L.push(r)});return L}
/* the drawn picture box inside an <img> (object-fit: contain) */
function kmmBox(fig){const fr=fig.getBoundingClientRect();let bx=fr.left,by=fr.top,bw=fr.width,bh=fr.height;const nw=fig.naturalWidth,nh=fig.naturalHeight;
 if(nw&&nh){const ar=nw/nh;if(bw/bh>ar){const w=bh*ar;bx+=(bw-w)/2;bw=w}else{const h=bw/ar;by+=(bh-h)/2;bh=h}}return{bx,by,bw,bh}}
function kitMeMark(fig){try{
 if(!fig||!kmmIsMe(fig)||!fig.isConnected)return null;const host=fig.offsetParent||fig.parentElement;if(!host)return null;
 let mk=host.querySelector(":scope>.kmemark");const r=kmmCur();if(r==null){if(mk)mk.remove();return null}
 const src=kmmSrc(r);
 if(!mk){mk=document.createElement("span");mk.className="kmemark";mk.setAttribute("aria-hidden","true");mk.innerHTML=`<img alt="" draggable="false">`;host.appendChild(mk)}
 const im=mk.firstChild;if(im.getAttribute("src")!==src){im.onerror=()=>{mk.style.display="none"};im.onload=()=>{mk.style.display="";kmmSched()};im.setAttribute("src",src)}
 const fsrc=fig.currentSrc||fig.getAttribute("src")||"";const hd=fsrc?kmmHead(fsrc,()=>kitMeMark(fig)):{t:0,x:.5};if(!hd){mk.style.visibility="hidden";return mk}
 const B=kmmBox(fig),hr=host.getBoundingClientRect();if(B.bh<20){mk.style.visibility="hidden";return mk}
 const K=KIT_MEMARK,sc=K.sc[r]||1;let H=Math.round(Math.max(K.min*sc,Math.min(K.max*sc,B.bh*K.h*sc))*(K.big||1)); /* owner 17/11 07:15Z: +5 % (K.big, one kit value; 2–8 % allowed) */
 const ar=im.naturalWidth&&im.naturalHeight?im.naturalWidth/im.naturalHeight:1;
 const cx=B.bx+B.bw*hd.x,headTop=B.by+B.bh*hd.t,gap=Math.max(1,B.bh*K.gap),bottom=headTop-gap;
 /* room above the head: the host's top edge, and anything the marker must not cover (scene title, plaques, chips) */
 /* dialogs: the room above the figure is the figure column (the free space over the head inside the dialog), not just the figure box */
 let roomTop=hr.top+1;const col=fig.id==="mefig"?null:fig.closest(".kesf");if(col){const cb=(col.parentElement||col).getBoundingClientRect();roomTop=Math.min(roomTop,cb.top+2)}for(const q of kmmAvoid()){const W=H*ar;if(cx+W/2>q.left&&cx-W/2<q.right&&q.bottom<=bottom&&q.bottom>roomTop-1)roomTop=Math.max(roomTop,q.bottom+1)}
 if(bottom-roomTop<H)H=Math.max(K.tiny,Math.floor(bottom-roomTop));
 const W=Math.round(H*ar),top=bottom-H;
 mk.style.cssText=`left:${(cx-hr.left-W/2+host.scrollLeft).toFixed(1)}px;top:${(top-hr.top+host.scrollTop).toFixed(1)}px;width:${W}px;height:${H}px`;
 mk.dataset.r=r;mk.dataset.gap=(headTop-(top+H)).toFixed(1);mk.classList.toggle("kmmove",kmmMotion());return mk}catch(e){console.error("kitMeMark",e);return null}}
/* drop markers whose figure is gone (scene change, dialog closed) */
function kmmSweep(){document.querySelectorAll(".kmemark").forEach(m=>{const h=m.parentElement;if(!h||!(h.querySelector(":scope>#mefig")||h.querySelector(":scope>img.kesimg")&&h.closest(".kesme")))m.remove()})}
function kmmAll(){kmmSweep();const me=document.getElementById("mefig");if(me)kitMeMark(me);document.querySelectorAll(".kesme img.kesimg").forEach(kitMeMark)}
/* lag-play (owner 16/11 15:05Z): every DOM change queued ANOTHER frame callback + a 700 ms follow-up that was never cancelled (dozens of
   full mark passes per buổi, each with layout reads). Now one pending frame pass and one timer chain, restarted by the last change. */
let kmmT=0,kmmT2=0,kmmQ=0;function kmmSched(){clearTimeout(kmmT);clearTimeout(kmmT2);if(!kmmQ)kmmQ=requestAnimationFrame(()=>{kmmQ=0;kmmAll()});kmmT=setTimeout(()=>{kmmAll();kmmT2=setTimeout(kmmAll,700)},250)}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{kmmSched()}catch(e){}return r}})();
(function(){if(typeof kitStageFig!=="function")return;const f0=kitStageFig;kitStageFig=function(p,o){let h=f0.apply(this,arguments);try{const q=p&&(p.__kp||p);if(q&&typeof S!=="undefined"&&q===S&&h)h=h.replace('<figure class="kesf"','<figure class="kesf kesme"')}catch(e){}return h}})();
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kmmSched()}catch(e){}return r}})();
addEventListener("resize",kmmSched);
document.addEventListener("load",e=>{const t=e.target;if(t&&t.tagName==="IMG"&&(t.id==="mefig"||t.classList.contains("kesimg")))kmmSched()},true);
try{new MutationObserver(ms=>{if(ms.every(m=>m.target.closest&&m.target.closest(".kmemark")))return;if(document.getElementById("mefig")||document.querySelector(".kesme"))kmmSched();else kmmSweep()})
 .observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:["src","hidden"]})}catch(e){}
(function(){const st=document.createElement("style");st.id="kmm-css";st.textContent=`
/* KIT §41.2 kitMeMapMark(): the SAME marker (her owned rank marker, same glow + squash-bounce loop) over HER place on the Dư đồ (owner 17/11 ~12:20Z "dấu ấn ta ở đây ở trên dư đồ"); the map label shows it above the place name, in the label's own scale. */
.kmmapmk{position:absolute;left:50%;bottom:calc(100% - 1px);height:calc(36px * var(--kmm-mapsc,1));aspect-ratio:1;transform:translateX(-50%);z-index:6;pointer-events:none;display:block;filter:drop-shadow(0 1px 1.5px #2a1a1240) drop-shadow(0 0 2px #fff4c8) drop-shadow(0 0 5px #ffd77aff) drop-shadow(0 0 11px #f7c548d9)}
.mspot .mlab:has(>.kmmapmk){position:relative;overflow:visible!important}
.kmmapmk>img{display:block;width:100%;height:100%;object-fit:contain;object-position:50% 100%;transform-origin:50% 100%}
@media (prefers-reduced-motion:no-preference){.kmmapmk.kmmove>img{animation:kmmBob 2.6s linear infinite;will-change:transform}}
.kmemark{position:absolute;z-index:6;pointer-events:none;display:block;filter:drop-shadow(0 1px 1.5px #2a1a1240) drop-shadow(0 0 2px #fff4c8) drop-shadow(0 0 5px #ffd77aff) drop-shadow(0 0 11px #f7c548d9) drop-shadow(0 0 20px #f2b93b80)}
.kmemark>img{display:block;width:100%;height:100%;object-fit:contain;object-position:50% 100%;transform-origin:50% 100%}
.kesme .kesfi{position:relative}
/* owner 16/11 (face-sharp): only this small mark moves (own layer), never the figure (KIT motion rule STILL PEOPLE).
   owner 17/11 07:00Z/07:15Z (map-me-mark): BRIGHTER static glow (white core + 3 gold halos, no animated filter = perf ≤ live) and a livelier loop:
   a squash-and-bounce — rises, DROPS fast with a squash on landing, small rebound, settles, then rises again. Travel 11 px, squash scaleY .84 / scaleX 1.1,
   transform only, 2.6 s. Reduced motion / Hiệu ứng Gọn (OPT.fxon false): kmmMotion() drops .kmmove → still mark, same glow. */
@media (prefers-reduced-motion:no-preference){.kmemark.kmmove>img{animation:kmmBob 2.6s linear infinite;will-change:transform}}
@keyframes kmmBob{
 0%{transform:translateY(-11px) scale(.98,1.03);animation-timing-function:cubic-bezier(.5,0,.9,.6)}
 22%{transform:translateY(0) scale(1.1,.84);animation-timing-function:cubic-bezier(.2,.7,.3,1)}
 34%{transform:translateY(-5px) scale(.98,1.03);animation-timing-function:cubic-bezier(.5,0,.9,.6)}
 46%{transform:translateY(0) scale(1.04,.94);animation-timing-function:cubic-bezier(.3,.6,.4,1)}
 58%{transform:translateY(-1.5px) scale(1,1);animation-timing-function:ease-in-out}
 78%{transform:translateY(-6px) scale(.99,1.02);animation-timing-function:ease-in-out}
 100%{transform:translateY(-11px) scale(.98,1.03)}}
`;document.head.appendChild(st)})();
/* ---------- markers are items: promotion gives the new rank's marker; the rank chest shows it ---------- */
let kmmLast=null;
function kmmCheck(){try{if(!S||S.dead)return;const r=kmmRankNow();if(r==null)return;const had=Array.isArray(S.meMarks)?S.meMarks.slice():null;kmmOwned();
 if(had&&!had.includes(r)){kmmLast=r;if(S.meMark!=null&&S.meMark<r)S.meMark=null}}catch(e){}}
(function(){if(typeof render!=="function")return;const r0=render;render=function(){kmmCheck();return r0.apply(this,arguments)}})();
/* review/gift-chest (jrankset): the rank chest is kitReward({kind:"chest",title:"Phẩm phục …"}); add that rank's marker to its items.
   When jrankset is absent the marker is still owned (no chest of its own). */
(function(){if(typeof kitReward!=="function")return;const k0=kitReward;kitReward=function(o){try{if(o&&o.kind==="chest"&&/^Phẩm phục/.test(o.title||"")&&Array.isArray(o.items)){
  const r=kmmLast!=null?kmmLast:kmmRankNow();if(r!=null&&!o.items.some(x=>x&&x.mme!=null)){o.items=o.items.concat([{n:`Dấu ấn: ${KMM_NAMES[r]}`,d:"Dấu trên đầu ngươi, cho biết ngươi đứng ở đâu",img:kmmSrc(r),tier:Math.min(4,1+(r>>1)),mme:r}]);kmmLast=null}}}catch(e){}
 return k0.apply(this,arguments)}})();
/* ---------- Tư trang: "Dấu ấn" tab ---------- */
try{if(typeof KINV_CATS!=="undefined"&&!KINV_CATS.some(c=>c[0]==="dau"))KINV_CATS.push(["dau","Dấu ấn",[]])}catch(e){}
(function(){if(typeof kinvItems!=="function")return;const k0=kinvItems;kinvItems=function(){const L=k0.apply(this,arguments);try{const cur=kmmCur();
  for(const r of kmmOwned())L.push({id:"mme"+r,cat:"dau",mme:r,src:kmmSrc(r),src512:kmmSrc(r),name:KMM_NAMES[r],grade:Math.min(4,r>>1),qty:1,on:r===cur,onText:"Đang mặc",lux:0,
   tip:`Dấu ấn ${RANKS[r]?RANKS[r].n:""}${r===cur?" · đang dùng":""}`})}catch(e){}return L}})();
(function(){if(typeof kinvOpen!=="function")return;const o0=kinvOpen;kinvOpen=function(x){if(!x||x.mme==null)return o0.apply(this,arguments);try{const r=x.mme,on=r===kmmCur();
  kitModal({kind:"info",title:KMM_NAMES[r],sub:`Dấu ấn · ${RANKS[r]?RANKS[r].n:""}`,itemPic:kitItem({src:x.src,name:"",grade:x.grade,size:"lg"}).replace('<span class="kitn"></span>',''),
   html:`${kitFacts([`Được ban khi lên ${RANKS[r]?RANKS[r].n:""}.`,on?"Ngươi đang dùng dấu này.":"Dấu hiện trên đầu ngươi ở mọi cảnh, để biết ngươi đứng ở đâu."])}`+
    (on?"":`<div class="rbtn kinvacts">${pbtn(`data-kmmuse="${r}"`,"Dùng","thành: dấu này hiện trên đầu ngươi","")}</div>`),btn:"Lui"})}catch(e){console.error("kmm open",e)}}})();
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-kmmuse]");if(!b)return;e.stopPropagation();e.preventDefault();
 const r=+b.dataset.kmmuse;try{closeModal()}catch(x){}if(window.kitMeMarkUse(r)){try{render()}catch(x){}}},true);
