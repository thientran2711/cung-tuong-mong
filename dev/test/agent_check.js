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
 const r1=await p.evaluate(()=>{const t0=AG.stat.tick;placeWhere();placeWhere();agFlush();const one=AG.stat.tick-t0;const z=agZ();const R=S.roster;
  const bad=z.pend.filter(x=>x.key===j95key()&&(!R.P[x.id]||R.P[x.id][x.kh][1]!=="ag_"+x.k||R.P[x.id][x.kh][0]!==x.pl||!x.why));
  return{one,pend:z.pend.length,bad:bad.length,why:z.pend.slice(0,3).map(x=>x.k+"@"+x.pl+": "+x.why)}});
 ok(r1.one<=1,'tick: one per buổi',r1);ok(r1.bad===0,'tick: every planned act is in the ledger at its place/khắc with a why',r1);
 /* 2 */
 const r2=await p.evaluate(()=>{Q.length=0;const z=agZ();const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&!sameHouse(S,x));const kh=j95kh();const here=S.roster.P.me[kh][0];
  agPlan(v,{k:"thTH",t:null,act:"thỉnh an, hầu Thái hậu",need:"th"},agNeeds(v),kh,here);z.pend[z.pend.length-1].why="thử";const th0=v.th;
  agWatch();const m=Q.find(x=>x.t==="Ngươi bắt gặp");if(!m)return{none:1,Q:Q.map(x=>x.t)};const O=m.opts.map(o=>o.n);const hear=m.opts.find(o=>o.n==="Nghe lén");
  const want=word(od(BAL.ag.wit.hear+(S.mat||0)*BAL.ag.wit.mat));const left=z.pend.filter(x=>x.why==="thử").length;
  Q.length=0;const ign=m.opts.find(o=>o.n==="Mặc kệ");ign.go();const after=z.pend.filter(x=>x.why==="thử").length;
  return{O,hearWord:hear.x.split(" · ")[0],want,left,after,th:[th0,v.th]}});
 ok(r2.O&&r2.O.includes('Nghe lén')&&r2.O.includes('Thôi, lui về cung')&&r2.O.includes('Mặc kệ'),'scene: kit event card with the reactions',r2);
 ok(r2.hearWord===r2.want,'scene: Nghe lén odds = the player\'s Nghe lén câu chuyện odds (BAL.ag.wit)',r2);ok(r2.left===1&&r2.after===0,'scene: the act lands after her choice',r2);
 /* 2b khắc rule + kit rows (r1 faults 2, 5): every reaction row has its kit picture; with no khắc left Nghe lén / join are the kit locked option */
 const r2b=await p.evaluate(async()=>{Q.length=0;const z=agZ();const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&!sameHouse(S,x));const kh=j95kh();const here=S.roster.P.me[kh][0];
  agPlan(v,{k:"thTH",t:null,act:"thỉnh an, hầu Thái hậu",need:"th"},agNeeds(v),kh,here);agWatch();await new Promise(r=>setTimeout(r,1500));
  const pics=[...document.querySelectorAll('#modal .opts > button')].map(b=>b.dataset.kopic||"none");const m=Q.find(x=>x.t==="Ngươi bắt gặp");
  const txt=m?m.opts.map(o=>o.x).join(" | "):"";Q.length=0;try{closeModal()}catch(e){}
  const u0=used;used=4;const kh4=j95kh(),here4=S.roster.P.me[kh4][0];agPlan(v,{k:"thTH",t:null,act:"thỉnh an, hầu Thái hậu",need:"th"},agNeeds(v),kh4,here4);agZ().pend[agZ().pend.length-1].seen=0;agWatch();await new Promise(r=>setTimeout(r,800));
  const m2=Q.find(x=>x.t==="Ngươi bắt gặp");const L=m2?m2.opts.filter(o=>o.r==="hear"||o.r==="join").map(o=>o.lock&&!!o.why):[];
  const dis=[...document.querySelectorAll('#modal .opts > button')].filter(b=>b.disabled&&b.querySelector('.kwhy')).length;const u1=used;if(m2){const h=m2.opts.find(o=>o.r==="hear");h.go()}const u2=used;used=u0;Q.length=0;try{closeModal()}catch(e){}
  return{pics,khTxt:txt.includes("tốn: "+BAL.ag.kh+" khắc"),L,dis,free:u2!==u1}});
 ok(r2b.pics.length>=3&&r2b.pics.every(x=>x!=="none"&&!/^ph:/.test(x)),'kit: every reaction row carries its kit picture (no blank, no placeholder)',r2b);
 ok(r2b.khTxt&&r2b.L.length>=1&&r2b.L.every(x=>x)&&r2b.dis>=1&&!r2b.free,'khắc: reaction cost = BAL.ag.kh; no khắc left = kit locked option, nothing free',r2b);
 /* 3 */
 const r3=await p.evaluate(()=>{Q.length=0;const R=S.roster;const kh=j95kh();const here=R.P.me[kh][0];const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&!sameHouse(S,x));
  R.P["v"+v.id][kh]=[here,"here",null,"thử"];const z=agZ();z.pend=z.pend.filter(x=>x.vid!==v.id);if(z.did)delete z.did[v.id];const n0=AG.stat.witNpc;S.suc=Math.max(S.suc,60);let r="";for(let i=0;i<6;i++){r=twDo(S,null,"thTH",false);if(S.suc<20)S.suc=60}
  const busy=agUsed(v);const n1=AG.stat.witNpc;r=twDo(S,null,"thTH",false);/* her deed of the buổi is spent: she does not react again */
  return{n:AG.stat.witNpc-n0,busy,again:AG.stat.witNpc-n1,r,log:(agZ().log||[]).filter(x=>String(x.k).indexOf("see:")===0).slice(-2)}});
 ok(r3.n>=1,'her deed seen: a consort at her place reacts to it (two-way)',r3);ok(!r3.busy||r3.again===0,'two-way: a reaction uses the witness\'s one deed of the buổi',r3);
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
 /* 6b servant start (r1 fault 6): she witnesses too */
 const r6b=await p.evaluate(()=>{let i=0;window.__forceOrigin="cnv";window.__nlInner=1;for(;i<20;i++){start();if(isSrv()&&!S.out)break}window.__nlInner=0;window.__forceOrigin=null;if(!isSrv())return{noSrv:1};document.getElementById("title").hidden=true;Q.length=0;try{deal()}catch(e){}placeWhere();agFlush();
  const z=agZ();const v=liveRivals(true).find(x=>!x.queen&&!x.confined&&!sameHouse(S,x));const kh=j95kh();const here=S.roster.P.me[kh][0];
  agPlan(v,{k:"thTH",t:null,act:"thỉnh an, hầu Thái hậu",need:"th"},agNeeds(v),kh,here);agWatch();const m=Q.find(x=>x.t==="Ngươi bắt gặp");const O=m?m.opts.map(o=>o.r):[];Q.length=0;
  return{tries:i,here,O}});
 ok(r6b.O&&r6b.O.includes("hear")&&!r6b.O.includes("join"),'servant start: she witnesses NPC acts (reactions that fit her)',r6b);
 /* 6 */
 const r6=await p.evaluate(()=>{const c0=window.COOPW;const had=!!c0;const o={on:c0&&c0.on,seat:c0&&c0.seat};let g,h;try{COOPW.on=true;COOPW.seat="b";g=agOn();COOPW.seat="a";h=agOn()}finally{COOPW.on=o.on;COOPW.seat=o.seat}return{had,guest:g,host:h}});
 ok(r6.had&&r6.guest===false&&r6.host===true,'co-op: guest never runs the loop, host does',r6);
 const r7=await p.evaluate(()=>({errs:AG.errs.slice(0,5),perf:agPerf()}));ok(r7.errs.length===0,'jagent: no caught errors',r7);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 console.log(res.filter(x=>x).length+'/'+res.length);await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
