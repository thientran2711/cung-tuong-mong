/* face-w404 r2: faces really load. new life -> every tab -> count drawn images whose src is a face/portrait file and whether they decoded.
   usage: node dev/test/face-w404-load.js <built root> */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(process.argv[2]);const sl=t=>new Promise(r=>setTimeout(r,t));
const TY={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png'};
const s=http.createServer((q,r)=>{let p=new URL(q.url,'http://x').pathname;if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}r.setHeader('Content-Type',TY[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
s.listen(0,'127.0.0.1',async()=>{const url='http://127.0.0.1:'+s.address().port+'/';const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'localhost,127.0.0.1'}}:{});
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});const p=await ctx.newPage();const g=await D.openHost(p,url,{timeout:120000});
  await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await sl(8000);
  await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;store.set(NL_KEY,{seed:1000003,at:1});start()});await g.waitForFunction(()=>typeof NLP!=='undefined'&&NLP&&S&&S.emp,null,{timeout:30000});await sl(2500);
  await g.evaluate(()=>{try{document.querySelector('[data-nl="ok"]').click()}catch(e){}});await sl(2500);
  const tabs=await g.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length).map(x=>x.dataset.tab));
  const seen=new Map();const scan=async()=>{const L=await g.evaluate(()=>[...document.images].filter(i=>/\/(face-|por-)/.test(i.currentSrc||i.src)).map(i=>[(i.currentSrc||i.src).replace(/^.*\/img\//,''),i.complete&&i.naturalWidth>0]));for(const [u,ok] of L)seen.set(u,(seen.get(u)||ok)||ok)};
  await scan();for(const t of tabs){await g.evaluate(t=>{const e=document.querySelector('#tabs [data-tab="'+t+'"]');if(e)e.click()},t);await sl(900);await scan()}
  const faces=[...seen].filter(([u])=>/^face-/.test(u));const pvs=await g.evaluate(async()=>{const H=[S,S.maid,S.emp].concat(rivals||[],(S.men||[]),Object.values(S.court||{}));const U=new Set();for(const o of H){try{if(o){const u=pv(o).src;if(u&&!/^data:/.test(u))U.add(u)}}catch(e){}}
   const r=await Promise.all([...U].map(u=>new Promise(res=>{const i=new Image();i.onload=()=>res([u,1]);i.onerror=()=>res([u,0]);i.src=u})));return r});
const fcs=await g.evaluate(async()=>{const H=[S,S.maid,S.emp].concat(rivals||[],(S.men||[]),Object.values(S.court||{}),typeof allServ==='function'?allServ():[]);const U=new Set();for(const o of H){if(o&&o.fc){const u=fsrc(o.fc,'');if(u&&!/^data:/.test(u))U.add(u)}}
   const r=await Promise.all([...U].map(u=>new Promise(res=>{const i=new Image();i.onload=()=>res([u,1]);i.onerror=()=>res([u,0]);i.src=u})));return {n:H.filter(o=>o&&o.fc).length,r}});
  console.log(dev,'persons with a face id',fcs.n,'distinct face urls',fcs.r.length,'loaded',fcs.r.filter(x=>x[1]).length,'failed',fcs.r.filter(x=>!x[1]).length);
  console.log(dev,'pv() person pictures',pvs.length,'loaded',pvs.filter(x=>x[1]).length,'failed',pvs.filter(x=>!x[1]).map(x=>x[0].replace(/^.*\/img\//,'')).join(','),'| faces among them',pvs.filter(x=>/\/face-/.test(x[0])).length);
  console.log(dev,'tabs',tabs.length,'face imgs',faces.length,'decoded',faces.filter(x=>x[1]).length,'| por imgs',[...seen].filter(([u])=>/^por-/.test(u)).length,'| sample',faces.slice(0,3).map(x=>x[0]).join(','));await ctx.close()}
 await b.close();s.close()});
