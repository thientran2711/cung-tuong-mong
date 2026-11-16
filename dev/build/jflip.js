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
 t:{in:650,grey:900,lift:1450,arrange:2000,carry:2600,hand:3700,lift2:4350,centre:4700,res:5400,end:7800},other:.82,
 hold:{me:3000,other:1700},  /* final still before it closes by itself */
 /* two plate pairs (owner 21:45Z: landscape AND portrait screens): l = 1600x1200 (4:3), p = 1200x1600 (3:4). Per picture: the tray floor
    (yellow silk, measured from the pixels) and the tray's outer rim (the safe zone that must stay on screen); the plate box is fitted to the
    rim and the card slots are computed from the same box, so cards sit on the floor at every aspect. A ≠ B floor → the cards glide to B's. */
 plates:{l:{ar:4/3,a:"cf-plate-ksp",b:"cf-plate-emp",fa:{x0:.177,y0:.252,x1:.821,y1:.691},fb:{x0:.177,y0:.251,x1:.821,y1:.690},rim:{x0:.095,y0:.175,x1:.905,y1:.775}},
         p:{ar:3/4,a:"cf-plate-ksp-p",b:"cf-plate-emp-p",fa:{x0:.126,y0:.322,x1:.872,y1:.639},fb:{x0:.122,y0:.309,x1:.877,y1:.646},rim:{x0:.023,y0:.262,x1:.977,y1:.71}}},
 portraitBelow:.95, /* screen w/h below this uses the portrait pair */
 /* the painted hand: pinch point (fraction of the sprite), sprite height in card heights */
 hand:{px:.70,py:.905,h:2.7},
 skipNoPick:false}});
(function(){
const CF=BAL.cardFlip;const DIR="img/kit/";const AR=550/1037;
const PL=()=>CF.plates[innerWidth/innerHeight<CF.portraitBelow?"p":"l"];
const ART={get a(){return DIR+PL().a+".webp"},get b(){return DIR+PL().b+".webp"},hand:DIR+"cf-hand-emp.webp",seal:DIR+"cf-seal-thitam.webp",petal:DIR+"mo-petal-peach.webp"};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const red=()=>{try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
function snd(n,at){const go=()=>{try{if(window.__bot)return;if(typeof sfx==="function")sfx(n)}catch(e){}};if(at)setTimeout(go,at);else go()}
const PRE={};function preload(src){if(PRE[src])return PRE[src];const im=new Image();PRE[src]=new Promise(r=>{im.onload=im.onerror=()=>r();setTimeout(r,2500)});im.src=src;return PRE[src]}
function byId(id){if(id==="me")return S;return (typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===id)||null}
function rk(p){try{return p===S?S.rank:rkOf(p)}catch(e){return p&&p.rank||0}}
function cycleOf(p){try{if(typeof inCycle==="function")return !!inCycle(p);if(typeof cycleDaysOf==="function"){const d=cycleDaysOf(p,S.month);return Array.isArray(d)&&d.includes(S.tuan)}}catch(e){}return false}
function known(p){try{return typeof kitKnownName==="function"?kitKnownName(p):true}catch(e){return true}}
function rankName(p){const r=rk(p);return r>=7?"Hoàng hậu":(RANKS[Math.max(0,r)]||{}).n||""}
function nameOf(p){return p===S?S.name:known(p)?p.name||"":"???"}
function face(p){try{return mdH(p===S?pMe():pv(p),"big")}catch(e){return""}}

/* ---------- the deck: what SHE sees tonight (j75 S.nightWhy rows; + the co-op friend) ---------- */
function deckOf(d){const rows=(d&&d.rows)||[];const L=[];
 for(const r of rows){const p=byId(r.id);if(!p)continue;if(p!==S&&(!p.alive||p.out))continue;L.push({id:r.id,p,bar:!(r.w>0)||cycleOf(p),coop:!!p.coop})}
 try{const f=(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.coop&&v.alive&&!v.out);if(f&&!L.some(x=>x.p===f)){let w=0;try{w=nightCh(f)}catch(e){}L.push({id:f.id,p:f,bar:!(w>0)||cycleOf(f),coop:true})}}catch(e){}
 L.sort((a,b)=>rk(b.p)-rk(a.p));return L}

/* ---------- layout: n cards in the tray floor (px), the biggest card that fits in r rows ---------- */
function grid(n,W,H){let best=null;for(let r=1;r<=Math.max(1,Math.min(5,n));r++){const c=Math.ceil(n/r);const g=Math.max(4,W*.018);
  const cw=Math.min((W-g*(c+1))/c,((H-g*(r+1))/r)*AR*.98);if(!best||cw>best.cw)best={r,c,cw,g}}
 const {r,c,cw,g}=best;const ch=cw/AR;const P=[];const top=(H-(r*ch+(r-1)*g))/2;
 for(let i=0;i<n;i++){const row=Math.floor(i/c),inRow=row<r-1?c:n-c*(r-1),col=i-row*c;const rowW=inRow*cw+(inRow-1)*g;P.push({x:(W-rowW)/2+col*(cw+g),y:top+row*(ch+g),w:cw,h:ch})}
 return P}
/* the plate box: the tray rim fits the screen (picture may run past the screen edge; its edge fades into the dark) */
function plateBox(){const vw=innerWidth,vh=innerHeight;const P=PL(),R=P.rim;const top=Math.min(64,vh*.12),bot=Math.min(56,vh*.1);
 const s=Math.min(vw*.98/(R.x1-R.x0),(vh-top-bot)/(R.y1-R.y0)*P.ar);const W=s,H=s/P.ar;
 const cx=vw/2,cy=top+(vh-top-bot)/2;const x=cx-W*((R.x0+R.x1)/2),y=cy-H*((R.y0+R.y1)/2);return{x,y,W,H}}

/* ---------- the scene ---------- */
function kitCardFlip(o){o=o||{};const deck=o.deck||[];if(!deck.length)return;
 const me=o.pick==="me"&&o.turned==="me";const sp=me?1:CF.other;const T={};for(const k in CF.t)T[k]=CF.t[k]*sp;const still=red();
 const ov=document.createElement("div");ov.className="kmov kcf"+(still?" km-red":"");ov.setAttribute("role","dialog");ov.setAttribute("aria-label","Lật thẻ bài");ov.__t0=performance.now();
 const B=plateBox();const P=PL();let F=P.fa;let fx=B.W*F.x0,fy=B.H*F.y0,FW=B.W*(F.x1-F.x0),FH=B.H*(F.y1-F.y0);
 const toB=()=>{F=P.fb;fx=B.W*F.x0;fy=B.H*F.y0;FW=B.W*(F.x1-F.x0);FH=B.H*(F.y1-F.y0);after=grid(Math.max(1,keep.length),FW,FH);keep.forEach((c,i)=>keepPos.set(c,after[i]))};
 const all=grid(deck.length,FW,FH);const keep=deck.filter(c=>!c.bar);let after=grid(Math.max(1,keep.length),FW,FH);
 const cards=deck.map((c,i)=>{const p=all[i];const lab=`${esc(rankName(c.p))} ${esc(nameOf(c.p))}`;
  return `<div class="kcf-c${c.bar?" kcf-bar":""}${c.p===S?" kcf-me":""}" data-i="${i}" style="left:${(fx+p.x).toFixed(1)}px;top:${(fy+p.y).toFixed(1)}px;width:${p.w.toFixed(1)}px;--d:${(i*45)}ms" title="${lab}" aria-label="${lab}">${face(c.p)}</div>`}).join("");
 ov.innerHTML=`<div class="kcf-w" style="left:${B.x.toFixed(1)}px;top:${B.y.toFixed(1)}px;width:${B.W.toFixed(1)}px;height:${B.H.toFixed(1)}px">
  <img class="kcf-pl kcf-a" src="${ART.a}" alt="" draggable="false"><img class="kcf-pl kcf-b" src="${ART.b}" alt="" draggable="false">
  <div class="kcf-cards">${cards}</div><img class="kcf-pl kcf-lit kcf-la" src="${ART.a}" alt="" draggable="false"><img class="kcf-pl kcf-lit kcf-lb" src="${ART.b}" alt="" draggable="false"></div>
  <img class="kcf-hand" src="${ART.hand}" alt="" draggable="false">
  <div class="kmcap kcf-cap">Kính sự phòng dâng thẻ bài</div><div class="kcf-res"></div><div class="kmhint">Chạm để bỏ qua</div>`;
 document.body.appendChild(ov);
 const W=ov.querySelector(".kcf-w"),cap=ov.querySelector(".kcf-cap"),res=ov.querySelector(".kcf-res"),hand=ov.querySelector(".kcf-hand");
 const els=[...ov.querySelectorAll(".kcf-c")];const ti=deck.findIndex(c=>c.id===o.turned);const tel=ti>=0?els[ti]:null;
 let phase=0;const Q=[];const later=(ms,f)=>{Q.push(setTimeout(()=>{try{f()}catch(e){console.error(e)}},ms))};
 const A=(el,kf,op)=>{try{return el.animate(kf,Object.assign({fill:"forwards",easing:"cubic-bezier(.2,.7,.3,1)"},op))}catch(e){return null}};
 const keepPos=new Map();keep.forEach((c,i)=>keepPos.set(c,after[i]));
 const place=(el,p)=>{el.style.left=(fx+p.x).toFixed(1)+"px";el.style.top=(fy+p.y).toFixed(1)+"px";el.style.width=p.w.toFixed(1)+"px"};
 /* the final still (also the reduced-motion picture and the target of a skip) */
 const side=innerHeight<560&&innerWidth/innerHeight>1.5;if(side)ov.classList.add("kcf-side");
 /* phone landscape: the card stands left of centre, the result chip on the right (never over the card) */
 const centreRect=()=>{const vh=innerHeight,vw=innerWidth;if(side){const h=Math.min(vh*.86,vw*.3/AR);return{w:h*AR,h,x:vw*.33-h*AR/2,y:Math.max(6,(vh-h)/2+6)}}
  const h=Math.min(vh*.6,vw*.42/AR,560);return{w:h*AR,h,x:vw/2-h*AR/2,y:Math.max(8,vh*.43-h/2)}};
 function final(src){ov.dataset.fin=typeof src==="string"?src:"auto";phase=1;Q.forEach(clearTimeout);Q.length=0;ov.classList.add("kcf-fin");
  ov.getAnimations({subtree:true}).forEach(a=>{try{a.cancel()}catch(e){}});
  W.classList.add("kcf-on-b");toB();deck.forEach((c,i)=>{const el=els[i];if(c.bar){el.classList.add("kcf-gone")}else place(el,keepPos.get(c))});
  hand.classList.remove("on");
  if(tel){const r=centreRect();tel.classList.add("kcf-pick");ov.appendChild(tel);Object.assign(tel.style,{left:r.x+"px",top:r.y+"px",width:r.w+"px"});ov.classList.add("kcf-dim")}
  showRes(true);const h=ov.querySelector(".kmhint");if(h)h.textContent="Chạm để đóng";later((me?CF.hold.me:CF.hold.other)+(still?800:0),close)}
 function close(){if(phase===2)return;phase=2;Q.forEach(clearTimeout);ov.classList.add("km-out");try{lightH&&lightH.stop&&lightH.stop(200)}catch(e){}setTimeout(()=>ov.remove(),260);try{o.onEnd&&o.onEnd()}catch(e){console.error(e)}}
 ov.addEventListener("click",e=>{e.stopPropagation();if(phase===0)final("tap");else close()});
 let shown=false,lightH=null;function glow(){if(lightH||still||!tel)return;try{if(typeof kitFxLight==='function')lightH=kitFxLight('glow-gold',tel,{dur:2600})}catch(e){}}
 function showRes(now){if(shown)return;shown=true;if(me)glow();res.innerHTML=o.resHTML||"";res.classList.add("on");
  if(me){ov.classList.add("kcf-mine");stamp();if(!still){burst();petals()}snd("sfx-win");snd("sfx-buoi-bell",now?0:350)}
  cap.textContent=o.cap2||"Hoàng thượng lật thẻ bài"}
 function burst(){if(!tel)return;const r=tel.getBoundingClientRect();const at={x:r.left+r.width/2,y:r.top+r.height*.38};
  try{if(typeof kitFxBurst==="function"){kitFxBurst("glowburst",at,1);kitFxBurst("spark",at,18);return}}catch(e){}
  try{if(typeof kitFx==="function")kitFx("decree",{el:tel})}catch(e){}}
 function petals(){try{if(typeof kitFxBurst==="function"){kitFxBurst("petal-peach",null,18);return}}catch(e){}
  let h="";for(let i=0;i<14;i++)h+=`<img class="kcf-pt" src="${ART.petal}" alt="" draggable="false" style="--x:${(i*37+9)%96}%;--d:${((i*.41)%1.8).toFixed(2)}s;--s:${(.55+((i*29)%45)/100).toFixed(2)};--r:${(i*67)%360}deg;--w:${((i%5)-2)*24}px">`;
  const box=document.createElement("div");box.className="kcf-pts";box.innerHTML=h;ov.appendChild(box)}
 /* the seal is stamped on her card (lower right, over the band), not in the caption */
 function stamp(){if(!tel||!me)return;const r=tel.getBoundingClientRect();const s=document.createElement("img");s.className="kcf-seal";s.src=ART.seal;s.alt="Thị tẩm";s.draggable=false;
  const w=Math.max(42,r.width*.36);Object.assign(s.style,{left:(r.left+r.width*.6)+"px",top:(r.top+r.height*.6)+"px",width:w+"px"});ov.appendChild(s)}
 if(still){final("still");return{ov,close}}
 /* 1 · all lit: the cards settle into the tray */
 snd("sfx-tablet-shuffle",150);
 els.forEach((el,i)=>A(el,[{opacity:0,transform:"translateY(-14px) scale(1.04)"},{opacity:1,transform:"none"}],{duration:420,delay:120+i*Math.min(45,700/els.length)}));
 /* 2 · barred cards grey, lifted out; the rest re-arrange */
 const bars=deck.map((c,i)=>c.bar?els[i]:null).filter(Boolean);
 if(bars.length){later(T.grey,()=>{bars.forEach(el=>el.classList.add("kcf-grey"));cap.textContent="Thẻ bài người không thể hầu giá được rút ra"});
  later(T.lift,()=>bars.forEach((el,k)=>A(el,[{transform:"none",opacity:1},{transform:`translateY(${-(B.y+fy+40+el.offsetTop)}px) scale(.9)`,opacity:0}],{duration:560,delay:k*60,easing:"cubic-bezier(.5,0,.7,.4)"})));
  later(T.arrange,()=>{deck.forEach((c,i)=>{if(c.bar){els[i].classList.add("kcf-gone");return}const el=els[i];const r0=el.getBoundingClientRect();place(el,keepPos.get(c));const r1=el.getBoundingClientRect();
   A(el,[{transform:`translate(${r0.left-r1.left}px,${r0.top-r1.top}px) scale(${r0.width/r1.width})`,transformOrigin:"0 0"},{transform:"none",transformOrigin:"0 0"}],{duration:520})})})}
 else later(T.arrange,()=>{deck.forEach((c,i)=>place(els[i],keepPos.get(c)))});
 /* 3 · carried to the Emperor: plate A → plate B under a slow drift; the cards stay in their slots */
 later(T.carry,()=>{cap.textContent="Thẻ bài được dâng lên Hoàng thượng";W.classList.add("kcf-on-b");toB();
  deck.forEach((c,i)=>{if(c.bar)return;const el=els[i];const r0=el.getBoundingClientRect();place(el,keepPos.get(c));const r1=el.getBoundingClientRect();if(Math.abs(r0.left-r1.left)+Math.abs(r0.top-r1.top)+Math.abs(r0.width-r1.width)<1)return;
   A(el,[{transform:`translate(${r0.left-r1.left}px,${r0.top-r1.top}px) scale(${r0.width/r1.width})`,transformOrigin:"0 0"},{transform:"none",transformOrigin:"0 0"}],{duration:1000,easing:"ease-in-out"})});
  A(W,[{transform:"none"},{transform:"translateX(-4%) scale(1.03)",offset:.45},{transform:"none"}],{duration:1050,easing:"ease-in-out",fill:"none"});snd("sfx-step",120)});
 /* 4 · his hand reaches in; the card lifts, glows and grows to the centre */
 if(!tel){later(T.hand,()=>showRes());later(T.hand+600,final);return{ov,close}}
 later(T.hand,()=>{const r=tel.getBoundingClientRect();const hh=Math.min(innerHeight*.78,r.height*CF.hand.h),hw=hh*701/1100;
  const x=r.left+r.width*.5-hw*CF.hand.px,y=r.top+r.height*.12-hh*CF.hand.py;Object.assign(hand.style,{left:x+"px",top:y+"px",height:hh+"px",width:hw+"px"});hand.classList.add("on");
  A(hand,[{transform:`translate(${-hw*.35}px,${-hh*.75}px) rotate(-6deg)`,opacity:0},{transform:"none",opacity:1}],{duration:650*sp,easing:"cubic-bezier(.25,.8,.3,1)"})});
 later(T.lift2,()=>{snd("sfx-tablet-flip");tel.classList.add("kcf-pick");ov.classList.add("kcf-dim");
  A(tel,[{transform:"none"},{transform:"translateY(-10%) scale(1.08)"}],{duration:300});
  A(hand,[{transform:"none",opacity:1},{transform:"translateY(-9%)",opacity:1}],{duration:300})});
 later(T.centre,()=>{const r0=tel.getBoundingClientRect();const c=centreRect();ov.appendChild(tel);
  A(hand,[{transform:"translateY(-9%)",opacity:1},{transform:`translate(${-r0.width}px,-70%)`,opacity:0}],{duration:520,easing:"ease-in"});
  Object.assign(tel.style,{left:c.x+"px",top:c.y+"px",width:c.w+"px"});const r1=tel.getBoundingClientRect();
  A(tel,[{transform:`translate(${r0.left-r1.left}px,${r0.top-r1.top}px) scale(${r0.width/r1.width})`,transformOrigin:"0 0"},{transform:"none",transformOrigin:"0 0"}],{duration:700*sp,easing:"cubic-bezier(.3,.7,.2,1)"});
  glow()});
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
if(typeof stealNight==="function"){const s0=stealNight;stealNight=function(v,t){if(inFlip&&stoleFrom==null&&t)stoleFrom=t===S?"me":t.id;return s0.apply(this,arguments)}}
if(typeof kitFlipTablet==="function"){const a0=kitFlipTablet;kitFlipTablet=function(){if(inFlip)return;return a0.apply(this,arguments)}}
if(typeof kitFlipNote==="function"){const b0=kitFlipNote;kitFlipNote=function(){if(inFlip)return;return b0.apply(this,arguments)};window.kitFlipNote=kitFlipNote}
function want(){return typeof S!=="undefined"&&S&&!S.dead&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)&&!(typeof isSrv==="function"&&isSrv())&&typeof kmPush==="function"}
function cfPlan(){const d=S.nightWhy;if(!d||(typeof wk==="function"&&d.wk!==wk()))return null;
 const was=S.tonight;const pick=d.pick||null;const turned=stoleFrom||d.flip0||pick;
 if(!turned&&CF.skipNoPick)return null;return{wk:d.wk,pick,turned,cause:d.cause}}
/* the week panel / Tuần lục book (#dawn, j87 .kbk) or the title cover the screen: the tablet comes after them */
function busy(){const d=document.getElementById("dawn");if(d&&!d.hidden&&(d.classList.contains("on")||d.classList.contains("kbkdawn")))return true;
 if([...document.querySelectorAll(".kbk")].some(e=>e.offsetParent||e.getClientRects().length))return true;const ti=document.getElementById("title");return !!(ti&&!ti.hidden)}
const DBG=window.__cfdbg=[];const dbg=x=>{DBG.push(x);if(DBG.length>30)DBG.shift()};
function cfPlay(plan){dbg('push '+plan.wk);kmPush(done=>{dbg('run');const go=()=>{try{
   const cw=window.COOPW;if((cw&&cw.on&&cw.pend)||busy()){setTimeout(go,300);return}   /* co-op: wait for the merged week, both players see it together */
   if(!S||S.dead||(S.nightWhy&&S.nightWhy.wk!==plan.wk)){dbg('stale');done();return}
   const deck=deckOf(S.nightWhy);if(!deck.length){dbg('nodeck');done();return}dbg('play '+deck.length);
   Promise.all([ART.a,ART.b,ART.hand].map(preload)).then(()=>{try{kitCardFlip({deck,pick:plan.pick,turned:plan.turned,resHTML:resHTML(plan,plan),onEnd:done});window.cfLast=plan}catch(e){console.error(e);done()}})}catch(e){console.error(e);done()}};go()})}
if(typeof flip==="function"){const f0=flip;flip=function(){inFlip=true;stoleFrom=null;let r;try{r=f0.apply(this,arguments)}finally{inFlip=false}
 try{if(want()){const plan=cfPlan();if(plan)cfPlay(plan)}}catch(e){console.error(e)}return r}}
setTimeout(function warm(){try{if(typeof S==="undefined"||!S){setTimeout(warm,7000);return}[ART.a,ART.b,ART.hand,ART.seal].forEach(preload)}catch(e){}},12000);
window.kitCardFlip=kitCardFlip;window.cfDeckOf=deckOf;window.cfGrid=grid;
/* demo (kit page / tests): n cards from the live court, k of them barred; who = "me" | index | null */
window.cfDemo=function(n,k,who){const L=[S].concat(typeof rivals!=="undefined"?rivals.filter(v=>v.alive&&!v.out):[]);const deck=[];for(let i=0;i<n;i++){const p=L[i%L.length];deck.push({id:i===0?"me":"x"+i,p,bar:i>0&&i<=k})}
 const tid=who==="me"?"me":who==null?null:"x"+who;if(tid&&tid!=="me")deck.forEach(c=>{if(c.id===tid)c.bar=false});
 const plan={pick:tid,turned:tid,cause:"tablet"};const tp=tid==="me"?S:tid?deck.find(c=>c.id===tid).p:null;
 const rh=!tp?`<div class="kmres"><div><b>Đêm nay Hoàng thượng không lật thẻ bài nào.</b></div></div>`:tid==="me"?`<div class="kmres">${face(S)}<div><b>Đêm nay ngươi được thị tẩm.</b><small>Thẻ bài của ngươi được lật.</small></div></div>`:`<div class="kmres">${face(tp)}<div><b>Tối nay: ${esc(rankName(tp))} ${esc(nameOf(tp))}</b><small>được chọn hầu đêm nay.</small></div></div>`;
 return Promise.all([ART.a,ART.b,ART.hand].map(preload)).then(()=>kitCardFlip({deck,pick:plan.pick,turned:plan.turned,resHTML:rh}))};

/* ---------- kit sample page (§67) ---------- */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§67",title:"kitCardFlip (lật thẻ bài: Kính sự phòng tray → Hoàng thượng)",html:()=>`<div class="kcf-sample"><figure><img src="${ART.a}" alt=""><figcaption>Kính sự phòng</figcaption></figure><figure><img src="${ART.b}" alt=""><figcaption>Án thư Hoàng thượng</figcaption></figure><figure><img src="${ART.hand}" alt=""><figcaption>Tay áo rồng</figcaption></figure><figure><img src="${ART.seal}" alt=""><figcaption>Ấn thị tẩm</figcaption></figure></div><button class="kbtn" type="button" onclick="event.stopPropagation();if(typeof S!=='undefined'&&S)cfDemo(12,3,'me')">Xem lật thẻ</button>`})}catch(e){}

/* ---------- CSS (motion only on painted art: transform / opacity / filter) ---------- */
const st=document.createElement("style");st.id="kcf-css";st.textContent=`
.kmov.kcf{background:#0d0806;overflow:hidden;cursor:pointer;display:block;padding:0}
.kcf-w{position:absolute;transform-origin:50% 50%;-webkit-mask-image:radial-gradient(ellipse 72% 70% at 50% 47%,#000 62%,transparent 100%);mask-image:radial-gradient(ellipse 72% 70% at 50% 47%,#000 62%,transparent 100%)}
.kcf-pl{position:absolute;inset:0;width:100%;height:100%;object-fit:fill;pointer-events:none;user-select:none}
.kcf-pl.kcf-a{animation:kmFade .6s ease both}
.kcf-pl.kcf-b,.kcf-lb{opacity:0;transition:opacity 1s ease}
.kcf-on-b .kcf-b{opacity:1}.kcf-on-b .kcf-la{opacity:0}.kcf-on-b .kcf-lb{opacity:.3}
.kcf-la{transition:opacity 1s ease}
/* the plate itself lies over the cards in soft-light: the painting's own lamplight falls on them */
.kcf-lit{mix-blend-mode:soft-light;opacity:.3;z-index:3}
.kcf-cards{position:absolute;inset:0;z-index:2}
.kcf-c{position:absolute;filter:sepia(.1) saturate(.96) brightness(.95) drop-shadow(3px 5px 3px #2a0d0480);transition:filter .45s ease,opacity .45s ease;will-change:transform}
.kcf-c span.md.kfc.kfc.kfc.kfc{width:100%!important;display:block}
.kcf-c.kcf-grey{filter:grayscale(1) brightness(.62) contrast(.9) drop-shadow(2px 3px 2px #0006)}
.kcf-c.kcf-gone{display:none}
.kcf-dim .kcf-c:not(.kcf-pick){filter:sepia(.2) brightness(.42) drop-shadow(2px 3px 2px #0006)}
.kcf-c.kcf-pick{z-index:5;filter:brightness(1.08) drop-shadow(3px 5px 3px #2a0d0480)}  /* the gold glow is painted: kitFxLight("glow-gold") + kitFxBurst("glowburst") (KIT §68), never a CSS drop-shadow glow */
.kcf-hand{position:fixed;z-index:6;display:none;pointer-events:none;filter:sepia(.18) saturate(.95) brightness(.9) drop-shadow(6px 10px 8px #1a0a0480)}
.kcf-hand.on{display:block}
.kcf-cap{position:absolute;left:0;right:0;top:max(10px,env(safe-area-inset-top));text-align:center;z-index:7;padding:0 12px}
.kcf-res{position:absolute;left:0;right:0;bottom:calc(max(14px,env(safe-area-inset-bottom)) + 22px);z-index:7;display:flex;flex-direction:column;align-items:center;gap:8px;padding:0 12px;opacity:0;pointer-events:none}
.kcf-res.on{opacity:1;transition:opacity .4s ease}
.kcf-side .kcf-res{left:52%;right:12px;top:50%;bottom:auto;transform:translateY(-50%);align-items:flex-start}
.kcf-res .kmres{animation:kmPop .45s var(--km-ease,ease) both}
.kcf-seal{position:absolute;z-index:6;height:auto;transform-origin:50% 50%;animation:kcfSeal .5s cubic-bezier(.3,1.6,.5,1) .15s both;filter:drop-shadow(0 3px 6px #0008)}
@keyframes kcfSeal{from{transform:scale(2.6) rotate(-8deg);opacity:0}to{transform:scale(1) rotate(-2deg);opacity:1}}
.kcf-pts{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}
.kcf-pt{position:absolute;top:-8%;left:var(--x);width:calc(26px*var(--s));height:auto;opacity:0;animation:kcfFall 3.2s linear var(--d) forwards}
@keyframes kcfFall{0%{opacity:0;transform:translate(0,0) rotate(var(--r))}10%{opacity:.95}100%{opacity:0;transform:translate(var(--w),112vh) rotate(calc(var(--r) + 300deg))}}
.kcf.kcf-fin .kcf-c{transition:none}
.kcf.km-red *{animation:none!important;transition:none!important}
.kcf.km-red .kcf-res{opacity:1}
@media (max-height:500px){.kcf-cap{font-size:.92rem}.kcf-res{bottom:calc(max(6px,env(safe-area-inset-bottom)) + 16px)}.kcf-res .kmres{padding:4px 10px}}
.kcf-sample{display:flex;flex-wrap:wrap;gap:8px}.kcf-sample figure{margin:0;width:150px;text-align:center}.kcf-sample img{width:100%;height:96px;object-fit:contain;background:#1a0f0a;border-radius:6px}.kcf-sample figcaption{font-size:.75rem}
`;document.head.appendChild(st);
})();
