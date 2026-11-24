/* review/selection-scene (SELSCENE-2): RULES CORE jselx — owner OD 23/11 ~23:25Z (±1 cap Tần), ~23:28Z (hòa thân cap Phi + high Sắc),
   ~23:47Z (weights mini ½ / đối đáp ¼ / hành xử ¼ + Đức/Tài/Sắc base; worst −1), 24/11 ~05:35Z (rooms 4 = 2 beds × 2), ~05:40Z (ban hoa = life ends),
   ~05:50Z (every tú nữ by the same formula). Checks every origin × result step, the caps, ban hoa, the ceremony keep count, BAL-only numbers,
   the intake (j27) and the lodging plan. usage: node dev/test/selx-rules.js [dev/index.html] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxScore==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(()=>{const out={};
  const B=BAL.selx;out.bal=!!(B&&B.cut&&B.w&&B.room&&B.intake);
  /* weights: a full mini-game swing outweighs đối đáp + hành xử together (ADD.22: one bad guess cannot drop a rank alone) */
  out.wMini=B.w.mini*10>=(B.w.dd+B.w.hx)*10-1e-9;out.wHalf=Math.abs(B.w.mini-2*B.w.dd)<1e-9&&Math.abs(B.w.dd-B.w.hx)<1e-9;
  /* result steps */
  const R0=sc=>selxResult(sc);out.steps=[R0(B.ban-1),R0(B.ban),R0(B.cut[0]),R0(B.cut[1])].map(x=>x.kept?x.step:"ban");
  /* every origin × step: rank = origin r + step clamped to [0, cap]; hòa thân cap Phi, +1 needs Sắc ≥ hoaThanSac */
  const tab=[];for(const o of ORIGINS){for(const st of [-1,0,1]){for(const sac of [B.hoaThanSac-1,B.hoaThanSac]){const p={sac};const rk=selxRank(p,st,{k:o.k,r0:o.r||0});
     const ht=B.hoaThan.includes(o.k),cap=ht?B.hoaThanCap:B.cap,r0=o.r||0;let want=Math.max(0,Math.min(Math.max(cap,r0),r0+(ht&&st>0&&sac<B.hoaThanSac?0:st)));
     tab.push([o.k,r0,st,sac,rk,want])}}}
  out.rankOk=tab.every(x=>x[4]===x[5]);out.maxNonHt=Math.max(...tab.filter(x=>!B.hoaThan.includes(x[0])).map(x=>x[4]));
  out.ccl=tab.filter(x=>x[0]==="nc").map(x=>x.slice(2,5));out.nOrig=ORIGINS.length;
  /* worst kept result is −1 (never −2): every kept score gives step ≥ −1 */
  let worst=9;for(let sc=B.ban;sc<200;sc++){const x=selxResult(sc);if(x.kept)worst=Math.min(worst,x.step)}out.worst=worst;
  /* ONE formula for her and a girl: same marks + no luck → same score for equal stats */
  const g={sac:S.sac,duc:S.duc,tai:S.tai};out.same=selxScore(S,{mini:7,dd:5,hx:5},false)===selxScore(g,{mini:7,dd:5,hx:5},false);
  /* ceremony: 11 girls + her; kept count = BAL.selx.yard.kept */
  const girls=liveRivals(true).slice(0,11).map((v,i)=>Object.assign({},v,{__sc:B.ban+5+i}));const L=selxCeremony(girls,{sc:B.cut[1]+5});out.keptN=L.filter(x=>x.kept).length;out.herKept=L.find(x=>x.v===S).kept;
  const L2=selxCeremony(girls,{sc:B.ban-1});out.herBan=!L2.find(x=>x.v===S).kept&&L2.filter(x=>x.kept).length===B.yard.kept;
  /* npc marks: within 0..10 */
  const m=selxNpcMarks(liveRivals(true)[0],{art:"cam",keys:["E.mesac"],dd:{options:[{stance:"khiem",reacts:{"E.mesac":"+"}},{stance:"manh",reacts:{}}]},hx:null});out.npc=[m.mini,m.dd,m.hx].every(x=>x>=0&&x<=10);
  /* intake within BAL */
  const I=[...Array(300)].map(()=>selxIntake());out.intake=Math.min(...I)===B.intake.min&&Math.max(...I)===B.intake.max;
  /* lodging plan: rooms of 4, beds of 2, her room first */
  const plan=selxRoomPlan(liveRivals(true).slice(0,7));out.plan=plan.length===2&&plan[0].girls[0]===S&&plan[0].beds.length===2&&plan[0].beds.every(b=>b.length===2)&&plan[1].girls.length===4;
  /* ban hoa: the life ends alive, epilogue by origin, recorded */
  const k=S.origin.k;selxBanHoa();out.ban={dead:S.dead,fate:S.fate,card:(Q[0]&&Q[0].t)||"",epi:String((Q[0]&&Q[0].h)||"").includes(selxEpi(k).slice(0,20)),alive:overAlive(S.fate)};
  return out});
 ok(r.bal,'BAL.selx present (one core)');ok(r.wHalf&&r.wMini,'weights mini ½ / đối đáp ¼ / hành xử ¼');
 ok(JSON.stringify(r.steps)==='["ban",-1,0,1]',`result steps ban / −1 / 0 / +1 ${JSON.stringify(r.steps)}`);
 ok(r.rankOk,`every origin (${r.nOrig}) × step × Sắc gives origin ±1 clamped by the cap`);ok(r.maxNonHt<=3,`no non-hòa-thân life enters above Tần (max ${r.maxNonHt})`);
 console.log('  nc (Cao Ly) [step, Sắc, rank]:',JSON.stringify(r.ccl));
 ok(r.worst===-1,`worst kept result is −1 (${r.worst})`);ok(r.same,'one formula for her and a tú nữ (law 1)');
 ok(r.keptN===4&&r.herKept,`ceremony keeps BAL.selx.yard.kept incl. her (${r.keptN})`);ok(r.herBan,'a very poor score sends HER home; the 4 places go to the girls');
 ok(r.npc,'tú nữ marks within 0..10');ok(r.intake,'intake min..max from BAL (j27 too)');ok(r.plan,'lodging: rooms of 4, 2 beds × 2, her room first');
 ok(r.ban.dead&&r.ban.alive&&r.ban.card==='Kiếp này'&&r.ban.epi,`ban hoa ends the life alive with the origin epilogue ${JSON.stringify(r.ban)}`);
 ok(!errs.length,`no page errors ${JSON.stringify(errs.slice(0,3))}`);await b.close();console.log(bad?`FAILED ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
