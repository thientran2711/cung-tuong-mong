/* ===== KIT §101 kitHand «BÀN BÀI» — event choices as a HAND OF CARDS (owner 24/11 ~15:15Z mẫu 1 GO + 25/11 ~15:12Z «cho kiểu animation game đi»; KK30, review/kit-hand)
   ONE place, every event-choice frame: an option list (`#modal .opts`) of 2–7 kit option cards (§101.11) (`button.ka.kopt`, jopic §6.2b) becomes a hand.
   - Card face = the option's own picture (.kaart) + its SHORT name (.kan) + its Tốn line (§101.10, owner 26/11 ~23:58Z «info on the FRONT»; the odds word / Được / Mất show on the enlarged card).
   - Tap = the card ENLARGES in the centre with ONE «Chọn» under it (KIT §101.10, Game-of-Dice, NO FLIP); tap another = switch, tap elsewhere = back; «Chọn» = the card flies up, then the frame's own choose path runs (#modal onclick → chooseM, unchanged).
   - Keyboard / robot / synthetic clicks (event.detail === 0) choose at once, as before (data-m and every data attribute the tests and the harness read stay on the same buttons).
   - All cards visible, no scroll: one row when they fit at the minimum card width, else 2 (3 on a narrow phone) rows; ONE card size per hand (law 10).
   - Smooth: deal-in, lift and fly are transform/opacity on the CARDS only (never on figures, never a cross-fade of two screens); «Cảnh động» off / reduced motion = no animation (kfStill).
   Numbers: geometry knobs here (KIT_HAND, layout px like KIT_OPT); every game number on the cards comes from the kit card (BAL), nothing typed (law 4). */
const KIT_HAND={min:2,max:10/* KIT §101.11 (owner 26/11 ~22:43Z «không bắt buộc max 7 lá, những option nào cần nhiều hơn 7 lá thì cứ giữ»; no paging, 21:25Z): every card of a hand shows at once (2–3 rows); > max = not a hand (list) */,gap:[8,12],minW:[88,100],maxW:[128,124],cmpW:[[74,92],[78,92]]/* compact hand [min,max] per view: a long story keeps its text readable */,nameFs:[12.5,14],liftK:.13,dealMs:420,readyMs:700,dealStep:70,flyMs:260,notKinds:["info","rule","help"]/* KK36 (MAIN 151, KK35 question): an INFO panel (kitPanel kind) whose options are shortcut cards («Mục tiêu chương» «Đi làm: …») is never a hand / stage — one panel = one look */};
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
function kitHandWants(g){try{if(!g||!g.closest||g.closest(".pc,.kpdlg"))return false;if(typeof Q!=="undefined"&&Q[0]&&(Q[0].tabdoor||Q[0].pid==="door"))return false;/* R14 (owner OD 27/11 ~06:42Z, whole group): a choice she opened herself (KIT_ACT_PIDS pickers: vlget «Tìm mạng che mặt», gift / plant / taint / evidence pickers, shop, entourage, an act, ownAct — jksize kszOwnAct3, the kit's own «not an event») keeps the LIVE frame; found by tab-hand-crawl on iPad (vlget, 5 cards) */if(typeof Q!=="undefined"&&Q[0]&&typeof kszOwnAct3==="function"&&kszOwnAct3(Q[0]))return false;/* R11 (owner 27/11 ~06:42Z): the hand is for EVENT pop-ups only; a tab door (DOOR.card) keeps the LIVE frame */const kd=kitKindOf(g);if(kd&&KIT_KIND.hands.indexOf(kd)<0)return false;/* §101.9: a ring / group / list frame is never a hand */const k=[...g.children].filter(b=>b.tagName==="BUTTON"),c=k.filter(b=>b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&!b.classList.contains("kbare"));const fc=b=>/^face/.test(b.dataset.kopic||"")||!!b.querySelector(".kopface"),nb=c.filter(b=>!b.classList.contains("kback"));if(kitHandIsLong(g))return false;/* KK41 (MAIN 157 ruling on the j7c iPad CUT): a name longer than the 4-line face keeps the LIST card */let N=c.length;try{const m=typeof Q!=="undefined"&&Q[0];if(m&&m.kipOnly instanceof Set&&m.opts&&g.closest("#modal")&&typeof kszOptN3==="function")N=kszOptN3(g,m)}catch(e){}/* K-LIST-PAGE (picker-dom): a paged item pick grid draws one page of cards; it is judged by ALL its options (= the cards LIVE draws), so a 30-piece chest is never a «hand» */return N>=KIT_HAND.min&&N<=KIT_HAND.max&&c.length===k.length&&(kd==="hand"||kd==="pick"||!(nb.length&&nb.every(fc)))/* a PERSON picker (EVERY card a person, a «back» card aside) is not a hand: people are chosen on their own kit (portrait picker / thẻ gỗ treo). KK35 (owner 25/11 ~21:50Z «never the old frame»; vnight → «Đêm thị tẩm»): an event choice where only SOME cards name a person («Thì thầm nói xấu …», «Xin cho <con>») stays a hand — that card shows the person as its picture */}catch(e){return false}}
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
 const mnW=cm?K.cmpW[ip][0]:K.minW[ip],mxW=cm?K.cmpW[ip][1]:K.maxW[ip],gap=K.gap[ip],side=Math.round(10+mxW*1.75*.07)/* frame padding + what a turned outer card swings out (the face is ~1.75 × its width with the Tốn line, §101.10) */,fit=Math.max(1,Math.floor((W-2*side+gap)/(mnW+gap)));let rows=Math.ceil(n/fit);const per=Math.ceil(n/rows);
 let cw=Math.min(mxW,(W-2*side-(per-1)*gap)/per);const fs=cw<100?K.nameFs[0]-.5:K.nameFs[ip];
 const face=h=>{const tl=kitHandTonL(bs,h,fs);return Math.round(h-10+fs*1.15*3+12+(tl?tl*fs*.84*1.2+4:0))};/* picture square (card width − padding) + up to 3 name lines + the Tốn line(s) (§101.10, info on the FRONT) + gaps */
 let ch=face(cw);const lift=Math.round(ch*K.liftK);
 /* the hand may take at most ~46 % of the screen height (the story text and the speaker keep the rest; law 10) */
 const cap=g.__khCap?g.__khCap():Math.round(kitHandH()*(n>(ip?5:6)?.46:(ip?.36:.40)));/* kitHand.mount: the host may set its own cap (o.maxH) */const need=()=>lift+6+rows*ch+(rows-1)*gap+8;
 while(need()>cap&&cw>mnW*.78){cw-=4;ch=face(cw)}
 g.style.setProperty("--khtl",kitHandTonL(bs,cw,fs)||1);try{/* measured (the hand is on screen): any Tốn line still cut gets one more line, up to 4 (R10, X08) */for(let k=0;k<3;k++){const cut=bs.some(b=>{const r=b.querySelector(".kb>.kr-ton");return r&&r.getClientRects().length&&r.scrollHeight>r.clientHeight+1});if(!cut)break;g.style.setProperty("--khtl",String(Math.min(4,(+g.style.getPropertyValue("--khtl")||1)+1)))}}catch(e){}
 /* KIT_CHECKLIST C6 (OD:L317): an enabled card is never after a dimmed one — locked cards go last (order otherwise kept) */try{bs.filter(x=>x.disabled).forEach(x=>g.appendChild(x))}catch(e){}
 g.classList.add("khand");g.dataset.khand=n;g.dataset.khrows=rows;g.style.setProperty("--khw",Math.floor(cw)+"px");g.style.setProperty("--khh",ch+"px");g.style.setProperty("--khfs",fs+"px");g.style.setProperty("--khlift",lift+"px");
 let maxY=0;bs.forEach((b,i)=>{const r=Math.floor(i/per),k=i%per,inRow=r<rows-1?per:n-per*(rows-1),rowW=inRow*cw+(inRow-1)*gap,x=(W-rowW)/2+k*(cw+gap),mid=(inRow-1)/2,d=k-mid;
  const rot=rows===1?d*Math.min(2.4,8/Math.max(1,mid)):d*1.1,arc=d*d*(rows===1?Math.min(2.2,10/Math.max(1,mid*mid)):.6),y=lift+6+r*(ch+gap)+arc;maxY=Math.max(maxY,y+ch);
  b.style.setProperty("--kx",Math.round(x)+"px");b.style.setProperty("--ky",Math.round(y)+"px");b.style.setProperty("--kr",rot.toFixed(2)+"deg");b.dataset.khi=i});
 g.style.setProperty("--khH",Math.ceil(maxY+8)+"px");
 const dl=g.closest(".dlg,.khost");if(dl){dl.classList.add("khdlg");if(!quiet&&dl.classList.contains("dlg"))try{if(typeof kszEvLaw10==="function")kszEvLaw10(dl);if(typeof kszTextFirst3==="function")kszTextFirst3(dl)}catch(e){}}
 kitHandNameFit(g);const L=g.querySelector(":scope>button.klift");if(L)kitHandPlate(L)}catch(e){console.error("kitHandLay",e)}}
/* §101.10 the Tốn line on the hand face: 0 = no card has a Tốn row; else 1 or 2 lines (the longest Tốn at the card width), one value per hand (law 10) */
function kitHandTonL(bs,cw,fs){try{let n=0;const cpx=fs*.84*.6,W=Math.max(40,cw-10);/* KIT-STAGE-R10 (KIT-STD-AUDIT X08 «line-clamp cut Tốn 4 khắc · Sức 20 · Bạc 10»): the lines are SIMULATED, not guessed from the length — every stat item («Bạc 10», «4 khắc») is one unbreakable unit (kef1) that wraps whole, so a narrow card needs 3–4 lines, never a clamp */bs.forEach(b=>{const r=b.querySelector(".kb>.kr-ton");if(!r)return;const t=r.textContent.trim();if(!t)return;const it=(t.replace(/^Tốn\s*/,"").split(/\s*·\s*/).filter(Boolean));let l=1,x=(4+1)*cpx;it.forEach((q,i)=>{const w=(q.length+(i?2:0))*cpx;const u=/^[\p{L}][\p{L}\s]{0,22}\s?[+\-−]?\d|^\d+\s*khắc/u.test(q);if(u||q.length*cpx<=W){if(x+w>W&&x>cpx*6){l++;x=q.length*cpx}else x+=w}else{const m=Math.ceil((x+w)/W);l+=m-1;x=(x+w)-(m-1)*W}});n=Math.max(n,Math.min(4,l))});return n}catch(e){return 0}}
/* KK35 (item 2, OD:L177 a name is never cut; iPad «Đi làm: Thay y phục hay trang sức trong Tư…»): a card name that spills its 3 lines → the WHOLE hand takes the tighter face font (.khn1); still spilling → 4 lines (.khn2). One face size per hand (law 10). */
function kitHandNameFit(g){try{g.classList.remove("khn1","khn2");const over=()=>kitHandCards(g).some(b=>{const k=b.querySelector(".kan");return k&&k.scrollHeight>k.clientHeight+1});if(!over())return;g.classList.add("khn1");if(!over())return;g.classList.add("khn2");if(over()&&!g.closest(".khost"))kitHandLongTo(g)/* a mounted hand never changes the frame kind */}catch(e){}}
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
 [...g.children].forEach(b=>{if(b.tagName!=="BUTTON")return;b.classList.remove("klift","khfly","khout");delete b.dataset.khi;["--kx","--ky","--kr"].forEach(p=>b.style.removeProperty(p))});kitHandConfOff(g);
 const dl=g.closest(".dlg,.khost");if(dl){dl.querySelectorAll(":scope>.khplate,:scope>.khconf,:scope>.khveil").forEach(e=>e.remove());dl.classList.remove("khdlg");if(dl.classList.contains("kstage")&&typeof kstgOff==="function")kstgOff(dl);if(typeof kszLiveRepick3==="function")kszLiveRepick3(dl)}}catch(e){console.error("kitHandLongOff",e)}}
/* KIT §101.10 «THẺ PHÓNG TO» — Game-of-Dice hand, NO FLIP (owner 26/11 ~23:58Z, verbatim: "Ok bỏ lật, làm theo Game of Dice"; CANON OVERWRITE of the 22:07Z
   «tap 1 enlarge, tap 2 flip» ruling; spec dev/handover/reports/god-research.md). Every card shows its info on the FRONT; there is no back side anywhere.
   - The hand card face = picture + short name + its Tốn line (exact, from the kit card rows = BAL, law 4).
   - Tap a card: it ENLARGES in the centre of the frame / pane (`.khplate.khbig`, transform + opacity only, from its hand slot) — plaque (the WHOLE name) ·
     picture · Tốn row with the odds word at its right end · Được · Mất (a locked card: its kit «why») — every number from the SAME kit card the «!» overlay
     shows (a disabled copy, nothing typed). The hand stays small behind it under a soft veil (`.khveil`, never takes taps).
   - ONE small green ✓ (kit `.kbtn.khok.kpk-gob`, BAL.kpkgo) INSIDE the enlarged card, top-right = choose: the card flies up, then the frame's own choose path runs.
     A locked card has no «Chọn». Tap another card = switch; tap anywhere else = it shrinks back into its slot. Tapping the enlarged card does nothing.
   - ONE part for every hand (frame hand, stage Bàn bài via jkstage kstgPlate → kitHandBigPlace, kitHand.mount panes). «Cảnh động» off / reduced motion = no motion.
   The element keeps the class .khplate (the stage and the tests key on it). Geometry knobs: KIT_HAND.big. */
KIT_HAND.big={w:[360,340]/* enlarged card width [Fold, iPad] (god-research 360x504 / 340x476) */,asp:1.4/* 5:7 */,minH:220,under:.8,tall:380/* room (px) above the hand under which the card takes the wide tier */,wMax:[700,760]/* R13: the card may grow this wide [Fold, iPad] when its text needs the room (law 10) */,ww:[420,520]/* the wide tier: card width [Fold, iPad] (picture left, info right) */,minHw:170,gapHand:8,shrinkMin:.4/* a hand that fills its pane shrinks to this share at most while a card is enlarged */,tick:[3,2]/* the green ✓ sits 3 px in from the right, 2 px down from the top of the card (the same as the thẻ gỗ ✓, kitPick) — its size = BAL.kpkgo */,ms:200,backMs:150,fs:[22,21,20,19,18,17,16,15,14,13]/* info type scale px: the largest that fits wins */};
function kitHandBigBuild(b,z){const c=kitOptCopy(b,1);/* KIT §6.2o K-HAND-MAT (KK63) + §101.10: the enlarged card's info is the ONE read-only card copy (jopic kitOptCopy: every Được AND Mất row, a locked card keeps .khlock, ids / picture / «!» dropped; face=1 keeps the face Tốn / Được rows) — never its own cloneNode *//* the Gợi ý row repeats Được / Mất in prose: shown only when the card has neither row */if(c.querySelector(".kr-duoc,.kr-thanh,[class*=kr-mat],.kr-bai"))c.querySelectorAll(".kr-hint").forEach(e=>e.remove());
 /* a hint clause the kit pass appended twice («…; hên xui; hên xui», a re-run of kitOptFinal on the hand card) reads once */c.querySelectorAll(".kb .ef").forEach(e=>{if(e.children.length)return;const p=e.textContent.split("; "),q=p.filter((x,i)=>i===0||x!==p[i-1]);if(q.length<p.length)e.textContent=q.join("; ")});c.querySelectorAll(".kofold").forEach(e=>e.classList.remove("kofold"));if(typeof kNwMkDom==="function")kNwMkDom(c);/* R13: «Sủng +» / «thiện cảm --» never split from its mark */
 c.querySelectorAll(".kr-thanh").forEach(r=>{if(!r.querySelector(".krv > *")&&!(r.querySelector(".krv")||{}).textContent)r.remove()});
 c.classList.remove("khout");c.removeAttribute("aria-pressed");
 /* KK56 §93.8 (owner 27/11 ~06:10Z): the odds never sit in a row of the enlarged card — only as the kit badge on its picture (copied from the small card's badge below) */
 c.querySelectorAll(".kodds,.kodb").forEach(e=>e.remove());const kan=c.querySelector(".kan");const name=kan?kan.textContent.trim():"";if(kan)kan.remove();
 const card=document.createElement("div");card.className="khbc";const pn=document.createElement("div");pn.className="khbn";pn.textContent=name;card.appendChild(pn);
 const im=b.querySelector(".kaart img.kpor")||b.querySelector(".kaart figure img")||b.querySelector(".kaart img");const pic=document.createElement("div");pic.className="khbp";if(im){const i=document.createElement("img");i.src=im.currentSrc||im.src;i.alt="";pic.appendChild(i)}const bd=b.querySelector(":scope > .kaart > .kodb");if(bd)pic.appendChild(bd.cloneNode(true));/* the same kit odds badge as the small card, on the big picture */card.appendChild(pic);
 const inf=document.createElement("div");inf.className="khbi";inf.appendChild(c);card.appendChild(inf);z.innerHTML="";z.appendChild(card);z.__khFor=b}
/* fill: the largest step of the kit scale whose info fits the card */
function kitHandBigFit(z){const bc=z.querySelector(".khbc"),fi=z.querySelector(".khbi");if(!fi||!bc)return;const K=KIT_HAND.big,F=K.fs,A=z.__khArea,cur=z.__khRect;
 /* R13 (MAIN 175 LOOK R12 FAIL, law 10 «the card grows / the picture shrinks, text never clipped»): the card is whole when NOTHING of its body sticks out of the box — the picture floor included; the info is never a scroll box.
    Largest type of the kit scale first: the picture gives way (down to its floor), then the CARD GROWS (taller inside the room above the hand, then wider up to K.wMax) centred in its room, only then the next smaller type. */
 if(cur&&cur.h0==null){cur.h0=cur.h;cur.w0=cur.w}const H0=cur?cur.h0:0,W0=cur?cur.w0:0;
 const set=(w,h)=>{if(!cur||!A)return;z.style.width=w+"px";z.style.height=h+"px";const x=Math.round(Math.max(A.L,Math.min((A.L+A.R)/2-w/2,A.R-w))),y=Math.round(Math.max(A.top,Math.min(A.top+(A.bot-A.top-h)/2,A.bot-h)));z.style.left=(x-A.D.left)+"px";z.style.top=(y-A.D.top)+"px";cur.w=w;cur.h=h;cur.l=x-A.D.left;cur.t=y-A.D.top};
 const over=()=>Math.max(bc.scrollHeight-bc.clientHeight,fi.scrollHeight-Math.max(fi.clientHeight,1),bc.scrollWidth-bc.clientWidth);
 const maxH=A?Math.max(H0,Math.round(A.bot-A.top)):H0,maxW=A?Math.max(W0,Math.min(Math.round(A.R-A.L),K.wMax[kitHandWide()?1:0])):W0;let ok=false;
 for(let i=0;i<F.length&&!ok;i++){z.style.setProperty("--khbfs",F[i]+"px");
  for(let w=W0;;w=Math.min(maxW,w+40)){set(w,H0);let o=over();if(o<=1){ok=true;break}if(maxH>H0){set(w,Math.min(maxH,H0+o+2));if(over()<=1){ok=true;break}}if(w>=maxW)break}}
 if(!ok){z.style.setProperty("--khbfs",F[F.length-1]+"px");set(maxW,maxH)}}
function kitHandBigGrow(z){kitHandBigFit(z)}
/* a late change inside the info (a portrait that loads, a font that arrives) re-fits the card */
function kitHandBigWatch(z){try{if(typeof ResizeObserver==="undefined")return;if(z.__khRO)z.__khRO.disconnect();let busy=0;const fi=z.querySelector(".khbi");if(!fi)return;/* the card element is reused: the info inside it is new for every card, so every call watches the new one */const go=()=>{if(busy||z.hidden)return;busy=1;requestAnimationFrame(()=>{try{kitHandBigGrow(z);if(z.__khFor&&typeof kitHandConf==="function")kitHandConf(z.__khFor)}finally{busy=0}})};z.__khRO=new ResizeObserver(go);z.__khRO.observe(fi);fi.querySelectorAll(".kabody,.kb,.kopinfo").forEach(e=>z.__khRO.observe(e));/* the info box itself may not change size (a grid cell): watch its content boxes */fi.querySelectorAll("img").forEach(m=>{if(!m.complete)m.addEventListener("load",go,{once:true})});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go)}catch(e){}}
/* place the enlarged card in the CENTRE of [L,R] × [top0, bottom] with its «Chọn» block under it; the room caps the height (5:7 kept) */
function kitHandBigPlace(b,z,dl,top0,L,R){try{const K=KIT_HAND.big,ip=kitHandWide(),D=dl.getBoundingClientRect();
 L=L==null?D.left+8:L;R=R==null?D.right-8:R;let top=top0==null?D.top+4:top0;let bot=dl.__khBot?dl.__khBot():Math.min(innerHeight-4,D.bottom-4);
 const foot=0;/* the green ✓ stands INSIDE the card (top-right corner), no block under it */
 /* OD 27/11 ~04:36Z: the enlarged card NEVER covers the hand — it opens ABOVE the row (between the story and the row); the row stays in place, all cards visible, the picked one lifted in its slot.
    Not enough room above → the smaller WIDE tier (picture left, info right), never over the row. */
 let below=false;try{const g=b.parentElement;g.style.transform="";g.style.transformOrigin="";const gr=g.getBoundingClientRect(),lf=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0;/* the card stays inside the VISIBLE part of the pane that scrolls (a hand in a scrolling panel: never clipped at its edge) */
  {let e=g.parentElement;while(e&&e!==document.body){const o=getComputedStyle(e).overflowY;if(/auto|scroll|hidden/.test(o)&&e.scrollHeight>=e.clientHeight&&e!==dl){const r=e.getBoundingClientRect();top=Math.max(top,Math.round(r.top+4));bot=Math.min(bot,Math.round(r.bottom-4));/* a sticky strip at the pane's top (the tab chips) is not free room */[...e.children].forEach(c=>{const cs=getComputedStyle(c);if(/sticky|fixed/.test(cs.position)){const q=c.getBoundingClientRect();if(q.height>0&&q.top<=r.top+80)top=Math.max(top,Math.round(q.bottom+4))}});break}e=e.parentElement}}
  const bot0=bot,top0b=top;
  const pm0=dl.querySelector(".kpmain");if(pm0&&pm0.getClientRects().length){const pb=pm0.getBoundingClientRect().bottom+8;if(pb>top)top=pb}
  const above=Math.round(gr.top-lf-K.gapHand-top),under=Math.round(bot0-(gr.bottom+K.gapHand));
  /* a hand that stands at the very top of its pane (outside #modal: no story above it) has no room above: the card goes UNDER the row instead, still never over it */
  if(above<K.tall&&under>above){below=true;top=Math.round(gr.bottom+K.gapHand)}else bot=Math.min(bot,Math.round(gr.top-lf-K.gapHand));
  /* a hand that fills its whole pane (iPad side panel, 4 × 3 cards): neither side has room → the WHOLE hand shrinks toward its top (every card still visible, in its slot) to free the room for the card under it, never under the card */
  g.style.transform="";g.style.transformOrigin="";if(Math.max(above,under)<K.minHw+20&&g.offsetHeight>0){const H0=g.offsetHeight,need=K.minHw+60,k=Math.max(K.shrinkMin,Math.min(1,(bot0-gr.top-K.gapHand-need)/H0));/* K-HAND-CLIP (KK71, law 10 «text never clipped»): shrink only when the room it frees UNDER the hand beats the room above it — a short dialog (Fold) left 127 px under the shrunk hand while 186 px stood free above, and the wide card clipped its last line */if(k<1&&Math.round(bot0-(gr.top+H0*k+K.gapHand))>above){g.style.transformOrigin="50% 0";g.style.transform=`scale(${k.toFixed(3)})`;below=true;bot=bot0;top=Math.round(gr.top+H0*k+K.gapHand)}}}catch(e){}
 const room=Math.max(80,Math.round(bot-top-4));let w=Math.round(Math.min(K.w[ip],R-L)),h=Math.round(w*K.asp);const wide=room<K.tall;
 if(wide){w=Math.round(Math.min(K.ww[ip],R-L));h=Math.min(room,Math.max(K.minHw,Math.round(w*.62)))}else if(h>room){h=room;w=Math.round(h/K.asp)}
 z.classList.toggle("khwide",wide);window.__khdbg={top,bot,room,wide,below,w,h};
 const x=Math.round((L+R)/2-w/2),y=Math.round(Math.max(top,top+(bot-top-(h+foot))/2));
 z.style.width=w+"px";z.style.height=h+"px";z.style.left=(x-D.left)+"px";z.style.top=(y-D.top)+"px";z.style.bottom="auto";z.__khRect={l:x-D.left,t:y-D.top,w,h};z.__khArea={top,bot,L,R,D:{left:D.left,top:D.top}};z.classList.toggle("khgo",!b.disabled);z.style.setProperty("--kpgw",BAL.kpkgo.w+"px");kitHandBigGrow(z);kitHandBigWatch(z);
 const v=dl.querySelector(":scope>.khveil");if(v){const P=dl.__khPane?dl.__khPane():null,Q=P?P.getBoundingClientRect():D;v.style.left=(Q.left-D.left)+"px";v.style.top=(Q.top-D.top)+"px";v.style.width=Q.width+"px";v.style.height=Q.height+"px"}
 kitHandConf(b)}catch(e){console.error("kitHandBigPlace",e)}}
/* grow / shrink: the copy starts exactly over the hand card (translate + scale) and ends at its centre place; back = the reverse */
function kitHandBigGo(b,z,back,done){try{if(kitHandStill()||!z.animate){if(done)done();return}const K=KIT_HAND.big,R=z.getBoundingClientRect(),B=b.getBoundingClientRect();if(!R.width||!R.height){if(done)done();return}
 const from=`translate(${Math.round(B.left-R.left)}px,${Math.round(B.top-R.top)}px) scale(${(B.width/R.width).toFixed(3)},${(B.height/R.height).toFixed(3)})`;
 z.style.transformOrigin="0 0";const a=z.animate(back?[{transform:"none",opacity:1},{transform:from,opacity:.6}]:[{transform:from,opacity:.6},{transform:"none",opacity:1}],{duration:back?K.backMs:K.ms,easing:"cubic-bezier(.2,.8,.3,1)",fill:back?"forwards":"none"});
 if(done)a.onfinish=done}catch(e){if(done)done()}}
function kitHandPlate(b){try{const g=b.parentElement,dl=g&&g.closest(".dlg,.khost");if(!dl)return;let z=dl.querySelector(":scope>.khplate");if(!z){z=document.createElement("div");z.className="khplate khbig";z.setAttribute("role","status");dl.appendChild(z)}
 let v=dl.querySelector(":scope>.khveil");if(!v){v=document.createElement("div");v.className="khveil";dl.insertBefore(v,z)}v.hidden=false;
 const fresh=z.hidden||z.__khFor!==b;if(fresh){z.getAnimations&&z.getAnimations().forEach(a=>a.cancel());kitHandBigBuild(b,z)}z.hidden=false;
 const hd=dl.querySelector(":scope>.kph"),D=dl.getBoundingClientRect(),top0=dl.__khTop?dl.__khTop():(hd&&hd.getClientRects().length?hd.getBoundingClientRect().bottom:D.top)+6;
 const LR=dl.__khLR?dl.__khLR():[D.left+8,D.right-8];kitHandBigPlace(b,z,dl,top0,LR[0],LR[1]);
 /* the picked card stays in its slot, lifted (klift) — never hidden */if(fresh&&!kitHandStill()){const cf=dl.querySelector(":scope>.khconf");if(cf)cf.style.opacity="0";/* «Chọn» shows when the card has grown */Promise.resolve().then(()=>{if(z.__khFor===b&&!z.hidden)kitHandBigGo(b,z,false,()=>{if(cf)cf.style.opacity=""});else if(cf)cf.style.opacity=""})}}catch(e){console.error("kitHandPlate",e)}}
/* ONE green ✓ (owner 27/11 ~04:00Z, CANON OVERWRITE of the 280x64 bar and of the «Chọn» chip): the small kit tick INSIDE the enlarged card, top-right (3 in / 2 down), size BAL.kpkgo, the same tick as the thẻ gỗ (kitPick).
   A locked card: none. Putting a card back = a tap anywhere else (or on another card = switch). (The thẻ gỗ picker kitPick has the same chip, §98.1.) */
function kitHandConf(b){try{const g=b&&b.parentElement,dl=g&&g.closest(".dlg,.khost");if(!dl)return;let c=dl.querySelector(":scope>.khconf");const z=dl.querySelector(":scope>.khplate:not([hidden])"),Rz=z&&z.__khRect;
 if(!b.classList.contains("klift")||b.disabled||!Rz){if(c)c.hidden=true;return}
 if(!c){c=document.createElement("div");c.className="khconf khgo";c.innerHTML=`<button type="button" class="kbtn khok kpk-gob" aria-label="Chọn lá này">✓</button>`;dl.appendChild(c)}
 const K=KIT_HAND.big,bw=BAL.kpkgo.w,bh=BAL.kpkgo.h;c.hidden=false;c.style.left=Math.round(Rz.l+Rz.w-bw-K.tick[0])+"px";c.style.top=Math.round(Rz.t+K.tick[1])+"px";c.style.setProperty("--kpgw",bw+"px");c.style.setProperty("--kpgh",bh+"px")}catch(e){console.error("kitHandConf",e)}}
function kitHandConfOff(g){const dl=g&&g.closest&&g.closest(".dlg,.khost"),c=dl&&dl.querySelector(":scope>.khconf");if(c){c.hidden=true;c.style.opacity=""}}
function kitHandStill(){try{return typeof kfStill==="function"?kfStill():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function kitHandVeilOff(dl){const v=dl&&dl.querySelector(":scope>.khveil");if(v)v.hidden=true}
/* drop: the enlarged card shrinks back into its hand slot (anim = false when another card is lifted at once) */
function kitHandDrop(g,anim){if(!g)return;g.style.transform="";g.style.transformOrigin="";const dl=g.closest(".dlg,.khost"),z=dl&&dl.querySelector(":scope>.khplate");const L=g.querySelector(":scope>button.klift");
 g.querySelectorAll(":scope>button.klift").forEach(x=>{x.classList.remove("klift");x.removeAttribute("aria-pressed")});kitHandConfOff(g);
 if(!z||z.hidden){g.querySelectorAll(":scope>button.khout").forEach(x=>x.classList.remove("khout"));kitHandVeilOff(dl);return}
 const end=()=>{if(z.__khFor===L||!L){z.hidden=true;z.getAnimations&&z.getAnimations().forEach(a=>a.cancel());z.__khFor=null;kitHandVeilOff(dl)}if(L&&!L.classList.contains("klift"))L.classList.remove("khout")};
 if(anim&&L&&L.isConnected)kitHandBigGo(L,z,true,end);else{g.querySelectorAll(":scope>button.khout").forEach(x=>x.classList.remove("khout"));z.hidden=true;z.__khFor=null;kitHandVeilOff(dl)}}
function kitHandLift(b){const g=b.parentElement;if(!g||g.__khBusy)return;if(b.classList.contains("klift"))return;kitHandDrop(g,false);b.classList.add("klift");b.setAttribute("aria-pressed","true");kitHandPlate(b);if(g.__khLift)try{g.__khLift(b)}catch(e){}}
/* choose: the ENLARGED card flies up a little and fades, the rest sink; then the frame's own choose path (a synthetic click = detail 0, passes the tap gate) */
function kitHandChoose(b){const g=b.parentElement;if(!g||g.__khBusy)return;g.__khBusy=1;window.__khFlyT=performance.now();const dl=g.closest(".dlg,.khost"),z=dl&&dl.querySelector(":scope>.khplate:not([hidden])");
 const go=()=>{g.__khBusy=0;g.style.transform="";g.style.transformOrigin="";if(z){z.hidden=true;z.__khFor=null}kitHandVeilOff(dl);b.classList.remove("khout");if(g.__khPick){g.__khPick(b);return}if(b.isConnected)b.click()};kitHandConfOff(g);
 if(kitHandStill()||!b.animate){go();return}
 const lift=parseFloat(getComputedStyle(g).getPropertyValue("--khlift"))||0,ms=KIT_HAND.flyMs;
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
  kitHandLay(g);if(!g.classList.contains("khand"))return;try{if(typeof kitOddsBadgeHand==="function")kitOddsBadgeHand(g)}catch(e){}/* KK56 §93.8 opt-in: the odds badge only on EVENT hand cards *//* KK41: a long-name list is no hand */const m0=typeof Q!=="undefined"?Q[0]:null;if(m0&&KH_PEND.has(m0))g.classList.add("khpre");/* a rebuilt list while the deal waits stays hidden too */kitHandDeal(g,m0);
  if(!g.__khMO&&typeof MutationObserver==="function"){g.__khMO=new MutationObserver(()=>{try{g.__khMO.disconnect();kitHandCards(g).forEach(kitHandShort)}finally{g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}});g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}
  if(!g.__khRO&&typeof ResizeObserver==="function"){g.__khRO=new ResizeObserver(()=>{if(!g.isConnected||g.__khBusy)return;cancelAnimationFrame(g.__khRaf);g.__khRaf=requestAnimationFrame(()=>kitHandLay(g))});g.__khRO.observe(g)}});
 /* KK35: a REUSED dialog whose new card is no hand (a notice after a hand frame) keeps no hand / stage classes, figures or scene (the next frame decides again) */
 M.querySelectorAll(".dlg.khdlg,.dlg.kstage").forEach(dl=>{if(dl.querySelector(".opts.khand"))return;dl.classList.remove("khdlg");if(dl.classList.contains("kstage")&&typeof kstgOff==="function")kstgOff(dl)});
 /* DLG-DEAD-BTN (law 11, Foreman F «Tin báo» «Để sau» / «Chọn lá này» dead on LIVE): the lift plate + ✓/✕ pair live on the REUSED .dlg; a card lifted on one
    queue card, then that card replaced by the next one (news / timer / one-copy panel), left them up on the new card with NO lifted card — ✓ and ✕ did nothing
    and the plate covered the hand (and hid the stage text). A frame drawn with no lifted card shows no plate and no pair. */
 kitHandStale(M)}catch(e){console.error("kitHand",e)}}
function kitHandStale(M){try{(M||document).querySelectorAll("#modal .dlg").forEach(dl=>{if(dl.querySelector(".opts.khand>button.klift"))return;dl.querySelectorAll(":scope>.khplate:not([hidden]),:scope>.khconf:not([hidden])").forEach(x=>x.hidden=true)})}catch(e){console.error("kitHandStale",e)}}
window.kitHand=kitHand;window.kitHandWants=kitHandWants;window.kitHandLay=kitHandLay;window.KIT_HAND=KIT_HAND;
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const M=document.getElementById("modal");if(M&&!M.hidden){kitHand(M);requestAnimationFrame(()=>kitHand(M))}}catch(e){console.error("kitHand",e)}return r}})();
/* the two-tap gate (capture, before #modal onclick): a REAL tap (detail ≥ 1) on a resting card lifts it; on the lifted card it chooses (with the fly); a tap elsewhere in the frame drops the lifted card */
document.addEventListener("click",e=>{try{const t=e.target;if(!t||!t.closest)return;
 const cf=t.closest("#modal .dlg>.khconf>button");/* the hand's ONE «Chọn» (a kitPick .kpk-conf inside the stage is its own part) */if(cf){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const dl=cf.closest(".dlg"),L=dl&&dl.querySelector(".opts.khand>button.klift");if(!L){kitHandStale(dl&&dl.parentElement);return}/* DLG-DEAD-BTN (LIVE 4a02837c): a «Chọn» with no lifted card under it goes, never a dead button */if(cf.classList.contains("khok"))kitHandChoose(L);return}
 const b=t.closest("#modal .opts.khand > button.kopt");
 if(!b){const g=t.closest("#modal .opts.khand");if(g){/* a tap that landed on the list box: a locked card under the finger (browsers that swallow events on disabled buttons) */const hit=kitHandCards(g).find(x=>{const r=x.getBoundingClientRect();return x.disabled&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom});if(hit){e.stopPropagation();kitHandLift(hit);return}}
  {const zp=t.closest("#modal .dlg>.khplate");if(zp&&!zp.hidden){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return}}/* §101.10 a tap on the enlarged card does nothing (no flip, owner 26/11 ~23:58Z) */
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
html body #modal#modal#modal#modal .opts.khand>button.kopt .khnx{display:none!important}/* face = picture + short name + Tốn; the odds word / Được / Mất live on the enlarged card (§101.10) */
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb{display:block!important;flex:none!important;width:100%!important;margin:0!important;padding:0!important;font-size:calc(var(--khfs) * .84)!important;line-height:1.2!important;text-align:center!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb>.kr-ton{display:-webkit-box!important;-webkit-box-orient:vertical;-webkit-line-clamp:var(--khtl,1);overflow:hidden!important;white-space:normal!important;padding:0!important;margin:0!important;border:0!important;background:none!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb>.kr-ton>.krl{display:inline!important;font-weight:700;color:#8a5a1c;margin-right:.3em;text-transform:none!important;font-size:1em!important;letter-spacing:0!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb>.kr-ton>.krv,html body #modal#modal#modal#modal .opts.khand>button.kopt .kb>.kr-ton>.krv *{display:inline!important}
html body #modal#modal#modal#modal .opts.khand>button.kopt .kb>.kr:not(.kr-ton),html body #modal#modal#modal#modal .opts.khand>button.kopt>.kobang,html body #modal#modal#modal#modal .opts.khand>button.kopt .kwhy,html body #modal#modal#modal#modal .opts.khand>button.kopt small:not(.kodds *):not(.kb){display:none!important}
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
#modal .dlg>.khconf:not(.khgo)>.khok,.khconf:not(.khgo)>.khok{background:#2f8a3e;color:#fff}/* the thẻ gỗ ✓ (kitPick); the hand «Chọn» is the plain kit .kbtn */
#modal .dlg>.khconf>.khx,.khconf>.khx{background:#fffaf0;color:#7a2a1c;border-color:var(--k-gold,#c9a24a)}
#modal .dlg>.khconf>button:active,.khconf>button:active{transform:scale(.92)}
#modal .dlg>.khplate{position:absolute;z-index:6;pointer-events:auto}/* §101.10 the ENLARGED card (front only, no flip): taps on it do nothing (never fall through to the cards under it) */
#modal .dlg>.khplate[hidden],#modal .dlg>.khveil[hidden]{display:none}
#modal .dlg>.khveil{display:none!important}/* no veil any more: the enlarged card stands above the row and never covers it (OD 27/11 ~04:36Z) */
#modal .dlg>.khplate>.khbc{position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:8px;border-radius:14px;background:var(--k-card,#fffaf0);box-shadow:0 0 0 2px var(--k-gold,#c9a24a),0 14px 30px rgba(40,20,8,.42);overflow:hidden;font-size:var(--khbfs,16px)}
#modal .dlg>.khplate .khbn{flex:none;text-align:center;font-weight:800;font-size:1.12em;line-height:1.2;color:#5a2a12;padding:5px 10px;border-radius:10px;background:linear-gradient(#fff3d6,#f3dfae);box-shadow:inset 0 0 0 1px var(--k-gold,#c9a24a)}/* plaque: the WHOLE name */
#modal .dlg>.khplate.khwide>.khbc{display:grid;grid-template-columns:minmax(0,38%) minmax(0,1fr);grid-template-rows:auto minmax(var(--khbpmin,56px),1fr);gap:6px 8px}
#modal .dlg>.khplate.khwide .khbn{grid-column:1/-1}
#modal .dlg>.khplate.khwide .khbp{grid-column:1;grid-row:2;min-height:0}
#modal .dlg>.khplate.khwide .khbi{grid-column:2;grid-row:2;justify-content:flex-start}/* the wide tier: picture left, info right */
#modal .dlg>.khplate .khbp{position:relative;flex:1 1 0;min-height:var(--khbpmin,56px);border-radius:9px;overflow:hidden;background:#efe2c4}
#modal .dlg>.khplate .khbp>img{width:100%;height:100%;object-fit:cover;object-position:50% 18%;display:block}
#modal .dlg>.khplate .khbi{flex:0 0 auto;min-height:0;overflow:visible;display:flex;flex-direction:column;justify-content:center}/* the info takes its own height, type from ONE kit scale (KIT_HAND.big.fs, largest that fits); the picture (≥ 45 %) takes the rest — no empty band */
#modal .dlg>.khplate .khbi>button.kopinfo{font-size:1em!important;width:100%;margin:0;padding:0 2px!important;flex:none;min-height:0!important;box-shadow:none!important;border:0!important;text-align:left;opacity:1!important;filter:none!important;background:transparent!important;color:var(--ink,#2a1a12)!important;cursor:default;pointer-events:none}
#modal .dlg>.khplate .khbi>button.kopinfo:not(.khlock) .kodds{filter:none!important;opacity:1!important}/* a disabled COPY: the odds word keeps its live colours unless the card is locked */
html body #modal#modal#modal#modal .opts.khand>button.kopt.khout{opacity:0!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kabody{display:flex!important;flex-direction:column!important;gap:6px!important;width:100%!important;padding:0!important;transform:none!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kat:empty{display:none!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kb{display:grid!important;grid-template-columns:max-content minmax(0,1fr)!important;column-gap:.5em!important;row-gap:.4em!important;font-size:1em!important;line-height:1.3!important;color:var(--ink,#2a1a12)!important;opacity:1!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kb>.kr{display:contents!important}/* the kit .kb grid: one label column, every value at ONE x (KIT_CHECKLIST A10) */
#modal .dlg>.khplate .khbi>button.kopinfo .kb .kdup,#modal .dlg>.khplate .khbi>button.kopinfo .kb .kfill .ef{display:inline!important}#modal .dlg>.khplate .khbi>button.kopinfo .kb>.kr.kdup,#modal .dlg>.khplate .khbi>button.kopinfo .kb>.kr.kfill{display:contents!important}/* KK56-R10: the copied Mất row (kr-mat2 kdup) and the filler rows are GRID rows (display:contents), only their chips are inline — else the row broke the one-value-column grid *//* the value chips keep the kit colours: gain green (.ef.g), loss red (.ef.r) — kaRows / kcls, j63 button.ka .krv .ef.g and .ef.r (OD 27/11 ~04:33Z) */
#modal .dlg>.khplate .khbi>button.kopinfo .kb .kfill .krl{opacity:1!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kb .krl{display:block!important;font-size:.82em!important;margin:0!important;text-transform:none!important}


#modal .dlg>.khplate .khbi>button.kopinfo .kb .krl{color:#8a5a1c!important;opacity:1!important;font-weight:700!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kb .krv,#modal .dlg>.khplate .khbi>button.kopinfo .kb .krv *{opacity:1!important}#modal .dlg>.khplate .khbi>button.kopinfo .kb .krv .ef:not(.g):not(.r):not(.t){color:var(--ink,#2a1a12)!important}/* only an unclassed chip is ink; gain .ef.g green and loss .ef.r red stay the kit colours */
#modal .dlg>.khplate .khbi>button.kopinfo .kb .kr-duoc .krl,#modal .dlg>.khplate .khbi>button.kopinfo .kb .kr-thanh .krl{color:#2f7a3a!important}
#modal .dlg>.khplate .khbi>button.kopinfo .kb [class*=kr-mat] .krl,#modal .dlg>.khplate .khbi>button.kopinfo .kb .kr-ton .krl,#modal .dlg>.khplate .khbi>button.kopinfo .kb .kr-kem .krl,#modal .dlg>.khplate .khbi>button.kopinfo .kb .kr-bai .krl{color:#a8321e!important}/* Được green mark · Mất red mark (law 3) */
#modal .dlg>.khplate .khbi>button.kopinfo .kwhy{display:block!important;color:#7a2a1c!important;font-weight:700!important;opacity:1!important}
#modal .dlg>.khconf.khgo{display:block;gap:0}/* the ONE small green ✓ INSIDE the enlarged card, top-right (OD 27/11 ~04:00Z): look = the shared rule in jkpick.js, size = BAL.kpkgo */
#modal .dlg>.khplate.khgo .khbn{padding-left:calc(var(--kpgw,24px) + 6px);padding-right:calc(var(--kpgw,24px) + 6px)}/* the title never runs under the ✓ (kept centred) */`;document.head.appendChild(st)})();
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
/* ===== KIT §101.13 kitHand.mount — the Bàn bài OUTSIDE #modal (KK51; request «kitHand outside #modal», KIT-STAGE-R4 → KK44, KIT_REQUESTS 26/11; 8 rows: SELSCENE kbare answers ·
   kpsc identity pair · Hành sự act deck · Khuê các decks + Việc groups · Tài nghệ cells · empty-tab act · jactj4 doors · jflip card row). OD 26/11 ~22:43Z: no 7 cap, every card at once,
   no pager (KIT_HAND.max 10 = the design size; more → all shown + a console warning; a layout for >10 only on a real KIT REQUEST).
   API: const H=kitHand.mount(container,{cards:[{id,n,line,off,why,html}],onPick(id,card,H),onLift(id,card,H),maxH,pane});
     card: n = the option name (kit option text, a person kitName allowed), line = its small line (Tốn / Được / odds, the same text a frame option carries), off = locked,
     html = a whole raw option button instead (the frame's own `<button class="opt" …>` markup); every card goes through the SAME kit passes as a frame option
     (kaNorm → kpOptArt picture → kitOptFinal rows), so face = picture + short name + Tốn, the ENLARGED card (§101.10, no flip) = plaque · picture · the kit card (Tốn + odds word · Được · Mất / locked «why»).
     maxH = px cap of the hand height (default KIT_HAND.mountK .72 of the screen: a pane holds the hand alone); pane = the scrolling box the enlarged card stands in the centre of (default: the nearest scrolling ancestor).
   H.lift(id) · H.drop() · H.lay() · H.destroy() · H.el (the .khost) · H.cards() → the card buttons (data-khid = id).
   Same deal / enlarge / «Chọn» / fly as the frame hand (one part, §101 / §101.10); «Chọn» → onPick(id); robot / keyboard click (detail 0) on a card → onPick at once. PURE DISPLAY. */
const KH_HOSTS=new Set();KIT_HAND.mountK=.72;
function khPane(el){let p=el&&el.parentElement;while(p&&p!==document.body){const o=getComputedStyle(p).overflowY;if(o==="auto"||o==="scroll"||o==="hidden")return p;p=p.parentElement}return null}
function kitHandMount(container,o){o=o||{};if(!container)return null;const old=container.querySelector(":scope>.khost");if(old&&old.__kh)old.__kh.destroy();
 const cards=(o.cards||[]).slice();if(cards.length>KIT_HAND.max)console.warn("kitHand.mount: "+cards.length+" cards > "+KIT_HAND.max+" — all shown (no pager, OD 26/11 ~22:43Z); KIT REQUEST if it does not fit");
 const esc=v=>String(v==null?"":v).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 const host=document.createElement("div");host.className="khost";const g=document.createElement("div");g.className="opts khm";host.appendChild(g);container.appendChild(host);
 g.innerHTML=cards.map((c,i)=>{if(c.html)return c.html;return `<button type="button" class="opt" data-m="${i}"${c.off?" disabled":""}${c.why?` data-why="${esc(c.why)}"`:""}>${c.n||""}${c.line?`<small>${c.line}</small>`:""}</button>`}).join("");
 [...g.children].forEach((b,i)=>{if(b.tagName!=="BUTTON")return;b.dataset.khid=cards[i]&&cards[i].id!=null?cards[i].id:i;b.type="button"});
 try{if(typeof kaNorm==="function")kaNorm(host)}catch(e){}[...g.children].forEach(b=>{try{if(typeof kpOptArt==="function")kpOptArt(b);if(typeof kitOptFinal==="function")kitOptFinal(b)}catch(e){}});
 const card=b=>cards[[...g.children].indexOf(b)];
 const H={el:host,g,o,cards:()=>kitHandCards(g),lay:()=>{g.__khSig="";kitHandLay(g,true)},lift:id=>{const b=g.querySelector(`:scope>button[data-khid="${CSS.escape(String(id))}"]`);if(b)kitHandLift(b)},drop:()=>kitHandDrop(g,true),
  destroy:()=>{KH_HOSTS.delete(H);try{g.__khRO&&g.__khRO.disconnect();g.__khMO&&g.__khMO.disconnect()}catch(e){}host.remove()}};host.__kh=H;KH_HOSTS.add(H);
 g.__khPick=b=>{try{o.onPick&&o.onPick(b.dataset.khid,card(b),H)}catch(e){console.error("kitHand.mount onPick",e)}};g.__khLift=b=>{try{o.onLift&&o.onLift(b.dataset.khid,card(b),H)}catch(e){}};
 g.__khCap=()=>o.maxH?(typeof o.maxH==="function"?o.maxH():o.maxH):Math.round(kitHandH()*KIT_HAND.mountK)/* a tab pane holds the hand alone (no story above it): a larger share, so cards keep the frame-hand size and names fit */;host.__khTop=()=>{const p=o.pane||khPane(host);return Math.max(4,p?p.getBoundingClientRect().top:0)+6};host.__khBot=()=>{const p=o.pane||khPane(host);return Math.min(innerHeight-4,p?p.getBoundingClientRect().bottom:innerHeight)-6};host.__khPane=()=>o.pane||khPane(host);host.__khLR=()=>{const p=o.pane||khPane(host),r=p?p.getBoundingClientRect():{left:0,right:innerWidth};return [Math.max(4,r.left)+8,Math.min(innerWidth-4,r.right)-8]}/* §101.10: the enlarged card stands in the CENTRE of its pane */;
 /* the gate (capture on the host): real tap = enlarge; «Chọn» = choose (fly → onPick); the enlarged card = nothing; elsewhere in the host = put back; locked card = lift (its «why») */
 host.addEventListener("click",e=>{try{const t=e.target;const cf=t.closest(".khost>.khconf>button");if(cf){e.preventDefault();e.stopPropagation();const L=g.querySelector(":scope>button.klift");if(L&&cf.classList.contains("khok"))kitHandChoose(L);return}
  const zp=t.closest(".khost>.khplate");if(zp&&!zp.hidden){e.preventDefault();e.stopPropagation();return}
  const b=t.closest(".opts.khand>button.kopt");if(!b||b.parentElement!==g){/* a tap that landed on the list box: a locked card under the finger (browsers swallow events on disabled buttons) */const hit=kitHandCards(g).find(x=>{const r=x.getBoundingClientRect();return x.disabled&&e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom});if(hit){e.stopPropagation();kitHandLift(hit);return}kitHandDrop(g,true);return}e.preventDefault();e.stopPropagation();if(g.__khBusy)return;
  if(e.detail===0&&!b.disabled){g.__khPick(b);return}/* robot / keyboard: chooses at once (the frame hand's rule) */if(!b.classList.contains("klift"))kitHandLift(b)}catch(x){console.error("kitHand.mount tap",x)}},true);
 host.addEventListener("pointerdown",e=>{try{if(e.button>0)return;const b=e.target.closest&&e.target.closest(".opts.khand>button.kopt:disabled");if(b&&b.parentElement===g)kitHandLift(b)}catch(x){}},{capture:true,passive:true});
 kitHandLay(g,true);if(!g.classList.contains("khand")){g.classList.add("khand")}/* a mounted host is ALWAYS a hand (the caller asked for one); a long name grows the face (khn1 / khn2), never a list */
 if(!g.__khMO&&typeof MutationObserver==="function"){g.__khMO=new MutationObserver(()=>{try{g.__khMO.disconnect();kitHandCards(g).forEach(kitHandShort)}finally{g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}});g.__khMO.observe(g,{subtree:true,childList:true,characterData:true})}
 if(typeof ResizeObserver==="function"){g.__khRO=new ResizeObserver(()=>{if(!g.isConnected||g.__khBusy)return;cancelAnimationFrame(g.__khRaf);g.__khRaf=requestAnimationFrame(()=>kitHandLay(g,true))});g.__khRO.observe(g)}
 if(!kitHandStill()){g.classList.add("khpre");requestAnimationFrame(()=>requestAnimationFrame(()=>{if(g.isConnected)kitHandDealGo(g);else g.classList.remove("khpre")}))}
 return H}
kitHand.mount=kitHandMount;window.kitHandMount=kitHandMount;
/* a tap outside every mounted host puts its lifted card back (the frame hand: a tap elsewhere in the frame) */
document.addEventListener("click",e=>{try{if(!KH_HOSTS.size)return;KH_HOSTS.forEach(H=>{if(!H.el.isConnected){KH_HOSTS.delete(H);return}if(!H.el.contains(e.target)&&H.g.querySelector(":scope>button.klift"))kitHandDrop(H.g,true)})}catch(x){}},true);
/* ONE look: the frame hand's CSS (#modal … .opts.khand / #modal .dlg>.khplate / .khconf) is re-scoped to .khost at load — one source, no second copy of the rules */
(function(){try{const out=[];["kit-hand","kit-hand-face","kit-hand-namefit"].forEach(id=>{const st=document.getElementById(id);if(!st)return;(st.textContent.match(/[^{}]+\{[^{}]*\}/g)||[]).forEach(l=>{/* one RULE at a time (a rule may span lines) */if(!/#modal/.test(l)||/k3right|#mb>|khmeas/.test(l.split("{")[0]))return;
  out.push(l.replace(/html body #modal#modal#modal#modal \.opts\.khand/g,"html body .khost.khost.khost.khost>.opts.khand").replace(/#modal \.dlg\.khdlg/g,".khost").replace(/#modal \.dlg>/g,".khost>"))})});
 const st=document.createElement("style");st.id="kit-hand-host";st.textContent=out.join("\n")+`\n.khost{position:relative;overflow:visible}.khost>.opts.khand{background:transparent}`;document.head.appendChild(st)}catch(e){console.error("kit-hand-host css",e)}})();
/* kit sample §101.13: a mounted hand in a pane (2 / 4 / 7 / 10 cards) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§101.13",title:"kitHand.mount · Bàn bài ngoài khung sự kiện (thẻ trong một ngăn: bộ thẻ việc, cặp thân phận, ô tài nghệ …)",where:"8 hàng thẻ ngoài khung: lời đáp chọn cảnh, cặp thân phận, bộ thẻ Hành sự, bộ thẻ Khuê các / nhóm Việc, ô Tài nghệ, việc khi ngăn trống, cửa ngăn, hàng Lật thẻ",
 html:()=>`<div data-khmdemo style="position:relative;height:520px;overflow:auto;border-radius:8px;background:var(--k-card,#fffaf0);padding:8px 10px"></div><div class="kitpg-row"><button type="button" class="kbtn alt" data-khmd="2">2 lá</button><button type="button" class="kbtn alt" data-khmd="4">4 lá</button><button type="button" class="kbtn alt" data-khmd="7">7 lá</button><button type="button" class="kbtn alt" data-khmd="10">10 lá</button></div>`});
 document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-khmd]");if(!b)return;e.stopPropagation();const h=document.querySelector("#kitpage [data-khmdemo]");if(!h)return;
  const N=["Trò chuyện","Giao hảo","Khiêu khích","Thách đấu tài nghệ","Tặng quà","Hỏi han chuyện nhà","Nhờ dò la tin tức","Mời uống trà","Xin chữ","Cùng ngắm hoa"];
  kitHand.mount(h,{cards:N.slice(0,+b.dataset.khmd).map((n,i)=>({id:"d"+i,n,line:i%2?`tốn: ${BAL.kitpage.demo.k} khắc`:`tốn: ${BAL.kitpage.demo.k} khắc · được: Danh +${BAL.kitpage.demo.gift.danh}`,off:i===2})),onPick:()=>{}})},true)}catch(e){}
