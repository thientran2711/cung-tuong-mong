/* face-w404 scan (review/face-w404): every image request + failure of a played start at Fold 755x1000@2 and iPad 1180x820@2:
   title -> new life -> every tab twice (palace, people, cards) -> person cards opened. Prints a before/after row per token kind.
   usage: node dev/test/face-w404-scan.js <built site root> [--out file.json]   (pictures come from the CDN: HTTPS_PROXY is used when set) */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const A=process.argv.slice(2);const ROOT=path.resolve(A[0]||'.');const OUT=A.includes('--out')?A[A.indexOf('--out')+1]:null;const sl=t=>new Promise(r=>setTimeout(r,t));
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.css':'text/css'};
const srv=()=>new Promise(res=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT+path.sep)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',TYPES[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
 s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/',close:()=>s.close()}))});
const kind=u=>{const m=/\/img\/([^?#]*)/.exec(u);const f=m?decodeURIComponent(m[1]):u;return /^@W/.test(f)?'@W<n> token':f.replace(/\d+/g,'N').replace(/\.webp.*$/,'')};
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){if(i)try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}
 ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});return S.name};
const SETTLE=()=>{try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){try{Q.shift()}catch(x){}}
 const n=document.getElementById('next');return !!n&&!n.disabled&&!Q.length&&!S.dead};
(async()=>{const s=await srv();const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'localhost,127.0.0.1'}}:{});const R={};
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});const p=await ctx.newPage();const reqs=[],errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('response',r=>{const u=r.url();if(/\.(webp|png|jpg)(\?|$)/.test(u)||/\/img\//.test(u))reqs.push([u,r.status()])});
  p.on('requestfailed',r=>{const u=r.url();if(/\/img\//.test(u))reqs.push([u,-1])});
  const g=await D.openHost(p,s.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await sl(2500);
  await g.evaluate(NEWLIFE);await g.waitForFunction(SETTLE,null,{polling:150,timeout:60000});await sl(1500);
  const tabs=await g.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(x=>x.getClientRects().length).map(x=>x.dataset.tab));
  for(let r=0;r<2;r++)for(const t of tabs){await g.evaluate(t=>{const e=document.querySelector('#tabs [data-tab="'+t+'"]');if(e)e.click()},t);await sl(500);
   await g.evaluate(()=>{for(const e of [...document.querySelectorAll('[data-w],.pcard,.srow2,.rrow2,.md')].slice(0,6)){try{e.click()}catch(x){}try{if(Q.length)closeModal()}catch(x){}}});await sl(300)}
  await g.evaluate(()=>{try{for(const v of (rivals||[]).slice(0,6)){const x=pv(v);const i=new Image();i.src=x.src}}catch(e){}});await sl(1500);
  const pool=await g.evaluate(()=>{const o={};try{for(const k of Object.keys(FPOOL))o[k]=(FPOOL[k]||[]).length}catch(e){}return o});
  const by={};for(const [u,st] of reqs){const k=kind(u);const r=by[k]=by[k]||{n:0,bad:0};r.n++;if(st===404)r.bad++;else if(st>=400||st<0)r.other=(r.other||0)+1}
  const bad=reqs.filter(([u,st])=>st===404);const other=reqs.filter(([u,st])=>st!==404&&(st>=400||st<0));R[dev]={tabs,requests:reqs.length,bad404:bad.length,failedOther:other.length,otherSample:other.slice(0,6),pageErrors:errs.slice(0,5),badSample:bad.slice(0,4),byKind:by,pool};
  console.log(dev,'requests',reqs.length,'404',bad.length,'failed/other',other.length,'errors',errs.length);await ctx.close()}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(R,null,1));await b.close();s.close()})().catch(e=>{console.error(e);process.exit(1)});
