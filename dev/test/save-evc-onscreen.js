/* save-pid-cards rv (LAW 6c + LAW 11, same family as the j68 evl fix): the big card ON SCREEN («Có người bán tin», a generator card {rk,ra})
   was counted for today by the jevc daily cap (m.evcN, page memory). After a TRUE reload (title → «Tiếp tục kiếp này») the paint gate saw it as
   a NEW big card of a full day and moved it off her screen into EVCW (a later day; dropped after BAL.evc.wait days). Here: after 30 buổi of a
   real life, one knSell card is shown (visit 1 = today's quota), saved, true reload → it must be on screen again (Q[0], modal open, not in EVCW).
   usage: node dev/test/save-evc-onscreen.js [index.html] [devices=fold,ipadAir] ; env CTM_ROOT=<dir> (another built root) → exit 1 on FAIL */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const D=require('./lib/device');const fs=require('fs');
const [,,PAGE='index.html',DEVS='fold,ipadAir']=process.argv;
const H=eval(fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8').match(/const H=(`[\s\S]*?`);\n/)[1]);
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();let bad=0,n=0;
 for(const dev of DEVS.split(',')){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|jpeg|mp3|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(180000);
  const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));
  const open=async()=>{await D.openDirect(p,srv.url+PAGE);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H)};
  await open();
  const a=await p.evaluate(async()=>{__sbr.newLife();await __sbr.settle();for(let i=0;i<30&&!S.dead;i++){Q.length=0;const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');if(n){n.disabled=false;n.click()}await __sbr.after(k)}
   Q.length=0;let m=null;for(const s of knAllSrv().filter(y=>y&&y.name)){let N=[];try{N=knSellNews(S,s)}catch(e){}for(const x of N){m=knSellCard(s,x);if(m&&m.opts&&m.rk)break;m=null}if(m)break}
   if(!m)return{err:'no knSell card in this life'};Q.length=0;EVCW=[];S.evc=null;EVHOLD=[];Q.push(m);showModal();render();
   /* rv6 (TEST SETUP): on LIVE a held result card (jverdict RF.held, «kres-next») defers the paint → tap it as a player, wait until the card is painted (counted), then save */
   for(let i=0;i<100&&!(S.evc&&S.evc.n&&S.evc.n.visit&&!document.getElementById('modal').hidden);i++){const nx=document.querySelector('.kres-next');if(nx)nx.click();await new Promise(r=>setTimeout(r,100))}save();
   return{t:m.t,q0:Q[0]&&Q[0].t,on:Q[0]===m,n:JSON.stringify(S.evc&&S.evc.n),cap:typeof BAL.evc==='object'&&BAL.evc.on}});
  n++;if(a.err||!a.on||!a.cap){console.log(`FAIL ${dev} setup ${JSON.stringify(a)}`);bad++;await ctx.close();continue}
  await p.reload({waitUntil:'domcontentloaded'});await open();await p.waitForFunction(()=>document.querySelector('#slots button[data-load="1"]'));
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}document.querySelector('#slots button[data-load="1"]').click()});await p.waitForTimeout(2500);
  const c=await p.evaluate(()=>({q0:Q[0]&&Q[0].t,W:EVCW.map(w=>w.m.t),modal:!document.getElementById('modal').hidden,n:JSON.stringify(S.evc&&S.evc.n)}));
  const ok=c.q0===a.t&&c.modal&&!c.W.length&&c.n===a.n&&!pe.length;if(!ok)bad++;
  console.log(`${ok?'PASS':'FAIL'} ${dev} «${a.t}» on screen, today ${a.n} → true reload → Q[0] ${c.q0?'«'+c.q0+'»':'none'} · modal ${c.modal?'open':'closed'} · EVCW ${JSON.stringify(c.W)} · today ${c.n}${pe.length?' · pageerror '+pe[0]:''}`);await ctx.close()}
 console.log(bad?`SAVE-EVC-ONSCREEN FAIL ${bad}/${n}`:`SAVE-EVC-ONSCREEN PASS ${n}/${n}`);await b.close();srv.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
