/* ORDER THIN P8 gate: 3 saves from the LIVE build (origins tt, cnv, bd; each on its old road) load clean in the new build: same road, same chapter plan,
   no composition added (S.st.f14.rc), each plays a buổi, 44 composed roads registered, 0 page errors.
   usage: git show origin/main:index.html > /tmp/old.html && node dev/test/rdc-oldsave.js /tmp/old.html */
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
 let g=await open();const old=[];const OR=['tt','cnv','bd'];
 for(let s=1;s<=3;s++){old.push(await g.evaluate(([s,k])=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=s;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__forceOrigin=k;start();
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});return{name:S.name,o:S.origin.k,road:S.st&&S.st.f14&&S.st.f14.road,plan:S.st&&S.st.ch&&S.st.ch.plan.join(',')}},[s,OR[s-1]]));
  await g.evaluate(BUOI);await g.evaluate(s=>localStorage.setItem(SK(s),JSON.stringify(ser())),s)}
 ok(errs.length===0,'old build (LIVE): 3 lives '+old.map(x=>x.o+'/'+x.road).join(' ')+' played a buổi, '+errs.length+' errors');errs.length=0;
 await fetch(URL+'__ver/new');g=await open();
 const n=await g.evaluate(()=>({roads:Object.keys(RDC.def).length,prem:Object.keys(RDC.road).length}));ok(n.roads===44&&n.prem===44,'new build: 44 composed roads registered '+JSON.stringify(n));
 for(let s=3;s>=1;s--){const ld=await g.evaluate(s=>{const d=loadSlot(s);if(!d)return{ok:false};SLOT=s;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return{ok:true,name:S.name,o:S.origin.k,road:S.st&&S.st.f14&&S.st.f14.road,plan:S.st&&S.st.ch&&S.st.ch.plan.join(','),rc:!!(S.st&&S.st.f14&&S.st.f14.rc)}},s);
  const mv=ld.ok&&await g.evaluate(BUOI);const o=old[s-1];
  ok(ld.ok&&ld.name===o.name&&ld.road===o.road&&ld.plan===o.plan&&!ld.rc&&mv,`slot ${s} (${ld.name}, ${ld.o}) loads with its old road ${ld.road} and plan unchanged, no composition added, plays a buổi`)}
 ok(errs.length===0,'new build: '+errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`RDC OLDSAVE: ${fail} FAIL`:'RDC OLDSAVE: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
