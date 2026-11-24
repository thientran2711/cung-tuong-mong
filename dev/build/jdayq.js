/* ================= jdayq: ONE NEW-DAY ORDER (owner 24/11 ~18:05Z flight bug (5); her standing rule OD 15/11 ~23:20Z "spread events across buổi") =================
   Owner (f4–f6): after the Múa mini-game the «Tác phẩm tự tay · Nhận» reveal was on screen and the game jumped to the new day BEFORE she tapped «Nhận»;
   the new day then piled everything at once: the old reward, «Tin trong cung», the Tuần lục book (already open UNDER the other popups), a «Phụ tuyến»
   event at the first morning.
   (a) OLD DAY FIRST: the buổi / day never turns while a big moment of the old buổi is pending — a kit motion scene (kmPush queue: kitGain «Nhận»,
       kitReward chest/tray, edict, bloom, night card …) open or waiting. The turn is HELD (not lost): it runs by itself once the last scene is closed.
       In a co-op room the turn is never held (one shared world, the room paces it): (a) is solo only. Bots: never held (no UI).
   (b) ONE ORDER for the new day: day title card (jne kitNewDay) → Tuần lục book (j87) → only after she CLOSES the book: «Tin trong cung» first →
       then the day's events, spread across the buổi by D13 (jspread, BAL.spread.cap per buổi) with the FIRST buổi of a new day capped at
       BAL.spread.dawnCap world events (owner: "Mới sáng sớm là có sự kiện tới tìm liền ngay lập tức") — never on top of the book.
       While the #dawn host (title card / book) is up, no queued card (#modal) is painted and no kit motion scene starts (j93 kmFree already waits on
       #dawn); when it closes, the news card is moved to the front and shown; motion scenes of the new day wait until the news card is closed.
   ONE queue for the whole family: every card that arrives at a buổi / day turn goes through Q + showModal (held here), every big moment through
   kmPush (held by kmFree); both gates are here, in one place. Installed LAST (outermost wrappers, after every module's own). No save data, no UI,
   no player-visible text. Numbers: BAL.dayq + BAL.spread.dawnCap (jbal2.js). Test: dev/test/dayq-order.js. Report: dev/handover/reports/day-queue.md
   ===================================================================================================================================== */
const DQ={want:null,t:0,mt:0,newsHold:0,stat:{held:0,ran:0,dropped:0,modalHeld:0,newsFirst:0,kmHeld:0}};
function dqUi(){try{return !window.__bot&&typeof S!=="undefined"&&!!S&&!S.dead}catch(e){return false}}
/* co-op room: the turn is never held (one shared world; the room's own night / week gates pace it) — (a) is solo only, (b) holds on every seat */
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
function dqPoll(){return (typeof BAL==="object"&&BAL.dayq&&BAL.dayq.poll)||300}
/* (a) the held turn runs by itself once the old buổi is finished (same buổi, nothing else open) */
function dqWait(){if(DQ.t)return;const tick=()=>{DQ.t=0;try{const w=DQ.want;if(!w)return;if(!dqUi()||bkey()!==w){DQ.want=null;DQ.stat.dropped++;return}
  if(dqOldPending()){DQ.t=setTimeout(tick,dqPoll());return}DQ.want=null;if(Q.length||S.mg){DQ.stat.dropped++;try{render()}catch(e){}return}DQ.stat.ran++;nextBuoi()}catch(e){console.error("dayq wait",e)}};
 DQ.t=setTimeout(tick,dqPoll())}
/* (b) a card held while the new-day host is up is painted once it closes */
function dqArmModal(){if(DQ.mt)return;const tick=()=>{DQ.mt=0;try{if(!dqUi())return;if(dqDawn()){DQ.mt=setTimeout(tick,dqPoll());return}
  dqNewsFirst();const M=$("modal");if(Q.length&&M&&dqHidden(M))showModal()}catch(e){console.error("dayq modal",e)}};DQ.mt=setTimeout(tick,dqPoll())}
function dqInstall(){
 /* (a) outermost nextBuoi: hold the turn while the old buổi's big moment is pending */
 const nb=nextBuoi;nextBuoi=function(){if(dqUi()&&!dqForced()&&dqOldPending()){if(!DQ.want)DQ.stat.held++;DQ.want=bkey();dqWait();return}return nb.apply(this,arguments)};window.nextBuoi=nextBuoi;
 /* (b) outermost showModal: nothing painted over the title card / book */
 const sm=showModal;showModal=function(){if(dqUi()&&Q.length&&dqDawn()&&!DQ.user){DQ.stat.modalHeld++;try{const M=$("modal");if(M&&!dqHidden(M))DQ_HID.set.call(M,true)}catch(e){}dqArmModal();return}return sm.apply(this,arguments)};window.showModal=showModal;
 /* an info panel she opens herself (kitModal inside a tap / key event: a person / item / term, e.g. inside the book) is shown at once, over the book;
    a kitModal posted by the game (no user event) waits like any card */
 if(typeof kitModal==="function"){const km=kitModal;kitModal=function(){let u=0;try{const ev=window.event;u=ev&&/click|pointer|touch|key|mouse/.test(ev.type)?1:0}catch(e){}if(!u)return km.apply(this,arguments);DQ.user=(DQ.user||0)+1;try{return km.apply(this,arguments)}finally{DQ.user--}};window.kitModal=kitModal}}
/* (b) the new day's motion scenes (stipend chest, rewards …) wait until «Tin trong cung» is closed */
(function(){if(typeof kmFree!=="function")return;const kf=kmFree;kmFree=function(){if(!kf.apply(this,arguments))return false;
 try{if(DQ.newsHold){if(dqUi()&&Q.some(dqIsNews)){DQ.stat.kmHeld++;return false}DQ.newsHold=0}}catch(e){}return true}})();
(function(){if(typeof dawn!=="function")return;const d0=dawn;dawn=function(){try{if(dqUi())DQ.newsHold=1}catch(e){}return d0.apply(this,arguments)}})();
/* a new life / a loaded slot drops what the old one held */
(function(){if(typeof kmOnReset==="function")kmOnReset(()=>{DQ.want=null;DQ.newsHold=0;clearTimeout(DQ.t);clearTimeout(DQ.mt);DQ.t=DQ.mt=0})})();
/* installed after every load-time wrapper and after the setTimeout(0) ones (jagent, jk4, jksize …): the outermost layer */
setTimeout(()=>setTimeout(()=>{try{dqInstall()}catch(e){console.error("dayq install",e)}},0),0);
window.DQ=DQ;
