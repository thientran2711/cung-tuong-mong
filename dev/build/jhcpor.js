/* ================= jhcpor: KIT §36.5 person-card portrait cell — WIDE frame, no empty headroom (owner 15/11, review/hc-portrait) =================
   Owner: "Ảnh 1 phía trên này còn dư chỗ nhiều nè, ảnh 2, 2 bên trái phải còn dư kìa, kéo giãn cạnh trái và phải cho khung avatar to bề ngang xíu đi."
   ONE rule for the framed portrait in every person card (pcard: Hậu cung Chí tôn / Phi tần / Nam nhân / Cung nhân, the stage pop-up card,
   every other pcard), known people and "Người lạ" alike:
   1. WIDTH: the card cell shows the frame's wide variant img/kit/frame-<x>-w.webp (dev/tools/frame_wide.py: content-aware seams through the plain
      parts of the top/bottom bars; corners, side bars, crest and pendant untouched, nothing stretched) so every frame spans ~536 of the 550
      canvas units = the full column. Its opening is 2s units wider (s per frame, KIT_FRW); the opening's top/bottom do not move.
      The picture is NOT zoomed for it (KIT_POR face size unchanged): the window ground (.kbg, cover) widens with the opening, the portrait's
      clip widens to the new opening and its own left/right edges fade out (no hard vertical cut where a garment meets the picture border).
   2. HEADROOM: the cell starts where THIS frame's art starts (its first opaque row, KIT_FRW) and ends under its tassel, a fixed 4 px from the
      name block above — no empty band between the name and the crest. Numbers are constants per frame file (no measuring), so the first frame
      is the settled frame; a person switch still cross-fades (jhc).
   Small frames (mdH avatars, strips, stage, week book) keep the narrow frame. If a -w picture fails to load the cell falls back to the
   normal frame (class kfw removed). KIT_FRW: {frame name: [s, opaque top, opaque bottom]} in canvas units (550x1037). ========== */
window.KIT_FRW={"frame-cold":[44,95,987],"frame-consort-0":[47,184,974],"frame-consort-1":[44,182,974],"frame-consort-2":[36,176,975],"frame-consort-3":[30,174,977],"frame-consort-4":[25,159,973],"frame-consort-5":[17,150,993],"frame-consort-6":[5,104,984],"frame-consort-7":[10,20,991],"frame-emp":[0,8,1035],"frame-eunuch-0":[36,134,986],"frame-eunuch-1":[36,134,986],"frame-eunuch-2":[36,134,986],"frame-eunuch-3":[46,107,988],"frame-guard":[30,100,984],"frame-heir":[24,52,992],"frame-maid-0":[35,144,986],"frame-maid-1":[35,144,986],"frame-maid-2":[35,144,986],"frame-maid-3":[35,144,986],"frame-maid-4":[35,144,986],"frame-mama-0":[34,130,994],"frame-mama-1":[34,130,994],"frame-mama-2":[34,130,994],"frame-mama-3":[34,130,994],"frame-mama-4":[34,130,994],"frame-man":[28,108,995],"frame-official":[34,101,1002],"frame-physician":[24,146,973],"frame-prince":[32,85,987],"frame-princess":[36,118,977],"frame-royal":[36,95,997],"frame-thaihau":[0,2,1016],"frame-unknown":[46,164,988]};
function kitFrw(src){const m=/(frame-[a-z0-9-]+?)(?:-w)?\.webp/.exec(src||"");return m&&KIT_FRW[m[1]]?[m[1],KIT_FRW[m[1]]]:null}
/* the card's own portrait cell = the first .pcp right after <div class="pcl"> */
function kitFrwCell(h){const i=h.indexOf('<div class="pcl">');if(i<0)return h;const j=i+17;if(h.slice(j,j+19)!=='<div class="pcp kit')return h;
 const k=h.indexOf('<span class="kin">',j);if(k<0)return h;const fm=/<img class="kfr" src="([^"]*)"/.exec(h.slice(k,k+4000));if(!fm)return h;
 const F=kitFrw(fm[1]);if(!F||KFRW_BAD.has(F[0]))return h;let [s,t,b]=F[1];
 /* the rank crest (KIT_CREST, jk2b §9) stands on the top bar and may reach higher than the frame art: the cell starts at whichever is higher */
 try{const C=window.KIT_CREST,ck=C&&C.key(fm[1]);if(ck){const w=C.w[ck]||C.W,hh=w*C.ar[ck],by=C.bar[ck]!=null?C.bar[ck]:C.bar[ck.replace(/-\d$/,"")]!=null?C.bar[ck.replace(/-\d$/,"")]:C.BAR;t=Math.min(t,Math.max(0,Math.floor(by-C.base[ck]*hh)))}}catch(e){}
 let head=h.slice(j,k);head=head.replace('class="pcp kit',`class="pcp kit kfw${s>0?" kfx":""}`);
 head=/style="/.test(head)?head.replace('style="',`style="--kfs:${s};--kft:${t};--kfb:${b};`):head.replace(/^<div /,`<div style="--kfs:${s};--kft:${t};--kfb:${b}" `);
 let rest=h.slice(k);if(s>0)rest=rest.replace(fm[0],`<img class="kfr" src="${fm[1].replace(/\.webp$/,"-w.webp")}" data-kfn="${fm[1]}"`).replace(/(<img class="kfr"[^>]*?)onerror="this\.remove\(\)"/,'$1onerror="kitFrwErr(this)"');
 return h.slice(0,j)+head+rest}
/* a -w file that failed once is not asked for again (the cell keeps the normal frame and its old layout) */
const KFRW_BAD=new Set();
function kitFrwErr(im){try{const F=kitFrw(im.getAttribute("src"));if(F)KFRW_BAD.add(F[0]);const n=im.dataset.kfn;const p=im.closest(".pcp");if(p)p.classList.remove("kfw","kfx");if(n&&im.getAttribute("src")!==n){im.onerror=()=>im.remove();im.src=n}else im.remove()}catch(e){}}
window.kitFrwErr=kitFrwErr;
(function(){if(typeof pcard!=="function")return;const c0=pcard;pcard=function(){const h=c0.apply(this,arguments);try{return kitFrwCell(h)}catch(e){return h}}})();
/* the portrait's clip (kpor: inset() of the old opening) widens by s units each side inside a wide cell */
(function(){if(typeof kporApply!=="function")return;const a0=kporApply;
 function widen(img){try{const p=img.closest&&img.closest(".pcp.kfx");if(!p)return;const s=+getComputedStyle(p).getPropertyValue("--kfs")||0;const c=img.style.getPropertyValue("--kpc");if(!c||c===img.__kpcW)return;/* already widened (our own write) */
  const m=/inset\(([-\d.]+)% ([-\d.]+)% ([-\d.]+)% ([-\d.]+)%\)/.exec(c);if(!m||!s)return;const z=+img.dataset.kpz||1;const e=s/(z*388.8)*100;/* box width = z × 70.691 % of 550 */
  const v=`inset(${m[1]}% ${(+m[2]-e).toFixed(3)}% ${m[3]}% ${(+m[4]-e).toFixed(3)}%)`;img.__kpcW=v;img.style.setProperty("--kpc",v)}catch(e){}}
 kporApply=function(img){const r=a0.apply(this,arguments);widen(img);return r};
 /* kpor re-sets --kpc when its measurement arrives: re-widen on every style change of a portrait in a wide cell */
 try{new MutationObserver(ms=>{for(const m of ms){const t=m.target;if(t.classList&&t.classList.contains("kpor"))widen(t)}})
  .observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:["style"]})}catch(e){}})();
(function(){const st=document.createElement("style");st.id="kit-frw";st.textContent=`
/* 2. headroom: the cell's top = the frame's first opaque row, 4 px under the name; bottom = under the tassel */
html body .pc[class][class]>.pcl>.pcp.kit.kfw.kfw{margin-top:calc(4px - var(--kft) * 100% / 550)!important;margin-bottom:calc(4px - (1037 - var(--kfb)) * 100% / 550)!important}
/* the name block above takes only its own lines (jhc kept 2.4em so the old fixed box started level; the cell now starts at its own art) */
html body .pc[class][class]>.pcl:has(>.pcp.kfw)>.pcname{min-height:auto!important;flex-shrink:0!important}
/* 1. wide opening: ground, badge and origin emblem move with the widened frame */
html body .pc[class]>.pcl>.pcp.kit.kfx>.kin>.kbg{left:calc(14.655% - var(--kfs) * 100% / 550);width:calc(70.691% + var(--kfs) * 200% / 550)}
html body .pc[class]>.pcl>.pcp.kit.kfx>.kin>img.kgem{left:calc(73.564% + var(--kfs) * 100% / 550)!important}
html body .pc[class]>.pcl>.pcp.kit.kfx>.kin>img.kemb{left:calc(62.218% + var(--kfs) * 100% / 550)!important}
html body .pc[class]>.pcl>.pcp.kit.kfx>.kin>img.kpor:not(.kporz):not([src*="face-"]):not([src*="unknown"]){clip-path:inset(5% calc(6.14% - var(--kfs) * 100% / 443.2) 7.28% calc(6.14% - var(--kfs) * 100% / 443.2))!important}
html body .pc[class]>.pcl>.pcp.kit.kfx>.kin>img.kpor:not([src*="face-"]):not([src*="unknown"]){-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
`;document.head.appendChild(st)})();
/* kit page sample (#kit): the card cell for a stranger, a maid and the Emperor (s = 0: frame already full width) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§36.4",title:"pcard · ô chân dung khung rộng (khung -w, sát tên)",html:()=>{
 const P=[rivals&&rivals[0],S&&S.maid,S&&S.emp].filter(Boolean);
 return `<div class="kitpg-row" style="align-items:flex-start">${P.map(p=>`<div style="width:240px">${pcard({f:kitFace(p),name:p.name||"",col:"var(--gold)",groups:[]})}</div>`).join("")}</div>`}})}catch(e){}
/* review/hc-portrait-r1 (reviewer): the person switch stays smooth with per-frame box tops.
   (a) the strip's frames are the NARROW files, so the card's -w file was fetched only on the click: the new portrait showed without its frame
       for 150-500 ms on a first visit. Every frame shown in the panel now warms its -w file (once per file).
   (b) the cell's top differs per frame (up to ~35 px at 1180 between consort frames): the new cell and everything under it in the left
       column slide from the old place to the new one in 180 ms (FLIP; the old portrait fading out on top moves with it). None with reduced
       motion / Cảnh động off. */
const KFRW_WARM=new Set();
function kitFrwWarm(root){try{(root||document).querySelectorAll('img.kfr,img[src*="/kit/frame-"]').forEach(i=>{const F=kitFrw(i.getAttribute("src"));if(!F||!F[1][0])return;
 const u=i.getAttribute("src").replace(/frame-[a-z0-9-]+?(?:-w)?\.webp/,F[0]+"-w.webp");if(KFRW_WARM.has(u))return;KFRW_WARM.add(u);const im=new Image();im.decoding="async";im.onerror=()=>KFRW_BAD.add(F[0]);im.src=u})}catch(e){}}
window.kitFrwWarm=kitFrwWarm;
(function(){if(typeof renderPanel!=="function")return;const r0=renderPanel;
 const cell=P=>P&&P.querySelector(".pc>.pcl>.pcp.kit");
 /* the cell's place inside its column, measured on the laid-out page (the wide-card classes land after the render, so the new place is read
    in the next animation frame, before it is painted) */
 const rel=c=>{const L=c.parentElement;return c.getBoundingClientRect().top-L.getBoundingClientRect().top+L.scrollTop};
 renderPanel=function(){const P=document.getElementById("panel");const t0=P&&P.dataset.tab;const o=cell(P);let y0=null;
  try{if(o)y0=rel(o)}catch(e){y0=null}
  const r=r0.apply(this,arguments);
  try{kitFrwWarm(P)}catch(e){}
  /* a -w picture already known broken (from the cache, its error event came before this element existed) falls back at once */
  try{P&&P.querySelectorAll(".pcp.kfw img.kfr[data-kfn]").forEach(i=>{if(i.complete&&!i.naturalWidth)kitFrwErr(i)})}catch(e){}
  try{const rm=(typeof reducedMotion==="function"&&reducedMotion())||(typeof kitCurlOff==="function"&&kitCurlOff());
   if(!rm&&y0!=null&&P.dataset.tab===t0)requestAnimationFrame(()=>{try{const n=cell(P);if(!n)return;const y1=rel(n),d=y0-y1;if(Math.abs(d)<=0.5||Math.abs(d)>=120)return;
    /* the cell and whatever sits under it in the left column (the name above stays put) */
    const L=n.parentElement,top=n.getBoundingClientRect().top-1;
    [...L.children].filter(x=>x===n||(x.offsetParent&&!x.classList.contains("pcname")&&x.getBoundingClientRect().top>=top))
     .forEach(x=>{const a=x.animate([{transform:`translateY(${d}px)`},{transform:"translateY(0)"}],{duration:180,easing:"ease-out"});a.id="kfwSlide"})}catch(e){}})}catch(e){}
  return r}})();

/* KIT §49.2c sample (jhc kitRelPickerSample; registered here because jhc loads before the kit page) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§49.2c",title:"picker gọn · nhãn + chip nhóm + dải mặt một hàng, mũi tên chỉ khi tràn",html:()=>window.kitRelPickerSample?window.kitRelPickerSample():""})}catch(e){}
