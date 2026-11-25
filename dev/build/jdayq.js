/* ================= jdayq: ONE NEW-DAY ORDER (owner 24/11 ~18:05Z flight bug (5); her standing rule OD 15/11 ~23:20Z "spread events across buổi") =================
   Owner (f4–f6): after the Múa mini-game the «Tác phẩm tự tay · Nhận» reveal was on screen and the game jumped to the new day BEFORE she tapped «Nhận»;
   the new day then piled everything at once: the old reward, «Tin trong cung», the Tuần lục book (already open UNDER the other popups), a «Phụ tuyến»
   event at the first morning.
   (a) OLD DAY FIRST: the buổi / day never turns while a big moment of the old buổi is pending — a kit motion scene (kmPush queue: kitGain «Nhận»,
       kitReward chest/tray, edict, bloom, night card …) open or waiting. The turn is HELD (not lost): it runs by itself once the last scene is closed.
       SOLO ONLY: a co-op room is left exactly as before (its own book / night / week gates; same random draws on both seats). Bots: off (no UI).
   (b) ONE ORDER for the new day: day title card (jne kitNewDay) → Tuần lục book (j87) → only after she CLOSES the book: «Tin trong cung» first →
       then the day's events, spread across the buổi by D13 (jspread, BAL.spread.cap per buổi) with the FIRST buổi of a new day capped at
       the morning cards only: an unslotted world card goes to BAL.spread.dawnSlot, an optional j68 event is held by BAL.spread.dawnOpt
       (owner: "Mới sáng sớm là có sự kiện tới tìm liền ngay lập tức") — never on top of the book.
       While the #dawn host (title card / book) is up, no queued card (#modal) is painted and no kit motion scene starts (j93 kmFree already waits on
       #dawn); when it closes, the news card is moved to the front and shown; motion scenes of the new day wait until the news card is closed.
   (c) NOTHING STARTS INSIDE AN ACTIVITY (owner 24/11 ~22:02Z real, item (1), shot v9: she tapped «Điểm trang», the khắc turned and a visitor
       («Quý phi … lặng lẽ tiến lại») played BEHIND the mini-game intro before she pressed «Sẵn sàng»): while she is inside an activity —
       a mini-game screen (#ov: intro «Sẵn sàng», play, result), a kit motion scene on screen (reward, reveal, edict …), the podium, the
       roulette, an on-figure game or a person view she opened herself (jdfv kitFocus) — no queued card (centre card or the jdfv stage
       «say» scene of a visitor) is painted and no new kit motion scene starts; a card that was painted in the same tap that opened the
       activity is taken back (hidden, the stage scene closed, nothing chosen) and shown again, unchanged, once she has finished.
       A card she opens from inside the activity (a tap there) still shows. Every khắc / buổi event reaches her through these two queues.
       (c) runs in a CO-OP ROOM too (DAYQ-3): it is paint-only (no S key, no random draw, no message; the card stays in Q, which the room's
       own gates already wait on), so both seats keep one world. Tests: dev/test/dayq-hold-coop.js.
   ONE queue for the whole family: every card that arrives at a buổi / day turn goes through Q + showModal (held here), every big moment through
   kmPush (held by kmFree); both gates are here, in one place. Installed LAST (outermost wrappers, after every module's own). No save data, no UI,
   no player-visible text. Numbers: BAL.dayq + BAL.spread.dawnSlot / dawnOpt (jbal2.js). Tests: dev/test/dayq-order.js (day turn), dev/test/dayq-hold.js (every khắc event source × activity), dev/test/dayq-hold-coop.js (gate (c) in a co-op room). Report: dev/handover/reports/day-queue.md
   ===================================================================================================================================== */
const DQ={want:null,t:0,mt:0,newsHold:0,fo:null,stat:{held:0,ran:0,dropped:0,modalHeld:0,newsFirst:0,kmHeld:0,actHeld:0,pulled:0,actKm:0}};
/* solo only: a co-op room keeps its own gates (jcoopworld reshowQ already waits on the book; night / week gates pace the turn) and its seats must
   draw the same random numbers in the same order — holding cards there would shift j68's draws on one seat (worlds drift) */
function dqUi(){try{return !window.__bot&&!(window.COOPW&&COOPW.on)&&typeof S!=="undefined"&&!!S&&!S.dead}catch(e){return false}}
/* gate (c) «nothing painted inside an activity» is PAINT ONLY (j3 showModal / the jdfv stage encounter / kmFree start of a kit scene): no S key, no
   random draw, no room message — the card stays in Q, so the room's own gates (Q.length / S.mg) already wait for it. It runs in a co-op room too
   (DAYQ-3: the room showed her v9 bug on both seats); gates (a) day turn and (b) book / news order stay solo (dqUi). Bots: off. */
function dqUiC(){try{return !window.__bot&&typeof S!=="undefined"&&!!S&&!S.dead}catch(e){return false}}
function dqForced(){const c=window.COOPW;return !!(c&&(c.on||c.allow||c.allowN))}
/* the REAL hidden state of an element (jspread lets game code read #modal as open during a buổi change) */
const DQ_HID=Object.getOwnPropertyDescriptor(HTMLElement.prototype,"hidden");
function dqHidden(el){try{return DQ_HID&&DQ_HID.get?DQ_HID.get.call(el):el.hidden}catch(e){return true}}
/* (a) a big moment of the old buổi still pending: a kit motion scene open (kmBusy) or queued (KMQ), a mini-game screen, the podium, the roulette */
function dqOldPending(){try{
  /* a scene being prepared (kitNightEnd preloads its picture before kmStage) counts too; a busy flag with no scene in the page for longer than
     BAL.dayq.stale ms is stale (never blocks the day) */
  if(typeof kmBusy!=="undefined"&&kmBusy){if(document.querySelector(".kmov:not(.km-out),#kmrew")){DQ.bz=0;return true}const n=Date.now();if(!DQ.bz)DQ.bz=n;if(n-DQ.bz<((BAL.dayq&&BAL.dayq.stale)||10000))return true}else DQ.bz=0;
  if(typeof KMQ!=="undefined"&&KMQ.length)return true;
  /* the other old-buổi screens of the family: a mini-game screen / its result (#ov), the podium (j90), the roulette */
  const ov=document.getElementById("ov");if(ov&&!dqHidden(ov))return true;
  if(document.getElementById("kpodov")||document.querySelector('[id^="kroul"],.kroul-ov'))return true}catch(e){}return false}
/* (b) the new-day host (#dawn: kitNewDay title card, then the Tuần lục book) is on screen */
function dqDawn(){try{const vis=el=>!!(el&&!dqHidden(el)&&el.getBoundingClientRect().width>0&&getComputedStyle(el).display!=="none");
  /* only a host that is REALLY on screen with its content (a leftover class / empty host after a new life never holds a card) */
  const d=document.getElementById("dawn");if(vis(d)&&(d.classList.contains("on")||d.classList.contains("kne-day"))&&d.querySelector(".kbk,.kne"))return true;
  /* the kit day title card (#kdaytc, review/kit-daytitle, not on main yet) counts as part of the new-day host */
  const k=document.getElementById("kdaytc");if(vis(k))return true;return false}catch(e){return false}}
function dqIsNews(m){return !!(m&&typeof m==="object"&&(m.kind==="news"||/^Tin trong cung/.test(String(m.t||""))))}
function dqIsEnd(m){return !!(m&&typeof m==="object"&&(m.kind==="end"||/end|death|pcm|nlcard/.test(m.cls||"")))}
/* «Tin trong cung» first after the book (an ending / death card keeps its place) */
function dqNewsFirst(){try{const M=$("modal");if(!Q.length||(M&&!dqHidden(M)))return;const N=Q.filter(dqIsNews);if(!N.length||Q[0]===N[0]&&Q.slice(0,N.length).every(dqIsNews))return;
  const i=Q.findIndex(dqIsNews);if(Q.slice(0,i).some(dqIsEnd))return;Q=N.concat(Q.filter(m=>!N.includes(m)));DQ.stat.newsFirst++}catch(e){console.error("dayq news",e)}}
function dqPoll(){return BAL.dayq.poll}
/* (c) she is inside an activity: the root element of it (null = free). Mini-game screen, kit motion scene ON SCREEN (a queued one is not an
   activity yet), podium, roulette, the jdfv person view she opened herself or its on-figure game (an encounter scene opened by a card is the card) */
function dqActEl(){try{const ov=document.getElementById("ov");if(ov&&!dqHidden(ov))return ov;
  /* the podium a card opens for ITSELF (j90 wiring 2, «podium first, then the panel»: Q[0].__podDone) is part of that card, not an activity over it */
  const own=Q[0]&&Q[0].__podDone;const k=document.querySelector(own?".kmov:not(.km-out),#kmrew,[id^=\"kroul\"],.kroul-ov":".kmov:not(.km-out),#kmrew,#kpodov,[id^=\"kroul\"],.kroul-ov");if(k)return k;
  /* button-crawl-fix-5 (F #10 25/11 11:01Z, robot s6d: «Sang ngày mới» greyed, Q = 12 cards, NOTHING on screen): the person view is an activity
     only while it is ON SCREEN. A tap on another tab parks it (jdfv dfTabLayers: .kfoc hidden, DF.F kept) — she is no longer inside it, so the
     waiting card shows on the tab she is on; a view whose layer is gone (no .kfoc) holds nothing either (it used to return document.body = held for ever) */
  const D=window.DF;if(D&&D.F&&(D.play||(DQ.fo&&D.tk===DQ.fo))){const f=document.querySelector(".kfoc");if(f&&dqShown(f))return f;
   if(D.play&&!f&&(typeof tab==="undefined"||tab==="act"))return document.body/* an on-figure game drawn on the stage itself */;return null}}catch(e){}return null}
function dqShown(el){try{if(!el||!el.isConnected||dqHidden(el))return false;for(let e=el;e&&e!==document.body;e=e.parentElement)if(e.hidden)return false;
  const cs=getComputedStyle(el);if(cs.display==="none"||cs.visibility==="hidden")return false;const r=el.getBoundingClientRect();return r.width>0&&r.height>0}catch(e){return false}}
/* the call comes from her own tap INSIDE the activity (a card / panel she opens there) */
function dqInside(a){try{const ev=window.event;if(!ev||!/click|pointer|touch|key|mouse/.test(ev.type))return false;const t=ev.target;return !!(t&&t.nodeType===1&&(a===document.body||a.contains(t)))}catch(e){return false}}
/* the top card is the one already playing in the jdfv stage scene (its own repeated showModal) */
function dqPlaying(){try{const D=window.DF;return !!(D&&Q[0]&&Q[0].dfSeen&&D.encM===Q[0]&&D.F)}catch(e){return false}}
function dqActBlocks(){if(dqPlaying())return false;const a=dqActEl();return !!a&&!dqInside(a)}
/* (c) an activity opened in the same tap as a card that was already painted (spend → card → mini-game): take the card back, unchosen */
function dqPull(){try{if(!dqUiC()||!Q.length||DQ.user||!dqActEl())return;const D=window.DF,m=Q[0];let n=0;
  if(D&&D.F&&D.encM===m&&m&&m.dfSeen&&!D.play){const F=D.F;m.dfSeen=0;D.encM=null;try{F.destroy()}catch(e){try{F.close()}catch(x){}}try{dfClosed(D.tk)}catch(e){}n=1}
  const M=$("modal");if(M&&!dqHidden(M)){DQ_HID.set.call(M,true);n=1}
  if(n){DQ.stat.pulled++;dqArmModal()}}catch(e){console.error("dayq pull",e)}}
/* (a) the held turn runs by itself once the old buổi is finished (same buổi, nothing else open) */
function dqWait(){if(DQ.t)return;const tick=()=>{DQ.t=0;try{const w=DQ.want;if(!w)return;if(!dqUi()||bkey()!==w){DQ.want=null;DQ.stat.dropped++;return}
  if(dqOldPending()){DQ.t=setTimeout(tick,dqPoll());return}DQ.want=null;if(Q.length||S.mg){DQ.stat.dropped++;try{render()}catch(e){}return}DQ.stat.ran++;nextBuoi()}catch(e){console.error("dayq wait",e)}};
 DQ.t=setTimeout(tick,dqPoll())}
/* (b) a card held while the new-day host is up is painted once it closes */
function dqArmModal(){if(DQ.mt)return;const tick=DQ.mtf=()=>{clearTimeout(DQ.mt);DQ.mt=0;try{if(!dqUiC())return;if((dqUi()&&dqDawn())||dqActBlocks()){DQ.mt=setTimeout(tick,dqPoll());return}
  if(dqUi())dqNewsFirst();const M=$("modal");if(Q.length&&M&&dqHidden(M))showModal()}catch(e){console.error("dayq modal",e)}};DQ.mt=setTimeout(tick,dqPoll())}
function dqInstall(){
 /* (a) outermost nextBuoi: hold the turn while the old buổi's big moment is pending */
 const nb=nextBuoi;nextBuoi=function(){if(dqUi()&&!dqForced()&&dqOldPending()){if(!DQ.want)DQ.stat.held++;DQ.want=bkey();dqWait();return}return nb.apply(this,arguments)};window.nextBuoi=nextBuoi;
 /* (b) outermost showModal: nothing painted over the title card / book */
 const sm=showModal;showModal=function(){if(dqUiC()&&Q.length&&!DQ.user&&!(dqUi()&&dqDawn())&&dqActBlocks()){DQ.stat.actHeld++;try{const M=$("modal");if(M&&!dqHidden(M))DQ_HID.set.call(M,true)}catch(e){}dqArmModal();return}
  if(dqUi()&&Q.length&&dqDawn()&&!DQ.user){DQ.stat.modalHeld++;try{const M=$("modal");if(M&&!dqHidden(M))DQ_HID.set.call(M,true)}catch(e){}dqArmModal();return}return sm.apply(this,arguments)};window.showModal=showModal;
 /* an info panel she opens herself (kitModal inside a tap / key event: a person / item / term, e.g. inside the book) is shown at once, over the book;
    a kitModal posted by the game (no user event) waits like any card */
 if(typeof kitModal==="function"){const km=kitModal;kitModal=function(){let u=0;try{const ev=window.event;u=ev&&/click|pointer|touch|key|mouse/.test(ev.type)?1:0}catch(e){}if(!u)return km.apply(this,arguments);DQ.user=(DQ.user||0)+1;try{return km.apply(this,arguments)}finally{DQ.user--}};window.kitModal=kitModal}
 /* (c) the person view she opens herself (jdfv dfOpen, a tap on a person) is an activity; one opened by a card (encounter) is that card */
 if(typeof dfOpen==="function"){const fo=dfOpen;dfOpen=function(){const r=fo.apply(this,arguments);try{DQ.fo=window.DF&&DF.tk||null}catch(e){}return r};window.dfOpen=dfOpen}
 /* (c) an activity appears (mini-game screen shown, a scene / podium / roulette / person view added): a card painted in the same tap is taken back */
 try{/* the activity is gone (scene / podium / mini-game screen closed): the held card is painted AT ONCE, not at the next poll (DAYQ-3) */
  const mo=new MutationObserver(()=>{if(!Q.length)return;dqPull();try{if(DQ.mt&&DQ.mtf&&dqUiC()&&!dqActEl()&&!(dqUi()&&dqDawn()))DQ.mtf()}catch(e){}});mo.observe(document.body,{childList:true});const ov=document.getElementById("ov");if(ov)mo.observe(ov,{attributes:true,attributeFilter:["hidden"]})}catch(e){console.error("dayq observe",e)}}
/* (b) the new day's motion scenes (stipend chest, rewards …) wait until «Tin trong cung» is closed */
(function(){if(typeof kmFree!=="function")return;const kf=kmFree;kmFree=function(){if(!kf.apply(this,arguments))return false;
 /* (c) a new motion scene waits while a mini-game screen or an on-figure game is open (a scene on screen is already one at a time: kmBusy;
    a scene from her own act in the person view shows there as before) */
 try{if(dqUiC()){const ov=document.getElementById("ov");if((ov&&!dqHidden(ov))||(window.DF&&DF.play)){DQ.stat.actKm++;return false}
  /* a scene posted inside a tap waits one pump (kmPump retries in 250 ms): the tap may be opening an activity (her «Điểm trang» tap spends the
     khắc first, then opens the mirror) — a scene of the khắc never starts before / under that screen */
  const ev=window.event;if(ev&&/click|pointer|touch|key|mouse/.test(ev.type)&&!DQ.kmTap){DQ.kmTap=1;setTimeout(()=>{DQ.kmTap=0},0);DQ.stat.actKm++;return false}}}catch(e){}
 /* button-crawl-fix-8 (robot s9 replay, LIVE + fix-6: «Sang ngày mới» dead ~80 s at the end of tối, Q = 1 «Tin trong cung», nothing on screen):
    the hold is for the MORNING of the new day only (the first buổi, right after the book). A newsHold set at dawn and never released (no motion
    scene that day) still held at night: «Sang ngày mới» queued the night flip scene (jflip kmPush) while j9 mckMorning had put a «Tin trong cung»
    card in Q → the flip waited for the news card, and jnf held every card (the news too) until the flip scene had played = deadlock until
    jflip's cfDrop after BAL.steal.choice.waitMs. Any later buổi releases the hold. */
 try{if(DQ.newsHold){if(dqUi()&&(S.buoi||0)===0&&Q.some(dqIsNews)){DQ.stat.kmHeld++;return false}DQ.newsHold=0}}catch(e){}return true}})();
(function(){if(typeof dawn!=="function")return;const d0=dawn;dawn=function(){try{if(dqUi())DQ.newsHold=1}catch(e){}return d0.apply(this,arguments)}})();
/* a new life / a loaded slot drops what the old one held — but a card already HELD for an activity (dqArmModal armed) is not dropped with it: the
   reset removes the scene / podium, so the held card is painted at the next tick (else it stayed hidden in Q for ever and the turn never came) */
(function(){if(typeof kmOnReset==="function")kmOnReset(()=>{const arm=!!DQ.mt;DQ.want=null;DQ.newsHold=0;clearTimeout(DQ.t);clearTimeout(DQ.mt);DQ.t=DQ.mt=0;if(arm)try{dqArmModal()}catch(e){}})})();
/* installed after every load-time wrapper and after the setTimeout(0) ones (jagent, jk4, jksize …): the outermost layer */
setTimeout(()=>setTimeout(()=>{try{dqInstall()}catch(e){console.error("dayq install",e)}},0),0);
/* m-fix-1 item 2 (robot M4 25/11 05:52Z + 05:58Z: «Sang ngày mới» greyed with NO cue while a card waited held behind a person view (kfoc) / away
   from her room; a newcomer saw a dead button). j6 render() disables #next while Q holds a card; when that card is HELD here (gate (c) / the book:
   nothing on screen shows it), the button SAYS WHY with the one waiting-words table (CTM_WAIT.dqHeld) in the same wrapping look as the co-op wait
   (#next.kcwait, jcoopworld lockNext); the normal label comes back at the next render once the card is shown. Solo only (dqUi), like the hold. */
function dqNextCue(){try{const n=document.getElementById("next");if(!n)return;const M=document.getElementById("modal");
 const held=dqUi()&&n.disabled&&!S.mg&&Q.length>0&&(!M||dqHidden(M));const W=window.CTM_WAIT||{};const t=held&&W.dqRoom&&typeof dqRoomWait==='function'&&dqRoomWait()?W.dqRoom:W.dqHeld;/* button-crawl-fix-6 (A) */
 if(held&&t){if(!n.dataset.dqCue){n.dataset.dqCue="1";if(!n.style.maxWidth&&n.offsetWidth)n.style.maxWidth=n.offsetWidth+"px";n.classList.add("kcwait")}if(n.textContent!==t)n.textContent=t;n.title=t}
 else if(n.dataset.dqCue){delete n.dataset.dqCue;n.style.maxWidth="";n.classList.remove("kcwait");n.removeAttribute("title");if(n.textContent===W.dqHeld||n.textContent===W.dqRoom)n.textContent=(S&&(S.buoi||0)>=(typeof B4L==="number"?B4L:2))?"Sang ngày mới":"Sang buổi"}}catch(e){}}
setTimeout(()=>setTimeout(()=>{try{if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);dqNextCue();return r}}
 setInterval(dqNextCue,700)/* the hold releases on a close that may not render */;
 try{const n=document.getElementById("next");if(n)new MutationObserver(()=>dqNextCue()).observe(n,{childList:true,characterData:true,subtree:true,attributes:true,attributeFilter:["disabled"]})}catch(e){}/* an inner render (a wrapper's saved r0) rewrites the label: put the cue back at once, no flicker; idempotent (no write when equal) */}catch(e){console.error("dayq cue",e)}},0),0);
window.dqNextCue=dqNextCue;
/* button-crawl-fix-5 SAFETY NET (F #10: «never a disabled #next with nothing on screen»): a card waiting in Q while #modal is hidden, no mini-game /
   motion scene / person view / new-day host / title on screen, for BAL.dayq.wake ms → the waiting card is shown (showModal: every module's own gate
   still runs, so a card a gate holds on purpose stays held). Solo only (dqUi; a co-op room paces Q with its own gates). Paint only: no S key, no draw. */
function dqFreeScreen(){try{if(dqActEl()||dqDawn()||(typeof S!=="undefined"&&S&&S.mg))return false;
  for(const sel of [".kfoc","#ov","#title","#kload","#kpodov","#kmrew",".kmov:not(.km-out)",".kroul-ov","[id^=\"kroul\"]","#ktut .ktut-card"]){const e=document.querySelector(sel);if(e&&dqShown(e))return false}return true}catch(e){return false}}
function dqWake(){try{const M=document.getElementById("modal");const m=Q[0];
  if(!dqUi()||!Q.length||!M||!dqHidden(M)||!dqFreeScreen()){DQ.wk=null;return}
  const now=Date.now(),W=(BAL.dayq&&BAL.dayq.wake)||2000;if(!DQ.wk||DQ.wk.m!==m){DQ.wk={m,at:now,n:0};return}
  if(now-DQ.wk.at<W*(1+DQ.wk.n))return;DQ.wk.n++;DQ.stat.woke=(DQ.stat.woke||0)+1;showModal()}catch(e){console.error("dayq wake",e)}}
setTimeout(()=>setTimeout(()=>{try{setInterval(dqWake,700)}catch(e){}},0),0);
window.dqWake=dqWake;
window.DQ=DQ;
/* button-crawl-fix-6 (F #12 25/11 12:53Z; BIG REVIEWER #4 bc-stack-review.md @3b8ed32e; robot s4d no-clock loops y8/y11, handover 37cfc029):
   «Sang buổi / Sang ngày mới» greyed while NOTHING on screen shows what it waits for — two more members of the fix-5 family:
   (A) a visitor / person scene («Có người đến», jdfv encounter: Q[0].dfSeen, DF.encM === Q[0]) plays only in HER ROOM; a tap on another tab parks it
       (dfTabLayers hides .kfoc) and the turn waits on it for ever while she is on Dư đồ / a place page (s4d: «Tích Cần viện», 150 taps, Q = 1).
       → the button says so (CTM_WAIT.dqRoom) and ONE tap on it takes her back to her room, where the scene goes on (same as tapping «Hành sự»).
   (B) a STALE S.mg (a lesson / mini-game record with no mini-game screen: #ov hidden, no on-figure game) → the button stays greyed with no cue.
       → the safety net reopens it the way loading a save does (resumeMG; jk4 clears S.mg when no game opens), after BAL.dayq.wake ms, solo only;
       a tap on the greyed button does the same at once.
   Paint / navigation only: no random draw, no new S key; co-op rooms untouched (dqUi). */
function dqRoomWait(){try{const m=Q[0],D=window.DF;return dqUi()&&!!m&&typeof tab!=="undefined"&&tab!=="act"&&!!(m.dfSeen&&D&&D.encM===m&&D.F)}catch(e){return false}}
function dqMgStale(){try{if(!dqUi()||!S.mg)return false;const ov=document.getElementById("ov");if(ov&&!dqHidden(ov))return false;if(window.DF&&DF.play)return false;
  const M=document.getElementById("modal");if(M&&!dqHidden(M))return false;if(dqDawn())return false;
  for(const sel of [".kmov:not(.km-out)","#kmrew","#kpodov",".kroul-ov","[id^=\"kroul\"]","#title","#kload"]){const e=document.querySelector(sel);if(e&&dqShown(e))return false}return true}catch(e){return false}}
function dqBring(){try{if(dqRoomWait()){DQ.stat.room=(DQ.stat.room||0)+1;tab="act";render();return true}
  if(dqMgStale()){DQ.stat.mgStale=(DQ.stat.mgStale||0)+1;const k=S.mg&&S.mg.k;try{resumeMG()}catch(e){console.error("dayq mg",e)}try{const ov=document.getElementById("ov");if(S.mg&&ov&&dqHidden(ov)){console.warn("dayq: stale mini-game record cleared",k);S.mg=null}}catch(e){}render();return true}
  const M=document.getElementById("modal");if(dqUi()&&Q.length&&M&&dqHidden(M)&&dqFreeScreen()){showModal();return true}}catch(e){console.error("dayq bring",e)}return false}
/* a disabled button gets no click: the tap is read on pointerup (like jact's grey cards); only when the turn cannot run (greyed, or a card / S.mg left
   while the button was not re-rendered — robot s4d LIVE: enabled «Sang buổi», Q = 1, 150 taps with no effect) */
document.addEventListener("pointerup",e=>{try{const n=e.target&&e.target.closest&&e.target.closest("#next");if(!n||!dqUi()||!(n.disabled||Q.length||S.mg))return;dqBring()}catch(x){}},true);
(function(){const t0=setInterval(()=>{try{if(!DQ.mgw){if(dqMgStale())DQ.mgw={at:Date.now(),k:S.mg};return}if(!dqMgStale()||S.mg!==DQ.mgw.k){DQ.mgw=null;return}
  if(Date.now()-DQ.mgw.at>=((BAL.dayq&&BAL.dayq.wake)||2000)){DQ.mgw=null;dqBring()}}catch(e){}},700)})();
/* the cue: (A) says where the waiting person is (CTM_WAIT.dqRoom, in dqNextCue above); the m-fix-1 cue (dqHeld) stays for every other held card */
window.dqBring=dqBring;
