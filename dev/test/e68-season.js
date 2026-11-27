/* flight-e68-season regression (law 11): a held (EVHOLD) or pending (save P → deserQ) j68 card whose template no longer fits after the month
   turned is dropped, a fitting one stays. Case: j68c-sea-023 (needs.month 11/12/1, lò sưởi) built in tháng 12, then the month is 2.
   Before: rebuilt in tháng 2 with a spring opener («Gió xuân lùa…») over a winter story. Exit 1 on failure.
   usage: node dev/test/e68-season.js <page url>   (serve the repo root) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{window.__e68off=1;const id='j68c-sea-023',s=E68I['c:'+id];S.month=12;let pp=null;for(let t=0;t<8&&!pp;t++){try{pp=s.pp()}catch(e){}}if(!pp)return{err:'not cast'};pp.vi=0;
  const P=[{pid:'e68c:'+id,pp,t:'Thời tiết'}];const r={};
  S.month=12;r.pendWinter=deserQ(P).length;           /* still fits → kept */
  S.month=2;r.pendSpring=deserQ(P).length;            /* month turned → dropped */
  S.month=12;const m=deserQ(P)[0];Q.length=0;EVHOLD.length=0;EVHOLD.push({m,at:wk(),K:null});S.month=2;
  for(let i=0;i<6&&EVHOLD.length;i++){Q.length=0;evRelease()}r.holdLeft=EVHOLD.length;r.holdShown=Q.filter(x=>x&&x.pid==='e68c:'+id).length;Q.length=0;
  if(typeof e68Fits!=='function'){r.noFits=1;return r}S.month=12;r.fitsWinter=e68Fits({pid:'e68c:'+id});S.month=2;r.fitsSpring=e68Fits({pid:'e68c:'+id});r.other=e68Fits({pid:'nope',t:'x'});return r});
 const ok=R.pendWinter===1&&R.pendSpring===0&&R.holdLeft===0&&R.holdShown===0&&R.fitsWinter&&!R.fitsSpring&&R.other&&!errs.length;
 console.log(JSON.stringify(R),errs.slice(0,2));console.log(ok?'E68-SEASON PASS':'E68-SEASON FAIL');await b.close();process.exit(ok?0:1)})();
