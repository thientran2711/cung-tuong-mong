/* COOP-QCARD (RV-173 LIVE hang, MAIN 178 27/11 ~11:55Z; guilty LAND ob-verdict-3 98c77517): selection day 1, she taps «Theo thái giám vào cửa viện».
   ob-verdict-3 (jverdict) HOLDS the next card («Dưỡng Tú viện», pid selxD) behind the result card «KẾT QUẢ … Tiếp ▸» — but the roll-call scene (kit
   scene layer .kscn, z 57) opens over that result card (z 47): the held card is under the scene, its «Tiếp ▸» unreachable, Q[0] hidden, «Sẵn sàng»
   dead (co-op bots sat there for ever). Second fault of the same family: jkstage dropped body.kscn-on (the «a kit scene is up» flag) whenever #modal
   was hidden, while the kit scene was still playing.
   A PLAYER is simulated with REAL taps at screen points (page.mouse): she taps whatever is on top — the held card's «Tiếp ▸» if it is the top,
   else the scene's dialogue box. Checks, Fold 755x1000 + iPad 1180x820 (law 12), solo life (the same code runs on both co-op seats):
   (A) a HELD result card is never covered by another layer (2 looks in a row) — it is the front screen (KIT 7.4 «on top of everything»);
   (B) while a kit scene is open, body.kscn-on is set;
   (C) the queued card «Dưỡng Tú viện» reaches the screen within the player's taps (scene over, its road «Cất đồ …» the top of the screen); no page error.
   (D) law 11: every result card kind (plain resultShow / kitResultCard §93.8 / held) is the top of the screen over an open kit scene.
   (E) BIG rv r3: a held result card under the item reveal «Nhận» (a layer she closes herself) stays held and is there after «Nhận».
   MUTATE: COOP_QCARD_MUT=1 puts the result card back under the scene layer (z 47) → (A) and (D) must FAIL.
   usage: python3 dev/build/assemble.py && node dev/test/coop-qcard.js [index.html] */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';const MUT=+process.env.COOP_QCARD_MUT||0;
/* shots never in git (owner OD 16/11 18:50Z): QC_SHOTS or a scratch folder outside the repo */const SHOTS=process.env.QC_SHOTS||'/home/user/wt/coop-qcard-shots';fs.mkdirSync(SHOTS,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x).slice(0,900):'')}else console.log('ok  ',m)};
 for(const [dev,vp] of (process.env.QC_DEV==='ipad'?[['ipad',[1180,820]]]:process.env.QC_DEV==='fold'?[['fold',[755,1000]]]:[['fold',[755,1000]],['ipad',[1180,820]]])){
 const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,hasTouch:true,isMobile:vp[0]<1100,serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function'&&typeof selxScRooms==='function'&&!!window.RF,null,{timeout:240000});
 if(MUT)await p.addStyleTag({content:'.rtoast.karesult,.rtoast.karesult.kres-hold{z-index:47!important}'});
 /* a tú nữ life up to the day-1 gate card (set-up as a bot: no holds, no scenes), then she plays it herself */
 const st=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__bot=1;window.__selxNoSc=1;try{nlFigsReady=()=>true}catch(e){}/* set-up only: the roulette's figure wait (CDN pictures) is async */;
  for(let i=0;i<600;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S&&S.origin&&S.origin.k==='tt')break}if(!S||!S.origin||S.origin.k!=='tt')return{err:'no tt life',k:S&&S.origin&&S.origin.k,sd:!!(S&&S.dead)};S.kcPick='cung';nlAccept();
  const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpod,.kpod,.kscn').forEach(x=>x.remove());if(typeof kitScene==='object')kitScene.cur=null;document.body.classList.remove('kscn-on')}catch(e){}};
  for(let n=0;n<300&&Q.length&&!S.dead;n++){const m=Q[0];if(m.pid==='selxD'&&/Nhập cung/.test(m.t||''))break;
   if(m.pid==='kc2Sel'){Q.shift();S.selx.done=1;S.selx.art='';selxSelDo(8);close();continue}if(m.opts){chooseM(0);close();continue}closeModal();close()}
  const m=Q[0];if(!m||m.pid!=='selxD')return{err:'no gate card',t:m&&m.t};
  delete window.__bot;delete window.__selxNoSc;close();try{render();showModal()}catch(e){}return{t:m.t,opts:(m.opts||[]).map(o=>o.n)}});
 ok(!st.err,dev+': day-1 gate card reached («'+(st.t||'')+'»)',st);if(st.err){await ctx.close();continue}
 /* the life's roulette (#kroul, nlCard) is still up from the set-up: she taps «Bỏ qua» as a player does, then her card is painted */
 const CC=require('./lib/coop-clear.js');
 for(let i=0;i<80;i++){const k=await p.evaluate(()=>{const g=[...document.querySelectorAll('#modal button')].find(x=>x.offsetParent!==null&&/Theo thái giám/.test(x.textContent));if(g)return 0;
   const kb=[...document.querySelectorAll('.kmov:not(.km-out) button')].find(x=>x.offsetParent!==null&&!x.disabled);if(kb){kb.click();return 1}
   const km=[...document.querySelectorAll('.kmov:not(.km-out)')].find(x=>getComputedStyle(x).display!=='none');if(km){km.click();return 1}
   if(document.getElementById('modal').hidden){try{showModal()}catch(e){}}return 2});
  if(!k)break;if(k===2)await CC.tap({p});await sleep(300)}
 /* her tap on «Theo thái giám vào cửa viện» (a real tap on the option button) */
 const ob=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button')].find(x=>x.offsetParent!==null&&/Theo thái giám/.test(x.textContent))||null);
 const obe=ob.asElement();ok(!!obe,dev+': the gate option is on screen',obe?undefined:await p.evaluate(()=>({mh:document.getElementById('modal').hidden,Q:Q.map(m=>m.t),btn:[...document.querySelectorAll('#modal button')].map(x=>x.textContent.trim().slice(0,30)+(x.offsetParent?'':'(inv)')),ov:[...document.querySelectorAll('.kmov,#kroul,#kroulw,.kscn,#dawn,#kpodov')].map(x=>x.id||x.className)})));if(!obe){await ctx.close();continue}
 await obe.click();
 let covRun=0,covMax=0,noFlag=0,reached=false,steps=0,shotScene=0;const tr=[];
 for(let i=0;i<120&&!reached;i++){await sleep(300);
  const s=await p.evaluate(()=>{const t=document.getElementById('rtoast');const held=!!(t&&RF.held&&t.classList.contains('on'));let cov=false,nx=null;
   if(held){const b=t.querySelector('.kres-next')||t;const r=b.getBoundingClientRect();if(r.width){const x=r.left+r.width/2,y=r.top+r.height/2;const h=document.elementFromPoint(x,y);cov=!h||!(t.contains(h)||h.id==='kxcatch');nx=[x,y]}}
   const sc=typeof kitScene==='object'&&kitScene.cur;const bx=[...document.querySelectorAll('.kscn .kscn-box')].pop();const br=bx?bx.getBoundingClientRect():null;
   const M=document.getElementById('modal');let card=!!(M&&!M.hidden&&Q[0]&&Q[0].pid==='selxD'&&Q[0].t===BAL.selx.lodge.n&&getComputedStyle(M).display!=='none')&&!sc;
   /* on screen = she can tap its road: the first option button is the top of the screen at its centre */
   if(card){const o=[...M.querySelectorAll('button')].find(x=>x.offsetParent!==null&&/Cất đồ/.test(x.textContent));const r=o&&o.getBoundingClientRect();const h=r&&r.width?document.elementFromPoint(r.left+r.width/2,r.top+r.height/2):null;card=!!(h&&o.contains(h))}
   return{held,cov,nx,scene:!!sc,flag:document.body.classList.contains('kscn-on'),box:br&&br.width?[br.left+br.width/2,br.top+br.height-16]:null,card,q0:Q[0]&&String(Q[0].t||'').slice(0,24),mh:M?M.hidden:null}});
  tr.push([s.held?1:0,s.cov?1:0,s.scene?1:0,s.flag?1:0,s.card?1:0,s.q0]);if(tr.length>40)tr.shift();
  if(s.held&&s.scene&&!shotScene){shotScene=1;await sleep(900);await p.screenshot({path:path.join(SHOTS,'coop-qcard-held-scene-'+dev+(MUT?'-mut':'')+'.png')}).catch(()=>{})}
  covRun=s.held&&s.cov?covRun+1:0;covMax=Math.max(covMax,covRun);if(s.scene&&!s.flag)noFlag++;
  if(s.card){reached=true;break}
  /* the player taps what is on top: the held card's «Tiếp ▸» when it is the top, else the scene's line */
  if((i%2)===1){steps++;if(s.held&&!s.cov&&s.nx)await p.mouse.click(s.nx[0],s.nx[1]);else if(s.box)await p.mouse.click(s.box[0],s.box[1]);else if(s.held&&s.nx)await p.mouse.click(s.nx[0],s.nx[1])}}
 /* (D) LAW 11 — the whole result-card family over a kit scene (z order): with a kit scene open (kitScene, KIT_SCN.z), every kind of result card
    she must SEE — the plain result card of a choice (resultShow), the scene's own result card with given rows (kitResultCard §93.8, the selection
    days' «Giáo tập ma ma» card) and the HELD result card (jverdict) — is the top of the screen at its centre (KIT 7.4 «on top of everything») */
 const fam=await p.evaluate(async()=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const t0=document.getElementById('rtoast');
  const top=()=>{const t=document.getElementById('rtoast');if(!t||!t.classList.contains('on'))return 'not shown';const b=t.querySelector('.kres-next')||t;const r=b.getBoundingClientRect();if(!r.width)return 'zero';
   const h=document.elementFromPoint(r.left+r.width/2,r.top+Math.min(r.height/2,20));return h&&t.contains(h)?'TOP':'under '+(h?(h.id||String(h.className)).slice(0,24):'null')};
  /* no card open (an open card PARKS every result card by design, KIT 32.10a jk4 kdlg-on): only the scene is up */const M=document.getElementById('modal');M.hidden=true;await sl(200);
  const out={};const Sc=kitScene.open({intro:0});try{Sc.show&&Sc.show()}catch(e){}await sl(500);out.flag=document.body.classList.contains('kscn-on');
  try{resultShow('Thử',{},true)}catch(e){out.err=String(e).slice(0,80)}await sl(250);out.plain=top();
  kitResultCard({title:'Thử',ok:true,rows:[{k:'duoc',label:'Được',items:['a']}]});await sl(250);out.kitRes=top();
  const t=document.getElementById('rtoast');RF.held=true;t.classList.add('on','kres-hold','kres-front')/* hold() + front() */;await sl(150);out.held=top();t.classList.remove('kres-hold','kres-front','on');RF.held=false;
  kitScene.close(true);M.hidden=false;try{showModal()}catch(e){}return out});
 ok(fam.flag&&fam.plain==='TOP'&&fam.kitRes==='TOP'&&fam.held==='TOP',dev+': (D) every result card (plain / kitResultCard / held) is over an open kit scene',fam);
 await p.screenshot({path:path.join(SHOTS,'coop-qcard-'+dev+(MUT?'-mut':'')+'.png')}).catch(()=>{});
 /* (E) BIG rv r3: a choice that GIVES an item (kitGain: the item reveal .kmov «Nhận», z 9100, over the held card) while the next card is queued —
    the held result card stays held under the reveal (a layer she closes by her own tap) and is there after «Nhận» with «Tiếp ▸»; her tap → the next card.
    (r2's «covered 2 looks → release» dropped it: she never saw what her choice did, KIT 7.4.) Real taps; the effects switch is forced on (kfOn). */
 await p.evaluate(()=>{try{kfOn=()=>true}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kprevov,#kpodov,.kscn').forEach(x=>x.remove());try{KMQ.length=0}catch(e){}
  const t=document.getElementById('rtoast');if(t)t.classList.remove('on','kres-hold','kres-front');RF.held=false;RF.wantModal=false;RF.later.length=0;
  const M=document.getElementById('modal');M.hidden=true;Q.unshift({t:'Thử: người tặng quà',d:'qcard E',opts:[{n:'Nhận lấy',fx:{bac:5},go:()=>{kitGain(S.inv[0])}}]},{t:'Thử: thẻ kế tiếp',d:'qcard E next',opts:[{n:'Đã rõ',fx:{}}]});showModal()});
 await sleep(500);
 const eo=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button')].find(x=>x.offsetParent!==null&&/Nhận lấy/.test(x.textContent))||null);
 let E={opt:!!eo.asElement()};if(E.opt){await eo.asElement().click();await sleep(400);
  E.rev=await p.evaluate(()=>!!document.querySelector('.kmov.kfgain:not(.km-out)'));let lost=0;
  for(let i=0;i<10;i++){await sleep(300);lost+=await p.evaluate(()=>{const t=document.getElementById('rtoast');return RF.held&&t&&t.classList.contains('on')?0:1})}E.lost=lost;
  await sleep(600);const ok2=await p.evaluateHandle(()=>document.querySelector('.kmov.kfgain .krevok'));if(ok2.asElement())await ok2.asElement().click();await sleep(900);
  E.after=await p.evaluate(()=>{const t=document.getElementById('rtoast');const b=t&&t.querySelector('.kres-next');const r=b&&b.getBoundingClientRect();const h=r&&r.width?document.elementFromPoint(r.left+r.width/2,r.top+r.height/2):null;
   return{held:RF.held,on:!!(t&&t.classList.contains('on')),top:!!(h&&t.contains(h)),txt:t?t.innerText.slice(0,40):'',nx:r&&r.width?[r.left+r.width/2,r.top+r.height/2]:null}});
  await p.screenshot({path:path.join(SHOTS,'coop-qcard-E-'+dev+(MUT?'-mut':'')+'.png')}).catch(()=>{});
  if(E.after.nx){await p.mouse.click(E.after.nx[0],E.after.nx[1]);await sleep(700)}
  E.next=await p.evaluate(()=>{const M=document.getElementById('modal');return !M.hidden&&!!Q[0]&&Q[0].t==='Thử: thẻ kế tiếp'})}
 ok(E.opt&&E.rev&&E.lost===0&&E.after&&E.after.held&&E.after.top&&/KẾT QUẢ/.test(E.after.txt)&&E.next,dev+': (E) a held result card under the item reveal «Nhận» stays held, is the top after «Nhận», «Tiếp ▸» → the next card',E);
 await p.evaluate(()=>{try{const M=document.getElementById('modal');if(Q[0]&&/^Thử:/.test(Q[0].t)){Q.shift();M.hidden=true}}catch(e){}});
 ok(covMax<2,dev+': (A) the held result card is never under another layer (looks in a row covered: '+covMax+')',covMax<2?undefined:tr.slice(-24));
 ok(noFlag===0,dev+': (B) body.kscn-on is set whenever a kit scene is open (looks without it: '+noFlag+')');
 ok(reached,dev+': (C) the queued card «Dưỡng Tú viện» reaches the screen ('+steps+' taps)',reached?undefined:tr.slice(-12));
 ok(!errs.length,dev+': no page error',errs.slice(0,4));
 await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'PASS');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
