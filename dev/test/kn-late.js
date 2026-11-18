/* kn-late: a LATE errand report (knErr "late" → S.knQ → knFlush at the next buổi) keeps its target:
   1 an NPC master's late scout report on the PLAYER reaches knErrGive with t === S (RV alone lost her: rivals only)
   2 a late report whose target died before the buổi turned is dropped (no nameless "dò la  " line), counted KN.stat.e_gone
   3 a late report on a living consort still lands with that consort
   usage: python3 dev/build/assemble.py && node dev/test/kn-late.js dev/index.html */
const {chromium}=require('playwright');const U='file://'+require('path').resolve(process.argv[2]||'dev/index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto(U,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
const r=await p.evaluate(()=>{const R=liveRivals(true).filter(v=>!v.coop);const v=R.find(x=>(x.staff||[]).some(s=>s&&s.sid!=null&&!s.out)),u=R.find(x=>x!==v);
 const s=v.staff.find(x=>x&&x.sid!=null&&!x.out);const got=[];const g0=knErrGive;window.knErrGive=knErrGive=function(s1,m,k,t,late){got.push({m:m===v,t:t===S?"S":t===u?"u":t?t.name:null,late});return g0.apply(this,arguments)};
 const pick0=knErrPick;window.knErrPick=knErrPick=()=> "late";const flush=()=>{const b0=S.buoi;S.knQ.forEach(x=>x.at="old");knFlush();S.buoi=b0};
 const out={};try{
  S.knQ=[];got.length=0;knErr(s,v,"scout",S);flush();out.me=got.slice();
  S.knQ=[];got.length=0;knErr(s,v,"scout",u);u.alive=false;const g1=KN.stat.e_gone||0;flush();u.alive=true;out.dead={got:got.slice(),gone:(KN.stat.e_gone||0)-g1,left:S.knQ.length};
  S.knQ=[];got.length=0;knErr(s,v,"scoutF",u);flush();out.live=got.slice();
 }finally{window.knErrGive=knErrGive=g0;window.knErrPick=knErrPick=pick0}return out});
ok(r.me.length===1&&r.me[0].t==="S"&&r.me[0].m,'1 NPC master\'s late scout on the player keeps her as the target',r.me);
ok(r.dead.got.length===0&&r.dead.gone===1&&r.dead.left===0,'2 late report on a consort who died meanwhile is dropped (no nameless line)',r.dead);
ok(r.live.length===1&&r.live[0].t==="u",'3 late report on a living consort lands with her',r.live);
ok(!errs.length,'no page errors',errs.slice(0,2));
const n=res.filter(x=>!x).length;console.log(n?`KN-LATE: ${n} FAIL`:`KN-LATE: ALL ${res.length} PASS`);await b.close();process.exit(n?1:0)})();
