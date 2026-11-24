/* ORDER THIN P8 shots: composed road chapter cards (j67 story card, kit event frame) on Fold 755x1000@2 + iPad 1180x820@2.
   node dev/test/rdc-shots.js <outdir> [chapter:slot,…]   slot = s (opening) | c (complication) | x (climax). Shots go OUTSIDE git.
   Same entry flow as j7c-shots.js (a real saved life, reloaded); each chapter is opened as a side thread and its hồi card is shown. */
const {chromium}=require('playwright');const D=require('./lib/device');const RL=require('./lib/roulette');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=path.resolve(process.argv[2]||'/tmp/j7c-shots');fs.mkdirSync(OUT,{recursive:true});

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
const IDS=(process.argv[3]||'tt_ruong_6:s,cnv_kho_8:c,pf_co_11:x').split(',').filter(Boolean);
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const errs=[];
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();p.on('pageerror',e=>errs.push(dev+': '+e.message));
  let g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
  /* review thin-p2 r1: the new-life entry flow ends inside the selection / reward scenes, which hide the card. So, as dev/tools/quickcheck.js
     step 2: start a life, play one buổi, save it into sổ 3 the game's own way (ser), reload, load sổ 3 (loadSlot + deser) and show the card there. */
  await g.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent))b.click()}).catch(()=>{});await p.waitForTimeout(500);await g.evaluate(QC.NEWLIFE);await g.waitForFunction(QC.SETTLE,null,{polling:150,timeout:60000}).catch(()=>{});await g.evaluate(QC.BUOI).catch(()=>{});
  await g.evaluate(()=>localStorage.setItem(SK(3),JSON.stringify(ser())));
  await p.reload();const g2=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g2.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
  g=g2;await g.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent))b.click()}).catch(()=>{});await p.waitForTimeout(500);await g.evaluate(X=>{const d=loadSlot(3);SLOT=3;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
   S.rank=Math.max(S.rank,2);render()});await p.waitForTimeout(2500);
  await g.waitForFunction(QC.SETTLE,null,{polling:150,timeout:60000}).catch(()=>{});await p.waitForTimeout(800);
  for(const id of IDS){const ok=await g.evaluate(id=>{const [ch,sl]=id.split(':');if(!ARC67[ch])return 'no chapter';
    while(Q.length)Q.shift();try{closeModal()}catch(e){}while(Q.length)Q.shift();S.st.X=(S.st.X||[]).filter(t=>!t.__shot);
    const A=newThread67(ch,"s");if(!A)return 'no cast';A.__shot=1;S.st.X.push(A);A.i=Math.max(0,A.seq.indexOf(sl));A.used=[];pickNext67(A);if(!A.nb)return 'no hồi';A.due=0;fireBeat67(A);render();return 'ok '+A.nb},id);
   await g.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent))b.click()}).catch(()=>{});await p.waitForTimeout(4000);const f=path.join(OUT,`rdc-${id.replace(':','-')}-${dev}.png`);await p.screenshot({path:f});console.log(id,dev,ok,f)}
  await ctx.close()}
 console.log('errors',errs.length,errs[0]||'');await b.close();srv.close()})();
