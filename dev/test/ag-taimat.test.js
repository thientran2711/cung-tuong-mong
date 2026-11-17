/* AG-ALL-2f checks — TAI MẮT data link (jagknow; owner OD 17/11 ~16:25Z; report dev/handover/reports/ag-all.md §21).
   1 taiMatList(p) = the REAL servants of other palaces whose spyFor is p's key (her own staff never; another consort's spy not hers); two-way for NPCs
   2 every TIN BÁO producer sets the informer: knScan "mat" → one of her real Tai mắt (placed where it happened first), none placed → a real passer-by
     (not a Tai mắt); servant report (knBao) → her own servant; a bought servant of another palace selling her master's errand → her Tai mắt; friend → friend;
     the "Tai mắt báo" line names the person; bot run: every item that is not "here" / "le" resolves to a real living-or-recorded person with a name
   3 a sell-out (her own servant / confidant maid bought by another) shows soldOutKnown only after knSoldFound; every discovery site calls it
   4 old save: no S.tmSold / S.tmN, old items without inf → informerInfo derives from by or returns null; no page / agent errors
   usage: node dev/test/ag-taimat.test.js [dev/index.html] [days] → exit 1 on any FAIL */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const DAYS=+process.argv[3]||6;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 1 list */
 const r1=await p.evaluate(()=>{const R=liveRivals(true).filter(v=>v.alive&&!v.out&&(v.staff||[]).length);if(R.length<2)return{skip:1};const [v,w]=R;
  for(const s of allServ())if(s.spyFor==="me")s.spyFor=null;const a=v.staff[0],c=w.staff[0];a.spyFor="me";c.spyFor=v.id;const own=(S.staff||[])[0];if(own)own.spyFor="me";KN.m=null;
  const L=taiMatList();const Lv=taiMatList(v);const it0=L.find(x=>x.sid===a.sid);const it=it0?Object.assign({},it0,{p:it0.p===a}):null;
  return{n:L.length,has:!!it,it,place:palaceOf(v),vk:"v"+v.id,own:own?L.some(x=>x.sid===own.sid):false,vHas:Lv.some(x=>x.sid===c.sid),vMine:Lv.some(x=>x.sid===a.sid),cMine:L.some(x=>x.sid===c.sid)}});
 ok(!r1.skip&&r1.has&&r1.n===1&&r1.it.placedAt===r1.place&&r1.it.placedWith===r1.vk&&r1.it.name&&r1.it.role&&r1.it.loyaltyKnown===null,'list: her Tai mắt = the real servant she placed in another palace (name, role, where, loyalty as she knows it: unknown)',r1);
 ok(r1.it&&r1.it.p===true&&r1.it.place===r1.place&&r1.it.loy===null&&r1.it.loyalWord==="chưa rõ"&&r1.it.sold===false,'list: tinbao-ui adapter fields (p, place, loy, loyalWord, sold)',r1.it);
 ok(!r1.own&&!r1.cMine,'list: her own staff and another consort\'s spy are NOT her Tai mắt',{own:r1.own,c:r1.cMine});
 ok(r1.vHas&&!r1.vMine,'two-way: taiMatList(v) lists the NPC\'s own placed spy, not hers',{vHas:r1.vHas,vMine:r1.vMine});
 /* 2 producers */
 const r2=await p.evaluate(()=>{const o={};const R=liveRivals(true).filter(v=>v.alive&&!v.out&&(v.staff||[]).length);const [v,w]=R;const a=v.staff[0];a.spyFor="me";KN.m=null;
  const h={k:palaceOf(w),id:"deed",x:null};const e1=knEye(S,h,"t1");o.mat={by:e1&&e1.by,sid:e1&&e1.e&&e1.e.sid,want:a.sid};
  const line=knLine(e1,{k:palaceOf(w),id:"vuon"});o.matLine=line;o.matName=line.includes(a.name);
  o.matInfo=informerInfo({by:"mat",inf:knInf(e1),infName:knInfName(e1)});
  /* she placed one in the very palace where it happens: that one reports */
  const b=w.staff[0];b.spyFor="me";KN.m=null;const e2=knEye(S,h,"t2");o.near=e2&&e2.e&&e2.e.sid===b.sid;b.spyFor=null;
  /* none placed: a real passer-by */
  a.spyFor=null;KN.m=null;const e3=knEye(S,h,"t3");o.pass={by:e3&&e3.by,real:!!(e3&&e3.e&&servById(e3.e.sid)),own:!!(e3&&e3.e&&(S.staff||[]).includes(e3.e))};
  o.passInfo=informerInfo({by:"pass",inf:knInf(e3),infName:knInfName(e3)});o.passLine=knLine(e3,{k:palaceOf(w),id:"vuon"});
  /* her own servant reports (knBao) */
  const s=(S.staff||[]).find(x=>x.sid!=null)||null;if(s){s.spyFor=null;knBao(s,S,"đi nghe ngóng được chuyện về "+v.name,palaceOf(v));const T=knTb();const it=T.R[T.R.length-1];o.bao={inf:it.inf,infName:it.infName,info:informerInfo(it)}}
  /* a bought servant of v (spyFor me) sells v's errand to her = her Tai mắt */
  a.spyFor="me";S.tmN={};knErrSell(a,v,"listen",null);{const T=knTb();const it=T.R[T.R.length-1];o.sell={inf:it.inf,info:informerInfo(it),n:S.tmN[a.sid]||0,list:(taiMatList().find(x=>x.sid===a.sid)||{}).reports}}
  /* a friend */
  o.friend=informerInfo({by:"v"+v.id});
  return o});
 ok(r2.mat.by==="mat"&&r2.mat.sid===r2.mat.want&&r2.matInfo&&r2.matInfo.kind==="taiMat"&&r2.matInfo.isTaiMat,'producer "mat": the informer is her REAL Tai mắt',{mat:r2.mat,info:r2.matInfo});
 ok(r2.matName&&/^Tai mắt báo/.test(r2.matLine),'"Tai mắt báo" line names that person',r2.matLine);
 ok(r2.near,'the Tai mắt placed in the palace where it happens is the one who reports');
 ok(r2.pass.by==="pass"&&r2.pass.real&&!r2.pass.own&&r2.passInfo&&r2.passInfo.kind==="passerby"&&!r2.passInfo.isTaiMat&&r2.passInfo.name,'none placed: a real passer-by (not her Tai mắt), named',{pass:r2.pass,info:r2.passInfo,line:r2.passLine});
 ok(r2.bao&&/^s\d+$/.test(r2.bao.inf)&&r2.bao.info.kind==="ownMaid"&&r2.bao.info.name===r2.bao.infName&&!r2.bao.info.isTaiMat,'producer knBao: her own servant',r2.bao);
 ok(r2.sell.info&&r2.sell.info.kind==="taiMat"&&r2.sell.info.isTaiMat&&r2.sell.n===1&&r2.sell.list===1,'producer knErrSell (her bought servant in a rival palace): her Tai mắt; report counted',r2.sell);
 ok(r2.friend&&r2.friend.kind==="friend"&&r2.friend.name,'friend informer',r2.friend);
 ok(r2.matInfo.code==="mat"&&r2.passInfo.code==="qua"&&r2.bao.info.code==="hau"&&r2.friend.code==="ban"&&/Tai mắt /.test(r2.matInfo.label),'tinbao-ui codes: mat / qua / hau / ban + label',{m:r2.matInfo.label,q:r2.passInfo.label,h:r2.bao.info.label,b:r2.friend.label});
 /* 3 sold out hidden until discovered */
 const r3=await p.evaluate(()=>{const v=liveRivals(true).find(x=>x.alive&&!x.out);const s=(S.staff||[]).find(x=>x.sid!=null);if(!s||!v)return{skip:1};S.tmSold=null;s.spyFor=v.id;
  knBao(s,S,"đi nghe ngóng một vòng nhưng chưa nghe được chuyện gì đáng bẩm",null);const T=knTb();const it=T.R[T.R.length-1];const before=informerInfo(it).soldOutKnown;
  knSoldFound(s);const after=informerInfo(it).soldOutKnown;const code=informerInfo(it).code;s.spyFor=null;const cleared=informerInfo(it).soldOutKnown;
  /* the confidant maid (no sid) */let cm=null;if(S.maid){const m0=S.maid.spyFor;S.maid.spyFor=v.id;S.tmSold=null;const i2={by:"scmme",inf:"maid"};const b2=informerInfo(i2).soldOutKnown;knSoldFound(S.maid);cm={b:b2,a:informerInfo(i2).soldOutKnown,kind:informerInfo(i2).kind};S.maid.spyFor=m0}
  return{before,after,cleared,cm,code}});
 ok(!r3.skip&&r3.before===false&&r3.after===true&&r3.cleared===false&&r3.code==="sold",'sell-out: hidden until discovered, shown after, gone when she is no longer sold',r3);
 ok(!r3.cm||(r3.cm.b===false&&r3.cm.a===true&&r3.cm.kind==="ownMaid"),'sell-out: the confidant maid too',r3.cm);
 const src=fs.readFileSync(path.join(__dirname,'..','build','j68f.js'),'utf8').split('knSoldFound(').length-1+['j10.js','j14.js','jeitem.js','j72.js'].reduce((n,f)=>n+(fs.readFileSync(path.join(__dirname,'..','build',f),'utf8').split('knSoldFound(').length-1),0);
 ok(src>=7,'every discovery site records the discovery (j68f ×3, j10 Tra khảo, j14 tra xét, jeitem Tra khảo, j72 Giữ lại)',src);
 /* bot run: every non-public item resolves to a real person */
 const r4=await p.evaluate((DAYS)=>{const out={items:0,bad:[],kinds:{}};const seen=new Set();tmPlace(S,6);
  const R=liveRivals(true).filter(v=>v.alive&&!v.out&&(v.staff||[]).length);if(R[1])R[1].staff[0].spyFor="me";
  for(let d=0;d<DAYS;d++){for(let bb=0;bb<4;bb++){Q.length=0;S.mg=0;try{placeWhere();agFlush()}catch(e){}
    try{for(const it of tinBaoList()){if(seen.has(it.id))continue;seen.add(it.id);if(it.by==="here"||it.by==="le")continue;out.items++;const f=informerInfo(it);
     if(!f||!f.name||!it.inf||!it.infName)out.bad.push({id:it.id,by:it.by,inf:it.inf,f});else out.kinds[f.kind]=(out.kinds[f.kind]||0)+1}}catch(e){out.bad.push(String(e))}
    try{nextBuoi()}catch(e){}Q.length=0}}return out},DAYS);
 console.log('bot: '+JSON.stringify(r4));
 ok(r4.items>0&&r4.bad.length===0,'bot run: every TIN BÁO item (not here / public) names a real informer',{items:r4.items,bad:r4.bad.slice(0,3),kinds:r4.kinds});
 /* 5 EARNED (owner OD 17/11 ~16:50Z) */
 const r6=await p.evaluate(()=>{const o={};const R0=Math.random;const seq=a=>{let i=0;Math.random=()=>i<a.length?a[i++]:R0()};
  o.one=bribeOdds===tmOdds;
  /* the number she sees = the real list */
  for(const s of allServ())if(s.spyFor==="me")s.spyFor=null;tmSync(S);o.zero=S.mat===0&&taiMatList().length===0;
  apply({mat:2});o.after={mat:S.mat,list:taiMatList().length,all:taiMatList().every(x=>x.p.spyFor==="me")};
  /* loyal servants mostly refuse: odds of a top-loyal, non-greedy servant vs a disloyal greedy one */
  const cand=tmCands(S);const s=cand[0];const L0=s.loyal,G0=s.grudge;/* 2f3: same nết both ways (a loyal-nết one floors at BAL.odds.lo either way) */netOf(s);const N0=s.net;s.net=s.net.slice();s.net[1]="Ham lợi";s.loyal=95;s.grudge=0;const loyO=tmOdds(S,s);s.loyal=10;const disO=tmOdds(S,s);s.loyal=L0;s.grudge=G0;s.net=N0;o.odds={loyal:loyO,disloyal:disO};
  /* a loyal servant of hers refuses an NPC and tells her (true TIN BÁO); the NPC loses her regard */
  const v=liveRivals(true).find(x=>x.alive&&!x.out);const mine=(S.staff||[]).find(x=>x.sid!=null);let tell=null;
  if(v&&mine){mine.loyal=90;mine.spyFor=null;const a0=aff(S,v);const n0=knTb().R.length;seq([0]);const t=tmRefuse(v,mine);Math.random=R0;const it=knTb().R[knTb().R.length-1];
   tell={t,bao:knTb().R.length>n0&&it&&it.line.includes(v.name)&&informerInfo(it).kind==="ownMaid",aff:aff(S,v)-a0}}
  o.tell=tell;
  /* the whole try: everyone loyal and Math.random high → nobody joins, number unchanged */
  for(const x of allServ())if(x.spyFor==="me")x.spyFor=null;tmSync(S);seq(new Array(40).fill(.999));const n0=S.mat;apply({mat:3});Math.random=R0;o.noAuto={before:n0,after:S.mat,list:taiMatList().length};
  /* NPC parity: the same gain path for a consort */
  if(v){for(const x of allServ())if(x.spyFor===v.id)x.spyFor=null;tmSync(v);ap(v,{mat:2});o.npc={mat:v.mat,list:taiMatList(v).length}}
  /* old save: a stored number with nobody behind it → tries once, then the real count */
  for(const x of allServ())if(x.spyFor==="me")x.spyFor=null;S.mat=3;delete S.tmMig;tmSync(S);o.old={mat:S.mat,list:taiMatList().length,mig:S.tmMig};
  return o});
 ok(r6.one,'ONE odds: bribeOdds (Mua chuộc, every NPC bribeServ) = tmOdds');
 ok(r6.zero&&r6.after.mat===r6.after.list&&r6.after.all,'the Tai mắt number = the real list (gain = tries; only those who accepted are listed)',r6.after);
 ok(r6.odds.loyal<r6.odds.disloyal&&r6.odds.loyal<=40,'a loyal servant is much harder to win than a disloyal one',r6.odds);
 ok(r6.tell&&r6.tell.t==="tell"&&r6.tell.bao&&r6.tell.aff<0,'a loyal servant refuses an NPC, tells her master (TIN BÁO from her own servant), the recruiter loses regard',r6.tell);
 ok(r6.noAuto.after===r6.noAuto.before&&r6.noAuto.list===r6.noAuto.after,'no automatic Tai mắt: when everyone refuses, "+3" adds nobody',r6.noAuto);
 ok(r6.npc&&r6.npc.mat===r6.npc.list,'NPC parity: a consort\'s number = her real list, same path',r6.npc);
 ok(r6.old.mat===r6.old.list&&r6.old.mat<=3&&r6.old.mig===1,'old save: stored number → real people only (tries once), then the real count',r6.old);
 /* 4 old save */
 const r5=await p.evaluate(()=>{delete S.tmSold;delete S.tmN;const s=(S.staff||[]).find(x=>x.sid!=null);let a=null,b=null,c=null;try{a=informerInfo({by:"mat"});b=s?informerInfo({by:"s"+s.sid}):"x";c=taiMatList().length>=0}catch(e){return{err:String(e)}}
  return{a,b:b&&b.kind,c}});
 ok(!r5.err&&r5.a===null&&(r5.b==="ownMaid"||r5.b===undefined)&&r5.c,'old save: no tmSold / tmN, old items without inf load (derive from by, or none)',r5);
 const ag=await p.evaluate(()=>(AG.errs||[]).slice(0,3));
 ok(errs.length===0&&!ag.length,'no page errors / agent errors',{page:errs.slice(0,3),ag});
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`AG-TAIMAT: ${f} FAIL`:`AG-TAIMAT: ALL ${res.length} PASS`);process.exit(f?1:0)})();
