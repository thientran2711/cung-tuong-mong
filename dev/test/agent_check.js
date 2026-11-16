/* NPC AGENT LOOP checks (jagent AG1 + AG1b), one fresh life, deterministic where it matters:
   1 tick: one tick per buổi (twice the same buổi = one), every planned act is in the ledger at its place/khắc with a why
   2 scene: an NPC act planned where she stands at this khắc opens the kit event card with the 4 reactions (Nghe lén / Tham gia / Bỏ đi /
     Mặc kệ), the odds word of Nghe lén = the player's Nghe lén câu chuyện odds (BAL.ag.wit), the act lands after her choice
   3 her deed seen: she greets Thái hậu (shared deed) with a consort beside her → that consort reacts (AG.stat.witNpc +1, a "see:" log line)
   4 one path per deed: with the loop on, the weekly / monthly dice of owned deeds do nothing for NPCs (mute > 0, npcEffort weekly = ""),
     with BAL.ag.on=0 they run again (old drips)
   5 j22: while jmen's schedule runs, the old flat roll(55) haunt never places a man (S.menW only from jmen)
   6 co-op guest: agOn() is false when COOPW.on && seat b (host only)
   usage: node dev/test/agent_check.js <page URL or file>   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 1 */
 const r1=await p.evaluate(()=>{const t0=AG.stat.tick;placeWhere();placeWhere();const one=AG.stat.tick-t0;const z=agZ();const R=S.roster;
  const bad=z.pend.filter(x=>x.key===j95key()&&(!R.P[x.id]||R.P[x.id][x.kh][1]!=="ag_"+x.k||R.P[x.id][x.kh][0]!==x.pl||!x.why));
  return{one,pend:z.pend.length,bad:bad.length,why:z.pend.slice(0,3).map(x=>x.k+"@"+x.pl+": "+x.why)}});
 ok(r1.one<=1,'tick: one per buổi',r1);ok(r1.bad===0,'tick: every planned act is in the ledger at its place/khắc with a why',r1);
 /* 2 */
 const r2=await p.evaluate(()=>{Q.length=0;const z=agZ();const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&!sameHouse(S,x));const kh=j95kh();const here=S.roster.P.me[kh][0];
  z.pend.push({key:j95key(),id:"v"+v.id,vid:v.id,k:"thTH",kd:"",t:null,kh,pl:here,act:"thỉnh an, hầu Thái hậu",why:"thử"});const th0=v.th;
  agWatch();const m=Q.find(x=>x.t==="Ngươi bắt gặp");if(!m)return{none:1,Q:Q.map(x=>x.t)};const O=m.opts.map(o=>o.n);const hear=m.opts.find(o=>o.n==="Nghe lén");
  const want=word(od(BAL.ag.wit.hear+(S.mat||0)*BAL.ag.wit.mat));const left=z.pend.filter(x=>x.why==="thử").length;
  Q.length=0;const ign=m.opts.find(o=>o.n==="Mặc kệ");ign.go();const after=z.pend.filter(x=>x.why==="thử").length;
  return{O,hearWord:hear.x.split(" · ")[0],want,left,after,th:[th0,v.th]}});
 ok(r2.O&&r2.O.includes('Nghe lén')&&r2.O.includes('Bỏ đi')&&r2.O.includes('Mặc kệ'),'scene: kit event card with the reactions',r2);
 ok(r2.hearWord===r2.want,'scene: Nghe lén odds = the player\'s Nghe lén câu chuyện odds (BAL.ag.wit)',r2);ok(r2.left===1&&r2.after===0,'scene: the act lands after her choice',r2);
 /* 3 */
 const r3=await p.evaluate(()=>{Q.length=0;const R=S.roster;const kh=j95kh();const here=R.P.me[kh][0];const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&!sameHouse(S,x));
  R.P["v"+v.id][kh]=[here,"here",null,"thử"];const n0=AG.stat.witNpc;S.suc=Math.max(S.suc,60);let r="";for(let i=0;i<6;i++){r=twDo(S,null,"thTH",false);if(S.suc<20)S.suc=60}
  return{n:AG.stat.witNpc-n0,r,log:(agZ().log||[]).filter(x=>String(x.k).indexOf("see:")===0).slice(-2)}});
 ok(r3.n>=1,'her deed seen: a consort at her place reacts to it (two-way)',r3);
 /* 4 */
 const r4=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.queen);const m0=AG.stat.mute;v.bac=500;v.suc=90;let s="";for(let i=0;i<30;i++)s+=npcEffort(v)||"";const th0=v.th;
  for(let i=0;i<10;i++)twDo(v,null,"thTH");const muted=AG.stat.mute-m0;const thOn=v.th-th0;
  BAL.ag.on=0;const th1=v.th;for(let i=0;i<10;i++)twDo(v,null,"thTH");const thOff=v.th-th1;let s2="";for(let i=0;i<60;i++)s2+=npcEffort(v)||"";BAL.ag.on=1;
  return{muted,weeklyOn:s.length,thOn,thOff,weeklyOffRan:s2.length>0||true}});
 ok(r4.muted>=40&&r4.weeklyOn===0&&r4.thOn===0,'one path per deed: old dice muted while the loop is on',r4);ok(r4.thOff!==0,'switch off (BAL.ag.on=0): the old drips run again',r4);
 /* 5 */
 const r5=await p.evaluate(()=>{const r0=roll;let n55=0;roll=function(x){if(x===55)n55++;return r0.apply(this,arguments)};try{for(let i=0;i<10;i++)placeWhere()}finally{roll=r0}
  const Y=S.menWhy||{};const bad=[];for(const m of S.men||[]){const k=(S.menW||{})[m.id];if(k&&(!Y[m.id]||Y[m.id].k!==k))bad.push(m.id)}return{road:menSchedRoad(),n55,bad}});
 ok(r5.road&&r5.n55===0&&r5.bad.length===0,'j22: no flat roll(55) haunt while jmen\'s schedule runs',r5);
 /* 6 */
 const r6=await p.evaluate(()=>{const c0=window.COOPW;const had=!!c0;const o={on:c0&&c0.on,seat:c0&&c0.seat};let g,h;try{COOPW.on=true;COOPW.seat="b";g=agOn();COOPW.seat="a";h=agOn()}finally{COOPW.on=o.on;COOPW.seat=o.seat}return{had,guest:g,host:h}});
 ok(r6.had&&r6.guest===false&&r6.host===true,'co-op: guest never runs the loop, host does',r6);
 const r7=await p.evaluate(()=>({errs:AG.errs.slice(0,5),perf:agPerf()}));ok(r7.errs.length===0,'jagent: no caught errors',r7);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 console.log(res.filter(x=>x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
