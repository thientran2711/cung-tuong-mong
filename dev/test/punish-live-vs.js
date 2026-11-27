/* review/punish-reason: the same 4 steps on LIVE and on the branch (no branch-only helpers), for the before/after table.
   usage: node dev/test/punish-live-vs.js <url> [tries=40] → JSON: fall rank drops seen, two-rank drops, early pardon leaves at once, reason rows */
const {chromium}=require('playwright');const [,,URL,N='40']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0});await sleep(800);
 const r=await p.evaluate((N)=>{const o={falls:0,drop:{},cold:0,twoRank:0,reasonRows:0,earlyPardonOut:0,earlyPardonTries:0};
  for(let i=0;i<N;i++){S.out=0;S.rank=2;S.punWk=null;S.confined=0;Q.length=0;const v=liveRivals(true).find(x=>!x.queen&&!x.out);ACTX={a:v,pen:0};try{fall(S,"bị tố")}catch(e){}ACTX={a:null,pen:0};o.falls++;
   if(S.out)o.cold++;else{const d=2-S.rank;o.drop[d]=(o.drop[d]||0)+1;if(d>=2)o.twoRank++}
   if(Q.some(q=>/Ai tố/.test(JSON.stringify(q.kit||q.h||""))))o.reasonRows++;
   if(S.out){let q=queenP();if(!q||q===S){q=liveRivals(true).find(x=>!x.out);q.queen=true;q.rank=6}o.earlyPardonTries++;try{hhAct(q,S,"pardon")}catch(e){}if(!S.out)o.earlyPardonOut++}}
  return o},+N);
 console.log(JSON.stringify({url:URL,...r,errs:errs.slice(0,3)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
