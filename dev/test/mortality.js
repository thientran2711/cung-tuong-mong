/* review/mortality smoke + fast month-loop check (no UI). usage: node dev/test/mortality.js [months=240] [lives=3]
   Serves the repo's dev/index.html from disk; starts a new life; checks every person got a lifespan; runs monthTick() directly
   (dialog queue cleared) and prints deaths by cause; then forces each Emperor-fate branch and an old save without S.mort. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'../..');const MONTHS=+process.argv[2]||240,LIVES=+process.argv[3]||3;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
 const page=await ctx.newPage();const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
 const out=await page.evaluate(([MONTHS,LIVES])=>{const res={lives:[],fates:[],errs:[]};
  const quiet=()=>{try{Q.length=0}catch(e){}};
  for(let l=0;l<LIVES;l++){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();quiet();
   const P=[S,S.emp,S.thO,...rivals,...Object.values(S.court||{})].filter(Boolean);const miss=P.filter(p=>!(p.tho>0)).length;
   const L={miss,me:S.tho,emp:[S.emp.age,S.emp.tho],th:[S.thAge,S.thO&&S.thO.tho],deaths:[],end:null};
   const logs0=new Set();
   for(let m=0;m<MONTHS&&!S.dead;m++){let ev="";try{ev=monthTick()}catch(e){res.errs.push(String(e).slice(0,160));break}quiet();
    const t=String(ev).replace(/<[^>]+>/g,'');(t.match(/[^.]*(qua đời|băng hà|mất vì|không qua khỏi|ngã|nghẹn|ngất)[^.]*\./g)||[]).forEach(x=>L.deaths.push(`Y${S.year}: ${x.trim().slice(0,110)}`))}
   L.end=S.dead?(S.fate||"dead")+" @ year "+S.year+" age "+S.age:"alive year "+S.year;res.lives.push(L)}
  /* forced Emperor fates */
  const F=[["childless low rank",()=>{S.rank=0;S.kids=[];S.age=22;S.sung=10}],["childless Phi",()=>{S.rank=4;S.kids=[];S.sung=20}],["childless favourite, low Đức",()=>{S.rank=3;S.kids=[];S.sung=90;S.duc=10;S.th=0;BAL.mort.fate.tuanP=100}],["childless favourite, Đức 60",()=>{S.rank=3;S.kids=[];S.sung=90;S.duc=60;BAL.mort.fate.tuanP=100}],["daughter",()=>{S.rank=2;S.kids=[mkKid("f",3)]}]];
  for(const [n,f] of F){start();quiet();rivals.forEach(v=>v.kids=[]);S.heir=null;f();S.mort.empDue="Ngự thiện có độc";
   S.month=12;let ev="";try{ev=monthTick()}catch(e){res.errs.push(n+": "+String(e).slice(0,160))}
   const q=(Q[0]||{});res.fates.push({n,dead:S.dead,fate:S.fate,t:String(q.h||"").replace(/<[^>]+>/g,'').slice(0,260)});quiet();BAL.mort.fate.tuanP=25}
  /* birth: force hard births → the Emperor's choice; stillbirth; plain hard birth survived */
  const B=BAL.mort.birth,b0=JSON.stringify(B);res.birth=[];const tries=[["choice, low favour",()=>{B.stillP=0;B.hardX=99;B.choiceP=100;S.sung=5;S.th=-50}],["choice, high favour",()=>{B.stillP=0;B.hardX=99;B.choiceP=100;S.sung=100;S.th=80}],["hard survived",()=>{B.stillP=0;B.hardX=99;B.choiceP=0;B.hardDie=0}],["stillbirth",()=>{B.stillP=100}]];
  for(const [n,f] of tries){for(let i=0;i<3;i++){start();quiet();S.suc=30;f();const k0=S.kids.length;let r="";try{r=birthP(S,false)}catch(e){res.errs.push(n+": "+e)}
   res.birth.push({n,fate:S.fate||"",dead:!!S.dead,kids:S.kids.length-k0,suc:S.suc,q:(Q.find(x=>x.t==="Giữ mẹ hay giữ con")||{}).h?"event":"",t:String(r).replace(/<[^>]+>/g,'').slice(0,120)});Object.assign(B,JSON.parse(b0));quiet()}}
  /* old save: strip lifespans and S.mort, round-trip */
  start();quiet();const P2=[S,S.emp,...rivals];P2.forEach(p=>{delete p.tho;delete p.thoM;delete p.thoO});delete S.mort;S.turn=60;S.year=6;
  try{const d=JSON.parse(JSON.stringify(ser()));deser(d);res.old={ok:S.tho>0&&S.emp.tho>0&&S.mort&&S.mort.old===1,me:[S.age,S.tho]}}catch(e){res.old={err:String(e).slice(0,200)}}
  return res},[MONTHS,LIVES]);
 out.pageErrors=errs;console.log(JSON.stringify(out,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
