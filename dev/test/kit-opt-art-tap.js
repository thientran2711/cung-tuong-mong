/* kit-opt-art-tap.js — KK29 KIT BUG #6 remainder (robot M3, iPad 1180x820): a tap on the ART (picture / avatar) of an option card opened a fullscreen image lightbox (#kpzoom) and chose nothing.
   RULE: a tap anywhere on an option card chooses it; the art included. REAL touch tap on the art centre of: the entourage picker person cards (avatar), a real PEND.ksp card, a plain event card with a
   meaning-group picture. FAIL = #kpzoom visible, or the option did not fire. Fold 755x1000 + iPad 1180x820.
   usage: node dev/test/kit-opt-art-tap.js <index.html> [outdir]   env SZ=[[W,H],..]  Exit 1 on a FAIL. */
const {chromium}=(require('./lib/bigpage'),require('./lib/dlgs-off').pw('off'));/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const [,,SRC]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R=[];
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof pushDil==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
  const CASES=[
   ['entpick',()=>{const L=(allServ()||[]).slice(0,2);if(!L.length)throw 'no servant';Q.length=0;const o=L.map(s=>({n:s.name,fx:{},kgp:s,entId:'s'+s.sid,sel:false,x:'(cung nữ, đang ở cung và rảnh)'}));o[0].go=function(){window.__fired=1};window.__o0=o[0];o.push({n:'Đi một mình',fx:{},x:'thành: kín',go:()=>{}},{n:'Thôi',fx:{},x:''});Q.push({t:'Chọn người theo hầu',h:'<p>Hôm nay ra khỏi cung, ngươi dẫn ai theo?</p>',opts:o,entp:1,pid:'entpick'});showModal();return 0}],
   ['ksp-card',()=>{const d=PEND.ksp();d.o=d.o.slice(0,1);d.o[0].go=()=>{window.__fired=1};Q.length=0;pushDil(d,'Kính sự phòng báo tin');showModal();return 0}],
   ['plain-art',()=>{Q.length=0;Q.push({ev:1,t:'Tin',who:pMe(),h:'<p>Một việc.</p>',opts:[{n:'Dâng lễ vật',fx:{},x:'thành: được ân',go:()=>{window.__fired=1}},{n:'Nhận lỗi, cúi đầu',fx:{},x:'',go:()=>{}}]});showModal();return 0}]];
  for(const [nm,fn] of CASES){
   await p.evaluate(()=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;window.__fired=0;window.__o0=null;const z=document.getElementById('kpzoom');if(z)z.hidden=true});await p.waitForTimeout(250);
   const e1=await p.evaluate(fn).then(()=>null,e=>String(e));if(e1){R.push({dev:W+'x'+H,case:nm,res:'n/a '+e1,FAIL:false});continue}
   await p.waitForFunction(()=>{const o=document.querySelector('#modal:not([hidden]) .dlg .opts');return !!o&&o.getClientRects().length>0&&!!o.querySelector('.kaart')},null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(800);
   const t=await p.evaluate(()=>{const o=document.querySelector('#modal:not([hidden]) .dlg .opts');const bt=o&&[...o.querySelectorAll(':scope>button')].filter(x=>x.getClientRects().length&&!x.disabled&&!x.classList.contains('kdis'))[0];if(!bt)return null;const a=bt.querySelector('.kaart');if(!a||!a.getClientRects().length)return {noart:1};a.scrollIntoView({block:'nearest'});const r=a.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const e=document.elementFromPoint(x,y);return {x,y,inside:!!e&&a.contains(e)}});
   if(!t||t.noart){R.push({dev:W+'x'+H,case:nm,res:t?'no art on card':'no card',FAIL:false});continue}
   await p.touchscreen.tap(t.x,t.y);await p.waitForTimeout(900);
   const a=await p.evaluate(()=>{const z=document.getElementById('kpzoom');return {zoom:!!z&&!z.hidden,fired:!!window.__fired||(window.__o0&&window.__o0.sel===true)||(window.__pick&&window.__pick.sel!==false)||document.getElementById('modal').hidden}});
   R.push({dev:W+'x'+H,case:nm,art:t.inside?'hit art':'covered',res:a.zoom?'LIGHTBOX':a.fired?'chose':'NO EFFECT',FAIL:!(t.inside&&!a.zoom&&a.fired)})}
  await ctx.close()}
 await b.close();console.table(R);const bad=R.filter(r=>r.FAIL);console.log('taps',R.length,'FAIL',bad.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
