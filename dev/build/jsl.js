/* ---- jsl: KIT ÁNH SÁNG NHÂN VẬT THEO BUỔI (review/scene-light, sếp 11/15 10:10Z) ----
   Tranh nhân vật vẽ ở ánh sáng ban ngày; đặt lên nền trưa/chiều/tối thì lạc quẻ. Kit này cho mọi nhân vật đứng trên sân khấu
   (#mefig, #tokens .tok.fig .figimg) và trong hộp thoại sự kiện (.kesimg) nhận MỘT lớp sáng nhẹ khớp buổi + mùa:
     sáng: không đổi · trưa: ấm sáng nhẹ · chiều: phủ vàng ấm mờ + ánh viền ấm một bên (phía trái, như nắng xiên qua cửa)
     tối: tối nhẹ + phủ lam + ánh đèn ấm phía phải.
   Một biến kit duy nhất: --klf (danh sách hàm filter CSS), đặt ở :root theo S.buoi + mùa. Các luật filter của nhân vật
   (p1.html .tok.fig .figimg / #mefig, j59 HG/SG cả keyframes, jk4 .kesimg) viết "filter:var(--klf) drop-shadow(…)".
   Chỉ dùng hàm CSS nội suy được (không url()) để keyframes halo/chọn của j59 vẫn mượt. Phủ lam/vàng = kẹp sepia giữa hai
   hue-rotate ngược nhau: phần sepia (đơn sắc theo độ sáng) đổi sắc, phần còn lại của ảnh giữ nguyên màu → mặt không bẩn.
   KIT_LIGHT.css(buoi, mùa) trả chuỗi filter (dùng cho tờ duyệt dev/shots/scene-light). */
/* NÚM: BAL.klfStrength = 0 (không phủ, mặc định tới khi sếp chọn) · 0.5 (nhẹ) · 1 (đủ). Đổi một dòng: */
if(typeof BAL==="object"&&BAL&&BAL.klfStrength==null)BAL.klfStrength=0;
const KIT_LIGHT=(function(){
 const wash=(deg,s)=>s>0?`hue-rotate(${deg}deg) sepia(${s}) hue-rotate(${-deg}deg)`:"";
 /* hai mức: N = nhẹ (BAL.klfStrength .5), T = đủ (1); 0 = không phủ. Giữa các mức nội suy thẳng. rim: [x,y,mờ,r,g,b,đậm] */
 const N={trua:{hue:-14,w:.04,b:1.015,s:1.015,c:1},
  chieu:{hue:-16,w:.1,b:1,s:.98,c:1,rim:[-2,-1,2,255,208,128,.5]},
  toi:{hue:180,w:.07,b:.9,s:.97,c:1.01,rim:[2,0,2.5,255,172,90,.5]}};
 const T={trua:{hue:-14,w:.07,b:1.03,s:1.03,c:1},
  chieu:{hue:-16,w:.18,b:.99,s:.96,c:.99,rim:[-3,-1,2,255,208,128,.7]},
  toi:{hue:180,w:.2,b:.7,s:.9,c:1.03,rim:[3,0,2.5,255,172,90,.6]}};
 /* mùa: hạ ấm hơn chút, đông lạnh hơn chút (cộng vào độ phủ, theo độ mạnh) */
 const SE={xuan:0,ha:.02,thu:.01,dong:-.02};
 const r3=x=>Math.round(x*1000)/1000;
 function strength(){try{if(typeof BAL==="object"&&BAL&&BAL.klfStrength!=null)return Math.max(0,Math.min(1,+BAL.klfStrength))}catch(e){}return 0}
 function css(bu,se,k){k=k==null?strength():k;if(!T[bu]||k<=0)return "brightness(1)";
  const lo=k<=.5?null:N[bu],hi=k<=.5?N[bu]:T[bu],t=k<=.5?k/.5:(k-.5)/.5;
  const Z={w:0,b:1,s:1,c:1},A=lo||Z,m=f=>r3(A[f]+(hi[f]-A[f])*t);
  let w=m("w")+(bu==="toi"?-(SE[se]||0):(SE[se]||0))*k;w=Math.max(0,r3(w));
  let rim="";if(hi.rim){const R=hi.rim,ra=lo&&lo.rim?lo.rim:[0,0,0,0,0,0,0],q=i=>r3(ra[i]+(R[i]-ra[i])*t);
   rim=`drop-shadow(${q(0)}px ${q(1)}px ${q(2)}px rgba(${R[3]},${R[4]},${R[5]},${q(6)}))`}
  return [wash(hi.hue,w),`brightness(${m("b")}) saturate(${m("s")}) contrast(${m("c")})`,rim].filter(Boolean).join(" ")}
 function key(){try{const four=typeof BUOI!=="undefined"&&BUOI.length>=4,b=S.buoi||0;
   const bu=(four?["sang","trua","chieu","toi"]:["sang","chieu","toi"])[b]||"sang";
   const se=(typeof SCN_SEAS==="object"&&SCN_SEAS[SEASON[(S.month||1)-1]])||"xuan";return {bu,se}}catch(e){return {bu:"sang",se:"xuan"}}}
 let last="";
 function sync(){try{if(typeof S!=="object"||!S)return;const k=key(),id=k.bu+"-"+k.se+"-"+strength();if(id===last)return;last=id;
   const r=document.documentElement;r.style.setProperty("--klf",css(k.bu,k.se));r.dataset.klight=k.bu}catch(e){}}
 return {N,T,css,key,sync,strength}})();
window.KIT_LIGHT=KIT_LIGHT;
(function(){const st=document.createElement("style");st.textContent=`:root{--klf:brightness(1)}`;document.head.appendChild(st);
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){KIT_LIGHT.sync();return r0.apply(this,arguments)}}
 if(typeof render==="function"){const r1=render;render=function(){KIT_LIGHT.sync();return r1.apply(this,arguments)}}
 if(typeof kitEventStage==="function"){const k0=kitEventStage;kitEventStage=window.kitEventStage=function(){KIT_LIGHT.sync();return k0.apply(this,arguments)}}
 KIT_LIGHT.sync()})();
/* Buổi tint removed at the source (j12 lightTick, owner 16/11): no b4Light overlay on any scene; weather washes unchanged. */
/* ---- TRANH CẢNH ĐÃ CHỈNH + THỜI TIẾT (sếp 11/15: Ngọc Thanh các chiều mưa tháng tư "nâu sepia, tối như lãnh cung") ----
   Tranh riêng buổi (j94 <tên>-<mùa>-<buổi>, đã chỉnh màu, sếp duyệt) KHÔNG chồng thêm lọc màu cũ của p1.html/j25
   (.sc-home.day: brightness 1.35 + sepia .12; rp1: sepia .25; rp2/rp3: saturate 1.3–1.4) → .stage.kown.
   Trời ướt (mưa phùn, giông, tuyết dày: wet()) trên tranh riêng buổi (sếp 12:35Z: phòng chiều mưa xuân u ám như lãnh cung → ẤM, SÁNG DỊU):
   ánh tán xạ ấm nhẹ — bớt tương phản chút, sáng hơn chút, KHÔNG ngả xám/lam, KHÔNG sepia/nâu; lớp .light (z 0, DƯỚI người) phủ ánh ngà ấm rất nhẹ,
   người giữ nguyên màu (không phủ lên hình). Vệt mưa do lớp hạt j11 vẽ. Lãnh cung giữ nguyên vẻ hoang lạnh của tranh. */
(function(){const css=document.createElement("style");css.textContent=`
.stage .scimg,.stage>.pxc{filter:var(--kscf,none)!important}
.stage.kown:not(.kwet):not(.sc-lc)>.light{background:none!important}
.stage.kown.kwet:not(.sc-lc)>.light{background:linear-gradient(rgba(255,234,198,.10),rgba(255,222,178,.06))!important}
.stage.kown.kwet.night:not(.sc-lc)>.light{background:linear-gradient(rgba(255,214,160,.04),rgba(255,200,140,.05))!important}`;document.head.appendChild(css);
 /* KIT §56.2 ONE SCENE GRADE (owner 15/11 LUẬT SỬA CẢ NHÓM: every place, not only her room). The ONLY filter on a scene picture is
    --kscf, written here and used by BOTH backdrops: the CSS picture (.scimg) and the Pixi copy of it (.pxc canvas, which hides .scimg
    on WebGL devices — before, every .scimg filter silently vanished there, so a phone and a no-WebGL screen showed different colours).
    The old stacked rules of p1.html/j25 (.sc-home brightness 1.25/1.35 + sepia .12, rp1 sepia .25, rp2/rp3 saturate 1.3–1.4 + hue/sepia)
    are overridden for EVERY picture, graded or not. Dry snow / frost (j12 lightTick: a cool rgba(200,225,255) wash) on a graded painting:
    no wash (the winter paintings already hold their snow light; a blue-grey cast is the lãnh cung look) — the frost edge (.frost) stays.
    Wet grade re-measured over every graded place (scan: the r9 values .97/.94/1.07 + ivory .13 took chroma −1.7 on average, −3.5 on the
    warm chiều halls = greyer; now chroma ±0, b* +1, L* +5). Knobs: KIT_SCENE.grade(o) → filter string; o = {own, wet, night, sc, tier}. */
 const G={dry:"none",wet:"saturate(1.05) contrast(.95) brightness(1.05)",wetNight:"saturate(1.02) contrast(.96) brightness(1.02)",
  rp2:"saturate(1.04)",rp3:"saturate(1.07) brightness(1.02)"};
 function grade(o){if(o.sc==="lc")return "none";               /* lãnh cung: the bleak painting as painted (Tân Giả khố has its own painting, sc "tgk", graded like the others) */
  if(o.own&&o.wet)return o.night?G.wetNight:G.wet;
  return o.tier===3?G.rp3:o.tier===2?G.rp2:G.dry}
 function state(){const P=placeOf(S.place),k=S.place;let own=false,tier=-1;try{own=/-(sang|trua|chieu|toi)$/.test(SCIMG[P.sc]||"")}catch(e){}
  if(k&&k[0]==="r"){try{const v=RV(+k.slice(1));if(v)tier=v.rank>=5?3:v.rank>=3?2:v.rank>=1?1:0}catch(e){}}
  return {own,wet:typeof wet==="function"&&!!wet(),night:(S.buoi||0)===(typeof B4L==="number"?B4L:3),sc:P.sc,tier}}
 window.KIT_SCENE={G,grade,state};
 function tag(){try{const st=$("stage");if(!st||!S)return;const o=state();
  st.classList.toggle("kown",o.own);st.classList.toggle("kwet",o.own&&o.wet);
  const f=grade(o);if(st.style.getPropertyValue("--kscf")!==f)st.style.setProperty("--kscf",f)}catch(e){}}
 window.kitSceneTag=tag;
 if(typeof renderStage==="function"){const r2=renderStage;renderStage=function(){const r=r2.apply(this,arguments);tag();return r}}
 if(typeof lightTick==="function"){const l0=lightTick;lightTick=function(){const r=l0.apply(this,arguments);tag();return r}}})();
/* ---- KIT §56.4 LIFE-STATE PLACE (coordinator 15/11: a lãnh cung save showed Ngọc Thanh các on the stage) ----
   The stage picture follows S.place. Two life states pin her to one place, whatever path set S.place:
   · in lãnh cung (S.out): Lãnh cung. A new day (j3) leaves S.visit.k="home" after coldVisit, so a reload (deser) put her back "home"
     = her old palace picture; any later S.place="home" did the same. → coldVisit() (place lc + the fallen consorts with her).
   · a maid serving punishment in Tân Giả khố (S.srv.lau>0): Tân Giả khố (j42 forced it only on goTo).
   Checked before every render/renderStage, so old saves are right on load. Promotion (S.pal) only renames "home": same room picture. */
(function(){function lifePlace(){try{if(typeof S!=="object"||!S||S.dead)return;
  if(S.out){if(S.place!=="lc"||!S.visit||S.visit.k!=="lc"){if(typeof coldVisit==="function")coldVisit();else{S.place="lc";S.visit={k:"lc",people:[],talked:false}}}}
  else if(typeof isSrv==="function"&&isSrv()&&S.srv.lau>0&&(S.place!=="tgk"||!S.visit||S.visit.k!=="tgk")){S.place="tgk";if(typeof srvVisitOf==="function")S.visit=srvVisitOf("tgk")}}catch(e){}}
 window.kitLifePlace=lifePlace;
 if(typeof render==="function"){const f0=render;render=function(){lifePlace();return f0.apply(this,arguments)}}
 if(typeof renderStage==="function"){const f1=renderStage;renderStage=function(){lifePlace();return f1.apply(this,arguments)}}})();
/* ---- TUẦN LỤC: WIDE FIGURES (owner 13:45Z Thái hậu cut by the column; 03:55Z ONE figure scale: full body ≈85–90 % of picture
   height, NEVER shrink to fit) — KIT §56.3 ----
   The person page (.kbk-person.kbk-full) gives the figure a fixed column --porf sized for a normal standing figure. A wider figure
   (Thái hậu, t7/t8 trains, wide sleeves) keeps its kit height and is never scaled:
   · wide pages: the figure column widens only as far as the face + torso need (figure centre + 14 % of its height, ≤ 74 % of the
     page), so the text keeps its room;
   · whatever is still wider (train / outer sleeve) runs BEHIND the text, which then sits on the kit's soft paper panel
     (.kbk-figover = the same panel phones use); the figure's left edge is moved inside the page so nothing is cut on the left;
   · phones (.kbk.narrow): same — figure moved inside the page, never scaled; the text already sits on the paper panel. */
/* KIT 32.2b: the painted page border (book-right/left.webp 768x1024): inner edge of the bottom double line at y 999 → 2.44 % above the page bottom */
var KBK_ART_LINE=window.KBK_ART_LINE={b:.0244};
(function(){let q=0;const TEXT_MIN=220,FIG_MIN=.85,TORSO=.12;   /* TORSO: half shoulder width ≈ 12 % of figure height (sleeves/train may go behind the text) */
 const AR=window.__figAR=window.__figAR||{},HX=window.__figHX=window.__figHX||{},R=window.__kbkRatio=window.__kbkRatio||{h:.86,w:.9};
 const st=document.createElement("style");st.textContent=`.kbk-person.kbk-figover>.kbk-phead,.kbk-person.kbk-figover>.kbk-flow{position:relative;z-index:1;background:color-mix(in srgb,var(--paper,#f3e3c0) 86%,transparent);border-radius:6px;box-shadow:0 0 0 .35em color-mix(in srgb,var(--paper,#f3e3c0) 86%,transparent)}.kbk-person.kbk-figover>.kbk-por{overflow:visible;z-index:0}html body .kbk-person.kbk-full>.kbk-por{overflow:clip!important}`;document.head.appendChild(st);
 /* where the BODY stands in the picture (0..1 of its width): centre of the head = alpha mass of the top 16 % rows. Trains/outpainted hems
    make many figures asymmetric, so the body is not the picture centre. CDN images are CORS-open; on failure 0.5. */
 function headX(I){try{const w=96,h=Math.max(8,Math.round(96*I.naturalHeight/I.naturalWidth)),c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");g.drawImage(I,0,0,w,h);
   const d=g.getImageData(0,0,w,Math.max(2,Math.round(h*.16))).data;let sx=0,sa=0;for(let i=3;i<d.length;i+=4){const a=d[i];if(a>40){sx+=((i>>2)%w)*a;sa+=a}}return sa?sx/sa/w:.5}catch(e){return .5}}
 function learn(src,then){if(AR[src]!=null)return;AR[src]=0;const I=new Image();I.crossOrigin="anonymous";
   I.onload=()=>{AR[src]=I.naturalWidth/Math.max(1,I.naturalHeight);HX[src]=headX(I);then&&then()};I.onerror=()=>{delete AR[src]};I.src=src}
 /* column width + figure height for j87 personBody — called WHILE PAGINATING, so the text is measured in its final column */
 window.kitBookFigCol=function(fig,PW,PH){try{const m=/src="([^"]+)"/.exec(fig||"");if(!m||!PW||!PH||PW<440)return "";const src=m[1];
   if(!AR[src]){learn(src,()=>document.querySelectorAll(".kbk").forEach(r=>{try{r.__kbk&&r.__kbk.relayout()}catch(e){}}));return ""}   /* the book's own re-layout, same reading position */
   const kfr0=+((/--kfr:([\d.]+)/.exec(fig)||[])[1]||1),pic=PH*R.h,ar=AR[src],hx=HX[src]!=null?HX[src]:.5,base=Math.min(PW*.45,PH*.8*.42);
   const bb=kitFigBody(src,()=>document.querySelectorAll(".kbk").forEach(r=>{try{r.__kbk&&r.__kbk.relayout()}catch(e){}}));if(!bb)return "";   /* KIT 34.6: sized by its BODY (kitBookFig), same as the stage and the dialogs */
   const g=kitBookFig(bb,kfr0*KIT_FIG.man,pic);
   const fs=Math.max(13,Math.min(17,PW/34)),boxW=PW*R.w,colMax=boxW-fs-Math.min(TEXT_MIN,boxW-base-fs);   /* text ≥ 220 px, or never narrower than a normal figure's page */
   const per=hx*ar+TORSO,need=k=>per*g.ih*k+4;                                                  /* body right edge when the figure starts at the column's left */
   const k=1;if(g.iw<=base+1)return "";   /* KIT 34.6: never scaled (the old ≥ 85 % shrink made Thái hậu smaller than the silhouette beside her); wider than the column = cut at its edge (32.2a) */
   const col=Math.max(base,Math.min(need(k),colMax));
   return `${k<1?`;--kfk:${k.toFixed(3)}`:""};grid-template-columns:${Math.round(col)}px minmax(0,1fr)`}catch(e){return ""}};
 /* live pages: place the figure (layout px, so page-turn transforms do not matter). Figure wider than its column: left edge at the page's
    left; if the body would then reach under the text, slide it left so face + torso end at the column edge — only the outer train/sleeve may
    pass the page edge, never the body. */
 function clamp(){q=0;try{document.querySelectorAll(".kbk-person.kbk-full .kesfi").forEach(f=>{const box=f.closest(".kbk-person");if(!box)return;
   const por=box.querySelector(":scope>.kbk-por"),pg=box.closest(".kbk-pg");if(!por)return;
   f.style.transform="";{const i0=f.querySelector("img");if(i0&&i0.style.maskImage){i0.style.maskImage="";i0.style.webkitMaskImage=""}}
   /* KIT 34.6 (owner 16/11 "Nhân vật sao chưa theo tỉ lệ chuẩn"): the figure (real or silhouette) is sized by its BODY — kitBookFig, the stage / dialog rule:
      body = min(KIT_FIG.h × column, maxPx) × fac, feet on the column floor, true aspect. Not measured yet → hidden (never shown at its raw box size). */
   let dyF=0;{const i1=f.querySelector("img"),s1=i1&&i1.getAttribute("src"),b1=s1?kitFigBody(s1,soon):null,Hc=por.clientHeight;
    if(!b1||!Hc){f.style.visibility="hidden"}else{const kf=parseFloat(getComputedStyle(box).getPropertyValue("--kfr"))||1,kk=parseFloat(getComputedStyle(box).getPropertyValue("--kfk"))||1;
     const ar1=i1.naturalWidth&&i1.naturalHeight?i1.naturalWidth/i1.naturalHeight:b1.ar,g=kitBookFig(Object.assign({},b1,{ar:ar1}),kf*KIT_FIG.man,Hc);dyF=g.dy*kk;
     f.style.height=(g.ih*kk).toFixed(1)+"px";f.style.width=(g.iw*kk).toFixed(1)+"px";f.style.visibility="";f.dataset.kbody=(g.body*kk).toFixed(1);
     /* KIT 32.2b EQUAL GAPS (owner 16/11 s21/s22, whole group): the two frame lines round the figure are the running-head rule (.kbk-rh)
        and the page frame's bottom line: the painted border's inner edge on art pages (KBK_ART_LINE.b of the page height, measured on
        book-right/left.webp), the drawn .kbk-in frame on plain pages. Gap above the painted head = gap under the feet: the figure is raised
        by half the difference (never lowered past its column floor — the page number row — never above the column top). */
     try{const inEl=box.closest(".kbk-in"),rh=inEl&&inEl.querySelector(":scope > .kbk-rh");const rel=e=>{let y=0,x=e;while(x&&x!==inEl){y+=x.offsetTop;x=x.offsetParent}return x===inEl?y:null};const pt=inEl?rel(por):null;
      const pgE=box.closest(".kbk-pg"),art=!!(pgE&&(pgE.classList.contains("r")&&box.closest(".kbk.art-right")||pgE.classList.contains("l")&&box.closest(".kbk.art-left")));
      if(pt!=null){const lt=rh&&rh.offsetParent?rh.offsetTop+rh.offsetHeight:0,lb=art?pgE.offsetHeight*(1-KBK_ART_LINE.b)-inEl.offsetTop:inEl.clientHeight,figH=g.ih*kk*Math.max(.2,b1.b-b1.t),feet=pt+Hc;
       const s=Math.max(-(Hc-figH),Math.min(0,((lb-feet)-(feet-figH-lt))/2));dyF+=s;f.dataset.kgap=Math.round(feet+s-figH-lt)+"/"+Math.round(lb-feet-s)}}catch(e){}}}
   const w0=f.offsetWidth,H=f.offsetHeight,bw=box.offsetWidth,pw=por.offsetWidth;if(!w0||!bw){box.classList.remove("kbk-figover");return}
   if(pg&&pg.offsetHeight&&pg.offsetWidth&&!box.closest(".kbk.narrow")){R.h=+(por.offsetHeight/pg.offsetHeight).toFixed(3);R.w=+(bw/pg.offsetWidth).toFixed(3)}
   const im=f.querySelector("img"),src=im&&im.getAttribute("src");if(src&&AR[src]==null)learn(src,soon);const hx=src&&HX[src]!=null?HX[src]:.5;
   /* KIT 32.2a (owner 15/11, "Tuần lục p.6 Thái hậu": the robe spread under the text): the figure stays INSIDE its own column on every
      screen (phones too) and is never scaled: the body (head centre) is centred in the column and whatever is wider (train, hem, outer
      sleeve) is CUT at the column edge (the column clips), with a 24 px soft fade at a cut edge; the text never sits on the figure. */
   box.classList.remove("kbk-figover");const over=w0>pw+1;
   let L=(pw-w0)/2;if(over){L=pw/2-hx*w0;L=Math.min(0,Math.max(pw-w0,L))}
   const dx=L-(pw-w0)/2,t=(Math.abs(dx)>0.5||Math.abs(dyF)>0.5)?`translate(${dx.toFixed(1)}px,${dyF.toFixed(1)}px)`:"";f.style.transformOrigin="50% 100%";if(f.style.transform!==t)f.style.transform=t;
   if(im){const g=[];if(over&&L<-0.5)g.push(`transparent ${(-L).toFixed(0)}px,#000 ${(-L+24).toFixed(0)}px`);if(over&&L+w0>pw+0.5)g.push(`#000 ${(pw-L-24).toFixed(0)}px,transparent ${(pw-L).toFixed(0)}px`);
    const mk=g.length?`linear-gradient(to right,${g.length===2?g.join(","):g[0].startsWith("transparent")?g[0]:"#000 0,"+g[0]})`:"";if(im.style.maskImage!==mk){im.style.maskImage=mk;im.style.webkitMaskImage=mk}}})}catch(e){}}
 function soon(){if(!q){q=requestAnimationFrame(clamp);setTimeout(clamp,450);setTimeout(clamp,1300)}}
 window.kitBookFigClamp=clamp;
 try{new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches(".kbk-person,.kesfi,.kbk")||n.querySelector&&n.querySelector(".kbk-person.kbk-full")))))soon()}).observe(document.body,{childList:true,subtree:true})}catch(e){}
 addEventListener("resize",soon);document.addEventListener("load",e=>{if(e.target&&e.target.classList&&e.target.classList.contains("kesimg"))soon()},true)})();
