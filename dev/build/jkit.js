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
/* KIT 33.8 · STAGE PET (owner 16/11 18:00Z, review/stage-pets) — the ONE "theo hầu" pet of every person on a room / place stage (j59), player and NPCs:
   it stands in ONE fixed spot, on the person's RIGHT, feet on the same floor line, its painted body overlapping the person's outer art by at most KIT_PET.ov of its own width
   (never the torso / face: the class heights stay below the waist line). No fancy placement (no perch on a shoulder / hand), no outdoor-only rule, big pets appear anywhere.
   Size = the shared kit CLASS per species (S small / M medium / L large) × the woman body height H of the stage: h = KIT_PET.h[class] (visible height / H).
   Art: img/pet-stage/pet-<key>.webp (cut-out, Foreman C); while a species has none, PLACEHOLDER = the existing transparent pet picture of the pet's growth stage (marked data-ph="1" / class ph).
   kitPetOf(person) reads the already-synced follow data (p.pets / p.petOn) — co-op sends nothing new. Static picture; the only motion is a 1.5 px idle bob under Hiệu ứng "Đầy đủ". */
const KIT_PET={h:{S:.24,M:.30,L:.34},ov:.5,
 cls:{meomuop:"S",hoami:"S",tho:"S",cavang:"S",meo:"S",sao:"S",uyenuong:"S",cachep:"S",vet:"S",lyngu:"S",ngoctho:"S",
  cho:"M",sutu:"M",linhmieu:"M",camke:"M",cuuvi:"M",phuong:"M",
  hac:"L",thienma:"L",bachloc:"L",kylan:"L",thanhlong:"L"},img:{}};
window.KIT_PET=KIT_PET;
/* KIT 33.9 · SWIPE STAGE (owner 16/11 18:22Z, replaces "3 people on one stage"): people NEVER shrink (KIT_FIG). A view holds as many people (+ their pets) as fit side by side at the kit height (j59 `fits`, 33.7 slots; up to 6: Fold portrait ≈ 2, iPad more),
   the others are reached by SWIPING the row left / right (no arrow buttons; the row follows the finger, then slides out / in, 220 ms, transform only). Two "+N" kit chips in the TOP corners of the backdrop, above the heads (left: under the title / rail buttons; right: under the side column or the back button): LEFT = people already passed, RIGHT = people still to come; hidden at 0. A drag never opens a pop-up; a tap does. 33.10: away from her residence the painting is the whole page (jplfs). */
function kitPetClass(k){try{k=typeof petK==="function"?petK(k):k}catch(e){}return KIT_PET.cls[k]||"M"}
function kitPetOf(who){try{if(!who)return null;for(const w of [typeof figWho==="function"?figWho(who):null,who.ref,who,who.__kp]){if(w&&typeof w==="object"&&Array.isArray(w.pets)&&typeof tsbPetOn==="function"){const P=tsbPetOn(w);if(P)return P}}}catch(e){}return null}
function kitPetLoad(src,cb){const c=KIT_PET.img;if(c[src]!==undefined)return c[src];c[src]=null;const im=new Image();im.crossOrigin="anonymous";im.onload=()=>{c[src]={ar:im.naturalWidth/Math.max(1,im.naturalHeight)};if(cb)cb()};im.onerror=()=>{c[src]=false;if(cb)cb()};im.src=src;return null}
/* → {src, ph, cls, k} or null while the picture is still being looked for */
function kitPetArt(P,cb){const k=petK(P.t),s=`img/pet-stage/pet-${k}.webp`;const r=kitPetLoad(s,cb);
 const g=P.stg!=null?P.stg|0:2,sc=[.62,.8,1,1][Math.max(0,Math.min(3,g))];
 if(r)return{src:s,ph:false,cls:kitPetClass(k),k,sc};if(r===null)return null;
 const f=typeof petPSrc==="function"?petPSrc(P,false):petSrc(k,false);const q=kitPetLoad(f,cb);return q?{src:f,ph:true,cls:kitPetClass(k),k,sc}:null}
window.kitPetClass=kitPetClass;window.kitPetOf=kitPetOf;window.kitPetArt=kitPetArt;
/* KIT 33.6 · kitFigBody(src, cb) — the ONE body measurement for every full-body figure (room / place stages j59, event stages jk4,
   week book): alpha bbox (t,b,l,r) + ht = head top = first rows of fair forehead skin minus a hair allowance, so crowns, hairpins and
   phoenix headdresses above the head are NOT counted as height. Returns the result when ready, else null and calls cb once measured.
   (Same code as review/men jk4; the cache lives on window so a second identical copy can never clash.) */
/* review/fig-headtop (owner 17/11): people stand level by the HEAD TOP (skull top), never by hair bun / hairpins / crown / hat — those stick out above.
   kitFigTop(b) = THE head-top line of a measured figure (fraction of the picture height; the painted top when the figure has no table row, e.g. a pet or silhouette);
   every layout measures body = kitFigTop .. feet. The row comes from img/fig-ht.json { "<file>": head top in 1/4000 of the picture height } (dev/art/headtop/headtop.py, face mesh). */
const KIT_HT=window.__KITHT||(window.__KITHT={m:null,s:0,w:[],bad:0});
function kitHtLoad(cb){if(KIT_HT.m)return true;if(cb)KIT_HT.w.push(cb);if(!KIT_HT.s){KIT_HT.s=1;
 const fin=(m,bad)=>{if(KIT_HT.m)return;KIT_HT.m=m;KIT_HT.bad=bad?1:0;const L=KIT_HT.w;KIT_HT.w=[];L.forEach(f=>{try{f()}catch(e){}});if(bad)setTimeout(()=>{KIT_HT.m=null;KIT_HT.s=0;KIT_HT.bad=0;try{kitHtLoad()}catch(e){}},20000)};/* a failed load is not final: the figures wait at most 8 s, then use the painted top and are measured again after the retry */
 const to=setTimeout(()=>fin({},1),8000);
 try{fetch("img/fig-ht.json").then(r=>r.ok?r.json():Promise.reject()).then(m=>{clearTimeout(to);fin(m||{},!m)}).catch(()=>{clearTimeout(to);fin({},1)})}catch(e){clearTimeout(to);fin({},1)}}return false}
function kitHtOf(src){const m=KIT_HT.m;if(!m)return null;const n=String(src||"").split("?")[0].split("/").pop();const v=m[n];return typeof v==="number"?v/4000:null}
function kitFigTop(b){return b&&b.ht!=null&&b.ht>b.t?b.ht:(b?b.t:0)}
window.kitFigTop=kitFigTop;window.kitHtLoad=kitHtLoad;window.kitHtOf=kitHtOf;
function kitFigBody(src,cb){const KIT_FB=window.__KITFB||(window.__KITFB={});const o=KIT_FB[src];if(o&&o.v)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KIT_FB[src]=e;
 const done=v=>{e.v=v;if(KIT_HT.bad&&/fig-/.test(src))setTimeout(()=>{if(KIT_FB[src]===e)delete KIT_FB[src]},21000);const L=e.w;e.w=[];L.forEach(f=>{try{f&&f()}catch(x){}})};const im=new Image();im.decoding="async";/* review/stage-side: pictures live on the CDN (cross-origin): without CORS the canvas is tainted, getImageData throws and every figure measured as its whole image box (cores far too wide → paging, crowding) */im.crossOrigin="anonymous";
 im.onload=()=>{let v={t:0,b:1,l:0,r:1,ht:0,ar:im.naturalWidth/Math.max(1,im.naturalHeight)};try{const nh=im.naturalHeight,nw=im.naturalWidth,h=Math.min(500,nh),w=Math.max(1,Math.round(nw*h/nh));
   const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
   let t=h,b=-1,l=w,r=-1;for(let y=0;y<h;y++){const q=y*w*4;for(let i=0;i<w;i++){if(d[q+i*4+3]>40){if(y<t)t=y;if(y>b)b=y;if(i<l)l=i;if(i>r)r=i}}}
   if(b>t){const hq=kitHtOf(src);const ht=hq!=null?Math.max(t,Math.min(b-Math.round((b-t)*.2),Math.round(hq*h))):t;/* review/fig-headtop: ht from the HEAD-TOP table (img/fig-ht.json, face mesh, dev/art/headtop); the old gold-vs-skin colour test took a gold crown for skin, so ht = painted top for every crowned figure */
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
 im.onerror=()=>{done({t:0,b:1,l:0,r:1,ht:0,ar:.45});setTimeout(()=>{if(KIT_FB[src]===e)delete KIT_FB[src]},1500)};/* review/stage-fig-size: a failed load is not cached for good (it fixed a wrong .45 aspect = squashed figure); measured again next time */if(kitHtLoad(()=>{im.src=src}))im.src=src;/* review/fig-headtop: the picture is measured only once the head-top table is in (a figure measured without it would take its crown for its head and stay cached) */return null}
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
/* KIT 33.7b (owner 16/11 18:35Z, own-room stage): N fixed spots = N equal columns of the free width (centre of column i); people NEVER overlap (art ≤ column), pets may overlap a person's legs only */
function kitSlotSwE(k,avail){return avail/Math.max(1,k)}
function kitSlotCxE(i,k,x0,avail){return x0+avail*(i+.5)/Math.max(1,k)}
/* KIT 33.12 · FIXED SLOT TABLE (owner 16/11 19:54Z + ~20:04Z, review/stage-pets-r7) — THE one table for every stage / place / room view that shows people (j59: her room,
   the full-screen place painting, lãnh cung, servant road, co-op). Like puzzle pieces: a view has a FIXED number of slots, slot i of a view always sits at the same
   x (centre of equal column i of the free width between the side columns, kitSlotCxE) and the same floor line y (kitSlotFloor), whoever stands there and however
   many people there are (1 person = slot 1, not the centre); nobody is shrunk or moved to make room — wide skirts / sleeves may overlap (clothing only).
   page = one page wide view (Fold room, Fold place, iPad room page — the Fold page IS the iPad page scaled, KIT §0) → 2 slots;
   spread = the iPad full-screen place painting over the whole spread → 4 slots (2 per page). Others are reached by swiping (33.9).
   band = px under the feet reserved for the two-line name chip. pet = the following pet's fixed spot: its visible bottom-centre at slot centre + pet.sx × slot width. */
/* stage-figsize (owner 16/11 ~21:20Z "người phải cao hơn và to hơn" + s24: Fold slots a little to the RIGHT, nobody clipped): rail = px kept free on the
   LEFT of every stage view for the left rail (#krail: 44 px buttons at 17 px + 5 px air), always, so the slots never move when the rail appears a moment later
   and no head stands under a rail button; edge = px the visible art (kitFigBody l..r, sleeves included) keeps from the stage edge / side column — a slot
   whose figure would be cut there is pulled in by just that much (kitSlotIn), its pet follows it. */
const KIT_SLOTS={page:2,spread:4,band:50,rail:66,edge:4,pet:{sx:.3}};
function kitSlotIn(cx,l,r,lo,hi){/* l,r = visible art left/right edge relative to the body centre (l<0<r); returns the centre that keeps [cx+l,cx+r] inside [lo,hi] */
 if(r-l>=hi-lo)return (lo+hi)/2-(l+r)/2;if(cx+l<lo)return lo-l;if(cx+r>hi)return hi-r;return cx}
function kitSlotsN(st){try{return st&&st.classList.contains("kplfs")&&kitView().pages===2?KIT_SLOTS.spread:KIT_SLOTS.page}catch(e){return KIT_SLOTS.page}}
function kitSlotFloor(sH){return Math.max(sH*.03,KIT_SLOTS.band)}
function kitPetSpot(cx,sw){return cx+KIT_SLOTS.pet.sx*sw}
window.KIT_SLOTS=KIT_SLOTS;window.kitSlotIn=kitSlotIn;window.kitSlotsN=kitSlotsN;window.kitSlotFloor=kitSlotFloor;window.kitPetSpot=kitPetSpot;
window.kitSlotSwE=kitSlotSwE;window.kitSlotCxE=kitSlotCxE;window.kitSlotSw=kitSlotSw;window.kitSlotCx=kitSlotCx;window.kitSlotScale=kitSlotScale;window.kitSlotNeed=kitSlotNeed;
function kitBookFig(b,fac,H,o){const bt=kitFigTop(b),span=Math.max(.2,b.b-bt),rel=o&&o.stage?Math.min(KIT_FIG.h*H,KIT_FIG.maxPx):H/KIT_FIG.man,body=Math.min(rel*(fac||1),H*.98),ih=body/span;return{ih,iw:ih*(b.ar||.45),dy:ih*(1-b.b),body,span}}
window.kitBookFig=kitBookFig;
/* KIT 33.4 · kitImgErr — the ONE null-safe fallback for inline <img onerror>: a picture that fails after a re-render detached it
   does nothing (no "reading 'classList' of null" page errors). o.sel: ancestor to mark (default the parent); o.cls: class to add;
   o.text: put img.dataset.i as the parent's text; o.swap: replace the img by img.dataset.i. */
function kitImgErr(im,o){try{o=o||{};if(!im||!im.isConnected)return;
 /* stage-figsize (owner Fold shot 16/11: blank portrait frames on the side cards right after a new build): the first load of a new build pulls hundreds of
    pictures from the CDN at once and a few fail for a moment; a failed portrait is retried twice (1.5 s, 4 s) before it falls back to the initials */
 const n=+(im.dataset.kretry||0);if(n<2&&!o.noretry){im.dataset.kretry=n+1;const src=im.getAttribute("src");setTimeout(()=>{try{if(im.isConnected&&src){im.removeAttribute("src");im.setAttribute("src",src)}}catch(e){}},n?4000:1500);return}
 const t=o.sel?im.closest(o.sel):im.parentNode;if(!t)return;
 if(o.cls)t.classList.add(o.cls);if(o.text){t.textContent=im.dataset.i||"";return}if(o.swap)im.replaceWith(im.dataset.i||"")}catch(e){}}
window.kitImgErr=kitImgErr;try{document.documentElement.style.setProperty("--kfig",String(KIT_FIG.h))}catch(e){}
/* ================= ONE ACT CARD SIZE: every act card the same width and height at each breakpoint; long text clamps, ⓘ opens the full card ================= */
(function(){const ch=cardH;cardH=function(a,i){let h=ch(a,i);return h.replace(/<\/button>\s*$/,`<span class="kinfo" role="button" tabindex="0" data-kinfo="${i}" aria-label="Xem đủ thẻ" title="Xem đủ">ⓘ</span></button>`)}})();
document.addEventListener("click",e=>{const k=e.target.closest("[data-kinfo]");if(!k)return;e.stopPropagation();e.preventDefault();try{const a=deck[+k.dataset.kinfo];if(!a)return;const full=cardH(a,+k.dataset.kinfo).replace(/^<button[^>]*>/,"").replace(/<\/button>\s*$/,"").replace(/<span class="kinfo"[^>]*>ⓘ<\/span>/,"");
 Q.unshift({t:a.n,h:`<div class="kfull">${full}</div>`});showModal()}catch(err){}},true);
