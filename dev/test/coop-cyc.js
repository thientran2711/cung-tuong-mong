/* review/coop-b1b5-fix: main jcycle (Kỳ nguyệt sự) × co-op B2 — the GUEST answers her maid's cycle card; the HOST draws the one night.
   For each answer (Báo đúng / Báo lùi / Báo sớm / Giấu): the host's week draw waits for her answer, her card is on / off the HOST's tray
   as her answer says (forced deck: only her card can win, unless the cycle takes it off), both screens agree (tn, tonight, cyTray),
   her cost lands once on her side; báo lùi halves her NEXT flip on the host; giấu shows "không báo" in the host's book; then an OLD guest
   (origin/main build, never relays) in her cycle tuần: the week still merges. usage: build .tmp/old.html (origin/main) first;
   python3 dev/build/assemble.py && node dev/test/coop-cyc.js [outdir] [workerURL]. A = host 755x1000@2, B = guest 1180x820@2. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const BASE='http://ctm.local/';let HTML=path.join(ROOT,'.tmp/old.html');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.css':'text/css','.webmanifest':'application/manifest+json','.svg':'image/svg+xml'};
async function serve(ctx){ctx.__html=ctx.__html||path.join(ROOT,'dev/index.html');await ctx.route(BASE+'**',async route=>{const u=new URL(route.request().url());let p=decodeURIComponent(u.pathname);
 if(p==='/'||p==='/index.html'){const body='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></head><body>'+fs.readFileSync(ctx.__html,'utf8')+'</body></html>';return route.fulfill({status:200,contentType:MIME['.html'],body})}
 const f=path.join(ROOT,p);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return route.fulfill({status:404,body:'nf'});route.fulfill({status:200,contentType:MIME[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})})}
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-cyc'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]');if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,2]);
 if(process.env.CYC_HTML){A.ctx.__html=B.ctx.__html=path.resolve(process.env.CYC_HTML)}/* the BEFORE run: an older build for both seats */
 const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
 async function bothIn(lbl){const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}ok(await inGame(A)&&await inGame(B),lbl)}
 const isCy=o=>o.p.evaluate(()=>{const m=document.getElementById('modal');return !!(m&&!m.hidden&&/báo thế nào/.test(m.textContent))});
 /* close everything on B except her maid's cycle card (the test answers that one itself) */
 const clearB=async()=>{for(let i=0;i<25;i++){if(await isCy(B))return 'cy';const s=await clear(B,1);if(s!=='x'&&s!=='many'&&s!=='mg')return s}};
 const wkA=()=>A.p.evaluate(()=>COOP.state.week||0),wkB=()=>B.p.evaluate(()=>COOP.state.week||0);
 async function merge(w0,lbl,keepB){for(let i=0;i<60;i++){await clear(A);if(!(keepB&&await wkB()>w0))await clear(B);await press1(A);await press1(B);await sleep(800);if(await wkA()>w0&&await wkB()>w0)break}
  /* keep the guest's dialogs (her "Kính sự phòng báo tin" card): clear() takes its first road, which may decline the night */
  for(let i=0;i<4;i++){await clear(A);if(!keepB)await clear(B);await sleep(300)}ok(await wkA()>w0&&await wkB()>w0,lbl)}
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await join(B,code);ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 await bothIn('both in the game');
 for(const o of [A,B])await setTm(o,{buoiMs:600000});
 for(const [o,rk] of [[A,5],[B,3]])await o.p.evaluate(rk=>{if(S.srv)S.srv.risen=1;S.rank=rk;S.bac=Math.max(S.bac||0,400);S.duc=Math.max(S.duc||0,60);render()},rk);
 if(!(await until(A,()=>!!COOPW.friend(),null,20000)))await merge(await wkA(),'setup: one week (a life that starts as a cung nữ / at home: her consort entry comes with the merged week)');
 {const fa=await until(A,()=>!!COOPW.friend(),null,60000),fb=await until(B,()=>!!COOPW.friend(),null,60000);console.log('guest sees the host entry:',fb);ok(fa,'the host has the guest as a consort entry (her card in the host deck)',[fa,fb,await A.p.evaluate(()=>[S.rank,!!S.srv,S.place]),await B.p.evaluate(()=>[S.rank,!!S.srv,S.place,typeof COOPW.friend])])}
 /* host: forced deck — only the friend's card can win; the REAL nightCh chain (with jcycle's tray rule) still decides whether it is on the tray */
 await A.p.evaluate(()=>{if(window.__ff)return;window.__ff=1;const f=flip;flip=function(){const r0=roll,n0=nightCh;roll=x=>x>=60;
  nightCh=function(p){const c=n0.apply(this,arguments);return p&&p.coop?(c>0?100:0):0};try{return f.apply(this,arguments)}finally{roll=r0;nightCh=n0}}});
 const R=await A.p.evaluate(()=>BAL.cyc.rep);
 const CASES=[['dung',/^Báo đúng/,false,0],['lui',/^Báo lùi/,false,-R.luiDuc],['som',/^Báo sớm/,true,-R.somDuc],['giau',/^Giấu/,true,0]];
 const before=[];
 for(const [k,re,on,dDuc] of CASES.filter(c=>!process.env.CYC_ONLY||process.env.CYC_ONLY.split(',').includes(c[0]))){
  /* her cycle tuần = the tuần the next week opens: a name whose cyBase t matches (cycle = pure function of the name); a maid; not pregnant */
  const nb=await B.p.evaluate(()=>{if(!S.maid)S.maid=(S.staff||[])[0]||{name:'Thử',loyal:60};S.preg=0;S.hidden=false;S.fake=0;S.cyb={};S.sung=Math.max(S.sung||0,40);S.age=Math.min(S.age||18,30);
   const want=((S.tuan||0)+1)%3,base=window.__nm0||(window.__nm0=S.name);for(let i=0;i<400;i++){S.name=base+(i?' '+i:'');if(cyBase(S).t===want)break}render();return{name:S.name,want,t:cyBase(S).t,age:S.age}});
  await A.p.evaluate(n=>{const f=COOPW.friend();if(f){f.name=n.name;f.age=n.age;f.preg=0;f.fake=0}},nb);
  const w0=await wkA();let held=null,asked=false;
  for(let i=0;i<60&&!(asked&&held);i++){await clear(A);if((await clearB())==='cy')asked=true;await press1(A);if(!asked)await press1(B);await sleep(700);
   if(asked&&!held)held=await A.p.evaluate(()=>COOPW.pend&&COOPW.cyHold!=null&&COOPW.sent!==(COOP.state.week||0)?{hold:COOPW.cyHold}:null)}
  ok(asked,`${k}: B (guest) gets her maid's Kỳ nguyệt sự card`,nb);
  ok(!!held,`${k}: the host's week draw waits for her answer (no draw, no week end sent)`,held);
  if(!before.length){await shot(B,'cyc-guest-card-1180x820');await shot(A,'cyc-host-wait-755x1000')}
  const d0=await B.p.evaluate(()=>({duc:S.duc,ghen:liveRivals(true).filter(v=>!v.coop).reduce((a,v)=>a+(v.ghen||0),0)}));
  if(!before.length)console.log('card buttons:',await B.p.evaluate(()=>[...document.querySelectorAll('#modal button')].filter(x=>x.offsetParent!==null).map(x=>(x.className||'-')+'|'+x.textContent.trim().replace(/\s+/g,' ').slice(0,50)).join(' || ')));
  if(k==='lui')await B.p.evaluate(()=>{window.__r0=Math.random;Math.random=()=>0});/* c6 odds roll: success */
  /* tap her option (kit option card), then whatever confirm the kit card asks */
  const tapped=await B.p.evaluate(src=>{const R=new RegExp(src);const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent!==null&&R.test(b.textContent.trim()));if(x){x.click();return true}return false},re.source);
  for(let i=0;i<8&&!(await B.p.evaluate(()=>S.cyb&&S.cyb.rk===wk()));i++){await sleep(400);
   const bs=await B.p.evaluate(()=>[...document.querySelectorAll('#modal button')].filter(x=>x.offsetParent!==null&&!x.disabled).map(x=>x.textContent.trim().replace(/\s+/g,' ').slice(0,40)));if(!before.length)console.log('after tap:',JSON.stringify(bs));
   await B.p.evaluate(src=>{const R=new RegExp(src);const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(x)x.click()},'^(Chọn|Đồng ý|Quyết|Làm|Thử|Xác nhận)'+'|'+re.source)}
  if(k==='lui')await B.p.evaluate(()=>{Math.random=window.__r0});
  const d1=await B.p.evaluate(()=>({duc:S.duc,rk:S.cyb.rk===wk(),rv:S.cyb.rv,lie:S.cyb.lie===wk(),back:S.cyb.back,w:wk(),ghen:liveRivals(true).filter(v=>!v.coop).reduce((a,v)=>a+(v.ghen||0),0)}));
  ok(tapped&&d1.rk&&d1.rv===k,`${k}: B answered "${k}"`,d1);
  ok(d1.duc-d0.duc===dDuc,`${k}: her cost lands once on her side (Đức ${dDuc})`,[d0.duc,d1.duc]);
  if(k==='giau')ok(d1.ghen>d0.ghen,'giau: the palace grows jealous (ghen up, on her side)',[d0.ghen,d1.ghen]);
  ok(await until(A,w=>{const r=COOPW.fcy;return r&&r.w===w&&!r.pend},d1.w,15000),`${k}: her answer reached the host before the host's draw`);
  await merge(w0,`${k}: the week merges`,true);
  for(let i=0;i<10&&!(await A.p.evaluate(()=>!!(S.tn&&S.tn.w===COOP.state.week))&&await B.p.evaluate(()=>!!(S.tn&&S.tn.w===COOP.state.week)));i++)await sleep(500);
  const a=await A.p.evaluate(()=>{const f=COOPW.friend();return{w:COOP.state.week,tn:S.tn,t:S.tonight==='me'?'me':S.tonight&&S.tonight.id,off:f?cyTray(f):null,on:f?cycOn(f):null,duc:f&&f.duc,hold:COOPW.cyHold}});
  const c=await B.p.evaluate(()=>({w:COOP.state.week,tn:S.tn,t:S.tonight==='me'?'me':S.tonight&&S.tonight.id,off:cyTray(S),on:cycOn(S),duc:S.duc}));
  console.log(k,'host',JSON.stringify(a),'guest',JSON.stringify(c));
  ok(a.on&&c.on,`${k}: the merged week is her cycle tuần on both`,[a.on,c.on]);
  ok(a.off===!on&&c.off===!on,`${k}: her card is ${on?'ON':'OFF'} the tray on BOTH screens (host deck = her answer)`,[a.off,c.off]);
  ok(a.tn&&a.tn.w===a.w&&(on?a.tn.who===902:a.tn.who!==902),`${k}: host drew ${on?'her':'not her'} (forced deck)`,a.tn);
  ok(c.tn&&c.tn.w===c.w&&c.tn.who===a.tn.who&&(on?c.t==='me':c.t!=='me'),`${k}: the guest has the same night (one fact)`,[c.tn,c.t]);
  ok(a.hold==null,`${k}: no hold left on the host`);
  ok(a.duc===c.duc,`${k}: her Đức on the host's entry == her own (cost once)`,[a.duc,c.duc]);
  if(k==='giau'){const t=await A.p.evaluate(n=>{cyBook('thử');const m=document.getElementById('modal');const s=m?m.textContent:'';return s.slice(Math.max(0,s.indexOf(n)),s.indexOf(n)+90)},nb.name);
   ok(/không báo/.test(t),'giau: the HOST\'s book shows her "không báo" (one fact)',t);await shot(A,'cyc-host-book-755x1000');await clear(A)}
  if(k==='dung'){const t=await A.p.evaluate(n=>{cyBook('thử');const m=document.getElementById('modal');const s=m?m.textContent:'';return s.slice(Math.max(0,s.indexOf(n)),s.indexOf(n)+90)},nb.name);
   ok(/đã báo/.test(t),'dung: the host\'s book shows her report',t);await clear(A)}
  if(k==='lui'){ok(d1.back===d1.w&&await A.p.evaluate(b=>typeof COOPW.fcyb==='function'&&COOPW.fcyb().back===b,d1.back),'lui: the host holds her báo lùi week',d1.back);
   const w1=await wkA();await merge(w1,'lui: the next week merges');
   const h=await A.p.evaluate(()=>{const f=COOPW.friend(),k=typeof COOPW.fcyb==='function'?COOPW.fcyb():(S.cyb||{});const a=nightCh(f);const b0=k.back;k.back=null;const b=nightCh(f);k.back=b0;return{a,b,d:wk()-b0}});
   ok(h.d===1&&h.b>0&&Math.abs(h.a-h.b*R.luiNext)<1e-9,'lui: the host halves her NEXT flip (nightCh × luiNext)',h)}
  before.push(k)}
 await shot(A,'cyc-host-755x1000');await shot(B,'cyc-guest-1180x820');
 ok(!A.errs.length,'host: no page errors',A.errs.slice(0,5));ok(!B.errs.length,'guest: no page errors',B.errs.slice(0,5));
 /* OLD guest (origin/main build: never relays her answer) in her cycle tuần: the host waits for her week end, then the week merges */
 if(fs.existsSync(HTML)){B.ctx.__html=HTML;B.errs.length=0;
  await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục|^Trở lại phòng/,4000);
  ok(await until(B,()=>typeof COOPW==='object'&&COOPW.on&&COOP.seat==='b',null,60000),'OLD B rejoined');await bothIn('both in the game (B old)');
  const nb=await B.p.evaluate(()=>{if(!S.maid)S.maid=(S.staff||[])[0]||{name:'Thử',loyal:60};S.preg=0;S.hidden=false;S.cyb={};S.age=Math.min(S.age||18,30);
   const want=((S.tuan||0)+1)%3,base=S.name;for(let i=0;i<400;i++){S.name=base.replace(/ \d+$/,'')+(i?' '+i:'');if(typeof cyBase!=='function'||cyBase(S).t===want)break}render();return{name:S.name,age:S.age}});
  await A.p.evaluate(n=>{const f=COOPW.friend();if(f){f.name=n.name;f.age=n.age;f.preg=0}},nb);
  const w0=await wkA();await merge(w0,'mixed (old guest in her cycle tuần): the week still merges, the host does not wait for ever');
  {const tr=await A.p.evaluate(()=>COOPW.tr.filter(x=>/^cy(Hold|Free)/.test(x)).slice(-4));ok(tr.some(x=>/^cyHold/.test(x))&&/^cyFree/.test(tr[tr.length-1]||''),'mixed: the host waited for the old guest (no relay) and was freed by her week end',tr)}
  ok(await A.p.evaluate(()=>COOPW.cyHold==null),'mixed: no hold left on the host');
  ok(!A.errs.length,'host (mixed): no page errors',A.errs.slice(0,5));ok(!B.errs.length,'old guest: no page errors',B.errs.slice(0,5))}
 else console.log('skip mixed: no',HTML);
 await b.close();const f=res.filter(x=>!x[0]).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
