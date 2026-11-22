/* one night a day in the Kính sự phòng book (night-final case 6 invariant; law 6a real evidence, law 1 NPC = her):
   1 a favoured maid raised at the month (jagmaid amRise "fav") keeps her night on the week she was favoured, not the month's day
   2 an NPC who sends her maid «hầu thay» from her own night (rivalNight → sendMaid) gives the night record up, like her own «Tiến cử»
   usage: node dev/test/night-book-day.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof servMonth==='function'&&typeof amOn==='function',null,{timeout:0});await p.waitForTimeout(2000);
 const r=await p.evaluate(()=>{const out={};window.__bot=1;const fresh=()=>{for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0};
  /* 1 */fresh();S.tuan=2;let o=rivals.find(v=>v.alive&&!v.out&&v.maid);const w=wk();o.maid.fav={w:w-2,n:1};o.maid.sung=50;const n0=rivals.length;
  const room=roomFor("consort");servMonth();const n=rivals.length>n0?rivals[rivals.length-1]:null;out.fav={on:amOn(),room,rose:!!n,log:n&&n.nightLog,want:w-2};
  /* 2 */fresh();const v=rivals.find(x=>x.alive&&!x.out&&x.maid);const q0=amSendQ;amSendQ=()=>true;const lg0=v.nightLog.length,nn0=v.nights;const R0=rivals.length;
  try{rivalNight(v)}finally{amSendQ=q0}const nw=rivals.length>R0?rivals[rivals.length-1]:null;const all=[S].concat(rivals);
  out.send={own:v.nightLog.length-lg0,nights:v.nights-nn0,rose:!!nw,day:all.reduce((s,x)=>s+((x.nightLog||[]).filter(z=>z===wk()).length),0)};return out});
 const ok1=!r.fav.on||!r.fav.room||(r.fav.rose&&JSON.stringify(r.fav.log)===JSON.stringify([r.fav.want]));
 const ok2=r.send.own===0&&r.send.nights===0&&r.send.day===(r.send.rose?1:0);
 console.log(ok1?"PASS":"FAIL","| 1 favoured maid raised at the month: her night on the favoured week",JSON.stringify(r.fav));
 console.log(ok2?"PASS":"FAIL","| 2 NPC sends her maid from her night: one record for the day (the maid's, or none)",JSON.stringify(r.send));
 console.log("page errors:",errs.length,errs.slice(0,3));await b.close();process.exit(ok1&&ok2&&!errs.length?0:1)})();
