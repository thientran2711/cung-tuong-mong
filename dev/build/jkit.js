/* ================= KIT 33 · ONE FIGURE SCALE — KIT_FIG (owner 11/15 "people on the stage are too small") =================
   The single source of truth for how big full-body people are drawn: h = figure (visible body, head to feet) / stage-or-picture height;
   man = men's height factor; kid(age) = children's factor by age; fac(src,age) = the factor of one figure file for one person.
   Readers: j59 (every room / place stage, consort + servant road), jk4 kitStageFig / kitEventStage + week book (CSS var --kfig). */
/* table by sex / age (× the adult woman):  adult woman 1 (≈ .79 of the stage — the ratio the owner approved 11/15 in page-curl shot ipad1180-tab-45, measured .787) · adult man / eunuch / official / physician 1.07 (capped under the ribbon)
   · child a<18: .55 + .03·a (age 5 ≈ .70, 10 ≈ .85, 15 = 1) — heads always stay under the top label (ribbon) */
/* maxPx (owner 11/15): body height never exceeds what the 1180 iPad stage gives (.79 × 685 ≈ 542 px), so taller stages (1366, larger iPads) do not make figures wider */
const KIT_FIG={h:.79,man:1.07,maxPx:542,men:{emperor:1,eunuch:1,official:1,physician:1,man:1},
 kid(a){return typeof a==="number"&&a<18?Math.min(1,.55+.03*Math.max(1,a)):1},
 fac(src,age){const m=/fig-([a-z]+)-/.exec(src||"");const un=/unknown-fig-m\./.test(src||""); /* the unknown-man silhouette is a man too (review/men) */
  return((m&&this.men[m[1]])||un?this.man:1)*this.kid(age)}};
window.KIT_FIG=KIT_FIG;
/* KIT 33.6 · kitFigBody(src, cb) — the ONE body measurement for every full-body figure (room / place stages j59, event stages jk4,
   week book): alpha bbox (t,b,l,r) + ht = head top = first rows of fair forehead skin minus a hair allowance, so crowns, hairpins and
   phoenix headdresses above the head are NOT counted as height. Returns the result when ready, else null and calls cb once measured.
   (Same code as review/men jk4; the cache lives on window so a second identical copy can never clash.) */
function kitFigBody(src,cb){const KIT_FB=window.__KITFB||(window.__KITFB={});const o=KIT_FB[src];if(o&&o.v)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KIT_FB[src]=e;
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f()}catch(x){}})};const im=new Image();im.decoding="async";/* review/stage-side: pictures live on the CDN (cross-origin): without CORS the canvas is tainted, getImageData throws and every figure measured as its whole image box (cores far too wide → paging, crowding) */im.crossOrigin="anonymous";
 im.onload=()=>{let v={t:0,b:1,l:0,r:1,ht:0,ar:im.naturalWidth/Math.max(1,im.naturalHeight)};try{const nh=im.naturalHeight,nw=im.naturalWidth,h=Math.min(500,nh),w=Math.max(1,Math.round(nw*h/nh));
   const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
   let t=h,b=-1,l=w,r=-1;for(let y=0;y<h;y++){const q=y*w*4;for(let i=0;i<w;i++){if(d[q+i*4+3]>40){if(y<t)t=y;if(y>b)b=y;if(i<l)l=i;if(i>r)r=i}}}
   if(b>t){let sk=-1;const lim=t+Math.round((b-t)*.45),need=Math.max(3,Math.round(w*.012));
    for(let y=t;y<=lim&&sk<0;y++){const q=y*w*4;let n=0;for(let i=l;i<=r;i++){const k=q+i*4;if(d[k+3]<200)continue;const R=d[k],G=d[k+1],B=d[k+2];
      if(R>150&&G>105&&B>85&&R-G>=8&&R-G<=62&&G-B>=-4&&G-B<=48&&R-B<=95)n++}if(n>=need)sk=y}
    const ht=sk>=0?Math.max(t,sk-Math.round((b-sk)*.045)):t;
    /* CORE column (owner 11/15): the torso / skirt column — the narrowest opaque run (≥ .4 of the bbox, so a gap row between arm and body is skipped) through the body centre on the waist-to-skirt band
       (35–80 % of the body), ×1.2; sleeve flare beyond that is not counted (it may overlap a neighbour). cl/cr = its left/right. */
    const bh=b-ht,c0=Math.round((l+r)/2);let cl=l,cr=r+1;
    const run=y=>{const q=y*w*4;let c=c0;if(d[q+c*4+3]<=40){let k=1,f=-1;while(k<w/5&&f<0){if(c-k>=0&&d[q+(c-k)*4+3]>40)f=c-k;else if(c+k<w&&d[q+(c+k)*4+3]>40)f=c+k;k++}if(f<0)return null;c=f}
     let A=c,Z=c;while(A>0&&d[q+(A-1)*4+3]>40)A--;while(Z<w-1&&d[q+(Z+1)*4+3]>40)Z++;return[A,Z+1]};
    let ws=null;const mn=(r-l)*.4;for(let f=.35;f<=.8;f+=.02){const R=run(Math.round(ht+bh*f));if(R&&R[1]-R[0]>=mn&&(!ws||R[1]-R[0]<ws[1]-ws[0]))ws=R}
    if(ws){const cc=(ws[0]+ws[1])/2,hw=(ws[1]-ws[0])*.6;cl=Math.max(l,cc-hw);cr=Math.min(r+1,cc+hw)}
    /* KIT 32.2 crop rule (review/stage-fig-size): width profile — wl[k] / wr[k] = left / right paint edge of the rows from the painted top
       down to k/20 of the painted height (fractions of the picture width), so a dialog can fit "head → knees" into a capped column */
    const wl=[],wr=[];let ml=w,mr=-1;for(let k=0,y=t;k<=20;k++){const ye=t+Math.round((b-t)*k/20);for(;y<=ye;y++){const q=y*w*4;for(let i=0;i<ml;i++)if(d[q+i*4+3]>40){ml=i;break}for(let i=w-1;i>mr;i--)if(d[q+i*4+3]>40){mr=i;break}}
     wl.push((mr<0?l:ml)/w);wr.push((mr<0?r+1:mr+1)/w)}
    v={t:t/h,b:(b+1)/h,l:l/w,r:(r+1)/w,ht:ht/h,ar:nw/nh,cl:cl/w,cr:cr/w,wl,wr}}}catch(x){}done(v)};
 im.onerror=()=>{done({t:0,b:1,l:0,r:1,ht:0,ar:.45});setTimeout(()=>{if(KIT_FB[src]===e)delete KIT_FB[src]},1500)};/* review/stage-fig-size: a failed load is not cached for good (it fixed a wrong .45 aspect = squashed figure); measured again next time */im.src=src;return null}
/* KIT 34.6 · kitBookFig(b, fac, H, o) — the ONE body size of a figure on a BOOK page (owner 16/11 "Nhân vật sao chưa theo tỉ lệ chuẩn": the Tuần lục
   silhouette stood far bigger than Thái hậu beside it: the book sized the whole PICTURE BOX, the silhouette box has no margin, and a wide real figure
   (Thái hậu) was additionally shrunk to ≥ 85 %). Same measurement as the stage (kitEsOvFit) and the dialog (kitDpFit): the body = head top (ht, else painted
   top) .. feet (b) of kitFigBody. fac = KIT_FIG.fac(src, age) (woman 1, man 1.07, child by age; a silhouette is a figure like any other).
   · person page column (default, = dialog rule 32.7b: the tallest person, a man, fills the column): body = H × fac / KIT_FIG.man (woman .935 H, man ≈ H);
   · picture plate (o.stage, = stage rule 33): body = min(KIT_FIG.h × H, KIT_FIG.maxPx) × fac.
   Returns the picture box {ih, iw (true aspect, never stretched), dy (the box hangs this far below the foot line: painted feet b<1 stand ON the line), body}.
   Never scaled to fit a width: a wider figure is cut at its column edge (32.2a). Used by jsl (Tuần lục / Mệnh truyện / Sổ luân hồi person pages) and jbook (kitBookPic). */
/* KIT 33.7 · THE SLOT FUNCTION (owner 16/11 OD:L1049, review/stage-slots-fix-r1) — the ONE definition of fixed slots for every group of standing people:
   the room / place stage (j59), the event picture band (kitEsOvFit) and the event person column (kitDpFit) all call it, none has its own numbers.
   k people stand on the FREE width [x0, x0+avail]: 1 → its centre, k ≥ 2 → centres at 1/(k+1), 2/(k+1) … k/(k+1); the slot spacing is avail/(k+1)
   (1 person: the whole width). Figures NEVER overlap: each one's whole visible art (kitFigBody l..r, sleeves and hem included) must fit one spacing,
   else EVERYONE scales down by the same factor (kitSlotScale). */
function kitSlotSw(k,avail){return k>1?avail/(k+1):avail}
function kitSlotCx(i,k,x0,avail){return x0+avail*(i+1)/(k+1)}
function kitSlotScale(vis,avail){const k=vis.length,m=Math.max(0,...vis),sw=kitSlotSw(k,avail);return m>sw&&m>0?sw/m:1}
function kitSlotNeed(vis){const k=vis.length,m=Math.max(0,...vis);return k>1?m*(k+1):m}
window.kitSlotSw=kitSlotSw;window.kitSlotCx=kitSlotCx;window.kitSlotScale=kitSlotScale;window.kitSlotNeed=kitSlotNeed;
function kitBookFig(b,fac,H,o){const bt=b.ht>b.t?b.ht:b.t,span=Math.max(.2,b.b-bt),rel=o&&o.stage?Math.min(KIT_FIG.h*H,KIT_FIG.maxPx):H/KIT_FIG.man,body=Math.min(rel*(fac||1),H*.98),ih=body/span;return{ih,iw:ih*(b.ar||.45),dy:ih*(1-b.b),body,span}}
window.kitBookFig=kitBookFig;
/* KIT 33.4 · kitImgErr — the ONE null-safe fallback for inline <img onerror>: a picture that fails after a re-render detached it
   does nothing (no "reading 'classList' of null" page errors). o.sel: ancestor to mark (default the parent); o.cls: class to add;
   o.text: put img.dataset.i as the parent's text; o.swap: replace the img by img.dataset.i. */
function kitImgErr(im,o){try{o=o||{};if(!im||!im.isConnected)return;const t=o.sel?im.closest(o.sel):im.parentNode;if(!t)return;
 if(o.cls)t.classList.add(o.cls);if(o.text){t.textContent=im.dataset.i||"";return}if(o.swap)im.replaceWith(im.dataset.i||"")}catch(e){}}
window.kitImgErr=kitImgErr;try{document.documentElement.style.setProperty("--kfig",String(KIT_FIG.h))}catch(e){}
/* ================= ONE ACT CARD SIZE: every act card the same width and height at each breakpoint; long text clamps, ⓘ opens the full card ================= */
(function(){const ch=cardH;cardH=function(a,i){let h=ch(a,i);return h.replace(/<\/button>\s*$/,`<span class="kinfo" role="button" tabindex="0" data-kinfo="${i}" aria-label="Xem đủ thẻ" title="Xem đủ">ⓘ</span></button>`)}})();
document.addEventListener("click",e=>{const k=e.target.closest("[data-kinfo]");if(!k)return;e.stopPropagation();e.preventDefault();try{const a=deck[+k.dataset.kinfo];if(!a)return;const full=cardH(a,+k.dataset.kinfo).replace(/^<button[^>]*>/,"").replace(/<\/button>\s*$/,"").replace(/<span class="kinfo"[^>]*>ⓘ<\/span>/,"");
 Q.unshift({t:a.n,h:`<div class="kfull">${full}</div>`});showModal()}catch(err){}},true);
