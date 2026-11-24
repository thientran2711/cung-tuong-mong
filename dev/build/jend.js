/* ================= jend: kitEndScreen — THE ENDING SCREEN, full screen (KIT §91; owner marks #48 #50 #51, OD 21/11 ~03:56Z / ~04:03Z / ~04:06Z) =================
   Owner (verbatim, 21/11 ~04:06Z): "bất cứ một cái gì mà kết thúc một cái game, kết thúc một cái kiếp là đều phải có một cái khung đẹp của nó ... thay vì là khung nhỏ
   thì tôi muốn là khung full màn hình luôn ... dưới là có cái nền ... từ cái kết cục cho tới đại kết cục hay là kỳ ngộ gì đó, mỗi một cái nó sẽ có một cái nền khác nhau".
   #48 (death «Kiếp này»): WHITE mourning flower (hoa tang) at the top centre of the frame + white cloth drapes hanging down its sides.
   #50 (Đại kết cục): the festive twin — red/gold celebration flowers at the top centre + festive drapes/garlands down the sides, plus its own «wow».
   ONE kit part for EVERY ending dialog. It changes no flow, no button, no number: the dialog that was there (its kit body, its figure, its buttons, its
   co-op and save behaviour) is shown as a full-screen ceremonial screen:
     · the whole screen = the ending's own background picture (img/end-bg-<type>.webp; until it lands: the already-approved event picture of that ending, dimmed)
     · the kit dialog becomes the big frame on it (KIT size system keeps measuring it: the frame is set BEFORE the fit runs)
     · the frame wears the overlay set of its tone: mourn = img/kit/death-flower.webp + death-drape-l/-r.webp, fest = img/kit/fest-flower.webp + fest-drape-l/-r.webp
       (missing art = no piece; the frame keeps its tone ring, never a code-drawn flower)
     · one short entrance: fest = frame rises + painted gold sparks and petals (jfxkit), mourn = slow quiet fade + rising incense; none under reduced motion / «Gọn».
   TYPES (KIT_END.types; tone + fallback picture): death · exile · fail = mourn; leave · throne · grand · fate · rare = fest.
   WHICH DIALOG IS AN ENDING (kitEndType(m), derived from the queued card itself, so old saves and the co-op guest get it with no stored flag):
     · the life end card of over() (j32, t "Kiếp này", cls "end") → S.kesT (set by the over() wrapper below from h / fate / alive; old save: read from S.fate)
     · the Hồi kết nhánh result (jge PEND.geR) → grand (Đại kết cục) / fail (Kết cục)
     · any card whose cls carries "kes-t-<type>" (Bảng Thiên mệnh jge geBoardPanel → fate; a rare ending's result card j97 → rare).
   Callers that know the type before over() runs say it with kitEndNext(type) (jge grand exit, j97 rare exit). ===== */
window.KIT_END=window.KIT_END||{
 types:{death:{tone:"mourn",pic:"tang-le"},exile:{tone:"mourn",pic:"lanh-cung"},fail:{tone:"mourn",pic:"lanh-cung"},
  leave:{tone:"fest",pic:"le-xuan"},throne:{tone:"fest",pic:"tan-phong"},grand:{tone:"fest",pic:"tan-phong"},fate:{tone:"fest",pic:"tan-phong"},rare:{tone:"fest",pic:"le-xuan"}},
 ov:{mourn:{fl:"img/kit/death-flower.webp",l:"img/kit/death-drape-l.webp",r:"img/kit/death-drape-r.webp"},
     fest:{fl:"img/kit/fest-flower.webp",l:"img/kit/fest-drape-l.webp",r:"img/kit/fest-drape-r.webp"}},
 bg:t=>`img/end-bg-${t}.webp`,
 ev:k=>`img/ev-${k}.webp`,
 next:"",log:[]};
(function(){const KE=window.KIT_END;
/* ---------- which ending ---------- */
function kitEndNext(t){KE.next=KE.types[t]?t:""}
window.kitEndNext=kitEndNext;
/* a life ending (over): h = card title, fate = record line, live = she is alive */
function kesLife(h,fate,live){const s=`${h||""} · ${fate||""}`;
 if(/^Đại kết cục/.test(String(h||""))||/Đại kết cục:/.test(String(fate||"")))return"grand";
 if(!live)return"death";
 if(/phế|đuổi|lãnh cung|điên|tuổi xuân qua đi|thứ dân|tân giả|lưu đày/i.test(s))return"exile";
 if(/ban hôn|ban gả|xuất giá|thành thân/i.test(s))return"leave";/* a marriage granted BY Thái hậu is a leave, not a throne (rv) */
 if(/thái hậu|mẫu hậu|mẫu nghi|thái phi|lên ngôi|đăng cơ|nữ vương/i.test(s))return"throne";
 return"leave"}
window.kesLife=kesLife;
function kitEndType(m){if(!m||typeof m!=="object")return"";const c=String(m.cls||"");
 const x=c.match(/\bkes-t-(\w+)/);if(x&&KE.types[x[1]])return x[1];
 if(m.pid==="geR"){const r=typeof S!=="undefined"&&S&&S.ge&&S.ge.res;return r?(r.ok?"grand":"fail"):""}
 if(/\bend\b/.test(c)&&m.t==="Kiếp này"&&typeof S!=="undefined"&&S&&S.dead){
  if(S.kesT&&KE.types[S.kesT])return S.kesT;
  const f=String(S.fate||"");return kesLife("",f,typeof overAlive==="function"?overAlive(f):false)}
 return""}
window.kitEndType=kitEndType;
/* the over() wrapper: decide the type once, keep it on S (saved with the life) */
if(typeof over==="function"){const o0=over;over=function(h,t,fate,alive){const was=typeof S!=="undefined"&&S&&S.dead;const nx=KE.next;KE.next="";
  if(!was&&S){try{const live=typeof overAlive==="function"?overAlive(fate,alive):alive===true;S.kesT=nx||kesLife(h,fate,live)}catch(e){console.error("kes",e)}}
  return o0.apply(this,arguments)};window.over=over}
/* ---------- the screen ---------- */
const kesCls=(t)=>`kes kes-${KE.types[t].tone} kes-t-${t}`;
function kesMark(m,t){const c=String(m.cls||"").replace(/\s*\bkes(-\w+(-\w+)?)?\b/g,"").trim();m.cls=(c?c+" ":"")+kesCls(t)}
function kesFallPic(m,t){const a=m&&m.art&&/ev-/.test(String(m.art))?String(m.art):"";return a||KE.ev(KE.types[t].pic)}
function kesDecorate(M,m,t){const tone=KE.types[t].tone;let bg=M.querySelector(":scope>.kes-bg");
 if(!bg||bg.dataset.t!==t){if(bg)bg.remove();bg=document.createElement("div");bg.className="kes-bg";bg.dataset.t=t;bg.setAttribute("aria-hidden","true");
  const im=new Image();im.alt="";im.className="kes-bgi";im.decoding="async";const fb=kesFallPic(m,t);
  im.onerror=()=>{if(im.dataset.fb){im.remove();return}im.dataset.fb="1";bg.classList.add("kes-bgfb");im.src=fb};im.src=KE.bg(t);bg.appendChild(im);M.insertBefore(bg,M.firstChild)}
 const d=M.querySelector(".dlg");if(!d)return;let ov=d.querySelector(":scope>.kes-ov");
 if(!ov||ov.dataset.tone!==tone){if(ov)ov.remove();ov=document.createElement("div");ov.className="kes-ov";ov.dataset.tone=tone;ov.setAttribute("aria-hidden","true");const P=KE.ov[tone];
  [["fl","kes-fl"],["l","kes-dr kes-drl"],["r","kes-dr kes-drr"]].forEach(([k,cl])=>{const im=new Image();im.alt="";im.className=cl;im.decoding="async";im.onerror=()=>{im.remove();ov.classList.add("kes-miss")};im.src=P[k];ov.appendChild(im)});
  d.appendChild(ov)}}
function kesClear(M){const bg=M&&M.querySelector(":scope>.kes-bg");if(bg)bg.remove();const ov=M&&M.querySelector(".dlg>.kes-ov");if(ov)ov.remove()}
/* the entrance: once per card, painted kit effects only (jfxkit), nothing under reduced motion / Gọn */
function kesFx(M,m,t){if(m.__kesFx)return;try{Object.defineProperty(m,"__kesFx",{value:1,enumerable:false})}catch(e){m.__kesFx=1}
 const calm=typeof kmReduced==="function"?kmReduced():false;M.classList.toggle("kes-calm",!!calm);KE.log.push(t);if(KE.log.length>40)KE.log.shift();
 M.classList.remove("kes-in");void M.offsetWidth;M.classList.add("kes-in");
 if(calm||window.__bot||(typeof quiet!=="undefined"&&quiet))return;
 const d=M.querySelector(".dlg");const r=d?d.getBoundingClientRect():null;const top=r?{x:r.left+r.width/2,y:r.top+8}:null;
 setTimeout(()=>{try{if(M.hidden||!M.classList.contains("kes"))return;
  if(KE.types[t].tone==="fest"){if(typeof kitFxBurst==="function"){kitFxBurst("glowburst",top,1);kitFxBurst("spark",top,12);kitFxBurst(t==="grand"||t==="throne"?"petal-peach":"petal-plum",null,14)}}
  else if(t!=="death"&&typeof kitFxBurst==="function")kitFxBurst(t==="fail"?"ash":"incense",top,6)/* death: j93 already plays ink + white silk + incense */
 }catch(e){console.error("kes fx",e)}},380)}
function kesShow(){const M=document.getElementById("modal");if(!M)return;const m=typeof Q!=="undefined"?Q[0]:null;const t=M.hidden?"":kitEndType(m);
 if(!t){if(M.querySelector(":scope>.kes-bg"))kesClear(M);return}kesDecorate(M,m,t);kesFx(M,m,t)}
/* pre: the card carries the frame class BEFORE the base paints it, so the kit size fit measures the full-screen frame; post: layers + entrance */
if(typeof showModal==="function"){const s0=showModal;showModal=function(){try{const m=typeof Q!=="undefined"?Q[0]:null;const t=kitEndType(m);if(t)kesMark(m,t)}catch(e){console.error("kes",e)}
  const r=s0.apply(this,arguments);try{kesShow()}catch(e){console.error("kes",e)}return r};window.showModal=showModal}
/* a rare ending (Kỳ ngộ, j97): the arc's result card that r97Take queues (card67 "result" → kit panel) is that ending's screen */
if(typeof r97Take==="function"){const r0=r97Take;r97Take=function(){const before=new Set(typeof Q!=="undefined"?Q:[]);const r=r0.apply(this,arguments);
  try{const A=typeof th67==="function"?th67(arguments[0]):null;/* GE11 (GAPART1 23/11): a road-finale rare ending (RD97L) shows its painted picture (j89 ST_RD97ART) */
  const ra=A&&A.a&&typeof ST_RD97ART!=="undefined"&&ST_RD97ART.has(A.a)?stArtOf(A.a,null,"r97"):"";
  (Q||[]).forEach(m=>{if(m&&!before.has(m)&&m.kit&&m.kit.kind==="result"){if(ra&&!m.art)m.art=ra;kesMark(m,"rare")}})}catch(e){console.error("kes",e)}return r}}
/* the frame inside: the ending screen always takes the kit's LARGEST v3 layout (XL: figure XL, the event picture grows into what the text leaves) — the
   kit size system picks the smallest size that holds the content, which on a full-screen frame leaves the figure small in a sea of paper */
if(typeof kszLivePick3_0==="function"&&typeof kszLiveLay3==="function"){const p0=kszLivePick3_0;kszLivePick3_0=function(dlg){try{const M=document.getElementById("modal");
  if(M&&M.classList.contains("kes")&&dlg&&dlg.__ksz3){dlg.__kszFill=0;
   if(typeof kszNarrow3==="function"&&kszNarrow3(dlg))return p0.apply(this,arguments);/* a narrow screen keeps the kit's stacked ladder */
   kszLiveLay3(dlg,"XL");dlg.__kszFill=1;kitFrameApplyLive3(dlg);return"XL"}}catch(e){console.error("kes",e)}
  return p0.apply(this,arguments)}}
window.kitEndScreen={type:kitEndType,show:kesShow,mark:kesMark,life:kesLife};
/* ---------- look (KIT §91) ---------- */
const css=`
.modal.kes{padding:0;background:#17110d;overflow:hidden;--kes-top:clamp(64px,calc(11*var(--kvh,1vh)),118px);--kes-bot:clamp(12px,calc(2.6*var(--kvh,1vh)),26px)}
.modal.kes-mourn{--kes-ring:#f6f3ec;--kes-ring2:#8d8a86;--kes-grad:radial-gradient(ellipse at 50% 30%,#4a4850 0%,#26252b 60%,#141317 100%)}
.modal.kes-fest{--kes-ring:#e5b53a;--kes-ring2:#9e1b1f;--kes-grad:radial-gradient(ellipse at 50% 28%,#8f2a1d 0%,#5a1410 55%,#2a0806 100%)}
.modal.kes>.kes-bg{position:absolute;inset:0;z-index:0;background:var(--kes-grad);overflow:hidden;pointer-events:none}
.modal.kes>.kes-bg>.kes-bgi{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;display:block}
.modal.kes>.kes-bg.kes-bgfb>.kes-bgi{filter:blur(3px) saturate(.85);transform:scale(1.06)}
.modal.kes-mourn>.kes-bg.kes-bgfb>.kes-bgi{filter:blur(3px) grayscale(.55) brightness(.62)}
.modal.kes-fest>.kes-bg.kes-bgfb>.kes-bgi{filter:blur(3px) brightness(.7) saturate(1.05)}
.modal.kes>.kes-bg::after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,transparent 35%,rgba(10,6,4,.5) 100%)}
/* beats the kit size system's !important frame rules (html body #modal .dlg.kszlive.kszlive, #modal:not(.pcm) .dlg.kpanel): the ending frame is ONE size */
/* the frame = the kit dialog at the kit's own XL size (width --kszw, height = content up to the kit limit, KIT §8.4 / §6.2f): NO ending-only size,
   so the left figure is the kit XL figure slot of every other XL dialog (dialog-fixed (f)); only the ring + a top offset for the flower room are added */
html body #modal.modal.kes>.dlg{position:relative;z-index:1;margin:calc(var(--kes-top) - var(--kes-bot)) 0 0!important;overflow:visible!important;
 box-shadow:0 0 0 2px var(--kes-ring),0 0 0 5px var(--kes-ring2),0 0 0 7px var(--kes-ring),0 18px 48px rgba(0,0,0,.55)!important}
.modal.kes>.dlg>.kes-ov{position:absolute;inset:0;pointer-events:none;z-index:6}
.kes-ov>.kes-fl{position:absolute;left:50%;top:0;width:clamp(130px,26%,250px);height:auto;transform:translate(-50%,-64%);filter:drop-shadow(0 4px 8px rgba(0,0,0,.35))}
.kes-ov>.kes-dr{position:absolute;top:-10px;width:clamp(40px,7.5%,104px);height:calc(100% + 10px);object-fit:contain;object-position:50% 0;filter:drop-shadow(0 3px 6px rgba(0,0,0,.3))}
.kes-ov>.kes-drl{left:0;transform:translateX(-62%);transform-origin:50% 0}
.kes-ov>.kes-drr{right:0;transform:translateX(62%);transform-origin:50% 0}
.modal.kes .dlg>.kph{position:relative;z-index:7}
.modal.kes .dlg .k3right{z-index:1}
.modal.kes-in>.dlg{animation:kesRise .62s cubic-bezier(.2,.8,.25,1) both}
.modal.kes-in.kes-mourn>.dlg{animation:kesFade 1.1s ease-out both}
.modal.kes-in>.kes-bg{animation:kesBg 1.2s ease-out both}
.modal.kes-in .kes-fl{animation:kesDrop .7s .25s cubic-bezier(.2,.9,.3,1.15) both}
.modal.kes-in.kes-mourn .kes-fl{animation:kesDropM 1.3s .3s ease-out both}
.modal.kes-in .kes-drl{animation:kesUnfurlL .9s .2s ease-out both}
.modal.kes-in .kes-drr{animation:kesUnfurlR .9s .2s ease-out both}
.modal.kes-calm>.dlg,.modal.kes-calm>.kes-bg,.modal.kes-calm .kes-fl,.modal.kes-calm .kes-dr{animation:none!important}
@keyframes kesRise{from{opacity:0;transform:translateY(26px) scale(.97)}to{opacity:1;transform:none}}
@keyframes kesFade{from{opacity:0}to{opacity:1}}
@keyframes kesBg{from{opacity:0}to{opacity:1}}
@keyframes kesDrop{from{opacity:0;transform:translate(-50%,-110%) scale(.7)}to{opacity:1;transform:translate(-50%,-64%)}}
@keyframes kesDropM{from{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,-64%)}}
@keyframes kesUnfurlL{from{opacity:0;transform:translateX(-62%) scaleY(.2)}to{opacity:1;transform:translateX(-62%)}}
@keyframes kesUnfurlR{from{opacity:0;transform:translateX(62%) scaleY(.2)}to{opacity:1;transform:translateX(62%)}}
.kes-minis{display:flex;gap:14px;flex-wrap:wrap}
.kes-mini{position:relative;width:200px;height:150px;border-radius:6px;overflow:hidden;background:var(--kes-grad)}
.kes-mini .kes-mbg{position:absolute;inset:0;background-size:cover;background-position:50% 30%;filter:blur(2px) brightness(.65)}
.kes-mini.kes-mourn .kes-mbg{filter:blur(2px) grayscale(.55) brightness(.62)}
.kes-mini .kes-mf{position:absolute;left:16px;right:16px;top:30px;bottom:8px;background:#fffaf0;border-radius:4px;box-shadow:0 0 0 1px var(--kes-ring),0 0 0 3px var(--kes-ring2),0 0 0 4px var(--kes-ring);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
.kes-mini .kes-mf small{opacity:.6}
.kes-mini .kes-mfl{position:absolute;left:50%;top:0;width:64px;transform:translate(-50%,-64%)}
.kes-mini .kes-mdl,.kes-mini .kes-mdr{position:absolute;top:-4px;width:22px;height:100%;object-fit:contain;object-position:50% 0}
.kes-mini .kes-mdl{left:0;transform:translateX(-46%)}.kes-mini .kes-mdr{right:0;transform:translateX(46%)}
.kes-mini.kes-mourn{--kes-ring:#f6f3ec;--kes-ring2:#8d8a86;--kes-grad:#26252b}.kes-mini.kes-fest{--kes-ring:#e5b53a;--kes-ring2:#9e1b1f;--kes-grad:#5a1410}
@media (prefers-reduced-motion:reduce){.modal.kes>.dlg,.modal.kes>.kes-bg,.kes-fl,.kes-dr{animation:none!important}}`;
try{const st=document.createElement("style");st.id="kes-css";st.textContent=css;document.head.appendChild(st)}catch(e){}
/* kit page sample §91: both tones as a still preview (the same layers, scaled) + a live open */
function kesMini(t){const T=KE.types[t],P=KE.ov[T.tone];return `<div class="kes-mini kes-${T.tone}"><div class="kes-mbg" style="background-image:url(${KE.ev(T.pic)})"></div><div class="kes-mf"><b>${t==="grand"?"Đại kết cục":"Kiếp này"}</b><small>${t}</small>
 <img class="kes-mfl" src="${P.fl}" alt="" onerror="this.remove()"><img class="kes-mdl" src="${P.l}" alt="" onerror="this.remove()"><img class="kes-mdr" src="${P.r}" alt="" onerror="this.remove()"></div></div>`}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§91",title:"kitEndScreen · màn kết toàn màn hình (tang · mừng)",where:"mọi màn kết: Kiếp này (chết, rời cung, phế), Đại kết cục, Kết cục, Bảng Thiên mệnh, Kỳ ngộ (kết hiếm)",
 html:()=>`<div class="kes-minis">${kesMini("death")}${kesMini("grand")}</div><div class="kpnote">Loại: ${Object.keys(KE.types).map(k=>`${k} (${KE.types[k].tone==="fest"?"mừng":"tang"})`).join(" · ")} · <button type="button" class="kbtn" onclick="kesSample('death')">Mở Kiếp này</button> <button type="button" class="kbtn" onclick="kesSample('grand')">Mở Đại kết cục</button></div>`})}catch(e){}
window.kesSample=function(t){try{const T=KE.types[t]?t:"death";const tone=KE.types[T].tone;Q.unshift({t:T==="grand"?"Đại kết cục":"Kiếp này",cls:`kes-t-${T}`,who:typeof pMe==="function"?pMe():null,
  h:`<h3>${T==="grand"?"Đại kết cục · Hiền tướng hậu cung":"Hồng nhan bạc mệnh"}</h3><p>${tone==="fest"?"Thiên hạ truyền tai: ngươi đã thành “Hiền tướng hậu cung”.":"Kiếp này khép lại."}</p>`,btn:"Đóng"});showModal()}catch(e){console.error(e)}};
})();

/* KIT §94b: the day title card shows on EVERY day change (jend.js is the LAST module: this `dawn` is the outermost wrapper, over kitNewDay / the Tuần lục book / the j79 panel) */
try{if(typeof dawn==="function"&&typeof kitDayTitleShow==="function"){const d0=dawn;dawn=function(){const r=d0.apply(this,arguments);try{kitDayTitleShow()}catch(e){}return r}}}catch(e){}

/* KIT §94b: game start = «Ngày 1 — <tên> · Chương 1 — <tên>» (owner OD 24/11 ~07:45Z; MAIN 117 OK): after a NEW life begins (week 0) the same card shows once; not for bots / sims */
try{if(typeof start==="function"&&typeof kitDayTitleShow==="function"){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(!window.__bot&&typeof S!=="undefined"&&S&&!S.dead&&typeof wk==="function"&&wk()===0)setTimeout(()=>{try{if(S&&!S.dead&&wk()===0)kitDayTitleShow()}catch(e){}},600)}catch(e){}return r}}}catch(e){}
