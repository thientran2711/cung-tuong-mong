/* ================= jflip: LẬT THẺ BÀI — the end-of-day card-flip scene (KIT §67 card-flip, owner 15/11 20:50Z, review/cardflip) =================
   Replaces j93 piece 1 (kitFlipTablet / kitFlipNote) with ONE scene played each week after the tablet is decided (flip(), j8 → j75 → j93):
     1. painted plate cf-plate-ksp (Kính sự phòng, lamplight, an empty lacquer tray); every eligible woman's card = her OWN kit frame
        (mdH → pcPort cell: frame + portrait + jade pendant + tassel; j61 knowledge: unknown → grey silhouette, name "???"), all lit;
     2. the cards that cannot serve tonight (j75 nightCh = 0: illness, pregnancy, confinement, a hidden tablet …; monthly cycle when
        review/cycle's inCycle(p) / cycleDaysOf(p,month) exists) turn grey and are lifted out of the tray; the rest re-arrange neatly;
     3. "carried to the Emperor": the plate cross-fades to cf-plate-emp (same tray, same place, on his desk) while the whole picture drifts,
        so the cards never leave their slots (painted crossfade; no video);
     4. his painted hand (cf-hand-emp, yellow dragon sleeve, no face) reaches in; the card he turned lifts, glows and grows to the centre,
        the others dim;
     5. her card AND the night is hers: gold light + petals + chime + painted seal "THỊ TẨM" + "Đêm nay ngươi được thị tẩm."
   The scene only SHOWS the result already decided by j75 (S.nightWhy: pick, flip0 = the card he turned, cause custom/stolen); it never
   changes it. Tap = jump to the final still, second tap = close. Reduced motion / Cảnh động off = the final still only.
   Co-op: the friend's card is on the tray too (read-only); the scene waits until the merged week is back (COOPW.pend false) so both
   players see their scene at the same moment; each player sees cards by HER OWN knowledge.
   Kit pieces used: kmPush queue + .kmov / .kmcap / .kmres / .kmhint (j93), mdH frame cell (j60/jk2b), kitName knowledge (j61),
   kitFxLight / kitFxBurst / kitFxSprite (KIT §68 painted-fx, review/fxkit — guarded; fallback: painted mo-petal-peach + filter glow).
   No save state (old saves load unchanged). */
Object.assign(BAL,{cardFlip:{
 /* beat timings in ms (her night); others' nights run at `other` speed (×) */
 /* the turn of HIS card (owner 16/11: "too fast", calm): turn.lift = the card rises off the tray, turn.move = it glides to the centre (lift+move = the flip,
    ~1.15 s, soft ease-in-out), turn.pause = the face rests on its own before the reveal words / seal / burst. centre, res, end are DERIVED from these
    (t.centre = lift2 + turn.lift; t.res = centre + turn.move + turn.pause; t.end = res + turn.tail): change the numbers here only. */
 turn:{lift:700,move:1300,pause:1100,tail:4200,ease:"cubic-bezier(.45,0,.55,1)"},
 slow:BAL.pace,  /* = the ONE kit pace (BAL.pace, KIT §83; owner 16/11 "vẫn còn nhanh quá"): every hard-coded motion below × slow; t / turn / hold are already the slowed numbers */
 t:{in:1100,grey:1600,lift:2500,arrange:3500,carry:4600,hand:6200,lift2:7600,centre:0,res:0,end:0},other:.82,
 hold:{me:5200},  /* only the fallback when the kit button part is missing */
 /* the reveal light = the WHOLE frame glows (owner 16/11 12:00Z: "nguyên cái khung nó phát sáng lên", never a light that runs round the ring): one soft warm halo hugging the frame ring
    (path = the frame ring's rectangle, fractions of the card), breathing slowly (opacity only, `breath` ms per cycle); nothing is drawn over the portrait window. */
 edge:{path:{x0:.085,y0:.178,x1:.915,y1:.722},rad:.03,blur:.08,spread:.02,op:1,lo:.7,breath:3600},
 /* two plate pairs (owner 21:45Z: landscape AND portrait screens): l = 1600x1200 (4:3), p = 1200x1600 (3:4). Per picture: the tray floor
    (yellow silk, measured from the pixels) and the tray's outer rim (the safe zone that must stay on screen); the plate box is fitted to the
    rim and the card slots are computed from the same box, so cards sit on the floor at every aspect. A ≠ B floor → the cards glide to B's. */
 plates:{l:{ar:4/3,a:"cf-gplate-ksp",b:"cf-gplate-emp",fa:{x0:.125,y0:.235,x1:.875,y1:.700},fb:{x0:.125,y0:.235,x1:.875,y1:.700},rim:{x0:.055,y0:.150,x1:.945,y1:.790}},
         p:{ar:3/4,a:"cf-gplate-ksp-p",b:"cf-gplate-emp-p",fa:{x0:.105,y0:.272,x1:.890,y1:.695},fb:{x0:.105,y0:.300,x1:.892,y1:.655},rim:{x0:.02,y0:.21,x1:.98,y1:.75}}},
 portraitBelow:.95, /* screen w/h below this uses the portrait pair */
 /* the Emperor's hand (kit part kitEmpHand; owner 16/11 17:40Z: bigger, a whole hand + sleeve reaching in from the screen edge, never cut, never pasted on).
    px,py = pinch point (fraction of the sprite); rot = degrees the sprite is turned so the sleeve runs straight up out of the screen; sleeve = the two sprite edges that
    carry the sleeve (left edge rows 0..cutL, top edge columns 0..cutT, measured from the pixels): they must lie ABOVE the screen top, so the sprite height is at least
    pinchY / room (room = how much of the sprite height lies above the pinch point at the lowest cut edge after the turn, ~.62). h = minimum height in card heights,
    minH / maxH = fractions of the screen height. reach / press / leave = the ease-in, the touch-down dip (fraction of a card height) and the retreat. */
 hand:{px:.70,py:.905,rot:32,cutL:.43,cutT:.43,room:.58,h:3.6,minH:.40,maxH:.86,reach:.7,press:.06,lift:.10,leave:.8,shadow:{dx:.11,dy:.075,blur:.022,op:.4,hi:2.1}},
 skipNoPick:false}});
(function(){
const CF=BAL.cardFlip;{const t=CF.t,u=CF.turn;t.centre=t.lift2+u.lift;t.res=t.centre+u.move+u.pause;t.end=t.res+u.tail}const DIR="img/kit/";const AR=550/1037;
const PL=()=>CF.plates[kitView().pages===1?"p":"l"];
const ART={get a(){return DIR+PL().a+".webp"},get b(){return DIR+PL().b+".webp"},hand:DIR+"cf-hand-emp.webp",seal:DIR+"cf-seal-thitam.webp",petal:DIR+"mo-petal-peach.webp"};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const red=()=>{try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
function snd(n,at){const go=()=>{try{if(window.__bot)return;if(typeof sfx==="function")sfx(n)}catch(e){}};if(at)setTimeout(go,at);else go()}
/* load AND decode before the scene starts (img.decode(): the bitmap is ready, nothing is decoded mid-flip); the Image is kept so the decoded bitmap stays cached */
const PRE={},KEEP=[];function preload(src){if(PRE[src])return PRE[src];const im=new Image();KEEP.push(im);PRE[src]=new Promise(r=>{let d=0;const done=()=>{if(!d){d=1;r()}};setTimeout(done,2500);im.onerror=done;im.onload=()=>{try{im.decode().then(done,done)}catch(e){done()}}});im.src=src;return PRE[src]}
/* ---------- KIT PART kitEmpHand (KIT §67b): the Emperor's hand ----------
   ONE part for every place his hand appears (today only this scene). The painted sleeve + hand (cf-hand-emp) is sized from the SCREEN, never from the card alone, turned so the
   forearm runs straight up, and placed so the sprite's two cut edges (where the sleeve leaves the picture) lie above the top of the screen: it always comes IN FROM THE SCREEN EDGE
   as a whole arm, never a cut-off picture floating on the scene. Two layers, both transform-only: the hand and a soft blurred shadow (the hand's own silhouette) that lies on the
   tray, far off while the hand is high and tucked under it when it touches. No fade-in: the arm slides in along its own axis (ease-out), dips a hair to touch the card, lifts WITH it by
   the same pixels, and leaves the way it came (ease-in). `hand` = the .kcf-hand wrapper (fixed, holds .kcf-hs shadow + .kcf-hi hand); `tel` = the card; opt.still = no motion. */
function kitEmpHand(hand,tel,opt){opt=opt||{};const H=CF.hand,SH=H.shadow,hi=hand.querySelector(".kcf-hi"),hs=hand.querySelector(".kcf-hs");let g=null,cur=null;
 const A2=(el,kf,op)=>{try{return el.animate(kf,Object.assign({fill:"forwards"},op))}catch(e){return null}};
 const aspect=()=>(hi.naturalWidth&&hi.naturalHeight)?hi.naturalWidth/hi.naturalHeight:306/480;
 function place(){const r=tel.getBoundingClientRect(),vh=innerHeight,ar=aspect();const px=r.left+r.width*.5,py=r.top+r.height*.12;
  const th=H.rot*Math.PI/180,c=Math.cos(th),sn=Math.sin(th);
  /* lowest cut-edge point after the turn: left edge (0,cutL) and top edge (cutT,0), measured from the pinch point, in sprite-height units */
  const rel=(u,v)=>{const x=(u-H.px)*ar,y=v-H.py;return{x:x*c-y*sn,y:x*sn+y*c}};
  const up=Math.min(-rel(0,H.cutL).y,-rel(H.cutT,0).y,-rel(0,0).y);   /* how far above the pinch the lowest cut point sits, per sprite height */
  let hh=Math.max(r.height*H.h,vh*H.minH,py/Math.min(H.room,up*.97));hh=Math.min(hh,vh*H.maxH);
  /* if the height cap stops the arm leaving the screen, tuck the pinch point no lower than the cap allows (the hand is as big as the screen lets it be) */
  const hw=hh*ar;g={px,py,hh,hw,r,reach:py+hh*.42};
  Object.assign(hand.style,{left:(px-hw*H.px)+"px",top:(py-hh*H.py)+"px",width:hw+"px",height:hh+"px"});
  for(const im of [hi,hs]){im.style.transformOrigin=`${H.px*100}% ${H.py*100}%`;im.style.transform=`rotate(${H.rot}deg)`}
  hs.style.filter=`brightness(0) blur(${(hh*SH.blur).toFixed(1)}px)`;hs.style.opacity=SH.op;
  return g}
 return{
  reach(ms){place();hand.classList.add("on");const k=g;if(opt.still)return;const d=Math.round(k.reach),pr=k.r.height*H.press,e="cubic-bezier(.2,.75,.25,1)";
   /* one move: slide in along the arm (ease-out) to the card, then the touch-down dip, and rest there until the card is picked */
   cur=A2(hand,[{transform:`translate(${-k.hh*.05}px,${-d}px)`,easing:e},{transform:"none",offset:H.reach},{transform:`translateY(${pr}px)`}],{duration:ms,easing:"ease-in-out"});
   const sh=(m,o)=>`translate(${k.hh*SH.dx*m}px,${k.hh*SH.dy*m}px) rotate(${H.rot}deg)`;
   A2(hs,[{transform:sh(SH.hi),opacity:SH.op*.5,easing:e},{transform:sh(1),opacity:SH.op,offset:H.reach},{transform:sh(.8)}],{duration:ms,easing:"ease-in-out"})},
  lift(ms,ease){if(!g||opt.still)return;const pr=g.r.height*H.press,up=g.r.height*(H.press-H.lift);A2(hand,[{transform:`translateY(${pr}px)`},{transform:`translateY(${up}px)`}],{duration:ms,easing:ease});
   A2(hs,[{transform:`translate(${g.hh*SH.dx*.8}px,${g.hh*SH.dy*.8}px) rotate(${H.rot}deg)`},{transform:`translate(${g.hh*SH.dx*1.35}px,${g.hh*SH.dy*1.35}px) rotate(${H.rot}deg)`}],{duration:ms,easing:ease})},
  leave(ms){if(!g||opt.still){hand.classList.remove("on");return}const y=g.r.height*(H.press-H.lift),d=Math.round(g.reach+g.hh*.1);
   A2(hand,[{transform:`translateY(${y}px)`},{transform:`translate(${-g.hh*.05}px,${-d}px)`}],{duration:ms,easing:"cubic-bezier(.5,0,.8,.5)"})}}}
window.kitEmpHand=kitEmpHand;
function byId(id){if(id==="me")return S;return (typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===id)||null}
function rk(p){try{return p===S?S.rank:rkOf(p)}catch(e){return p&&p.rank||0}}
function cycleOf(p){try{if(typeof inCycle==="function")return !!inCycle(p);if(typeof cycleDaysOf==="function"){const d=cycleDaysOf(p,S.month);return Array.isArray(d)&&d.includes(S.tuan)}}catch(e){}return false}
function known(p){try{return typeof kitKnownName==="function"?kitKnownName(p):true}catch(e){return true}}
function rankName(p){const r=rk(p);return r>=7?"Hoàng hậu":(RANKS[Math.max(0,r)]||{}).n||""}
function nameOf(p){return p===S?S.name:known(p)?p.name||"":"???"}
function tagOf(p,w){try{const r=rk(p),col=typeof kitRankCol==='function'?kitRankCol(r):'#7a5530',rn=rankName(p),nm=nameOf(p),me=p===S;
  return `<div class="kcf-tag">${kitNameRank(esc(rn),esc(nm),col,me,w<112)}</div><div class="kcf-tag kcf-tag-l">${kitNameRank(esc(rn),esc(nm),col,me,false)}</div>`}catch(e){return""}}
function face(p){try{return mdH(p===S?pMe():pv(p),"big")}catch(e){return""}}

/* ---------- the deck: what SHE sees tonight (j75 S.nightWhy rows; + the co-op friend) ---------- */
function deckOf(d){const rows=(d&&d.rows)||[];const L=[];
 for(const r of rows){const p=byId(r.id);if(!p)continue;if(p!==S&&(!p.alive||p.out))continue;L.push({id:r.id,p,bar:!(r.w>0)||cycleOf(p),coop:!!p.coop})}
 try{const f=(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.coop&&v.alive&&!v.out);if(f&&!L.some(x=>x.p===f)){let w=0;try{w=nightCh(f)}catch(e){}L.push({id:f.id,p:f,bar:!(w>0)||cycleOf(f),coop:true})}}catch(e){}
 L.sort((a,b)=>rk(b.p)-rk(a.p));return L}

/* ---------- layout: n cards in the tray floor (px), the biggest card that fits in r rows ---------- */
const TAGH=30;  /* px under every card for the kit name tag (rank over name, KIT §48): the slot = card + tag */
const TAGW=98;  /* px a name tag needs across: a column is never narrower, so two names never overlap (the kit small tag: rank .66rem over name .72rem) */
function grid(n,W,H){let best=null,fb=null;for(let r=1;r<=Math.max(1,Math.min(6,n));r++){const c=Math.ceil(n/r);const g=Math.max(4,W*.018);const pitch=W/c;
  const cw=Math.min(pitch-g,((H-g*(r+1))/r-TAGH)*AR*.98);const cand={r,c,cw,g,pitch};
  if(pitch>=TAGW&&(!best||cw>best.cw))best=cand;if(!fb||pitch>fb.pitch)fb=cand}
 const {r,c,cw,g,pitch}=best||fb;const ch=cw/AR+TAGH;const P=[];const top=(H-(r*ch+(r-1)*g))/2;
 for(let i=0;i<n;i++){const row=Math.floor(i/c),inRow=row<r-1?c:n-c*(r-1),col=i-row*c;P.push({x:(W-inRow*pitch)/2+col*pitch+(pitch-cw)/2,y:top+row*(ch+g),w:cw,h:ch})}
 return P}
/* the plate box: the tray rim fits the screen (picture may run past the screen edge; its edge fades into the dark) */
function plateBox(){const vw=innerWidth,vh=innerHeight;const P=PL(),R=P.rim;const top=Math.min(64,vh*.12),bot=Math.min(56,vh*.1);
 const s=Math.min(vw*.98/(R.x1-R.x0),(vh-top-bot)/(R.y1-R.y0)*P.ar);const W=s,H=s/P.ar;
 const cx=vw/2,cy=top+(vh-top-bot)/2;const x=cx-W*((R.x0+R.x1)/2),y=cy-H*((R.y0+R.y1)/2);return{x,y,W,H}}

/* ---------- the scene ---------- */
function kitCardFlip(o){o=o||{};const deck=o.deck||[];if(!deck.length)return;
 const me=o.pick==="me"&&o.turned==="me";const sp=me?1:CF.other;const SL=CF.slow||1;const T={};for(const k in CF.t)T[k]=CF.t[k]*sp;const still=red();
 const ov=document.createElement("div");ov.className="kmov kcf"+(still?" km-red":" kcf-act");ov.setAttribute("role","dialog");ov.setAttribute("aria-label","Lật thẻ bài");ov.style.setProperty("--kcf-s",SL);ov.__t0=performance.now();
 const B=plateBox();const P=PL();let F=P.fa;let fx=B.W*F.x0,fy=B.H*F.y0,FW=B.W*(F.x1-F.x0),FH=B.H*(F.y1-F.y0);
 const toB=()=>{F=P.fb;fx=B.W*F.x0;fy=B.H*F.y0;FW=B.W*(F.x1-F.x0);FH=B.H*(F.y1-F.y0);after=grid(Math.max(1,keep.length),FW,FH);keep.forEach((c,i)=>keepPos.set(c,after[i]))};
 const all=grid(deck.length,FW,FH);const keep=deck.filter(c=>!c.bar);let after=grid(Math.max(1,keep.length),FW,FH);
 const cards=deck.map((c,i)=>{const p=all[i];const lab=`${esc(rankName(c.p))} ${esc(nameOf(c.p))}`;
  return `<div class="kcf-c${c.bar?" kcf-bar":""}${c.p===S?" kcf-me":""}" data-i="${i}" style="left:${(fx+p.x).toFixed(1)}px;top:${(fy+p.y).toFixed(1)}px;width:${p.w.toFixed(1)}px;--d:${(i*45)}ms" title="${lab}" aria-label="${lab}"><i class="kcf-cs"></i><div class="kcf-f">${face(c.p)}${c.p===S?`<i class="kcf-mine"></i>`:""}</div>${tagOf(c.p,p.w)}</div>`}).join("");
 ov.innerHTML=`<div class="kcf-w" style="left:${B.x.toFixed(1)}px;top:${B.y.toFixed(1)}px;width:${B.W.toFixed(1)}px;height:${B.H.toFixed(1)}px">
  <img class="kcf-pl kcf-a" src="${ART.a}" alt="" draggable="false"><img class="kcf-pl kcf-b" src="${ART.b}" alt="" draggable="false">
  <div class="kcf-cards">${cards}</div><div class="kcf-lamp"></div><div class="kcf-vig"></div></div>
  <div class="kcf-hand"><img class="kcf-hs" src="${ART.hand}" alt="" draggable="false"><img class="kcf-hi" src="${ART.hand}" alt="" draggable="false"></div>
  <div class="kmcap kcf-cap">Kính sự phòng dâng thẻ bài</div><div class="kcf-res"></div><div class="kmhint">Chạm để bỏ qua</div>`;
 document.body.appendChild(ov);
 const W=ov.querySelector(".kcf-w"),cap=ov.querySelector(".kcf-cap"),res=ov.querySelector(".kcf-res"),hand=ov.querySelector(".kcf-hand");
 const els=[...ov.querySelectorAll(".kcf-c")];const ti=deck.findIndex(c=>c.id===o.turned);const tel=ti>=0?els[ti]:null;
 let phase=0;const Q=[];const later=(ms,f)=>{Q.push(setTimeout(()=>{try{f()}catch(e){console.error(e)}},ms))};
 const A=(el,kf,op)=>{try{return el.animate(kf,Object.assign({fill:"forwards",easing:"cubic-bezier(.2,.7,.3,1)"},op))}catch(e){return null}};
 const keepPos=new Map();keep.forEach((c,i)=>keepPos.set(c,after[i]));
 const place=(el,p)=>{el.style.left=(fx+p.x).toFixed(1)+"px";el.style.top=(fy+p.y).toFixed(1)+"px";el.style.width=p.w.toFixed(1)+"px"};
 /* FLIP a group of cards to their new slots: ALL reads first, ALL writes, then ALL reads again (one layout, not one per card); only transform animates */
 const glide=(items,dur,ease)=>{const r0=items.map(([el])=>el.getBoundingClientRect());items.forEach(([el,p])=>place(el,p));const r1=items.map(([el])=>el.getBoundingClientRect());
  items.forEach(([el],k)=>{const a=r0[k],b=r1[k];if(Math.abs(a.left-b.left)+Math.abs(a.top-b.top)+Math.abs(a.width-b.width)<1)return;
   A(el,[{transform:`translate(${a.left-b.left}px,${a.top-b.top}px) scale(${a.width/b.width})`,transformOrigin:"0 0"},{transform:"none",transformOrigin:"0 0"}],{duration:dur,easing:ease||"cubic-bezier(.4,0,.2,1)"})})};
 let liftA=null;
 /* the final still (also the reduced-motion picture and the target of a skip) */
 
 /* phone landscape: the card stands left of centre, the result chip on the right (never over the card) */
 const centreRect=()=>{const vh=innerHeight,vw=innerWidth;
  const h=Math.min(vh*.6,vw*.42/AR,560);return{w:h*AR,h,x:vw/2-h*AR/2,y:Math.max(8,vh*.43-h/2)}};
 function final(src){ov.dataset.fin=typeof src==="string"?src:"auto";phase=1;Q.forEach(clearTimeout);Q.length=0;ov.classList.add("kcf-fin");
  ov.getAnimations({subtree:true}).forEach(a=>{try{a.cancel()}catch(e){}});ov.classList.remove("kcf-act");
  const hl=ov.querySelector(".kcf-halo.kcf-breath");if(hl){hl.classList.remove("kcf-breath");void hl.offsetWidth;hl.classList.add("kcf-breath")}   /* the cancel above must not stop the frame's slow breathing */
  W.classList.add("kcf-on-b");toB();deck.forEach((c,i)=>{const el=els[i];if(c.bar){el.classList.add("kcf-gone")}else place(el,keepPos.get(c))});
  hand.classList.remove("on");
  if(tel){const r=centreRect();tel.classList.add("kcf-pick");Object.assign(tel.style,{left:(r.x-B.x)+"px",top:(r.y-B.y)+"px",width:r.w+"px"});ov.classList.add("kcf-dim")}
  showRes(true);kitSceneEnd(ov,me?"Chuẩn bị thị tẩm":"Ta biết rồi",close)}  /* KIT 81: no auto-close; ONE kit button ends the scene */
 function close(){if(phase===2)return;phase=2;Q.forEach(clearTimeout);ov.classList.remove("kcf-act");ov.classList.add("km-out");edgeH.forEach(h=>{try{h&&h.stop&&h.stop(200)}catch(e){}});edgeH.length=0;setTimeout(()=>ov.remove(),260);try{o.onEnd&&o.onEnd()}catch(e){console.error(e)}}
 ov.addEventListener("click",e=>{e.stopPropagation();if(phase===0)final("tap")});   /* a tap while it plays = the final still; closing is only the kit button */
 let shown=false;const edgeH=[];
 /* the reveal light (owner 16/11): painted gold glows (KIT §68 glowburst) run ALONG the picked card's frame ring and never over the portrait window.
    The card is at rest in the centre when this starts. Gọn / reduced motion: the same glows stand still on the ring (no animation). */
 function edgeLight(){if(!tel)return;const E=CF.edge,P=E.path,r=tel.getBoundingClientRect();if(!r.width)return;
  const h=document.createElement("div");h.className="kcf-halo";if(!still)h.classList.add("kcf-breath");
  Object.assign(h.style,{left:(r.left+r.width*P.x0)+"px",top:(r.top+r.height*P.y0)+"px",width:(r.width*(P.x1-P.x0))+"px",height:(r.height*(P.y1-P.y0))+"px",borderRadius:(r.width*E.rad)+"px"});
  for(const [k,v] of [["--hb",(r.width*E.blur).toFixed(1)+"px"],["--hs",(r.width*E.spread).toFixed(1)+"px"],["--ho",E.op],["--hl",E.lo],["--hd",(E.breath*SL)+"ms"]])h.style.setProperty(k,v);
  ov.appendChild(h);edgeH.push({stop(){try{h.remove()}catch(e){}}})}
 /* KIT §67 (s22 kit request: Fold row labels under the raised card, iPad a faded label through the result chip): the picked card is big and
    its lower part (tassel + its own tag) is open — hide the tag of EVERY other card that the picked card's box (its final centre rect) or the
    result chip would cross; the named pick is in the chip, the hidden cards are under the big one. Runs with the chip shown (final rects). */
 function coverTags(){if(!tel)return;try{const c=centreRect(),P={left:c.x,top:c.y,right:c.x+c.w,bottom:c.y+c.h};const k=res.querySelector(".kmres"),RR=k&&res.classList.contains("on")?k.getBoundingClientRect():null;
  const hit=(b,r)=>!!r&&b.right>r.left-4&&b.left<r.right+4&&b.bottom>r.top-4&&b.top<r.bottom+4;
  ov.querySelectorAll(".kcf-c:not(.kcf-pick) .kcf-tag:not(.kcf-tag-l)").forEach(t=>{t.style.visibility="";const b=t.getBoundingClientRect();if(b.width&&(hit(b,P)||hit(b,RR)))t.style.visibility="hidden"})}catch(e){}}
 function showRes(now){if(shown)return;shown=true;edgeLight();res.innerHTML=o.resHTML||"";res.classList.add("on");coverTags();setTimeout(coverTags,560*SL);
  if(me){ov.classList.add("kcf-mine");stamp();if(!still)petals();snd("sfx-win");snd("sfx-buoi-bell",now?0:350)}
  cap.textContent=o.cap2||"Hoàng thượng lật thẻ bài"}
 function petals(){try{if(typeof kitFxBurst==="function"){kitFxBurst("petal-peach",null,18);return}}catch(e){}
  let h="";for(let i=0;i<14;i++)h+=`<img class="kcf-pt" src="${ART.petal}" alt="" draggable="false" style="--x:${(i*37+9)%96}%;--d:${((i*.41)%1.8).toFixed(2)}s;--s:${(.55+((i*29)%45)/100).toFixed(2)};--r:${(i*67)%360}deg;--w:${((i%5)-2)*24}px">`;
  const box=document.createElement("div");box.className="kcf-pts";box.innerHTML=h;ov.appendChild(box)}
 /* the seal is stamped on her card (lower right, over the band), not in the caption */
 function stamp(){if(!tel||!me)return;const r=tel.getBoundingClientRect();const s=document.createElement("img");s.className="kcf-seal";s.src=ART.seal;s.alt="Thị tẩm";s.draggable=false;
  const w=Math.max(42,r.width*.36);Object.assign(s.style,{left:(r.left+r.width*.6)+"px",top:(r.top+r.height*.6)+"px",width:w+"px"});ov.appendChild(s)}
 if(still){final("still");return{ov,close}}
 /* 1 · all lit: the cards settle into the tray */
 snd("sfx-tablet-shuffle",150);
 els.forEach((el,i)=>A(el,[{opacity:0,transform:"translateY(-14px) scale(1.04)"},{opacity:1,transform:"none"}],{duration:420*SL,delay:(120+i*Math.min(45,700/els.length))*SL}));
 /* 2 · barred cards grey, lifted out; the rest re-arrange */
 const bars=deck.map((c,i)=>c.bar?els[i]:null).filter(Boolean);
 if(bars.length){later(T.grey,()=>{bars.forEach(el=>el.classList.add("kcf-grey"));cap.textContent="Thẻ bài người không thể hầu giá được rút ra"});
  later(T.lift,()=>{const ys=bars.map(el=>-(B.y+fy+40+el.offsetTop));bars.forEach((el,k)=>A(el,[{transform:"none",opacity:1},{transform:`translateY(${ys[k]}px) scale(.9)`,opacity:0}],{duration:700*SL,delay:k*70*SL,easing:"cubic-bezier(.5,0,.7,.4)"}))});
  later(T.arrange,()=>{const it=[];deck.forEach((c,i)=>{if(c.bar){els[i].classList.add("kcf-gone");return}it.push([els[i],keepPos.get(c)])});glide(it,650*SL)})}
 else later(T.arrange,()=>{deck.forEach((c,i)=>place(els[i],keepPos.get(c)))});
 /* 3 · carried to the Emperor: plate A → plate B under a slow drift; the cards stay in their slots */
 later(T.carry,()=>{cap.textContent="Thẻ bài được dâng lên Hoàng thượng";W.classList.add("kcf-on-b");toB();
  glide(deck.map((c,i)=>c.bar?null:[els[i],keepPos.get(c)]).filter(Boolean),1000*SL,"cubic-bezier(.45,0,.55,1)");
  W.style.willChange="transform";setTimeout(()=>{W.style.willChange=""},1200*SL);
  A(W,[{transform:"none"},{transform:"translateX(-4%) scale(1.03)",offset:.45},{transform:"none"}],{duration:1050*SL,easing:"ease-in-out",fill:"none"});snd("sfx-step",120)});
 /* 4 · his hand reaches in; the card lifts, glows and grows to the centre */
 if(!tel){later(T.hand,()=>showRes());later(T.hand+600,final);return{ov,close}}
 const eh=kitEmpHand(hand,tel,{still,time:sp*SL});
 later(T.hand,()=>eh.reach(T.lift2-T.hand));
 later(T.lift2,()=>{snd("sfx-tablet-flip");tel.classList.add("kcf-pick");ov.classList.add("kcf-dim");
  liftA=A(tel,[{transform:"none"},{transform:`translateY(${-CF.hand.lift*100}%) scale(1.08)`}],{duration:CF.turn.lift*sp,easing:CF.turn.ease});eh.lift(CF.turn.lift*sp,CF.turn.ease)});
 later(T.centre,()=>{const r0=tel.getBoundingClientRect();const c=centreRect();
  eh.leave(CF.turn.move*sp*CF.hand.leave);
  if(liftA){try{liftA.cancel()}catch(e){}liftA=null}
  Object.assign(tel.style,{left:(c.x-B.x)+"px",top:(c.y-B.y)+"px",width:c.w+"px"});const r1=tel.getBoundingClientRect();
  A(tel,[{transform:`translate(${r0.left-r1.left}px,${r0.top-r1.top}px) scale(${r0.width/r1.width})`,transformOrigin:"0 0"},{transform:"none",transformOrigin:"0 0"}],{duration:CF.turn.move*sp,easing:CF.turn.ease})});
  /* the gold glow waits for the face to rest (it starts with the reveal, showRes) */
 later(T.res,()=>showRes());later(T.end+(me?0:-600),final);
 return{ov,close,final}}

/* ---------- the result line (VANPHONG: thẻ bài, thị tẩm; names by HER knowledge) ---------- */
function resHTML(o,d){const tp=o.turned?byId(o.turned):null,fp=o.pick?byId(o.pick):null;let txt="";try{const w=typeof nightWhy==="function"?nightWhy():null;txt=w&&w.text||""}catch(e){}
 const chip=(p,b,s)=>`<div class="kmres">${p?face(p):""}<div><b>${b}</b>${s?`<small>${s}</small>`:""}</div></div>`;
 if(!tp)return chip(null,"Đêm nay Hoàng thượng không lật thẻ bài nào.","");
 const tn=`${esc(rankName(tp))} ${esc(nameOf(tp))}`;
 if(o.pick==="me"&&o.turned==="me")return `${chip(S,"Đêm nay ngươi được thị tẩm.","Thẻ bài của ngươi được lật.")}`;
 if(o.turned===o.pick)return chip(tp,`Tối nay: ${tn}`,"được chọn hầu đêm nay.");
 /* he turned one card, the night went elsewhere (custom: the Empress on mùng một / rằm; stolen on the way) */
 const why=d.cause==="custom"?esc(txt):"Giữa đường, Hoàng thượng bị mời sang cung khác.";
 const fin=fp?(fp===S?"Đêm nay ngươi được thị tẩm.":`Đêm nay: ${esc(rankName(fp))} ${esc(nameOf(fp))}`):"";
 return chip(tp,o.turned==="me"?"Thẻ bài của ngươi được lật":`Hoàng thượng lật thẻ ${tn}`,`${why}${fin?" "+fin:""}`)}

/* ---------- wiring: the week's flip (outermost wrapper; j93 piece 1 is retired while this runs) ---------- */
let inFlip=false,stoleFrom=null;
/* life token + the scene on screen: a new life / loaded slot / title (j93 kmReset) voids every waiting go() and closes the scene (review/flip-newlife) */
let life=0,cur=null;
try{if(typeof kmOnReset==="function")kmOnReset(()=>{life++;try{cur&&cur.close&&cur.close()}catch(e){}cur=null})}catch(e){}
if(typeof stealNight==="function"){const s0=stealNight;stealNight=function(v,t){if(inFlip&&stoleFrom==null&&t)stoleFrom=t===S?"me":t.id;return s0.apply(this,arguments)}}
if(typeof kitFlipTablet==="function"){const a0=kitFlipTablet;kitFlipTablet=function(){if(inFlip)return;return a0.apply(this,arguments)}}
if(typeof kitFlipNote==="function"){const b0=kitFlipNote;kitFlipNote=function(){if(inFlip)return;return b0.apply(this,arguments)};window.kitFlipNote=kitFlipNote}
function want(){return typeof S!=="undefined"&&S&&!S.dead&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)&&!(typeof isSrv==="function"&&isSrv())&&typeof kmPush==="function"}
function cfPlan(){const d=S.nightWhy;if(!d||(typeof wk==="function"&&d.wk!==wk()))return null;
 const was=S.tonight;const pick=d.pick||null;const turned=stoleFrom||d.flip0||pick;
 if(!turned&&CF.skipNoPick)return null;return{wk:d.wk,pick,turned,cause:d.cause}}
/* the week panel / Tuần lục book (#dawn, j87 .kbk) or the title cover the screen: the tablet comes after them */
function busy(){if(typeof NLP!=="undefined"&&NLP)return true;/* the Luân hồi identity card is open: the palace scene waits until she has accepted it (j52 NLP) */
 const d=document.getElementById("dawn");if(d&&!d.hidden&&(d.classList.contains("on")||d.classList.contains("kbkdawn")))return true;
 if([...document.querySelectorAll(".kbk")].some(e=>e.offsetParent||e.getClientRects().length))return true;const ti=document.getElementById("title");return !!(ti&&!ti.hidden)}
const DBG=window.__cfdbg=[];const dbg=x=>{DBG.push(x);if(DBG.length>30)DBG.shift()};
function cfPlay(plan){dbg('push '+plan.wk);const gen=life;kmPush(done=>{dbg('run');const go=()=>{try{
   if(gen!==life){dbg('life');done();return}
   const cw=window.COOPW;if((cw&&cw.on&&cw.pend)||busy()){setTimeout(go,300);return}   /* co-op: wait for the merged week, both players see it together */
   if(!S||S.dead||(S.nightWhy&&S.nightWhy.wk!==plan.wk)){dbg('stale');done();return}
   const deck=deckOf(S.nightWhy);if(!deck.length){dbg('nodeck');done();return}dbg('play '+deck.length);
   Promise.all([ART.a,ART.b,ART.hand,ART.seal].map(preload)).then(()=>{try{if(gen!==life){done();return}const sc=kitCardFlip({deck,pick:plan.pick,turned:plan.turned,resHTML:resHTML(plan,plan),onEnd:()=>{if(cur===sc)cur=null;done()}});cur=sc||null;window.cfLast=plan}catch(e){console.error(e);done()}})}catch(e){console.error(e);done()}};go()})}
if(typeof flip==="function"){const f0=flip;flip=function(){inFlip=true;stoleFrom=null;let r;try{r=f0.apply(this,arguments)}finally{inFlip=false}
 try{if(want()){const plan=cfPlan();if(plan)cfPlay(plan)}}catch(e){console.error(e)}return r}}
setTimeout(function warm(){try{if(typeof S==="undefined"||!S){setTimeout(warm,7000);return}[ART.a,ART.b,ART.hand,ART.seal].forEach(preload)}catch(e){}},12000);
window.kitCardFlip=kitCardFlip;window.cfDeckOf=deckOf;window.cfGrid=grid;
/* demo (kit page / tests): n cards from the live court, k of them barred; who = "me" | index | null */
window.cfDemo=function(n,k,who){const L=[S].concat(typeof rivals!=="undefined"?rivals.filter(v=>v.alive&&!v.out):[]);const deck=[];n=Math.min(n,L.length);/* one card per person, never a duplicate or a fake extra */for(let i=0;i<n;i++){const p=L[i];deck.push({id:i===0?"me":"x"+i,p,bar:i>0&&i<=k})}
 const tid=who==="me"?"me":who==null?null:"x"+who;if(tid&&tid!=="me")deck.forEach(c=>{if(c.id===tid)c.bar=false});
 const plan={pick:tid,turned:tid,cause:"tablet"};const tp=tid==="me"?S:tid?deck.find(c=>c.id===tid).p:null;
 const rh=!tp?`<div class="kmres"><div><b>Đêm nay Hoàng thượng không lật thẻ bài nào.</b></div></div>`:tid==="me"?`<div class="kmres">${face(S)}<div><b>Đêm nay ngươi được thị tẩm.</b><small>Thẻ bài của ngươi được lật.</small></div></div>`:`<div class="kmres">${face(tp)}<div><b>Tối nay: ${esc(rankName(tp))} ${esc(nameOf(tp))}</b><small>được chọn hầu đêm nay.</small></div></div>`;
 return Promise.all([ART.a,ART.b,ART.hand,ART.seal].map(preload)).then(()=>kitCardFlip({deck,pick:plan.pick,turned:plan.turned,resHTML:rh}))};

/* ---------- kit sample page (§67) ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§67",title:"kitCardFlip (lật thẻ bài: Kính sự phòng tray → Hoàng thượng)",html:()=>`<div class="kcf-sample"><figure><img src="${ART.a}" alt=""><figcaption>Kính sự phòng</figcaption></figure><figure><img src="${ART.b}" alt=""><figcaption>Án thư Hoàng thượng</figcaption></figure><figure><img src="${ART.hand}" alt=""><figcaption>Tay áo rồng</figcaption></figure><figure><img src="${ART.seal}" alt=""><figcaption>Ấn thị tẩm</figcaption></figure></div><button class="kbtn" type="button" onclick="event.stopPropagation();if(typeof S!=='undefined'&&S)cfDemo(12,3,'me')">Xem lật thẻ</button>`})}catch(e){}

/* ---------- CSS (motion only on painted art: transform / opacity / filter) ---------- */
const st=document.createElement("style");st.id="kcf-css";st.textContent=`
.kmov.kcf{background:#0d0806;overflow:hidden;cursor:pointer;display:block;padding:0}
.kcf-w{position:absolute;transform-origin:50% 50%}
/* the plate's edge fades into the dark: a static overlay (was a mask-image on the moving box = re-masked every frame) */
.kcf-vig{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(ellipse 72% 70% at 50% 47%,transparent 62%,#0d0806 100%)}
/* the painting's lamplight over the cards: one static warm gradient (was two full-plate soft-light blends over the moving cards) */
.kcf-lamp{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse 60% 55% at 50% 38%,#ffc77a2e,transparent 72%)}
.kcf-pl{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;pointer-events:none;user-select:none}
.kcf-pl.kcf-a{animation:kmFade calc(.6s*var(--kcf-s,1)) ease both}
.kcf-pl.kcf-b{opacity:0;transition:opacity calc(1.1s*var(--kcf-s,1)) ease-in-out}
.kcf-on-b .kcf-b{opacity:1}
.kcf-cards{position:absolute;inset:0}
/* every card state uses the SAME filter chain (grayscale sepia saturate brightness drop-shadow) so states interpolate smoothly and stay compositor-friendly */
.kcf-c{container-type:inline-size}
/* name tag under EVERY card (owner 16/11 14:00Z: rank + name, no title): the kit kitNameRank (KIT 48): rank in its jewel rank colour over the name, plain vivid text, no glow (the tray floor is a pale silk surface, = paper rule 48.1h) */
.kcf-tag{position:absolute;left:50%;top:100%;transform:translateX(-50%);width:max-content;max-width:160cqw;margin-top:3px;pointer-events:none;text-align:center}
.kcf-tag.kcf-tag-l,.kcf-pick .kcf-tag{display:none}.kcf-pick .kcf-tag.kcf-tag-l{display:block;top:79%;margin-top:0}   /* the picked card is big: its tag sits right under the frame (over the tassel), never down at the tassel's end where the result chip stands */
/* HER card on the tray (owner 16/11 14:05Z): a soft WHITE glow round the whole frame from the very start, so she knows her card at a glance; static (no running light, no motion), never over the portrait */
/* KIT §67 fix (s22): ONLY the marker <i> on her card — the overlay also carries .kcf-mine (her night) and was shrunk into this box */i.kcf-mine{position:absolute;left:8.5%;top:17.8%;width:83%;height:54.4%;border-radius:3cqw;pointer-events:none;box-shadow:0 0 3cqw .8cqw #ffffffd9,0 0 9cqw 2cqw #ffffff8c,0 0 18cqw 3cqw #ffffff40}
.kcf-pick i.kcf-mine{display:none}
.kcf-c{position:absolute;z-index:2;transition:opacity calc(.45s*var(--kcf-s,1)) ease}
/* the filter chain lives on the picture part only (.kcf-f), so the name tag under the card never gets the card's dark drop-shadow / dimming */
.kcf-f{filter:grayscale(0) sepia(.1) saturate(.96) brightness(.95) drop-shadow(3px 5px 3px #2a0d0480);transition:filter calc(.6s*var(--kcf-s,1)) ease-in-out}
.kcf-act .kcf-c{will-change:transform}.kcf-act .kcf-f{will-change:filter}   /* promoted only while the scene runs (removed at the final still / close) */
.kcf-c span.md.kfc.kfc.kfc.kfc{width:100%!important;display:block}
.kcf-c.kcf-grey>.kcf-f{filter:grayscale(1) sepia(.1) saturate(.96) brightness(.62) drop-shadow(2px 3px 2px #0006)}
.kcf-c.kcf-gone{display:none}
.kcf-dim .kcf-c:not(.kcf-pick)>.kcf-f{filter:grayscale(0) sepia(.2) saturate(.96) brightness(.42) drop-shadow(2px 3px 2px #0006)}
.kcf-c.kcf-pick{z-index:5}.kcf-c.kcf-pick>.kcf-f{filter:grayscale(0) sepia(.1) saturate(.96) brightness(1.08) drop-shadow(3px 5px 3px #2a0d0480)}  /* the reveal light = the whole frame glowing (.kcf-halo, edgeLight, KIT §67), never a running light and never over the portrait */
.kcf-halo{position:fixed;z-index:6;pointer-events:none;border:3px solid #fff0b8f0;box-shadow:0 0 calc(var(--hb)*.45) calc(var(--hs)*.7) #fff6cc,0 0 var(--hb) var(--hs) #ffd877f2,0 0 calc(var(--hb)*2.2) calc(var(--hs)*1.6) #ffb23fb0,0 0 calc(var(--hb)*4) calc(var(--hs)*2) #ff9a2e55;opacity:var(--ho,1)}
.kcf-halo.kcf-breath{animation:kcfBreath var(--hd,3600ms) ease-in-out infinite}
@keyframes kcfBreath{0%,100%{opacity:var(--hl,.62)}50%{opacity:var(--ho,.9)}}
.kcf-hand{position:fixed;z-index:6;display:none;pointer-events:none}
.kcf-hand.on{display:block}
.kcf-hand img{position:absolute;inset:0;width:100%;height:100%;user-select:none;pointer-events:none}
.kcf-hi{filter:sepia(.14) saturate(.96) brightness(.93)}   /* the same warm grade as the tray; no drop-shadow here (the blurred .kcf-hs under it is the shadow) */
.kcf-cs{position:absolute;left:8.5%;top:17.8%;width:83%;height:54.4%;border-radius:3cqw;background:#1a0804;filter:blur(2.4cqw);opacity:0;pointer-events:none;transition:opacity calc(.7s*var(--kcf-s,1)) ease,transform calc(.7s*var(--kcf-s,1)) ease}
.kcf-pick .kcf-cs{opacity:.5;transform:translate(5cqw,9cqw)}   /* the card he lifted throws a soft shadow on the tray that moves away as it rises */
.kcf-act .kcf-hand,.kcf-act .kcf-seal{will-change:transform}
.kcf-cap{position:absolute;left:0;right:0;top:max(10px,env(safe-area-inset-top));text-align:center;z-index:7;padding:0 12px}
.kcf-res{position:absolute;left:0;right:0;bottom:calc(max(14px,env(safe-area-inset-bottom)) + 22px);z-index:7;display:flex;flex-direction:column;align-items:center;gap:8px;padding:0 12px;opacity:0;pointer-events:none}
.kcf-res.on{opacity:1;transition:opacity calc(0.4s*var(--pace,1)) ease}
.kcf.km-endon .kcf-res{bottom:calc(max(14px,env(safe-area-inset-bottom)) + 66px)}   /* the kit scene-end button (KIT §81) sits at the bottom: the result chip stands above it */
.kcf-res .kmres{animation:kmPop calc(0.45s*var(--pace,1)) var(--km-ease,ease) both}
.kcf-seal{position:absolute;z-index:6;height:auto;transform-origin:50% 50%;animation:kcfSeal calc(.5s*var(--kcf-s,1)) cubic-bezier(.3,1.6,.5,1) calc(.15s*var(--kcf-s,1)) both;filter:drop-shadow(0 3px 6px #0008)}
@keyframes kcfSeal{from{transform:scale(2.6) rotate(-8deg);opacity:0}to{transform:scale(1) rotate(-2deg);opacity:1}}
.kcf-pts{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}
.kcf-pt{position:absolute;top:-8%;left:var(--x);width:calc(26px*var(--s));height:auto;opacity:0;animation:kcfFall calc(3.2s*var(--kcf-s,1)) linear var(--d) forwards}
@keyframes kcfFall{0%{opacity:0;transform:translate(0,0) rotate(var(--r))}10%{opacity:.95}100%{opacity:0;transform:translate(var(--w),112vh) rotate(calc(var(--r) + 300deg))}}
.kcf.kcf-fin .kcf-c,.kcf.kcf-fin .kcf-f{transition:none}
.kcf-grey .kcf-tag,.kcf-dim .kcf-c:not(.kcf-pick) .kcf-tag{opacity:.72}
.kcf.km-red *{animation:none!important;transition:none!important}
.kcf.km-red .kcf-res{opacity:1}

.kcf-sample{display:flex;flex-wrap:wrap;gap:8px}.kcf-sample figure{margin:0;width:150px;text-align:center}.kcf-sample img{width:100%;height:96px;object-fit:contain;background:#1a0f0a;border-radius:6px}.kcf-sample figcaption{font-size:.75rem}
`;document.head.appendChild(st);
})();
