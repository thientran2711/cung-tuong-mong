/* NPC-PURPOSE G1 part 2 — weekly cards j3/j7 come from a person with a goal (report dev/handover/reports/npc-purpose.md; kinds jagwhy1).
   1 nobody bears a grudge / no lover / no fallen consort → 200 makeDil draws give only world cards (no scheming card, no named actor)
   2 one consort with a grudge against her → every scheming card against her names THAT consort (and the reason)
   3 one consort hates another → the rival-vs-rival cards are that pair only
   4 love letter only for a consort with a real lover (j22 affair), the lover named
   5 pace: endTurn gives a card at most every BAL.ag.why.dil.gap tuần (no weekly die)
   6 old save: pending cards without the new params still build; bot run 32 buổi without errors
   usage: node dev/test/npc-purpose-g1b.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw|makeDil/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const WORLD=new Set(["thbenh","eunuch","empnight","minister","jealousprince","flood","newgirl","princefever","foreignwed","doctorblack","phoenix","doanngo","trungcuu","vulan","dongchi","thbirthday","condemnedmaid","letterhome","rcpMama","tuyen"]);
  const SCH=new Set(Object.keys(DIL_K).concat(["vase","coldletter","embezzle","loveletter"]));
  S.rank=Math.max(S.rank,2);S.nights=Math.max(S.nights||0,2);S.year=Math.max(S.year,2);
  const L=liveRivals(false);o.n=L.length;for(const v of rivals)v.affair=null;
  const calm=()=>{for(const v of rivals){v.sung=20;v.oan=0;v.ghen=0;v.rel=10;v.ro={};v.rl={};for(const w of rivals)if(w!==v)v.rl[w.id]=10}};const draw=(n)=>{const c={};for(let i=0;i<n;i++){delete S.npw;S.seen={};const d=makeDil();const id=d?d.pid:"none";c[id]=(c[id]||0)+1;if(d)o.last=d}return c};
  const greedy=!!NPW.reg.hhGreed.why(rivals[0],{});try{/* 1 */for(const v of rivals)if(v.out)v.out=false;calm();let c=draw(200);o.c1=c;o.w1=Object.keys(c).every(k=>k==="none"||WORLD.has(k)||!SCH.has(k)||(k==="embezzle"&&greedy));
   /* 2 */const a=L[0];calm();a.oan=80;a.rel=-30;c=draw(200);o.c2=c;const me=["doll","guardrumour","ghost","maidhostage","taster","poisongift"];let bad=0,seen=0,why=0;
   for(let i=0;i<200;i++){delete S.npw;S.seen={};const d=makeDil();if(!d||!me.includes(d.pid))continue;seen++;const pp=d.pp;const actor=pp.a!=null?pp.a:pp.v;if(actor!==a.id)bad++;if(pp.y)why++}
   o.s2={seen,bad,why};o.w2=seen>0&&bad===0&&why===seen;
   /* 3 */const x=L[1],y=L[2];calm();x.ro[y.id]=80;x.rl[y.id]=-30;let pb=0,ps=0;for(let i=0;i<300;i++){delete S.npw;S.seen={};const d=makeDil();if(!d||!/^rv(frame|musk|bribe)$/.test(d.pid))continue;ps++;if(d.pp.a!==x.id||d.pp.b!==y.id)pb++}
   o.s3={ps,pb};o.w3=ps>0&&pb===0;
   /* 4 */calm();menInit&&menInit();const m=(S.men||[]).find(q=>q.alive);let lf=0,lb=0;
   for(let i=0;i<200;i++){delete S.npw;S.seen={};const d=makeDil();if(d&&d.pid==="loveletter")lf++}o.lv0=lf;
   if(m){const v=L[3]||L[0];v.affair=m.id;for(let i=0;i<300;i++){delete S.npw;S.seen={};const d=makeDil();if(d&&d.pid==="loveletter"){lb++;if(d.pp.v!==v.id||!d.t.includes(m.name))lb=-999}}v.affair=null}
   o.lv1=lb;o.men=!!m;o.w4=lf===0&&(!m||lb>0);
   /* 6 old save */const P=["vase","embezzle","tuyen","thbenh"].map(id=>{try{return !!mkP(id,{})}catch(e){return id+":"+e.message}});const cl=rivals.find(v=>v.alive)||rivals[0];
   let co;try{co=!!PEND.coldletter({f:cl.id,v:null})}catch(e){co=e.message}o.old=P.concat([co]);
  }finally{}
  /* 5 pace */Q.length=0;const g=BAL.ag.why.dil.gap;const wks=[];const md0=makeDil;makeDil=function(){const d=md0.apply(this,arguments);if(d)wks.push(wk());return d};const pd0=pushDil;pushDil=function(){};try{S.dilW=0;L[0].oan=80;L[0].rel=-30;for(let i=0;i<24&&!S.dead;i++){Q.length=0;try{endTurn()}catch(e){o.e5=e.message}}}finally{pushDil=pd0;makeDil=md0}
  o.wks=wks;o.w5=wks.every((w,i)=>!i||w-wks[i-1]>=g);return o});
 ok(r.n>=4,'setup',r.n);ok(r.w1,'1 no grudge/lover/fallen: only world cards',r.c1);ok(r.w2,'2 scheming cards against her name the one with the grudge + reason',r.s2);
 ok(r.w3,'3 rival-vs-rival cards = the hating pair only',r.s3);ok(r.w4,'4 love letter only with a real lover, lover named',{none:r.lv0,lover:r.lv1,men:r.men});
 ok(r.w5&&!r.e5,'5 a card at most every dil.gap tuần',{wks:r.wks,e:r.e5});ok(r.old.every(x=>x===true),'6 old pending cards build',r.old);
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat=NPW.stat;return o});
 ok(!bot.e.length,'6 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'6 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1b: '+f:'PASS npc-purpose-g1b ('+res.length+' checks)');process.exit(f?1:0)})();
