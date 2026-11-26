/* DIALOG-ORDER scan (E96, owner OD 26/11 ~03:40Z «out of order»: maid → Mưu kế tab → «Sai đi dò la» opened nothing until ✕ closed the box,
   then the pick-who dialog appeared). Whole family (law 11): EVERY act card of EVERY person view (every place, every person who stands there,
   every tab of her card) is tapped for real; after the tap the result is classified:
     TOP    = a dialog / scene / mini-game intro she asked for is on screen at once
     HELD   = a card sits in Q but #modal is hidden (waits behind the open view)  <- the bug
     DIRECT = no dialog (the act ran in place: line / reaction / grey reason)
   usage: node dev/test/dialog-order-scan.js <baseURL> <path> [W H] [maxPlaces]   e.g. http://127.0.0.1:8796 dev/index.html 755 1000
   exit 1 when any HELD row (or a page error) is found.
   HOLD=1 (E96f r2, E96r FAIL 1 held-card variant): before EVERY tap a card the GAME posted (GAMECARD-HELD) already waits hidden behind the view
   (gate (c) holds it, dayq-hold A4) -- __D.clean() no longer hides that case. Extra results: DEAD = nothing of hers on screen and nothing of hers
   queued (only the game card) / GAMEFIRST = the game card shows before hers / LOST = the game card is gone / HELD = hers queued but hidden.
   Join with a plain run (same SEED) by act: a TOP act there must be TOP here. exit 1 on HELD / LOST / GAMEFIRST / page error. */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,BASE,PATH,W,H,MAXP]=process.argv;
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;return S.name})()`;
const HELP=`(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);
 window.__D={hid,
  clean(){for(const e of document.querySelectorAll('.kmov,#klife,#kmrew,#kpodov'))e.parentNode&&e.parentNode.removeChild(e);try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const m=document.getElementById('modal');if(!hid(m))m.hidden=true;
   const ov=document.getElementById('ov');if(ov&&!hid(ov)){try{kg82Close(true)}catch(e){}ov.hidden=true}try{S.mg=null}catch(e){}
   try{if(DF.play){DF.play.destroy&&DF.play.destroy();DF.play=null}if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}
   used=0;S.suc=Math.max(S.suc,80);S.bac=Math.max(S.bac,500);if(window.tab!=='act'){try{setTab('act')}catch(e){}}render()},
  state(){const M=document.getElementById('modal');const mv=!hid(M);const ov=document.getElementById('ov');
   return {q:Q.length,qt:Q[0]&&String(Q[0].t||'').replace(/<[^>]+>/g,'').slice(0,50),modal:mv,ov:!!(ov&&!hid(ov)),scene:!!document.querySelector('.kmov:not(.km-out),#kmrew,#kpodov'),
    play:!!(window.DF&&DF.play)||!!(window.DF&&DF.F&&Q[0]&&DF.encM===Q[0]&&Q[0].dfSeen)/* the card plays as the view's own say scene (jdfv encounter) = on screen */,intro:!!document.querySelector('.kfintro,.kfoc .kf-intro'),kfoc:!!document.querySelector('.kfoc')}}};return 1})()`;
const TABSEL='.kfoc button.pct';
const CARDSEL='.kfoc button.kfoc-b';
(async()=>{const b=await chromium.launch();const c=await b.newContext({serviceWorkers:'block',viewport:{width:+W||755,height:+H||1000},deviceScaleFactor:1});
 /* one seeded world for the before / after builds (SEED env, default 7) */
 await c.addInitScript(sd=>{let x=sd>>>0||7;Math.random=()=>{x^=x<<13;x>>>=0;x^=x>>>17;x^=x<<5;x>>>=0;return x/4294967296}},+(process.env.SEED||7));
 const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(BASE+'/'+PATH);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:90000});await sleep(1500);
 await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);await p.evaluate(HELP);await p.evaluate(()=>__D.clean());await sleep(500);
 const places=await p.evaluate(()=>['home'].concat((places()||[]).map(x=>x.k)).concat(liveRivals(true).slice(0,4).map(v=>'r'+v.id)));
 const rows=[];const maxP=+MAXP||places.length;
 const tabClick=tb=>p.evaluate(([tb,sel])=>{const b=[...document.querySelectorAll(sel)].find(x=>x.dataset.k===tb);if(b)b.click();return !!b},[tb,TABSEL]);
 for(const pl of places.slice(0,maxP)){
  const ppl=await p.evaluate(pl=>{__D.clean();window.__walkFree=1;try{goTo(pl)}catch(e){}window.__walkFree=0;__D.clean();return [...document.querySelectorAll('#tokens .tok[data-p]')].map(t=>({i:+t.dataset.p,n:t.textContent.trim().replace(/\s+/g,' ').slice(0,40)}))},pl);
  if(process.env.DBG)console.log('PLACE',pl,JSON.stringify(ppl));
  for(const who of ppl){
   const open=async()=>{await p.evaluate(()=>__D.clean());await sleep(250);const t=await p.$(`#tokens .tok[data-p="${who.i}"]`);if(!t)return false;try{await t.click({timeout:3000})}catch(e){return false}await sleep(700);return true};
   if(!await open())continue;
   const tabs=await p.evaluate(sel=>[...document.querySelectorAll(sel)].map(b=>b.dataset.k),TABSEL);
   if(process.env.DBG)console.log(' WHO',who.n,JSON.stringify(tabs));
   for(const tb of (tabs.length?tabs:[null])){
    if(!await open())break;if(tb){await tabClick(tb);await sleep(300)}
    const cards=await p.evaluate(sel=>[...document.querySelectorAll(sel)].map((b,k)=>({k,vis:b.getBoundingClientRect().height>0&&getComputedStyle(b).visibility!=='hidden',n:(b.querySelector('.kfoc-n,b,strong')||b).textContent.trim().replace(/\s+/g,' ').slice(0,40),dis:!!b.disabled})).filter(x=>!/^Thôi/.test(x.n)),CARDSEL);
    if(process.env.DBG)console.log('  TAB',tb,JSON.stringify(cards),await p.evaluate(()=>{const w=document.getElementById('popw');return [w&&w.hidden,document.querySelectorAll('#popw .opt').length,document.querySelectorAll('.opt').length,popIdx,!!(window.DF&&DF.F)]}));
    for(const cd of cards){if(cd.dis||!cd.vis)continue;
     if(!await open())break;if(tb){await tabClick(tb);await sleep(300)}
     if(process.env.HOLD){await sleep(900)/* past BAL.dayq.mineLook of the tab tap: the card is the GAME's, not hers */;await p.evaluate(()=>{pushModal({t:'GAMECARD-HELD',h:'x',opts:[{n:'Được',fx:{}}]});showModal()});await sleep(200);if(process.env.DBG)console.log('HOLDST',JSON.stringify(await p.evaluate(()=>({m:!document.getElementById('modal').hidden,q:Q.length,kf:!!document.querySelector('.kfoc'),act:!!dqActEl(),fo:DQ.fo,tk:DF.tk,play:!!DF.play,F:!!DF.F,user:DQ.user,top:(()=>{const b=document.querySelector('.kfoc button.kfoc-b');if(!b)return null;const r=b.getBoundingClientRect();const e=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return e&&(e.id+'.'+String(e.className).slice(0,40))})()}))))}
     const el=(await p.$$(CARDSEL))[cd.k];if(!el)continue;
     try{await el.click({timeout:2500})}catch(e){if(process.env.DBG)console.log('NOTAP',String(e.message).split('\n').slice(0,6).join(' | ').slice(0,600));rows.push({pl,who:who.n,tab:tb,act:cd.n,res:'NOTAP'});continue}
     if(process.env.WHY)await p.evaluate(()=>{if(window.__whyOn)return;window.__whyOn=1;const s0=showModal;showModal=window.showModal=function(){try{const ev=window.event;const a=typeof dqActEl==='function'?dqActEl():null;const L=[];for(let x=ev&&ev.target;x&&L.length<6;x=x.parentElement)L.push(x.tagName+(x.id?'#'+x.id:'')+'.'+String(x.className).slice(0,18));
       window.__why={ev:ev&&ev.type,chain:L.join('<'),act:a&&(a.id||String(a.className).slice(0,24)),stack:new Error().stack.split('\n').slice(2,7).map(x=>x.trim().slice(3,50)).join(' / ')}}catch(e){}return s0.apply(this,arguments)}});
     await p.evaluate(()=>{window.__why=null});
     await sleep(900);const s=await p.evaluate(()=>__D.state());
     let res=(s.modal||s.ov||s.scene||s.play||s.intro)?'TOP':(s.q?'HELD':'DIRECT');
     if(process.env.HOLD){const h=await p.evaluate(()=>{const i=Q.findIndex(m=>m.t==='GAMECARD-HELD');return {i,n:Q.length}});
      res=h.i<0?'LOST':(s.modal&&h.i===0)?(h.n>1?'GAMEFIRST':'DEAD'):(s.modal||s.ov||s.scene||s.play||s.intro)?'TOP':h.n>1?'HELD':'DEAD'}
     rows.push({pl,who:who.n,tab:tb,act:cd.n,res,q:s.qt||''});if(process.env.SHOT&&(res==='HELD'||(process.env.SHOTD&&res==='DIRECT'&&cd.n.includes(process.env.SHOTD))))await p.screenshot({path:process.env.SHOT+'/held-'+rows.length+'.png'});if(process.env.WHY&&res==='HELD')console.log('WHY',cd.n,JSON.stringify(await p.evaluate(()=>({why:window.__why,mg:S.mg&&(S.mg.k||S.mg.kind||1),tapIn:DQ.tapIn,mine:!!DQ.mine,st:DQ.stat,kfoc:!!document.querySelector('.kfoc'),popw:!document.getElementById('popw').hidden,q0:Q[0]&&{t:Q[0].t,pid:Q[0].pid},fn:typeof dqTapIn,pre:DQ.preQ&&DQ.preQ.size,inPre:!!(DQ.preQ&&DQ.preQ.has(Q[0])),qh:dqQHidden(),qn:Q.length,enc:!!(DF.encM&&DF.encM===Q[0]),dfw:Q[0]&&Q[0].__dfWait,dfs:Q[0]&&Q[0].dfSeen,play:dqPlaying(),ev:DQ.tapEv&&DQ.tapEv.type}))));
    }
   }
  }
 }
 await p.evaluate(()=>__D.clean());
 const cnt={};rows.forEach(r=>cnt[r.res]=(cnt[r.res]||0)+1);
 console.log('| place | person | tab | act | result | dialog |');console.log('|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.pl} | ${r.who} | ${r.tab||''} | ${r.act} | ${r.res} | ${r.q||''} |`);
 console.log('SUMMARY',JSON.stringify(cnt),'pageErrors',pe.length,JSON.stringify(pe.slice(0,3)));await b.close();process.exit((cnt.HELD||0)||(cnt.LOST||0)||(cnt.GAMEFIRST||0)||pe.length?1:0)})();
