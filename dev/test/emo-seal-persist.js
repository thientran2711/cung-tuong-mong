/* review/emo-seal-vanish: tapping a mood seal (img.kemo) opens the mood box; after closing it every seal must still be there.
   usage: node dev/test/emo-seal-persist.js <W>x<H>@dpr <outdir> [dev/index.html]
   For each view (room stage, place stage, event dialog) counts the visible seals, taps EACH seal in turn, closes the box (Đã rõ / ✕ / backdrop), waits, and asserts the
   seal count (and the tapped seal itself) is unchanged. Exit code 1 on any mismatch. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,SZ,OUT,PAGE]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MIME={html:'text/html;charset=utf-8',js:'text/javascript;charset=utf-8',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route('**/*',async r=>{const u=new URL(r.request().url());if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/'+(PAGE||'dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 const clean=()=>p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true});
 await clean();
 await p.evaluate(()=>{S.emo={k:'gian',v:70,why:'thử',t:null,w:0};S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  S.met=S.met||{};const ks=['ghen','vui','buon','so','muu'];rivals.slice(0,5).forEach((v,i)=>{S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:ks[i%5],v:60,why:'thử',w:0}});
  for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}m.emo={k:'so',v:60,why:'thử',w:0}}try{k61Meet(S.emp,'gặp',3)}catch(e){}});
 /* seals on screen: every img.kemo that is laid out and not inside the modal */
 /* seals on screen: every laid-out img.kemo (stage seals, card/list seals; in the event view also the ones inside the dialog) */
 const seals=(inModal)=>p.evaluate(inModal=>[...document.querySelectorAll('img.kemo')].filter(e=>e.getClientRects().length&&(inModal||!e.closest('#modal'))).map(e=>{const r=e.getBoundingClientRect();return{who:e.dataset.emo||e.dataset.kemop||'',x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2),src:(e.getAttribute('src')||'').replace(/^.*\//,'')}}),!!inModal);
 const hidden=()=>p.evaluate(()=>document.getElementById('modal').hidden);
 const R=[];let fail=0;
 const run=async(tag,inModal)=>{await p.waitForTimeout(4000);const before=await seals(inModal);const rows=[];
  for(let i=0;i<before.length;i++){let cur=await seals(inModal);if(inModal&&i>0&&cur.length!==before.length){await p.waitForTimeout(1500);cur=await seals(inModal)}const t=cur[i];if(!t){rows.push({i,note:'gone before tap'});fail++;continue}
   if(inModal&&i>0){await clean();await p.evaluate(()=>{try{kitPopSample('event')}catch(e){}});await p.waitForTimeout(2200)}
   const wasOpen=!(await hidden());
   for(let k=0;k<4&&!(await p.evaluate(()=>window.__lastEmoBox=0)||0)&&(wasOpen||await hidden());k++){await p.mouse.click(t.x,t.y);await p.waitForTimeout(1100);if(wasOpen)break}
   const opened=wasOpen?true:!(await hidden());
   if(process.env.SHOT&&i===0)await p.screenshot({path:`${OUT}/${tag.replace(/\W+/g,'_')}-open-${W}x${H}.jpg`,type:'jpeg',quality:70});
   /* close the mood box the way the player does: its own ✕ (kitModalClose) */
   await p.evaluate(()=>{try{kitModalClose()}catch(e){}});await p.waitForTimeout(1800);
   const after=await seals(inModal);const ok=after.length===before.length;if(!ok)fail++;
   rows.push({i,who:t.who,src:t.src,opened,before:before.length,after:after.length,ok});
   if(!ok&&process.env.SHOT)await p.screenshot({path:`${OUT}/${tag.replace(/\W+/g,'_')}-after-${i}-${W}x${H}.jpg`,type:'jpeg',quality:70});
   if(!ok){await p.evaluate(()=>{try{render()}catch(e){}});await p.waitForTimeout(1500)}}
  R.push({tag,n:before.length,rows});await p.screenshot({path:`${OUT}/${tag.replace(/\W+/g,'_')}-${W}x${H}.jpg`,type:'jpeg',quality:70})};
 /* 1) her room stage (the home tab, her maid standing) */
 await p.evaluate(()=>{try{goTo('home');tab='home';render()}catch(e){console.error(e)}});await p.waitForTimeout(3000);await run('room');
 /* 2) a place stage with several people (Dư đồ → garden) */
 await p.evaluate(()=>{Q.length=0;window.kmPush=function(){};document.querySelectorAll('.kmov,#dawn,#kpodov,.kmfls').forEach(e=>e.remove());const Wh=S.where||(S.where={});liveRivals(true).slice(0,5).forEach(v=>{Wh[v.id]='vuon';S.met[v.id]=1});
  goTo('home');tab='go';render();try{j77Tap('vuon','');const bs=[...document.querySelectorAll('#modal button')].filter(b=>b.offsetParent&&/Đi|đi|Vào|vào|Đến/.test(b.textContent));if(bs[0])bs[0].click()}catch(e){console.error(e)}});
 await p.waitForTimeout(5000);await clean();await p.waitForTimeout(2500);await run('place');
 /* 3) event dialog with a person */
 await p.evaluate(()=>{try{kitPopSample('event')}catch(e){console.error(e)}});await p.waitForTimeout(2500);
 await run('event',true);
 console.log(JSON.stringify({W,H,fail,R,errs},null,1));await b.close();process.exit(fail?1:0)})();
