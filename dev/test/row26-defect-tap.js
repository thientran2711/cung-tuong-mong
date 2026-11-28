/* row26-defect-tap (reviewer row26-talk-r2): real taps through the «xin theo ngươi» card (both buttons), Fold 755x1000 + iPad 1180x820, on a mid-life save (y05 fixture).
   usage: node dev/test/row26-defect-tap.js [index.html] [outdir] [save.json]   (save default: y05 fixture of the handover branch:
   git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/fixtures/save-growth/y05-ncBtuc-035.json > .tmp/y05.json) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const RT=require('./realtap.js');const ROOT=path.resolve(__dirname,'../..');const GAME=path.resolve(process.argv[2]||path.join(ROOT,'index.html'));const OUT=process.argv[3]||path.join(ROOT,'.tmp/row26-tap');fs.mkdirSync(OUT,{recursive:true});const SAVETXT=fs.readFileSync(process.argv[4]||path.join(ROOT,'.tmp/y05.json'),'utf8');
function serve(file){const root=path.dirname(file),idx=path.basename(file);const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})}).listen(0,()=>res('http://127.0.0.1:'+sv.address().port+'/'))})}
const VEILS='.kfgain,#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,.kmov,#rtoast,#kprevov';
const HOME=tx=>{try{localStorage.clear()}catch(e){}try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
 localStorage.setItem(SK(3),tx);SLOT=3;const d=loadSlot(3);try{kmReset&&kmReset()}catch(e){}quiet=true;d.tab='act';deser(d);quiet=false;
 document.getElementById('title').hidden=true;try{deal()}catch(e){}if(S.mg)S.mg=null;try{S.tutTour=1;coachOff&&coachOff()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render()};
const CLEAN=v=>{document.querySelectorAll(v).forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}};
/* one REAL svDefect reason (setup: only this maid qualifies, AP_K narrowed to svDefect), then the REAL approach chain approachOne (all wrappers incl. jtsb) */
const ARRIVE=()=>{const v=liveRivals(true).find(x=>(x.staff||[]).some(s=>s.role==='maid')&&!(typeof sameHouse==='function'&&sameHouse(S,x)));const s=v.staff.find(s=>s.role==='maid');
 s.loyal=0;s.spyFor=null;s.svtK=null;window.__s=s;window.__v=v;
 const K0=AP_K.slice();AP_K.length=0;AP_K.push('svDefect');const R=NPW.reg.svDefect,w0=R.who;R.who=()=>[s];
 const k0=(SVT.stat.touch.bribe||0);const t0=tinOf(s);let m=null,n=0;
 try{for(;n<80;n++){S.npw={};S.apLast={};m=approachOne();if(m&&/xin theo ngươi/.test(String(m.h||'')))break;m=null}}finally{R.who=w0;AP_K.length=0;K0.forEach(k=>AP_K.push(k))}
 S.bac=Math.max(S.bac||0,200);window.__b={k0,t0,a0:aff(v,S),bac:S.bac};Q.length=0;document.getElementById('modal').hidden=true;window.__e68off=true;/* TEST SETUP: the event pacing gate (j68 evGate) would drop this optional card if the save already had one this buổi */if(m)setTimeout(()=>{Q.push(m);showModal();render()},0);
 return{n,card:!!m,opts:m&&m.opts.map(o=>o.n),afterArrive:{touch:(SVT.stat.touch.bribe||0)-k0,tin:t0+'→'+tinOf(s)},s:s.name,v:v.name}};
const AFTER=()=>{const s=window.__s,v=window.__v,b=window.__b;return{touch:(SVT.stat.touch.bribe||0)-b.k0,tin:b.t0+'→'+tinOf(s),aff:Math.round(b.a0)+'→'+Math.round(aff(v,S)),bac:b.bac+'→'+S.bac,spy:s.spyFor,q:Q.length,
 modal:!document.getElementById('modal').hidden,txt:document.getElementById('modal').innerText.replace(/\s+/g,' ').slice(0,300),log:(document.getElementById('log')||{innerText:''}).innerText.replace(/\s+/g,' ').slice(0,300)}};
(async()=>{const URL=await serve(GAME);const b=await chromium.launch();let fails=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++};
 for(const [dev,w,h] of [['fold',755,1000],['ipad',1180,820]])for(const pick of ['Đuổi về','Thu làm tai mắt']){
  const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,hasTouch:true,isMobile:dev==='fold',serviceWorkers:'block'});const p=await ctx.newPage();
  await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(/warn|error/.test(m.type())&&!/Failed to load|Fetch API/.test(m.text()))console.log('  console.'+m.type(),m.text().slice(0,160))});
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:180000});await p.waitForTimeout(2500);
  await p.evaluate(HOME,SAVETXT);for(let i=0;i<5;i++){await p.waitForTimeout(700);await p.evaluate(CLEAN,VEILS)}
  const rt=RT.make(p,{dev,shots:OUT,log:x=>{if(x.k!=='tap')console.log('  realtap',JSON.stringify(x).slice(0,200))}});
  const a=await p.evaluate(ARRIVE);await p.waitForTimeout(150);console.log('  at 150ms',await p.evaluate(()=>JSON.stringify({q:Q.map(m=>m.t),modal:!document.getElementById('modal').hidden,txt:document.getElementById('modal').innerText.slice(0,80)})));await p.waitForTimeout(1650);const tag=dev+'-'+(pick==='Đuổi về'?'duoi':'thu');
  ok(a.card&&a.afterArrive.touch===0&&a.afterArrive.tin.split('→')[0]===a.afterArrive.tin.split('→')[1],`${tag}: card arrives via the real approach chain, no svTouch on arrival ${JSON.stringify(a)}`);
  console.log('  on screen:',await p.evaluate(()=>({q:Q.map(m=>m.t),modal:!document.getElementById('modal').hidden,txt:document.getElementById('modal').innerText.replace(/\s+/g,' ').slice(0,160)})).then(JSON.stringify));
  await p.screenshot({path:path.join(OUT,tag+'-1-card.png')});
  const btn=await p.evaluateHandle(n=>[...document.querySelectorAll('#modal button')].find(e=>e.textContent.includes(n)&&e.getBoundingClientRect().width>3)||null,pick);
  const t=await rt.choose(btn,{screen:'xin theo ngươi',label:pick});await p.waitForTimeout(1800);const r=await p.evaluate(AFTER);
  await p.screenshot({path:path.join(OUT,tag+'-2-after.png')});
  if(pick==='Đuổi về')ok(t&&r.touch===0&&r.spy!=='me'&&r.tin.split('→')[0]===r.tin.split('→')[1],`${tag}: «Đuổi về» → nothing ${JSON.stringify(r)}`);
  else ok(t&&r.touch===1&&r.spy==='me',`${tag}: «Thu làm tai mắt» → svTouch once, spy for her ${JSON.stringify(r)}`);
  ok(!/\d+%|ngươi tìm gặp/.test(r.txt+r.log),`${tag}: words (no %, no «ngươi tìm gặp»)`);ok(errs.length===0,`${tag}: no page errors ${errs.slice(0,2)}`);
  console.log('  stats',JSON.stringify(rt.stats()).slice(0,200));await ctx.close()}
 await b.close();console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
