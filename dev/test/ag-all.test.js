/* AG-ALL checks (review/ag-all; design dev/handover/reports/ag-all.md §10). One fresh life, N days of bot play.
   // PART A
   1 day plan: drawn ONCE per day for the Emperor, Thái hậu and every live consort (4 slots each); the record follows the plan
   2 histogram per group (consort / hh / th) of the deeds the day plans chose over N days
   3 no NPC-only hidden act: every chosen deed key maps to a button the player of that group has (TW, Sủng deck, j2 cards, Empress buttons)
   4 old drips off while the day plan runs (npcStudy monthly dice studies nothing; BAL.ag.day.on=0 → it studies again)
   5 ONE function for the Empress: hhAct(S, v, "reward") moves the same numbers as the NPC Empress's hh:reward (BAL.tw)
   6 old save (no S.ag.day) loads and plans; perf: day draw p95 ≤ BAL.ag.perf.p95 ms
   usage: node dev/test/ag-all.test.js [dev/index.html] [days]  → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const DAYS=+process.argv[3]||10;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* make one NPC the Empress so her acts can be chosen (the seat may be empty at the start) */
 await p.evaluate(()=>{if(!queenP()){const v=liveRivals(true).find(x=>!x.out);v.queen=true;v.rank=7}});
 const r=await p.evaluate(async(DAYS)=>{const out={draws:[],follow:0,diff:0,by:{},byG:{consort:{},hh:{},th:{}},days:0};const by0=Object.assign({},AG.stat.by);
  const grpOf=id=>id==="th"?"th":id==="emp"?"emp":(()=>{const v=RV(+id.slice(1));return v&&v.queen?"hh":"consort"})();
  for(let d=0;d<DAYS;d++){const d0=AGD.stat.draw;
   for(let bb=0;bb<4;bb++){placeWhere();agFlush();const R=S.roster;const D=agDz();
    for(const id in D.P){const s=D.P[id][S.buoi||0];if(!s)continue;if(s.k){const g=grpOf(id);out.byG[g]=out.byG[g]||{};out.byG[g][s.k]=(out.byG[g][s.k]||0)+1}
     if(/^v/.test(id)&&R&&R.P[id]){const v=RV(+id.slice(1));if(v&&!v.out&&!v.confined){if(R.P[id][0][0]===s.pl)out.follow++;else out.diff++}}}
    Q.length=0;S.mg=0;try{nextBuoi()}catch(e){out.nb=e.message}Q.length=0}
   out.draws.push(AGD.stat.draw-d0);out.days++}
  if(AGD.q)agDaySlice(1);/* the later buổi of the day plan are drawn in slices over the next frames */const D=agDz();out.cover={emp:!!D.P.emp,th:S.thDead||!!D.P.th,consorts:liveRivals(true).filter(v=>v.alive&&!v.out).every(v=>D.P["v"+v.id]&&D.P["v"+v.id].length>=j95nB())};
  for(const k in AG.stat.by)out.by[k]=AG.stat.by[k]-(by0[k]||0);out.ms=AGD.ms.slice();out.errs=AGD.errs.concat(AG.errs).slice(0,5);return out},DAYS);
 ok(r.draws.every(n=>n<=1)&&r.draws.filter(n=>n===1).length>=r.days-1,'day plan: drawn once per day',r.draws);
 ok(r.cover.emp&&r.cover.th&&r.cover.consorts,'day plan: Emperor, Thái hậu and every live consort have a slot per buổi',r.cover);
 ok(r.follow>=(r.follow+r.diff)*.85,'record follows the plan (≥85 %; the rest = cards / invitations / trysts that bind her)',{follow:r.follow,diff:r.diff});
 console.log('HISTOGRAM per group (planned deeds over '+r.days+' days):');for(const g in r.byG)console.log('  '+g+': '+JSON.stringify(r.byG[g]));
 console.log('LANDED deeds: '+JSON.stringify(r.by));
 const tot=Object.values(r.byG.consort||{}).reduce((a,b)=>a+b,0);ok(tot>0,'consorts choose deeds from their act list',tot);
 /* 3 every chosen key = a player button of that group */
 const r3=await p.evaluate((byG)=>{const P=new Set(Object.keys(TW).concat(["effort"]));for(const k in AGCX)P.add("cx:"+k);["cx:study","cx:thHelp","cx:hhShield","cx:buy","cx:gift","cx:ally"].forEach(k=>P.add(k));
  for(const k in AGHH)P.add("hh:"+k);const TH=new Set(["th:gift","th:admon","th:release"]);const EMP=new Set(["emp:summon"]);/* the Emperor is never the player: his summons mirrors her Xin hầu cờ / đánh đàn (jgift kmEmpAct) *//* Thái hậu is never the player: her acts mirror the Empress's Ban thưởng / Khuyên / Ân xá */
  const bad=[];for(const g in byG)for(const k in byG[g]){if(g==="emp"?!EMP.has(k):g==="th"?!TH.has(k):!(P.has(k)||/^(c|harm|maid|srv):/.test(k)))bad.push(g+":"+k)}return bad},r.byG);
 ok(r3.length===0,'no NPC-only hidden act: every chosen deed is a button of the player of that group',r3);
 /* 4 */
 const r4=await p.evaluate(()=>{const v=liveRivals(true).find(x=>!x.out);vNorm(v);const sum=()=>Object.values(v.artp||{}).reduce((a,b)=>a+b,0)+Object.values(v.vir||{}).reduce((a,b)=>a+b,0);
  const a0=sum();for(let i=0;i<60;i++)npcStudy(v);const on=sum()-a0;BAL.ag.day.on=0;const a1=sum();for(let i=0;i<60;i++)npcStudy(v);const off=sum()-a1;BAL.ag.day.on=1;return{on,off}});
 ok(r4.on===0&&r4.off>0,'old monthly study dice off while the day plan runs; back with BAL.ag.day.on=0',r4);
 /* 5 */
 const r5=await p.evaluate(()=>{const q=queenP();const v=liveRivals(true).find(x=>x!==q&&!x.out);const g=BAL.tw.g.reward;
  q.bac=500;const h0=v.hh||0,d0=v.danh;hhAct(q,v,"reward");const npc=[(v.hh||0)-h0,v.danh-d0];
  S.bac=500;const h1=v.hh||0,d1=v.danh;hhAct(S,v,"reward");const me=[(v.hh||0)-h1,v.danh-d1];return{npc,me,want:[g[1],g[2]]}});
 ok(r5.me[0]===r5.want[0]&&r5.me[1]===r5.want[1]&&r5.npc[1]===r5.want[1]&&r5.npc[0]>=r5.want[0],'Empress: one function for her button and the NPC Empress (same numbers, BAL.tw)',r5);
 /* 5b the Empress's and Thái hậu's acts are offered when their gates hold */
 const r5b=await p.evaluate(()=>{const q=queenP();const v=liveRivals(true).find(x=>x!==q&&!x.out);v.hh=60;q.bac=500;const O=AGREG.hh.acts(q,agNeedsC(q),null).map(o=>o.k);
  S.th=80;S.thGiftWk=null;const N=agNeedsG("th");const T=AGREG.th.acts("th",N,null).map(o=>o.k+">"+(o.t===S?"me":o.t&&o.t.name));return{O,T,N}});
 ok(r5b.O.includes('hh:reward'),'Empress: Ban thưởng is her option when the gate holds',r5b.O);ok(r5b.T.some(x=>/^th:gift/.test(x)),'Thái hậu: Ban thưởng is her option for a consort she favours',r5b);
 /* 6 */
 const r6=await p.evaluate(()=>{delete S.ag.day;const e=AGD.errs.length;try{placeWhere();agFlush()}catch(x){return{err:x.message}}const D=agDz();
  const L=AGD.ms.slice().sort((a,b)=>a-b);return{planned:D.d===wk()&&Object.keys(D.P).length>2,errs:AGD.errs.length-e,p95:L[Math.min(L.length-1,Math.floor(.95*L.length))],budget:BAL.ag.perf.p95}});
 ok(r6.planned&&!r6.errs&&!r6.err,'old save without a day plan loads and plans',r6);ok(r6.p95<=r6.budget,'perf: day draw p95 within BAL.ag.perf.p95 ms',r6);
 ok(errs.length===0&&(r.errs||[]).length===0,'no page errors / agent errors',{page:errs.slice(0,3),ag:r.errs});
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`AG-ALL: ALL ${res.length} PASS`);process.exit(f?1:0)})();
