/* ================= jnight: a night with the Emperor ends the day (owner 11/15) =================
   Before: after she won the night (Tranh sủng, Chặn ngự giá, or a normal summons from Kính sự phòng) and went through the bath /
   prep and the night dialogs, the game stayed in the same buổi with the khắc she had left, as if the night had not happened.
   Now: once the night is spent (nightFx), whatever is left of the day is used up and time runs on to the next morning as soon as
   the night's dialogs are closed (the normal nextBuoi steps run for each buổi in between: rivals act, events can still come).
   S.toMorning = {d: day, b: buổi} of the night, day = wk() (S.turn*3+S.tuan: one tuần of the calendar is one day of play; S.turn
   alone is the MONTH and does not change between two days). It is dropped as soon as the day has changed by ANY road (endTurn,
   a co-op week merge that rebuilds S, a load), so it can never spend a fresh morning.
   Co-op (review r6: the old timer called nextBuoi itself and keyed "once per buổi" on the month, so a stale night from an earlier
   day could end a buổi again, or never end it): the day moves ONLY through the co-op sync path. COOPW.nightEnd() ends this seat's
   current buổi once (sáng / chiều → bend, then the server's `buoi` steps both seats; tối → endTurn → end → the merged week),
   and does nothing while her buổi is already ended, a dialog / room step is pending, or her buổi is not the room's buổi.
   A buổi counts as asked only when nightEnd really ended it, so a refused try is simply tried again on the next render. */
(function(){if(typeof nightFx!=="function")return;
 const day=()=>typeof wk==="function"?wk():(S.turn*3+(S.tuan||0));
 const tb=()=>({d:day(),b:S.buoi||0});
 const coop=()=>{try{return !!(window.COOPW&&COOPW.on)}catch(e){return false}};
 /* still the same day? (older saves: flag 1 / {t,b} = "this day") */
 const live=()=>{const m=S&&S.toMorning;if(!m)return false;if(m===1||m===true||typeof m.d!=="number"){S.toMorning=tb();return true}
  if(m.d!==day()){S.toMorning=0;return false}return true};
 /* review r7 (co-op nights desync): the night's day is stamped when the night is WON, not when its last dialog is answered.
    Every road into a night (Tranh sủng / Chặn ngự giá → stealWin, Kính sự phòng's summons from flip, the Emperor's own visit
    "Thắp đèn hầu rượu", j75's lost-tablet summons, the test's forced nights) runs through a night dialog: the summons "ksp" and/or
    the bath "prep" (nightScene), then "night1" → "night2" → nightFx. Each dialog made by mkP gets pp.nd = the day it was raised
    (pp is kept by serQ / deserQ, so the stamp survives a save, a load and the co-op week merge that rebuilds S with keepQ).
    A night dialog raised while answering another dialog takes THAT dialog's day (prep ← ksp / the Emperor's visit, night1 ← prep,
    night2 ← night1), so the whole chain carries the day the night was won. nightFx reads the stamp of the dialog being answered:
    a night whose day has already passed (its dialogs stayed open across a co-op week merge or a reload into a later day) still
    gives its Sủng / Ân tình, but it NEVER ends a buổi: only a night of the current day sets S.toMorning. */
 const NIGHTP={ksp:1,prep:1,night1:1,night2:1};let cur=null;
 const ndOf=m=>m&&m.pp&&typeof m.pp.nd==="number"?m.pp.nd:null;
 if(typeof mkP==="function"){const m0=mkP;mkP=function(id,pp){pp=pp||{};try{if(typeof pp.nd!=="number"){const c=NIGHTP[id]?ndOf(cur):null;pp.nd=c!=null?c:day()}}catch(e){}return m0.call(this,id,pp)}}
 if(typeof chooseM==="function"){const c0=chooseM;chooseM=function(){const was=cur;try{cur=Q[0]||null}catch(e){cur=null}try{return c0.apply(this,arguments)}finally{cur=was}}}
 window.__nightStale=0;
 const f0=nightFx;nightFx=function(){const r=f0.apply(this,arguments);try{if(S&&!S.dead){const d=cur&&NIGHTP[cur.pid]?ndOf(cur):null;
   if(d==null||d===day())S.toMorning=tb();else{S.toMorning=0;window.__nightStale++;try{if(window.COOPW&&COOPW.tr)COOPW.tr.push("staleNight "+d+" now "+day())}catch(e){}}}}catch(e){}return r};
 let busy=false,asked="";
 const ready=()=>S&&S.toMorning&&!S.dead&&!Q.length&&!S.mg&&live();
 /* a try that cannot run now (a dialog open, the game's own auto-step lock) is tried again a moment later, not only on the next render */
 let again=0;const later=()=>{if(!again)again=setTimeout(()=>{again=0;step()},1000)};
 const step=()=>{if(busy)return;if(!ready()){if(S&&S.toMorning&&!S.dead)later();return}const co=coop();if(!co&&typeof advLock!=="undefined"&&advLock){later();return}
  if(co&&asked===COOPW.bkey())return;busy=true;
  setTimeout(()=>{busy=false;try{if(!ready())return;
   if(coop()){if(asked===COOPW.bkey())return;const k=COOPW.nightEnd();if(k)asked=k;else later();live();return}
   if(co)return;used=BAL.time.khac;nextBuoi();live();try{showModal()}catch(e){}render()}catch(e){console.error("toMorning",e)}},400)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{step()}catch(e){}return r}})();
