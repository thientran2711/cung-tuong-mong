/* night-final (owner OD 16/11 22:45Z FINAL + 22:50Z defence + 22:10Z no speed): tối keeps its 4 khắc; the card flip plays when tối's 4th khắc ends;
   right after it a forced choice for every player (attackers: Tranh sủng / Chặn ngự giá / Thôi; the flipped one: Giữ chân Hoàng thượng / Thôi;
   10 s countdown, timeout = Thôi; no khắc, no cost); NPCs choose at the same moment; ONE resolve (defence first: success → every attack −1 odds rung);
   exactly ONE night record. Tranh sủng / Chặn ngự giá exist in no act list.
   usage: node dev/test/night-final.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof nfOn==='function'&&typeof nfOdds==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={ch:"Thôi",seen:[]};
  /* his own visit (jvisit, from main) is not what these cases test: off (cap 0); night-final case 8 tests its order */T.vcap=BAL.visit.cap;BAL.visit.cap=0;
  /* no mùng 1 / rằm custom night (j75 flip wrapper hands the night to the Hoàng hậu by BAL.ag.emp.custom): the cases steer the card, the custom would override it 1 in ~16 (cases 1/4: no choice, another record) — same as night-multi / steal-mg-nf */T.cu=BAL.ag.emp.custom;BAL.ag.emp.custom=[0,0];
  /* the 10-night ledger (jledger) adds the tuần's other nights at the commit: these cases count the PLAYED tối only, so the ledger is off here; its own cases: dev/test/ledger.js */BAL.nt.on=false;
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;T.ch="Thôi";T.seen=[];
   const L=liveRivals(false).filter(v=>nightCh(v)>0);L.forEach(v=>{v.preg=0});return L};
  /* answer every open dialog: the flip choice (pid nfch) with T.ch; others with the first option that is not a way out */
  T.drain=(max=80)=>{const seen=[];for(let n=0;n<max&&Q.length;n++){const m=Q[0];seen.push(m.pid||m.t);const o=m.opts||m.o;
    if(o&&o.length){let i=m.pid==="nfch"?o.findIndex(x=>x.n===T.ch):o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=o.findIndex(x=>x.n==="Thôi");if(i<0)i=0;
     if(m.pid==="nfch")T.seen.push(o.map(x=>x.n).join("/"));try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}return seen};
  T.noCyc=()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"})};/* not her cycle tuần (jcycle would lock her night) */
  T.toEvening=()=>{let g=0;T.noCyc();while((S.buoi||0)<B4L&&g++<8){T.drain();used=4;nextBuoi()}T.eveUsed=used;/* khắc used when tối begins (a random dialog the drain answers next, e.g. «Mua tin», may spend one: not the night's doing) */T.drain()};
  T.endDay=()=>{const d=wk();T.noCyc();for(let g=0;g<12&&wk()===d;g++){T.drain();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi()}T.drain()};
  T.recs=L=>{const o={me:S.nights||0};L.forEach((v,i)=>o["r"+i]=v.nights||0);return o};
  T.only=who=>{if(who===S)S.cyb=Object.assign(S.cyb||{},{lie:wk()});const nc=nightCh;nightCh=function(p){p=p||S;if(!(S.nfX&&S.nfX.d===wk()&&S.nfX.st==="wait"))return nc.apply(this,arguments);return p===who?100:0};/* only the tablet itself is steered */const rr=roll;roll=function(x){return x===90||x===65?true:rr.apply(this,arguments)};return()=>{nightCh=nc;roll=rr}};
  T.noNpc=()=>{const sw=window.stealWant;window.stealWant=()=>({u:0,p:0,mode:null});const kp=BAL.steal.keep.npcP;BAL.steal.keep.npcP=0;return()=>{window.stealWant=sw;BAL.steal.keep.npcP=kp}};
  /* the flip of tonight only (the choice opens at once in bot mode); `who` gets the card */
  T.flipTo=who=>{const un=T.only(who);const d=wk();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi();un();return wk()===d};
  /* the given values feed ONLY the night's own rolls (the keep roll in resolveAll, each try in nfResolve); any other draw before them
     (weather/looks on an option whose name holds «Tuyết», a figure pick on render…) stays random and cannot eat them (night-final #2, 20/11) */
  T.seq=a=>{const mr=Math.random;let i=0;Math.random=()=>/\b(nfResolve|resolveAll)\b/.test(new Error().stack||"")?(i<a.length?a[i++]:.5):mr();return()=>{Math.random=mr}};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* 0. the two acts are in no list: deck, person menu group, NPC harm bands, ACT.ok */
 let r=await p.evaluate(()=>{const L=T.fresh();S.tonight=L[0];let deck=[];try{const d0=deal;deal();deck=JSON.stringify(S.deck||S.hand||[])}catch(e){}S.tonight=null;
  return{deck:/Tranh sủng|Chặn ngự giá/.test(deck),rv:RVGRP.some(g=>g[1].includes("steal")||g[1].includes("road")),bands:BANDS.some(g=>(g[2]||[]).includes("steal")||(g[2]||[]).includes("road")),
   okS:ACT.steal.ok(S,L[0]),okR:ACT.road.ok(S,L[0])}});
 ok("0 no Tranh sủng / Chặn ngự giá act anywhere",!r.deck&&!r.rv&&!r.bands&&!r.okS&&!r.okR,r);
 /* 1. no flip during the day; tối keeps 4 khắc; the flip at the end of tối; she is flipped: Giữ chân / Thôi; Thôi + nobody → her night, one record */
 r=await p.evaluate(()=>{const L=T.fresh();const un=T.noNpc();const d0=wk();T.toEvening();const a={ton:S.tonight==null,nfP:S.nfP===wk(),khac:4-T.eveUsed,kspQ:Q.some(m=>m.pid==="ksp")};
  const b=T.recs(L);T.flipTo(S);a.choice=Q.some(m=>m.pid==="nfch");a.opts=(Q.find(m=>m.pid==="nfch")||{opts:[]}).opts.map(x=>x.n).join("/");T.ch="Thôi";T.endDay();const e=T.recs(L);un();
  a.me=e.me-b.me;a.tot=Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0);a.day=(S.nightLog||[]).slice(-1)[0]===d0;a.next=wk()===d0+1;return a});
 ok("1 flip at the end of tối; she is flipped: Giữ chân / Thôi; her night, one record",r.ton&&r.nfP&&r.khac===4&&!r.kspQ&&r.choice&&r.opts==="Giữ chân Hoàng thượng/Thôi"&&r.me===1&&r.tot===1&&r.day&&r.next,r);
 /* 2. A flipped; she picks Tranh sủng and wins: her night, A none, no cost */
 r=await p.evaluate(()=>{const L=T.fresh();const A=L[0];const un=T.noNpc();T.toEvening();const b=T.recs(L);T.flipTo(A);const a={pickA:S.tonight===A,opts:(Q.find(m=>m.pid==="nfch")||{opts:[]}).opts.map(x=>x.n).join("/")};
  const s0=S.suc,d0=S.duc;T.ch="Tranh sủng";const rs=T.seq([.001]);const q=[];const m0=Q[0];T.drain(1);rs();a.cost=(S.suc!==s0)||(S.duc!==d0);a.sum=Q.some(m=>m.pid==="nfsum");T.endDay();un();const e=T.recs(L);a.me=e.me-b.me;a.A=e.r0-b.r0;a.tot=Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0);return a});
 ok("2 her Tranh sủng wins: summons, one record (hers), A none, no cost",r.pickA&&r.opts==="Tranh sủng/Chặn ngự giá/Thôi"&&!r.cost&&r.sum&&r.me===1&&r.A===0&&r.tot===1,r);
 /* 3. A flipped; NPC B attacks at the same moment and wins; she said Thôi: B recorded, true Sổ ghi line */
 r=await p.evaluate(()=>{const L=T.fresh();const A=L[0],B=L[1];const kp=BAL.steal.keep.npcP;BAL.steal.keep.npcP=0;const sw=window.stealWant;window.stealWant=v=>v===B?{u:1,p:.999,mode:"feign",o:95}:{u:0,p:0,mode:null};
  const os=oSteal;oSteal=function(a,m){return a===B?95:os.apply(this,arguments)};B.confined=0;
  T.toEvening();B.confined=0;B.out=0;/* the day can confine her (2 in 300): clear again before the flip */const b=T.recs(L);const s0=S.logSeq||0;T.flipTo(A);T.ch="Thôi";const rs=T.seq([.001,.001,.001,.001]);T.drain();rs();T.endDay();window.stealWant=sw;oSteal=os;BAL.steal.keep.npcP=kp;
  const e=T.recs(L);const logs=S.logs.slice(0,(S.logSeq||0)-s0).join(" ");return{A:e.r0-b.r0,B:e.r1-b.r1,me:e.me-b.me,wrong:new RegExp("thẻ bài của "+B.name+" được lật").test(logs)}});
 ok("3 NPC attack at the flip: B only, true line",r.A===0&&r.B===1&&r.me===0&&!r.wrong,r);
 /* 4. SHE is flipped, B (odds 85 = Nắm chắc) attacks. (a) she presses Giữ chân and it rolls a success → B drops to Chắc and fails on a roll of 80 → her
       night + Sủng gain; (b) the same roll but she says Thôi → B wins (80 < 85), she gets the Kính sự phòng notice, B the night */
 r=await p.evaluate(()=>{const out={};for(const ch of ["Giữ chân Hoàng thượng","Thôi"]){const L=T.fresh();const B=L[1];const sw=window.stealWant;window.stealWant=v=>v===B?{u:1,p:.999,mode:"feign",o:85}:{u:0,p:0,mode:null};
   const os=oSteal;oSteal=function(a,m){return a===B?85:os.apply(this,arguments)};B.confined=0;B.sung=0;S.sung=50;
   T.toEvening();B.confined=0;B.out=0;const b=T.recs(L);T.flipTo(S);const sg=S.sung;T.ch=ch;const rs=T.seq(ch==="Thôi"?[.80]:[.01,.80]);T.drain(1);rs();const a={sung:S.sung-sg,notice:Q.some(m=>m.t==="Kính sự phòng"&&!m.opts),x:JSON.parse(JSON.stringify(S.nfX||{}))};
   T.endDay();window.stealWant=sw;oSteal=os;const e=T.recs(L);a.me=e.me-b.me;a.B=e.r1-b.r1;a.tot=Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0);out[ch]=a}
  out.gain=BAL.steal.keep.gain;out.rung=[nfRungDown(85,1),nfRungDown(50,1),nfRungDown(20,1),word(nfRungDown(85,1))];return out});
 {const g=r["Giữ chân Hoàng thượng"],t=r["Thôi"];
  ok("4 defence: success drops every attack one rung; Thôi lets B win",g.x.def&&g.x.def.ok===1&&g.me===1&&g.B===0&&g.sung>0&&t.me===0&&t.B===1&&t.notice&&r.rung[3]==="Chắc",r)}
 /* 5. his own visit during the day: decided and played at once; no flip choice at the end of tối; one record */
 r=await p.evaluate(()=>{const L=T.fresh();const b=T.recs(L);S.buoi=1;used=0;Q.length=0;Q.push({t:"x",pid:"empnight",h:""});const x=Q[0];nightScene();Q.splice(Q.indexOf(x),1);
  const a={held:S.tonight==="me",settled:!!(S.ntk&&S.ntk.who==="me"),prep:Q.some(m=>m.pid==="prep")};T.seen=[];
  T.drain();a.early=(S.nights||0)-b.me;T.endDay();a.choice=T.seen.length;const e=T.recs(L);a.me=e.me-b.me;a.tot=Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0);return a});
 ok("5 his own visit: played at once, no flip choice, spent once",r.held&&r.settled&&r.prep&&r.early===1&&r.choice===0&&r.me===1&&r.tot===1,r);
 /* 6. invariant over 40 played days (no stubs, random choices): never more than ONE night record per day */
 r=await p.evaluate(()=>{const L=T.fresh();const bad=[];let nights=0;const C=["Tranh sủng","Chặn ngự giá","Thôi","Giữ chân Hoàng thượng"];for(let d=0;d<40&&!S.dead;d++){const w=wk();T.toEvening();T.ch=C[Math.floor(Math.random()*4)];T.endDay();
   const all=[S].concat(typeof rivals!=="undefined"?rivals:[]);const n=all.reduce((s,x)=>s+((x.nightLog||[]).filter(z=>z===w).length),0);nights+=n;if(n>1)bad.push({w,n})}return{bad,nights,days:40,choices:T.seen.length}});
 ok("6 at most one night per day (40 days)",r.bad.length===0&&r.nights>0&&r.choices>0,r);
 /* 7. the countdown: not a bot → the kit clock chip shows in the dialog; at 0 the choice is Thôi and the dialog closes */
 r=await p.evaluate(async()=>{const L=T.fresh();try{kmReset()}catch(e){}/* scenes queued by the bot days above */$("modal").hidden=true;/* T.fresh empties Q but leaves the start card's modal open: a stale modal would count as "a dialog on screen" */const un=T.noNpc();T.toEvening();window.__bot=0;const ms=BAL.steal.choice.ms;BAL.steal.choice.ms=3000;
  T.flipTo(L[0]);const a0={scene:false};const dw=document.getElementById('dawn');a0.dawn=dw&&dw.className;if(dw){dw.classList.remove('on');dw.hidden=true}try{kmPump()}catch(e){}for(let i=0;i<40;i++){await new Promise(z=>setTimeout(z,250));const e=document.querySelector(".kmov.kcf .kmend");if(e){a0.scene=true;a0.qBefore=Q.some(m=>m.pid==="nfch");e.click();break}}
  /* the FIRST dialog on screen after the scene must be the choice (poll: the scene closes with its own short fade) */let first="";for(let i=0;i<30&&!first;i++){await new Promise(z=>setTimeout(z,100));if(!$("modal").hidden&&Q[0])first=Q[0].pid||String(Q[0].t).slice(0,20)}const a={first,mb:(()=>{const h=($("mb")||{}).innerHTML;const i=h.indexOf("nfcd");return i<0?"NO nfcd; "+h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").slice(0,400):h.slice(i-50,i+500)})(),cc:typeof kitCoopClock,q:Q.slice(0,4).map(m=>m.pid||String(m.t).slice(0,20)),nfx:S.nfX&&{st:S.nfX.st,dlg:S.nfX.dlg,me:S.nfX.me},dawn:a0.dawn,cf:(window.__cfdbg||[]).slice(-5).join(","),busy:typeof cfBusy==="function"&&cfBusy(),kmov:[...document.querySelectorAll(".kmov")].map(e=>e.className).join("|"),scene:a0.scene,qBefore:a0.qBefore,dlg:!$("modal").hidden&&Q[0]&&Q[0].pid==="nfch",chip:!!document.querySelector("#mb .kchips.kctm .kchip"),txt:(document.querySelector("#mb .kchips.kctm")||{}).textContent};await new Promise(z=>setTimeout(z,1300));/* > 1 s + the clock's 250 ms tick: the whole-second word must have moved */a.txt2=(document.querySelector("#mb .kchips.kctm")||{}).textContent;
  await new Promise(z=>setTimeout(z,3300));a.me=S.nfX&&S.nfX.me;a.gone=!Q.some(m=>m.pid==="nfch");a.st=S.nfX&&S.nfX.st;BAL.steal.choice.ms=ms;window.__bot=1;un();return a});
 ok("7 the scene first, then the choice; 10 s countdown (kit §69 chip), timeout = Thôi",r.scene&&!r.qBefore&&r.first==="nfch"&&r.dlg&&r.chip&&/giây/.test(r.txt||"")&&r.txt!==r.txt2&&r.me===null&&r.gone&&r.st==="done",r);
 /* 8. his own visit (jvisit, main) rolls AFTER the choice is resolved, never between the flip and the choice (night-final #4) */
 r=await p.evaluate(()=>{const L=T.fresh();const un=T.noNpc();T.toEvening();const V=BAL.visit;BAL.visit.cap=100;/* the DAILY roll is the path this case checks: main AG-ALL-2 turns it off while the agent loop runs (his visits then come from his own evening plan, before the flip) */const ag0=window.agDOn;window.agDOn=()=>false;const k=[V.base,V.gap];V.base=1000;S.visW=null;if(S.emp)S.emp.visit=null;S.sung=60;
  /* force the visit roll: roll() caps every chance at BAL.odds.hi (95, no sure thing), so base 1000 alone still missed 1 run in 20 */const rl0=roll;roll=function(x){return x>=BAL.visit.cap?true:rl0.apply(this,arguments)};const ord=[];const vr=window.visRoll;window.visRoll=function(){ord.push("visit:"+(S.nfX&&S.nfX.st));return vr.apply(this,arguments)};
  const u2=T.only(L[0]);const d=wk();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi();u2();const a={choiceFirst:Q.findIndex(m=>m.pid==="nfch")===0,visQ0:Q.some(m=>m.pid==="empnight")};
  T.ch="Thôi";const sn=T.drain();a.seen=sn.indexOf("empnight")>sn.indexOf("nfch");a.ord=ord.slice();/* "visit:wait" = the call inside the flip, only marked (S.nfVd); the roll itself runs at "done" */window.visRoll=vr;roll=rl0;window.agDOn=ag0;V.base=k[0];BAL.visit.cap=0;un();return a});
 ok("8 his visit rolls after the choice is resolved",r.choiceFirst&&!r.visQ0&&r.ord.includes("visit:done")&&r.seen,r);
 /* 9. the "THỊ TẨM" seal: not in the flip scene (the choice is still to come); stamped after the resolve when she keeps the night (main s26 23:39Z) */
 r=await p.evaluate(async()=>{const L=T.fresh();try{kmReset()}catch(e){}const un=T.noNpc();T.toEvening();window.__bot=0;const ms=BAL.steal.choice.ms;BAL.steal.choice.ms=60000;
  const a={};T.flipTo(S);const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}try{kmPump()}catch(e){}
  for(let i=0;i<40;i++){await new Promise(z=>setTimeout(z,250));const e=document.querySelector(".kmov.kcf .kmend");if(e){a.scene=true;a.sealInScene=!!document.querySelector(".kmov.kcf .kcf-seal,.kcf-seal");a.res=(document.querySelector(".kmov.kcf .kmres")||{}).textContent;a.end=e.textContent;e.click();break}}
  for(let i=0;i<20&&!(Q[0]&&Q[0].pid==="nfch");i++)await new Promise(z=>setTimeout(z,250));a.choice=!!(Q[0]&&Q[0].pid==="nfch");
  const j=Q[0]?Q[0].opts.findIndex(o=>o.n==="Thôi"):-1;if(j>=0)chooseM(j);
  for(let i=0;i<40;i++){await new Promise(z=>setTimeout(z,250));if(document.querySelector(".kcf-seal")){a.sealAfter=true;const e=document.querySelector(".kmov.kcf .kmend");a.end2=e&&e.textContent;a.res2=(document.querySelector(".kmov.kcf .kmres")||{}).textContent;if(e)e.click();break}}
  BAL.steal.choice.ms=ms;window.__bot=1;un();try{kmReset()}catch(e){}return a});
 ok("9 THỊ TẨM seal only after the resolve (she kept it)",r.scene&&!r.sealInScene&&/Thẻ bài của (ngươi|ta) được lật/.test(r.res||"")&&r.choice&&r.sealAfter&&/Chuẩn bị thị tẩm/.test(r.end2||"")&&/thị tẩm/.test(r.res2||""),r);
 const pass=Object.values(R).every(x=>x.pass);
 console.log(JSON.stringify({pass,R,errs},null,1));await b.close();process.exit(pass&&!errs.length?0:1)})();
