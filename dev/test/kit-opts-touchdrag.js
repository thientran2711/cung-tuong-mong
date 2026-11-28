/* kit-opts-touchdrag.js — KK27 TODO (a): a REAL finger drag (CDP Input.dispatchTouchEvent touchStart/Move/End on a hasTouch context, the
   way a thumb moves — NOT synthesizeScrollGesture, NOT the wheel) must scroll the option list (.opts) of a kit option frame, and the drag must NOT
   choose an option (no tap fires). Cases: 5 and 6 options + a long text, Tin báo x24 style body, Fold 755x1000 + iPad 1180x820.
   Per case: scrollable? (opts scrollHeight-clientHeight), top before/after the finger drag (drag up = scrollTop grows), tap fired (must be 0).
   usage: node dev/test/kit-opts-touchdrag.js <index.html>   env SZ=[[W,H],..]   Exit 1 on a FAIL (scrollable and the drag did not scroll, or the drag chose an option). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R=[];
 for(const [W,H] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});
  await ctx.addInitScript(()=>{window.__bot=1});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();p.on('pageerror',()=>{});await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kitScrollCues==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART&&EVART.categories,null,{timeout:60000}).catch(()=>{});await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);const cdp=await ctx.newCDPSession(p);
  const long=k=>'<p>'+('Một đoạn dài nói về chuyện trong cung và nhiều điều khác nữa. '.repeat(k))+'</p>';
  for(const [nm,n,k] of [['5 opts',5,3],['5 opts again',5,3],['6 opts',6,3],['5 opts long',5,12]].filter(c=>!process.env.CASE||new RegExp(process.env.CASE).test(c[0]))){/* CASE=regex: run only these cases, e.g. CASE=long = the FIRST modal after the game start is a scrolling list */
   await p.evaluate(()=>{document.querySelectorAll('#dawn,.kroul,.kmbox,.kne,.kmrew').forEach(e=>e.remove())});
   await p.evaluate(([n,k])=>{window.__tap=0;Q.length=0;Q.push({ev:1,t:'Tranh ghế',who:pMe(),h:('<p>'+('Một đoạn dài nói về chuyện trong cung và nhiều điều khác nữa. '.repeat(k))+'</p>'),opts:Array.from({length:n},(_,i)=>({n:'Lựa chọn '+i,fx:{}}))});showModal()},[n,k]);
   await p.waitForTimeout(+process.env.DELAY||1500);/* DELAY=ms: the finger lands that long after the modal opened («first finger drag right after a Fold modal opens scrolls 0») */
   if(process.env.SHOT)await p.screenshot({path:process.env.SHOT+'/'+W+'x'+H+'-'+nm.replace(/\W/g,'_')+'.png'});
   const info=await p.evaluate(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');const o=d&&d.querySelector('.opts');if(!o)return null;const r=o.getBoundingClientRect();
    window.__ch=0;o.addEventListener('click',()=>{window.__ch++},true);return {ksz:d.dataset.ksz||'',sc:o.scrollHeight-o.clientHeight,top:o.scrollTop,x:r.left+r.width/2,y:r.top+r.height/2,h:r.height,ta:getComputedStyle(o).touchAction,ov:getComputedStyle(o).overflowY}});
   if(!info){if(process.env.DBG)console.log(await p.evaluate(()=>{const m=document.getElementById('modal');return m.hidden+' '+(m.innerHTML||'').slice(0,600)}));R.push({dev:W+'x'+H,nm,err:'no .opts'});continue}
   /* a real finger: down at the middle of the list, move UP 90 px in 10 steps, up */
   const x=info.x,y0=Math.min(info.y+info.h/3,H-30),y1=Math.max(y0-Math.min(120,info.h/2),10);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y:y0}]});
   for(let i=1;i<=10;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y0+(y1-y0)*i/10}]});await p.waitForTimeout(16)}
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(700);
   const aft=await p.evaluate(()=>{const o=document.querySelector('#modal:not([hidden]) .dlg .opts');return {top:o?o.scrollTop:-1,ch:window.__ch,open:!document.getElementById('modal').hidden}});
   const row={dev:W+'x'+H,nm,ksz:info.ksz,scrollable:info.sc,ov:info.ov,touchAction:info.ta,before:info.top,after:aft.top,clicks:aft.ch,modalOpen:aft.open};
   row.FAIL=(info.sc>6&&aft.top<=info.top)||aft.ch>0||!aft.open;R.push(row);
   await p.evaluate(()=>{try{while(Q.length&&typeof closeModal==='function'){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true})}
  await ctx.close()}
 await b.close();console.table(R);const bad=R.filter(r=>r.FAIL||r.err);console.log('cases',R.length,'FAIL',bad.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
