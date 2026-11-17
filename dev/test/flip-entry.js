/* review/flip-entry (owner bug 16/11 ~20:58Z): the card-flip (Kính sự phòng lật thẻ) must NEVER open on entry — new game (each origin),
   new life (Luân hồi), loading a save, tutorial start; it may open only when buổi tối starts (OD 14:00Z (4)).
   Each case: enter → close every entry card (identity, Nhập cung …) → wait → no .kmov.kcf, no card-flip queued (__cfdbg 'push'), no
   Kính sự phòng summons (pid ksp) in the queue, tonight not decided yet; then walk the day to buổi tối → the flip runs there (nightWhy of today).
   usage: node dev/test/flip-entry.js <url> [W]x[H]@dpr → lines + "ALL OK" / "FAIL n"  (co-op entry: dev/test/coop-e2e.js) */
const {chromium}=require('playwright');
const [,,URL,SZ]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof ORIGINS!=='undefined',null,{timeout:0});await p.waitForTimeout(2500);
 let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info?' · '+JSON.stringify(info).slice(0,260):''))};
 /* accept the identity card (skip the Luân hồi roulette first) and close entry cards the way a player does (tap their first button) */
 const enter=async()=>{for(let i=0;i<60;i++){const st=await p.evaluate(()=>{const s=[...document.querySelectorAll('#kroul button,.kroul button')].find(x=>/Bỏ qua/.test(x.textContent)&&x.offsetParent);if(s){s.click();return 'roul'}
     const ok=document.querySelector('button[data-nl="ok"]');if(ok&&typeof NLP!=='undefined'&&NLP){ok.click();return 'nl'}return (typeof NLP!=='undefined'&&NLP)?'wait':'in'});
   if(st==='in')break;await p.waitForTimeout(250)}
  await p.waitForTimeout(800)};
 const closeCards=async()=>{for(let i=0;i<25;i++){const n=await p.evaluate(()=>{const m=document.getElementById('modal');if(!m||m.hidden)return 0;
     const ksp=(typeof Q!=='undefined'&&Q[0]&&Q[0].pid==='ksp');if(ksp)return -1;const bt=m.querySelector('.opts button:not([disabled]),button.kbtn:not([disabled]),button:not([disabled])');if(bt){bt.click();return 1}return 0});
   if(n<=0)break;await p.waitForTimeout(300)}};
 const state=()=>p.evaluate(()=>({kcf:document.querySelectorAll('.kmov.kcf').length,push:(window.__cfdbg||[]).filter(x=>/^push/.test(x)).length,
   ksp:(typeof Q!=='undefined'?Q:[]).some(e=>e&&e.pid==='ksp'),buoi:S.buoi||0,today:!!(typeof wk==='function'&&((S.nightWhy&&S.nightWhy.wk===wk())||S.nfF===wk())),tonight:S.tonight?(S.tonight==='me'?'me':'npc'):null,srv:typeof isSrv==='function'&&isSrv()}));
 const fresh=()=>p.evaluate(()=>{(window.__cfdbg||[]).length=0;document.querySelectorAll('.kmov').forEach(e=>e.remove());try{kmReset()}catch(e){}});
 const noFlip=async(label)=>{await p.waitForTimeout(3500);const s=await state();
   ck(label+': no card-flip on entry',s.kcf===0&&s.push===0&&!s.ksp&&!s.today,s);return s};
 const toEvening=async(label)=>{for(let i=0;i<6;i++){const s=await p.evaluate(()=>{try{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.mg=null}catch(e){}
     if((S.buoi||0)>=(typeof B4L==='number'?B4L:2))return 'tối';nextBuoi();return S.buoi});if(s==='tối')break;await p.waitForTimeout(400)}
   await p.waitForTimeout(800);const s=await state();
   if(!s.srv)ck(label+': at buổi tối the flip has run (today decided)',s.today||s.push>0,s);return s};
 /* 1. new game, each origin */
 const ks=await p.evaluate(()=>ORIGINS.map(o=>o.k));
 for(const k of ks){await fresh();await p.evaluate(k=>{window.__forceOrigin=k;try{$("title").hidden=true}catch(e){}start()},k);await enter();
   await closeCards();await noFlip('new game '+k);await toEvening('new game '+k)}
 /* 2. new life (Luân hồi) from inside a running game */
 await fresh();await p.evaluate(()=>{window.__forceOrigin=null;start()});await enter();await closeCards();await noFlip('new life');
 /* 3. load a save made in the morning of a new day (the old flip there is pending/decided by the saved state, never replayed) */
 await p.evaluate(()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}S.buoi=(typeof B4L==='number'?B4L:2);nextBuoi()});await closeCards();
 const sv=await p.evaluate(()=>JSON.stringify(ser()));await fresh();
 await p.evaluate(sv=>{deser(JSON.parse(sv));try{render()}catch(e){}},sv);await closeCards();
 {await p.waitForTimeout(3500);const s=await state();ck('load save: no card-flip on load',s.kcf===0&&s.push===0,s)}
 /* 4. tutorial start (if the game has one) */
 const tut=await p.evaluate(()=>typeof tutStart==='function'?'tutStart':typeof startTut==='function'?'startTut':null);
 if(tut){await fresh();await p.evaluate(f=>{try{window[f]()}catch(e){console.error(e)}},tut);await enter();await closeCards();await noFlip('tutorial')}
 else console.log('skip tutorial: no tutorial-start function (tutorial runs inside a normal new game: covered by case 1)');
 ck('no page errors',perr.length===0,perr);
 console.log(fail?'FAIL '+fail:'ALL OK');await b.close();process.exit(fail?1:0)})();
