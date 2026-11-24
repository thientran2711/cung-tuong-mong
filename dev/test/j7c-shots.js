/* ORDER THIN P2 shots: composed intrigue cards on Fold 755x1000@2 + iPad 1180x820@2. node dev/test/j7c-shots.js <outdir> [seedsFile] [id,id,id]
   seedsFile default = the game's own J7SEEDS (j7sd.js); a JSONL file is pushed in first (fixture runs). Shots go OUTSIDE git. */
const {chromium}=require('playwright');const D=require('./lib/device');const RL=require('./lib/roulette');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=path.resolve(process.argv[2]||'/tmp/j7c-shots');fs.mkdirSync(OUT,{recursive:true});
const EXTRA=process.argv[3]&&fs.existsSync(process.argv[3])?fs.readFileSync(process.argv[3],'utf8').split('\n').filter(l=>l.startsWith('{')).map(JSON.parse):[];
/* the quickcheck new-life / settle / buổi helpers (dev/tools/quickcheck.js:44–52, copied) */
const QC=(()=>{const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){if(i)try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}
 ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});return S.name};
const SETTLE=()=>{try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){try{Q.shift()}catch(x){}}
 const n=document.getElementById('next');return !!n&&!n.disabled&&!Q.length&&!S.dead};
const BUOI=async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const k0=JSON.stringify([S.turn,S.buoi,S.month,S.year]);const t0=performance.now();
 for(let i=0;i<40;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
  const n=document.getElementById('next');if(n&&!n.disabled){n.click();await sl(300);break}await sl(200)}
 for(let j=0;j<40&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
 return {ms:Math.round(performance.now()-t0),moved:JSON.stringify([S.turn,S.buoi,S.month,S.year])!==k0,dead:!!S.dead}};
return {NEWLIFE,SETTLE,BUOI}})();
const IDS=(process.argv[4]||'').split(',').filter(Boolean);
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const errs=[];
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();p.on('pageerror',e=>errs.push(dev+': '+e.message));
  let g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
  /* review thin-p2 r1: the new-life entry flow ends inside the selection / reward scenes, which hide the card. So, as dev/tools/quickcheck.js
     step 2: start a life, play one buổi, save it into sổ 3 the game's own way (ser), reload, load sổ 3 (loadSlot + deser) and show the card there. */
  await g.evaluate(QC.NEWLIFE);await g.waitForFunction(QC.SETTLE,null,{polling:150,timeout:60000}).catch(()=>{});await g.evaluate(QC.BUOI).catch(()=>{});
  await g.evaluate(()=>localStorage.setItem(SK(3),JSON.stringify(ser())));
  await p.reload();const g2=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g2.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
  g=g2;await g.evaluate(X=>{const d=loadSlot(3);SLOT=3;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
   for(const s of X)if(!J7SEEDS.some(y=>y.id===s.id))J7SEEDS.push(s);S.rank=Math.max(S.rank,2);render()},EXTRA);await p.waitForTimeout(2500);
  await g.waitForFunction(QC.SETTLE,null,{polling:150,timeout:60000}).catch(()=>{});await p.waitForTimeout(800);
  const ids=IDS.length?IDS:await g.evaluate(()=>j7cReady().slice(0,3).map(x=>x.sd.id));
  for(const id of ids){const ok=await g.evaluate(id=>{j7cSeeds();const sd=J7I[id];if(!sd)return 'no seed';const C=j7cCast(sd);if(!C)return 'no cast';const d=mkP("j7c",{sid:id,c:C});if(!d)return 'no card';
    while(Q.length)Q.shift();try{closeModal()}catch(e){}while(Q.length)Q.shift();pushDil(d,"Chuyện trong cung");return 'ok'},id);
   await p.waitForTimeout(1200);const f=path.join(OUT,`j7c-${id}-${dev}.png`);await p.screenshot({path:f});console.log(id,dev,ok,f)}
  await ctx.close()}
 console.log('errors',errs.length,errs[0]||'');await b.close();srv.close()})();
