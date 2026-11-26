/* KK37 grey stand-in family scan (KIT §59.1 unknown-fig / unknown-f|m|k / .ksil / .j59sil): every screen a player can see, per buổi.
   Each visible grey picture is classified by the nearest card text: KNOWN = the card names a person she knows (kitIsKnown true) → BUG family;
   STRANGER = «Người lạ» / ??? / no known name → owner rule (OD 17/11 ~20:35Z) ; LOADING = img data-kwait (OD 24/11 ~07:27Z).
   usage: node grey-scan.js <index.html> WxH [buoi=6]  → prints table rows + JSON summary */
const {chromium}=require('playwright');const fs=require('fs');const [,,SRC,WH,NB]=process.argv;const [W,H]=WH.split('x').map(Number);const dev=W<H?'fold':'ipad';
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.addInitScript(()=>{window.__bot=1;setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,160)));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function',null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0});
 await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(2500);
 await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch{display:none!important}'});
 const clear=()=>p.evaluate(()=>{try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.body.classList.remove('kdlg-on')});
 const COLLECT=()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>6&&r.height>6&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth&&getComputedStyle(e).visibility!=='hidden'&&+getComputedStyle(e).opacity>0.05};
  const all=[];const add=x=>{if(x&&typeof x==='object'&&x.name&&!all.includes(x))all.push(x)};try{(liveRivals(true)||[]).forEach(add)}catch(e){}[S.emp,S.th,S.thO,S.maid].forEach(add);for(const k of ['srvs','servants','npcs','kids','staff'])(S[k]||[]).forEach(add);
  const known=all.filter(x=>{try{return kitIsKnown(x)}catch(e){return false}}).map(x=>x.name).filter(n=>n&&n.length>2);
  const out=[];const grey=[...document.querySelectorAll('img')].filter(im=>/unknown-(fig-)?[fmk]\.webp/.test(im.currentSrc||im.getAttribute('src')||'')||im.classList.contains('ksil')||im.classList.contains('j59sil'));
  for(const im of grey){if(!vis(im))continue;let c=im,txt='';for(let k=0;k<4&&c.parentElement;k++){c=c.parentElement;txt=(c.innerText||'').replace(/\s+/g,' ').trim();if(txt.length>3)break}
   const kn=known.find(n=>txt.includes(n));const where=(im.closest('#modal')?'dlg:'+((document.querySelector('#modal .dlg h3, #modal .dlg .kptitle, #modal .dlg [class*=title]')||{}).innerText||'').slice(0,40):im.closest('#stage')?'stage':'tab:'+tab);
   out.push({where,cls:(im.className||'').toString().slice(0,40),kw:im.hasAttribute('data-kwait'),kind:im.hasAttribute('data-kwait')?'LOADING':kn?'KNOWN':'STRANGER',name:kn||'',txt:txt.slice(0,70),src:(im.getAttribute('src')||'').replace(/^.*\//,'')})}
  return out};
 const rows=[];const take=async label=>{await p.waitForTimeout(1600);const r=await p.evaluate(COLLECT);for(const x of r)rows.push(Object.assign({at:label},x))};
 const tabs=['act','go','rv','rel','staff','court','men','kid','fac','inv','story','log','art'];
 for(let bi=0;bi<(+NB||6);bi++){await clear();
  for(const t of tabs){await p.evaluate(t=>{try{tab=t;render()}catch(e){}},t);await take('b'+bi+' '+t)}
  /* people rows: open the first few person popups on the rv / staff tabs (real tap) */
  for(const t of ['rv','staff']){await p.evaluate(t=>{tab=t;render()},t);await p.waitForTimeout(600);const n=await p.evaluate(()=>document.querySelectorAll('#main .kpor, #main [data-pid], #main .prow').length);
   for(let i=0;i<Math.min(n,3);i++){const q=await p.evaluate(i=>{const e=[...document.querySelectorAll('#main .kpor, #main [data-pid], #main .prow')].filter(e=>e.getClientRects().length)[i];if(!e)return null;e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},i);if(!q)continue;await p.touchscreen.tap(q[0],q[1]);await take('b'+bi+' '+t+' popup'+i);await clear();await p.evaluate(t=>{tab=t;render()},t)}}
  await p.evaluate(()=>{tab='act';render();try{nextBuoi()}catch(e){}});await p.waitForTimeout(1500);
  /* visitor / event frames that the buổi pushed: look at each before clearing */
  for(let k=0;k<4;k++){const has=await p.evaluate(()=>Q.length>0&&!document.getElementById('modal').hidden);if(!has)break;await take('b'+bi+' queue'+k);await p.evaluate(()=>{try{closeModal()}catch(e){Q.shift();}})}}
 const sum={};for(const r of rows){const k=r.kind;sum[k]=(sum[k]||0)+1}
 const seen=new Set();for(const r of rows){const k=r.kind+'|'+r.where+'|'+r.name+'|'+r.txt.slice(0,30);if(seen.has(k))continue;seen.add(k);console.log([dev,r.at,r.kind,r.where,r.cls,r.src,r.name,r.txt].join(' | '))}
 console.log('SUMMARY',dev,JSON.stringify(sum),'errors',errs.length,errs.slice(0,3).join(' || '));await b.close()})();
