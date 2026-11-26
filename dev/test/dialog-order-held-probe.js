/* E96r reviewer probe (real taps, Fold/iPad): P1 = owner case maid → Mưu kế → «Sai đi dò la» on top; P2 = a card the GAME posted waits hidden behind the view, then her tap on «Sai đi dò la» (FAILS today: nothing happens, her picker is never queued); P3 = a game card posted after her picker waits behind it; P4 = «Trò chuyện». usage: node dev/test/dialog-order-held-probe.js <base> dev/index.html W H [shotDir] */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,BASE,PATH,W,H,SH]=process.argv;
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;return S.name})()`;
const CLEAN=`(()=>{for(const e of document.querySelectorAll('.kmov,#klife,#kmrew,#kpodov'))e.parentNode&&e.parentNode.removeChild(e);try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;
 try{if(DF.play){DF.play.destroy&&DF.play.destroy();DF.play=null}if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}used=0;S.suc=Math.max(S.suc,80);S.bac=Math.max(S.bac,500);try{setTab('act')}catch(e){}render()})()`;
const ST=`(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const M=document.getElementById('modal');
 const t=M&&!hid(M)?(M.querySelector('.dlg h2,.dlg h3,.kp-title,.dlg .t')||M).textContent.trim().replace(/\\s+/g,' ').slice(0,60):null;
 return {modal:t,q:Q.map(m=>String(m.t||'').replace(/<[^>]+>/g,'').slice(0,40)),kfoc:!!document.querySelector('.kfoc'),nopt:M&&!hid(M)?M.querySelectorAll('.opt').length:0}})()`;
(async()=>{const b=await chromium.launch();const c=await b.newContext({serviceWorkers:'block',viewport:{width:+W,height:+H},deviceScaleFactor:1});
 const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(BASE+'/'+PATH);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:90000});await sleep(1500);
 await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);
 for(let k=0;k<15;k++){const ok=await p.evaluate(CLEAN+`;window.__walkFree=1;goTo('home');window.__walkFree=0;render();curPeople().some(x=>x.kind==='maid')`);if(ok)break;await p.evaluate(NEWLIFE);await sleep(1500)}
 const openMaid=async()=>{await p.evaluate(CLEAN);await sleep(300);const i=await p.evaluate(()=>curPeople().findIndex(x=>x.kind==='maid'));if(i<0)return false;await p.locator(`#tokens .tok[data-p="${i}"]`).click();await sleep(900);return true};
 const tab=async n=>{const t=p.locator('.kfoc button.pct',{hasText:n});if(await t.count()){await t.first().click();await sleep(400);return true}return false};
 const tapCard=async n=>{const cd=p.locator('.kfoc button.kfoc-b',{hasText:n});if(!await cd.count())return 'no card';await cd.first().click();await sleep(1000);return await p.evaluate(ST)};
 const out={};
 /* list tabs/cards of the maid view */
 if(await openMaid()){out.tabs=await p.evaluate(()=>[...document.querySelectorAll('.kfoc button.pct')].map(b=>b.textContent.trim()));
  out.cards={};for(const t of out.tabs){await tab(t);out.cards[t]=await p.evaluate(()=>[...document.querySelectorAll('.kfoc button.kfoc-b')].map(b=>b.textContent.trim().replace(/\s+/g,' ').slice(0,30)))}}
 /* P1: owner case clean */
 if(await openMaid()){await tab('Mưu kế');out.P1=await tapCard('Sai đi dò la');if(SH)await p.screenshot({path:SH+'/P1.png'})}
 /* P2: a GAME card already held behind the view, then her tap on «Sai đi dò la» */
 if(await openMaid()){await p.evaluate(()=>{pushModal({t:'GAMECARD-TEST',h:'x',opts:[{t:'Được',f:()=>''}]});showModal()});await sleep(500);out.P2pre=await p.evaluate(ST);
  await tab('Mưu kế');out.P2=await tapCard('Sai đi dò la');if(SH)await p.screenshot({path:SH+'/P2.png'});
  /* close whatever is on top by its first option, then the view by ✕/back, see the order of the rest */
  const seq=[];for(let k=0;k<6;k++){const s=await p.evaluate(ST);seq.push(s);if(!s.modal&&!s.q.length)break;
   if(s.modal){const o=p.locator('#modal .opt:visible').last();if(await o.count())await o.click().catch(()=>{});else break}
   else{const x=p.locator('.kfoc .kfoc-x, .kfoc button[aria-label="Đóng"], .kfoc .kback').first();if(await x.count())await x.click().catch(()=>{});else{await p.keyboard.press('Escape')}}
   await sleep(900)}out.P2seq=seq}
 /* P3: game card posted WHILE picker open? -> post card after her tap, it must not jump over her picker */
 if(await openMaid()){await tab('Mưu kế');const r=await tapCard('Sai đi dò la');await p.evaluate(()=>{pushModal({t:'GAMECARD-LATE',h:'x',opts:[{t:'Được',f:()=>''}]})});await sleep(600);out.P3={afterTap:r,afterPost:await p.evaluate(ST)}}
 /* P4: talk path «Trò chuyện» + other tabs' first enabled card on top */
 if(await openMaid()){out.P4=await tapCard('Trò chuyện');}
 out.pe=pe;console.log(JSON.stringify(out,null,1));await b.close()})();
