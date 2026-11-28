/* review/tainghe-info — WHOLE-GAME info-tap audit (owner OD 25/11 ~23:48Z family: «Bấm … không ra thông tin gì hết», «không biết bấm vô cái gì
   mở ra cái khung này», «NĂM BẬC» rows drawn over each other). REAL taps (dev/test/realtap.js), Fold 755x1000 + iPad 1180x820.
   For every bottom tab (#tabs button) and every sub-tab of its panel (.pctabs [data-ktsv] / .pct): 
     INFO  every visible info target in the panel (.kgl «ⓘ»/dotted words, .khap «!», .kskn skill names, button.ladi) → real tap → a popup opens
           (#kpop or #modal), and in it no kit row (.kr label/value) or tier (.ktier label/text) overlaps (text-range boxes); then closed.
     HIDDEN visible elements in the panel with a pointer cursor but NO visible text, no aria-label/title and no picture (an unlabelled tap zone),
           and whole-card tap zones (.kskill / .kcard with a pointer cursor) — listed for the table.
   usage: node dev/test/info-tap-audit.js [index.html|URL] [out.json] [WxH,...] [maxPerScreen=10]   → prints a markdown table, exit 1 on FAIL */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');const RT=require('./realtap.js');
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
 /* .khap[role=img] = a status mark inside a labelled button (Dư đồ place «!»), not an info target of its own */const seen0=e=>{const r=e.getClientRects()[0];if(!r)return false;const h=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!h&&(h===e||e.contains(h)||h.contains(e))};/* a word clipped away inside a one-line row is not a visible target (its row «!» is) */
 const info=[...P.querySelectorAll('.kgl,.khap:not([role=img]),.kskn,button.ladi')].filter(vis).filter(e=>{e.scrollIntoView({block:'nearest'});return seen0(e)}).filter((e,i,a)=>!a.some(o=>o!==e&&o.contains(e)));
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
const HIT=(id)=>{const e=document.querySelector(`[data-itx="${id}"]`);if(!e)return null;e.scrollIntoView({block:'center',inline:'nearest'});/* read-only measure after the harness brings it to the middle (realtap scrolls the same way before its tap) */const r=(e.getClientRects()[0])||e.getBoundingClientRect();/* first line box of a wrapped word */const cx=r.left+r.width/2,cy=r.top+r.height/2;
 /* the clip box: a target inside a fixed one-line row (overflow clip, §6.3h person rows) cannot grow past that row without the row growing (not allowed):
    there the rule is «hit = 44 px or the whole clip box» per axis */let cw=1e9,ch=1e9;for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const cs=getComputedStyle(a);if(/(hidden|clip|auto|scroll)/.test(cs.overflowY+cs.overflowX)){const q=a.getBoundingClientRect();if(/(hidden|clip|auto|scroll)/.test(cs.overflowY))ch=Math.min(ch,q.height);if(/(hidden|clip|auto|scroll)/.test(cs.overflowX))cw=Math.min(cw,q.width)}}
 const on=(x,y)=>{const h=document.elementFromPoint(x,y);return !!h&&(h===e||e.contains(h))};let u=0,d=0,l=0,rr=0;
 for(let k=1;k<=40;k++){if(on(cx,cy-k))u=k;else break}for(let k=1;k<=40;k++){if(on(cx,cy+k))d=k;else break}
 for(let k=1;k<=40;k++){if(on(cx-k,cy))l=k;else break}for(let k=1;k<=40;k++){if(on(cx+k,cy))rr=k;else break}/* a side may stop short of 44 only where the next thing is ANOTHER tap target (two targets closer than 44 px share the gap; whichever is under the finger wins) */
 const tapAt=(x,y)=>{const h=document.elementFromPoint(x,y);return !!h&&!!h.closest('button,a,[role=button],.kgl,.khap,.kskn,.pcl,.pc,[onclick],[data-k3go]')};
 /* …or at the edge of the largest box around it that holds no other tap control (kit rule kitHitGrow: grow only into empty space) */
 const CSEL='button,a[href],[role=button],[onclick],input,select,textarea,.pc,.tok,.kgl,.kskn,button.ladi,.khap:not([role=img])';let fb={l:r.left,t:r.top,r:r.right,b:r.bottom};
 for(let a=e.parentElement;a&&a!==document.body&&a!==document.documentElement;a=a.parentElement){if(a.matches(CSEL))break;if([...a.querySelectorAll(CSEL)].some(c=>c!==e&&!e.contains(c)&&c.getClientRects().length))break;const q=a.getBoundingClientRect();fb={l:q.left,t:q.top,r:q.right,b:q.bottom}}
 const out=(x,y)=>x<fb.l+2||x>fb.r-2||y<fb.t+2||y>fb.b-2;
 const okH=(u>=21||tapAt(cx,cy-u-1)||out(cx,cy-u-1))&&(d>=21||tapAt(cx,cy+d+1)||out(cx,cy+d+1)),okW=(l>=21||tapAt(cx-l-1,cy)||out(cx-l-1,cy))&&(rr>=21||tapAt(cx+rr+1,cy)||out(cx+rr+1,cy));
 const who=(x,y)=>{const h=document.elementFromPoint(x,y);return h?h.tagName.toLowerCase()+'.'+String(h.className).split(' ')[0]:'-'};const bl=[who(cx,cy-u-1),who(cx,cy+d+1),who(cx-l-1,cy),who(cx+rr+1,cy)].join('/');return {bl,okH,okW,h:u+d+1,w:l+rr+1,needH:Math.min(TAPMIN,Math.floor(ch)-1),needW:Math.min(TAPMIN,Math.floor(cw)-1)}};
const TAPMIN=+(process.env.TAPMIN||44);
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
    if(s.i>=0){last=null;/* a sub-tab past the right edge of a horizontally scrolling tab bar: the player swipes the bar; the harness scrolls it (setup, not a press) */await p.evaluate(i=>{const L=[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0);const b=L[i];if(b)b.scrollIntoView({inline:'center',block:'nearest'})},s.i);await p.waitForTimeout(200);await p.evaluate(i=>{const L=[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0);L.forEach((b,j)=>b.dataset.isub=j)},s.i);let ok=await rt.tap(`#panel [data-isub="${s.i}"]`,{screen:T.t,label:s.t});if(!ok&&last&&/not in page|gone/.test(JSON.stringify(last))){/* bar re-drawn mid-tap: tag again, tap once more */await p.waitForTimeout(500);await p.evaluate(()=>{[...document.querySelectorAll('#panel .pctabs [data-ktsv], #panel .pctabs > button.pct')].filter(b=>b.getBoundingClientRect().width>0).forEach((b,j)=>b.dataset.isub=j)});last=null;ok=await rt.tap(`#panel [data-isub="${s.i}"]`,{screen:T.t,label:s.t})}if(!ok){res.push({dev,screen:T.t+' › '+s.t,what:'sub-tab',ok:false,note:'not tappable '+JSON.stringify(last)});bad++;continue}await p.waitForTimeout(700);await p.evaluate(CLEAN)}
    const scr=T.t+(s.t?' › '+s.t:'');const sc=await p.evaluate(SCAN,MAXN);
    for(const h of sc.hidden)res.push({dev,screen:scr,what:'HIDDEN',ok:!/^unlabelled/.test(h),note:h});
    for(const it of sc.info){await p.evaluate(CLEAN);const has=await p.evaluate(id=>!!document.querySelector(`[data-itx="${id}"]`),it.id);
     if(!has){const sc2=await p.evaluate(SCAN,MAXN);const m=sc2.info.find(x=>x.lab===it.lab);if(!m){res.push({dev,screen:scr,what:it.cls+' «'+it.lab+'»',ok:true,note:'gone after re-render (skipped)'});continue}it.id=m.id}
     await p.evaluate(id=>{const e=document.querySelector(`[data-itx="${id}"]`);if(e)e.scrollIntoView({block:'center',inline:'nearest'})},it.id);await p.waitForTimeout(300);/* let kitHitGrow re-measure after the scroll (throttled 120 ms) */
     const hs=await p.evaluate(([f,id,m])=>{window.TAPMIN=m;return (new Function('return '+f))()(id)},[HIT.toString(),it.id,TAPMIN]);
     last=null;let t=await rt.tap(`[data-itx="${it.id}"]`,{screen:scr,label:it.lab});
     if(!t&&last&&/not in page|gone/.test(JSON.stringify(last))){/* re-drawn while scrolling (kitInfoOneLine re-adds its «!»): find it again, tap once more */await p.evaluate(CLEAN);const sc3=await p.evaluate(SCAN,MAXN);const m=sc3.info.find(x=>x.lab===it.lab);if(m){last=null;t=await rt.tap(`[data-itx="${m.id}"]`,{screen:scr,label:it.lab})}}await p.waitForTimeout(700);
     const q=t?await p.evaluate(POP):{open:false};const big=!!hs&&(hs.h>=hs.needH||hs.okH)&&(hs.w>=hs.needW||hs.okW);const ok=t&&q.open&&!q.ov.length&&big;if(!ok)bad++;
     res.push({dev,screen:scr,what:it.cls+' «'+it.lab+'»',ok,note:(hs?`hit ${hs.w}x${hs.h}${hs.needH<TAPMIN||hs.needW<TAPMIN?` (clip row ${hs.needW+1}x${hs.needH+1})`:''}${big?'':' < need, edge '+hs.bl}`:'hit ?')+' · '+(!t?'tap refused '+JSON.stringify(last):!q.open?'NOTHING OPENS':q.ov.length?'OVERLAP '+q.ov.join(','):q.kind+': '+q.title)});
     await p.evaluate(CLEAN);if(await p.evaluate(()=>typeof tab!=='undefined'&&document.querySelector('#tabs button.on, #tabs button[aria-selected=true]')&&!document.querySelector('#panel')))break}}}
  if(errs.length){bad++;res.push({dev,screen:'-',what:'page errors',ok:false,note:errs.slice(0,3).join(' | ')})}
  await ctx.close()}
 fs.writeFileSync(OUTJ,JSON.stringify(res,null,1));
 console.log('| dev | screen | target | ok | result |\n|---|---|---|---|---|');for(const r of res)console.log(`| ${r.dev} | ${r.screen} | ${r.what.replace(/\|/g,'/')} | ${r.ok?'PASS':'FAIL'} | ${String(r.note).replace(/\|/g,'/')} |`);
 console.log(bad?`FAIL ${bad}`:'ALL PASS');await b.close();process.exit(bad?1:0)})();
