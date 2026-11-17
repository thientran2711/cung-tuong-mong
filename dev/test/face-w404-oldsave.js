/* face-w404 old-save gate (review/face-w404): a life started + played on the LIVE build is saved the game's own way, loaded by the NEW build:
   every person's saved face id (S, maid, emperor, Thái hậu, rivals, men, court, servants) and the picture url they draw must be identical.
   Also forces two "@W<n>" ids into the save (an old save from before the pool filter) and checks they keep their face.
   usage: node dev/test/face-w404-oldsave.js <new built root> <old built root> */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const [NEW,OLD]=process.argv.slice(2).map(x=>path.resolve(x));let ROOT=OLD;const sl=t=>new Promise(r=>setTimeout(r,t));
const s=http.createServer((q,r)=>{let p=new URL(q.url,'http://x').pathname;if(p==='/__ver/old'||p==='/__ver/new'){ROOT=p.endsWith('old')?OLD:NEW;return r.end('ok')}if(p==='/')p='/index.html';const f=path.join(ROOT,p);
 if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}r.setHeader('Content-Type',p.endsWith('.html')?'text/html; charset=utf-8':p.endsWith('.js')?'text/javascript':'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
const SNAP=()=>{const o={};const add=(k,x)=>{if(x)o[k]=[x.fc||"",x.fk||"",(typeof pv==="function"&&x.id!=null&&x.name?(()=>{try{return pv(x).src}catch(e){return"?"}})():"")]};
 add("me",S);add("maid",S.maid);add("emp",S.emp);o.thF=[S.thF||"","",""];(rivals||[]).forEach((v,i)=>add("r"+i,v));(S.men||[]).forEach((m,i)=>add("m"+i,m));for(const k in (S.court||{}))add("c"+k,S.court[k]);
 try{allServ().forEach((x,i)=>add("s"+i,x))}catch(e){}
 const w=o;for(const k in w)w[k]=[w[k][0],w[k][1],String(w[k][2]).replace(/^data:.*/,"data:"+String(w[k][2]).length)];return o};
s.listen(0,'127.0.0.1',async()=>{const b=await chromium.launch({proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}});const ctx=await D.newDeviceContext(b,'fold',{reducedMotion:'reduce'});const p=await ctx.newPage();const u='http://127.0.0.1:'+s.address().port+'/';const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const open=async()=>{const g=await D.openHost(p,u,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await sl(2500);return g};
 let g=await open();
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){if(i)try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
 await sl(3000);
 await g.evaluate(()=>{try{(rivals||[]).slice(0,2).forEach((v,i)=>{v.fc="@W"+[3,8][i];v.fk="ct1"})}catch(e){}try{localStorage.setItem(SK(3),JSON.stringify(ser()))}catch(e){}});
 const before=await g.evaluate(SNAP);
 await fetch(u+'__ver/new');g=await open();
 const after=await g.evaluate(()=>{const d=loadSlot(3);SLOT=3;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return null}).then(()=>sl(4000)).then(()=>g.evaluate(SNAP));
 const keys=Object.keys(before);const diff=keys.filter(k=>JSON.stringify(before[k])!==JSON.stringify(after[k]));
 console.log('people',keys.length,'face ids+urls identical',keys.length-diff.length,'changed',diff.length,'page errors',errs.length);for(const k of diff.slice(0,10))console.log('DIFF',k,JSON.stringify(before[k]),'->',JSON.stringify(after[k]));
 console.log('forced @W rivals:',JSON.stringify([before.r0,after.r0,before.r1,after.r1]));
 await b.close();s.close();process.exit(diff.length||errs.length?1:0)});
