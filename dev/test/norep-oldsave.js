/* ORDER THIN P0 gate: 3 old saves + old 'ctm-e68h' history from the LIVE build load clean in the new build (jnorep 'ctm-nr').
   usage: bash dev/site/build_site.sh && git show origin/main:index.html > /tmp/old.html && node dev/test/norep-oldsave.js /tmp/old.html
   Old build: 3 lives (slots 1–3), each plays a buổi and marks real j68 keys (e68Mark) as the old code does. New build: ctm-nr == ctm-e68h
   (+ "j68:" family), every j68 template's cross-life count is the same as the old e68Past, each save loads + plays a buổi, 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OLD=process.argv[2];let VER='old';
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.startsWith('/__ver/')){VER=p.slice(7);return r.end(VER)}
 if(p==='/'||p==='/index.html'){r.setHeader('Content-Type','text/html; charset=utf-8');return fs.createReadStream(VER==='old'?OLD:path.join(ROOT,'index.html')).pipe(r)}
 const f=path.join(ROOT,p.replace(/^\/+/,''));if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}fs.createReadStream(f).pipe(r)});
const sl=t=>new Promise(r=>setTimeout(r,t));let fail=0;const ok=(c,m)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m)};
const BUOI=async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));const k0=JSON.stringify([S.turn,S.buoi,S.month,S.year]);
 for(let i=0;i<40;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
  const n=document.getElementById('next');if(n&&!n.disabled){n.click();await sl(300);break}await sl(200)}
 for(let j=0;j<40&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}
 return JSON.stringify([S.turn,S.buoi,S.month,S.year])!==k0||!!S.dead};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const open=async()=>{const g=await D.openHost(p,URL,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});return g};
 let g=await open();const names=[];
 for(let s=1;s<=3;s++){names.push(await g.evaluate(s=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=s;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});e68();const ids=E68.map(x=>x.id);for(let i=0;i<6;i++)e68Mark(ids[(i*7+s*3)%ids.length]+':'+(i%3));evHistMark('j72:t'+s);return S.name},s));
  await g.evaluate(BUOI);await g.evaluate(s=>localStorage.setItem(SK(s),JSON.stringify(ser())),s)}
 const oldH=await g.evaluate(()=>localStorage.getItem('ctm-e68h'));ok(errs.length===0,'old build: 3 lives played, '+errs.length+' errors');errs.length=0;
 await fetch(URL+'__ver/new');g=await open();
 const mig=await g.evaluate(()=>{const H=JSON.parse(localStorage.getItem('ctm-e68h'));const N=nrStore().H;
  const past=(key,pre)=>{let n=0;for(const l of H.L.slice(1,6))if(l.some(k=>pre?k.indexOf(key+':')===0||k===key:k===key))n++;return n};
  let diff=0,n=0;for(const t of E68){n++;if(past(t.id,true)!==nrSeen('j68',t.id,true))diff++;for(let v=0;v<3;v++){n++;if(past(t.id+':'+v)!==nrSeen('j68',t.id+':'+v))diff++}}
  return{lives:N.L.length,oldLives:H.L.length,cur:N.cur===H.cur,keys:N.L.flat().length,oldKeys:H.L.flat().length,diff,n,j72:nrSeenK('j72:t1')}});
 ok(mig.lives===mig.oldLives&&mig.cur&&mig.keys===mig.oldKeys,'ctm-nr = ctm-e68h: '+JSON.stringify(mig));ok(mig.diff===0,`j68 cross-life counts identical old vs new on ${mig.n} keys`);
 for(let s=3;s>=1;s--){const ld=await g.evaluate(s=>{const d=loadSlot(s);if(!d)return{ok:false};SLOT=s;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();const L0=nrStore().H.L.length;e68Mark('gossipTea:9');
   return{ok:true,name:S.name,nrl:S.nrl,lid:S.e68&&S.e68.lid,L:nrStore().H.L.length,L0}},s);
  const mv=ld.ok&&await g.evaluate(BUOI);ok(ld.ok&&ld.name===names[s-1]&&ld.nrl===ld.lid&&mv,`slot ${s} (${ld.name}) loads, adopts its j68 life id, plays a buổi`)}
 ok(errs.length===0,'new build: '+errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`NOREP OLDSAVE: ${fail} FAIL`:'NOREP OLDSAVE: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
