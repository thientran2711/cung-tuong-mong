/* usage: NODE_PATH=$(npm root -g) node dev/test/rank-name-dup.js <url> [WxH] — exit data {R:{}} = no doubled titles */
/* doubled title scan: a painted .kname whose title also stands in a short sibling label (card rank line) — every tab, every Hậu cung person + sub-tab, mood, spy, dialogs */
const {chromium}=require('./lib/pw-roulette');const [,,URL,SZ]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});p.setDefaultTimeout(900000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:300000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:300000});
 const R=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const out={};rivals.forEach(v=>{S.met[v.id]=1});
  const chk=site=>{for(const k of document.querySelectorAll('.kname')){const t=k.querySelector('.kti');if(!t)continue;const tt=t.textContent.trim().toLowerCase();
    for(let e=k,i=0;i<2&&e&&e.parentElement;i++,e=e.parentElement)for(const c of e.parentElement.children){if(c===e||c.contains(e)||c.querySelector('.kname,.klab,img')||c.matches('.md,.klab'))continue;const ct=(c.textContent||'').trim().toLowerCase();if(ct&&ct.length<40&&ct===tt){(out[site]=out[site]||[]).push(k.textContent.trim()+' | '+ct);break}}}};
  const close=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true};close();
  const tabs=[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab);
  for(const t of tabs){tab=t;try{render()}catch(e){}await W(250);chk('tab '+t);
   for(const s of [...document.querySelectorAll('#panel .ktabs button,#panel [data-hc],#panel [data-sub]')].slice(0,6)){try{s.click()}catch(e){}await W(250);chk('tab '+t+' > '+s.textContent.trim().slice(0,14))}}
  tab='rv';for(let i=0;i<rivals.length;i++){try{PG.rv=i;render()}catch(e){}await W(120);chk('hc person')}
  for(const v of rivals.filter(v=>v.alive).slice(0,4)){close();try{emoBox(typeof emoKey==='function'?emoKey(v):v.id)}catch(e){}await W(250);chk('mood')}
  close();try{spyPick(0)}catch(e){}await W(250);chk('spy');close();
  const sm=showModal;for(let i=0;i<25;i++){Q.length=0;try{showModal=function(){};endTurn()}catch(e){}finally{showModal=sm}for(const m of Q.slice(0,3)){Q.length=0;Q.push(m);try{showModal()}catch(e){}await W(100);chk('dialogs')}close()}
  tab='log';render();await W(300);chk('log');return out});
 console.log(JSON.stringify({R:Object.fromEntries(Object.entries(R).map(([k,v])=>[k,[v.length,...v.slice(0,3)]])),errs}));await b.close()})();
