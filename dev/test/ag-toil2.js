/* AG-ALL-2 G11 checks (jagtoil): the NPC's face of the day is HER CHOICE, with the player's costs and consequences.
   1 choice varies by nết: histogram of the chosen way (moc / nha / cauky / dam) over many NPC-days, vain (Kiêu ngạo / Tham vọng) vs modest
     (Khiêm nhường / Ân cần); never one way only; once per NPC per day (cached v.tl2, the second read does not choose again)
   2 fallback: BAL.ag.toil2.on = 0 or BAL.ag.on = 0 → the old toilNpc hash look (no choice record)
   3 consequences = the player's functions: an NPC with a Diêm dúa face is judged by Thái hậu through toilFx (the same "dung nhan Diêm dúa"
     part and number the player gets for the same face), the regard row moves by exactly that; a consort who sees her mocks her by the player's
     rule (toilSeeRule, the same verdict toilRival gives on the player's Diêm dúa face) and she answers with toilAns (Đáp lại: her Sức / Danh by
     BAL.toil); the meeting pass (tl2Meet) logs both when the player stands there
   4 co-op: the host's records (toil2Wire, sent with "where") are read by a guest (agOn false), who never chooses; before they come the guest
     shows the old look; old save (no v.tl2) loads and chooses on first need
   5 40 buổi played: no throw, meeting pass ran; no page errors
   usage: python3 dev/build/assemble.py && node dev/test/ag-toil2.js dev/index.html   → exit 1 on any FAIL */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0||'')?URL0:'file://'+require('path').resolve(URL0||'dev/index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=()=>p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  try{deal()}catch(e){}render();return{n:liveRivals(true).length}});
 await fresh();
 /* 1 histogram */
 const r1=await p.evaluate(()=>{const H={vain:{},modest:{},other:{}},T0=S.turn;let n=0,ms=0,cache=true;const R=liveRivals(true).filter(v=>!v.coop&&toilOn(v));
  const grp=v=>{const T=traitsOf(v);return T.some(t=>t==="Kiêu ngạo"||t==="Tham vọng")?"vain":T.some(t=>t==="Khiêm nhường"||t==="Ân cần")?"modest":"other"};
  /* the same consorts under each nết in turn (so the groups differ only by nết) */
  const sets={vain:["Kiêu ngạo"],modest:["Khiêm nhường"]};const tOf=traitsOf;
  for(const g of ["vain","modest"]){traitsOf=function(v){return (rivals||[]).includes(v)?sets[g]:tOf.apply(this,arguments)};
   try{for(let d=0;d<30;d++){S.turn=T0+d;for(const v of R){delete v.tl2;const t=performance.now();const o=toilNpc(v);ms+=performance.now()-t;n++;H[g][o.k]=(H[g][o.k]||0)+1;
     const k0=TL2.stat.pick[o.k];if(toilNpc(v).k!==o.k||TL2.stat.pick[o.k]!==k0)cache=false}}}finally{traitsOf=tOf}}
  S.turn=T0;for(const v of R)delete v.tl2;
  const sh=(h,ks)=>ks.reduce((a,k)=>a+(h[k]||0),0)/Math.max(1,Object.values(h).reduce((a,b)=>a+b,0));
  return{H,n,msPer:+(ms/n).toFixed(2),cache,vainBold:+sh(H.vain,["cauky","dam"]).toFixed(2),modBold:+sh(H.modest,["cauky","dam"]).toFixed(2),
   vainPlain:+sh(H.vain,["moc","nha"]).toFixed(2),modPlain:+sh(H.modest,["moc","nha"]).toFixed(2),kinds:new Set(Object.keys(H.vain).concat(Object.keys(H.modest))).size}});
 ok(r1.vainBold>r1.modBold&&r1.modPlain>r1.vainPlain,'choice by nết: vain consorts take the cầu kỳ ways more, modest ones mặt mộc / thanh nhã more',r1);
 ok(r1.kinds>=3,'never one way only (human slip / weights)',r1.H);ok(r1.cache,'once per NPC per day: the second read is the stored choice');
 ok(r1.msPer<5,'cheap: ms per choice',r1.msPer);
 /* 2 fallback */
 const r2=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.coop&&toilOn(x));delete v.tl2;BAL.ag.toil2.on=0;const a=toilNpc(v);BAL.ag.toil2.on=1;
  delete v.tl2;BAL.ag.on=0;const c=toilNpc(v);BAL.ag.on=1;delete v.tl2;return{a:a.k||null,aRec:!!v.tl2,c:c.k||null,look:a.look||null,mk:a.makeup}});
 ok(!r2.a&&!r2.c&&!r2.aRec,'switch off (toil2.on=0 / ag.on=0): the old hash look, no choice record',r2);
 /* 3 consequences */
 const r3=await p.evaluate(()=>{const R=liveRivals(false).filter(v=>!v.coop&&toilOn(v)&&!v.queen);const w=R[0],x=R.find(v=>v!==w&&!traitsOf(v).some(t=>t==="Ân cần"||t==="Khiêm nhường"))||R[1];
  const col=Object.assign({},TOIL_PRE.find(z=>z[2]==="diem")[4],{want:"diem"});
  w.tl2={wk:toilWk(),k:"dam",rec:{makeup:true,score:72,look:"diem",col,k:"dam"}};delete w.tlSeen;
  /* the player with the same face */
  const tl0=S.toilette,sn0=S.toilSeen;S.toilette={wk:toilWk(),day:toilWk()*10,makeup:true,score:72,look:"diem",col,dv:"hopdip",style:"fit"};S.toilSeen=null;
  const tMe=toilFx(S,"th",toilFOf("th"),"ok");const me=tMe&&tMe.why.find(z=>/dung nhan/.test(z[0]));
  const L=toilLook();const ruleMe=toilSeeRule(x,L);const rv=toilRival(x,false);S.toilette=tl0;S.toilSeen=sn0;
  /* her: judged by Thái hậu */
  const th0=w.th||0;const tW=toilFx(w,"th",toilFOf("th"),"ok");const her=tW&&tW.why.find(z=>/dung nhan/.test(z[0]));const t=toilJudgeNpc(w,"th");const d=(w.th||0)-th0;const again=toilJudgeNpc(w,"th");
  /* mocked by x, answers "Đáp lại" that goes well */
  const Lw=toilLookP(w);const ruleHer=toilSeeRule(x,Lw);const s0=w.suc,dn0=w.danh;const mp=mindPick,r0=roll;mindPick=O=>O.some(o=>o[0]==="reply")?"reply":mp(O);roll=()=>true;let line="";
  try{line=tl2See(x,w,Lw)}finally{mindPick=mp;roll=r0}
  /* the meeting pass with the player there: Thái hậu + another consort see w */
  const y=R.find(v=>v!==w&&v!==x)||x;delete w.tlSeen;const gp=gmPlaces;gmPlaces=()=>[[0,{ngu:["v"+w.id,"v"+y.id,"me","th"]}]];S.tl2m=null;let L2=[];const q0=S.logSeq||0;
  const mp2=mindPick;mindPick=O=>O.some(o=>o[0]==="smile")?"smile":mp2(O);try{tl2Meet();L2=(S.logs||[]).slice(0,(S.logSeq||0)-q0).map(e=>String(e).replace(/<[^>]+>/g,""))}finally{gmPlaces=gp;mindPick=mp2}
  /* what the shared ap gives an NPC for that gain (jdh addGains applies to NPC gains, the same as anywhere else) */const e0=w.danh;ap(w,{danh:BAL.toil.replyDanh});const expD=w.danh-e0;w.danh=e0;
  return{me,her,aff:tW&&tW.aff,d,expD,again:again===null,ruleMe:ruleMe&&ruleMe.k,ruleHer:ruleHer&&ruleHer.k,rv:rv&&rv.txt,line,dSuc:w.suc-s0,dDanh:w.danh-dn0,B:{s:BAL.toil.replySuc,d:BAL.toil.replyDanh},
   L2:L2.slice(0,4)/* names show as the player knows them (k61), so no name filter */}});
 ok(r3.me&&r3.her&&r3.me[0]===r3.her[0]&&r3.me[1]===r3.her[1],'Thái hậu judges her Diêm dúa face with the player\'s toilFx part',r3);
 ok(r3.d===r3.aff&&r3.aff<0&&r3.again,'reprimand: her Thái hậu regard moves by exactly that verdict, once a day',r3);
 ok(r3.ruleMe==="tease"&&r3.ruleHer==="tease"&&/che miệng cười/.test(r3.rv||"")&&/che miệng cười/.test(r3.line),'mocked by the player\'s rule (toilSeeRule = toilRival\'s verdict)',r3);
 ok(r3.dSuc===-r3.B.s&&r3.dDanh===r3.expD&&r3.dDanh>0,'her answer Đáp lại = the player\'s toilAns (Sức, Danh from BAL.toil)',r3);
 ok(r3.L2.some(z=>/quở trách/.test(z))&&r3.L2.some(z=>/che miệng cười/.test(z)),'two-way: standing there, the player reads the reprimand and the mockery in the log',r3.L2);
 /* 4 co-op + old save */
 const r4=await p.evaluate(()=>{const R=liveRivals(true).filter(v=>!v.coop&&toilOn(v));for(const v of R)delete v.tl2;const host=R.map(v=>{const o=toilNpc(v);return[v.id,o.k,o.look,o.score]});
  const wire=JSON.parse(JSON.stringify(toil2Wire()));for(const v of R)delete v.tl2;window.COOPW=window.COOPW||{};const c0={on:COOPW.on,seat:COOPW.seat};COOPW.on=1;COOPW.seat="b";let pre,post,rec;
  try{pre=R.map(v=>toilNpc(v).k||null);rec=R.filter(v=>v.tl2).length;toil2Take(wire);post=R.map(v=>{const o=toilNpc(v);return[v.id,o.k,o.look,o.score]})}finally{COOPW.on=c0.on;COOPW.seat=c0.seat}
  /* old save: no tl2 field through a save round trip */
  for(const v of R)delete v.tl2;let old=true;try{save();const v=R[0];old=!!toilNpc(v).k}catch(e){old=false}
  return{n:R.length,wireN:wire?Object.keys(wire).length:0,pre:pre.filter(Boolean).length,rec,same:JSON.stringify(host)===JSON.stringify(post),old,src:/__tl2/.test(String(COOPW.on!==undefined&&typeof sendWhere==="function"?sendWhere:""))}});
 ok(r4.wireN===r4.n&&r4.pre===0&&r4.rec===0,'guest: never chooses (no record, old look) until the host\'s records come',r4);
 ok(r4.same,'guest renders the host\'s chosen looks (toil2Wire → toil2Take)',r4);ok(r4.old,'old save without the field: chosen on first need',r4);
 /* 5 play */
 const r5=await p.evaluate(()=>{const E=[];const ce=console.error;console.error=(...a)=>{E.push(a.map(String).join(" ").slice(0,200));ce.apply(console,a)};const m0=TL2.stat.meet,p0=Object.values(TL2.stat.pick).reduce((a,b)=>a+b,0);
  try{for(let i=0;i<40&&!S.dead;i++){Q.length=0;try{closeAll()}catch(e){}try{if(typeof agTick==="function")agTick()}catch(e){E.push("throw "+e.message)}nextBuoi();Q.length=0;try{closeAll()}catch(e){}}}catch(e){E.push("throw "+e.message)}finally{console.error=ce}
  return{E:E.filter(x=>/toil/i.test(x)).slice(0,5),meet:TL2.stat.meet-m0,picks:Object.values(TL2.stat.pick).reduce((a,b)=>a+b,0)-p0,stat:TL2.stat,ms:+(Math.max(0,...TL2.ms)).toFixed(2)}});
 ok(!r5.E.length,'40 buổi: no throw',r5);ok(r5.picks>0,'played days: NPCs chose their faces',r5);
 ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(1)});
