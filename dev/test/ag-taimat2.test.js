/* AG-ALL-2f2 checks — TAI MẮT ONE CORE + EARNED (owner OD 17/11 ~16:25Z "3 tai mắt nhưng không biết là ai" + ~16:50Z "tai mắt phải phụ thuộc tính cách";
   report dev/handover/reports/ag-all.md §21.7).
   1 the number IS the list: S.mat === taiMatList().length (the header chip "Tai mắt N" reads it); writes to S.mat change nothing
   2 a gain (apply / ap {mat:+n}) = a real person who chose: every new Tai mắt is a real servant of another palace; a refusal names the person
   3 a loyal servant of another consort mostly refuses an active approach (Cài tai mắt / bribeServ) and often tells her master (evidence + lòng)
   4 what the person wants raises the odds (grudge / ill-treated / higher patron)
   5 NPC parity: ap(v,{mat}) and the cx3 "Cài tai mắt" card recruit only real people, by the same choice
   6 no automatic Tai mắt: new game = 0 for everyone (origins / NPC birth give none); the j7 volunteer is a real willing servant
   7 old save: a stored S.mat N → N placed real spies where willing people exist (else the real count); NPC stored mat dropped
   usage: node dev/test/ag-taimat2.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 6 new game */
 const r6=await p.evaluate(()=>({me:S.mat,list:taiMatList().length,npc:liveRivals(true).map(v=>v.mat),orig:ORIGINS.filter(o=>o.o&&o.o.mat).map(o=>o.k),acc:!!Object.getOwnPropertyDescriptor(S,"mat").get,
  accR:liveRivals(true).every(v=>{const d=Object.getOwnPropertyDescriptor(v,"mat");return d&&d.get})}));
 ok(r6.me===0&&r6.list===0&&r6.npc.every(n=>n===0)&&!r6.orig.length,'no automatic Tai mắt: new game = 0 for her and every NPC; no origin gives one',r6);
 ok(r6.acc&&r6.accR,'every consort reads mat from the list (accessor on S and every rival)');
 /* 1 one core */
 const r1=await p.evaluate(()=>{for(const s of allServ())s.spyFor=null;const R=liveRivals(true).filter(v=>(v.staff||[]).length);R[0].staff[0].spyFor="me";R[1].staff[0].spyFor="me";
  const a=S.mat,l=taiMatList().length;S.mat=7;const b=S.mat;S.mat+=1;const c=S.mat;render();let chip=null;try{const h=document.body.innerText.match(/Tai mắt\s*\n?\s*(\d+)/);chip=h?+h[1]:null}catch(e){}
  const snap=Object.prototype.hasOwnProperty.call(JSON.parse(JSON.stringify(ser().S)),"mat");return{a,l,b,c,chip,snap}});
 ok(r1.a===2&&r1.l===2&&r1.b===2&&r1.c===2,'the number IS the list: S.mat == taiMatList().length; writes change nothing',r1);
 ok(r1.chip===null||r1.chip===2,'header chip "Tai mắt N" shows the real count',r1.chip);
 ok(!r1.snap,'the save stores no separate mat number (one source)');
 /* 2 a gain = a real person who chose */
 const r2=await p.evaluate(()=>{for(const s of allServ())s.spyFor=null;S.bac=9999;const L0=[];let fake=0,got=0,ref=0;const t0=(KN.stat.tmTry||0)-(KN.stat.tmOk||0);
  for(let i=0;i<40;i++){const n0=taiMatList().length;apply({mat:1});const n1=taiMatList().length;if(n1!==S.mat)fake++;if(n1>n0)got++;else ref++;}
  const list=taiMatList();const real=list.every(x=>x.p&&x.p.spyFor==="me"&&ownerOf(x.p)&&ownerOf(x.p)!==S&&x.name);
  const lg=(S.log||[]).map(x=>typeof x==="string"?x:(x.t||x.h||"")).join("\n");const named=/nhận làm tai mắt cho ngươi/.test(lg)||/không nhận làm tai mắt/.test(document.body.innerHTML+lg);
  return{got,ref,fake,n:list.length,real,refused:(KN.stat.tmTry||0)-(KN.stat.tmOk||0)-t0}});
 ok(r2.fake===0&&r2.real&&r2.got>0,'apply({mat:+1}) never adds "+1 with nobody": each new Tai mắt is a real servant of another palace',r2);
 ok(r2.refused>0||r2.got===40,'some approached people refuse (their own choice)',r2);
 /* 3 loyal servant refuses + tells */
 const r3=await p.evaluate(()=>{for(const s of allServ())s.spyFor=null;const v=liveRivals(true).find(v=>(v.staff||[]).length);const s=v.staff[0];const k0=s.net;
  s.net="trung";s.loyal=100;s.grudge=0;let take=0,tell=0,quiet=0;const e0=evG(v,S);
  for(let i=0;i<200;i++){s.spyFor=null;s.loyal=100;S.bac=9999;const r=bribeServ(S,s);if(s.spyFor==="me")take++;else if(/mách/.test(r))tell++;else quiet++}
  const e1=evG(v,S);const lo=bribeOdds(S,s);s.net=k0;
  /* the deck card: a real person, odds = the person's own */
  for(const x of allServ())x.spyFor=null;const C=P3C.eyes(S);const bs=tmBest(S);
  return{take,tell,quiet,lo,ev:[e0,e1],card:{t:C.t,o:C.o,named:!!bs&&C.t.includes(bs.name),same:bs?C.o===bribeOdds(S,bs):false,cost:C.c}}});
 ok(r3.take<70&&r3.tell>r3.quiet&&r3.tell>60,'a loyal servant of another consort mostly refuses and tells her master',r3);
 ok(r3.ev[1]>r3.ev[0],'the master gains evidence against her when told',r3.ev);
 ok(r3.card.named&&r3.card.same&&r3.card.cost.bac<0,'"Cài tai mắt" names a real person; its odds = that person\'s bribeOdds; cost = her bribe price',r3.card);
 /* 4 want */
 const r4=await p.evaluate(()=>{const v=liveRivals(true).find(v=>(v.staff||[]).length&&!v.queen&&(v.rank||0)<5);const s=v.staff[0];const g0=s.grudge,l0=s.loyal,rk0=S.rank,af0=aff,b0=S.bac;
  S.rank=6;S.bac=0;aff=()=>-10;s.loyal=60;s.grudge=0;const a=bribeOdds(S,s);s.grudge=1;const b=bribeOdds(S,s);s.grudge=0;s.loyal=BAL.loy.low-5;const c=bribeOdds(S,s);const w=tmWant(S,s);
  s.grudge=g0;s.loyal=l0;S.rank=rk0;S.bac=b0;aff=af0;return{a,b,c,w}});
 ok(r4.b>r4.a&&r4.c>r4.a,'what the person wants (revenge, protection) raises the odds',r4);
 /* 5 NPC parity */
 const r5=await p.evaluate(()=>{for(const s of allServ())s.spyFor=null;const v=liveRivals(true).find(v=>v.alive&&!v.out);v.bac=9999;let bad=0;
  for(let i=0;i<20;i++){ap(v,{mat:1});if(v.mat!==taiMatList(v).length)bad++}const L=taiMatList(v);const real=L.every(x=>ownerOf(x.p)&&ownerOf(x.p)!==v);
  const C=P3C.eyes(v);const bs=tmBest(v);const n0=taiMatList(v).length;let r="";for(let i=0;i<10;i++){r=p3Run(v,P3C.eyes(v),"eyes")}const n1=taiMatList(v).length;
  return{bad,n:L.length,real,card:!!bs&&C.t.includes(bs.name),n0,n1,r}});
 ok(r5.bad===0&&r5.real&&r5.card&&r5.n1>=r5.n0,'NPC parity: ap(v,{mat}) and cx3 "Cài tai mắt" recruit only real people who chose',r5);
 /* 6b volunteer event */
 const r6b=await p.evaluate(()=>{for(const s of allServ())s.spyFor=null;const e=EVI.eunuch;const okNow=e.ok();const s=tmVol();if(!okNow)return{none:1,s:!!s};const pp=e.pp();const d=e.b(pp);const s2=servById(pp.sid);
  return{name:s2&&d.t.includes(s2.name),other:s2&&ownerOf(s2)!==S,odds:bribeOdds(S,s2),min:BAL.ag.know.tm.vol.min}});
 ok(r6b.none?!r6b.s:(r6b.name&&r6b.other&&r6b.odds>=r6b.min),'j7 volunteer = a real willing servant of another palace (or no event)',r6b);
 /* 7 old save */
 const r7=await p.evaluate(()=>{for(const s of allServ())s.spyFor=null;const d=JSON.parse(JSON.stringify(ser()));d.S.mat=3;d.R.forEach(r=>r.mat=2);deser(d);
  const a={mat:S.mat,list:taiMatList().length,mig:KN.stat.tmMig,npc:liveRivals(true).map(v=>v.mat)};
  const d2=JSON.parse(JSON.stringify(ser()));d2.S.mat=999;deser(d2);const b={mat:S.mat,list:taiMatList().length,cands:tmCands(S).length};return{a,b}});
 ok(r7.a.mat===3&&r7.a.list===3&&r7.a.npc.every(n=>n===0),'old save: stored S.mat 3 → 3 real placed spies; NPC stored mat dropped',r7.a);
 ok(r7.b.mat===r7.b.list,'old save: more than real people → the real count',r7.b);
 const ag=await p.evaluate(()=>{try{return (window.AGD&&AGD.err||[]).slice(0,3)}catch(e){return[]}});
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`AG-TAIMAT2: ${f} FAIL`:`AG-TAIMAT2: ALL ${res.length} PASS`);process.exit(f?1:0)})();
