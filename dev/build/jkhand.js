/* ===== KIT §101 kitHand «BÀN BÀI» — event choices as a HAND OF CARDS (owner 24/11 ~15:15Z mẫu 1 GO + 25/11 ~15:12Z «cho kiểu animation game đi»; KK30, review/kit-hand)
   ONE place, every event-choice frame: an option list (`#modal .opts`) of 2–7 kit option cards (§101.11) (`button.ka.kopt`, jopic §6.2b) becomes a hand.
   - Card face = the option's own picture (.kaart) + its SHORT name (.kan) ONLY (owner 24/11 ~15:15Z b, restated via MAIN 146 25/11 ~22:40Z): no odds meter, no Tốn / Được / Mất on the face —
     the odds word + Gợi ý + rows show only in the lifted card's details plate.
   - Tap 1 = the card lifts a little + its details plate shows (the SAME kit card clone the «!» overlay shows: Tốn · Được · Mất · odds word · Gợi ý; a locked card shows its kit «why»).
   - The lifted card carries green ✓ (choose: the card flies up, then the frame's own choose path runs: #modal onclick → chooseM, unchanged) + ✕ (put back); a body tap again does nothing (owner 25/11 ~21:55Z).
   - Keyboard / robot / synthetic clicks (event.detail === 0) choose at once, as before (data-m and every data attribute the tests and the harness read stay on the same buttons).
   - All cards visible, no scroll: one row when they fit at the minimum card width, else 2 (3 on a narrow phone) rows; ONE card size per hand (law 10).
   - Smooth: deal-in, lift and fly are transform/opacity on the CARDS only (never on figures, never a cross-fade of two screens); «Cảnh động» off / reduced motion = no animation (kfStill).
   Numbers: geometry knobs here (KIT_HAND, layout px like KIT_OPT); every game number on the cards comes from the kit card (BAL), nothing typed (law 4). */
const KIT_HAND={min:2,max:7/* KIT §101.11 (owner 26/11 ~21:25Z, CANON OVERWRITE of paging): every hand ≤ 7 cards, cut at the SOURCE; no paging. A frame with more cards is not a hand (stays the list) and is a source fault: dev/test/hand-max-scan.js lists it */,gap:[8,12],minW:[88,100],maxW:[128,124],cmpW:[[74,92],[78,92]]/* compact hand [min,max] per view: a long story keeps its text readable */,nameFs:[12.5,14],liftK:.13,dealMs:420,readyMs:700,dealStep:70,flyMs:260,plateW:560,confPx:44,notKinds:["info","rule","help"]/* KK36 (MAIN 151, KK35 question): an INFO panel (kitPanel kind) whose options are shortcut cards («Mục tiêu chương» «Đi làm: …») is never a hand / stage — one panel = one look */};
/* KIT §101.9 FRAME KIND — the hand is OPT-IN BY KIND (KIT-STAGE-R3; OD 26/11 ~19:00Z «the new animation kit replaces every old frame of the same kind», KK44 NEW-KIT
   FAMILY SCAN wrong-part rows). The showModal pass no longer turns «any 2–10 option list» into a hand: each frame names its KIND and gets THAT part.
   kitKind(m) → "hand" (Bàn bài, §101) · "pick" (thẻ gỗ treo on the stage, §98/§102.3) · "ring" (a PERSON picker → vòng người, RING-BUILD) ·
   "group" (a GROUP picker → vòng nhóm, RING-BUILD) · "list" (info / rule / help panel, one panel = one look) · "" = the frame names none.
   Sources, first wins: (1) m.kind set by the builder; (2) the place card (m.placeK, KIT 32.8) = "pick"; (3) KIT_KIND.pid (PEND frames);
   (4) an option that carries grp (a side / group choice, e.g. rgJoinOpts) = "group"; (5) a kitPanel info / rule / help = "list".
   "ring" / "group" frames keep today's list until RING-BUILD's ring lands with the set (never a hand: the wrong part). A frame that names no kind
   is an event choice only when it passes the structural test below (story + 2–7 kit option cards, not every card a person) — the census
   dev/test/kit-kind-scan.js lists every PEND family + every Q-pushed builder with the part it gets. */
const KIT_KIND={pid:{entpick:"ring"/* «Chọn người theo hầu» retinue (j95s) */,plantsv:"ring",evpick:"ring",itarget:"ring",pgpick:"ring",runner:"ring",cmPick:"ring"},hands:["hand","pick"]};
function kitKind(m){try{if(!m)return"";if(m.kind)return String(m.kind);if(m.placeK)return"pick";if(m.pid&&KIT_KIND.pid[m.pid])return KIT_KIND.pid[m.pid];
 if(Array.isArray(m.opts)&&m.opts.some(o=>o&&o.grp))return"group";if(m.kit&&KIT_HAND.notKinds.indexOf(m.kit.kind)>=0)return"list";return""}catch(e){return""}}
function kitKindOf(g){try{return g&&g.closest&&g.closest("#modal")&&typeof Q!=="undefined"?kitKind(Q[0]):""}catch(e){return""}}
window.kitKind=kitKind;window.KIT_KIND=KIT_KIND;
function kitHandOn(g){try{if(!g||!g.matches||!g.matches("#modal .opts")||g.closest(".pc,.kpdlg"))return false;if(!kitHandWants(g))return false;const bs=kitHandCards(g);return bs.length>=KIT_HAND.min&&bs.length<=KIT_HAND.max&&bs.length===[...g.children].filter(b=>b.tagName==="BUTTON"&&b.getClientRects().length).length}catch(e){return false}}
function kitHandWants(g){try{if(!g||!g.closest||g.closest(".pc,.kpdlg"))return false;const kd=kitKindOf(g);if(kd&&KIT_KIND.hands.indexOf(kd)<0)return false;/* §101.9: a ring / group / list frame is never a hand */const k=[...g.children].filter(b=>b.tagName==="BUTTON"),c=k.filter(b=>b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&!b.classList.contains("kbare"));const fc=b=>/^face/.test(b.dataset.kopic||"")||!!b.querySelector(".kopface"),nb=c.filter(b=>!b.classList.contains("kback"));if(kitHandIsLong(g))return false;/* KK41 (MAIN 157 ruling on the j7c iPad CUT): a name longer than the 4-line face keeps the LIST card */return c.length>=KIT_HAND.min&&c.length<=KIT_HAND.max&&c.length===k.length&&(kd==="hand"||kd==="pick"||!(nb.length&&nb.every(fc)))/* a PERSON picker (EVERY card a person, a «back» card aside) is not a hand: people are chosen on their own kit (portrait picker / thẻ gỗ treo). KK35 (owner 25/11 ~21:50Z «never the old frame»; vnight → «Đêm thị tẩm»): an event choice where only SOME cards name a person («Thì thầm nói xấu …», «Xin cho <con>») stays a hand — that card shows the person as its picture */}catch(e){return false}}
function kitHandCards(g){return[...g.children].filter(b=>b.matches&&b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&!b.classList.contains("kbare")&&(b.getClientRects().length||g.classList.contains("khand")))}
/* SHORT name on the face (owner 24/11 ~15:15Z b): a person named by role + name shows the role only («Theo Tể tướng»), a bracket tail goes
   («Theo phụ thân»); the full title stays in the plate (the parts are only hidden on the face, the plate clone shows them) */
function kitHandShort(b){try{const kan=b.querySelector(".kan");if(!kan)return;/* idempotent: later passes may rewrite the title, so it runs on every lay + title change */
 kan.querySelectorAll(".kname").forEach(k=>{const ti=k.querySelector(":scope>.kti");if(!ti)return;[...k.childNodes].forEach(n=>{if(n!==ti&&!(n.classList&&n.classList.contains("khnx"))&&(n.nodeType===3?n.textContent.trim():1)){const w=document.createElement("span");w.className="khnx";k.insertBefore(w,n);w.appendChild(n)}})});
 const tw=document.createTreeWalker(kan,NodeFilter.SHOW_TEXT);const tx=[];while(tw.nextNode())tx.push(tw.currentNode);
 tx.forEach(n=>{if(n.parentNode&&n.parentNode.closest&&n.parentNode.closest(".khnx"))return;const m=/\s*\([^()]{1,40}\)\s*$/.exec(n.textContent);if(!m||!n.textContent.slice(0,m.index).trim()&&n===tx[0])return;const w=document.createElement("span");w.className="khnx";w.textContent=m[0];n.textContent=n.textContent.slice(0,m.index);n.parentNode.insertBefore(w,n.nextSibling)})}catch(e){}}
function kitHandWide(){try{return kitView().pages===2?1:0}catch(e){return 0}}/* KIT §0: one page (Fold) / two pages (iPad), never a width breakpoint */
function kitHandH(){try{return kitView().h||innerHeight}catch(e){return innerHeight}}
/* layout: slots per card (x, y, rotation) inside the list box; the box gets the hand height; idempotent per (width, count) */
function kitHandLay(g,quiet){try{if(kitHandIsLong(g))return;const bs=kitHandCards(g),n=bs.length;if(!n)return;bs.forEach(kitHandShort);const K=KIT_HAND,ip=kitHandWide(),W=g.clientWidth;if(!W)return;
 const cm=g.dataset.khc==="1";const sig=W+"|"+n+"|"+kitHandH()+"|"+cm;
 const mnW=cm?K.cmpW[ip][0]:K.minW[ip],mxW=cm?K.cmpW[ip][1]:K.maxW[ip],gap=K.gap[ip],side=Math.round(10+mxW*1.5*.045)/* frame padding + what a turned outer card swings out */,fit=Math.max(1,Math.floor((W-2*side+gap)/(mnW+gap)));let rows=Math.ceil(n/fit);const per=Math.ceil(n/rows);
 let cw=Math.min(mxW,(W-2*side-(per-1)*gap)/per);const fs=cw<100?K.nameFs[0]-.5:K.nameFs[ip];
 const face=h=>Math.round(h-10+fs*1.15*3+12);/* picture square (card width − padding) + up to 3 name lines + gaps (no odds meter on the face) */
 let ch=face(cw);const lift=Math.round(ch*K.liftK);
 /* the hand may take at most ~46 % of the screen height (the story text and the speaker keep the rest; law 10) */
 const cap=Math.round(kitHandH()*(n>(ip?5:6)?.46:(ip?.36:.40)));const need=()=>lift+6+rows*ch+(rows-1)*gap+8;
 while(need()>cap&&cw>mnW*.78){cw-=4;ch=face(cw)}
 g.classList.add("khand");g.dataset.khand=n;g.dataset.khrows=rows;g.style.setProperty("--khw",Math.floor(cw)+"px");g.style.setProperty("--khh",ch+"px");g.style.setProperty("--khfs",fs+"px");g.style.setProperty("--khlift",lift+"px");
 let maxY=0;bs.forEach((b,i)=>{const r=Math.floor(i/per),k=i%per,inRow=r<rows-1?per:n-per*(rows-1),rowW=inRow*cw+(inRow-1)*gap,x=(W-rowW)/2+k*(cw+gap),mid=(inRow-1)/2,d=k-mid;
  const rot=rows===1?d*Math.min(2.4,8/Math.max(1,mid)):d*1.1,arc=d*d*(rows===1?Math.min(2.2,10/Math.max(1,mid*mid)):.6),y=lift+6+r*(ch+gap)+arc;maxY=Math.max(maxY,y+ch);
  b.style.setProperty("--kx",Math.round(x)+"px");b.style.setProperty("--ky",Math.round(y)+"px");b.style.setProperty("--kr",rot.toFixed(2)+"deg");b.dataset.khi=i});
 g.style.setProperty("--khH",Math.ceil(maxY+8)+"px");
 const dl=g.closest(".dlg");if(dl){dl.classList.add("khdlg");if(!quiet)try{if(typeof kszEvLaw10==="function")kszEvLaw10(dl);if(typeof kszTextFirst3==="function")kszTextFirst3(dl)}catch(e){}}
 kitHandNameFit(g);const L=g.querySelector(":scope>button.klift");if(L)kitHandPlate(L)}catch(e){console.error("kitHandLay",e)}}
/* KK35 (item 2, OD:L177 a name is never cut; iPad «Đi làm: Thay y phục hay trang sức trong Tư…»): a card name that spills its 3 lines → the WHOLE hand takes the tighter face font (.khn1); still spilling → 4 lines (.khn2). One face size per hand (law 10). */
function kitHandNameFit(g){try{g.classList.remove("khn1","khn2");const over=()=>kitHandCards(g).some(b=>{const k=b.querySelector(".kan");return k&&k.scrollHeight>k.clientHeight+1});if(!over())return;g.classList.add("khn1");if(!over())return;g.classList.add("khn2");if(over())kitHandLongTo(g)}catch(e){}}
/* KK41 (MAIN 157 ruling, OD:L177 a name is never cut, law 11 every hand-face frame): a name that still spills the 4-line face (.khn2) → that frame is NOT a hand:
   it stays the kit LIST card (jopic option rows) and shows the WHOLE name; never cut, never a smaller tier. The mark is keyed to the option names, so a new card set decides again. */
/* KIT §101.12 LONG NAMES (OD 26/11 ~20:45Z ruling (b), CANON OVERWRITE of KK41 «stays the list card»): a name that spills the 4-line face → the frame takes the part of its KIND:
   every card a PERSON → vòng người (kind "ring", RING-BUILD; until the ring lands with the set it keeps the list, never cut) · otherwise (things / acts) → thẻ gỗ treo
   on the stage (kind "pick", §98 kitPick via jkstage kstgPickPlace: a plaque shows the WHOLE name). Info panels never get here (notKinds = list, ruling (c)). */
function kitHandLongTo(g){try{const m=typeof Q!=="undefined"?Q[0]:null;const kd=m?kitKind(m):"";if(kd==="pick")return;/* already thẻ gỗ: the hidden hand face may spill, nobody sees it */
 const c=kitHandCards(g).filter(b=>!b.classList.contains("kback")),fc=b=>/^face/.test(b.dataset.kopic||"")||!!b.querySelector(".kopface");
 if(!m||(c.length&&c.every(fc))){if(m&&!m.kind)m.kind="ring";kitHandLongOff(g);return}
 m.kind="pick";g.__khSig="";requestAnimationFrame(()=>{try{if(g.isConnected&&Q[0]===m){g.__khSig="";kitHandLay(g)}}catch(e){}})}catch(e){console.error("kitHandLongTo",e)}}
function kitHandSig(g){try{return[...g.children].filter(b=>b.tagName==="BUTTON").map(b=>{const k=b.querySelector(".kan");return(k||b).textContent.trim()}).join("\u241e")}catch(e){return""}}
function kitHandIsLong(g){return !!(g&&g.__khLong&&g.__khLong===kitHandSig(g))}
function kitHandLongOff(g){try{g.__khLong=kitHandSig(g);g.__khSig="";g.classList.remove("khand","khn1","khn2","khpre");delete g.dataset.khand;delete g.dataset.khrows;delete g.dataset.khc;["--khw","--khh","--khfs","--khlift","--khH"].forEach(p=>g.style.removeProperty(p));
 [...g.children].forEach(b=>{if(b.tagName!=="BUTTON")return;b.classList.remove("klift","khfly","khfl");delete b.dataset.khi;["--kx","--ky","--kr"].forEach(p=>b.style.removeProperty(p))});kitHandConfOff(g);
 const dl=g.closest(".dlg");if(dl){dl.querySelectorAll(":scope>.khplate,:scope>.khconf").forEach(e=>e.remove());dl.classList.remove("khdlg");if(dl.classList.contains("kstage")&&typeof kstgOff==="function")kstgOff(dl);if(typeof kszLiveRepick3==="function")kszLiveRepick3(dl)}}catch(e){console.error("kitHandLongOff",e)}}
/* KIT §101.10 «LẬT THẺ» — the lifted card FLIPS and its BACK holds the info (owner 26/11 ~20:45Z, verbatim: "như hình 1 khi chọn 1 thẻ, là ngày trên thẻ hiện thông tin,
   chứ không phải 1 chip thông tin ở trên, làm animation kiểu lật thẻ mặt sau, để đọc thông tin á"; CANON OVERWRITE of the §101 details plate above the hand).
   Tap 1 on a card: a reading-size copy of THAT card grows out of it and turns over in 3D (rotateY 0 → 180°, transform only on the copy, never on figures);
   its BACK = the SAME kit card clone the «!» overlay shows (full name · Tốn · Được · Mất · the odds word of the 7-band ladder · Gợi ý; a locked card its kit «why»),
   every number from the kit card (BAL), nothing typed (law 4). The flipped card stands ON its hand card (bottom on the card's bottom, centred on it, inside the frame);
   ✓ / ✕ sit on its lower edge. ✕ / a tap elsewhere = it turns back and shrinks into its card; ✓ = the flipped card flies up, then the frame's own choose path runs.
   ONE part for every hand (kitHand callers + the stage Bàn bài, jkstage kstgPlate uses kitHandFlipPlace). «Cảnh động» off / reduced motion = no motion (kfStill).
   The element keeps the class .khplate (the stage and the tests key on it) + .khflip. Geometry knobs: KIT_HAND.flip. */
KIT_HAND.flip={wK:2.15,minW:[216,236],maxW:[292,300],ms:420,backMs:260,fs:[28,26,24,22,20,18,17,16,15,14,13]/* back type scale px: the largest that fits the card wins */};
function kitHandFlipBuild(b,z){const c=b.cloneNode(true);c.removeAttribute("id");c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));c.querySelectorAll(".kaart,.kobang,.kfill,.kdup,.kdup0").forEach(e=>e.remove());c.querySelectorAll(".kofold").forEach(e=>e.classList.remove("kofold"));
 c.querySelectorAll(".kr-ton,.kr-duoc").forEach(r=>{if(!r.querySelector(".krv > *")&&!(r.querySelector(".krv")||{}).textContent)r.remove()});
 ["--kx","--ky","--kr","--k3s","min-height"].forEach(p=>c.style.removeProperty(p));c.classList.remove("kopt","kart","klift","kfdown","khfl");c.classList.add("kopinfo");if(b.disabled)c.classList.add("khlock");c.disabled=true;c.type="button";c.removeAttribute("data-m");c.removeAttribute("data-khi");c.removeAttribute("aria-pressed");
 /* front = the card face as it lies in the hand (its picture + short name), seen only during the first half of the turn */
 const f=document.createElement("div");f.className="khff";const im=b.querySelector(".kaart img");if(im){const i=document.createElement("img");i.src=im.currentSrc||im.src;i.alt="";f.appendChild(i)}
 const n=document.createElement("div");n.className="khffn";const kan=b.querySelector(".kan");if(kan){const k=kan.cloneNode(true);k.querySelectorAll(".khnx").forEach(e=>e.remove());n.textContent=k.textContent.trim()}f.appendChild(n);const hn=document.createElement("div");hn.className="khffh";hn.textContent="Chạm vào lá để lật xem";f.appendChild(hn);
 const bk=document.createElement("div");bk.className="khfb";bk.appendChild(c);const fi=document.createElement("div");fi.className="khfi";fi.appendChild(f);fi.appendChild(bk);z.innerHTML="";z.appendChild(fi);z.__khFor=b}
/* place the flipped card ON its hand card: width from the card (wK), bottom = the card's resting bottom, centred on it inside [L,R]; height = its back, at most up to top0 (then the back scrolls) */
function kitHandFlipPlace(b,z,dl,top0,L,R){try{const K=KIT_HAND.flip,ip=kitHandWide(),D=dl.getBoundingClientRect(),g=b.parentElement,B=b.getBoundingClientRect(),G=g.getBoundingClientRect();
 const lift=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0,cw=parseFloat(getComputedStyle(g).getPropertyValue("--khw"))||B.width,ch=parseFloat(getComputedStyle(g).getPropertyValue("--khh"))||B.height;
 L=L==null?D.left+8:L;R=R==null?D.right-8:R;let w=Math.round(Math.min(R-L,K.maxW[ip],Math.max(K.minW[ip],cw*K.wK)));const asp=ch/cw;/* owner 26/11 ~22:07Z: the enlarged card and its back keep the CARD's own shape */
 /* the card's resting slot (the lift transition may still run): list box top + its --ky */
 const ky=parseFloat(b.style.getPropertyValue("--ky"))||0,bot=Math.min(D.bottom-4,G.top+ky+ch+2);const s=KIT_HAND.confPx,room=Math.round(s*.5);
 z.style.width=w+"px";z.style.maxHeight="";z.style.height="";z.style.top="auto";const fb=z.querySelector(".khfb");if(fb)fb.style.maxHeight="";
 const top=Math.max(D.top+4,top0==null?D.top+4:top0),maxH=Math.max(120,Math.round(bot-room-top));let h=Math.round(w*asp);if(h>maxH){h=maxH;w=Math.round(h/asp)}z.style.width=w+"px";
 z.style.height=h+"px";if(fb){fb.style.maxHeight=h+"px";/* fill: the largest step of the kit scale whose content fits the back */const F=K.fs;let i=0;for(;i<F.length;i++){fb.style.setProperty("--khbfs",F[i]+"px");if(fb.scrollHeight<=fb.clientHeight+1)break}if(i>=F.length)fb.style.setProperty("--khbfs",F[F.length-1]+"px")}
 const x=Math.round(Math.max(L,Math.min(R-w,B.left+B.width/2-w/2)));z.style.left=(x-D.left)+"px";z.style.bottom=Math.round(D.bottom-(bot-room))+"px";
 z.__khRect={l:x-D.left,t:bot-room-h-D.top,w,h};kitHandConf(b)}catch(e){console.error("kitHandFlipPlace",e)}}
/* the 3D turn: the copy starts exactly over the hand card (scale) at 0°, ends at reading size at 180°; back = the reverse */
function kitHandFlipGo(b,z,back,done){try{const fi=z.querySelector(".khfi");if(kitHandStill()||!z.animate||!fi){if(done)done();return}const K=KIT_HAND.flip,R=z.getBoundingClientRect(),B=b.getBoundingClientRect();if(!R.width||!R.height){if(done)done();return}
 const from=`translate(${Math.round(B.left-R.left)}px,${Math.round(B.top-R.top)}px) scale(${(B.width/R.width).toFixed(3)},${(B.height/R.height).toFixed(3)})`,ms=back?K.backMs:K.ms,E="cubic-bezier(.3,.7,.3,1)";
 z.style.transformOrigin="0 0";const a=z.animate(back?[{transform:"none"},{transform:from}]:[{transform:from},{transform:"none"}],{duration:ms,easing:E,fill:back?"forwards":"none"});
  if(done)a.onfinish=done}catch(e){if(done)done()}}
function kitHandPlate(b){try{const g=b.parentElement,dl=g&&g.closest(".dlg");if(!dl)return;let z=dl.querySelector(":scope>.khplate");if(!z){z=document.createElement("div");z.className="khplate khflip";z.setAttribute("role","status");dl.appendChild(z)}
 z.classList.add("khflip");z.classList.toggle("khstill",kitHandStill());const fresh=z.hidden||z.__khFor!==b;if(fresh){z.classList.remove("khback");z.getAnimations&&z.getAnimations({subtree:true}).forEach(a=>a.cancel());kitHandFlipBuild(b,z)}z.hidden=false;
 const hd=dl.querySelector(":scope>.kph"),D=dl.getBoundingClientRect(),top0=(hd&&hd.getClientRects().length?hd.getBoundingClientRect().bottom:D.top)+6,G=g.getBoundingClientRect();
 kitHandFlipPlace(b,z,dl,top0,Math.max(D.left+8,Math.min(G.left,D.right-8-KIT_HAND.flip.maxW[kitHandWide()])),Math.min(D.right-8,Math.max(G.right,D.left+8+KIT_HAND.flip.maxW[kitHandWide()])));
 b.classList.add("khfl");if(fresh&&!kitHandStill()){const cf=dl.querySelector(":scope>.khconf");if(cf)cf.style.opacity="0";/* ✓ / ✕ show when the turn ends */Promise.resolve().then(()=>{if(z.__khFor===b&&!z.hidden)kitHandFlipGo(b,z,false,()=>{if(cf)cf.style.opacity=""});else if(cf)cf.style.opacity=""})}}catch(e){console.error("kitHandPlate",e)}}
/* ✓ / ✕ CONFIRM (owner 25/11 ~21:55Z, replaces «tap again = choose», law 14): green ✓ = choose this card, ✕ = put it back (look at the others).
   §101.10: they sit on the FLIPPED card's lower edge (centred, half over its border), never above the hand. Tapping the flipped card does nothing; tapping another card lifts that one.
   One part for every hand (and the same rule for the thẻ gỗ picker kitPick). Size = KIT_HAND.confPx (kit tap size). */
function kitHandConf(b){try{const g=b&&b.parentElement,dl=g&&g.closest(".dlg");if(!dl)return;let c=dl.querySelector(":scope>.khconf");
 if(!b.classList.contains("klift")){if(c)c.hidden=true;return}
 if(!c){c=document.createElement("div");c.className="khconf";c.innerHTML=`<button type="button" class="khok" aria-label="Chọn lá này">✓</button><button type="button" class="khx" aria-label="Đặt lại">✕</button>`;dl.appendChild(c)}
 /* a LOCKED card flips too: ✕ alone (same 2-button kit form, no ✓; KK46 review) */const ok=c.querySelector(".khok");if(ok)ok.hidden=!!b.disabled;
 c.hidden=false;const D=dl.getBoundingClientRect(),s=KIT_HAND.confPx,gap=Math.round(s*.6),w=(b.disabled?1:2)*s+(b.disabled?0:gap);const z=dl.querySelector(":scope>.khplate:not([hidden])"),Rz=z&&z.__khRect;
 let x,y;if(Rz){x=Math.round(Rz.l+Rz.w/2-w/2);y=Math.round(Rz.t+Rz.h-s*.5)}else{const B=b.getBoundingClientRect();x=Math.round(B.right-D.left-w+s*.35);y=Math.round(B.top-D.top-s*.55)}
 x=Math.max(4,Math.min(D.width-w-4,x));y=Math.max(4,Math.min(D.height-s-2,y));c.style.left=x+"px";c.style.top=y+"px";c.style.gap=gap+"px";c.style.setProperty("--khcs",s+"px")}catch(e){console.error("kitHandConf",e)}}
function kitHandConfOff(g){const dl=g&&g.closest&&g.closest(".dlg"),c=dl&&dl.querySelector(":scope>.khconf");if(c){c.hidden=true;c.style.opacity=""}}
function kitHandStill(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
/* drop: the flipped card turns back and shrinks into its hand card (anim = false when another card is lifted at once) */
function kitHandDrop(g,anim){if(!g)return;const dl=g.closest(".dlg"),z=dl&&dl.querySelector(":scope>.khplate");const L=g.querySelector(":scope>button.klift");
 g.querySelectorAll(":scope>button.klift").forEach(x=>{x.classList.remove("klift");x.removeAttribute("aria-pressed")});kitHandConfOff(g);
 if(!z||z.hidden){g.querySelectorAll(":scope>button.khfl").forEach(x=>x.classList.remove("khfl"));return}
 const end=()=>{if(z.__khFor===L||!L){z.hidden=true;z.getAnimations&&z.getAnimations({subtree:true}).forEach(a=>a.cancel());z.__khFor=null}if(L&&!L.classList.contains("klift"))L.classList.remove("khfl")};
 if(anim&&L&&L.isConnected)kitHandFlipGo(L,z,true,end);else{g.querySelectorAll(":scope>button.khfl").forEach(x=>x.classList.remove("khfl"));z.hidden=true;z.__khFor=null}}
function kitHandLift(b){const g=b.parentElement;if(!g||g.__khBusy)return;if(b.classList.contains("klift"))return;kitHandDrop(g,false);b.classList.add("klift");b.setAttribute("aria-pressed","true");kitHandPlate(b)}
/* choose: the FLIPPED card flies up a little and fades, the rest sink; then the frame's own choose path (a synthetic click = detail 0, passes the two-tap gate) */
function kitHandChoose(b){const g=b.parentElement;if(!g||g.__khBusy)return;g.__khBusy=1;window.__khFlyT=performance.now();const dl=g.closest(".dlg"),z=dl&&dl.querySelector(":scope>.khplate:not([hidden])");
 const go=()=>{g.__khBusy=0;if(z){z.hidden=true;z.__khFor=null}b.classList.remove("khfl");if(b.isConnected)b.click()};kitHandConfOff(g);
 if(kitHandStill()||!b.animate){go();return}
 const rot=b.style.getPropertyValue("--kr")||"0deg",lift=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0,ms=KIT_HAND.flyMs;
 if(z)z.animate([{transform:"none",opacity:1},{transform:"translateY(-46px) scale(1.06)",opacity:0}],{duration:ms,easing:"cubic-bezier(.3,.6,.4,1)",fill:"forwards"});
 else b.animate([{transform:`translateY(${-lift}px) rotate(0deg)`,opacity:1},{transform:`translateY(${-lift-46}px) scale(1.12)`,opacity:0}],{duration:ms,easing:"cubic-bezier(.3,.6,.4,1)",fill:"forwards"});
 kitHandCards(g).filter(x=>x!==b).forEach(x=>x.animate([{transform:`translateY(0px) rotate(${x.style.getPropertyValue("--kr")||"0deg"})`,opacity:1},{transform:`translateY(26px) rotate(${x.style.getPropertyValue("--kr")||"0deg"})`,opacity:0}],{duration:ms-40,easing:"ease-in",fill:"forwards"}));
 setTimeout(go,ms)}
/* deal-in: once per frame card (Q[0]), cards come from below-right to their slots, one by one */
const KH_DEALT=new WeakSet(),KH_PEND=new WeakSet();
function kitHandDeal(g,m){try{if(!m||KH_DEALT.has(m))return;KH_DEALT.add(m);if(kitHandStill())return;
 /* paint-ready first (MD4 lesson): the frame's own pictures decode and its late re-fits run BEFORE the cards fly (they were long frames in the middle of the deal); cards wait hidden, at most KIT_HAND.readyMs */
 g.classList.add("khpre");const dl=g.closest(".dlg");const ims=dl?[...dl.querySelectorAll("img")].filter(i=>i.getClientRects().length):[];
 const ready=Promise.race([Promise.all(ims.map(i=>(i.complete?(i.decode?i.decode():Promise.resolve()):new Promise(r=>{i.addEventListener("load",r,{once:true});i.addEventListener("error",r,{once:true})})).catch(()=>0))),new Promise(r=>setTimeout(r,KIT_HAND.readyMs))]);
 KH_PEND.add(m);ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))).then(()=>{KH_PEND.delete(m);/* the frame may have been rebuilt meanwhile (a new list element): deal the hand that is on screen now */const g2=g.isConnected?g:document.querySelector("#modal:not([hidden]) .opts.khand");if(g2&&(typeof Q==="undefined"||Q[0]===m))kitHandDealGo(g2);else if(g2)g2.classList.remove("khpre")})}catch(e){g.classList.remove("khpre");console.error("kitHandDeal",e)}}
function kitHandDealGo(g){try{const bs=kitHandCards(g),G=g.getBoundingClientRect(),K=KIT_HAND;g.classList.remove("khpre");window.__khDealT=performance.now();/* probe: dev/test/kit-hand-perf.js */
 bs.forEach((b,i)=>{const x=parseFloat(b.style.getPropertyValue("--kx"))||0,rot=b.style.getPropertyValue("--kr")||"0deg",dx=Math.round(G.width-x+20),dy=Math.round(Math.max(60,G.height*1.2));
  b.animate([{transform:`translate(${dx}px,${dy}px) rotate(14deg) scale(.7)`,opacity:0},{transform:`translate(${Math.round(dx*.12)}px,${Math.round(dy*.06)}px) rotate(${rot})`,opacity:1,offset:.75},{transform:`translateY(0px) rotate(${rot})`,opacity:1}],{duration:K.dealMs,delay:i*K.dealStep,easing:"cubic-bezier(.25,.8,.3,1)",fill:"backwards"})})}catch(e){console.error("kitHandDeal",e)}}
/* apply to the frame on screen: every pass of showModal (outermost wrapper) + late re-layouts (ResizeObserver) */
function kitHand(M){try{M=M||document.getElementById("modal");if(!M||M.hidden)return;M.querySelectorAll(".opts").forEach(g=>{if(!kitHandOn(g)){if(g.classList.contains("khand")){g.classList.remove("khand");delete g.dataset.khand}return}
  kitHandLay(g);if(!g.classList.contains("khand"))return;/* KK41: a long-name list is no hand */const m0=typeof Q!=="undefined"?Q[0]:null;if(m0&&KH_PEND.has(m0))g.classList.add("khpre");/* a rebuilt list while the deal waits stays hidden too */kitHandDeal(g,m0);
  if(!g.__khMO&&typeof MutationObserver==="function"){g.__khMO=new MutationObserver(()=>{try{g.__khMO.disconnect();kitHandCards(g).forEach(kitHandShort)}finally{g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}});g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}
  if(!g.__khRO&&typeof ResizeObserver==="function"){g.__khRO=new ResizeObserver(()=>{if(!g.isConnected||g.__khBusy)return;cancelAnimationFrame(g.__khRaf);g.__khRaf=requestAnimationFrame(()=>kitHandLay(g))});g.__khRO.observe(g)}});
 /* KK35: a REUSED dialog whose new card is no hand (a notice after a hand frame) keeps no hand / stage classes, figures or scene (the next frame decides again) */
 M.querySelectorAll(".dlg.khdlg,.dlg.kstage").forEach(dl=>{if(dl.querySelector(".opts.khand"))return;dl.classList.remove("khdlg");if(dl.classList.contains("kstage")&&typeof kstgOff==="function")kstgOff(dl)})}catch(e){console.error("kitHand",e)}}
window.kitHand=kitHand;window.kitHandWants=kitHandWants;window.kitHandLay=kitHandLay;window.KIT_HAND=KIT_HAND;
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const M=document.getElementById("modal");if(M&&!M.hidden){kitHand(M);requestAnimationFrame(()=>kitHand(M))}}catch(e){console.error("kitHand",e)}return r}})();
/* the two-tap gate (capture, before #modal onclick): a REAL tap (detail ≥ 1) on a resting card lifts it; on the lifted card it chooses (with the fly); a tap elsewhere in the frame drops the lifted card */
document.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;
 const cf=t.closest("#modal .dlg>.khconf>button");/* the hand's own ✓/✕ (a kitPick .kpk-conf inside the stage is its own part) */if(cf){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const dl=cf.closest(".dlg"),L=dl&&dl.querySelector(".opts.khand>button.klift");if(!L)return;
  if(cf.classList.contains("khok"))kitHandChoose(L);else kitHandDrop(L.parentElement,true);return}
 const b=t.closest("#modal .opts.khand > button.kopt");
 if(!b){const g=t.closest("#modal .opts.khand");if(g){/* a tap that landed on the list box: a locked card under the finger (browsers that swallow events on disabled buttons) */const hit=kitHandCards(g).find(x=>{const r=x.getBoundingClientRect();return x.disabled&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom});if(hit){e.stopPropagation();kitHandLift(hit);return}}
  {const zp=t.closest("#modal .dlg>.khplate.khflip");if(zp&&!zp.hidden){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();zp.classList.toggle("khback");return}}/* §101.10 tap 2 on the enlarged card = it turns over (tap again = front) */
  if(t.closest("#modal")&&!t.closest(".khplate,.khconf,#kpinfo,#kpop"))document.querySelectorAll("#modal .opts.khand").forEach(g=>kitHandDrop(g,true));return}
 if(e.detail===0||b.disabled)return;/* keyboard / robot / synthetic click: chooses at once (unchanged path) */
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(b.parentElement.__khBusy)return;if(!b.classList.contains("klift"))kitHandLift(b)/* the lifted card body: nothing (✓ chooses) */}catch(x){console.error("kitHand tap",x)}},true);
/* a locked card: pointerdown lands on the disabled button (Chrome / Safari) → lift + plate with its kit «why» (jfx kfLocked skips hand cards) */
document.addEventListener("pointerdown",e=>{try{if(e.button>0)return;const b=e.target&&e.target.closest&&e.target.closest("#modal .opts.khand > button.kopt:disabled");if(b)kitHandLift(b)}catch(x){}},{capture:true,passive:true});
(function(){const st=document.createElement("style");st.id="kit-hand";st.textContent=`
html body #modal#modal#modal#modal .opts.khand{display:block!important;position:relative!important;height:var(--khH)!important;min-height:0!important;max-height:none!important;overflow:visible!important;padding:0!important;margin:4px 0 2px!important;flex:none!important;grid-template-columns:none!important;contain:layout}
html body #modal#modal#modal#modal .opts.khand>button.kopt{position:absolute!important;left:var(--kx)!important;top:var(--ky)!important;width:var(--khw)!important;height:var(--khh)!important;min-height:0!important;max-width:none!important;min-width:0!important;margin:0!important;padding:5px 5px 6px!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;justify-content:flex-start!important;gap:4px!important;grid-column:auto!important;
 transform:translateY(var(--kyo,0px)) rotate(var(--kr,0deg));transform-origin:50% 115%;transition:transform .18s cubic-bezier(.2,.8,.3,1);border-radius:10px!important;box-shadow:0 2px 6px rgba(60,30,10,.22);text-align:center!important;overflow:hidden!important;backface-visibility:hidden}
html body #modal#modal#modal#modal .opts.khand>button.kopt>.kaart{position:relative!important;flex:none!important;width:100%!important;height:auto!important;aspect-ratio:1/1;margin:0!important;left:auto!important;top:auto!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt>.kaart>figure{width:100%!important;height:100%!important;margin:0!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt>.kabody{flex:1 1 auto!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;min-width:0!important;width:100%!important;padding:0!important;margin:0!important;transform:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kat{display:flex!important;flex-direction:column!important;align-items:center!important;gap:4px!important;min-height:0!important;width:100%!important;padding:0!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kan{font-size:var(--khfs)!important;line-height:1.15!important;text-align:center!important;white-space:normal!important;display:-webkit-box!important;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden!important;max-width:100%!important;width:auto!important;flex:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kodds{display:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .khnx{display:none!important}/* face = picture + short name only; the odds word lives in the plate */
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb,html body #modal#modal#modal#modal .opts.khand>button.kopt>.kobang,html body #modal#modal#modal#modal .opts.khand>button.kopt .kwhy,html body #modal#modal#modal#modal .opts.khand>button.kopt small:not(.kodds *){display:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt.klift{--kyo:calc(var(--khlift) * -1);--kr:0deg;z-index:3;box-shadow:0 0 0 2px var(--k-gold,#c9a24a),0 10px 20px rgba(60,30,10,.32)}
html body #modal#modal#modal#modal .opts.khand>button.kopt:disabled{filter:grayscale(.55) brightness(.96)}
html body #modal#modal#modal#modal .opts.khand>button.kopt:disabled.klift{filter:none}
#modal .dlg.khdlg{position:relative}
html body #modal#modal#modal#modal .opts.khand.khpre>button.kopt{opacity:0}
html body #modal#modal#modal#modal .dlg:not(.khmeas) .k3right>.opts.khand,html body #modal#modal#modal#modal .dlg:not(.khmeas) #mb>.opts.khand{position:sticky!important;bottom:0;z-index:2;background:var(--k-card,#fffaf0)}/* the hand never scrolls out of view: a long story scrolls under it */
html body #modal#modal#modal#modal .k3right>.opts.khand{margin-top:auto!important}
#modal .dlg>.khconf,.khconf{position:absolute;z-index:8;display:flex;gap:6px;pointer-events:auto}
.khconf[hidden],.khconf>button[hidden]{display:none!important}
#modal .dlg>.khconf>button,.khconf>button{width:var(--khcs,44px);height:var(--khcs,44px);min-width:0;min-height:0;padding:0;margin:0;border-radius:50%;display:grid;place-items:center;font-size:calc(var(--khcs,44px)*.5);font-weight:800;line-height:1;cursor:pointer;box-shadow:0 3px 10px #0005;border:2px solid #fffaf0}
#modal .dlg>.khconf>.khok .kmk,.khconf>.khok .kmk{background:#fff!important;color:#fff!important;width:.95em;height:.95em;margin:0!important;vertical-align:0}
#modal .dlg>.khconf>.khok,.khconf>.khok{background:#2f8a3e;color:#fff}
#modal .dlg>.khconf>.khx,.khconf>.khx{background:#fffaf0;color:#7a2a1c;border-color:var(--k-gold,#c9a24a)}
#modal .dlg>.khconf>button:active,.khconf>button:active{transform:scale(.92)}
#modal .dlg>.khplate{position:absolute;z-index:6;pointer-events:auto;perspective:1100px}/* §101.10 the flipped card: taps on it do nothing (never fall through to the cards under it) */
#modal .dlg>.khplate[hidden]{display:none}
#modal .dlg>.khplate>.khfi{position:relative;width:100%;height:100%;transform:rotateY(0deg);transform-style:preserve-3d;transition:transform .42s cubic-bezier(.3,.7,.3,1)}
#modal .dlg>.khplate.khback>.khfi{transform:rotateY(180deg)}
#modal .dlg>.khplate.khstill>.khfi{transition:none}
#modal .dlg>.khplate .khff>.khffh{position:absolute;top:12px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:.78rem;font-weight:700;color:#7a4a14;line-height:1.2;padding:2px 10px;border-radius:999px;background:#fffaf0e8;box-shadow:0 0 0 1px var(--k-gold,#c9a24a)}
#modal .dlg>.khplate .khff,#modal .dlg>.khplate .khfb{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;background:var(--k-card,#fffaf0);box-shadow:0 0 0 2px var(--k-gold,#c9a24a),0 10px 22px rgba(60,30,10,.34)}
#modal .dlg>.khplate .khff{display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px 6px calc(var(--khcs,44px) * .62);overflow:hidden}/* the name stays above ✓ / ✕ on the lower edge */
#modal .dlg>.khplate .khff>img{width:100%;flex:1 1 auto;min-height:0;object-fit:cover;border-radius:8px}
#modal .dlg>.khplate .khff>.khffn{font-weight:700;text-align:center;color:var(--ink,#2a1a12);line-height:1.15}
#modal .dlg>.khplate .khfb{transform:rotateY(180deg);overflow:auto;overscroll-behavior:contain;padding:10px 10px calc(var(--khcs,44px) * .62);display:flex;flex-direction:column;justify-content:center;font-size:var(--khbfs,16px)}/* MAIN 165 rec: the back is FILLED — its type from ONE kit scale (KIT_HAND.flip.fs, largest that fits), content centred */
#modal .dlg>.khplate .khfb>button.kopinfo{font-size:1em!important;width:100%;margin:0;flex:none;box-shadow:none!important;border:0!important;text-align:left;opacity:1!important;filter:none!important;background:transparent!important;color:var(--ink,#2a1a12)!important;cursor:default;pointer-events:none}
#modal .dlg>.khplate .khfb>button.kopinfo:not(.khlock) .kodds{filter:none!important;opacity:1!important}/* the back is a disabled COPY: its meter keeps the live colours unless the card is locked */
html body #modal#modal#modal#modal .opts.khand>button.kopt.khfl{opacity:0!important}
#modal .dlg>.khplate .khfb>button.kopinfo .kabody{display:flex!important;flex-direction:column!important;gap:6px!important;width:100%!important;padding:0!important;transform:none!important}
#modal .dlg>.khplate .khfb>button.kopinfo .kat{display:flex!important;flex-direction:column!important;align-items:center!important;gap:6px!important;padding:0 0 6px!important;border-bottom:1px solid var(--k-gold,#c9a24a)}
#modal .dlg>.khplate .khfb>button.kopinfo .kan{font-size:1.18em!important;font-weight:800!important;line-height:1.2!important;text-align:center!important;color:var(--ink,#2a1a12)!important;opacity:1!important;white-space:normal!important;-webkit-line-clamp:unset!important;display:block!important}
#modal .dlg>.khplate .khfb>button.kopinfo .kb{display:flex!important;flex-direction:column!important;gap:.45em!important;font-size:1em!important;line-height:1.3!important;color:var(--ink,#2a1a12)!important;opacity:1!important}
#modal .dlg>.khplate .khfb>button.kopinfo .kb .krl{color:#8a5a1c!important;opacity:1!important;font-weight:700!important}
#modal .dlg>.khplate .khfb>button.kopinfo .kb .krv,#modal .dlg>.khplate .khfb>button.kopinfo .kb .krv *{color:var(--ink,#2a1a12)!important;opacity:1!important}
#modal .dlg>.khplate .khfb>button.kopinfo .kwhy{display:block!important;color:#7a2a1c!important;font-weight:700!important;opacity:1!important}/* the hand card under its flipped copy */`;document.head.appendChild(st)})();
/* KK35 — a PERSON card inside a hand (the option names her: «Thì thầm nói xấu …», kopic face:avatar) shows her PORTRAIT as the card picture,
   like kitOptLead: the avatar's frame / crest / gem / tassel stay off the face (they overflowed onto the name); the role tag keeps a space before it. */
(function(){const st=document.createElement("style");st.id="kit-hand-face";const P="html body #modal#modal#modal#modal .opts.khand>button.kopt.kopav";
st.textContent=`${P}>.kaart{overflow:hidden!important;display:block!important}
${P}>.kaart>.md{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;margin:0!important;transform:none!important}
${P}>.kaart>.md>.kin{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;transform:none!important}
${P}>.kaart>.md .kfr,${P}>.kaart>.md .kcrest,${P}>.kaart>.md .kgem,${P}>.kaart>.md .klab{display:none!important}
${P}>.kaart>.md .kbg,${P}>.kaart>.md .kpor{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;object-fit:cover;object-position:50% 12%;border-radius:inherit}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kan>.kname:not(:first-child){margin-left:.28em}`;document.head.appendChild(st)})();
(function(){const st=document.createElement("style");st.id="kit-hand-namefit";const P="html body #modal#modal#modal#modal .opts.khand";
st.textContent=`${P}.khn1>button.kopt .kan{font-size:calc(var(--khfs) * .88)!important;letter-spacing:-.1px}
${P}.khn2>button.kopt .kan{font-size:calc(var(--khfs) * .82)!important;-webkit-line-clamp:4!important;line-height:1.1!important}`;document.head.appendChild(st)})();
