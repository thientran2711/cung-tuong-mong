/* rt-optcard-spots.js — HARNESS FIXER #8 (FOREMAN E 20:15Z: LIVE pack-4 2-column option cards, iPad «Phụ tuyến · Đổi ơn… · Lời nhờ»: robot area-tapped the empty
   dialog body 40+ min; a hand tap on the card advanced). Whole family (law 11): every option frame it can open — every PEND event (maid + consort life, the
   opt-frame-scroll-scan opener), every j72 offer (q72Test, «Lời nhờ»), sole-card / meter / 4-card synthetic frames — 1-col and 2-col, Fold 755x1000 + iPad 1180x820.
   MODE=frames (default), per in-view enabled card: OLD robot SCAN sees it as a move? (RTOLD=<dir with old robot-rt.js+realtap.js>) · NEW SCAN sees it? ·
     NEW realtap PROBE point inside the card and off the «!» (.kobang)?  + per frame ONE real tap through realtap.make() on the first card (and the last) → chose?
   MODE=spots: per frame, a REAL tap (touch on Fold, mouse on iPad) at the centre of every distinct descendant of the first two cards + 5 edge points → chose /
     popup / none  = the LIVE spot list the harness rule is built on (only .kobang may fail).
   usage: node dev/test/rt-optcard-spots.js <index.html> [out.json]  env SZ=[[W,H],..] MODE=frames|spots ONLY=regex MAXP=n RTOLD=dir. Exit 1 on any FAIL. 0 JS clicks. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,SRC,OUT]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];const MODE=process.env.MODE||'frames';
const RT=require('./realtap.js');
const scanSrc=f=>{const s=fs.readFileSync(f,'utf8');const i=s.indexOf('const SCAN = () => {');const j=s.indexOf('\n};\n',i);return s.slice(i+'const SCAN = '.length,j+2)};
const NEW_SCAN=scanSrc(path.join(__dirname,'robot-rt.js')),OLD_SCAN=process.env.RTOLD?scanSrc(path.join(process.env.RTOLD,'robot-rt.js')):null,OLD_PROBE=process.env.RTOLD?require(path.resolve(process.env.RTOLD,'realtap.js')).PROBE.toString():null;
(async()=>{const b=await chromium.launch();const html=fs.readFileSync(SRC);const R=[];
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__bot=1;let s=12345;window.__rs=v=>{s=v};Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));const p=await ctx.newPage();p.on('pageerror',()=>{});await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof q72Test==='function'&&typeof pushDil==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForTimeout(3000);await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
  await p.evaluate(()=>{S.arts=S.arts||{};for(const k of ['cam','thi','hoa','vu','ky'])S.arts[k]=2;window.__snap=JSON.stringify(ser())});
  /* openers: JS that puts ONE option frame on screen (test set-up only; every tap below is a real touch / mouse event) */
  const OPEN=[];for(const id of await p.evaluate(()=>Object.keys(T72I)))OPEN.push(['q72:'+id,`deser(JSON.parse(window.__snap));Q.length=0;q72Test(${JSON.stringify(id)},true)`]);
  for(const id of await p.evaluate(()=>Object.keys(PEND)))OPEN.push(['PEND:'+id,`deser(JSON.parse(window.__snap));Q.length=0;let hh=12345;for(const ch of ${JSON.stringify(id)})hh=(hh*31+ch.charCodeAt(0))%4294967296;window.__rs(hh);const v=(liveRivals(true)||[])[0];let ok=false;for(const pp of [{v:v&&v.id},{},{q:2,vp:0},{a0:v&&v.id,vi:0}]){let d=null;try{d=PEND[${JSON.stringify(id)}](Object.assign({},pp))}catch(e){}if(!d)continue;try{pushDil(mkP(${JSON.stringify(id)},Object.assign({},pp)),'Tuyến truyện');showModal();ok=true;break}catch(e){}}`]);
  OPEN.push(['ksp-1',`deser(JSON.parse(window.__snap));Q.length=0;const d=PEND.ksp();d.o=d.o.slice(0,1);pushDil(d,'Kính sự phòng báo tin');showModal()`]);
  OPEN.push(['sole-meter',`deser(JSON.parse(window.__snap));Q.length=0;Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Một việc duy nhất.</p>',opts:[{n:'Tắm gội chờ giá',fx:{},x:'thành: được thị tẩm',od:70}]});showModal()`]);
  OPEN.push(['meter-4',`deser(JSON.parse(window.__snap));Q.length=0;Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Bốn việc.</p>',opts:[0,1,2,3].map(i=>({n:'Việc số '+i+' khá dài để xuống dòng',fx:{suc:-5,bac:-10},x:'thành: được thị tẩm, gần Hoàng thượng',od:30+i*15}))});showModal()`]);
  const close=()=>p.evaluate(()=>{try{while(Q.length&&typeof closeModal==='function'){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;const k=document.getElementById('kpop');if(k)k.hidden=true;document.querySelectorAll('.kflockwhy').forEach(n=>n.remove())});
  const open=async js=>{await close();await p.evaluate(js).catch(()=>{});await p.waitForTimeout(1100);return p.evaluate(()=>{const o=document.querySelector('#modal:not([hidden]) .dlg .opts');return !!o&&[...o.querySelectorAll(':scope>button')].some(c=>c.getClientRects().length)})};
  const CARDS=`[...document.querySelectorAll('#modal:not([hidden]) .dlg .opts>button')].filter(c=>c.getClientRects().length)`;
  const rt=RT.make(p,{dev:W+'x'+H,log:()=>{}});let n=0;
  for(const [nm,js] of OPEN){if(process.env.ONLY&&!new RegExp(process.env.ONLY).test(nm))continue;if(+process.env.MAXP&&n>=+process.env.MAXP)break;if(!(await open(js)))continue;n++;
   if(MODE==='spots'){const spots=await p.evaluate(CS=>{const cards=eval(CS).filter(c=>!c.disabled);const cols=new Set(cards.map(c=>Math.round(c.getBoundingClientRect().left))).size;const out=[];
     cards.slice(0,2).forEach((c,ci)=>{const seen=new Set();const q=c.getBoundingClientRect();const add=(k,x,y)=>{if(seen.has(k)||x<1||y<1||x>innerWidth-1||y>innerHeight-1)return;const t=document.elementFromPoint(x,y);if(!t||!(t===c||c.contains(t)))return;seen.add(k);out.push({ci,cols,k,x,y})};
      add('centre',q.left+q.width/2,q.top+q.height/2);add('right-edge',q.right-6,q.top+q.height/2);add('left-edge',q.left+6,q.top+q.height/2);add('top-edge',q.left+q.width/2,q.top+5);add('bottom-edge',q.left+q.width/2,q.bottom-5);
      for(const e of c.querySelectorAll('*')){const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;add(e.tagName+'.'+(String(e.className).split(' ')[0]||'')+(e.getAttribute('role')?'[role]':''),r.left+r.width/2,r.top+r.height/2)}});return out},CARDS);
    for(const s of spots){if(!(await open(js)))break;const pre=await p.evaluate(([CS,s])=>{const c=eval(CS).filter(c=>!c.disabled)[s.ci];window.__ob=c;window.__q0=Q[0];const t=document.elementFromPoint(s.x,s.y);return !!c&&!!t&&c.contains(t)},[CARDS,s]);if(!pre)continue;
     if(W<1100)await p.touchscreen.tap(s.x,s.y);else await p.mouse.click(s.x,s.y);await p.waitForTimeout(800);
     const a=await p.evaluate(()=>({ch:!window.__ob.isConnected||Q[0]!==window.__q0||document.getElementById('modal').hidden,pop:!!(document.getElementById('kpop')&&!document.getElementById('kpop').hidden)}));
     const res=a.ch?'chose':a.pop?'POPUP':'NONE';R.push({dev:W+'x'+H,frame:nm,ci:s.ci,cols:s.cols,k:s.k,res,FAIL:res!=='chose'&&!/kobang|kopinfo/.test(s.k)})}continue}
   /* frames: what the robot's picker sees (old / new SCAN) + the new tap point */
   const st=await p.evaluate(([CS,NS,OS,OP,NP])=>{const cards=eval(CS);const cols=new Set(cards.map(c=>Math.round(c.getBoundingClientRect().left))).size;const NEWS=eval('('+NS+')'),OLDS=OS?eval('('+OS+')'):null,PN=eval('('+NP+')'),PO=OP?eval('('+OP+')'):null;
     const seen=S=>{if(!S)return null;const s=S();const L=window.__rtBtns||[];return cards.map(c=>{const i=L.indexOf(c);return i>=0&&s.b[i]&&s.b[i].hit})};const nw=seen(NEWS),od=seen(OLDS);
     return {cols,cards:cards.map((c,i)=>{const r=c.getBoundingClientRect();const pn=PN(c);const inView=r.top>=0&&r.bottom<=innerHeight&&!pn.clip,po=PO?PO(c):null;const t=pn.ok?document.elementFromPoint(pn.x,pn.y):null;
      return {i,dis:c.disabled,inView,newScan:nw[i],oldScan:od?od[i]:null,newPt:!!pn.ok&&!!t&&c.contains(t)&&!t.closest('.kobang,.kopinfo'),oldPt:po?!!po.ok&&!po.near:null,hit:t?t.tagName+'.'+String(t.className).split(' ')[0]:null}})}},[CARDS,NEW_SCAN,OLD_SCAN,OLD_PROBE,RT.PROBE.toString()]);
   for(const c of st.cards){if(c.dis||!c.inView)continue;R.push({dev:W+'x'+H,frame:nm,cols:st.cols,...c,FAIL:!c.newScan||!c.newPt})}
   for(const pick of ['first','last']){if(!(await open(js)))break;const h=await p.evaluateHandle(([CS,pick])=>{const L=eval(CS).filter(c=>!c.disabled);const c=pick==='first'?L[0]:L[L.length-1];window.__ob=c;window.__q0=Q[0];return c},[CARDS,pick]);
    const ok=await rt.tap(h,{screen:nm,label:pick});await p.waitForTimeout(900);const a=await p.evaluate(()=>({ch:!window.__ob||!window.__ob.isConnected||Q[0]!==window.__q0||document.getElementById('modal').hidden,pop:!!(document.getElementById('kpop')&&!document.getElementById('kpop').hidden)}));
    const res=!ok?'NOTAP':a.ch?'chose':a.pop?'POPUP':'NONE';R.push({dev:W+'x'+H,frame:nm,cols:st.cols,tap:pick,res,FAIL:res!=='chose'})}}
  R.push({dev:W+'x'+H,stats:rt.stats()});await ctx.close()}
 await b.close();const fails=R.filter(r=>r.FAIL);
 if(MODE==='spots'){const by={};for(const r of R){if(!r.k)continue;const k=r.k.padEnd(28)+' '+r.res;by[k]=by[k]||{n:0,d:new Set()};by[k].n++;by[k].d.add(r.dev)}for(const [k,v] of Object.entries(by).sort())console.log(k.padEnd(40),String(v.n).padStart(4),[...v.d].join(' '))}
 else{const tb={};for(const r of R){if(r.stats||r.tap)continue;const k=r.dev+' cols='+r.cols;const t=tb[k]=tb[k]||{cards:0,oldScan:0,newScan:0,oldPt:0,newPt:0};t.cards++;if(r.oldScan)t.oldScan++;if(r.newScan)t.newScan++;if(r.oldPt)t.oldPt++;if(r.newPt)t.newPt++}console.table(tb);
  const tp={};for(const r of R){if(!r.tap)continue;const k=r.dev+' cols='+r.cols+' '+r.res;tp[k]=(tp[k]||0)+1}console.table(tp);
  for(const r of R.filter(r=>r.stats))console.log(r.dev,'realtap',JSON.stringify({taps:r.stats.taps,dead:r.stats.dead,jsClicks:r.stats.jsClicks}));
  const lost=R.filter(r=>r.oldScan===false&&r.newScan);console.log('cards the OLD robot could not see as a move (now fixed):',lost.length,lost.slice(0,12).map(r=>r.dev+' '+r.frame+'#'+r.i).join(', '))}
 for(const f of fails.slice(0,30))console.log('FAIL',JSON.stringify(f));console.log('rows',R.length,'FAIL',fails.length);if(OUT)fs.writeFileSync(OUT,JSON.stringify(R));process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
