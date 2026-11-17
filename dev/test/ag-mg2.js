/* AG-ALL-2b mg2 checks — NPC mini-games = ONE draw from the player's own curve (owner OD 17/11 ~15:25Z (3)), fresh consort life:
   per game: the NPC result goes through the shared jmgt mgNpcRaw (spy), N draws have a spread (never always the top / always the win),
   and the median sits on the player's median for the same skill (BAL.ag.mg2.med at the same mgTier gap, the bot-measured curve).
   games: j71 contests (cScore7 rows + cOdds7 odds words), j82 rival rows (kg82NpcRaw), jts summons (đàn / cờ / du hồ) + lanterns,
   jexam promotion exam (consorts exSim, servants exSrvNpc), j83 works (wkNpcRaw), j85 NPC lessons (npcStudyDo), jslap slap tier + dodge;
   off switch (BAL.ag.mg2.on 0 / agOn false) = the old paths; 0 page errors.
   usage: node dev/test/ag-mg2.js <page URL or file>   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0||'')?URL0:'file://'+require('path').resolve(URL0||'dev/index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render();
  /* spy on the ONE core: every NPC draw lands here with its game and occasion */
  const m0=mgNpcRaw;window.__mg=[];mgNpcRaw=function(kind,pp,o){const r=m0.apply(this,arguments);__mg.push({kind,occ:(Object.assign({},MGX.o||{},o||{})).occ,raw:r,me:pp===S});return r};
  window.__med=a=>{const s=a.slice().sort((x,y)=>x-y);return s.length?s[Math.floor(s.length/2)]:null};
  window.__twin=(v)=>{v.arts=Object.assign({},S.arts);v.vir=Object.assign({},S.vir||{});v.rank=S.rank;v.queen=false;return v}});
 /* AG-ALL-2d: the per-NPC hand ceiling (owner OD L1640) sits on top of this core; ag-mg2 checks the core curve + wiring with the hands off, dev/test/ag-mgh.js checks the hands */await p.evaluate(()=>{BAL.ag.mg2.hand.on=0});
 const on=await p.evaluate(()=>({ag:agOn(),mg2:mg2On(),med:BAL.ag.mg2.med}));ok(on.ag&&on.mg2,'switch: agOn and mg2On on a fresh host life',on);
 /* 0 the core itself: N draws at her matching board */
 const r0=await p.evaluate(()=>{const N=3000,a=[];for(let i=0;i<N;i++)a.push(mgNpcRaw("dan",null,{occ:"hoc",d:0}));const top=a.filter(x=>x>=9).length/N,ten=a.filter(x=>x===10).length/N;
  return{med:__med(a),min:Math.min(...a),max:Math.max(...a),top:+top.toFixed(3),ten:+ten.toFixed(3),want:mgMedD(0)}});
 ok(r0.min<r0.max&&r0.ten<.2,'core: a spread round the median, a perfect 10 is rare',r0);ok(Math.abs(r0.med-r0.want)<=.75,'core: median = the bot-measured median at the matching board',r0);
 ok(r0.top>.1&&r0.top<.4,'core: "Xuất sắc" (≥ 9) about as often as the skilled bot at the matching level (20–30 %)',r0);
 /* 1 j71 contests: rows of NPC twins of her (same arts, rank) */
 const r1=await p.evaluate(()=>{const v=__twin(liveRivals(true)[0]);const V=[0,1,2].map(i=>Object.assign({},v,{id:9000+i}));/* three seats of the SAME skill (copies): only the play part differs */const kind="dan";__mg.length=0;const wins=[0,0,0];const lk=[];const N=600;
  for(let i=0;i<N;i++){const L=mgX7(false,()=>cScore7(V,()=>kind,[],0));const s=L.map(x=>x.s);wins[L[0].p.id-9000]++;L.forEach(x=>lk.push(x.lk))}
  const raws=__mg.filter(x=>x.kind===kind).map(x=>x.raw);const herMed=mgMedD(mgTier(kind,{occ:"hoi"}).d);
  const od=mgX7(false,()=>{const n0=__mg.length;const o=cOdds7(kind,[S].concat(V),[],0,12345);return{o,n:__mg.length-n0}});
  return{calls:raws.length,occ:[...new Set(__mg.map(x=>x.occ))],med:__med(raws),herMed:+herMed.toFixed(2),maxWinShare:Math.max(...wins)/N,lkMin:Math.min(...lk),lkMax:Math.max(...lk),odds:od}});
 ok(r1.calls===1800&&r1.occ.length===1&&r1.occ[0]==="hoi",'contest rows: every NPC row draws through mgNpcRaw on the contest board (occ hoi)',r1);
 ok(Math.abs(r1.med-r1.herMed)<=.75,'contest rows: NPC median = her median for the same skill',r1);ok(r1.maxWinShare<.75&&r1.lkMin<r1.lkMax,'contest rows: three seats of the same skill share the wins (spread, no sure winner)',r1);
 ok(r1.odds.n>0&&r1.odds.o>=3&&r1.odds.o<=97,'contest odds words: drawn with the same core (cOdds7)',r1.odds);
 /* 2 j82 rival rows (kg82NpcRaw) + her skip = her median */
 const r2=await p.evaluate(()=>{const v=__twin(liveRivals(true)[0]);__mg.length=0;const a=[];for(let i=0;i<800;i++)a.push(kg82NpcRaw(v,"co",{occ:"hoi",big:true}));
  return{calls:__mg.length,med:__med(a),herMed:+mgMedD(mgTier("co",{occ:"hoi",big:true}).d).toFixed(2),skip:mgSkipRaw(mgTier("co",{occ:"hoi",big:true})),min:Math.min(...a),max:Math.max(...a)}});
 ok(r2.calls===800&&Math.abs(r2.med-r2.herMed)<=.75&&r2.min<r2.max,'j82 rivals: kg82NpcRaw = mgNpcRaw, median = hers, spread',r2);ok(Math.abs(r2.skip-r2.herMed)<=.5,'her "Để tài nghệ quyết định" = her median on that board',r2);
 /* 3 jts: the Emperor's private summons + lanterns */
 const r3=await p.evaluate(()=>{const v=__twin(liveRivals(true)[0]);__mg.length=0;const s0=v.sung;const g=[];for(let i=0;i<400;i++){const b=v.sung;tsSummonGo(v);g.push(v.sung-b);v.sung=Math.min(v.sung,60)}
  const ks=[...new Set(__mg.map(x=>x.kind))],occ=[...new Set(__mg.map(x=>x.occ))];const byK={};__mg.forEach(x=>(byK[x.kind]=byK[x.kind]||[]).push(x.raw));
  const meds={};for(const k in byK)meds[k]={npc:__med(byK[k]),her:+mgMedD(mgTier(k,{occ:"trieu"}).d).toFixed(2)};
  /* lanterns on a festival night */const f0=tsDenFest;tsDenFest=()=>({k:"nguyentieu",name:"Nguyên tiêu"});S.emp.mood=0;const L=liveRivals(true);L.forEach(x=>{x.sung=Math.max(x.sung||0,30)});
  const n0=__mg.length;const r0=roll;roll=()=>true;try{for(let i=0;i<5;i++){tsS().denN="";tsDenNpc()}}finally{roll=r0;tsDenFest=f0}const den=__mg.slice(n0).filter(x=>x.kind==="den");
  return{calls:__mg.length-den.length,ks,occ,meds,gains:[...new Set(g)].sort(),den:den.length,denOcc:[...new Set(den.map(x=>x.occ))]}});
 ok(r3.calls===400&&r3.occ.includes("trieu"),'summons: every NPC summons draws through mgNpcRaw on the summons board (occ trieu)',r3);
 ok(Object.values(r3.meds).every(m=>Math.abs(m.npc-m.her)<=.75),'summons: NPC median = her median per game (dan / co / duho)',r3.meds);ok(r3.gains.length>=2,'summons: the Sủng gain varies (no fixed best)',r3.gains);
 ok(r3.den>0&&r3.denOcc.every(o=>o==="trieu"),'lanterns: an NPC lantern = one draw of her lantern game',r3);
 /* 4 jexam: consorts and servants */
 const r4=await p.evaluate(()=>{const v=__twin(liveRivals(true)[0]);__mg.length=0;let pass=0;const N=300;for(let i=0;i<N;i++)if(exSim(v).pass)pass++;const ex=__mg.slice();
  const P=exPlan(v);const meds=P.rounds.map(k=>({k,npc:__med(ex.filter(x=>x.kind===k).map(x=>x.raw)),her:+mgMedD(mgTier(k,{occ:"exam",rank:P.to,lv:exLv(S,k)}).d).toFixed(2)}));
  const s=(S.staff||[])[0]||{sid:9,rank:1,loyal:50};__mg.length=0;let sp=0;for(let i=0;i<60;i++){s.exCd=0;S.turn=(S.turn||0)+1;if(exSrvNpc(s))sp++}
  return{calls:ex.length,occ:[...new Set(ex.map(x=>x.occ))],pass:pass/N,meds,srvCalls:__mg.length,srvOcc:[...new Set(__mg.map(x=>x.occ))],srvPass:sp/60}});
 ok(r4.calls>0&&r4.occ.length===1&&r4.occ[0]==="exam",'exam: NPC consorts sit it through mgNpcRaw on the exam board (target rank)',r4);ok(r4.meds.every(m=>Math.abs(m.npc-m.her)<=.75),'exam: NPC median per subject = hers',r4.meds);
 ok(r4.pass<1,'exam: an NPC can fail (no sure pass)',r4.pass);ok(r4.srvCalls>0&&r4.srvOcc[0]==="exam",'servant exam: NPC servants draw through mgNpcRaw too',{n:r4.srvCalls,pass:r4.srvPass});
 /* 5 j83 works */
 const r5=await p.evaluate(()=>{const v=__twin(liveRivals(true)[0]);__mg.length=0;const a=[];for(let i=0;i<600;i++)a.push(wkNpcRaw(v,"tranh"));const b=[];for(let i=0;i<300;i++)b.push(wkNpcRaw());
  return{calls:__mg.length,occ:[...new Set(__mg.map(x=>x.occ))],kinds:[...new Set(__mg.map(x=>x.kind))],med:__med(a),her:+mgMedD(mgTier("ve",{occ:"hoc"}).d).toFixed(2),min:Math.min(...a),max:Math.max(...a),old:__med(b)}});
 ok(r5.calls===900&&r5.occ[0]==="hoc"&&r5.kinds.includes("ve"),'works: wkNpcRaw draws the work\'s own game (tranh → ve) on her practice board',r5);ok(Math.abs(r5.med-r5.her)<=.75&&r5.min<r5.max,'works: NPC median = hers, spread (was flat R(11))',r5);
 /* 6 j85 NPC lessons */
 const r6=await p.evaluate(()=>{const v=liveRivals(true)[0];__mg.length=0;for(let i=0;i<200;i++){vNorm(v);for(const a of ARTS)v.arts[a.k]=Math.min(v.arts[a.k],3);for(const x of VIR)v.vir[x.k]=Math.min(v.vir[x.k],3);npcStudyDo(v)}
  return{calls:__mg.length,occ:[...new Set(__mg.map(x=>x.occ))],kinds:[...new Set(__mg.map(x=>x.kind))].length}});
 ok(r6.calls>=150&&r6.occ[0]==="hoc"&&r6.kinds>=3,'NPC lessons: each lesson plays her lesson game once (mgNpcRaw, occ hoc) through her points rule',r6);
 /* 7 jslap: an NPC's slap tier and an NPC's dodge */
 const r7=await p.evaluate(()=>{const a=liveRivals(true).find(x=>rkOf(x)>rkOf(S))||liveRivals(true)[0];const t=[0,0,0,0];const N=3000;for(let i=0;i<N;i++)t[slapNpcTier(a)]++;
  const e=mgTier("tat",{occ:"tat",p:a}).ease;const sh=t.slice(1).map(x=>+(x/N).toFixed(3));const T=BAL.ag.mg2.tat;
  const tg=liveRivals(true).filter(x=>x!==a&&rkOf(x)<rkOf(a))[0];let ne=null;if(tg){ne=slapNeOdds(tg,a)}
  return{sh,ease:e,table:T,ne,dodgeOdds:BAL.slap.dodgeOdds}});
 ok(r7.sh.every(x=>x>0)&&r7.sh[2]<.6,'slap: an NPC slap has every tier, nặng is not sure',r7);ok(r7.ne==null||r7.dodgeOdds.includes(r7.ne),'slap: an NPC target dodges at her card odds (BAL.slap.dodgeOdds by board tier)',r7.ne);
 /* 8 off switch → old paths */
 const r8=await p.evaluate(()=>{BAL.ag.mg2.on=0;const v=liveRivals(true)[0];__mg.length=0;const a=[];for(let i=0;i<200;i++)a.push(kg82NpcRaw(v,"dan"));for(let i=0;i<50;i++){wkNpcRaw(v,"tranh");exSim(v)}const n=__mg.length;
  BAL.ag.mg2.on=1;window.__agOff=1;const g=mg2On();window.__agOff=0;return{calls:n,off:g,med:__med(a),old:Math.round(kg82NpcMean(kg82LvFor(v,"dan")))}});
 ok(r8.calls===0&&!r8.off,'off switch: BAL.ag.mg2.on 0 / agOn false → the old kg82NpcMean paths, no core draw',r8);
 /* 9 a played stretch with the loop on: no throw */
 const r9=await p.evaluate(()=>{let th=0;for(let i=0;i<24;i++){try{Q.length=0;endTurn();Q.length=0}catch(e){th++;window.__lastErr=String(e&&e.stack||e)}}return{th,err:window.__lastErr||"",draws:__mg.length}});
 ok(r9.th===0,'24 played tuần with mg2 on: 0 throws',r9);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`PASS ${res.length} checks`);process.exit(f||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
