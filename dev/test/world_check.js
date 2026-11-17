/* WORLD WINDOW checks (jworld, review/world-events; owner OD:L1587 rule 4): one record, gates read it, everyone the same, old saves load.
   1 layer: worldStart outside the tuần tick only queues; the tick opens it; worldWin(k) reads it; it ends by itself at t1
   2 quốc tang from a REAL death (S.thDead): window opens, j92 wdTang() true, nobody's nightCh > 0 the first weeks, festToday null
   3 Emperor away: S.where.emp null after placeWhere, only followers keep nightCh, visRoll gives nothing, mindW scheme ×BAL
   4 thiên tai: the stipend cut is the same rule for her and every NPC (BAL.world.dis.payCut)
   5 CENTER pop-up at start (her options) and at end, one Tuần lục line, no Dư đồ "!"; worldPlanW force slots for AG-ALL
   6 the j7 comet left the weekly random pool; the j55 court text is read (S.wMM.k) for every roll kind
   7 old save (no S.wwin) plays a tuần; co-op: "wwin" is a world key
   usage: node dev/test/world_check.js <dev/index.html | URL>  → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,U0]=process.argv;const URL=/^(https?|file):/.test(U0)?U0:'file://'+require('path').resolve(U0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=()=>p.evaluate(()=>{for(let i=0;i<12;i++){localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv())&&!S.out)break}/* a consort life (a maid start has no consort options; same loop as world_check2) */window.__bot=1;quiet=true;Q.length=0;try{deal()}catch(e){}
  for(const v of rivals)v.preg=0;S.preg=0;S.sung=Math.max(S.sung,60);return 1});
 const step=()=>p.evaluate(()=>{Q.length=0;S.mg=0;const t=wk();endTurn();Q.length=0;return wk()!==t});
 await fresh();
 /* 1 */
 const r1=await p.evaluate(()=>{const a=worldStart("sao","thử");const q=(S.wwin.q||[]).length;return{a:!!a,q}});await p.evaluate(()=>{S.tuan=1});await step();
 const r1b=await p.evaluate(()=>{const w=worldWin("sao");return{open:!!w,t:w?[w.t0,w.t1,wk()]:null}});await step();const r1c=await p.evaluate(()=>({open:!!worldWin("sao"),H:(S.wwin.H||[]).map(h=>h.k)}));
 ok(!r1.a&&r1.q===1,'layer: a start outside the tick is queued',r1);ok(r1b.open,'layer: the tick opens the queued window',r1b);ok(!r1c.open&&r1c.H.includes('sao'),'layer: it ends by itself at t1',r1c);
 /* 2 */
 await fresh();await p.evaluate(()=>{S.tuan=1;S.thDead=false;worldTick();S.thDead=true;S.th=0});await step();
 const r2=await p.evaluate(()=>{const w=worldWin("tang");const C=consorts();const n=C.map(x=>nightCh(x));FEST.__t={name:"thử",m:S.month,t:[S.tuan],files:{}};const f=festToday();delete FEST.__t;
  return{open:!!w,why:w&&w.x.why,tang:wdTang(),night:n.filter(x=>x>0).length,fest:f?f.k:null,len:w?w.t1-w.t0:0,want:BAL.world.tang.len.th}});
 ok(r2.open&&r2.why==='th','quốc tang opens from the real death (S.thDead)',r2);ok(r2.tang,'j92 wdTang() reads the window',r2);ok(r2.night===0,'nobody (her or NPC) can be called to the night the first weeks',r2);
 ok(r2.fest===null,'no festival day during the mourning',r2);ok(r2.len===r2.want,'length from BAL.world.tang.len',r2);
 /* 3 */
 await fresh();await p.evaluate(()=>{S.tuan=1;worldQueue("away","thử",{len:3,x:{sub:"tuan"}})});await step();
 const r3=await p.evaluate(()=>{const w=worldWin("away");placeWhere();const F=(w&&w.x.f)||[];const C=consorts();const v=liveRivals(true).find(x=>!F.includes(x.id));
  const fol=C.filter(x=>F.includes(x===S?"me":x.id)).map(x=>nightCh(x));const non=C.filter(x=>!F.includes(x===S?"me":x.id)).map(x=>nightCh(x));
  const m1=mindW(v,"scheme");const z=S.wwin;const L=z.L;z.L=[];const m0=mindW(v,"scheme");z.L=L;const vr=visRoll();
  return{open:!!w,emp:S.where.emp,F:F.length,want:BAL.world.away.fol.tuan,fol,nonMax:Math.max(0,...non),ratio:+(m1/m0).toFixed(2),wantR:BAL.world.away.act.scheme,vr}});
 ok(r3.open&&r3.emp===null,'away: the Emperor is not in the palace (S.where.emp)',r3);ok(r3.F===r3.want,'away: followers chosen (BAL.world.away.fol)',r3);
 ok(r3.nonMax===0,'away: nobody left behind can be called (her and NPC alike)',r3);ok(r3.vr==='','away: no ngự giá visit',r3);ok(Math.abs(r3.ratio-r3.wantR)<.02,'NPC reaction: mindW scheme × BAL.world.away.act.scheme',r3);
 /* 4 */
 await fresh();await p.evaluate(()=>{S.tuan=1;worldQueue("dis","thử",{x:{sub:"lut"}})});await step();
 const r4=await p.evaluate(()=>{const v=liveRivals(true)[0];const cut=q=>Math.round((BAL.pay[Math.min(7,rkOf(q))]||0)*BAL.world.dis.payCut);
  const z=S.wwin,L=z.L;const run=q=>{const b0=q.bac;const s=Math.random;Math.random=()=>.5;try{stipend(q)}finally{Math.random=s}return q.bac-b0};
  const sOn=run(S),vOn=run(v);z.L=[];const sOff=run(S),vOff=run(v);z.L=L;return{open:!!worldWin("dis"),me:sOff-sOn,meW:cut(S),npc:vOff-vOn,npcW:cut(v)}});
 ok(r4.open&&r4.me===r4.meW&&r4.npc===r4.npcW,'thiên tai: the same pay cut for her and an NPC (BAL.world.dis.payCut)',r4);
 /* 5 */
 await fresh();await p.evaluate(()=>{S.tuan=1;Q.length=0;const T=trS();if(T)T.bien=90;worldQueue("su","thử")});
 const r5=await p.evaluate(()=>{Q.length=0;S.mg=0;const t=wk();endTurn();const c=Q.find(m=>m&&m.t==="Sứ đoàn vào triều");const opts=c&&c.opts?c.opts.map(o=>o.n):[];
  S.buoi=0;S.adHap=null;S.place="home";const hap=adHapNow().some(x=>x.id==="world");const n0=(S.logs||[]).filter(l=>/Sứ đoàn vào triều/.test(l)).length;
  Q.length=0;S.mg=0;endTurn();const e=Q.find(m=>m&&/Sứ đoàn/.test(m.h||"")&&m!==c);Q.length=0;S.mg=0;endTurn();const again=Q.some(m=>m&&/Sứ đoàn đã lên đường/.test(m.h||""));
  return{start:!!c,opts,hap,log:n0,end:!!e,again}});
 ok(r5.start&&r5.opts.length>=1,'center pop-up at the start, with her own options',r5);ok(r5.end&&!r5.again,'center pop-up at the end, once',r5);
 ok(!r5.hap,'no world-event "!" on the Dư đồ (owner OD 17/11 ~14:30Z)',r5);ok(r5.log>=1,'a Tuần lục line',r5);
 const r5b=await p.evaluate(()=>{const v=liveRivals(true).find(x=>rkOf(x)>=BAL.world.su.rank)||liveRivals(true)[0];v.rank=Math.max(v.rank,BAL.world.su.rank);
  S.wwin.L=[];S.wwin.q=[{k:"su",cause:"thử",o:{}}];S.wwin.last={};const T=trS();if(T)T.bien=90;Q.length=0;S.mg=0;endTurn();Q.length=0;const P=worldPlanW(v);return{force:P.force||[],why:P.why||""}});
 ok(r5b.force.some(f=>f.pl==="thu"&&f.b===1),'AG-ALL hook: worldPlanW(p).force duty slot (Dự yến tiếp sứ) + why',r5b);
 /* 6 */
 const r6=await p.evaluate(()=>{const L=freshEvents().map(e=>e.id);const ks=new Set();const T=trS();for(let i=0;i<300;i++){T.bien=50;T.kho=50;moodMonth();ks.add(S.wMM&&S.wMM.k)}
  return{comet:L.includes("comet"),ks:[...ks].sort()}});
 ok(!r6.comet,'the j7 comet is out of the weekly random pool',r6);ok(['cong','giac','han','lut','mua','tham'].every(k=>r6.ks.includes(k)),'the j55 court roll text is read for every kind',r6);
 /* 7 */
 await fresh();const r7=await p.evaluate(()=>{delete S.wwin;delete S.wwSeen;let e=null;try{Q.length=0;S.mg=0;endTurn();Q.length=0}catch(x){e=x.message}
  return{e,has:!!S.wwin,key:window.COOPW&&COOPW.X?COOPW.X.W_KEYS.includes("wwin"):null}});
 ok(!r7.e&&r7.has,'old save without S.wwin plays a tuần',r7);ok(r7.key===true,'co-op: wwin is a world key',r7);
 const r8=await p.evaluate(()=>({err:WW.err}));ok(r8.err===0,'no jworld errors',r8);
 ok(errs.length===0,'no page errors',errs.slice(0,3));await b.close();const f=res.filter(x=>!x).length;console.log(f?`WORLD CHECK FAIL ${f}/${res.length}`:`WORLD CHECK PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
