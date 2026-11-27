/* ORDER THIN P2 reach: how many of the J7SEEDS can be cast + grounded in real fresh lives (8 lives, rank set 1..4). node dev/test/j7c-reach.js */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const r=await g.evaluate(()=>{const out=[];const ever=new Set();let bad=[];
  for(let l=0;l<8;l++){SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(window.isSrv&&isSrv()))break}
   for(const rk of [1,2,3,4]){S.rank=rk;const R=j7cReady();R.forEach(x=>ever.add(x.sd.id));
    /* build every ready card once: every placeholder filled, 4 options, no exception */
    for(const x of R){try{const d=PEND.j7c({sid:x.sd.id,c:x.C});if(!d||d.o.length!==4||/\{[a-z]+\}/.test(d.t+d.o.map(o=>o.n+o.x).join('')))bad.push(x.sd.id)}catch(e){bad.push(x.sd.id+':'+e.message)}}
    out.push(R.length)}}
  return{total:J7SEEDS.length,perState:out,ever:ever.size,never:J7SEEDS.filter(s=>!ever.has(s.id)).map(s=>s.id),bad:[...new Set(bad)],dil:!!j7cDil()}});
 console.log(JSON.stringify(r));console.log('errors',errs.length,errs[0]||'');await b.close();srv.close()})();
