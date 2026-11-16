/* review/fest-fx: festival night FX (jfx FESTFX) — festival x buổi x scene matrix, old-save migration, 4-buổi leftovers (jmen, jstory), shots.
   usage: node dev/test/fest-fx.js <dir with index.html> <outdir> [shots]   (serves the dir itself on :8977) */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');
const [,,DIR,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const srv=http.createServer((q,r)=>{const f=path.join(DIR,q.url==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':/\.json$/.test(f)?'application/json':/\.js$/.test(f)?'text/javascript; charset=utf-8':'text/html; charset=utf-8'});r.end(d)})}).listen(8977);
const sleep=t=>new Promise(r=>setTimeout(r,t));let fails=0;const ck=(n,ok,x)=>{console.log((ok?'PASS ':'FAIL ')+n+(x?' '+x:''));if(!ok)fails++};
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<200;i++){start();if(!isSrv()&&!(window.isKc&&isKc()))break}Q.length=0;document.getElementById('modal').hidden=true;
 ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
const clr=p=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','dawn','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove())});
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,hasTouch:true,isMobile:true});const p=await c.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
 await p.goto('http://localhost:8977/',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await sleep(2500);
 await p.evaluate(NEWLIFE);await sleep(400);await clr(p);
 /* 1. matrix: every festival x buổi 0..3 x scene -> expected kind or null */
 const M=await p.evaluate(()=>{const out=[];const keep={m:S.month,t:S.tuan,b:S.buoi,pl:S.place,tab:tab};
  for(const k in FEST){const f=FEST[k];S.month=f.m;S.tuan=f.t[0];for(let bu=0;bu<4;bu++)for(const [pl,tb] of [["home","ac"],["vuon","ac"],["thu","ac"],["tn","ac"],["home","go"],["lc","ac"]]){S.buoi=bu;S.place=pl;tab=tb;out.push({k,bu,pl,tb,got:kfFestKind()})}}
  S.month=keep.m;S.tuan=keep.t;S.buoi=keep.b;S.place=keep.pl;tab=keep.tab;return {out,keys:Object.keys(FEST),T:FESTFX}});
 let bad=0,fire=0;const exp=(r,T)=>{const want=T[r.k];const sky=(r.pl==="vuon")||r.tb==="go";return (want&&r.bu===3&&sky)?want:null};
 for(const r of M.out){const e=exp(r,M.T);if(r.got!==e){bad++;console.log('  mismatch',JSON.stringify(r),'want',e)}if(r.got)fire++}
 ck('matrix '+M.out.length+' cells ('+M.keys.length+' festivals x 4 buổi x 6 scenes), fires in '+fire,bad===0&&fire>0,'bad='+bad);
 ck('thanhminh never fires',!M.out.some(r=>r.k==='thanhminh'&&r.got));ck('no fire on any buổi but tối',!M.out.some(r=>r.got&&r.bu!==3));ck('no fire in room/halls',!M.out.some(r=>r.got&&r.tb==='ac'&&r.pl!=='vuon'));
 ck('table keys all exist in FEST',Object.keys(M.T).every(k=>M.keys.includes(k)));
 /* 2. end to end: render() really calls kitFx (KFX.log) */
 const E2E=async(m,t,bu,pl,tb)=>{await p.evaluate(([m,t,bu,pl,tb])=>{KFX.log.length=0;KFX.festK="";S.month=m;S.tuan=t;S.buoi=bu;S.place=pl;tab=tb;if(pl==="home")S.visit={k:"home",people:homePeople(),talked:false};else S.visit=null;Q.length=0;render()},[m,t,bu,pl,tb]);await sleep(1500);return p.evaluate(()=>KFX.log.filter(k=>k==="festival"||k==="lantern"))};
 const A=await E2E(3,0,2,'home','ac');ck('thanh minh chiều, room: no FX',A.length===0,JSON.stringify(A));
 const A2=await E2E(1,1,2,'home','ac');ck('nguyên tiêu chiều, room: no FX',A2.length===0);
 const A3=await E2E(1,0,3,'home','ac');ck('tết tối, room: no FX',A3.length===0);
 const A4=await E2E(1,1,3,'vuon','ac');ck('nguyên tiêu tối, garden: lanterns',A4.join()==='lantern',JSON.stringify(A4));
 const A5=await E2E(1,0,3,'vuon','ac');ck('tết tối, garden: festival (lanterns+fireworks)',A5.join()==='festival',JSON.stringify(A5));
 const A6=await E2E(12,2,3,'vuon','ac');ck('giao thừa tối, garden: festival',A6.join()==='festival');
 const A7=await E2E(3,0,3,'vuon','ac');ck('thanh minh tối, garden: no FX',A7.length===0);
 /* shots */
 const shot=async(n)=>{if(SHOTS)await p.screenshot({path:OUT+'/'+n+'.jpg',type:'jpeg',quality:62})};
 /* 3. 4-buổi leftovers */
 const L=await p.evaluate(()=>{const r={};
  /* jstory clock: strictly increasing over a week of buổi, and a 4-buổi day = 1 day */
  const keep=[S.turn,S.tuan,S.buoi];let prev=-1,mono=true;for(let t=0;t<3;t++)for(let bu=0;bu<4;bu++){S.tuan=t;S.buoi=bu;const v=absB67();if(v<=prev)mono=false;prev=v}S.turn=keep[0];S.tuan=keep[1];S.buoi=keep[2];r.mono=mono;
  r.dl=[dlT67(4),dlT67(8),dlT67(9),dlT67(21),dlT67(3)];
  /* guard roster: tối uses the old tối shift, trưa the sáng shift */
  const m={rw:"thị vệ"};menGuards=()=>[m];let same=true;for(let w=0;w<9;w++){const o=(w*3+2+0)%3===0?null:["thu","dtd","ksp"][w%3];if(menDuty(m,w,3)!==o)same=false;if(menDuty(m,w,1)!==menDuty(m,w,0))same=false}r.roster=same;
  r.B4L=B4L;return r});
 ck('jstory absB67 strictly increasing across buổi (was wk*3+b)',L.mono);ck('jstory dlT67 in 4-buổi days',JSON.stringify(L.dl)==='["1 ngày","2 ngày","2 ngày","5 ngày","3 buổi"]',JSON.stringify(L.dl));
 ck('guard roster: tối = old tối shift, trưa = sáng shift',L.roster);
 /* 4. old save (3 buổi, no b4) */
 const O=await p.evaluate(()=>{const d=JSON.parse(JSON.stringify(ser()));delete d.b4;d.S.buoi=2;d.S.menPlans=[{b:2,r:"tryst",w:5},{b:1,r:"x",w:5},{b:0,r:"y",w:5}];d.S.pl67={due:7,t0:3,a:"a"};deser(d);
  return {b:S.buoi,pl:S.menPlans.map(x=>x.b),due:S.pl67.due,t0:S.pl67.t0}});
 ck('old save: buổi 2->3, plans [2,1,0]->[3,2,0], pledge clock re-counted',O.b===3&&O.pl.join()==='3,2,0'&&O.due===10&&O.t0===4,JSON.stringify(O));
 await sleep(300);await p.evaluate(NEWLIFE);await clr(p);
 ck('0 page errors',errs.length===0,errs.slice(0,3).join(' | '));
 /* 5. shots at Fold + iPad */
 if(SHOTS)for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){await p.setViewportSize({width:W,height:H});
  await E2E(1,1,2,'home','ac');await sleep(1200);await shot(`room-nguyentieu-chieu-${tag}`);
  await E2E(1,1,3,'vuon','ac');await sleep(2500);await shot(`garden-nguyentieu-toi-${tag}`);
  await E2E(1,0,3,'vuon','ac');await sleep(2500);await shot(`garden-tet-toi-${tag}`);
  await E2E(3,0,2,'home','ac');await sleep(1500);await shot(`room-thanhminh-chieu-${tag}`)}
 console.log(fails?'FAILED '+fails:'ALL PASS');await b.close();srv.close();process.exit(fails?1:0)})();
