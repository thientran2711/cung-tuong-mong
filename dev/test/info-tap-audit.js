/* review/tainghe-info — WHOLE-GAME info-tap audit (owner OD 25/11 ~23:48Z family: «Bấm … không ra thông tin gì hết», «không biết bấm vô cái gì
   mở ra cái khung này», «NĂM BẬC» rows drawn over each other). REAL taps (dev/test/realtap.js), Fold 755x1000 + iPad 1180x820.
   For every bottom tab (#tabs button) and every sub-tab of its panel (.pctabs [data-ktsv] / .pct): 
     INFO  every visible info target in the panel (.kgl «ⓘ»/dotted words, .khap «!», .kskn skill names, button.ladi) → real tap → a popup opens
           (#kpop or #modal), and in it no kit row (.kr label/value) or tier (.ktier label/text) overlaps (text-range boxes); then closed.
     HIDDEN visible elements in the panel with a pointer cursor but NO visible text, no aria-label/title and no picture (an unlabelled tap zone),
           and whole-card tap zones (.kskill / .kcard with a pointer cursor) — listed for the table.
   usage: node dev/test/info-tap-audit.js [index.html|URL] [out.json] [WxH,...] [maxPerScreen=10]   → prints a markdown table, exit 1 on FAIL */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const RT=require('./realtap.js');
const A=process.argv.slice(2);const U0=A[0]||path.resolve(__dirname,'../../index.html');const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
const OUTJ=A[1]||'/tmp/info-tap-audit.json';const SIZES=(A[2]||'755x1000,1180x820').split(',');const MAXN=+(A[3]||10);
const SETUP=()=>{try{window.__kbootHostDrop&&window.__kbootHostDrop()}catch(e){}document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());
 SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
 Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
 try{kn();for(const v of rivals){S.met[v.id]=1}}catch(e){}try{S.arts.cam=2;S.artp.cam=30;S.vir.dung=1}catch(e){}
 const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render()};
const CLEAN=()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kmrew,.km-reward').forEach(e=>e.remove());const k=document.getElementById('kpop');if(k)k.hidden=true;
 if(Q.length||!document.getElementById('modal').hidden){Q.length=0;document.getElementById('modal').hidden=true}document.querySelectorAll('.kpscene').forEach(e=>e.hidden=true);/* harness: the outside-tap catcher of a person pop-up (not what this audit is about, see kit-info-tap.js) */const c=document.getElementById('kxcatch');if(c)c.style.pointerEvents='none'};
const SCAN=(max)=>{const P=document.getElementById('panel');if(!P)return {info:[],hidden:[]};const vis=e=>{const r=e.getBoundingClientRect();return r.width>2&&r.height>2&&r.bottom>0&&r.top<innerHeight&&getComputedStyle(e).visibility!=='hidden'};
 document.querySelectorAll('[data-itx]').forEach(e=>delete e.dataset.itx);
 /* .khap[role=img] = a status mark inside a labelled button (Dư đồ place «!»), not an info target of its own */const info=[...P.querySelectorAll('.kgl,.khap:not([role=img]),.kskn,button.ladi')].filter(vis).filter((e,i,a)=>!a.some(o=>o!==e&&o.contains(e)));
 const out=[];const seen=new Set();for(const e of info){const lab=((e.innerText||'')+' '+(e.getAttribute('aria-label')||'')).replace(/\s+/g,' ').trim().slice(0,40)||e.className;if(seen.has(lab))continue;seen.add(lab);if(out.length>=max)break;const id='i'+out.length;e.dataset.itx=id;out.push({id,lab,cls:String(e.className).split(' ')[0]})}
 const hidden=[];P.querySelectorAll('*').forEach(e=>{if(!vis(e))return;const cs=getComputedStyle(e);if(cs.cursor!=='pointer')return;if(e.parentElement&&getComputedStyle(e.parentElement).cursor==='pointer'&&!e.matches('button,a,[role=button]'))return;
  const txt=(e.innerText||'').replace(/\s+/g,'');const lab=e.getAttribute('aria-label')||e.title||'';const pic=e.matches('img,svg,canvas')||e.querySelector('img,svg,canvas')||/url\(/.test(cs.backgroundImage);
  if(!txt&&!lab&&!pic)hidden.push('unlabelled '+e.tagName.toLowerCase()+'.'+String(e.className).split(' ')[0]);
  else if(e.matches('.kskill,.kcard,.v85s')&&!e.matches('button'))hidden.push('whole-card '+e.tagName.toLowerCase()+'.'+String(e.className).split(' ')[0]+' «'+(e.innerText||'').replace(/\s+/g,' ').slice(0,30)+'»')});
 return {info:out,hidden:[...new Set(hidden)]}};
const POP=()=>{const k=document.getElementById('kpop'),M=document.getElementById('modal');const kp=k&&!k.hidden&&k.getBoundingClientRect().width>0;const mo=M&&!M.hidden;const R=kp?k:mo?M:null;if(!R)return {open:false};
 const inter=(a,b)=>!(a.right<=b.left+.5||b.right<=a.left+.5||a.bottom<=b.top+.5||b.bottom<=a.top+.5);
 const txt=e=>{if(!e)return null;const r=document.createRange();r.selectNodeContents(e);const L=[...r.getClientRects()].filter(x=>x.width>0&&x.height>0);if(!L.length)return null;return {left:Math.min(...L.map(x=>x.left)),right:Math.max(...L.map(x=>x.right)),top:Math.min(...L.map(x=>x.top)),bottom:Math.max(...L.map(x=>x.bottom))}};
 const ov=[];R.querySelectorAll('.ktier').forEach((r,i)=>{const a=txt(r.querySelector('.ktk')),c=txt(r.querySelector('.ktb'));if(a&&c&&inter(a,c))ov.push('tier'+(i+1))});
 R.querySelectorAll('.kr').forEach((r,i)=>{const a=txt(r.querySelector(':scope>.krl')),c=txt(r.querySelector(':scope>.krv'));if(a&&c&&inter(a,c))ov.push('row'+(i+1))});
 return {open:true,kind:kp?'kpop':'modal',title:(R.innerText||'').replace(/\s+/g,' ').slice(0,40),ov}};
(async()=>{const b=await chromium.launch();const res=[];let bad=0;
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  if(!/^https?:/.test(URL))await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(SETUP);await p.waitForTimeout(1500);await p.evaluate(CLEAN);
  let last=null;const rt=RT.make(p,{dev,log:d=>{if(d&&d.k!=='tap')last=d}});
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button')].filter(b=>b.getBoundingClientRect().width>0).map((b,i)=>{b.dataset.itab=i;return {i,t:b.innerText.replace(/\s+/g,' ').trim()}}));
  for(const T of tabs){await p.evaluate(CLEAN);
   if(!await rt.tap(`#tabs button[data-itab="${T.i}"]`,{screen:'bar',label:T.t})){res.push({dev,screen:T.t,what:'tab',ok:false,note:'tab not tappable '+JSON.stringify(last)});bad++;continue}
   await p.waitForTimeout(900);await p.evaluate(CLEAN);
   const subs=await p.evaluate(()=>{const L=[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0);return L.map((b,i)=>{b.dataset.isub=i;return {i,t:b.innerText.replace(/\s+/g,' ').trim().slice(0,30)}})});
   const screens=subs.length?subs:[{i:-1,t:''}];
   for(const s of screens){await p.evaluate(CLEAN);
    if(s.i>=0){last=null;/* a sub-tab past the right edge of a horizontally scrolling tab bar: the player swipes the bar; the harness scrolls it (setup, not a press) */await p.evaluate(i=>{const L=[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0);const b=L[i];if(b){const bar=b.closest('.pctabs');const r=b.getBoundingClientRect(),q=bar.getBoundingClientRect();if(r.right>q.right||r.left<q.left)bar.scrollLeft+=r.left-q.left-20}},s.i);await p.waitForTimeout(200);await p.evaluate(i=>{const L=[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0);L.forEach((b,j)=>b.dataset.isub=j)},s.i);let ok=await rt.tap(`#panel [data-isub="${s.i}"]`,{screen:T.t,label:s.t});if(!ok&&last&&/not in page|gone/.test(JSON.stringify(last))){/* bar re-drawn mid-tap: tag again, tap once more */await p.waitForTimeout(500);await p.evaluate(()=>{[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0).forEach((b,j)=>b.dataset.isub=j)});last=null;ok=await rt.tap(`#panel [data-isub="${s.i}"]`,{screen:T.t,label:s.t})}if(!ok){res.push({dev,screen:T.t+' › '+s.t,what:'sub-tab',ok:false,note:'not tappable '+JSON.stringify(last)});bad++;continue}await p.waitForTimeout(700);await p.evaluate(CLEAN)}
    const scr=T.t+(s.t?' › '+s.t:'');const sc=await p.evaluate(SCAN,MAXN);
    for(const h of sc.hidden)res.push({dev,screen:scr,what:'HIDDEN',ok:!/^unlabelled/.test(h),note:h});
    for(const it of sc.info){await p.evaluate(CLEAN);const has=await p.evaluate(id=>!!document.querySelector(`[data-itx="${id}"]`),it.id);
     if(!has){const sc2=await p.evaluate(SCAN,MAXN);const m=sc2.info.find(x=>x.lab===it.lab);if(!m){res.push({dev,screen:scr,what:it.cls+' «'+it.lab+'»',ok:true,note:'gone after re-render (skipped)'});continue}it.id=m.id}
     last=null;let t=await rt.tap(`[data-itx="${it.id}"]`,{screen:scr,label:it.lab});
     if(!t&&last&&/not in page|gone/.test(JSON.stringify(last))){/* re-drawn while scrolling (kitInfoOneLine re-adds its «!»): find it again, tap once more */await p.evaluate(CLEAN);const sc3=await p.evaluate(SCAN,MAXN);const m=sc3.info.find(x=>x.lab===it.lab);if(m){last=null;t=await rt.tap(`[data-itx="${m.id}"]`,{screen:scr,label:it.lab})}}await p.waitForTimeout(700);
     const q=t?await p.evaluate(POP):{open:false};const ok=t&&q.open&&!q.ov.length;if(!ok)bad++;
     res.push({dev,screen:scr,what:it.cls+' «'+it.lab+'»',ok,note:!t?'tap refused '+JSON.stringify(last):!q.open?'NOTHING OPENS':q.ov.length?'OVERLAP '+q.ov.join(','):q.kind+': '+q.title});
     await p.evaluate(CLEAN);if(await p.evaluate(()=>typeof tab!=='undefined'&&document.querySelector('#tabs button.on, #tabs button[aria-selected=true]')&&!document.querySelector('#panel')))break}}}
  if(errs.length){bad++;res.push({dev,screen:'-',what:'page errors',ok:false,note:errs.slice(0,3).join(' | ')})}
  await ctx.close()}
 fs.writeFileSync(OUTJ,JSON.stringify(res,null,1));
 console.log('| dev | screen | target | ok | result |\n|---|---|---|---|---|');for(const r of res)console.log(`| ${r.dev} | ${r.screen} | ${r.what.replace(/\|/g,'/')} | ${r.ok?'PASS':'FAIL'} | ${String(r.note).replace(/\|/g,'/')} |`);
 console.log(bad?`FAIL ${bad}`:'ALL PASS');await b.close();process.exit(bad?1:0)})();
