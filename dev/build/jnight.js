/* ================= jnight: a night with the Emperor ends the day (owner 11/15) =================
   Before: after she won the night (Tranh sủng, Chặn ngự giá, or a normal summons from Kính sự phòng) and went through the bath /
   prep and the night dialogs, the game stayed in the same buổi with the khắc she had left, as if the night had not happened.
   Now: once the night is spent (nightFx), whatever is left of the day is used up and time runs on to the next morning as soon as
   the night's dialogs are closed (the normal nextBuoi steps run for each buổi in between: rivals act, events can still come).
   S.toMorning = {t: turn, b: buổi} of the night. It is dropped as soon as the day has changed by ANY road (nextBuoi, a co-op week
   merge that rebuilds S, a load), so it can never skip a fresh morning.
   Co-op (review 11/15, "does jnight call nextBuoi itself?"): yes, through the co-op wrapper (jcoopworld: sáng/chiều → bend, tối →
   endTurn → the merged week). There it asks ONCE per buổi; while the room waits for the friend nothing more is sent. */
(function(){if(typeof nightFx!=="function")return;
 const tb=()=>({t:S.turn,b:S.buoi||0});
 const coop=()=>{try{return !!(typeof CW==="object"&&CW&&CW.on)}catch(e){return false}};
 /* still the same night? (an old save may hold the former flag 1: treat it as "this buổi") */
 const live=()=>{const m=S&&S.toMorning;if(!m)return false;if(m===1||m===true){S.toMorning=tb();return true}
  if(S.turn!==m.t||(S.buoi||0)<m.b){S.toMorning=0;return false}return true};
 const f0=nightFx;nightFx=function(){const r=f0.apply(this,arguments);try{if(S&&!S.dead)S.toMorning=tb()}catch(e){}return r};
 let busy=false,asked="";
 const step=()=>{if(busy||!S||!S.toMorning||S.dead||Q.length||S.mg)return;if(!live())return;if(typeof advLock!=="undefined"&&advLock)return;
  const key=S.turn+":"+(S.buoi||0);if(coop()&&asked===key)return;busy=true;
  setTimeout(()=>{busy=false;try{if(!S||S.dead||Q.length||S.mg||!live())return;const k=S.turn+":"+(S.buoi||0);if(coop()){if(asked===k)return;asked=k}
   used=4;nextBuoi();live();try{showModal()}catch(e){}render()}catch(e){console.error("toMorning",e)}},400)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{step()}catch(e){}return r}})();
