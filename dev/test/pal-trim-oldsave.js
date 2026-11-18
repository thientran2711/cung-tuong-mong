/* Palace trim 13 -> 10 (map-zones r2): a save where the player and NPCs live in a DROPPED palace slot (pal >= PALN.length) loads,
   everyone is re-housed into a kept palace / side hall, one log line each, no Ban-cung ceremony for the player, no page errors.
   Also prints the capacity numbers (palaces vs chủ vị seats, side-hall seats vs harem cap). usage: node dev/test/pal-trim-oldsave.js [worktree] */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(process.argv[2]||path.join(__dirname,'../..'));
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css','.png':'image/png'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
 fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});r.end(d)})});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL0=`http://127.0.0.1:${srv.address().port}/`;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 const boot=async()=>{await p.goto(URL0,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof palFix==='function',null,{timeout:180000});await p.waitForTimeout(1500)};
 await boot();
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&rivals&&rivals.length>=3));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 const made=await p.evaluate(()=>{Q.length=0;
  const N=PALN.length;const live=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&!v.coop);
  /* free a head and a low consort, then put them + the player into the 3 dropped tail slots N, N+1, N+2 (what a 13-palace save holds) */
  const A=live.find(v=>v.rank>=3&&v.rank<=5)||live[0],B=live.find(v=>v!==A&&v.rank<3)||live.find(v=>v!==A);
  if(A.rank<3)A.rank=3;S.rank=Math.max(3,S.rank);S.pal=N;A.pal=N+1;A.resHead=null;B.pal=N+2;B.palLone=1;B.resHead=null;B.resHall=null;
  S.palCer=0;quiet=false;try{NLP=false}catch(e){}save();return{saved:!!loadSlot(3),N,A:A.id,Aname:A.name,B:B.id,Bname:B.name,Srank:S.rank}});
 await boot();
 const res=await p.evaluate(m=>{document.getElementById('title').hidden=true;const L0=[];const lg=log;log=function(t){L0.push(String(t));return lg.apply(this,arguments)};
  let err=null;try{const d=loadSlot(3);if(!d)throw new Error('no save in slot 3');SLOT=3;quiet=true;deser(d);quiet=false}catch(e){err=e.message}log=lg;Q.length=0;
  if(err)return{err};const A=rivals.find(v=>v.id===m.A),B=rivals.find(v=>v.id===m.B);
  const bad=[S].concat(rivals).filter(x=>x.pal!=null&&!(x.pal>=0&&x.pal<PALN.length)).length;
  const heads=[S].concat(rivals).filter(x=>palHeadOK(x));const seat=BAL.seat;
  const cap={palaces:PALN.length,chuViSeats:(seat[6]||0)+(seat[5]||0)+(seat[4]||0)+(seat[3]||0),hosts:(seat[5]||0)+(seat[4]||0)+(seat[3]||0),
   sideSeats:((seat[5]||0)+(seat[4]||0)+(seat[3]||0))*resCap(),haremCap:BAL.harem.cap,headsNow:heads.length,palacesHeld:heads.filter(x=>x.pal!=null).length};
  cap.haremFits=1+(seat[6]||0)+cap.hosts+cap.sideSeats; /* HH + HQP + hosts + their side-hall seats */
  const hasHall=typeof HALL_PN!=='undefined'&&PALN.every(n=>HALL_PN[n]);
  return{err,bad,PALN:PALN.slice(),S:{pal:S.pal,name:S.pal!=null?PALN[S.pal]:null,palCer:S.palCer},A:{pal:A&&A.pal,house:A&&houseName(A)},B:{pal:B&&B.pal,lone:B&&B.palLone,house:B&&houseName(B)},
   logs:L0.filter(t=>/đóng cửa/.test(t)),cap,hasHall}},made);
 const ok=!res.err&&res.PALN&&res.bad===0&&res.S.pal!=null&&res.S.pal<res.PALN.length&&!res.S.palCer&&res.A.pal!=null&&res.A.pal<res.PALN.length&&res.logs.length===3&&res.hasHall&&!errs.length&&res.cap.palaces>=res.cap.chuViSeats&&res.cap.haremFits>=res.cap.haremCap;
 console.log(JSON.stringify({made,res,errs},null,1));console.log(ok?'PAL-TRIM-OLDSAVE PASS':'PAL-TRIM-OLDSAVE FAIL');
 await b.close();srv.close();process.exit(ok?0:1)})();
