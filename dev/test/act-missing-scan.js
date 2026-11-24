// review/fix-kframe-heir LAW 11 scan: every ACT f(a,t) run when its person / child is gone (target with no kids, no qualifying son,
// odds forced win and lose, nobody caught) must not throw and must not move a child that does not exist. usage: node dev/test/act-missing-scan.js [root]
const path=require('path');const R=path.resolve(process.argv[2]||path.join(__dirname,'../..'));const {chromium}=require('playwright');const {serve,BASE}=require(R+'/dev/test/coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const out=await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;
  const snap=JSON.stringify(S);const rows=[];const keys=Object.keys(ACT);
  const c0=caught,r0=aRoll,p0=punish,d0=deathSentence;
  for(const k of keys)for(const win of [true,false])for(const side of ["npc->her","her->npc"])for(const mode of ["no child","one grown daughter"]){
   /* fresh: restore S, then strip the target's children so a kid / son act finds nobody */
   const v=liveRivals(false).find(x=>x&&!x.coop&&x.alive);const a=side==="npc->her"?v:S,t=side==="npc->her"?S:v;
   const ka=(a.kids||[]).slice(),kt=(t.kids||[]).slice();t.kids=[];if(mode!=="no child"){const d=mkKid("f",30);d.alive=true;t.kids.push(d)}const nt=t.kids.length,na=(a.kids||[]).length;
   caught=()=>null;aRoll=()=>win;punish=()=>"";deathSentence=()=>"";let err=null;
   try{ACT[k].f(a,t,0)}catch(e){err=String(e&&e.message||e)}finally{caught=c0;aRoll=r0;punish=p0;deathSentence=d0}
   const bad=(a.kids||[]).some(x=>x==null)||(t.kids||[]).some(x=>x==null)||(t.kids||[]).length!==nt||(a.kids||[]).length!==na;
   if(err||bad)rows.push({k,win,side,mode,err,bad});a.kids=ka;t.kids=kt;Q.length=0}
  return {n:keys.length,rows}});
 const keyed={};for(const r of out.rows)(keyed[r.k]=keyed[r.k]||[]).push(`${r.side}/${r.mode}/${r.win?'win':'lose'}: ${r.err||''}${r.bad?' [a child moved / undefined pushed]':''}`);
 for(const k in keyed)console.log('FAIL '+k+' — '+keyed[k].join(' | '));
 console.log(`act-missing-scan: ${out.n} acts × win/lose × 2 sides × 2 modes, ${Object.keys(keyed).length} acts fail`);await b.close();process.exit(Object.keys(keyed).length?1:0)})();
