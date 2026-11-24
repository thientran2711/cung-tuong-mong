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
   ONE queue for the whole family: every card that arrives at a buổi / day turn goes through Q + showModal (held here), every big moment through
   kmPush (held by kmFree); both gates are here, in one place. Installed LAST (outermost wrappers, after every module's own). No save data, no UI,
   no player-visible text. Numbers: BAL.dayq + BAL.spread.dawnSlot / dawnOpt (jbal2.js). Tests: dev/test/dayq-order.js (day turn), dev/test/dayq-hold.js (every khắc event source × activity). Report: dev/handover/reports/day-queue.md
   ===================================================================================================================================== */
const DQ={want:null,t:0,mt:0,newsHold:0,fo:null,stat:{held:0,ran:0,dropped:0,modalHeld:0,newsFirst:0,kmHeld:0,actHeld:0,pulled:0,actKm:0}};
/* solo only: a co-op room keeps its own gates (jcoopworld reshowQ already waits on the book; night / week gates pace the turn) and its seats must
   draw the same random numbers in the same order — holding cards there would shift j68's draws on one seat (worlds drift) */
function dqUi(){try{return !window.__bot&&!(window.COOPW&&COOPW.on)&&typeof S!=="undefined"&&!!S&&!S.dead}catch(e){return false}}
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
  const k=document.querySelector(".kmov:not(.km-out),#kmrew,#kpodov,[id^=\"kroul\"],.kroul-ov");if(k)return k;
  const D=window.DF;if(D&&D.F&&(D.play||(DQ.fo&&D.tk===DQ.fo))){const f=document.querySelector(".kfoc");return f||document.body}}catch(e){}return null}
/* the call comes from her own tap INSIDE the activity (a card / panel she opens there) */
function dqInside(a){try{const ev=window.event;if(!ev||!/click|pointer|touch|key|mouse/.test(ev.type))return false;const t=ev.target;return !!(t&&t.nodeType===1&&(a===document.body||a.contains(t)))}catch(e){return false}}
/* the top card is the one already playing in the jdfv stage scene (its own repeated showModal) */
function dqPlaying(){try{const D=window.DF;return !!(D&&Q[0]&&Q[0].dfSeen&&D.encM===Q[0]&&D.F)}catch(e){return false}}
function dqActBlocks(){if(dqPlaying())return false;const a=dqActEl();return !!a&&!dqInside(a)}
/* (c) an activity opened in the same tap as a card that was already painted (spend → card → mini-game): take the card back, unchosen */
function dqPull(){try{if(!dqUi()||!Q.length||DQ.user||!dqActEl())return;const D=window.DF,m=Q[0];let n=0;
  if(D&&D.F&&D.encM===m&&m&&m.dfSeen&&!D.play){const F=D.F;m.dfSeen=0;D.encM=null;try{F.destroy()}catch(e){try{F.close()}catch(x){}}try{dfClosed(D.tk)}catch(e){}n=1}
  const M=$("modal");if(M&&!dqHidden(M)){DQ_HID.set.call(M,true);n=1}
  if(n){DQ.stat.pulled++;dqArmModal()}}catch(e){console.error("dayq pull",e)}}
/* (a) the held turn runs by itself once the old buổi is finished (same buổi, nothing else open) */
function dqWait(){if(DQ.t)return;const tick=()=>{DQ.t=0;try{const w=DQ.want;if(!w)return;if(!dqUi()||bkey()!==w){DQ.want=null;DQ.stat.dropped++;return}
  if(dqOldPending()){DQ.t=setTimeout(tick,dqPoll());return}DQ.want=null;if(Q.length||S.mg){DQ.stat.dropped++;try{render()}catch(e){}return}DQ.stat.ran++;nextBuoi()}catch(e){console.error("dayq wait",e)}};
 DQ.t=setTimeout(tick,dqPoll())}
/* (b) a card held while the new-day host is up is painted once it closes */
function dqArmModal(){if(DQ.mt)return;const tick=()=>{DQ.mt=0;try{if(!dqUi())return;if(dqDawn()||dqActBlocks()){DQ.mt=setTimeout(tick,dqPoll());return}
  dqNewsFirst();const M=$("modal");if(Q.length&&M&&dqHidden(M))showModal()}catch(e){console.error("dayq modal",e)}};DQ.mt=setTimeout(tick,dqPoll())}
function dqInstall(){
 /* (a) outermost nextBuoi: hold the turn while the old buổi's big moment is pending */
 const nb=nextBuoi;nextBuoi=function(){if(dqUi()&&!dqForced()&&dqOldPending()){if(!DQ.want)DQ.stat.held++;DQ.want=bkey();dqWait();return}return nb.apply(this,arguments)};window.nextBuoi=nextBuoi;
 /* (b) outermost showModal: nothing painted over the title card / book */
 const sm=showModal;showModal=function(){if(dqUi()&&Q.length&&!DQ.user&&!dqDawn()&&dqActBlocks()){DQ.stat.actHeld++;try{const M=$("modal");if(M&&!dqHidden(M))DQ_HID.set.call(M,true)}catch(e){}dqArmModal();return}
  if(dqUi()&&Q.length&&dqDawn()&&!DQ.user){DQ.stat.modalHeld++;try{const M=$("modal");if(M&&!dqHidden(M))DQ_HID.set.call(M,true)}catch(e){}dqArmModal();return}return sm.apply(this,arguments)};window.showModal=showModal;
 /* an info panel she opens herself (kitModal inside a tap / key event: a person / item / term, e.g. inside the book) is shown at once, over the book;
    a kitModal posted by the game (no user event) waits like any card */
 if(typeof kitModal==="function"){const km=kitModal;kitModal=function(){let u=0;try{const ev=window.event;u=ev&&/click|pointer|touch|key|mouse/.test(ev.type)?1:0}catch(e){}if(!u)return km.apply(this,arguments);DQ.user=(DQ.user||0)+1;try{return km.apply(this,arguments)}finally{DQ.user--}};window.kitModal=kitModal}
 /* (c) the person view she opens herself (jdfv dfOpen, a tap on a person) is an activity; one opened by a card (encounter) is that card */
 if(typeof dfOpen==="function"){const fo=dfOpen;dfOpen=function(){const r=fo.apply(this,arguments);try{DQ.fo=window.DF&&DF.tk||null}catch(e){}return r};window.dfOpen=dfOpen}
 /* (c) an activity appears (mini-game screen shown, a scene / podium / roulette / person view added): a card painted in the same tap is taken back */
 try{const mo=new MutationObserver(()=>{if(Q.length)dqPull()});mo.observe(document.body,{childList:true});const ov=document.getElementById("ov");if(ov)mo.observe(ov,{attributes:true,attributeFilter:["hidden"]})}catch(e){console.error("dayq observe",e)}}
/* (b) the new day's motion scenes (stipend chest, rewards …) wait until «Tin trong cung» is closed */
(function(){if(typeof kmFree!=="function")return;const kf=kmFree;kmFree=function(){if(!kf.apply(this,arguments))return false;
 /* (c) a new motion scene waits while a mini-game screen or an on-figure game is open (a scene on screen is already one at a time: kmBusy;
    a scene from her own act in the person view shows there as before) */
 try{if(dqUi()){const ov=document.getElementById("ov");if((ov&&!dqHidden(ov))||(window.DF&&DF.play)){DQ.stat.actKm++;return false}
  /* a scene posted inside a tap waits one pump (kmPump retries in 250 ms): the tap may be opening an activity (her «Điểm trang» tap spends the
     khắc first, then opens the mirror) — a scene of the khắc never starts before / under that screen */
  const ev=window.event;if(ev&&/click|pointer|touch|key|mouse/.test(ev.type)&&!DQ.kmTap){DQ.kmTap=1;setTimeout(()=>{DQ.kmTap=0},0);DQ.stat.actKm++;return false}}}catch(e){}
 try{if(DQ.newsHold){if(dqUi()&&Q.some(dqIsNews)){DQ.stat.kmHeld++;return false}DQ.newsHold=0}}catch(e){}return true}})();
(function(){if(typeof dawn!=="function")return;const d0=dawn;dawn=function(){try{if(dqUi())DQ.newsHold=1}catch(e){}return d0.apply(this,arguments)}})();
/* a new life / a loaded slot drops what the old one held */
(function(){if(typeof kmOnReset==="function")kmOnReset(()=>{DQ.want=null;DQ.newsHold=0;clearTimeout(DQ.t);clearTimeout(DQ.mt);DQ.t=DQ.mt=0})})();
/* installed after every load-time wrapper and after the setTimeout(0) ones (jagent, jk4, jksize …): the outermost layer */
setTimeout(()=>setTimeout(()=>{try{dqInstall()}catch(e){console.error("dayq install",e)}},0),0);
window.DQ=DQ;
