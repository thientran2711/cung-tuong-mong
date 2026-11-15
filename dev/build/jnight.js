/* ================= jnight: a night with the Emperor ends the day (owner 11/15) =================
   Before: after she won the night (Tranh sủng, Chặn ngự giá, or a normal summons from Kính sự phòng) and went through the bath /
   prep and the night dialogs, the game stayed in the same buổi with the khắc she had left, as if the night had not happened.
   Now: once the night is spent (nightFx), whatever is left of the day is used up and time runs on to the next morning as soon as
   the night's dialogs are closed (the normal nextBuoi steps run for each buổi in between: rivals act, events can still come). */
(function(){if(typeof nightFx!=="function")return;
 const f0=nightFx;nightFx=function(){const r=f0.apply(this,arguments);try{if(S&&!S.dead)S.toMorning=1}catch(e){}return r};
 const n0=nextBuoi;nextBuoi=function(){const b0=S?S.buoi||0:0,t0=S?S.turn:0;const r=n0.apply(this,arguments);try{if(S&&S.toMorning&&((S.buoi||0)<b0||S.turn!==t0&&(S.buoi||0)===0))S.toMorning=0}catch(e){}return r};
 let busy=false;
 const step=()=>{if(busy||!S||!S.toMorning||S.dead||Q.length||S.mg)return;if(typeof advLock!=="undefined"&&advLock)return;busy=true;
  setTimeout(()=>{busy=false;try{if(!S||!S.toMorning||S.dead||Q.length||S.mg)return;used=4;nextBuoi();try{showModal()}catch(e){}render()}catch(e){console.error("toMorning",e)}},400)};
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{step()}catch(e){}return r}})();
