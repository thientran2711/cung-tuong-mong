/* owner 16/11 (screenshot, co-op): every act line ended "Ân tình 0→1" while Ân tình stayed 1. Cause: snapReal (j2) took only the NAMES
   keys, logReal diffed RKEYS (with Ân tình) → the missing "before" read as 0. Test: Ân tình (and every stat) set non-zero, then several
   deck acts, choices and talks in a row; no line may show a stat that did not change.  usage: node dev/test/an-tinh-diff.js <url> */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
 await p.evaluate(()=>{window.__bot={pre:1};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});
 const r=await p.evaluate(()=>{const bad=[];let n=0;Q.length=0;S.an=1;S.mat=2;S.th=10;S.hh=5;S.suc=80;S.bac=300;if(typeof lsSync==="function")lsSync("test");/* (log-sync branch: the test's own direct setting is synced first) */
  const K=typeof RKEYS!=="undefined"?RKEYS:[];const chk=(what,b)=>{const L=S.logs.slice(0,Math.max(0,(S.logSeq||0)-b.seq)).map(x=>String(x).replace(/<[^>]+>/g,""));
   for(const [k,nm] of K){if((S[k]||0)!==b.v[k])continue;const re=new RegExp(nm.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*-?\\d+\\s*→");for(const t of L)if(re.test(t))bad.push(`${what}: ${nm} unchanged but logged: ${t.slice(0,140)}`)}n++};
  const snap=()=>{const v={};for(const [k] of K)v[k]=S[k]||0;return{v,seq:S.logSeq||0}};
  for(let round=0;round<6;round++){used=0;S.buoi=round%3;deal();
   for(let i=0;i<deck.length;i++){const a=deck[i];if(!a||a.done||!canPay(a)||a.lock||!can(cardCost(a))||(a.b!=null&&(S.buoi||0)!==a.b)||Q.length)continue;const b0=snap();act(i);chk("act "+a.n,b0);
    let g=0;while(Q.length&&g++<5){const m=Q[0];const b1=snap();if(m.opts&&m.opts.length){const j=m.opts.findIndex(o=>!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(j<0?0:j);chk("choice "+(m.t||m.pid),b1)}else closeModal()}
    if(S.mg){S.mg=null;try{kg82Close(true)}catch(e){}}}
   try{const P=curPeople();for(let pi=0;pi<P.length;pi++){popIdx=pi;const T=talkOpts(P[pi]);for(let oi=0;oi<T.length&&S.visit&&S.visit.talked!==true;oi++){const b0=snap();talk(oi);chk("talk "+T[oi].n,b0);while(Q.length)Q[0].opts&&Q[0].opts.length?chooseM(0):closeModal()}}}catch(e){}}
  return {n,bad:bad.slice(0,10),badN:bad.length,an:S.an}});
 console.log(JSON.stringify(r,null,1));console.log(r.badN?"FAIL":"PASS",r.n,"acts/choices/talks checked");await b.close();process.exit(r.badN?1:0)})();
