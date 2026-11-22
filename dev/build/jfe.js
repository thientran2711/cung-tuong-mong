/* ================= jfe: FLIP-ENTRY HOTFIX — the card flip waits for buổi tối (owner bug 16/11 ~20:58Z, OD 14:00Z (4)) =================
   Owner: "vừa vào game lại hiện ra cái màn thị tẩm ... cái màn mà chọn lật thẻ bài". Root: start() (j2), the new day (j3 endTurn), the
   co-op cycle answer (jcoopworld cyFree) and the cycle option (jcycle) call flip() in the MORNING; jflip plays the card-flip scene at once
   (after the Luân hồi identity card closes), so a new game / new life opened straight into the Kính sự phòng tray.
   Fix (= review/night-final jnf.js part 1, copied unchanged in behaviour so night-final keeps the same code): on the palace route a flip()
   before buổi tối only marks the tablet as waiting (S.nfP = day); entering buổi tối (nextBuoi) runs it; a night the Emperor already spends
   with someone (j75 ntTaken: a won steal, his own visit) = no flip. Nothing else of the night rules changes (commit, steals, co-op relay).
   Servant route (j42) and home route (jkc) keep their own week.
   With jnf.js (night-final) this file runs ONLY while jnf's co-op gate is closed (window.nfParked (thin part-E, or a room with a seat off the palace: jnf roomOff); player rooms with both seats in the palace run jnf): co-op keeps the live
   start-of-tối flip until Foreman B's coop-thin E; solo = jnf owns the flip (this file is a no-op there). Delete with the nfParked gate (jnf.js).
   Save: S.nfP / S.nfF (same names as jnf) — absent in old saves = harmless; an old save flipped in the morning keeps its pick. */
(function(){
if(typeof flip!=="function"||typeof nextBuoi!=="function")return;
const PK=()=>typeof window.nfParked!=="function"||window.nfParked();   /* jnf present: only the parked co-op room */
const day=()=>typeof wk==="function"?wk():(S.turn*3+(S.tuan||0));
const B4=()=>typeof B4L==="number"?B4L:2;
function on(){try{return !!(S&&!S.dead&&PK()&&!(typeof isSrv==="function"&&isSrv())&&!(typeof isKc==="function"&&isKc()))}catch(e){return false}}
function flippedToday(){return S.nfF===day()||!!(S.nightWhy&&S.nightWhy.wk===day())}
let REAL=0;const f0=flip;
function realFlip(){S.nfP=null;S.nfF=day();
 const n=typeof ntTaken==="function"?ntTaken():null;
 if(n){S.tonight=n.who==="me"?"me":((typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===n.who)||null);return}
 REAL=1;try{return f0.apply(this,arguments)}finally{REAL=0}}
flip=function(){if(!S||REAL||!on())return f0.apply(this,arguments);
 if((S.buoi||0)<B4()){S.tonight=null;S.nfP=day();return}       /* the tablet waits for buổi tối */
 return realFlip.apply(this,arguments)};
const nb0=nextBuoi;nextBuoi=function(){const b0=S&&S.buoi,d0=S&&day();const r=nb0.apply(this,arguments);
 try{if(S&&!S.dead&&on()&&(S.buoi||0)>=B4()&&(b0!==S.buoi||d0!==day())&&!flippedToday()){
   flip();if(typeof deal==="function")deal();if(!window.__bot){try{if(Q.length&&$("modal").hidden)showModal()}catch(e){}}render()}}catch(e){console.error(e)}
 return r};
/* any other road into buổi tối (co-op: the friend's buổi pulled in, jcoopworld CW.rbuoi; an old save loaded at tối with the tablet waiting) */
let SOON=0;if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);
 try{if(!SOON&&S&&!S.dead&&on()&&(S.buoi||0)>=B4()&&S.nfP===day()&&!flippedToday()){SOON=1;setTimeout(()=>{SOON=0;try{
   if(S&&!S.dead&&on()&&(S.buoi||0)>=B4()&&S.nfP===day()&&!flippedToday()&&!Q.length&&!S.mg){flip();if(typeof deal==="function")deal();if(!window.__bot){try{if(Q.length&&$("modal").hidden)showModal()}catch(e){}}render()}}catch(e){console.error(e)}},0)}}catch(e){}
 return r}}
window.feWaits=()=>!!(S&&S.nfP===day()&&!flippedToday());
})();
