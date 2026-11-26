/* ORDER THIN P3 review shots: 3 composed việc nhờ offers (q72Test('c:<id>',1)) on Fold 755x1000@2 and iPad 1180x820@2 + the Nhờ tab with the first one
   accepted at its pick step. node dev/test/j72c-shots.js <outdir> [id,id,id]  (after dev/site/build_site.sh; shots never go to git) */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');
const OUT=process.argv[2]||'/tmp/j72c-shots';const IDS=(process.argv[3]||'j72c-court-005,j72c-craft-042,j72c-fam-001').split(',');fs.mkdirSync(OUT,{recursive:true});
//const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{const b=await chromium.launch();
 for(const [name,w,h] of [['fold',755,1000],['ipad',1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.route(u=>/^https?:/.test(u.href)&&!/cdn|r2.dev|workers.dev|pages.dev/.test(u.host),r=>r.abort());await p.goto('file://'+path.join(ROOT,'dev/index.html'));await p.waitForTimeout(2500);
  await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;
   try{$("modal").hidden=true}catch(e){}document.querySelectorAll("[class^=km],[id^=kr],.kchest,#kchest").forEach(e=>{if(getComputedStyle(e).position==="fixed")e.remove()});S.rank=Math.max(S.rank,3);S.sung=Math.max(S.sung,60);render()});
  await p.waitForTimeout(600);
  for(const id of IDS){const ok=await p.evaluate(id=>{const T=T72I['c:'+id];if(!T)return 'no T';const f0=j72cFit,n0=j72cNeed,p0=q72PlOk;j72cFit=()=>true;j72cNeed=()=>true;q72PlOk=()=>true;
    let r=false;try{const q=q72();q.cd={};q.a=[];r=q72Test('c:'+id,1)}finally{j72cFit=f0;j72cNeed=n0;q72PlOk=p0}return r},id);
   await p.waitForTimeout(900);await p.screenshot({path:path.join(OUT,`${name}-${id}-offer.png`)});console.log(name,id,'offer',ok);
   if(id===IDS[0]){await p.evaluate(()=>{const it=Q[0];if(it&&it.opts)chooseM(0)});await p.waitForTimeout(500);
    await p.evaluate(()=>{const q=q72();const x=q.a[q.a.length-1];if(x){const X=q72X(x);const i=X.T.s.findIndex(s=>s.ch);if(i>=0)x.st=i}try{$("modal").hidden=true}catch(e){}Q.length=0;tab="q72";render()});
    await p.waitForTimeout(900);await p.screenshot({path:path.join(OUT,`${name}-${id}-tab.png`)});console.log(name,id,'tab')}
   else{await p.evaluate(()=>{try{$("modal").hidden=true}catch(e){}Q.length=0;render()});await p.waitForTimeout(400)}}
  console.log(name,'page errors',errs.length,errs[0]||'');await p.close()}
 await b.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
