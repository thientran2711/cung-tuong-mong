/* TUANTANG-WARN test (MAIN 183 order 28/11): tuẫn táng must come with signs first and tiered roads (jttw.js, BAL.mort.ttw).
   usage: node dev/test/tuantang-warn.js [dev/index.html]   (serves the repo from disk; no UI clicks — engine + the PEND card)
   On a build WITHOUT jttw (LIVE before the fix) it prints REPRO lines: the death comes with no «Lời đồn hậu sự» card. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'../..');const PAGE=process.argv[2]||'dev/index.html';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
 const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await page.goto('http://ts.local/'+PAGE,{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
 const out=await page.evaluate(()=>{const res={checks:[],repro:[],errs:[]};const ok=(n,c,x)=>res.checks.push({n,ok:!!c,x:x==null?"":String(x).slice(0,300)});
  const quiet=()=>{try{Q.length=0}catch(e){}};const has=typeof ttwRisk==="function";res.hasTtw=has;
  const strip=h=>String(h||"").replace(/<[^>]+>/g,"");
  /* path A: the heir is a rival's son, she is a Tần with a bad tie to his mother */
  function setA(){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();quiet();rivals.forEach(v=>v.kids=[]);S.kids=[];S.vgAlly=null;S.rank=3;S.duc=10;S.sung=30;S.bac=500;S.suc=90;
   const v=liveRivals(false)[0];const k=mkKid("m",6);v.kids=[k];S.heir={k,v};v.rel=-60;S.emp.pre=1;if(S.mort)S.mort.empDue=null;return v}
  /* path B: childless favourite, no heir */
  function setB(){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();quiet();rivals.forEach(v=>v.kids=[]);S.kids=[];S.heir=null;S.vgAlly=null;S.rank=3;S.sung=90;S.duc=10;S.th=0;S.bac=500;S.suc=90;S.emp.pre=1;if(S.mort)S.mort.empDue=null}
  function months(n){const seen=[];for(let i=0;i<n&&!S.dead;i++){try{monthTick()}catch(e){res.errs.push(String(e).slice(0,160));break}
   const c=Q.find(m=>m&&m.pid==="ttw");if(c)seen.push({mo:S.year*12+S.month,h:strip(c.h)});quiet()}return seen}
  /* the death on the day, rolls forced */
  function dieDay(rollF){const r0=roll;roll=rollF;S.mort.empDue="Ngài lâm trọng bệnh đã lâu, thuốc thang vô hiệu";S.month=12;try{monthTick()}catch(e){res.errs.push(String(e).slice(0,160))}finally{roll=r0}
   const r={dead:!!S.dead,fate:S.fate||"",t:strip((Q.find(m=>/Mệnh tận|Kết cục|Hồng nhan|Tuẫn|Thái phi|Xuất/.test(m.t||""))||Q[0]||{}).h).slice(0,900)};quiet();return r}
  /* ---- REPRO (any build): the day comes; was there a card before? ---- */
  {setA();const seen=months(4);const d=dieDay(p=>p>=100?true:false);res.repro.push({path:"A Tân Thái hậu",cardsBefore:seen.length,fate:d.fate,dead:d.dead,t:d.t})}
  {setB();BAL.mort.fate.tuanP=100;const seen=months(4);const d=dieDay(p=>p>=100);BAL.mort.fate.tuanP=25;res.repro.push({path:"B di chiếu theo hầu",cardsBefore:seen.length,fate:d.fate,dead:d.dead,t:d.t})}
  if(!has)return res;
  const B=BAL.mort.ttw,W=Object.values(KIT_ODDS);
  /* 1. signs: path A card comes at once, then every cd.sign months while the Emperor shows a sign */
  {setA();const r=ttwRisk();ok("A risk seen","th"===(r&&r.k),JSON.stringify(r&&{k:r.k,o:r.o}));const seen=months(7);
   ok("A card before the day (signs first)",seen.length>=2,seen.map(s=>s.mo).join(","));ok("A card spacing = cd.sign",seen.length<2||seen[1].mo-seen[0].mo===B.cd.sign,seen.map(s=>s.mo).join(","));
   const h=seen[0]?seen[0].h:"";ok("A card names the sign",/Hoàng thượng hay mệt/.test(h),h);ok("A card odds in words, no %",W.some(w=>h.includes(w))&&!/%/.test(h),h);
   ok("A card names the threat (heir's mother)",/là mẹ của/.test(h),h)}
  /* quiet months: no sign → every cd.quiet months */
  {setA();S.emp.pre=0;S.emp.ill=null;const seen=months(14);ok("quiet: card at once, then after cd.quiet",seen.length>=2&&seen[1].mo-seen[0].mo===B.cd.quiet,seen.map(s=>s.mo).join(","))}
  /* 2. roads: ≤3 tiers (+ Để sau), bạc road has a same-tier non-bạc road, Tốn rises with protection */
  {setA();const d=mkP("ttw",{});ok("card builds",!!d);const o=d?d.o:[];ok("≤ 3 tiers + Để sau (4 roads, 2 in VỪA)",o.length===5&&o[4].n==="Để sau",o.map(x=>x.n).join(" | "));
   const R=B.road;ok("VỪA pair same pz and odds",R.bac.pz===R.sl.pz&&R.bac.p===R.sl.p);ok("pz rises NHẸ<VỪA<NẶNG",R.nhe.pz<R.bac.pz&&R.bac.pz<R.nang.pz);
   ok("every road has a failure gain (law 3)",["nhe","bac","sl","nang"].every(k=>R[k].fw&&Object.keys(R[k].fw).length));
   ok("lines show odds word + tốn",o.slice(0,4).every(x=>W.some(w=>x.j67.includes(w))&&/tốn:/.test(x.j67)),o.map(x=>strip(x.j67)).join(" || "));
   /* success raises the chance; capped */
   const o0=ttwRisk().o;const r0=roll;roll=()=>true;try{for(let i=0;i<6;i++){const dd=mkP("ttw",{});dd.o[3].go()}}finally{roll=r0}quiet();
   const o1=ttwRisk().o;ok("NẶNG road success raises the chance",o1>o0,o0+"→"+o1);ok("protection capped at BAL cap",S.ttw.pz===B.cap,S.ttw.pz);
   /* failure: cost paid, still a gain */
   setA();const s0=S.suc,d0=S.duc;roll=()=>false;try{mkP("ttw",{}).o[0].go()}finally{roll=r0}quiet();ok("failed NHẸ: Sức paid, Đức +",S.suc<s0&&S.duc>d0,`${s0}->${S.suc} duc ${d0}->${S.duc}`);ok("failed road gives no protection",!S.ttw.pz);
   /* bạc gate */
   setA();S.bac=0;const dd=mkP("ttw",{});ok("bạc road shows need when short",dd.o[1].need&&dd.o[1].need[0].ok===false,JSON.stringify(dd.o[1].need))}
  /* 3. on the day, path A: the roads add to the odds base; the end can still happen at the cap */
  {const nc0=succNpcClaims;succNpcClaims=()=>false;setA();let got=[];const od0=od;od=function(b){got.push(b);return od0(b)};S.ttw={pz:0,last:-999,n:0};let d1;try{d1=dieDay(p=>false)}finally{od=od0}
   const b0=got[got.length-1];setA();got=[];od=function(b){got.push(b);return od0(b)};S.ttw={pz:B.cap,last:-999,n:0};let d2;try{d2=dieDay(p=>p>=100)}finally{od=od0}
   ok("A day odds base + pz",Math.round(got[got.length-1]-b0)===B.cap,b0+" vs "+got[got.length-1]);ok("A at cap the death can still happen",d2.dead&&/tuẫn táng/.test(d2.t),d2.t);
   ok("A death text says the roads were not enough",/lo liệu trước không đủ/.test(d2.t),d2.t);
   setA();S.rank=4;S.ttw={pz:B.cap,last:-999,n:0};const d3=dieDay(p=>p>=5);succNpcClaims=nc0;ok("A spared text mentions the roads",!/tuẫn táng theo tiên đế$/.test(d3.t)&&/lo liệu trước/.test(d3.t),d3.fate+" | "+d3.t)}
  /* path B on the day */
  {setB();BAL.mort.fate.tuanP=100;S.ttw={pz:0,last:-999,n:0};const a=dieDay(p=>p>=100);ok("B no roads: tuẫn táng (unchanged)",/Tuẫn táng/.test(a.fate),a.fate);
   setB();S.ttw={pz:B.cap,last:-999,n:0};const c=dieDay(p=>p>=100||p===B.cap);ok("B roads avert the hit",!/Tuẫn táng/.test(c.fate)&&/sớm lo liệu/.test(c.t),c.fate+" | "+c.t);
   setB();S.ttw={pz:B.cap,last:-999,n:0};const e=dieDay(p=>p>=100);ok("B at cap the end can still happen",/Tuẫn táng/.test(e.fate),e.fate);BAL.mort.fate.tuanP=25;
   setB();const seen=months(2);ok("B card before the day",seen.length>=1&&/không con/.test(seen[0].h),seen[0]&&seen[0].h)}
  /* no risk: her own son is heir · Hoàng hậu · low Sủng childless */
  {setA();const k=mkKid("m",3);S.kids=[k];S.heir={k,v:null};ok("no card: her son is heir",!ttwRisk());setA();S.rank=7;ok("no card: Hoàng hậu",!ttwRisk());setB();S.sung=10;ok("no card: childless, low Sủng",!ttwRisk());
   setB();S.duc=80;ok("no card: Đức already saves her (B)",!ttwRisk())}
  /* two-way: NPC at risk takes roads; her forcing a foe can fail */
  {setB();const v=liveRivals(false)[0];v.sung=90;v.kids=[];const r0=roll,n0=B.npcP;B.npcP=100;try{months(1)}finally{B.npcP=n0}ok("NPC at risk took a road",(v.ttwPz||0)>0,v.ttwPz);
   roll=p=>p===Math.min(B.cap,v.ttwPz);let sp;try{sp=ttwNpcSpared(v)}finally{roll=r0}ok("NPC roads can save her from my order",sp===true)}
  /* old save without S.ttw */
  {setA();delete S.ttw;let e="";try{const d=JSON.parse(JSON.stringify(ser()));deser(d);quiet();months(1)}catch(x){e=String(x)}ok("old save (no S.ttw) loads + runs",!e&&S.ttw&&S.ttw.last>0,e)}
  /* co-op off */
  {setA();const c0=window.COOPW;window.COOPW={on:true,seat:"a"};let r;try{r=ttwRisk()}finally{window.COOPW=c0}ok("co-op: off",!r)}
  return res});
 out.pageErrors=errs;const bad=(out.checks||[]).filter(c=>!c.ok);
 console.log(JSON.stringify(out,null,1));console.log(`TUANTANG-WARN: ${out.hasTtw?(out.checks.length-bad.length)+"/"+out.checks.length+" PASS":"no jttw (repro only)"} · page errors ${errs.length} · eval errors ${(out.errs||[]).length}`);
 await b.close();process.exit(out.hasTtw&&(bad.length||errs.length||(out.errs||[]).length)?1:0)})().catch(e=>{console.error(e);process.exit(1)});
