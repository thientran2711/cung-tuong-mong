/* E96r r2 probe (real taps): a game card waits unseen (N1 behind the person view / N2 queued, not painted), she taps «Sang buổi» → the turn must NOT pass over it (LIVE: buổi held, card first). usage: node dev/test/dialog-order-next-probe.js <base> dev/index.html W H shotDir */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));const [,,BASE,PATH,W,H,SH]=process.argv;
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;return S.name})()`;
const CLEAN=`(()=>{for(const e of document.querySelectorAll('.kmov,#klife,#kmrew,#kpodov'))e.remove();try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;
 try{if(DF.play){DF.play.destroy&&DF.play.destroy();DF.play=null}if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}used=0;S.suc=Math.max(S.suc,80);try{setTab('act')}catch(e){}render()})()`;
const ST=`(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const M=document.getElementById('modal');
 return {modal:M&&!hid(M)?(M.querySelector('.dlg h2,.dlg h3,.kp-title')||M).textContent.trim().replace(/\\s+/g,' ').slice(0,50):null,q:Q.map(m=>String(m.t||'').replace(/<[^>]+>/g,'').slice(0,30)),kfoc:!!document.querySelector('.kfoc'),buoi:S.buoi,day:S.day,wk:S.wk,used}})()`;
(async()=>{const b=await chromium.launch();const c=await b.newContext({serviceWorkers:'block',viewport:{width:+W,height:+H}});const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,140)));
 await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());await p.goto(BASE+'/'+PATH);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:90000});await sleep(1500);
 await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);
 for(let k=0;k<15;k++){const ok=await p.evaluate(CLEAN+`;window.__walkFree=1;goTo('home');window.__walkFree=0;render();curPeople().some(x=>x.kind==='maid')`);if(ok)break;await p.evaluate(NEWLIFE);await sleep(1500)}
 const out={};const openMaid=async()=>{await p.evaluate(CLEAN);await sleep(300);const i=await p.evaluate(()=>curPeople().findIndex(x=>x.kind==='maid'));await p.locator(`#tokens .tok[data-p="${i}"]`).click();await sleep(900)};
 const tapNext=async tag=>{const s0=await p.evaluate(ST);const n=p.locator('#next');const vis=await n.isVisible().catch(()=>false);if(vis)await n.click({timeout:4000}).catch(e=>out[tag+'err']=e.message.split('\n')[0]);await sleep(2500);const s1=await p.evaluate(ST);if(SH)await p.screenshot({path:SH+'/'+tag+'.png'});out[tag]={nextVisible:vis,before:s0,after:s1}};
 /* N1: person view open, game card held behind it, tap Sang buổi */
 await openMaid();await p.evaluate(()=>{pushModal({t:'GAMECARD-N1',h:'x',opts:[{t:'Được',f:()=>''}]});showModal()});await sleep(500);await tapNext('N1');
 /* N2: no view, a card queued nobody painted (Q.push, no showModal), tap Sang buổi */
 await p.evaluate(CLEAN);await sleep(400);await p.evaluate(()=>{pushModal({t:'GAMECARD-N2',h:'x',opts:[{t:'Được',f:()=>''}]})});await sleep(100);await tapNext('N2');
 out.pe=pe;console.log(JSON.stringify(out));await b.close()})();
