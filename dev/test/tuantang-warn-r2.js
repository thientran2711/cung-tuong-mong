/* TUANTANG-WARN r2 test (MAIN 185 rulings 28/11): Q2 = a one-month sign before every sudden lifespan death and every accident (her, the
   Emperor, NPCs); Q3 = «Sắp kiệt sức» before every Sức-0 death, with roads (jsign.js, BAL.mort.sign, BAL.kiet).
   usage: node dev/test/tuantang-warn-r2.js [dev/index.html]
          MUTATE=sud|acc|kiet node dev/test/tuantang-warn-r2.js   → builds a broken copy (sign removed) and expects red checks (exit 0 when red). */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const fs=require('fs');const path=require('path');const {execSync}=require('child_process');
const R=path.resolve(__dirname,'../..');let PAGE=process.argv[2]||'dev/index.html';const MUT=process.env.MUTATE||'';
if(MUT){let h=fs.readFileSync(path.join(R,PAGE),'utf8');const M={
  sud:['else if(!p.thoO&&ml<=M.sign.mo)ev+=sudSign(p,ml,K,show);',''],
  acc:['p.accW={t:accText(p),mo:M.sign.acc};ev+=accSign(p,K)','{const t=accText(p);ev+=p===S?(kill(p,`Ngươi ${t}`,K),""):kill(p,t,K)}'],
  kiet:['window.kietSave=function(){if(kOff())return false;','window.kietSave=function(){return false;']}[MUT];
 if(!M||!h.includes(M[0])){console.log('MUTATE target not found',MUT);process.exit(2)}h=h.split(M[0]).join(M[1]);PAGE='dev/.mut-r2.html';fs.writeFileSync(path.join(R,PAGE),h)}
if(MUT)process.on('exit',()=>{try{fs.unlinkSync(path.join(R,PAGE))}catch(e){}});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
 const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await page.goto('http://ts.local/'+PAGE,{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
 const out=await page.evaluate(()=>{const res={checks:[],errs:[]};const ok=(n,c,x)=>res.checks.push({n,ok:!!c,x:x==null?"":String(x).slice(0,300)});
  const strip=h=>String(h||"").replace(/<[^>]+>/g,"");const quiet=()=>{try{Q.length=0}catch(e){}};const W=Object.values(KIT_ODDS);
  const r0=roll;BAL.mort.acc={me:0,npc:0,emp:0};BAL.mort.emp.ass=0;BAL.mort.emp.poi=0;BAL.mort.ttw.on=0;
  function fresh(){SLOT=3;if(S&&S.mort){S.mort.empWhy=null}try{store.set(NL_KEY,null)}catch(e){}start();quiet();S.srv=null;if(S.kc)S.kc.inPal=1;S.out=false;S.suc=90;S.bac=500;S.tho=S.age+40;S.thoO=3;S.emp.tho=(S.emp.age||30)+40;S.emp.thoO=3;
   liveRivals(false).forEach(v=>{v.tho=(v.age||20)+40;v.thoO=3});if(S.mort){S.mort.empDue=null;S.mort.plot=null}}
  const pin=()=>{if(!S.dead)S.suc=Math.max(S.suc,60)};
  function mm(){try{mortMonth()}catch(e){res.errs.push(String(e).slice(0,160))}}/* the jmort monthly pass alone (monthTick runs it inside illMonth) */
  const force=f=>{const rr=roll;roll=p=>p>0?true:false;try{f()}finally{roll=rr}};/* BAL.odds.hi caps roll(): the accident month is forced */
  function mo(){try{monthTick()}catch(e){res.errs.push(String(e).slice(0,160))}}
  const card=id=>Q.find(m=>m&&m.pid===id);
  /* ---------- Q2a: sudden lifespan death (thoO 0) — her ---------- */
  {fresh();S.thoO=0;S.sgn=0;S.tho=S.age;S.thoM=S.month+2>12?S.month+2-12:S.month+2;if(S.month+2>12)S.tho=S.age+1;
   let signAt=-1,deadAt=-1;for(let i=0;i<5&&!S.dead;i++){pin();mo();if(signAt<0&&S.sgn)signAt=i;quiet()}deadAt=S.dead?1:0;
   ok("sudden (her): a sign comes before the end",signAt>=0,`signAt ${signAt} dead ${S.dead} ${S.fate||""}`);
   ok("sudden (her): she dies a month after the sign, not the same month",S.dead&&signAt>=0&&/Tuổi trời/.test(S.fate||S.mort.cause||""),S.fate||S.mort&&S.mort.cause)}
  {fresh();S.thoO=0;S.sgn=0;S.tho=S.age;S.thoM=S.month+2>12?S.month+2-12:S.month+2;if(S.month+2>12)S.tho=S.age+1;
   for(let i=0;i<4&&!S.sgn;i++){pin();mo();quiet()}
   ok("sudden (her): the sign is the omen illness, known, last stage (cure road open)",S.ill&&S.ill.mort&&S.ill.known&&S.ill.st===3,JSON.stringify(S.ill));
   const t0=S.tho;roll=()=>true;let tx="";try{tx=treat(S,"ty")}finally{roll=r0}ok("sudden (her): the Thái y cure adds a year",S.tho>t0,tx);
   for(let i=0;i<2;i++){pin();mo();quiet()}ok("sudden (her): cured → still alive next months",!S.dead,S.fate)}
  /* the Emperor */
  {fresh();const e=S.emp;e.thoO=0;e.sgn=0;e.tho=e.age;e.thoM=S.month+2>12?S.month+2-12:S.month+2;if(S.month+2>12)e.tho=e.age+1;let sign=0,due=0,both=0;
   for(let i=0;i<4;i++){pin();mo();const s=!!e.sgn,d=!!(S.mort&&(S.mort.empDue||S.mort.empWhy));if(d&&!sign)both=1;if(s)sign=1;if(d){due=1;break}quiet()}
   ok("sudden (Emperor): sign before his death",sign&&due&&!both,`sign ${sign} due ${due} same ${both}`);ok("sudden (Emperor): the death line names the sudden illness",/đột ngột lâm bệnh/.test(S.mort.empDue||S.mort.empWhy||""),S.mort.empDue||S.mort.empWhy);quiet()}
  /* an NPC consort (law 1) */
  {fresh();const v=liveRivals(false)[0];v.thoO=0;v.sgn=0;v.tho=v.age;v.thoM=S.month+2>12?S.month+2-12:S.month+2;if(S.month+2>12)v.tho=v.age+1;let sign=-1,gone=-1;
   for(let i=0;i<4;i++){pin();mo();if(sign<0&&v.sgn)sign=i;if(gone<0&&v.alive===false)gone=i;quiet()}
   ok("sudden (NPC consort): sign (omen illness) a month before",sign>=0&&gone>sign&&v.ill&&v.ill.mort,`sign ${sign} gone ${gone}`)}
  /* ---------- Q2b: accidents ---------- */
  {fresh();BAL.mort.acc.me=1200;pin();force(mm);BAL.mort.acc.me=0;const c=card("sgAcc");
   ok("accident (her): not the same month",!S.dead&&S.accW,S.fate);ok("accident (her): «Điềm gở» card comes (must)",c&&c.must===1,c&&c.t);
   const o=c?c.opts:[];ok("accident card: ≤ 3 tiers + Để sau (bạc pair in VỪA)",o.length===4&&o[3].n==="Để sau",o.map(x=>x.n).join(" | "));
   const B=BAL.mort.sign.road;ok("accident VỪA pair: same odds",B.bac.p===B.sl.p);ok("accident: odds rise with the tier",B.nhe.p<B.bac.p);
   ok("accident card: odds words, tốn, no %",o.slice(0,3).every(x=>W.some(w=>x.j67.includes(w))&&/tốn:/.test(x.j67))&&!/%/.test(strip(c&&c.h)+o.map(x=>x.j67).join("")),o.map(x=>strip(x.j67)).join(" || "));
   ok("accident card: the sign names the place",/bậc đá|hồ Thái Dịch|điềm gở|yến|lầu|gánh chèo|Trời|ngựa/i.test(strip(c&&c.h)),strip(c&&c.h));
   quiet();pin();mm();ok("accident (her): no road → it comes the next month",S.dead&&/Ngươi/.test(S.mort.cause||""),S.mort&&S.mort.cause)}
  {fresh();BAL.mort.acc.me=1200;pin();force(mm);BAL.mort.acc.me=0;const c=card("sgAcc");roll=()=>true;try{c&&c.opts[0].go()}finally{roll=r0}quiet();pin();mm();
   ok("accident (her): heeded sign → no accident",!S.dead,S.fate);ok("accident: pending cleared",!S.accW)}
  {fresh();BAL.mort.acc.me=1200;pin();force(mm);BAL.mort.acc.me=0;const c=card("sgAcc");const ap0=apply,got=[];apply=function(o){got.push(JSON.stringify(o));return ap0.apply(this,arguments)};roll=()=>false;try{c&&c.opts[2].go()}finally{roll=r0;apply=ap0}
   ok("accident road failed: still a gain (law 3, fw applied)",got.includes(JSON.stringify(BAL.mort.sign.road.sl.fw)),got.join(" "));quiet();pin();mm();ok("accident road failed: it still comes (law 6)",S.dead,S.fate)}
  {fresh();BAL.mort.acc.me=1200;pin();force(mm);BAL.mort.acc.me=0;quiet();S.bac=0;const c=mkP("sgAcc",{})?{opts:mkP("sgAcc",{}).o}:null;ok("accident: bạc road shows ✗ when short",c&&c.opts[1].need&&c.opts[1].need[0].ok===false);quiet()}
  /* NPC + Emperor accidents (law 1) */
  {fresh();const v=liveRivals(false)[0];BAL.mort.acc.npc=1200;BAL.mort.sign.npcP=0;pin();mm();BAL.mort.acc.npc=0;const a=v.alive!==false&&!!v.accW;quiet();pin();mm();
   ok("accident (NPC): a month of sign, then it comes",a&&v.alive===false,`pending ${a} alive ${v.alive}`);
   fresh();const v2=liveRivals(false)[0];BAL.mort.acc.npc=1200;BAL.mort.sign.npcP=100;roll=p=>p>=50?true:r0(p);try{pin();mo()}finally{roll=r0}BAL.mort.acc.npc=0;quiet();pin();mm();
   ok("accident (NPC): heeds the sign on the same odds → spared",v2.alive!==false,`alive ${v2.alive}`);BAL.mort.sign.npcP=50}
  {fresh();BAL.mort.acc.emp=1200;BAL.mort.sign.npcP=0;pin();force(mm);BAL.mort.acc.emp=0;const a=!!S.emp.accW&&!S.mort.empDue&&!S.mort.empWhy;quiet();pin();mm();
   ok("accident (Emperor): a month of sign, then it comes",a&&!!(S.mort.empDue||S.mort.empWhy),`pending ${a} due ${S.mort.empDue||S.mort.empWhy} accW ${JSON.stringify(S.emp.accW)} empDead ${S.empDead} alive ${S.emp.alive}`);BAL.mort.sign.npcP=50;quiet()}
  /* ---------- Q3: «Sắp kiệt sức» ---------- */
  {fresh();S.kiet=null;S.suc=12;kietDue();const c=card("kiet");ok("kiệt sức: card at Sức ≤ warn",c&&c.must===1,c&&c.t);
   const o=c?c.opts:[];ok("kiệt sức: ≤ 3 tiers (4 roads, bạc pair) + Để sau",o.length===5&&o[4].n==="Để sau",o.map(x=>x.n).join(" | "));
   const B=BAL.kiet.road;ok("kiệt sức VỪA pair: same odds and gain",B.bac.p===B.sl.p&&B.bac.w.suc===B.sl.w.suc);ok("kiệt sức: gain rises NHẸ<VỪA<NẶNG",B.nhe.w.suc<B.bac.w.suc&&B.bac.w.suc<B.nang.w.suc);
   ok("kiệt sức: every road gains on failure (law 3)",["nhe","bac","sl","nang"].every(k=>B[k].fw&&B[k].fw.suc>0));
   ok("kiệt sức: odds words, no %",o.slice(0,4).every(x=>W.some(w=>x.j67.includes(w)))&&!/%/.test(strip(c&&c.h)+o.map(x=>x.j67).join("")),o.map(x=>strip(x.j67)).join(" || "));
   quiet();kietDue();ok("kiệt sức: once per fall",!card("kiet"));const s0=S.suc;roll=()=>true;try{c&&c.opts[3].go()}finally{roll=r0}ok("kiệt sức NẶNG road: Sức up",S.suc>s0,s0+"→"+S.suc);
   S.suc=50;kietDue();S.suc=10;kietDue();ok("kiệt sức: again after climbing above reset",!!card("kiet"));quiet()}
  /* real paths: j14 lãnh cung cold (her + an NPC), j3 endTurn */
  {fresh();S.kiet=null;S.out=true;S.th=0;S.thDead=true;S.month=12;S.suc=3;const rr=roll;roll=p=>p===25||p===10||p===30?false:rr(p);try{coldMonth()}finally{roll=rr}
   ok("lãnh cung: first Sức 0 → alive at floor + card",!S.dead&&S.suc>=BAL.kiet.floor&&!!card("kiet"),`dead ${S.dead} suc ${S.suc} ${S.fate||""}`);quiet();
   S.suc=3;roll=p=>p===25||p===10||p===30?false:rr(p);try{coldMonth()}finally{roll=rr}ok("lãnh cung: after the warning, Sức 0 kills (law 6)",S.dead&&/Chết rét/.test(S.fate||""),S.fate)}
  {fresh();const v=liveRivals(false)[0];v.out=true;v.suc=2;v.kietW=0;BAL.kiet.npcP=0;S.out=false;coldMonth();const a1=v.alive!==false&&v.suc>=1;v.suc=2;coldMonth();BAL.kiet.npcP=50;
   ok("lãnh cung NPC: same warning floor, then the end",a1&&v.alive===false,`first ${a1} alive ${v.alive}`)}
  /* old save: no S.kiet / accW / sgn */
  {fresh();delete S.kiet;delete S.accW;delete S.sgn;let e="";try{kietDue();S.suc=10;kietDue();pin();mo()}catch(x){e=String(x)}ok("old save (no r2 fields) runs",!e,e);quiet()}
  return res});
 out.errs=out.errs.concat(errs);const bad=out.checks.filter(c=>!c.ok);
 for(const c of out.checks)console.log((c.ok?'ok  ':'FAIL')+' '+c.n+(c.ok?'':'  :: '+c.x));
 let scanOk=true;try{const s=execSync(`python3 ${path.join(R,'dev/test/kiet-scan.py')} ${path.join(R,'dev/build')}`).toString().trim().split('\n');
  const un=s.filter(l=>l.split('\t')[1]!=='kiet'&&!/^j8\.js:26\t/.test(l));scanOk=!un.length;console.log((scanOk?'ok  ':'FAIL')+` law-11 scan: ${s.length} Sức-0 death sites, unguarded (j8 dieIf = poison family excluded): ${un.length}`+(un.length?'\n'+un.join('\n'):''))}catch(e){console.log('scan error',e.message)}
 console.log(`${out.checks.length-bad.length+(scanOk?1:0)}/${out.checks.length+1} · page errors ${out.errs.length}`+(out.errs.length?' :: '+out.errs.slice(0,3).join(' | '):''));
 await b.close();if(MUT){try{fs.unlinkSync(path.join(R,PAGE))}catch(e){}console.log(bad.length?`MUTATE ${MUT}: ${bad.length} red (expected)`:`MUTATE ${MUT}: NOT caught`);process.exit(bad.length?0:1)}
 process.exit(bad.length||!scanOk||out.errs.length?1:0)})();
