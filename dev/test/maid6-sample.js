const {chromium}=require('playwright');const fs=require('fs');
const OUT='/home/user/wt/maid6-shots';
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';
const html=fs.readFileSync('/home/user/wt/maid6/index.html','utf8');
const sizes=[[755,1000,2],[1180,820,2]];
const NAMES=['Thanh Trúc','Bạch Lan','Lục Châu','Hồng Diệp','Tử Vân','Thu Cúc'];
(async()=>{const b=await chromium.launch();
for(const [W,H,D] of sizes){
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:D,reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route(u=>u.href===LIVE||u.href===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
 await ctx.route(/\.(mp3|ogg|m4a)$/,r=>r.fulfill({status:404,body:''}));
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
 await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 const clean=async()=>{await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());['kroul','kroulw','kload','klife'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});
  for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;render()});await p.waitForTimeout(700)};
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(6000);await clean();await clean();
 await p.evaluate(()=>{try{S.rank=Math.max(S.rank,5)}catch(e){}S.th=10;S.hh=-5;render()});await p.waitForTimeout(1500);await clean();
 await p.evaluate(()=>{document.querySelectorAll('.kmodal,.kres,#ktbtoast,.ktbt').forEach(e=>e.style.display='none');[...document.querySelectorAll('div')].filter(e=>/^KẾT QUẢ/.test(e.innerText||'')&&e.getBoundingClientRect().height<300&&getComputedStyle(e).position!=='static').forEach(e=>e.style.display='none')});
 await p.evaluate(()=>{try{k3Stage=function(){};k3StageR=function(){};window.render=function(){}}catch(e){}});
 const shot=async n=>{await p.waitForTimeout(600);await p.screenshot({path:`${OUT}/${n}-${W}.png`,animations:'disabled'})};
 await shot('0-now1maid');
 // A: 6 maid chips in the current layout (clone of the real maid chip)
 const info=await p.evaluate((N)=>{const R=document.getElementById('kshR');const mc=[...R.querySelectorAll('.k3c')].find(e=>e.dataset.k3go==='staff');if(!mc)return 'nomaid';
  window.__mc=mc;const html0=R.innerHTML;window.__R0=html0;
  let prev=mc;for(let i=1;i<6;i++){const c=mc.cloneNode(true);c.querySelector('b').textContent=N[i];prev.after(c);prev=c}
  mc.querySelector('b').textContent=N[0];
  const r=R.getBoundingClientRect(),st=document.getElementById('stage').getBoundingClientRect();return {R:[r.top,r.bottom,r.width],stage:[st.top,st.bottom],kids:R.children.length}},NAMES);
 console.log(W,JSON.stringify(info));
 await shot('A-6maids-now');
 // B
 const injB=async(open)=>{await p.evaluate(([N,open])=>{const R=document.getElementById('kshR');R.innerHTML=window.__R0;
  const mc=[...R.querySelectorAll('.k3c')].find(e=>e.dataset.k3go==='staff');const portrait=mc.firstElementChild.outerHTML;
  const row=N.map(n=>`<span class="m6p" title="${n}">${portrait}</span>`).join('');
  const closed=`<div class="k3p m6g"><button type="button" class="k3r kas-one m6h"><span class="k3l">Cung nữ · 6</span><b>›</b></button><div class="m6row">${row}</div></div>`;
  const list=`<div class="k3p m6g m6o" style="display:block"><button type="button" class="k3h m6h"><span>Cung nữ · 6</span><b>‹</b></button>`+N.map((n,i)=>`<button type="button" class="k3c m6li">${portrait}<span class="k3ct"><b>${n}</b><span class="k3v"><small>Thiện cảm</small> <span class="ef g">${60+i*5}</span></span></span></button>`).join('')+`</div>`;
  if(!document.getElementById('m6st')){const st=document.createElement('style');st.id='m6st';st.textContent='.kshR .k3c{flex:none!important;height:auto!important}.kshR .k3cs{flex:none!important;height:auto!important}.kshR .k3p{flex:none!important}.m6row{display:flex;padding:2px 0 3px 18px}.m6p{display:block;flex:none;width:30px;height:46px;margin-left:-14px;position:relative;overflow:visible}.m6p>*{transform:scale(.62);transform-origin:left top}.m6g{padding:3px 6px}.m6g.m6o{max-height:360px;overflow-y:auto;flex:none!important}.kshR>*{flex-shrink:0!important}';document.head.appendChild(st)}
  if(open){const pn=R.querySelector('.kpname');R.innerHTML=list}else mc.outerHTML=closed},[NAMES,open]);await shot(open?'B-compact-open':'B-compact-closed')};
 await injB(false);await injB(true);
 console.log('errs',errs);await ctx.close()}
await b.close()})();
