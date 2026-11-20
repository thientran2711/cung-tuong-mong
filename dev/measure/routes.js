/* jroute bot: a route-seeking player on top of the inpage6 sensible bot.
   usage: node dev/measure/routes.js <mode tc|tt|hl|ad|off> <bot iterations> [out.json] [careful 0|1]
   tc = escape seeker (gathers every prep step, goes when the odds word is Năm ăn năm thua or better, or after 18 months);
   tt = lover seeker (picks a man, meets him whenever possible, follows him out when he promises);
   hl = legal exit (asks Thái hậu, then any legal exit card that opens); ad = quiet life; off = no route acts (control).
   careful=0: goes as soon as any escape card is open. Needs zz-test.html at the repo root.
   Prints per mode: lives, lives where «Lối riêng» opened, route starts, attempts, successes, caught, endings, counters (window.__rtN). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.resolve(__dirname,'../..');const [,,MODE,ITER,OUT,CAREFUL]=process.argv;
const MT={html:'text/html',js:'text/javascript',json:'application/json'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})});
 const p=await ctx.newPage();p.setDefaultTimeout(900000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('http://game.local/zz-test.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0});
 let INP=fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8');if(MODE==='ad')INP=INP.split('rvBtns(i).forEach').join('rvBtns(i).filter(k=>!(S.rt&&S.rt.ad&&S.rt.ad.on&&RT_HARM.includes(k))).forEach');/* a quiet-life player does not scheme */
 await p.evaluate(INP);
 await p.evaluate(([mode,careful])=>{window.__rtL=[];const rec=(cut)=>{try{if(!S||(typeof isSrv==='function'&&isSrv()))return;const T=S.rt||{};window.__rtL.push({open:!!T.open,ends:(T.ends||[]).slice(),y:+(S.turn/12).toFixed(2),cut:!!cut,fate:S.fate||"",ad:T.ad?{on:T.ad.on,harm:T.ad.harm||0,m:S.turn-T.ad.since,duc:S.duc}:null})}catch(e){}};
  const o0=over;over=function(){rec(false);return o0.apply(this,arguments)};const s0=start;start=function(){try{if(S&&!S.dead&&S.turn>0)rec(true)}catch(e){}return s0.apply(this,arguments)};
  const PRI={tc:["tc0","tc_guard","tc_maid","tc_home","tc_route","tc_pass","tc_cloth","tc_drug"],tt:null,hl:["hl_plead","hl_tu","hl_hon","hl_que","hl_phe"],ad:["ad0","ad_kinh","ad_che"]};
  /* __rtGo is on ONLY while the route policy looks at the deck; it is off again before act() runs, so nested time steps (nextBuoi inside
     act) and the inpage6 sensible bot never see «Lối riêng» cards (old bug: the sens bot started ẩn dật / tư tình in other modes) */
  const go=a=>{const i=deck.indexOf(a);if(i<0)return;window.__rtGo=0;window.__rtActs=(window.__rtActs||0)+1;window.__rtAct=1;try{act(i)}finally{window.__rtAct=0}if(typeof rtStat==='function')rtStat('bot_'+String(a.rtId).replace(/\d+$/,''))};
  const ok=a=>a&&a.rt&&!a.lock&&!a.done&&can(cardCost(a))&&canPay(a);
  window.__rtPol=()=>{if(mode==='off'||!S||S.dead||Q.length||(typeof isSrv==='function'&&isSrv()))return;if(window.__rtIn)return;window.__rtIn=1;try{pol()}finally{window.__rtIn=0;window.__rtGo=0;try{if(S&&!S.dead)rtRefresh()}catch(e){}}};
  const pol=()=>{for(let g=0;g<4;g++){window.__rtGo=1;rtRefresh();const C=deck.filter(ok);window.__rtGo=0;if(!C.length)return;let a=null;
   const T=S.rt||{};const P=(T.tc&&T.tc.prep)||{};const prepN=Object.keys(P).length;
   if(mode==='tc'||mode==='tt'){const goes=C.filter(x=>/^tcgo_/.test(x.rtId));const best=goes.sort((x,y)=>y.o-x.o)[0];const wait=T.tc&&S.turn-T.tc.since>=18;
    if(best&&(careful==='0'||best.o>=46||wait||(best.rtId==='tcgo_doan'&&best.o>=38)))a=best}
   if(!a&&mode==='tt'){a=C.find(x=>/^tt0m/.test(x.rtId))||C.find(x=>x.rtId==='tt3')||C.find(x=>x.rtId==='tt2')||C.find(x=>x.rtId==='tt1')||C.find(x=>x.rtId==='ttord')||C.find(x=>PRI.tc.includes(x.rtId)&&T.tc)}
   if(!a&&PRI[mode])for(const id of PRI[mode]){a=C.find(x=>x.rtId===id);if(a)break}
   if(!a&&mode==='tc'&&T.tc&&prepN>=4&&careful!=='0'){}
   if(!a)return;go(a);for(let k=0;k<20&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length){const i=(L=>L.length?L[Math.floor(Math.random()*L.length)]:0)(m.opts.map((c,i)=>c.off?-1:i).filter(i=>i>=0));try{chooseM(i)}catch(e){Q.shift()}}else closeModal()}}};
  /* a quiet-life player does not scheme */
  if(mode==='ad'){const d0=doAct;doAct=function(i,k){if(S&&S.rt&&S.rt.ad&&S.rt.ad.on&&RT_HARM.includes(k)){if(can(2))spend(2);return}return d0.apply(this,arguments)}}/* she stays in instead of scheming (time still passes, so the bot is not stuck) */
  const nb=nextBuoi;nextBuoi=function(){const r=nb.apply(this,arguments);try{window.__rtPol()}catch(e){}return r}},[MODE||'tc',CAREFUL==null?'1':CAREFUL]);
 const N=+ITER||20000;for(let i=0;i<N;i+=500){await p.evaluate(()=>window.__bot.step('sens',500))}
 const r=await p.evaluate(()=>{const L=window.__rtL.slice();const E={};L.forEach(x=>x.ends.forEach(e=>E[e]=(E[e]||0)+1));
  return{lives:L.length,full:L.filter(x=>!x.cut).length,years:+L.reduce((s,x)=>s+x.y,0).toFixed(1),opened:L.filter(x=>x.open).length,ends:E,n:window.__rtN||{},acts:window.__rtActs||0,bad:window.__bad.slice(0,5),ad:L.filter(x=>x.ad).map(x=>x.ad).slice(0,15)}});
 r.mode=MODE;r.careful=CAREFUL;r.errs=errs.slice(0,8);console.log(JSON.stringify(r));if(OUT)fs.writeFileSync(OUT,JSON.stringify(r));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
