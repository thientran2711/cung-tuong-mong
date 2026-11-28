/* kit-nested-exit.js — KK29 KIT BUG #5 (robot M5, seed 105 Fold: tapping a small mood emoji in «Chọn người theo hầu» opened a Tâm trạng panel with NO button and NO ✕, 15 min dead).
   RULE: every nested layer opened inside a modal has a visible exit that returns to the layer under it. This scan opens every nested look-up layer (mood seal Tâm trạng, Đã biết về X,
   Chứng cứ về X, Thỉnh tranh) over every kind of host modal (entourage picker, plain event choice, act picker, one-option card) and checks: the layer shows, it has a visible exit
   (✕ or a button) that is on screen and tappable, a REAL touch tap on the exit puts the host back (same title, its option buttons visible again). Also: a nested layer whose render THROWS
   must not leave a dead screen (kitModalSafe). Fold 755x1000 + iPad 1180x820.
   usage: node dev/test/kit-nested-exit.js <index.html> [outdir]   env SZ=[[W,H],..]  Exit 1 on a FAIL. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R=[];
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();let cerr=[];p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))cerr.push(m.text().slice(0,160))});
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof emoBox==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
  const st=()=>p.evaluate(()=>{const m=document.getElementById('modal');const d=m.querySelector('.dlg');const vis=e=>{const r=e.getBoundingClientRect();return e.getClientRects().length>0&&r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};
   return {hidden:m.hidden,q:Q.length,t:Q[0]&&Q[0].t,x:d?[...d.querySelectorAll('.kit-x,.kx,#mx')].filter(vis).length:0,btns:d?[...d.querySelectorAll('button')].filter(vis).map(x=>x.className.slice(0,10)+'|'+x.textContent.trim().slice(0,12)):[],opts:d?[...d.querySelectorAll('.opts>button')].filter(vis).length:0}});
  const clr=()=>p.evaluate(()=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;const k=document.getElementById('kpop');if(k)k.hidden=true});
  const HOSTS={
   entpick:()=>{const L=(allServ()||[]).slice(0,2);if(!L.length)throw 'no servant';Q.length=0;const o=L.map(s=>({n:s.name,fx:{},kgp:s,entId:'s'+s.sid,sel:false,x:'(cung nữ, đang ở cung và rảnh)'}));o.push({n:'Lên đường',fx:{},entGo:1,x:'',go:()=>{}},{n:'Đi một mình',fx:{},x:'thành: kín',go:()=>{}},{n:'Thôi',fx:{},x:''});Q.push({t:'Chọn người theo hầu',h:'<p>Hôm nay ra khỏi cung, ngươi dẫn ai theo?</p>',opts:o,entp:1,pid:'entpick'});showModal()},
   entpick1:()=>{const L=(allServ()||[]).slice(0,1);if(!L.length)throw 'no servant';Q.length=0;const o=L.map(s=>({n:s.name,fx:{},kgp:s,entId:'s'+s.sid,sel:false,x:'(cung nữ, đang ở cung và rảnh)'}));o.push({n:'Lên đường',fx:{},entGo:1,x:'',go:()=>{}},{n:'Đi một mình',fx:{},x:'thành: kín',go:()=>{}},{n:'Thôi',fx:{},x:''});Q.push({t:'Chọn người theo hầu',h:'<p>Hôm nay ra khỏi cung, ngươi dẫn ai theo?</p>',opts:o,entp:1,pid:'entpick'});showModal()},
   event:()=>{Q.length=0;Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Một việc.</p>',opts:[{n:'A',fx:{},x:'thành: a',go:()=>{}},{n:'B',fx:{},x:'thành: b',go:()=>{}}]});showModal()},
   actpick:()=>{Q.length=0;Q.push({t:'Chọn quà',pid:'giftpick',h:'<p>x</p>',opts:[{n:'A',fx:{},x:'thành: a',go:()=>{}},{n:'B',fx:{},x:'',go:()=>{}}]});showModal()},
   one:()=>{Q.length=0;Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Một việc duy nhất.</p>',opts:[{n:'A',fx:{},x:'thành: a',go:()=>{}}]});showModal()}};
  const OPEN={
   'mood-me':()=>emoBox('me'),
   'mood-person':()=>emoBox('emp'),
   'mood-servant':()=>{const s=(allServ()||[])[0];if(!s)throw 'no servant';emoBox('s'+s.sid)},
   'intel':()=>{const v=(rivals||[]).find(x=>x.alive)||rivals[0];kitIntelPanel(v)},
   'evidence':()=>{const v=(rivals||[]).find(x=>x.alive)||rivals[0];kitEvidencePanel(v)},
   'thinh-tranh':()=>{kitModal({kind:'info',look:1,title:'Thỉnh tranh nhân vật',sub:'đang về',sections:[{h:'Chi tiết',rows:[['Đang thỉnh','tranh vẽ các nhân vật trong cung']]}],opts:[{n:'Tạm ngưng',x:'Cho tranh dừng lại.',fx:{},go:()=>{}}]})},
   'mood-tap':null,/* the robot's M5 path: a REAL touch tap on a small mood emoji (img.kemo) of a figure inside the host modal (x* keys = stage figures) */
   'render-throws':()=>{kitModal({kind:'info',look:1,title:'Hỏng',subject:{src:'x',rk:{bad:1},ini:'?'},sections:[{h:'',rows:[['a','b']]}],btn:'Đã rõ',onClose:null});}};
  for(const hk of Object.keys(HOSTS))for(const ok of Object.keys(OPEN)){
   await clr();await p.waitForTimeout(150);let note='';cerr=[];
   const e1=await p.evaluate(HOSTS[hk]).then(()=>null,e=>String(e));if(e1){R.push({dev:W+'x'+H,host:hk,open:ok,res:'host n/a: '+e1,FAIL:false});continue}
   await p.waitForTimeout(1300);const h0=await st();
   let e2=null;if(ok==='mood-tap'){const t=await p.evaluate(()=>{for(const e of document.querySelectorAll('#modal img.kemo[data-emo]')){const r=e.getBoundingClientRect();if(r.width<5)continue;const x=r.left+r.width/2,y=r.top+r.height/2;const h=document.elementFromPoint(x,y);if(h===e)return {x,y}}return null});if(!t){R.push({dev:W+'x'+H,host:hk,open:ok,res:'no tappable mood emoji in this host',FAIL:false});continue}await p.touchscreen.tap(t.x,t.y)}else e2=await p.evaluate(OPEN[ok]).then(()=>null,e=>String(e));await p.waitForTimeout(1200);const n1=await st();
   if(ok==='render-throws'){/* the throwing layer may not be a dead screen: either it shows an exit, or it is dropped and the host is back */
     const back=n1.t===h0.t&&n1.opts>=1;const exit=n1.x>0||n1.btns.length>0;R.push({dev:W+'x'+H,host:hk,open:ok,res:back?'dropped, host back':exit?'shows exit':'DEAD',FAIL:!(back||exit)});continue}
   if(e2){R.push({dev:W+'x'+H,host:hk,open:ok,res:'open n/a: '+e2.slice(0,60),FAIL:false});continue}
   const nested=n1.q===h0.q+1&&n1.t!==h0.t;const exit=n1.x>0||n1.btns.length>0;
   if(!nested){R.push({dev:W+'x'+H,host:hk,open:ok,res:'not nested (q '+h0.q+'→'+n1.q+', '+n1.t+')',FAIL:true});continue}
   if(OUT){fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/${W}-${hk}-${ok}.png`})}
   if(!exit){R.push({dev:W+'x'+H,host:hk,open:ok,res:'NO EXIT on '+n1.t+' errs '+cerr.join('|'),FAIL:true});continue}
   const xb=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg');const vis=e=>{const r=e.getBoundingClientRect();return e.getClientRects().length>0&&r.width>0&&r.height>0};const e=[...d.querySelectorAll('.kit-x,.kx,#mx')].filter(vis)[0]||[...d.querySelectorAll('#mr button, .kfoot button, .opts>button')].filter(vis).slice(-1)[0];if(!e)return null;const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,onTop:document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)&&e.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2))}});
   if(!xb||!xb.onTop){R.push({dev:W+'x'+H,host:hk,open:ok,res:'exit not tappable',FAIL:true});continue}
   await p.touchscreen.tap(xb.x,xb.y);await p.waitForTimeout(1300);const n2=await st();
   const ret=n2.q===h0.q&&n2.t===h0.t&&n2.opts>=1&&!n2.hidden;
   R.push({dev:W+'x'+H,host:hk,open:ok,res:ret?'exit returns to host':'STUCK after exit: '+JSON.stringify(n2).slice(0,120),FAIL:!ret})}
  if(cerr.length)console.log(W,'console errors',cerr.slice(0,3));
  await ctx.close()}
 await b.close();console.table(R);const bad=R.filter(r=>r.FAIL);console.log('cases',R.length,'FAIL',bad.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
