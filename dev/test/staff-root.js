/* review/staff-root (owner 17/11 OD 02:45Z/02:50Z/04:48Z): ONE household table BAL.promo.cap for her AND every NPC consort.
   Checks: (1) no private cap table left in dev/build (static); (2) capOf(S) and capOf(npc) = the BAL row of their rank, cold palace = row 0,
   servant road = no household; (3) the owner's case: origin "Cung nữ được sủng hạnh" (cn) at Thường tại — her room = her close maid + her table
   only (no eunuch, no Giáo tập ma ma, nobody else's servants), head count ≤ the table; (4) old save with the old big households: the extras leave
   (Nội vụ phủ), a trusted one with a farewell scene, the personal maid and named palace women stay, every NPC within the table;
   (5) a demotion trims at the month end; (6) hiring is refused at the cap.
   usage: node dev/test/staff-root.js      (serves the worktree itself through dev/test/coop-serve.js; build first: python3 dev/build/assemble.py) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const SV=require('./coop-serve.js');
const T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':String(x).slice(0,220)]);
/* (1) static: the old private table and the private +1 counts are gone */
const B=path.join(__dirname,'..','build');const ORDER=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
const hits=[];for(const f of ORDER){const t=fs.readFileSync(path.join(B,f),'utf8');
 if(/return r>=7\?\[\d,\d\]/.test(t))hits.push(f+': private capOf table');
 if(/capOf=function/.test(t))hits.push(f+': capOf wrapper');
 if(/role===?"maid"\)\.length\+1/.test(t)&&f!=='j10.js')hits.push(f+': private +1 count')}
ok(!hits.length,'one table: no private capOf table / wrapper / +1 count outside j10 hhHas',hits.join(' | '));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});await SV.serve(ctx);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(SV.BASE+'dev/index.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const newGame=o=>p.evaluate(o=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  window.__forceOrigin=o;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();return{o:S.origin.k,rank:S.rank}},o);
 /* (3) the owner's case */
 const g=await newGame('cn');
 const r=await p.evaluate(()=>{S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};render();
  const V=S.visit.people.map(x=>x.kind+(x.ref&&x.ref.role?'/'+x.ref.role:'')+':'+x.name);const mine=new Set([S.maid].concat(S.staff));
  const foreign=S.visit.people.filter(x=>(x.kind==="serv"||x.kind==="elder")&&!mine.has(x.ref));const [cm,ce]=capOf(S),[nm,ne]=hhHas(S);
  return{V,cap:[cm,ce],has:[nm,ne],row:BAL.promo.cap[S.rank],n:kitHereCount(),foreign:foreign.length,eun:S.staff.filter(s=>s.role==="eunuch").length,elder:S.visit.people.some(x=>x.kind==="elder")}});
 ok(g.o==='cn'&&g.rank===1&&JSON.stringify(r.cap)===JSON.stringify(r.row),'cn origin starts Thường tại; capOf(S) = BAL.promo.cap[1]',JSON.stringify({g,cap:r.cap,row:r.row}));
 ok(r.has[0]<=r.cap[0]&&r.has[1]<=r.cap[1]&&r.eun===0&&!r.elder&&!r.foreign&&r.n<=r.cap[0]+r.cap[1],'her Thường tại room: close maid + her table only (no eunuch, no ma ma, nobody else\'s servants)',JSON.stringify(r));
 /* (2) NPCs, cold palace, servant road */
 const c=await p.evaluate(()=>{const bad=[];for(const v of rivals){if(!v.alive)continue;const want=BAL.promo.cap[v.out?0:(v.queen?7:v.rank)];if(JSON.stringify(capOf(v))!==JSON.stringify(want))bad.push(v.name);
   const [m,e]=hhHas(v);if(m>want[0]||e>want[1])bad.push(v.name+' over '+m+'/'+e)}
  const th=JSON.stringify(capOf(S.thO))===JSON.stringify(BAL.promo.capTh);return{bad,th,n:rivals.filter(v=>v.alive).length}});
 ok(!c.bad.length&&c.th,'every NPC consort: capOf = BAL.promo.cap row of her rank (cold palace row 0), household within it; Thái hậu = capTh',JSON.stringify(c));
 /* (4) old save: the old big households */
 const o=await p.evaluate(()=>{S.rank=1;const big=[];for(let i=0;i<3;i++)big.push(mkServ("maid"));for(let i=0;i<2;i++)big.push(mkServ("eunuch"));big[0].loyal=90;big[1].loyal=20;big[2].loyal=40;
  S.staff=big;const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&x.rank<=1);if(v){v.staff=[mkServ("maid"),mkServ("maid"),mkServ("eunuch")]}
  const sv=JSON.stringify(ser());const maid0=S.maid.name;Q.length=0;deser(JSON.parse(sv));try{staffInit()}catch(e){}
  const v2=v?rivals.find(x=>x.id===v.id):null;return{maid:S.maid&&S.maid.name===maid0,has:hhHas(S),cap:capOf(S),kept:S.staff.map(s=>s.loyal),
   farewell:Q.filter(q=>q.t==="Nội vụ phủ điều người").length,log:(S.logs||[]).slice(0,4).join(' ').replace(/<[^>]+>/g,'').slice(0,160),
   npc:v2?{has:hhHas(v2),cap:capOf(v2)}:null}});
 ok(o.maid&&o.has[0]<=o.cap[0]&&o.has[1]<=o.cap[1]&&o.kept.includes(90)&&o.farewell===0||o.maid&&o.has[0]<=o.cap[0]&&o.has[1]<=o.cap[1]&&o.farewell>=1,
  'old save: extra servants leave via Nội vụ phủ (least trusted first; a trusted one only with a farewell scene), personal maid stays',JSON.stringify(o));
 ok(!o.npc||(o.npc.has[0]<=o.npc.cap[0]&&o.npc.has[1]<=o.npc.cap[1]),'old save: NPC household trimmed to the same table',JSON.stringify(o.npc));
 /* trusted-only over cap: the farewell scene */
 const f=await p.evaluate(()=>{Q.length=0;S.rank=0;const a=mkServ("maid");a.loyal=95;S.staff=[a];capTrim(S);return{q:Q.filter(q=>q.t==="Nội vụ phủ điều người").length,left:S.staff.length,has:hhHas(S),cap:capOf(S)}});
 ok(f.q===1&&f.left===0,'a trusted maid over the table leaves only with a farewell scene',JSON.stringify(f));
 /* (5) demotion: the month end trims */
 const d=await p.evaluate(()=>{Q.length=0;S.rank=4;S.staff=[mkServ("maid"),mkServ("maid"),mkServ("eunuch")];const before=hhHas(S);S.rank=1;servMonth();return{before,after:hhHas(S),cap:capOf(S)}});
 ok(d.before[0]>d.cap[0]&&d.after[0]<=d.cap[0]&&d.after[1]<=d.cap[1],'demotion Phi → Thường tại: household trimmed at the month end',JSON.stringify(d));
 /* (6) hiring refused at the cap */
 const h=await p.evaluate(()=>{S.bac=500;S.rank=1;S.staff=[];fillStaff(S,true);const n0=S.staff.length;const btn=document.createElement('button');btn.dataset.hire="eunuch";document.body.appendChild(btn);btn.click();btn.remove();
  return{n0,n1:S.staff.length,q:Q.length,has:hhHas(S),cap:capOf(S)}});
 ok(h.n1===h.n0&&h.has[1]<=h.cap[1],'hire button refused at the cap (Thường tại: no eunuch)',JSON.stringify(h));
 /* a queen sent to the cold palace: her Quản sự ma ma goes back to Thái hậu at once, her household = row 0 */
 const qc=await p.evaluate(()=>{window.__forceOrigin='tt';start();Q.length=0;const q=queenP();if(!q||q===S)return{skip:1};const kn=elders().find(s=>s.eid==='kn');const before=ownerOf(kn)===q;q.out=1;render();
  return{before,toTh:ownerOf(kn)===S.thO,h:hhHas(q),c:capOf(q)}});
 ok(qc.skip||(qc.before&&qc.toTh&&qc.h[0]<=qc.c[0]&&qc.h[1]<=qc.c[1]),'NPC queen to the cold palace: Quản sự ma ma back to Thái hậu at once, household within row 0',JSON.stringify(qc));
 /* servant road */
 const s=await p.evaluate(()=>{window.__forceOrigin=null;for(let i=0;i<300;i++){start();if(isSrv())break}Q.length=0;return{srv:isSrv(),cap:capOf(S),staff:(S.staff||[]).length}});
 ok(s.srv&&(s.cap[0]===0&&s.cap[1]===0&&s.staff===0),'servant road: no household of her own',JSON.stringify(s));
 ok(!errs.length,'no page errors',errs.join(' | '));
 for(const t of T)console.log(t.join(' | '));const n=T.filter(t=>t[0]==='FAIL').length;console.log(n?`FAIL ${n}/${T.length}`:`PASS ${T.length}/${T.length}`);await b.close();process.exit(n?1:0)})();
