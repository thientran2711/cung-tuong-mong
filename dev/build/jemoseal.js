/* ================= jemoseal: kitEmoSeal — EVERY mood seal moves, everywhere it shows (KIT 38.4; owner 17/11 ~18:00Z + ~18:30Z (D)) =================
   ONE kit part for every img.kemo (pcPort frames, person cards, lists, mood box, the figure-head seal of jfigseal): no seal draws its own motion.
   (1) MOTION (owner 19/11 ~02:15Z): IDLE = every live seal sways extremely slightly and slowly (CSS `rotate` only, KIT_EMOSEAL.idle: +-deg, period s, never a shake); LEAN-IN = every few seconds
       (random KIT_EMOSEAL.lean.min..max s per seal, never two seals together: global gap KIT_EMOSEAL.lean.gap) the seal scales up (KIT_EMOSEAL.lean.scale, as if leaning forward to talk), plays its
       feeling's OWN stronger motion kemoL-<m> (KIT_EMOSEAL.keys[k].m, duration .d) and settles back to idle. Motions (data, per feeling): shake giận (fast + heat glow) · droop buồn/khóc (slow sad up-down) ·
       sway vui (bright sway + glow) · tremble sợ · bob lo · flicker ghen/hờn (side glance) · glint mưu · wince đau · nod bình/an. Unknown key = defaultMotion. Live only while ON SCREEN (kemo-live), only with
       Cảnh động on, no prefers-reduced-motion and not Gọn (OPT.fxon === false). Idle = `rotate`, lean = `transform`/`filter`: separate properties, never fight. Cheap on Fold (no layout, no per-frame JS).
   (2) FRAME LOOP source (optional, painted by Foreman C): img/kit/emo-anim/<set><k>.webp (animated webp / apng). Probed once per file; when it exists the seal swaps its still for the loop
       DURING THE LEAN-IN only and back to the still when the lean ends or the seal leaves the screen; no file = the still + the CSS motion. Same asset-set rule as the still: <set> = "" women, "m-" young men, "mo-" mature men.
   (3) EFFECT-SPRITE layer (optional, painted): img/kit/emo-fx/<k>.webp (smoke puffs, tears, sweat, glint …): ONE small fixed img.kemofx per leaning seal placed on the big seal by KIT_EMOSEAL.fxSpec (cheek tear / head smoke),
       pointer-events none, removed when the lean ends or the seal leaves the screen. No file = no layer. Nothing is drawn in code (no code-drawn tears / smoke).
   KEYS: the seal map holds khoc + hon too (names "Khóc", "Hờn"); the mood logic (jemo EMO) decides when a person is in one — until then they never appear. ===== */
window.KIT_EMOSEAL=window.KIT_EMOSEAL||{keys:{vui:{m:"sway",d:2.8},binh:{m:"nod",d:3.0},buon:{m:"droop",d:3.6},gian:{m:"shake",d:2.0},so:{m:"tremble",d:2.4},ghen:{m:"flicker",d:3.0},lo:{m:"bob",d:2.8},dau:{m:"wince",d:2.8},muu:{m:"glint",d:3.0},an:{m:"nod",d:3.0},khoc:{m:"droop",d:3.6,name:"Khóc"},hon:{m:"flicker",d:3.0,name:"Hờn"},chanh:{m:"flicker",d:3.0},phanno:{m:"shake",d:2.0},runso:{m:"tremble",d:2.4},matngu:{m:"droop",d:3.6},tutin:{m:"nod",d:3.0},hanghai:{m:"bob",d:2.8},tinhtu:{m:"sway",d:2.8},chuyentam:{m:"nod",d:3.0},hungkhoi:{m:"glint",d:3.0},tinhnghich:{m:"bob",d:2.8},hothen:{m:"droop",d:3.6},chan:{m:"droop",d:3.6},khochiu:{m:"flicker",d:3.0},choang:{m:"wince",d:2.8}},
 defaultMotion:"nod",defaultDur:3.0,idle:{deg:.6,per:[8,11]},lean:{stage:"img.kfseal",panel:"#modal,.krbox,.kmov,.dlg",deny:"header.hud,.hud",head:{f:.2,panel:.1},margin:.16,marginPx:4,grow:.5,shrink:1.8,holdMin:3,loops:0,open:".ksz3",openKey:".kszfig",openDelay:.7,nowDelay:.05,parts:{out:"-out",back:"-back"},partLead:.12,overlapMs:150,bubblePad:10,bubbleRetry:900,modalIn:'#modal,[role="dialog"],.ksz3,.krbox,.kmov,.dlg',min:4,max:8,gap:1.2,z:9990},animKey:{gian:"gian",phanno:"gian",khoc:"khoc",buon:"khoc"},three:{gian:{out:1.65,back:2.64,c0:.569,c1:.833}},anim:"img/kit/emo-anim/",fx:"img/kit/emo-fx/",fxSpec:{khoc:{w:.24,x:.14,y:.52,m:"fall"},gian:{w:.3,x:.7,y:.0,m:"rise"},def:{w:.26,x:.66,y:.5,m:"rise"}}};
const KES_HAVE={};/* url -> true | false | "wait" (probe result) */
function kesProbe(url,cb){const h=KES_HAVE[url];if(h===true||h===false){cb(h);return}
 if(h&&h.w){h.w.push(cb);return}const e={w:[cb]};KES_HAVE[url]=e;const im=new Image();const done=ok=>{KES_HAVE[url]=ok;e.w.forEach(f=>{try{f(ok)}catch(x){}})};im.onload=()=>done(true);im.onerror=()=>done(false);im.src=url}
function kesMotionOK(){try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return false;return!(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false)}catch(e){return false}}
function kesKey(el){const m=/kemo-([a-z0-9_-]+)/.exec(el.className.replace(/kemo-(live|m-\w+)/g,""));return m?m[1]:""}
/* the still name of the seal minus the key: img/kit/emo-<set><k>.webp -> "<set>" */
function kesSet(el,k){const m=/emo-((?:m-|mo-)?)[a-z-]+\.webp/.exec(el.getAttribute("data-kemos")||el.getAttribute("src")||"");return m?m[1]:""}
function kesFxOff(el){const f=el.__fx;if(f){f.remove();el.__fx=null}}
function kesReal(el){/* a key whose own still is not on screen (feelArt / feelFb walked to a nearest painting): the real still replaces it once it exists on the CDN */const k=kesKey(el);if(!k||el.__real)return;const set=kesSet(el,k),real=`img/kit/emo-${set}${k}.webp`;if((el.getAttribute("src")||"").indexOf(real)>=0)return;el.__real=1;
 kesProbe(real,ok=>{if(!ok)return;if(el.isConnected){el.dataset.kemos=real;if(!/emo-anim/.test(el.getAttribute("src")||""))el.setAttribute("src",real)}})}
function kesR(a,b){return a+Math.random()*(b-a)}
function kesSpec(k){return KIT_EMOSEAL.keys[k]||KIT_EMOSEAL.keys[k.replace(/^act-/,"")]}
/* LEAN-IN (owner 19/11 ~06:55Z): the seal is still while small. Every few seconds ONE seal (global stagger) is lifted onto a fixed overlay clone `span.kemo-big` (above every UI, never clipped by a frame,
   clamped inside the screen), POPS OUT FAST (lean.grow = .5 s) to the size of that person's HEAD on the stage (never bigger, kesHead = ONE relative frame), HOLDS while the feeling's motion / painted loop plays n times (n x keys[k].d s,
   lean.holdMin = 3 s), SHRINKS back SLOWLY (lean.shrink = 1.8 s) onto the still seal. Envelope = CSS `scale`/`translate` (keyframes kemoGrow, kemoShrink), feeling motion = `transform`
   (kemoL-<m>, one loop = keys[k].d). Numbers all in KIT_EMOSEAL. */
let kesCur=null,kesLastEnd=0;
function kesLeanEnd(el){if(el.__lt){clearTimeout(el.__lt);el.__lt=0}if(el.__lw){clearInterval(el.__lw);el.__lw=0}el.classList.remove("kemo-lean","kemo-hide");const c=el.__big;if(c){(c.__w||[]).forEach(clearTimeout);c.remove();el.__big=null}
 const still=el.dataset.kemos;if(still&&el.getAttribute("src")!==still)el.setAttribute("src",still);kesFxOff(el);if(kesCur===el){kesCur=null;kesLastEnd=performance.now()}}
/* SCOPE (owner 19/11 ~06:25Z): only a seal beside a figure ON THE STAGE (lean.stage = jfigseal head seals: room / Dư đồ / place stages) leans, plus a seal inside a tab / panel she has opened (lean.panel);
   every avatar / portrait frame (top-bar pcPort, lists, cards) is ALWAYS STILL: no lean, no idle sway. Never inside the top bar (lean.deny). */
function kesCan(el){const L=KIT_EMOSEAL.lean;try{if(el.closest(L.deny))return false;return el.matches(L.stage)||!!el.closest(L.panel)}catch(e){return false}}
/* EVENT DIALOG (owner 19/11 ~07:25Z): a seal inside lean.open (the event / person dialog .ksz3) leans ONCE each time the dialog opens (lean.openDelay s after the seal shows, then still); stage / panel seals keep the random lean every min..max s. */
function kesOpenRoot(el){try{const L=KIT_EMOSEAL.lean;return el.closest(L.open)&&(el.closest(L.openKey)||el.closest(L.open))}catch(e){return null}}/* the dialog may keep its .ksz3 shell between openings: the once-flag sits on the figure column (openKey), which is built anew at every opening */
function kesPre(el){try{const U=kesPartsUrl(el,kesKey(el));if(U)[U.out,U.loop,U.back].forEach(u=>kesProbe(u,()=>{}))}catch(e){}}/* the painted set is fetched before the lean needs it */
/* the dialog is still popping in (its box scales / moves): the lean starts the moment the corner seal stands still (two samples 50 ms apart, at most ~0.8 s), never later */
function kesNowGo(el,n,px,py){el.__ln=setTimeout(()=>{el.__ln=0;if(!el.isConnected||!el.classList.contains("kemo-live"))return;const r=el.getBoundingClientRect(),still=px!=null&&Math.abs(r.left-px)<1.5&&Math.abs(r.top-py)<1.5&&r.width>2&&el.complete&&!el.classList.contains("kemo-wait");if(still||n>=16){kesLean(el,true);return}kesNowGo(el,n+1,r.left,r.top)},50)}
function kesSchedule(el){if(el.__ln)clearTimeout(el.__ln);kesPre(el);const L=KIT_EMOSEAL.lean;/* owner 21/11 (mark #68): the seal in the corner of a dialog picture (data-kemo-now) leans AT ONCE when its dialog opens (once per opening, no wait), then keeps the random lean */if(el.dataset.kemoNow&&!el.__nowDone){el.__nowDone=1;kesNowGo(el,0);return}const root=kesOpenRoot(el);if(root&&!el.dataset.kemoNow&&root.querySelector("img.kemo[data-kemo-now]")){el.__ln=setTimeout(()=>kesLean(el),kesR(L.min,L.max)*1000);return}/* the figure seal of that dialog keeps to its own random lean: one seal leans at a time */if(root){if(root.__kl)return;el.__ln=setTimeout(()=>kesLean(el,true),L.openDelay*1000);return}/* a dialog opening takes the stage at once (ends a running stage lean) */el.__ln=setTimeout(()=>kesLean(el),kesR(L.min,L.max)*1000)}
/* HEAD FRAME (owner 19/11 ~07:10Z, canon overwrite: NO per-figure measuring): ONE relative frame = lean.head.f x the stage's standard figure height (stage dataset kmlH = the one body height of the stage, the same value the
   head markers use; one typical figure's head as a fraction of its body, measured once, stored as data). The same for every seal; a seal outside a stage (panel / dialog) = lean.head.f x the dialog figure height, else lean.head.panel x the short screen side. */
function kesHead(el,r){const L=KIT_EMOSEAL.lean.head;let H=0;try{const st=(el.__fig&&el.__fig.closest("#stage"))||(el.closest&&el.closest("#stage"));if(st){const h0=+st.dataset.kmlH,sc=st.offsetHeight?st.getBoundingClientRect().height/st.offsetHeight:1;if(h0>20)H=h0*sc}
 if(!H&&el.__fig){const q=el.__fig.getBoundingClientRect();if(q.height>20)H=q.height*(KIT_FIG&&KIT_FIG.h||.79)}}catch(e){}
 return H?H*L.f:Math.min(innerWidth,innerHeight)*L.panel}
/* STAGE SEALS UNDER A MODAL (ROOT-66 / owner 19/11 ~07:25Z): while ANY dialog / sheet / book page is open (kitDialogOpen = the whole family, body.kbk-open) a seal that is NOT inside it never leans (and a running lean ends); only the seal beside the person in the dialog leans. */
function kesBlocked(el){try{if(el.closest(KIT_EMOSEAL.lean.modalIn))return false;return(typeof kitDialogOpen==="function"&&kitDialogOpen())||document.body.classList.contains("kbk-open")}catch(e){return false}}
/* 3-PART SET (KIT_EMOSEAL.three[ak] = {out,back} clip seconds, c0/c1 = the gold circle as a share of the clip frame at the clip's start / end vs in the loop): files <set><ak>-out.webp / <set><ak>.webp / <set><ak>-back.webp.
   "yes" = all three probed present, "no" = a part is missing (single loop / CSS motion), "wait" = still probing (the lean waits, it never starts with the wrong set). */
/* A seal picture is NEVER swapped inside a displayed <img> (the owner-visible "beige square" for a frame at every part change): each picture is its own <img> inside the big seal's box (span.kemo-big),
   decoded BEFORE it is shown (img.decode()), put on top, and the previous one is removed two frames later; a webp clip starts at frame 0 the moment its img is attached. */
function kesShow(c,src,el){const n=new Image();n.alt="";n.setAttribute("aria-hidden","true");n.draggable=false;n.style.cssText="position:absolute;left:0;top:0;width:100%;height:100%;object-fit:contain;display:block;max-width:none;max-height:none;margin:0;border-radius:0;background:none";n.src=src;
 const go=()=>{if(!c.isConnected)return;const old=c.__img;c.appendChild(n);c.__img=n;
  if(old)setTimeout(()=>old.remove(),kesOver());/* never hide-then-show: the previous picture stays under the new one for ~3 recorded frames until the new one has surely been painted */
  if(el)setTimeout(()=>{if(el.__big===c)el.classList.add("kemo-hide")},kesOver())/* the real still is hidden only AFTER the first big picture is painted (still -> out never blinks) */};n.decode?n.decode().then(go,go):go()}
function kesOver(){const v=KIT_EMOSEAL.lean.overlapMs;return v>0?v:150}
/* SPEECH BUBBLES (K-HEAD-SAY, ROOT-69 / KIT_REQUESTS «K-HEAD-SAY x EMO-SEAL LEAN»): the big seal never covers a say bubble. (1) no lean starts while a say bubble is open on the speaker's figure or overlaps the planned big box (it waits, retries every lean.bubbleRetry ms);
   (2) a bubble that is about to show while a lean overlaps it ENDS that lean at once (kitEmoSeal.yield, called by jmark kitSay / kitSayAll before the bubble is made visible); the bubble has priority, the seal leans again later. */
function kesBubbleRects(){try{return[...document.querySelectorAll(".ksay-lay>.khead.ksay:not(.kout)")].filter(b=>b.style.visibility!=="hidden"&&b.getClientRects().length).map(b=>b.getBoundingClientRect())}catch(e){return[]}}
function kesHit(a,b,pad){return a.left-pad<b.right&&a.right+pad>b.left&&a.top-pad<b.bottom&&a.bottom+pad>b.top}
function kesYield(rect){const el=kesCur;if(!el||!el.__big||!el.classList.contains("kemo-lean"))return false;const cr=el.__big.getBoundingClientRect();if(rect&&!kesHit(cr,rect,KIT_EMOSEAL.lean.bubblePad))return false;kesLeanEnd(el);kesSchedule(el);return true}
function kesPartsUrl(el,k){const L=KIT_EMOSEAL.lean,ak=KIT_EMOSEAL.animKey[k]||k,T=KIT_EMOSEAL.three[ak];if(!T)return null;const A=KIT_EMOSEAL.anim+kesSet(el,k)+ak,P=L.parts;return{T,ak,out:A+P.out+".webp",loop:A+".webp",back:A+P.back+".webp"}}
function kesPartsState(U){if(!U)return"no";const h=[U.out,U.loop,U.back].map(u=>KES_HAVE[u]);if(h.some(x=>x===false))return"no";if(h.every(x=>x===true))return"yes";return"wait"}
function kesLean(el,force){el.__ln=0;if(!el.isConnected||!el.classList.contains("kemo-live"))return;
 const L=KIT_EMOSEAL.lean,now=performance.now();
 if(kesBlocked(el)){el.__ln=setTimeout(()=>kesLean(el),1500);return}
 {const U=kesPartsUrl(el,kesKey(el));if(kesPartsState(U)==="wait"){if(el.__pre)return;el.__pre=1;let n=0;[U.out,U.loop,U.back].forEach(u=>kesProbe(u,()=>{if(++n===3){el.__pre=0;kesLean(el,force)}}));return}}
 if(!force&&((kesCur&&kesCur!==el&&kesCur.isConnected&&kesCur.classList.contains("kemo-lean"))||kesLastEnd+L.gap*1000>now)){/* stagger: never two seals leaning together, next only after the previous one fully ended + gap */
  el.__ln=setTimeout(()=>kesLean(el),Math.max(300,kesLastEnd+L.gap*1000-now)+kesR(100,900));return}
 if(kesCur&&kesCur!==el){const pv=kesCur;kesLeanEnd(pv);kesSchedule(pv)}/* forced (dialog opening): the cut stage seal is scheduled again */
 const r=el.getBoundingClientRect();if(r.width<2||r.bottom<=0||r.top>=innerHeight||r.right<=0||r.left>=innerWidth){kesSchedule(el);return}
 kesCur=el;const k=kesKey(el),spec=kesSpec(k),d=(spec&&spec.d)||KIT_EMOSEAL.defaultDur,still=el.dataset.kemos;
 const U=kesPartsUrl(el,k),P3=kesPartsState(U)==="yes"?U.T:null;/* painted 3-part set present: grow = its out clip, shrink = its back clip */
 const grow=P3?P3.out:L.grow,shr=P3?P3.back:L.shrink,n=P3?1:+Math.max(L.loops,L.holdMin/d).toFixed(3),hold=P3?L.holdMin:n*d,/* hold = holdMin s exactly (n may be a fraction of a loop) */tot=grow+hold+shr;
 const hp=kesHead(el,r);if(Math.max(r.width,r.height)>hp*1.25){kesCur=null;kesSchedule(el);return}{const rt=kesOpenRoot(el);if(rt&&!el.dataset.kemoNow)rt.__kl=1}/* a seal already bigger than the head frame (box not laid out yet / mid-transition) never leans: it would pop BIGGER than the head */
 const sm=Math.max(r.width,r.height),S=P3?Math.max(1,hp/P3.c1/sm):Math.max(1,hp/sm);/* big size = THE HEAD of that person on the stage (owner 19/11 ~06:55Z), never bigger; a 3-part set: its gold circle in the loop (c1 of the clip box) = the head frame, the clip box (hands may leave the circle) is never clipped */
 const bw=r.width*S,bh=r.height*S,/* big box never past the head, nor the screen */m=Math.round(Math.max(bw,bh)*L.margin)+L.marginPx,/* margin = room for the feeling motion (shake / sway amplitude) */ cx=r.left+r.width/2,cy=r.top+r.height/2,s0=P3?Math.min(1,sm/(P3.c0*bw)):1/S;/* start / end scale: the clip's own small circle (c0) sits exactly on the still seal */
 const bl=Math.max(m,Math.min(cx-bw/2,innerWidth-bw-m)),bt=Math.max(m,Math.min(cy-bh/2,innerHeight-bh-m));/* clamped inside the screen */
 {const bb=kesBubbleRects(),pad=L.bubblePad,box={left:bl-m,top:bt-m,right:bl+bw+m,bottom:bt+bh+m};let own=false;try{own=typeof KSAY!=="undefined"&&el.__fig&&KSAY.some(q=>q.fig===el.__fig&&!q.closed)}catch(e){}
  if(own||bb.some(q=>kesHit(box,q,pad))){kesCur=null;{const rt=kesOpenRoot(el);if(rt)rt.__kl=0}el.__ln=setTimeout(()=>kesLean(el,force),L.bubbleRetry);return}}/* a say bubble is open there: wait */
 const c=document.createElement("span");c.className="kemo-big kemo-m-"+(spec?spec.m:KIT_EMOSEAL.defaultMotion)+(P3?" kemo-played kemo-3p":"");c.setAttribute("aria-hidden","true");
 c.style.cssText=`position:fixed;z-index:${L.z};left:${bl.toFixed(1)}px;top:${bt.toFixed(1)}px;width:${bw.toFixed(1)}px;height:${bh.toFixed(1)}px;pointer-events:none;display:block;`+
  `--kb-dx:${(cx-(bl+bw/2)).toFixed(1)}px;--kb-dy:${(cy-(bt+bh/2)).toFixed(1)}px;--kb-s:${s0.toFixed(4)};--kb-ss:${shr}s;--kb-sd:${(grow+hold).toFixed(2)}s;--kb-d:${d}s;--kb-n:${n};--kb-gs:${grow}s`;
 document.body.appendChild(c);el.__big=c;el.classList.add("kemo-lean");kesShow(c,P3?U.out:el.getAttribute("src"),el);
 const set=kesSet(el,k),ak=KIT_EMOSEAL.animKey[k]||k;
 if(P3){c.__w=[setTimeout(()=>{kesShow(c,U.loop)},(grow-L.partLead)*1000),setTimeout(()=>{kesShow(c,U.back)},(grow+hold)*1000)]/* the swap is a little BEFORE the clip's last frame: a webp clip loops forever and a wrap shows the file's opaque white ANIM background for a frame (an off-white square), so a clip is never left on screen past its end */}
 else kesProbe(KIT_EMOSEAL.anim+set+ak+".webp",ok=>{if(ok&&el.isConnected&&el.__big===c){kesShow(c,KIT_EMOSEAL.anim+set+ak+".webp");c.classList.add("kemo-played")}});/* the painted loop (Foreman C) plays on the big seal; no loop file for this feeling = the still + its CSS motion */
 if(!P3)kesProbe(KIT_EMOSEAL.fx+ak+".webp",ok=>{if(!ok||!el.isConnected||el.__big!==c||el.__fx)return;
  const f=document.createElement("img");f.className="kemofx kemofx-"+ak;f.alt="";f.setAttribute("aria-hidden","true");f.src=KIT_EMOSEAL.fx+ak+".webp";f.onerror=()=>f.remove();
  const X=KIT_EMOSEAL.fxSpec[ak]||KIT_EMOSEAL.fxSpec.def,fw=bw*X.w,fl=bl+bw*X.x,ft=bt+bh*X.y;f.classList.add("kemofx-"+X.m);/* small effect sprite on the big seal (cheek / head corner), grows + shrinks with it (own envelope origin) */
  f.style.cssText=`position:fixed;z-index:${L.z+1};left:${fl.toFixed(1)}px;top:${ft.toFixed(1)}px;width:${fw.toFixed(1)}px;height:auto;--kb-s:${(1/S).toFixed(4)};--kb-dx:${(cx-(fl+fw/2)).toFixed(1)}px;--kb-dy:${(cy-(ft+fw/2)).toFixed(1)}px;`+c.style.cssText.split(";").filter(x=>/^\s*--kb-(ss|sd|gs)/.test(x)).join(";");
  document.body.appendChild(f);el.__fx=f});/* effect sprite grows / holds / shrinks with the seal (same envelope), centred on it */
 const ox=r.left,oy=r.top;/* the small seal left the screen / moved (scroll, re-render): end the lean at once */
 el.__lw=setInterval(()=>{if(!el.isConnected||!el.classList.contains("kemo-live")){kesLeanEnd(el);return}if(kesBlocked(el)){kesLeanEnd(el);kesSchedule(el);return}{const cr=el.__big&&el.__big.getBoundingClientRect();if(cr&&kesBubbleRects().some(q=>kesHit(cr,q,L.bubblePad))){kesLeanEnd(el);kesSchedule(el);return}}const q=el.getBoundingClientRect();if(Math.abs(q.left-ox)>10||Math.abs(q.top-oy)>10||q.bottom<=0||q.top>=innerHeight){kesLeanEnd(el);kesSchedule(el)}},250);
 el.__lt=setTimeout(()=>{kesLeanEnd(el);kesSchedule(el)},P3?(tot-L.partLead)*1000:tot*1000+80)}
function kesLive(el,on){if(!el.isConnected)return;kesReal(el);
 if(!el.dataset.kemos){el.dataset.kemos=el.getAttribute("src")||""}
 const was=el.classList.contains("kemo-live"),live=on&&kesMotionOK()&&kesCan(el);el.classList.toggle("kemo-live",live);const k=kesKey(el),spec=kesSpec(k);if(!/kemo-m-/.test(el.className))el.classList.add("kemo-m-"+(spec?spec.m:KIT_EMOSEAL.defaultMotion));
 if(live){if(!was){const I=KIT_EMOSEAL.idle;el.style.setProperty("--kemo-id",I.deg+"deg");el.style.setProperty("--kemo-ip",kesR(I.per[0],I.per[1]).toFixed(2)+"s");el.style.setProperty("--kemo-i0","-"+kesR(0,I.per[1]).toFixed(2)+"s");if(!el.__ln)kesSchedule(el)}}
 else{if(el.__ln){clearTimeout(el.__ln);el.__ln=0}kesLeanEnd(el)}}
const KES_IO=typeof IntersectionObserver==="function"?new IntersectionObserver(es=>{for(const e of es)kesLive(e.target,e.isIntersecting)},{threshold:.01}):null;
function kesWatch(el){if(!el||el.__kes)return;el.__kes=1;
 /* a seal re-created for a new mood (jfigseal keeps the OLD still as el.__prev): the new still waits hidden (kemo-wait) until it is LOADED AND DECODED, then the old one goes two frames later - never an empty disc, never a blank gap */
 const ready=()=>{el.classList.remove("kemo-wait");const p=el.__prev;if(p){el.__prev=null;requestAnimationFrame(()=>requestAnimationFrame(()=>p.remove()))}};
 if(!el.complete||!el.naturalWidth){el.classList.add("kemo-wait");const ok=()=>{if(el.decode)el.decode().then(ready,ready);else ready()};el.addEventListener("load",ok,{once:true});el.addEventListener("error",ready,{once:true})}else ready();
 if(KES_IO)KES_IO.observe(el);else kesLive(el,true)}
function kesScan(){document.querySelectorAll("img.kemo").forEach(kesWatch)}
function kesSweep(){/* effect layers + big clones whose seal is gone */const L=[...document.querySelectorAll("img.kemo")];document.querySelectorAll("img.kemofx").forEach(f=>{if(!L.some(c=>c.__fx===f))f.remove()});document.querySelectorAll(".kemo-big").forEach(f=>{if(!L.some(c=>c.__big===f))f.remove()})}
let kesQ=0;function kesSched(){if(kesQ)return;kesQ=requestAnimationFrame(()=>{kesQ=0;kesScan();kesSweep()})}
try{new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.matches&&n.matches("img.kemo")||n.querySelector&&n.querySelector("img.kemo")))||[...m.removedNodes].some(n=>n.nodeType===1)))kesSched()}).observe(document.body,{childList:true,subtree:true})}catch(e){}
addEventListener("resize",()=>document.querySelectorAll("img.kemo.kemo-lean").forEach(el=>{kesLeanEnd(el);kesSchedule(el)}));
kesScan();
/* r2 reviewer fix: Cảnh động / Gọn switched in Settings applies to the seals already on screen at once (saveOpt does not re-render) */
(function(){if(typeof saveOpt!=="function")return;const o=saveOpt;saveOpt=function(){const r=o.apply(this,arguments);try{document.querySelectorAll("img.kemo").forEach(el=>{if(!el.__kes)return;const b=el.getBoundingClientRect();kesLive(el,b.width>2&&b.bottom>0&&b.top<innerHeight&&b.right>0&&b.left<innerWidth)})}catch(e){}return r}})();
window.kitEmoSeal={yield:kesYield,scan:kesScan,live:kesLive,probe:kesProbe,lean:kesLean,head:kesHead};/* no pop: owner 17/11 ~18:10Z (Sims model), the seal has ONE source (jemo emoSealKey) */
(function(){const st=document.createElement("style");st.id="kemoseal-css";st.textContent=`
img.kemo{transform-origin:50% 60%;will-change:auto}
img.kemofx{pointer-events:none;object-fit:contain;max-width:none;max-height:none;margin:0;border-radius:0}
img.kemo.kemo-hide{visibility:hidden}
img.kemo.kemo-wait{visibility:hidden}
span.kemo-big{transform-origin:50% 58%;will-change:transform,scale;filter:drop-shadow(0 4px 10px #000a)}
@media (prefers-reduced-motion:no-preference){
img.kemo.kemo-live{animation:kemoIdle var(--kemo-ip,9s) ease-in-out var(--kemo-i0,0s) infinite}
span.kemo-big{animation:kemoGrow var(--kb-gs,.5s) cubic-bezier(.1,.7,.25,1) 0s 1 both,kemoShrink var(--kb-ss,1.8s) cubic-bezier(.4,0,.25,1) var(--kb-sd,8s) 1 forwards,var(--kb-k,kemoL-nod) var(--kb-d,3s) ease-in-out var(--kb-gs,1.6s) var(--kb-n,2) both}
span.kemo-big.kemo-m-nod{--kb-k:kemoL-nod}
span.kemo-big.kemo-m-sway{--kb-k:kemoL-sway}
span.kemo-big.kemo-m-droop{--kb-k:kemoL-droop}
span.kemo-big.kemo-m-shake{--kb-k:kemoL-shake}
span.kemo-big.kemo-m-tremble{--kb-k:kemoL-tremble}
span.kemo-big.kemo-m-flicker{--kb-k:kemoL-flicker}
span.kemo-big.kemo-m-bob{--kb-k:kemoL-bob}
span.kemo-big.kemo-m-wince{--kb-k:kemoL-wince}
span.kemo-big.kemo-m-glint{--kb-k:kemoL-glint}
span.kemo-big.kemo-3p{animation:kemoGrow var(--kb-gs,1.65s) ease-in-out 0s 1 both,kemoShrink var(--kb-ss,2.6s) ease-in-out var(--kb-sd,4.6s) 1 forwards}/* 3-part set: the clips carry their own pose change, the CSS envelope only adds the rest of the scale, same length */
span.kemo-big.kemo-played{animation:kemoGrow var(--kb-gs,.5s) cubic-bezier(.1,.7,.25,1) 0s 1 both,kemoShrink var(--kb-ss,1.8s) cubic-bezier(.4,0,.25,1) var(--kb-sd,8s) 1 forwards}/* painted loop plays: its own animation, no extra CSS shake */
img.kemofx{animation:kemoGrow var(--kb-gs,.5s) cubic-bezier(.1,.7,.25,1) 0s 1 both,kemoShrink var(--kb-ss,1.8s) cubic-bezier(.4,0,.25,1) var(--kb-sd,8s) 1 forwards,kemoFx 2.4s ease-in-out infinite}
img.kemofx.kemofx-fall{--fxk:kemoFxFall}img.kemofx.kemofx-rise{--fxk:kemoFxRise}
img.kemofx.kemofx-fall,img.kemofx.kemofx-rise{animation:kemoGrow var(--kb-gs,.5s) cubic-bezier(.1,.7,.25,1) 0s 1 both,kemoShrink var(--kb-ss,1.8s) cubic-bezier(.4,0,.25,1) var(--kb-sd,8s) 1 forwards,var(--fxk) 1.6s ease-in infinite}
}
/* IDLE: ONLY the rotate property, barely visible + very slow (owner 19/11 ~05:05Z: the small seal is still) */
@keyframes kemoIdle{0%,100%{rotate:calc(var(--kemo-id,.6deg) * -1)}50%{rotate:var(--kemo-id,.6deg)}}
/* ENVELOPE (CSS scale + translate props, never fights the feeling's transform): small (at the real seal) -> big (kemoGrow) -> hold -> small (kemoShrink, delayed by grow+hold) */
@keyframes kemoGrow{from{scale:var(--kb-s);translate:var(--kb-dx) var(--kb-dy)}to{scale:1;translate:0 0}}
@keyframes kemoShrink{from{scale:1;translate:0 0}to{scale:var(--kb-s);translate:var(--kb-dx) var(--kb-dy)}}
/* FEELING MOTIONS: ONE slow readable loop each (length = keys[k].d), played n times during the hold. transform/filter only, amplitudes as % of the BIG seal. */
@keyframes kemoL-nod{0%,100%{transform:translateY(0) rotate(0) scale(1)}25%{transform:translateY(7%) rotate(-5deg) scale(1.04)}50%{transform:translateY(-2%) rotate(0) scale(1)}75%{transform:translateY(6%) rotate(5deg) scale(1.04)}}
@keyframes kemoL-sway{0%,100%{transform:rotate(0) scale(1);filter:drop-shadow(0 0 6px #ffe9a0)}25%{transform:translateY(-8%) rotate(-9deg) scale(1.06)}50%{transform:rotate(0) scale(1);filter:drop-shadow(0 0 16px #ffe9a0)}75%{transform:translateY(-8%) rotate(9deg) scale(1.06)}}
@keyframes kemoL-droop{0%,100%{transform:translateY(0) rotate(0)}40%{transform:translateY(6%) rotate(-3deg)}65%{transform:translateY(5%) rotate(-3deg)}85%{transform:translateY(1%) rotate(0)}}
@keyframes kemoL-shake{0%,100%{transform:translateX(0);filter:drop-shadow(0 0 8px #ff7a4a)}12%{transform:translateX(-4%) rotate(-1.5deg)}25%{transform:translateX(4%) rotate(1.5deg);filter:drop-shadow(0 0 14px #ff5a2a)}38%{transform:translateX(-4%) rotate(-1.5deg)}50%{transform:translateX(3%) rotate(1deg);filter:drop-shadow(0 0 14px #ff5a2a)}62%{transform:translateX(-2%)}75%{transform:translateX(0)}}
@keyframes kemoL-tremble{0%,100%{transform:translate(0,0)}15%{transform:translate(3%,0)}30%{transform:translate(-3%,2%)}45%{transform:translate(2%,-2%)}60%{transform:translate(-3%,2.5%)}75%{transform:translate(3%,0)}90%{transform:translate(-1.5%,1%)}}
@keyframes kemoL-bob{0%,100%{transform:translateY(0) scale(1)}25%{transform:translateY(-10%) scale(1.04)}50%{transform:translateY(0) scale(1)}75%{transform:translateY(-8%) scale(1.04)}}
@keyframes kemoL-flicker{0%,100%{transform:translateX(0) rotate(0);opacity:1}20%{transform:translateX(-8%) rotate(-5deg);opacity:.8}40%{transform:translateX(-8%) rotate(-5deg);opacity:1}60%{transform:translateX(0)}80%{transform:translateX(8%) rotate(5deg);opacity:.8}}
@keyframes kemoL-glint{0%,100%{transform:scale(1);filter:drop-shadow(0 0 3px #d9c4ff)}50%{transform:scale(1.07);filter:drop-shadow(0 0 20px #d9c4ff) brightness(1.15)}}
@keyframes kemoL-wince{0%,100%{transform:rotate(0) scale(1)}25%{transform:rotate(-7deg) scale(.92)}50%{transform:rotate(5deg) scale(1)}75%{transform:rotate(-5deg) scale(.94)}}
@keyframes kemoFxFall{0%{transform:translateY(-10%);opacity:0}20%{opacity:1}100%{transform:translateY(130%);opacity:0}}
@keyframes kemoFxRise{0%{transform:translateY(20%) scale(.8);opacity:0}30%{opacity:.95}100%{transform:translateY(-70%) scale(1.15);opacity:0}}
@keyframes kemoFx{0%,100%{opacity:.9;transform:translateY(0)}50%{opacity:1;transform:translateY(-3%)}}
`;document.head.appendChild(st)})();
