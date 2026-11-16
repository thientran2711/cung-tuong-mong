/* a night with the Emperor ends the day (jnight, owner 11/15): after Tranh sủng / Chặn ngự giá / a normal summons and the bath + night
   dialogs, time runs on to the next morning; the leftover evening khắc are not left hanging.
   night-final (owner OD 16/11 22:25Z): a WON try (Tranh sủng / Chặn ngự giá, any buổi) plays the summons + night at once, then the day
   ends; a summons accepted from the flip ("ksp") is HELD and plays at the end of tối (jnf.js).
   usage: node dev/test/night-day.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
 const R={};
 for(const how of ["steal","road","ksp","morning","stale"]){
  R[how]=await p.evaluate(async how=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.preg=0;
   S.cyb={lie:wk(),rk:wk(),rv:"lui"};window.stealPass=()=>({tries:0,lines:[]});window.stealWant=()=>({u:0,p:0,mode:null});/* night-final: not her cycle tuần (jcycle locks her night); NPC last tries are tested in night-final.js */S.buoi=how==="morning"?0:B4L;used=2;/* "morning": a night won at buổi sáng spends that day only (the next day starts fresh) */S.tonight=null;try{NT&&(NT.d={})}catch(e){}render();const before={buoi:S.buoi,turn:S.turn,used,day:(typeof wk==="function"?wk():0)};
   const v=liveRivals(false)[0];const n0=S.nights||0;
   if(how==="ksp"){S.tonight="me";S.nfF=wk();/* the summons comes from a turned card: the tablet of today is turned (jnf flippedToday) */pushDil?pushDil(mkP("ksp"),"Kính sự phòng báo tin"):Q.push({t:"Kính sự phòng",h:"",opts:mkP("ksp").o});showModal()}
   else if(how==="stale"){S.tonight="me";pushFront(mkP("prep"),"Chuẩn bị thị tẩm");showModal()}   /* night-final: the night dialogs only open at the commit */
   else{stealWin(S,v,how==="road"?"road":"feign");showModal()}
   /* "stale" (review r7, co-op nights desync): the night's dialogs stay open while the day moves on (a co-op week merge rebuilds S and
      keeps Q through serQ / deserQ). Answering them later still gives the night, but must NOT end a buổi of the new day. */
   if(how==="stale"){const qs=serQ();if(S.tuan<2)S.tuan++;else{S.turn++;S.tuan=0}S.buoi=0;used=0;Q.length=0;Q.push(...deserQ(qs));before.day=(typeof wk==="function"?wk():0)-1;before.stale=1;showModal()}
   const sleep=t=>new Promise(r=>setTimeout(r,t));let clicks=0,titles=[];
   const tap=async()=>{for(let n=0;n<40&&Q.length;n++){await sleep(120);if(!Q.length)break;titles.push(Q[0].t);const bt=[...document.querySelectorAll('#modal button')].filter(x=>x.offsetParent&&!x.disabled&&!/Cáo bệnh|Tiến cử|Thôi|✕/.test(x.textContent));if(!bt.length){Q.shift();showModal();continue}bt[0].click();clicks++}};
   if(how!=="stale"){await tap();before.held=S.tonight==="me";before.early=(S.nights||0)-n0;before.mid={buoi:S.buoi,used,day:wk()};
    if(how==="ksp"){S.toMorning=0;used=4;nextBuoi()}}   /* the held summons is spent at the end of tối; a won try already played (OD 22:25Z) */
   for(let n=0;n<160;n++){await sleep(150);if(S.nights>n0&&!S.toMorning)break;if(!Q.length)continue;/* stop at the new morning: a dialog of the new day (another summons) is not this night */titles.push(Q[0].t);const bt=[...document.querySelectorAll('#modal button')].filter(x=>x.offsetParent&&!x.disabled&&!/Cáo bệnh|Tiến cử|Thôi|✕/.test(x.textContent));if(!bt.length){Q.shift();showModal();continue}bt[0].click();clicks++}
   for(let n=0;n<100&&S.toMorning;n++){await sleep(200);if(Q.length){Q.length=0;showModal()}}
   await sleep(600);
   return{ksp:how==="ksp",before,after:{buoi:S.buoi,turn:S.turn,used,day:(typeof wk==="function"?wk():0)},nights:S.nights,clicks,titles:[...new Set(titles)].slice(0,6),toMorning:S.toMorning,stale:window.__nightStale||0}},how);
 }
 /* a night of the current day ends it (next morning, day +1); a stale night (its day already gone) leaves the new day's buổi sáng alone */
 const ok=Object.values(R).every(r=>r.after.buoi===0&&r.after.used<4&&r.after.day===r.before.day+1&&r.nights>0&&!r.toMorning&&(r.before.stale?r.stale>0:!r.stale)&&(r.before.stale||(r.before.held&&r.before.mid.day===r.before.day&&r.before.mid.buoi===r.before.buoi&&r.before.early===(r.ksp?0:1))));
 console.log(JSON.stringify({ok,R,errs},null,1));await b.close();process.exit(ok&&!errs.length?0:1)})();
