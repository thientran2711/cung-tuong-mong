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
 const f0=nightFx;nightFx=function(){const r=f0.apply(this,arguments);try{if(S&&!S.dead)S.toMorning=tb()}catch(e){}return r};
 let busy=false,asked="";
 const ready=()=>S&&S.toMorning&&!S.dead&&!Q.length&&!S.mg&&live();
 /* a try that cannot run now (a dialog open, the game's own auto-step lock) is tried again a moment later, not only on the next render */
 let again=0;const later=()=>{if(!again)again=setTimeout(()=>{again=0;step()},1000)};
 const step=()=>{if(busy)return;if(!ready()){if(S&&S.toMorning&&!S.dead)later();return}const co=coop();if(!co&&typeof advLock!=="undefined"&&advLock){later();return}
  if(co&&asked===COOPW.bkey())return;busy=true;
  setTimeout(()=>{busy=false;try{if(!ready())return;
   if(coop()){if(asked===COOPW.bkey())return;const k=COOPW.nightEnd();if(k)asked=k;else later();live();return}
   if(co)return;used=4;nextBuoi();live();try{showModal()}catch(e){}render()}catch(e){console.error("toMorning",e)}},400)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{step()}catch(e){}return r}})();
