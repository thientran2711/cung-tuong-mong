/* D13 spread events (jspread) end-to-end, real render (no bot stubs):
   A) every test viewport: a new life plays 3 tuần (12 buổi, a stipend month start included), answering each card (first option / close);
      checks: no page error, at most BAL.spread.cap world cards per buổi unless a card was forced (waited its limit), every waiting card is
      due no later than its limit, no SP13 card lost (waiting + shown + void = moved), the modal is open whenever Q has a card.
   B) old save (made on origin/main, no jspread) loads and plays 12 buổi with no page error.
   C) a save made while data cards wait keeps them: reload the page, load the slot, the same cards wait and are shown later.
   usage: node dev/test/spread-e2e.js <baseURL> <newPath> <oldPath>     e.g. http://127.0.0.1:PORT dev/index.html .m/old/dev/index.html */
const {chromium}=require('playwright');const [,,BASE,NEW,OLD]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[755,1000,2],[1000,755,2],[1180,820,2],[1366,1024,2],[844,390,2],[390,844,3]];
const PLAY=`(async function(n){const shownK={},bad=[];let forced0=SP13.stat.forced;const cap=BAL.spread.cap;
 const ans=()=>{for(let k=0;k<40&&Q.length;k++){if(document.getElementById('modal').hidden)bad.push('modal hidden with '+Q.length+' cards');const m=Q[0];
   if(!m.__e2e){m.__e2e=1;if(m.__sp13){const k=SP13.now();shownK[k]=(shownK[k]||0)+1}}if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(i<0?0:i)}else closeModal()}
  try{const ov=document.getElementById('ov');if(ov&&!ov.hidden){const k=document.querySelector('#kg82skip')||document.querySelector('#mgskip')||document.querySelector('#mgok');if(k)k.click()}}catch(e){}};
 for(let i=0;i<n&&!S.dead;i++){ans();used=4;nextBuoi();await new Promise(r=>setTimeout(r,30));
  const k=SP13.now();if((shownK[k]||0)>cap&&SP13.stat.forced===forced0)bad.push('buoi '+k+' shown '+shownK[k]);forced0=SP13.stat.forced;
  for(const x of SP13.L){const lim=x.code?BAL.spread.codeWait:BAL.spread.maxWait;if(x.due-x.b0>lim)bad.push('due too far '+(x.m.t||''))}}
 ans();return{bad:bad.slice(0,5),stat:Object.assign({},SP13.stat),wait:SP13.L.length,turn:S.turn+'/'+S.tuan+'/'+S.buoi,dead:!!S.dead}})`;
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();return S.name})()`;
(async()=>{const b=await chromium.launch();const out={};let fail=0;
 const page=async(vp,init)=>{const c=await b.newContext({serviceWorkers:'block',viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2]});if(init)await c.addInitScript(init[0],init[1]);
  const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());return{c,p,pe}};
 /* A */
 for(const vp of VP){const {c,p,pe}=await page(vp);await p.goto(BASE+'/'+NEW);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);
  const r=await p.evaluate(PLAY+'(12)');const ow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);r.hOverflow=ow;r.pageErrors=pe.slice(0,3);out['A '+vp.join('x')]=r;if(r.bad.length||pe.length)fail++;await c.close()}
 /* B */
 {const {c,p,pe}=await page([755,1000,2]);await p.goto(BASE+'/'+OLD);await sleep(2500);
  const save=await p.evaluate(async(NL)=>{localStorage.clear();eval(NL);for(let i=0;i<8;i++){for(let k=0;k<30&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}used=4;nextBuoi()}
   for(let k=0;k<30&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}save();const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return{o,had:typeof SP13!=='undefined'}},NEWLIFE);
  await c.close();out.B_old={hadSpread:save.had,errs:pe.slice(0,3)};
  for(const vp of [[755,1000,2],[1180,820,2]]){const x=await page(vp,[o=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])}},save.o]);
   await x.p.goto(BASE+'/'+NEW);await sleep(2500);
   const r=await x.p.evaluate(async(PL)=>{const d=loadSlot(3);if(!d)return{loaded:false};SLOT=3;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();await new Promise(r=>setTimeout(r,300));
    const t0=S.turn+'/'+S.tuan+'/'+S.buoi;const r=await eval(PL)(12);r.t0=t0;r.loaded=true;return r},PLAY);r.pageErrors=x.pe.slice(0,3);out['B load '+vp.join('x')]=r;if(!r.loaded||r.bad.length||x.pe.length)fail++;await x.c.close()}}
 /* C */
 {const {c,p,pe}=await page([755,1000,2]);await p.goto(BASE+'/'+NEW);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);
  const s=await p.evaluate(async()=>{/* play until a data card waits while no code card waits (a save is possible), then save */
   for(let i=0;i<120&&!S.dead;i++){for(let k=0;k<40&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length){const j=m.opts.findIndex(o=>!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(j<0?0:j)}else closeModal()}
    if(SP13.L.length&&!SP13.L.some(x=>x.code)&&!Q.length)break;used=4;nextBuoi()}
   const w=SP13.L.map(x=>String(x.m.t||'')+'@'+x.due);save();const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return{o,w,now:SP13.now(),dbg:{quiet,dead:!!S.dead,held:SP13.held,jq:typeof JQ!=='undefined'?JQ.held:null,Q:Q.length,codeW:SP13.L.filter(x=>x.code).length,keys:Object.keys(o)}}});console.log('C save',JSON.stringify(s.dbg),s.w);
  await c.close();
  const x=await page([755,1000,2],[o=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])}},s.o]);await x.p.goto(BASE+'/'+NEW);await sleep(2500);
  const r=await x.p.evaluate(async(PL)=>{const d=loadSlot(3);SLOT=3;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();
   const w=SP13.L.map(x=>String(x.m.t||'')+'@'+x.due);const titles=SP13.L.map(x=>x.m);const seen=new Set();const sm=showModal;showModal=function(){const q=Q[0];if(q)seen.add(q);return sm.apply(this,arguments)};
   const r=await eval(PL)(8);return{w,shownLater:titles.filter(m=>seen.has(m)).length,of:titles.length,r}},PLAY);
  out.C={before:s.w,afterLoad:r.w,shownLater:r.shownLater+'/'+r.of,bad:r.r.bad,pageErrors:x.pe.slice(0,3).concat(pe.slice(0,2))};
  if(JSON.stringify(s.w)!==JSON.stringify(r.w)||!s.w.length||r.shownLater!==r.of||x.pe.length)fail++;await x.c.close()}
 console.log(JSON.stringify(out,null,1));console.log(fail?'FAIL '+fail:'PASS');await b.close()})().catch(e=>{console.error(e);process.exit(1)});
