/* ================= jbook: BOOK UI KIT — kitPageCurl (curling page turn) + kitBookSpread (two-page book) =================
   Owner 11/14 (00:15Z, 00:45Z + approval): the UI reads like an open book. iPad landscape = a two-page spread (LEFT = picture
   page: the big full-body figure / scene that illustrates the right page; RIGHT = the text page the owner already approved),
   phone/portrait = ONE page: the RIGHT (text) page only — no illustration page on phones (owner 11/14, accepted loss). A tab switch
   is a page turn on both devices, and every page turn CURLS like real paper.
   KIT.md §34. Loaded before j87 (the week book uses kitCurl for its turn).

   kitCurl({host, front, back, w, h, x, y, dir, shadeR, mirror, vanish, keepId}) → {set(p,dir), destroy(), el}  (v2: corner fold, below)
     host  : positioned element; the turning sheet's SPINE is at (x,y) in host px, the sheet is w × h and lies to the right of it.
     front : Element (deep-cloned per strip) | HTML string | null (plain paper) — what is seen while the sheet lies on the right.
     back  : the same for the reverse side (seen once the sheet lies on the left of the spine).
     p     : 0 = flat on the right … 1 = flat on the left.  dir: 1 = turning forward (right → left), -1 = back.
     shadeL/shadeR: draw the moving cast shadow on the left / right ground (spread: both; single page: right only).
   kitCurlRun(c, from, to, dur, done, ease) → cancel()   (rAF tween of c.set)
   kitCurlOff() → true when "Cảnh động" is off or prefers-reduced-motion: callers cross-fade instead (kitCurlFade).
*/
function kitCurlOff(){try{return typeof reducedMotion==="function"?reducedMotion():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function kitCurlEase(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
/* a quick lift then a slower settle (a flick of the page): the next page shows under the corner from the first frames (owner 11/15) */
function kitCurlLift(t){return 1-Math.pow(1-t,1.6)}
/* KIT_TURN_MS: the ONE page-turn duration (owner 11/15 01:50Z "cho animation lật trang chậm lại": ~2× the old 680–760 ms).
   KIT.md §34.0. kitTurnEase: slow lift, even swing, a long gentle settle as the sheet lands. */
const KIT_TURN_MS=1300;
function kitTurnEase(t){const u=1-Math.pow(1-t,1.45);return (1-Math.cos(Math.PI*u))/2}
function kitCurlFade(el,mid,done,ms){ms=ms||170;if(!el){mid&&mid();done&&done();return}el.classList.add("kcl-fade");
 setTimeout(()=>{try{mid&&mid()}catch(e){console.error(e)}el.classList.remove("kcl-fade");setTimeout(()=>done&&done(),ms)},ms)}
function kitCurlSfx(){try{if(typeof kbkSfx==="function")kbkSfx()}catch(e){}}

/* kitCurl v2 (owner 11/15 03:30Z, refs dev/owner-shots/1115-curl-ref-*.jpg): the CORNER lifts first and leads the turn; the sheet folds
   along a DIAGONAL line, the lifted flap shows the BACK of the page, tilted, with a soft curved shading (dark in the bend, a sheen, a
   darker rim), a soft shadow cast by the flap, and a shadow along the fold on the page being uncovered. Not a vertical cylinder roll.
   Geometry: the corner A=(w,h) travels to C(p) = (w−2wp, h−lift·sin πp); the fold is the perpendicular bisector of A–C (the corner is
   clamped so the spine is never folded). Visible = old page on the far side of the fold + the flap (the folded part reflected across the
   fold line, carrying the back face). Each half-plane is an overflow-hidden box aligned to the fold, so a frame changes only transforms
   and opacity (compositor work; no clip-path / layout / repaint per frame). */
function kclMul(A,B){return[A[0]*B[0]+A[2]*B[1],A[1]*B[0]+A[3]*B[1],A[0]*B[2]+A[2]*B[3],A[1]*B[2]+A[3]*B[3],A[0]*B[4]+A[2]*B[5]+A[4],A[1]*B[4]+A[3]*B[5]+A[5]]}
function kclInv(A){const d=A[0]*A[3]-A[1]*A[2]||1e-9,a=A[3]/d,b=-A[1]/d,c=-A[2]/d,e=A[0]/d;return[a,b,c,e,-(a*A[4]+c*A[5]),-(b*A[4]+e*A[5])]}
function kclM(A){return`matrix(${A.map(v=>(+v).toFixed(4)).join(",")})`}
/* a still copy of a live page (kitCurl / kitSheetTurn faces). NO duplicate ids (book-release 11/15): every id is dropped, the root
   keeps it as data-kclid. Rules keyed on #panel no longer reach the copy, so each element's own computed layout is written inline
   (box size, display, grid/flex, spacing, type): the copy looks exactly like the live page without any #id rule. */
const KCL_FREEZE=["boxSizing","display","width","height","minWidth","minHeight","maxWidth","maxHeight","gridTemplateColumns","gridTemplateRows","gridColumn","gridRow","gridAutoFlow",
 "flexDirection","flexWrap","flexGrow","flexShrink","flexBasis","alignItems","alignSelf","alignContent","justifyContent","justifyItems","gap","rowGap","columnGap",
 "paddingTop","paddingRight","paddingBottom","paddingLeft","marginTop","marginRight","marginBottom","marginLeft","fontSize","lineHeight","fontWeight","fontFamily","letterSpacing",
 "textAlign","whiteSpace","color","backgroundColor","backgroundImage","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderTopStyle","borderRightStyle",
 "borderBottomStyle","borderLeftStyle","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","borderRadius","boxShadow","opacity","overflowX","overflowY","position","top","left","right","bottom","zIndex"];
function kclPrep(src,keepId){if(!(src&&src.nodeType===1))return null;const m=src.cloneNode(true),A=[src,...src.querySelectorAll("*")],B=[m,...m.querySelectorAll("*")],sc=[],lk=[];
  for(let i=0;i<A.length;i++){const a=A[i],b=B[i];if(!b)break;if(keepId&&i===0&&b.id)b.dataset.kclid=b.id;b.removeAttribute("id");
   if(i&&b.nodeType===1&&b.style&&a.getClientRects().length){const c0=getComputedStyle(a);for(const k of KCL_FREEZE){const v=c0[k];if(v)b.style[k]=v}}
   else if(i&&b.style&&getComputedStyle(a).display==="none")b.style.display="none";
   if(a.scrollTop||a.scrollLeft)sc.push([b,a.scrollTop,a.scrollLeft]);
   const ca=getComputedStyle(a);if(i&&ca.position==="sticky")b.style.position="relative";
   /* a copied scroller is a still picture: clip it plainly (a live scroll layer inside the moving page is mis-clipped by the compositor) */
   if(/auto|scroll/.test(ca.overflowY+ca.overflowX)){b.style.setProperty("overflow","hidden","important");lk.push([a,b])}
   /* big boxes keep their real size (heights from grid/container units of the old parent would not resolve in the copy) */
   if(i&&a.firstElementChild){const r=a.getBoundingClientRect();if(r.height>=100&&r.width>=100){const st=b.style;st.setProperty("box-sizing","border-box","important");st.setProperty("height",r.height+"px","important");st.setProperty("min-height","0","important");st.setProperty("max-height","none","important");st.setProperty("flex","none","important")}}}
  /* the copy leaves its parent, so rules like ".game>#panel" stop matching: carry the root's own box layout inline */
  const cs=getComputedStyle(src);for(const k of["display","flexDirection","flexWrap","alignItems","alignContent","justifyContent","gap","gridTemplateRows","gridTemplateColumns","gridAutoRows","paddingTop","paddingRight","paddingBottom","paddingLeft","boxSizing","overflowX","overflowY","backgroundColor","backgroundImage","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderTopStyle","borderRightStyle","borderBottomStyle","borderLeftStyle","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","borderRadius","fontSize"])try{m.style[k]=cs[k]}catch(e){}
  if(m.style.display==="none"||m.style.display==="contents")m.style.display="block";
  m.setAttribute("aria-hidden","true");m.inert=true;return{m,sc,lk}}
function kitCurlFold(o){o=o||{};const host=o.host,w=Math.max(40,o.w|0),h=Math.max(40,o.h|0);
 const mir=!!o.mirror,BIG=Math.ceil(Math.hypot(w,h)*2)+40,lift=o.lift!=null?o.lift*h:Math.min(h*.42,w*.8);
 const root=document.createElement("div");root.className="kcl"+(o.cls?" "+o.cls:"");
 root.style.cssText=`left:${o.x||0}px;top:${o.y||0}px;width:${w}px;height:${h}px`+(mir?";transform:scaleX(-1)":"");
 /* a face copy: sticky → relative (one static picture), ids dropped (keepId keeps the root's, so #id styles still apply), scroll kept */
 const prep=kclPrep;
 /* o.ctx: the live page's ancestor (e.g. .game): the copy sits in a stand-in carrying its classes, so rules like ".game.k3ph #panel …"
    still match the copy and it lays out exactly like the live page (owner 11/15: the back must be the WHOLE page, aligned) */
 const ctxWrap=m=>{if(!o.ctx)return m;const d=document.createElement("div");d.className=o.ctx.className+" kcl-ctx";d.appendChild(m);return d};
 const face=(src,cls,keepId)=>{const f=document.createElement("div");f.className="kcl-face "+cls;f.style.width=w+"px";f.style.height=h+"px";
  const p=prep(src,keepId);if(p)f.appendChild(ctxWrap(p.m));else if(typeof src==="string"&&src)f.innerHTML=src;else f.innerHTML=`<div class="kpaper kcl-blank"></div>`;return{f,sc:p?p.sc:[]}};
 const hp=cls=>{const b=document.createElement("div");b.className="kcl-hp "+cls;b.style.width=b.style.height=BIG+"px";return b};
 /* ground: shadow along the fold on the page being uncovered (page-clipped) */
 const gnd=document.createElement("div");gnd.className="kcl-gnd";const gs=document.createElement("i");gs.className="kcl-gs";gs.style.height=BIG+"px";gnd.appendChild(gs);
 /* old page (front) inside the far-side half-plane */
 const hF=hp("kcl-hf"),FR=face(o.front,"kcl-fr",o.keepId);hF.appendChild(FR.f);
 /* the flap: back face in the same half-plane (drawn over the old page), with the bend shading inside it */
 const hB=hp("kcl-hb"),BK=face(o.back,"kcl-bk",false);const sh=document.createElement("i");sh.className="kcl-sh";sh.style.height=BIG+"px";
 /* plain paper back: a faint mirrored show-through of the old page (owner 11/15, optional, subtle) */
 if(o.ghost&&!o.back&&FR.f.firstChild){const gh=FR.f.firstChild.cloneNode(true);gh.classList.add("kcl-ghost");BK.f.appendChild(gh)}
 BK.f.appendChild(sh);hB.appendChild(BK.f);
 root.append(gnd,hF,hB);host.appendChild(root);
 const rescroll=()=>{for(const [e,t,l] of FR.sc.concat(BK.sc)){e.style.scrollBehavior="auto";e.style.scrollSnapType="none";e.scrollTop=t;e.scrollLeft=l}};rescroll();
 const MX=[-1,0,0,1,w,0];let dir0=o.dir||1;
 function set(p,dir){if(dir)dir0=dir;p=Math.max(0,Math.min(1,p));BK.lastP=p;
  /* aligned back: follow the live page's scroll (it may still settle while the sheet turns) */
  if(o.backAligned&&BK.lk)for(const [a,b] of BK.lk){if(b.scrollTop!==a.scrollTop)b.scrollTop=a.scrollTop;if(b.scrollLeft!==a.scrollLeft)b.scrollLeft=a.scrollLeft}
  let cx=w-2*w*p,cy=h-lift*Math.sin(Math.PI*p);
  /* never fold the spine: |C−(0,h)| ≤ w */
  const dd=Math.hypot(cx,cy-h);if(dd>w){cx=cx*w/dd;cy=h+(cy-h)*w/dd}
  let nx=w-cx,ny=h-cy;const L=Math.hypot(nx,ny);
  if(L<.5){nx=1;ny=0}else{nx/=L;ny/=L}
  const Mx=(w+cx)/2,My=(h+cy)/2,dx=-ny,dy=nx,nm=nx*Mx+ny*My;
  /* the half-plane on the far side of the fold (old page + the flap lying over it): local u along n, v along d, ends at the fold (u=BIG) */
  const BF=[nx,ny,dx,dy,Mx-BIG*nx-BIG/2*dx,My-BIG*ny-BIG/2*dy];
  const R=[1-2*nx*nx,-2*nx*ny,-2*nx*ny,1-2*ny*ny,2*nx*nm,2*ny*nm];        /* reflection across the fold */
  /* flap content: the back face lies (when turned) on [−w,0]; now = reflect(spine-mirror(it)) = R·S·translate(−w) */
  let G=kclMul(R,[-1,0,0,1,0,0]);G=kclMul(G,[1,0,0,1,-w,0]);
  hF.style.transform=kclM(BF);const iB=kclInv(BF);FR.f.style.transform=kclM(mir?kclMul(iB,MX):iB);
  hB.style.transform=kclM(BF);const Gm=mir?kclMul(G,MX):G;BK.f.style.transform=kclM(kclMul(iB,Gm));
  /* aligned back: the flap keeps its folded shape (BK.f), the page inside it is put back at its own place on screen */
  if(o.backAligned&&BK.al)BK.al.style.setProperty("transform",kclM(kclMul(kclInv(Gm),mir?MX:[1,0,0,1,0,0])),"important");
  /* how far the folded part reaches beyond the fold */
  let dm=0;for(const [X,Y] of [[0,0],[w,0],[0,h],[w,h]]){const s=(X-Mx)*nx+(Y-My)*ny;if(s>dm)dm=s}
  const el=Math.sin(Math.PI*p);
  /* bend shading in the flap's own coordinates: fold at (w−Mx, My), pointing into the flap along (−nx, ny) */
  const ang=Math.atan2(ny,-nx)*180/Math.PI;
  sh.style.transform=`translate(${(w-Mx).toFixed(2)}px,${My.toFixed(2)}px) rotate(${ang.toFixed(3)}deg) translate(0,${-BIG/2}px) scaleX(${(Math.max(1,dm)/100).toFixed(4)})`;
  sh.style.opacity=(.55+.45*el).toFixed(3);
  /* ground shadow along the fold, on the uncovered side (+n) */
  const ga=Math.atan2(ny,nx)*180/Math.PI,gw=Math.max(14,Math.min(w*.3,18+dm*.32));
  gs.style.transform=`translate(${Mx.toFixed(2)}px,${My.toFixed(2)}px) rotate(${ga.toFixed(3)}deg) translate(0,${-BIG/2}px) scaleX(${(gw/100).toFixed(4)})`;
  gs.style.opacity=o.shadeR===false?"0":(Math.min(1,.35+el)*(p>.85?Math.max(0,(1-p)/.15):1)).toFixed(3);
  root.style.setProperty("--kcl-e",el.toFixed(3));
  if(o.vanish)root.style.opacity=p>.8?Math.max(0,1-(p-.8)/.2).toFixed(3):"1"}
 set(o.p||0);
 /* backAligned (tab switch, owner 11/15): the back shows the destination page at its own place and scale, upright, so the flap and
    the uncovered part together show the WHOLE new page; the flap adds only its shape, shading and fold shadow.
    setBack(el): the back of the turning sheet shows a real page (the destination page, read the right way once turned; owner 11/15) */
 function setBack(src){const p=prep(src,!!o.ctx);if(!p)return;[...BK.f.children].forEach(ch=>{if(ch!==sh)ch.remove()});let n=ctxWrap(p.m);if(o.backAligned){const al=document.createElement("div");al.className="kcl-al";al.style.setProperty("width",w+"px","important");al.style.setProperty("height",h+"px","important");al.appendChild(n);n=al;BK.al=al}
  BK.f.insertBefore(n,sh);BK.sc=p.sc;BK.lk=p.lk;if(BK.lastP!=null)set(BK.lastP)}
 return {el:root,set,rescroll,setBack,destroy(){root.remove()},n:1}}

function kitCurlRun(c,from,to,dur,done,ease){ease=ease||kitCurlEase;const t0=performance.now();let alive=true;const dir=to>=from?1:-1;
 const step=now=>{if(!alive)return;const t=Math.min(1,(now-t0)/Math.max(1,dur));c.set(from+(to-from)*ease(t),dir);if(t<1)requestAnimationFrame(step);else{alive=false;done&&done()}};
 c.set(from,dir);requestAnimationFrame(step);const cancel=()=>{alive=false};cancel.t0=t0;return cancel}

/* ---------- kitSheetTurn: THE page turn — the WHOLE sheet swings around the spine (owner 11/15 10:00Z; binder reference
   dev/owner-shots/1115-turn-ref-1.jpg, -2.jpg) ----------
   kitSheetTurn({host, front, back, under, w, h, x, y, p, ctx, vanish, shadeL, shadeR}) → {el, set(p), setBack(src), setFront(src), rescroll(), destroy()}
   One sheet with two faces (preserve-3d, backface hidden). front = what the sheet shows lying on the RIGHT of the spine (p 0),
   back = what it shows once turned onto the LEFT (p 1). Both are printed ON the sheet (kclPrep copies, no ids), so the content
   rotates, foreshortens and tilts with it — never pinned to the page beneath. The spine is the sheet's LEFT edge, at (x,y) in host px.
   p 0 → 1 = forward (right → left); a backward turn is the same motion run 1 → 0 (the sheet comes back over the spine).
   Look: perspective from above the spine (the free edge grows as it rises toward the reader), a slight tilt + skew mid-turn
   (paper, not a board), face shading by angle, a soft shadow cast on the ground under the lifted sheet on each side.
   under: an optional still copy laid on the ground beneath the sheet (backward live turn: the old page that the sheet covers).
   vanish: the sheet fades out over the last 18 % toward p 1 (it lands on something that is not this page: picture page / off screen).
   Per frame only transform/opacity change (compositor). */
function kitSheetTurn(o){o=o||{};const host=o.host,w=Math.max(40,o.w|0),h=Math.max(40,o.h|0);
 const root=document.createElement("div");root.className="ksht"+(o.cls?" "+o.cls:"");
 root.style.cssText=`left:${o.x||0}px;top:${o.y||0}px;width:${w}px;height:${h}px;perspective:${Math.round(Math.max(1900,w*3.6))}px;perspective-origin:0px 42%`;
 const ctxWrap=m=>{if(!o.ctx)return m;const d=document.createElement("div");d.className=o.ctx.className+" kcl-ctx";d.appendChild(m);return d};
 const fill=(box,src,keep)=>{const p=src&&src.nodeType===1?kclPrep(src,!!o.ctx):null;
  if(p){box.insertBefore(ctxWrap(p.m),keep||null);return p}
  const d=document.createElement("div");d.className="kpaper kcl-blank";if(typeof src==="string"&&src)d.innerHTML=src;box.insertBefore(d,keep||null);return null};
 let U=null;if(o.under){const u=document.createElement("div");u.className="ksht-under";const pu=fill(u,o.under);U={u,sc:pu?pu.sc:[]};root.appendChild(u)}
 const gR=document.createElement("i");gR.className="ksht-gs";const gL=document.createElement("i");gL.className="ksht-gs ksht-gl";
 const sheet=document.createElement("div");sheet.className="ksht-sheet";sheet.style.cssText=`width:${w}px;height:${h}px;transform-origin:0 50%`;
 const face=cls=>{const f=document.createElement("div");f.className="ksht-face "+cls;const sh=document.createElement("i");sh.className="ksht-sh";f.appendChild(sh);return{f,sh,sc:[],lk:[]}};
 const F=face("ksht-front"),B=face("ksht-back");
 const put=(Fc,src)=>{[...Fc.f.children].forEach(ch=>{if(ch!==Fc.sh)ch.remove()});const p=fill(Fc.f,src,Fc.sh);Fc.sc=p?p.sc:[];Fc.lk=p?p.lk:[]};
 put(F,o.front);put(B,o.back||null);
 sheet.append(F.f,B.f);root.append(gR,gL,sheet);host.appendChild(root);
 const rescroll=()=>{for(const [e,t,l] of F.sc.concat(B.sc,U?U.sc:[])){e.style.scrollBehavior="auto";e.style.scrollSnapType="none";e.scrollTop=t;e.scrollLeft=l}};rescroll();
 let last=0;
 function set(p){p=Math.max(0,Math.min(1,+p||0));last=p;const s=Math.sin(Math.PI*p),c=Math.cos(Math.PI*p);
  /* a live face follows its page's scroll (the new page may still settle while the sheet turns) */
  for(const Fc of [F,B])for(const [a,b] of Fc.lk){if(b.scrollTop!==a.scrollTop)b.scrollTop=a.scrollTop}
  const ang=-180*p,tilt=4.2*s,skew=-2.4*s,lift=-0.014*h*s;
  sheet.style.transform=`translateY(${lift.toFixed(2)}px) rotateZ(${tilt.toFixed(3)}deg) rotateY(${ang.toFixed(3)}deg) skewY(${skew.toFixed(3)}deg)`;
  /* the face turning away from the light darkens, the one landing brightens */
  F.sh.style.opacity=Math.min(1,p*1.9).toFixed(3);B.sh.style.opacity=Math.min(1,(1-p)*1.9).toFixed(3);
  /* shadow cast under the lifted sheet: on the right ground while it rises, on the left while it lands */
  gR.style.width=Math.max(24,c*w+24).toFixed(1)+"px";gR.style.opacity=o.shadeR===false||c<=0?"0":(0.85*s).toFixed(3);
  gL.style.width=Math.max(24,-c*w+24).toFixed(1)+"px";gL.style.opacity=!o.shadeL||c>=0?"0":(0.85*s).toFixed(3);
  if(o.vanish)sheet.style.opacity=p>.82?Math.max(0,1-(p-.82)/.18).toFixed(3):"1"}
 set(o.p||0);
 return {el:root,set,rescroll,setBack(src){put(B,src);rescroll();set(last)},setFront(src){put(F,src);rescroll();set(last)},destroy(){root.remove()},sheet:1}}

/* kitCurl = the kit's page turn for every book (week book j87, kitBookSpread): since the owner's 11/15 10:00Z rule it is the WHOLE-SHEET
   turn (kitSheetTurn); the corner-fold engine stays as kitCurlFold (not used for page turns any more). Same call shape:
   kitCurl({host, front, back, w, h, x, y, p, shadeL, shadeR, vanish, ctx}) → {set(p,dir), destroy(), el, rescroll(), setBack()} */
function kitCurl(o){return kitSheetTurn(o)}

/* ---------- kitCurlSwap: turn a live page (tab switch) with the whole sheet ----------
   kitCurlSwap(el, fn, {dir, ms}) : copies el as it is now, runs fn() (the game re-renders el in place), then
   dir 1 (forward): the sheet carrying the OLD page swings over the spine (left edge of el); its back carries the NEW page; the live new
     page lies underneath from the first frame (owner 06:25Z). The sheet fades as it lands beyond the spine (picture page / off screen).
   dir −1 (back): the same motion reversed: the sheet carrying the NEW page comes back over the spine (its back = the old page) and lands
     exactly on the new live page; a still copy of the old page lies underneath until it is covered.
   The copies drop ids (one #panel only) and carry el's own box layout. No turn when el is not shown, when its box changed (another
   layout, e.g. the map), or when "Cảnh động" is off / reduced motion (instant swap with a short cross-fade).
   A new turn while one runs ends the old one at once (fast taps never pile up). */
let kclLive=null;
function kitCurlSwap(el,fn,opt){opt=opt||{};const run=()=>{try{fn&&fn()}catch(e){console.error(e)}};
 if(kclLive){try{kclLive()}catch(e){}kclLive=null}
 const r0=el&&el.getBoundingClientRect();
 if(!el||!r0||r0.width<60||r0.height<60||!el.getClientRects().length){run();return false}
 if(kitCurlOff()){el.classList.add("kcl-fade");run();requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.remove("kcl-fade")));return false}
 const fwd=(opt.dir||1)>0;
 const host=document.createElement("div");host.className="kcl-host";host.style.cssText=`left:${r0.left}px;top:${r0.top}px;width:${r0.width}px;height:${r0.height}px`;
 let c=null;try{c=fwd?kitSheetTurn({host,front:el,back:null,w:r0.width,h:r0.height,ctx:el.closest(".game"),vanish:true,p:0})
                    :kitSheetTurn({host,front:null,back:el,under:el,w:r0.width,h:r0.height,ctx:el.closest(".game"),vanish:true,p:1})}catch(e){console.error(e)}
 run();
 const r1=el.getBoundingClientRect();
 if(!c||Math.abs(r1.left-r0.left)>2||Math.abs(r1.top-r0.top)>2||Math.abs(r1.width-r0.width)>2||Math.abs(r1.height-r0.height)>2||!el.getClientRects().length){host.remove();return false}
 /* the new page printed on the sheet: on its back (forward) or on its front (back turn), as in a real book */
 const take=()=>{if(fwd)c.setBack(el);else c.setFront(el)};
 try{take()}catch(e){console.error(e)}
 document.body.appendChild(host);c.rescroll();kitCurlSfx();
 /* the new page finishes its layout a moment later (person card sizing, chips): print it again once it has settled */
 let alive=true;const reback=()=>{if(!alive)return;try{take()}catch(e){}};
 const sig=()=>{const q=el.querySelector(".pc,.pgwrap,.kbl,section,div");return el.scrollHeight+"|"+el.scrollTop+"|"+(q?q.getBoundingClientRect().top+":"+q.offsetHeight:"")};
 let s0=sig();const iv=setInterval(()=>{if(!alive){clearInterval(iv);return}const s1=sig();if(s1!==s0){s0=s1;reback()}},70);setTimeout(reback,90);
 const fin=()=>{alive=false;clearInterval(iv);host.remove();if(kclLive===end)kclLive=null};
 const stop=kitCurlRun(c,fwd?0:1,fwd?1:0,opt.ms||KIT_TURN_MS,fin,kitTurnEase);
 const end=()=>{stop();fin()};kclLive=end;
 /* test hook: hold the running turn at p (kitCurlSwap.hold(.45)) */
 kitCurlSwap.t0=stop.t0;kitCurlSwap.hold=p=>{stop();c.set(p)};kitCurlSwap.end=end;return true}

/* ---------- kitLeather: the unrolled leather map (Dư đồ) — NOT a book page (owner 11/15 04:00Z) ----------
   kitLeather(el) adds the hide surface around el's map painting: tanned leather with grain and burnt edges, an uneven hide outline,
   a stitched border and the two rolled ends of the unrolled map; the painting gets a faint leather tone. CSS only, no new art.
   kitUnroll(el): the map unrolls from its middle (reduced motion: none). */
function kitLeather(el){if(!el)return el;el.classList.add("kleather");
 if(!el.querySelector(":scope>.kl-roll")){for(const s of["l","r"]){const i=document.createElement("i");i.className="kl-roll kl-"+s;i.setAttribute("aria-hidden","true");el.appendChild(i)}
  const t=document.createElement("i");t.className="kl-tone";t.setAttribute("aria-hidden","true");el.appendChild(t)}
 return el}
function kitUnroll(el){if(!el||kitCurlOff())return;el.classList.remove("kl-unroll");void el.offsetWidth;el.classList.add("kl-unroll");
 setTimeout(()=>el.classList.remove("kl-unroll"),700)}

/* ---------- kitBookSpread: the two-page book container ----------
   kitBookSpread(host, {pic, text, double, mode:"auto"|"spread"|"single"})
     pic   : the LEFT page — illustration only (kitBookPic(...) HTML, an Element, or fn(el)).
     text  : the RIGHT page — the approved panel content (Element is MOVED in, so it stays live; HTML; or fn(el)).
     double: optional Element/HTML spanning BOTH pages on a spread (Dư đồ map); on one page it goes on the text page.
   → {el, mode, picEl, textEl, swap({pic,text,double} | fn,{dir}), set({pic,text,double}), relayout(), destroy()}
   Spread when the host is ≥ 900 px wide and landscape (same rule as kitBook); else one page = the text page (the picture page is
   not shown; callers may skip building it: kitBookSpread.wantsPic(host)). swap() = tab switch with a curl (dir 1 forward, -1 back);
   swap(fn): fn() updates the live content in place (e.g. the game re-renders #panel) after the old pages were copied. */
function kbsFill(el,c){if(c==null)return;el.innerHTML="";if(typeof c==="function")c(el);else if(c.nodeType===1)el.appendChild(c);else el.innerHTML=String(c)}
function kitBookSpread(host,spec){spec=spec||{};const root=document.createElement("div");root.className="kbs";
 root.innerHTML=`<div class="kbs-book"><div class="kbs-pg kbs-l kpaper"><div class="kbs-in kbs-pic"></div></div><div class="kbs-pg kbs-r kpaper"><div class="kbs-in kbs-txt"></div></div><div class="kbs-dbl"></div><i class="kbs-gut"></i></div>`;
 host.appendChild(root);
 const book=root.firstChild,L=book.children[0],R=book.children[1],picEl=L.firstChild,textEl=R.firstChild,dbl=book.querySelector(".kbs-dbl");
 let mode="spread",side="text",busy=false,dblC=null;
 function place(){const sp=mode==="spread";root.classList.toggle("has-dbl",!!dblC);
  if(dblC&&dbl.firstChild!==dblC.el){kbsFill(dbl,dblC.el);kitLeather(dbl)}}
 function layout(){const W=host.clientWidth||innerWidth,H=host.clientHeight||innerHeight;const sp=spec.mode==="spread"||spec.mode!=="single"&&W>=900&&W/H>=1.15;
  mode=sp?"spread":"single";root.classList.toggle("spread",sp);root.classList.toggle("single",!sp);paint();place()}
 function paint(){root.classList.toggle("on-text",true)}
 function set(c){if(typeof c==="function"){c();return}c=c||{};if("double" in c)dblC=c.double?{el:typeof c.double==="string"?(()=>{const d=document.createElement("div");d.className="kbs-dblin";d.innerHTML=c.double;return d})():c.double}:null;
  if(!dblC)dbl.innerHTML="";if(c.pic!==undefined)kbsFill(picEl,c.pic);if(c.text!==undefined)kbsFill(textEl,c.text);place()}
 /* tab switch = page turn: the old pages curl away, the new ones are underneath */
 function swap(c,opt){opt=opt||{};if(busy){set(c);return}const dir=opt.dir||1;kitCurlSfx();
  if(kitCurlOff()){busy=true;kitCurlFade(book,()=>set(c),()=>{busy=false});return}
  /* the map is not a page: going to it unrolls the leather, leaving it the book comes back with a fade */
  if(dblC){busy=true;kitCurlFade(book,()=>set(c),()=>{busy=false});return}
  const toMap=()=>{if(!dblC)return false;busy=false;kitUnroll(dbl);return true};
  const r=book.getBoundingClientRect();busy=true;
  if(mode==="spread"){const pw=r.width/2,h=r.height;
   /* a page-sized picture of what each half shows now (a page, or one half of the double-page layer) */
   const half=(right)=>{if(!root.classList.contains("has-dbl"))return (right?R:L).cloneNode(true);
     const d=document.createElement("div");d.className="kbs-pg kpaper";const m=dbl.cloneNode(true);m.style.cssText=`display:block;position:absolute;top:0;left:${right?-pw:0}px;width:${pw*2}px;height:${h}px`;d.appendChild(m);return d};
   const oL=half(false),oR=half(true);set(c);if(toMap())return;const nL=half(false),nR=half(true);
   const under=document.createElement("div");under.className="kbs-under";const u=dir>0?oL:oR;
   u.style.cssText+=`;position:absolute;top:0;left:${dir>0?0:pw}px;width:${pw}px;height:${h}px`;under.appendChild(u);book.appendChild(under);
   const cu=dir>0?kitCurl({host:book,front:oR,back:nL,w:pw,h,x:pw,y:0,po:0,shadeL:true})
                 :kitCurl({host:book,front:nR,back:oL,w:pw,h,x:pw,y:0,po:0,shadeL:true,p:1,dir:-1});
   kitCurlRun(cu,dir>0?0:1,dir>0?1:0,KIT_TURN_MS,()=>{cu.destroy();under.remove();busy=false});
   return}
  /* one page (text only): forward = the old page curls away over the new one; back = the new page curls back in over the old */
  if(dir>0){const old=R.cloneNode(true);set(c);if(toMap())return;const cu=kitCurl({host:book,front:old,back:R,w:r.width,h:r.height,x:0,y:0,shadeL:false,vanish:true});
   kitCurlRun(cu,0,1,KIT_TURN_MS,()=>{cu.destroy();busy=false})}
  else{const old=R.cloneNode(true);old.style.cssText+=";position:absolute;inset:0";const under=document.createElement("div");under.className="kbs-under kbs-under1";under.appendChild(old);
   set(c);if(toMap())return;book.appendChild(under);const cu=kitCurl({host:book,front:R,back:old,w:r.width,h:r.height,x:0,y:0,shadeL:false,vanish:true,p:1});
   kitCurlRun(cu,1,0,KIT_TURN_MS,()=>{cu.destroy();under.remove();busy=false})}}
 const ro=typeof ResizeObserver==="function"?new ResizeObserver(()=>{if(!busy)layout()}):null;ro&&ro.observe(host);
 set(spec);layout();
 return {el:root,picEl,textEl,get mode(){return mode},swap,set,relayout:layout,destroy(){ro&&ro.disconnect();root.remove()}}}

/* ---------- kitBookPic: the picture page (illustration only; never carries the right page's info) ----------
   kitBookPic({scene, ax, feet, figs:[{src, h, x, cap}], sil:n, plate, cap, slots:[{label, img}]}) → HTML
     scene: room picture (cover-cropped, kept on the floor anchor ax = KIT_FANCHOR x); figs stand on the feet line (feet = 0..1 of the page).
     sil  : number of anonymous silhouettes (Dư đồ place scene: "người đang có mặt"), drawn as kit unknown figures, dimmed.
     cap  : small caption plaque under the plate (place / name, illustration caption only). slots: try-on slots beside the figure. */
kitBookSpread.wantsPic=host=>{const W=(host&&host.clientWidth)||innerWidth,H=(host&&host.clientHeight)||innerHeight;return W>=900&&W/H>=1.15};
function kitBookPic(o){o=o||{};const ax=o.ax!=null?o.ax:.5,feet=o.feet!=null?o.feet:.94;
 const figs=(o.figs||[]).map((f,i)=>`<img class="kbp-fig${f.dim?" dim":""}" src="${f.src}" alt="" decoding="async" style="--fx:${f.x!=null?f.x:.5};--fh:${f.h||(window.KIT_FIG?KIT_FIG.h:.86)};--fz:${f.z||i+2}">`).join("");
 const slots=o.slots&&o.slots.length?`<div class="kbp-slots">${o.slots.map(s=>`<div class="kbp-slot${s.img?"":" empty"}"><span class="kbp-sim">${s.img?`<img src="${s.img}" alt="">`:""}</span><b>${s.label}</b>${s.n?`<small>${s.n}</small>`:""}</div>`).join("")}</div>`:"";
 return `<div class="kbp${o.plate===false?" bleed":""}" style="--ax:${ax};--feet:${feet}"><div class="kbp-plate"><div class="kbp-scene" style="background-image:url('${o.scene||""}')"></div><div class="kbp-figs">${figs}</div>${slots}</div>${o.cap?`<div class="kbp-cap">${o.cap}</div>`:""}</div>`}

(function(){const st=document.createElement("style");st.id="jbook-css";st.textContent=`
/* paper skin (KIT §34.1): warm paper, faint fibres, edge tint */
.kpaper{position:absolute;inset:0;box-sizing:border-box;color:var(--ink,#2a1a12);background:
 radial-gradient(ellipse 70% 50% at 25% 18%,#fbf3dd 0,transparent 70%),radial-gradient(ellipse 60% 45% at 85% 92%,#e8d3a6 0,transparent 70%),
 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 .08 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"),
 linear-gradient(#f6ecd6,#efe0bf);box-shadow:inset 0 0 34px #8a5a2433}
.kcl-blank{background:linear-gradient(100deg,#efe2c4,#f7eedb 55%,#eadab6)}
/* curl v2: half-plane boxes aligned to the fold; only transforms/opacity change per frame */
.kcl{position:absolute;z-index:9999;pointer-events:none;transform-origin:50% 50%}
.kcl-gnd{position:absolute;inset:0;overflow:hidden}
.kcl-hp{position:absolute;left:0;top:0;overflow:hidden;transform-origin:0 0;will-change:transform}
.kcl-face{position:absolute;left:0;top:0;overflow:hidden;transform-origin:0 0}
.kcl .kcl-face>*:not(.kcl-sh){position:absolute!important;inset:0!important;width:auto!important;height:auto!important;max-height:none!important;margin:0!important;visibility:visible!important;transform:none!important}
.kcl-fr{box-shadow:0 0 0 1px #8a5a2418}
html body .kcl .kcl-face>.kcl-al{inset:auto!important;left:0!important;top:0!important;transform-origin:0 0!important;overflow:visible!important}
html body .kcl .kcl-al>*{position:absolute!important;inset:0!important}
html body .kcl .kcl-ctx{display:block!important;position:absolute!important;inset:0!important;background:none!important;padding:0!important;margin:0!important;border:0!important;max-width:none!important;min-height:0!important;height:auto!important;overflow:hidden!important}
html body .kcl .kcl-ctx>*{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;max-height:none!important;margin:0!important;transform:none!important;visibility:visible!important}
.kcl .kcl-face>.kcl-ghost{opacity:.075!important;transform:scaleX(-1)!important;filter:grayscale(.6) blur(.4px);pointer-events:none;z-index:1}
/* the flap: its own soft shadow falls on the page below it */
.kcl-bk{box-shadow:0 0 16px 2px #2a14064d,0 0 3px #2a140640;background:#f3e7cc}
/* bend shading across the flap, from the fold: dark in the bend, a sheen where it curves toward the light, darker rim */
.kcl-sh{position:absolute;left:0;top:0;width:100px;transform-origin:0 0;z-index:60;pointer-events:none;will-change:transform,opacity;
 background:linear-gradient(90deg,#2a1406a8 0,#2a140655 7%,#2a140614 20%,#fff8e600 30%,#fff8e652 44%,#fff8e61a 58%,#2a140600 72%,#2a14061f 92%,#2a140638 100%)}
/* shadow the lifted page casts along the fold on the page being uncovered */
.kcl-gs{position:absolute;left:0;top:0;width:100px;transform-origin:0 0;will-change:transform,opacity;
 background:linear-gradient(90deg,#1e0f058c,#1e0f053a 30%,#1e0f0510 65%,transparent)}
.kcl-fade{transition:opacity .17s!important;opacity:0!important}
/* two-page book */
.kbs{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:var(--kbs-pad,10px 14px 12px)}
.kbs-book{position:relative;width:100%;height:100%;display:grid;grid-template-columns:1fr 1fr;transition:opacity .17s}
.kbs-book::before{content:"";position:absolute;inset:-6px -7px;border-radius:6px;background:repeating-linear-gradient(45deg,#ffffff08 0 2px,transparent 2px 5px),linear-gradient(#3a2a52,#241a36);box-shadow:0 14px 34px #0008,inset 0 0 0 1px #ffffff14}
.kbs-pg{position:relative!important;inset:auto;overflow:hidden;min-width:0;min-height:0}
.kbs-l{border-radius:4px 0 0 4px}.kbs-r{border-radius:0 4px 4px 0}
/* page edges: thin stacked leaves on the outer edges */
.kbs-l::before,.kbs-r::before{content:"";position:absolute;top:3px;bottom:3px;width:5px;z-index:6;pointer-events:none;background:repeating-linear-gradient(90deg,#efe0bf 0 1px,#c4aa7c 1px 2px)}
.kbs-l::before{left:0;border-radius:3px 0 0 3px}.kbs-r::before{right:0;border-radius:0 3px 3px 0}
/* gutter: soft fold shadow on both inner edges + a dark crease */
.kbs-l::after,.kbs-r::after{content:"";position:absolute;top:0;bottom:0;width:11%;z-index:6;pointer-events:none}
.kbs-l::after{right:0;background:linear-gradient(270deg,#4a2c1250,#4a2c1218 40%,transparent)}
.kbs-r::after{left:0;background:linear-gradient(90deg,#4a2c1250,#4a2c1218 40%,transparent)}
.kbs-gut{position:absolute;top:0;bottom:0;left:calc(50% - 1.5px);width:3px;z-index:7;pointer-events:none;background:linear-gradient(90deg,#00000022,#00000055,#00000022)}
.kbs-in{position:absolute;inset:14px 14px 14px 12px;overflow:auto;overscroll-behavior:contain;border-radius:2px}
.kbs-r .kbs-in{inset:12px 12px 12px 18px}.kbs-l .kbs-in{inset:12px 18px 12px 12px;overflow:hidden}
.kbs-dbl{display:none}
/* Dư đồ: not a book page — the leather map covers the whole book area (no pages, no gutter, no cover board) */
.kbs.has-dbl .kbs-dbl{display:block;position:absolute;inset:0;z-index:5}
.kbs.has-dbl .kbs-pg,.kbs.has-dbl .kbs-gut{visibility:hidden}.kbs.has-dbl .kbs-book::before{display:none}
.kbs-under{position:absolute;inset:0;z-index:9990;pointer-events:none}
.kbs-under>.kbs-pg{position:absolute!important;left:0;top:0;width:50%;height:100%}
/* one page = the text page only */
.kbs.single .kbs-book{grid-template-columns:1fr}
.kbs.single .kbs-l,.kbs.single .kbs-gut{display:none}
.kbs.single .kbs-r{border-radius:3px 4px 4px 3px}
.kbs.single .kbs-r::after{width:5%;background:linear-gradient(90deg,#4a2c1240,transparent)}
.kbs.single .kbs-r .kbs-in{inset:10px 12px 10px 14px}
.kbs-under1>.kbs-pg{width:100%}
/* picture page: an illustrated plate (cover-cropped room kept on its floor anchor, full-body figures on the feet line) */
.kbp{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px}
.kbp-plate{position:relative;flex:1 1 auto;min-height:0;overflow:hidden;border:1px solid #9a2c1c99;outline:1px solid #9a2c1c55;outline-offset:3px;margin:4px;background:#2a1a12;box-shadow:inset 0 0 30px #00000055}
.kbp.bleed .kbp-plate{margin:0;outline:0;border:0}
.kbp-scene{position:absolute;inset:0;background-size:cover;background-position:calc(var(--ax) * 100%) 100%;filter:saturate(.92)}
.kbp-plate::after{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 85% 70% at 50% 45%,transparent 55%,#2a160840);mix-blend-mode:multiply}
.kbp-figs{position:absolute;inset:0;z-index:2}
.kbp-fig{position:absolute;bottom:calc((1 - var(--feet)) * 100%);left:calc(var(--fx) * 100%);height:calc(var(--fh) * 100%);width:auto;max-width:none;transform:translateX(-50%);z-index:var(--fz);filter:drop-shadow(0 6px 6px #0005)}
.kbp-fig.dim{filter:brightness(.92) drop-shadow(0 4px 4px #0004);opacity:.92}
.kbp-cap{flex:0 0 auto;align-self:center;font-family:var(--display);font-size:clamp(.82rem,1.6vw,1rem);color:var(--rule,#9a2c1c);background:#fffaf0d9;border:1px solid #9a2c1c66;border-radius:4px;padding:.2em .9em;margin-bottom:2px;letter-spacing:.03em;max-width:92%;text-align:center}
.kbp-slots{position:absolute;z-index:4;right:3%;top:4%;display:flex;flex-direction:column;gap:8px}
.kbp-slot{display:flex;flex-direction:column;align-items:center;gap:2px;width:clamp(64px,13vw,92px);background:#fffaf0e6;border:1px solid #9a2c1c88;border-radius:6px;padding:6px 4px 5px;box-shadow:0 3px 8px #0005;text-align:center}
.kbp-sim{display:block;width:100%;aspect-ratio:1;border-radius:4px;background:radial-gradient(#fff6e2,#ead6ad);border:1px dashed #9a2c1c55;overflow:hidden}
.kbp-sim img{width:100%;height:100%;object-fit:contain}
.kbp-slot b{font-family:var(--display);font-size:.8rem;color:var(--rule,#9a2c1c);font-weight:600}
.kbp-slot small{font-size:.7rem;color:var(--dim,#7a6a5a);line-height:1.15}
.kbp-slot.empty .kbp-sim{opacity:.7}
@media (prefers-reduced-motion:reduce){.kbs-book{transition:opacity .17s}}
/* ===== Dư đồ: the unrolled LEATHER map (kitLeather) — not a book page ===== */
.kleather{position:relative;box-sizing:border-box;padding:22px 34px;border-radius:12px;isolation:isolate;
 clip-path:polygon(0.4% 0.36%,6.44% 0.72%,13.43% 0.59%,21.16% 0.06%,28.59% 0.04%,35.58% 0.08%,42.04% 0.47%,50.65% 0.14%,56.59% 0.69%,65.18% 0.63%,71.22% 1.07%,77.66% 0.94%,85.29% 0.16%,92.09% 0.34%,99.35% 0.5%,99.86% 7.31%,99.49% 14.03%,99.56% 20.55%,99.95% 27.98%,99.46% 35.57%,99.75% 43.03%,99.64% 49.6%,99.36% 57.54%,99.8% 64.43%,99.58% 72.18%,99.42% 78.15%,99.22% 84.95%,99.67% 93.37%,99.6% 99.83%,92.84% 99.96%,86.05% 99.16%,78.72% 99.04%,71.06% 99.24%,64.47% 99.36%,57.06% 99.08%,50.89% 99.48%,43.19% 99.93%,36.12% 99.29%,29.56% 99.1%,21.0% 99.58%,14.62% 99.98%,7.07% 99.82%,0.09% 99.5%,0.05% 93.39%,0.1% 85.21%,0.31% 79.31%,0.06% 71.33%,0.44% 65.05%,0.66% 57.87%,0.22% 49.83%,0.29% 43.63%,0.77% 35.02%,0.14% 28.04%,0.19% 21.4%,0.47% 13.81%,0% 6.98%);
 background:
  radial-gradient(ellipse 60% 45% at 28% 22%,#a8754555,transparent 70%),radial-gradient(ellipse 55% 50% at 78% 78%,#2e180a66,transparent 70%),
  radial-gradient(ellipse 30% 22% at 62% 30%,#8a5a3244,transparent 70%),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .16 0 0 0 0 .08 0 0 0 0 .03 0 0 0 .32 0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E"),
  linear-gradient(135deg,#7d5130,#603b1f 48%,#734828);
 box-shadow:inset 0 0 0 1px #2a14088a,inset 0 0 26px 8px #1c0c04d0,inset 0 0 70px #2a14066b}
/* stitched border */
.kleather::before{content:"";position:absolute;inset:9px 24px;border:2px dashed #e2c38c8c;border-radius:10px;pointer-events:none;z-index:1}
/* the painting sits on the hide: soft burnt edge + leather tone over it (no blend, cheap while panning) */
.kleather>.mapsc{position:relative;z-index:2;border-radius:6px!important;box-shadow:0 0 0 1px #2a140899,0 2px 10px #1c0c0499}
.kleather>.kl-tone{position:absolute;inset:22px 34px;z-index:3;pointer-events:none;border-radius:6px;
 background:radial-gradient(ellipse 75% 70% at 50% 50%,transparent 62%,#3a1e0a3d 88%,#2a14066b);box-shadow:inset 0 0 14px 2px #3a1e0a73}
/* the two rolled ends of the unrolled map */
.kl-roll{position:absolute;top:.6%;bottom:.6%;width:21px;z-index:4;pointer-events:none;border-radius:8px;
 background:linear-gradient(90deg,#2a1608,#6a4223 22%,#b07a48 46%,#d39a62 52%,#8a5a32 70%,#3b2210);box-shadow:0 0 6px #1c0c0499}
.kl-roll::before{content:"";position:absolute;inset:0;border-radius:inherit;background:repeating-linear-gradient(0deg,transparent 0 9px,#2a14082e 9px 10px)}
.kl-l{left:2px}.kl-r{right:2px}
/* the map's tools float on the painting; the info strip above the map is gone (owner 11/15) */
html .game .kleather>.maptools{inset:22px 34px}
html .game .kleather>.maptools>.past,html .game .kleather>.maptools>.fest{display:none!important}
.panel:has(>.kleather){background:transparent!important;border-color:transparent!important;box-shadow:none!important;padding:0!important}
@media (max-width:760px){.kleather{padding:15px 23px}.kleather::before{inset:6px 17px}.kleather>.kl-tone,html .game .kleather>.maptools{inset:15px 23px}.kl-roll{width:15px}}
/* unrolling (going to the map) */
.kleather.kl-unroll{animation:kl-un .62s cubic-bezier(.25,.7,.25,1)}
.kl-unroll>.kl-l{animation:kl-rl .62s cubic-bezier(.25,.7,.25,1)}.kl-unroll>.kl-r{animation:kl-rr .62s cubic-bezier(.25,.7,.25,1)}
@keyframes kl-un{from{clip-path:polygon(48.51% 0.36%,48.69% 0.72%,48.9% 0.59%,49.13% 0.06%,49.36% 0.04%,49.57% 0.08%,49.76% 0.47%,50.02% 0.14%,50.2% 0.69%,50.46% 0.63%,50.64% 1.07%,50.83% 0.94%,51.06% 0.16%,51.26% 0.34%,51.48% 0.5%,51.5% 7.31%,51.48% 14.03%,51.49% 20.55%,51.5% 27.98%,51.48% 35.57%,51.49% 43.03%,51.49% 49.6%,51.48% 57.54%,51.49% 64.43%,51.49% 72.18%,51.48% 78.15%,51.48% 84.95%,51.49% 93.37%,51.49% 99.83%,51.29% 99.96%,51.08% 99.16%,50.86% 99.04%,50.63% 99.24%,50.43% 99.36%,50.21% 99.08%,50.03% 99.48%,49.8% 99.93%,49.58% 99.29%,49.39% 99.1%,49.13% 99.58%,48.94% 99.98%,48.71% 99.82%,48.5% 99.5%,48.5% 93.39%,48.5% 85.21%,48.51% 79.31%,48.5% 71.33%,48.51% 65.05%,48.52% 57.87%,48.51% 49.83%,48.51% 43.63%,48.52% 35.02%,48.5% 28.04%,48.51% 21.4%,48.51% 13.81%,48.5% 6.98%)}to{clip-path:polygon(0.4% 0.36%,6.44% 0.72%,13.43% 0.59%,21.16% 0.06%,28.59% 0.04%,35.58% 0.08%,42.04% 0.47%,50.65% 0.14%,56.59% 0.69%,65.18% 0.63%,71.22% 1.07%,77.66% 0.94%,85.29% 0.16%,92.09% 0.34%,99.35% 0.5%,99.86% 7.31%,99.49% 14.03%,99.56% 20.55%,99.95% 27.98%,99.46% 35.57%,99.75% 43.03%,99.64% 49.6%,99.36% 57.54%,99.8% 64.43%,99.58% 72.18%,99.42% 78.15%,99.22% 84.95%,99.67% 93.37%,99.6% 99.83%,92.84% 99.96%,86.05% 99.16%,78.72% 99.04%,71.06% 99.24%,64.47% 99.36%,57.06% 99.08%,50.89% 99.48%,43.19% 99.93%,36.12% 99.29%,29.56% 99.1%,21.0% 99.58%,14.62% 99.98%,7.07% 99.82%,0.09% 99.5%,0.05% 93.39%,0.1% 85.21%,0.31% 79.31%,0.06% 71.33%,0.44% 65.05%,0.66% 57.87%,0.22% 49.83%,0.29% 43.63%,0.77% 35.02%,0.14% 28.04%,0.19% 21.4%,0.47% 13.81%,0% 6.98%)}}
@keyframes kl-rl{from{left:calc(50% - 16px)}to{left:2px}}@keyframes kl-rr{from{right:calc(50% - 16px)}to{right:2px}}
/* kitSheetTurn: the whole sheet swings around the spine */
.ksht{position:absolute;left:0;top:0;pointer-events:none;z-index:9999}
.ksht-sheet{position:absolute;left:0;top:0;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;will-change:transform}
.ksht-face{position:absolute;inset:0;overflow:hidden;background:#f3e7cc;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:3px;box-shadow:0 0 14px #2a14064d}
.ksht-back{transform:rotateY(180deg)}
html body .ksht .ksht-face>*:not(.ksht-sh){position:absolute!important;inset:0!important;width:auto!important;height:auto!important;max-height:none!important;margin:0!important;visibility:visible!important;transform:none!important}
.ksht-sh{position:absolute;inset:0;z-index:60;pointer-events:none;opacity:0}
.ksht-front>.ksht-sh{background:linear-gradient(90deg,#2a140612,#2a14064d 60%,#2a140685)}
.ksht-back>.ksht-sh{background:linear-gradient(90deg,#2a140670,#2a140638 40%,#2a140614)}
.ksht-gs{position:absolute;top:0;bottom:0;left:0;opacity:0;background:linear-gradient(90deg,#1e0f0510,#1e0f0559 calc(100% - 24px),transparent)}
.ksht-gl{left:auto;right:100%;background:linear-gradient(270deg,#1e0f0510,#1e0f0559 calc(100% - 24px),transparent)}
.ksht-under{position:absolute;inset:0;overflow:hidden}
html body .ksht .ksht-under>*{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;max-height:none!important;margin:0!important;visibility:visible!important;transform:none!important}
html body .ksht .kcl-ctx{display:block!important;position:absolute!important;inset:0!important;background:none!important;padding:0!important;margin:0!important;border:0!important;max-width:none!important;min-height:0!important;height:auto!important;overflow:hidden!important}
html body .ksht .kcl-ctx>*{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;max-height:none!important;margin:0!important;transform:none!important;visibility:visible!important}
.kcl-host{position:fixed;z-index:40;pointer-events:none;
 /* the turning page never rises above the page area (stays under the top bar); it may still swing out sideways over the left page */
 clip-path:polygon(-6000px 0,6000px 0,6000px calc(100% + 3px),-6000px calc(100% + 3px))}
.kcl-in{animation:kcl-in .3s ease-out}@keyframes kcl-in{from{opacity:0}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.kleather.kl-unroll,.kl-unroll>.kl-roll,.kcl-in{animation:none}}
/* ===== the live game as an open BOOK (owner 11/14 approval, 11/15 priority) — kitBookLive =====
   iPad landscape: the room stage = LEFT picture page, the tab panel = RIGHT text page, gutter between, cover board behind.
   Phone / portrait: ONE page (the panel) on the board. Dư đồ is not a page (leather map, .maptab drops the book). */
.kbk-board{display:none}
.game.kbook{isolation:isolate}
.game.kbook>.kbk-board{display:block;position:relative;z-index:-1;pointer-events:none;grid-row:panel-start/panel-end;grid-column:panel-start/panel-end;
 margin:-5px -6px -6px -6px;border-radius:8px;
 background:repeating-linear-gradient(45deg,#ffffff08 0 2px,transparent 2px 5px),linear-gradient(#3a2a52,#241a36);box-shadow:0 12px 30px #0007,inset 0 0 0 1px #ffffff14}
/* the text page: warm paper, faint fibres, stacked leaves on the outer edge */
.game.kbook>#panel{border-color:#b89a6a80;
 background:linear-gradient(270deg,#efe0bf 0 1px,#c4aa7c 1px 2px,#efe0bf 2px 3px,#c4aa7c 3px 4px,#efe0bf 4px 5px,transparent 5px),
  radial-gradient(ellipse 70% 50% at 25% 18%,#fbf3dd 0,transparent 70%),radial-gradient(ellipse 60% 45% at 85% 92%,#ecd9b0 0,transparent 70%),
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"),
  linear-gradient(#f8efdb,#f1e4c6);
 box-shadow:inset 0 0 30px #8a5a2426}
@media (min-aspect-ratio:1/1) and (min-width:900px){
 .game.kbook{column-gap:0!important}
 .game.kbook>.kbk-board{grid-column:stage-start/panel-end}
 /* right page: gutter shadow on its inner (left) edge */
 .game.kbook>#panel{border-radius:0 6px 6px 0;border-left-color:transparent;
  background:linear-gradient(90deg,#2a160870 0 1.5px,transparent 1.5px),linear-gradient(90deg,#4a2c1270,#4a2c1229 16px,transparent 40px),linear-gradient(270deg,#efe0bf 0 1px,#c4aa7c 1px 2px,#efe0bf 2px 3px,#c4aa7c 3px 4px,#efe0bf 4px 5px,transparent 5px),
   radial-gradient(ellipse 70% 50% at 25% 18%,#fbf3dd 0,transparent 70%),radial-gradient(ellipse 60% 45% at 85% 92%,#ecd9b0 0,transparent 70%),
   url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 .07 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"),
   linear-gradient(#f8efdb,#f1e4c6)}
 /* left page: the room picture printed on the page (paper margin + thin red rule), stacked leaves outside, gutter shadow inside */
 .game.kbook>#stage{border-radius:6px 0 0 6px;border-color:#b89a6a80;border-right-color:transparent}
 .game.kbook>#stage::before{content:"";position:absolute;inset:0;z-index:40;pointer-events:none;border-radius:inherit;
  box-shadow:inset 0 0 0 6px #f3e6c9,inset 0 0 0 7px #9a2c1c80,inset 0 0 0 9px #f3e6c900,inset 3px 0 0 6px #f3e6c9;
  background:linear-gradient(270deg,#3a1e0a80,#3a1e0a33 18px,transparent 46px),linear-gradient(90deg,#efe0bf 0 1px,#c4aa7c 1px 2px,#efe0bf 2px 3px,#c4aa7c 3px 4px,#efe0bf 4px 5px,transparent 5px)}
}
`;document.head.appendChild(st)})();

/* ---------- kitBookLive: the live layout dressed as the open book (every tab, both roads) ----------
   .game.kbook + a cover board behind the page row; CSS does the rest (spread on landscape ≥ 900 px, one page otherwise).
   Not on the map (leather), the title or the end screen. */
function kitBookLive(){const g=document.querySelector(".game");if(!g)return;
 const on=!g.classList.contains("maptab")&&!(typeof S==="undefined"||!S)&&!S.dead&&!!document.getElementById("panel");
 g.classList.toggle("kbook",on);let b=g.querySelector(":scope>.kbk-board");
 if(on&&!b){b=document.createElement("i");b.className="kbk-board";b.setAttribute("aria-hidden","true");g.insertBefore(b,g.firstChild)}}

/* ---------- live game: a tab switch turns #panel with the curl; Dư đồ is the leather map ---------- */
(function(){if(typeof render!=="function")return;
 /* installed after every module has wrapped render(), so the old page is copied before any of them re-renders it */
 setTimeout(()=>{const r0=render;let last=null;
  const order=t=>{const B=[...document.querySelectorAll("#tabs [data-tab]")].map(b=>b.dataset.tab);const i=B.indexOf(t);return i<0?99:i};
  render=function(){const self=this,args=arguments;let out,done=false;const t1=typeof tab!=="undefined"?tab:null,t0=last;
   const pn=document.getElementById("panel");const call=()=>{done=true;out=r0.apply(self,args)};
   try{if(pn&&t0!=null&&t1!==t0&&t0!=="go"&&t1!=="go"&&typeof S!=="undefined"&&S&&!S.dead)kitCurlSwap(pn,call,{dir:order(t1)>=order(t0)?1:-1});else call()}
   catch(e){if(done)throw e;console.error(e);call()}
   try{kitBookLive()}catch(e){console.error(e)}
   try{last=t1;const mv=document.querySelector(".game.maptab #panel .mapv");
    if(mv){kitLeather(mv);if(t0!=null&&t0!=="go"&&t1==="go")kitUnroll(mv)}
    else if(t0==="go"&&t1!=="go"&&pn){if(!kitCurlOff()){pn.classList.remove("kcl-in");void pn.offsetWidth;pn.classList.add("kcl-in");setTimeout(()=>pn.classList.remove("kcl-in"),340)}
     /* the page row changed shape (map → book): let the person card measure its room again once the layout has settled */
     if(typeof kitPcSize==="function"){requestAnimationFrame(()=>{try{kitPcSize()}catch(e){}});setTimeout(()=>{try{kitPcSize()}catch(e){}},150)}}}catch(e){console.error(e)}
   return out};
  window.render=render},0)})();

/* ---------- swipe the page to turn it (like the week book and the owner's binder app): on #panel a quick horizontal swipe = the next /
   previous tab in the tab bar (left swipe → forward, the sheet swings over the spine; right swipe → back). Not on the map, not in a
   dialog, not when the swipe starts in something that scrolls sideways (person strip, chips) or in a form control. ---------- */
(function(){let sw=null;
 const sideScroll=t=>{for(let e=t;e&&e.id!=="panel"&&e!==document.body;e=e.parentElement){if(e.scrollWidth>e.clientWidth+4){const ox=getComputedStyle(e).overflowX;if(ox==="auto"||ox==="scroll")return true}}return false};
 const down=(t,x,y)=>{sw=null;if(!(t&&t.closest))return;
  if(!t.closest("#panel")||t.closest("input,textarea,select,canvas,[data-noswipe],.kgl,.mapv")||document.querySelector(".game.maptab"))return;
  const m=document.getElementById("modal");if(m&&!m.hidden)return;if(sideScroll(t))return;sw={x,y,t:performance.now()}};
 const up=(x,y)=>{const s=sw;sw=null;if(!s)return;const dx=x-s.x,dy=y-s.y,dt=performance.now()-s.t;
  if(Math.abs(dx)<64||Math.abs(dx)<Math.abs(dy)*1.8||dt>900)return;
  const B=[...document.querySelectorAll("#tabs [data-tab]")].filter(b=>b.offsetParent&&!b.disabled);const cur=B.findIndex(b=>typeof tab!=="undefined"&&b.dataset.tab===tab);if(cur<0)return;
  const nb=B[cur+(dx<0?1:-1)];if(!nb)return;nb.click();
  /* the swipe was a page turn, not a tap: swallow a click that may follow on the panel */
  const kill=ev=>{ev.stopPropagation();ev.preventDefault()};document.addEventListener("click",kill,{capture:true,once:true});setTimeout(()=>document.removeEventListener("click",kill,{capture:true}),350)};
 /* touch: touch events (a pointer stream is cancelled once the browser starts panning); mouse / pen: pointer events */
 document.addEventListener("touchstart",e=>{if(e.touches.length!==1){sw=null;return}const q=e.touches[0];down(e.target,q.clientX,q.clientY)},{passive:true,capture:true});
 document.addEventListener("touchend",e=>{const q=e.changedTouches[0];if(q)up(q.clientX,q.clientY)},{passive:true,capture:true});
 document.addEventListener("touchcancel",()=>{sw=null},{passive:true,capture:true});
 document.addEventListener("pointerdown",e=>{if(e.pointerType==="touch")return;if(e.button>0||!e.isPrimary){sw=null;return}down(e.target,e.clientX,e.clientY)},{passive:true,capture:true});
 document.addEventListener("pointerup",e=>{if(e.pointerType==="touch")return;up(e.clientX,e.clientY)},{passive:true,capture:true})})();
