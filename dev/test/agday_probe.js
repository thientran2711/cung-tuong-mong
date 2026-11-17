/* AG-ALL day plan probe: N days, plan drawn once per day, record follows plan, stats + perf */
const {chromium}=require('playwright');const URL='file://'+require('path').resolve(process.argv[2]||'dev/index.html');const DAYS=+process.argv[3]||6;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(async(DAYS)=>{const out={follow:0,diff:0,draws0:AGD.stat.draw,days:[]};
  for(let d=0;d<DAYS;d++){for(let bb=0;bb<4;bb++){try{placeWhere();agFlush()}catch(e){out.err=(out.err||"")+e.message}
    const R=S.roster;for(const v of liveRivals(true)){const s=agDaySlot("v"+v.id);if(!s||!R||!R.P["v"+v.id])continue;if(R.P["v"+v.id][0][0]===s.pl)out.follow++;else out.diff++}
    Q.length=0;S.mg=0;try{nextBuoi()}catch(e){out.nb=e.message}Q.length=0;}
   out.days.push(wk()+":"+S.buoi)}
  const D=agDz();out.stat=AGD.stat;out.draws=AGD.stat.draw-out.draws0;out.ms=AGD.ms.slice(-6).map(x=>+x.toFixed(1));out.errs=AGD.errs.slice(0,5);out.agErrs=AG.errs.slice(0,5);
  out.sample=Object.entries(D.P).slice(0,4).map(([id,L])=>id+": "+L.map(s=>s?(s.pl+(s.k?"/"+s.k:"")):"-").join(" | "));out.by=AG.stat.by;out.why=AGD.why;return out},DAYS);
 console.log(JSON.stringify(r,null,1));console.log('pageerrors',errs.slice(0,5));await b.close()})();
