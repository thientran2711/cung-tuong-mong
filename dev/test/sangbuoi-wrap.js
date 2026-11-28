/* review/sangbuoi-held-fix r2 — a solo «Sang buổi» TAP runs every nextBuoi wrapper, exactly like the khắc-spent auto-advance (LAW 11 family).
   Before r2: j6 wired #next to the BARE j9 nextBuoi (before any module wrapped it), so a solo tap with khắc left skipped every wrapper
   (jdayq hold, j41 stay-in-place, j68 evRelease, jspread, jagent agDrain, jky npcPass, jexam/jpromo/jerr ticks …).
   How: the served index.html is instrumented in memory — every nextBuoi wrapper entry (and the j9 base) gets a counter __nbw(id); the
   id → file:line map is built from dev/build in assemble order (counts must match). Effect probes: global functions the wrappers call
   (evRelease, agDrain, npcPass, exTick, …) are spied. Cases per viewport (Fold 755x1000, iPad 1180x820), real taps:
   T  quiet buổi trưa, khắc left, Q empty → real tap on «Sang buổi» → the buổi advances; wrapper set + effect counts recorded
   U  next quiet buổi, khắc spent → the auto-advance (j6 render) → wrapper set + effect counts recorded
   assert: T wrappers ⊇ U wrappers (no wrapper the auto-advance runs is skipped by a tap), T effects ⊇ U effects, T ran > 1 wrapper,
           window.__accStay was 1 inside goTo during the tap (j41: she stays where she is, no access check / etiquette on a plain turn),
           the tap ran the chain once (base j9 entered exactly once), no page errors.
   usage: node dev/test/sangbuoi-wrap.js http://127.0.0.1:PORT/index.html   (served from the worktree root; BEFORE=<file> serves that html instead) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const R=path.resolve(__dirname,'../..'),B=R+'/dev/build/';
/* ---- wrapper map from dev/build in assemble order ---- */
const asm=fs.readFileSync(B+'assemble.py','utf8');const list=JSON.parse(asm.match(/for f in (\[[^\]]+\])\)/)[1].replace(/'/g,'"'));
const extra=[...asm.matchAll(/cdn\('(j[a-z0-9]+\.js)',open/g)].map(m=>m[1]);
const PAT=[[/function nextBuoi\(\)\{/g,'1'],[/nextBuoi=function\(\)\{/g,'1'],[/window\[n\]=function\(\)\{/g,'typeof n!=="undefined"&&n==="nextBuoi"'],
 [/window\[name\]=function\(\)\{/g,'name==="nextBuoi"'],[/\("nextBuoi",\w+=>function\(\)\{/g,'1']];
const keep=(t,i,pi)=>{if(pi===2)return /"nextBuoi"/.test(t.slice(Math.max(0,i-400),i))||/function wrapF\(/.test(t.slice(Math.max(0,i-200),i));if(pi===3)return /function top\(name/.test(t.slice(Math.max(0,i-200),i));return true};
const ids=[];for(const f of list.concat(extra)){let t;try{t=fs.readFileSync(B+f,'utf8')}catch(e){continue}
 const hits=[];PAT.forEach(([re,c],pi)=>{for(const m of t.matchAll(re)){if(!keep(t,m.index,pi))continue;
   hits.push({i:m.index,id:f+':'+(t.slice(0,m.index).split('\n').length),pi})}});hits.sort((a,b)=>a.i-b.i);ids.push(...hits)}
function instrument(html){let k=0;const counts=PAT.map(()=>0);let out=html;
 /* walk the patterns in document order */
 const all=[];PAT.forEach(([re,c],pi)=>{for(const m of html.matchAll(re)){if(!keep(html,m.index,pi))continue;
   all.push({i:m.index,len:m[0].length,c,pi})}});all.sort((a,b)=>a.i-b.i);
 if(all.length!==ids.length)throw new Error(`wrapper count mismatch: index.html ${all.length} vs dev/build ${ids.length}`);
 for(let j=all.length-1;j>=0;j--){const a=all[j];if(ids[j].pi!==a.pi)throw new Error('pattern order mismatch at '+ids[j].id);
  out=out.slice(0,a.i+a.len)+`if(${a.c})__nbw(${j});`+out.slice(a.i+a.len)}
 return out.replace('<script>','<script>window.__NB=[];window.__nbw=j=>{window.__NB.push(j)};')}
const SPY=['evRelease','agDrain','npcPass','knTb','knCarryOut','exTick','exSrvTick','prCheck','prNpcScan','capSweep','errTick','errLedger','lkSweep','kycMark','intAll','wxSync',
 'stayRoll','ptTick','iwTick','sp13Tick','rtRefresh','rtNpcMeet','j95sync','thrify70','cbGreetTodo','pl67Lapse','rsnap','asTick','flip','menWatch','famSweep','curtain','rivalsBuoi','placeWhere'];
const VP=[[755,1000],[1180,820]];
(async()=>{const b=await chromium.launch();let fails=0;const rows=[];
 const src=process.env.BEFORE?fs.readFileSync(process.env.BEFORE,'utf8'):null;
 for(const [W,H] of VP){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:process.env.OUT?2:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.route(/\/index\.html(\?.*)?$/,async r=>{let html=src;if(!html){const res=await r.fetch();html=await res.text()}r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:instrument(html)})});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitModal&&window.DQ&&DQ.stat,null,{timeout:240000});await p.waitForTimeout(2500);
  await p.evaluate(S=>{window.__SPY={};for(const n of S){const f=window[n];if(typeof f!=='function')continue;window[n]=function(){if(window.__spyOn)window.__SPY[n]=(window.__SPY[n]||0)+1;return f.apply(this,arguments)}}
   const g=window.goTo;window.goTo=function(){if(window.__spyOn){const to=arguments[0];/* j41 checks access only for another place (not home, not where she is) */const chk=to&&to!=='home'&&to!==S.place;
    const k='goTo.'+(chk?'chk':'free')+'.accStay'+(window.__accStay?1:0)+'.silent'+(window.__accSilent?1:0);window.__SPY[k]=(window.__SPY[k]||0)+1;if(chk&&!window.__accStay&&!window.__accSilent)(window.__GT=window.__GT||[]).push(to+' '+new Error().stack.split('\n').slice(2,7).join('<'))}return g.apply(this,arguments)}},SPY);
  const st=()=>p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);return {bk:(typeof wk==='function'?wk():(S.turn||0))+'.'+(S.buoi||0),buoi:S.buoi||0,used,Q:Q.length,modal:!hid(document.getElementById('modal'))||!!(window.DF&&DF.F),scene:!!document.querySelector('.kmov:not(.km-out)'),next:!document.getElementById('next').disabled}});
  const tapAny=async()=>p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);
    const dw=document.getElementById('dawn');if(dw&&!hid(dw)&&dw.classList.contains('on')){const bt=[...dw.querySelectorAll('button')].find(b=>b.offsetParent);if(bt){bt.click();return 1}}
    const vc=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent)&&b.offsetParent);if(vc){vc.click();return 1}
    if(window.DF&&DF.F){const x=document.querySelector('.kfoc .kfoc-x');if(x){x.click();return 1}}
    const kx=document.getElementById('kxcatch');if(kx&&!hid(kx)){kx.click();return 1}
    const ov=document.getElementById('ov');if(ov&&!hid(ov)){const bs=[...ov.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled);const bb=bs.find(b=>/Bỏ qua/.test(b.textContent))||bs[0];if(bb){bb.click();return 1}}
    const kc=[...document.querySelectorAll('.kmov:not(.km-out) button,#kpodov button,#kmrew button')].find(b=>b.getClientRects().length&&!b.disabled);if(kc){kc.click();return 1}
    const ko=document.querySelector('.kmov:not(.km-out)');if(ko){ko.click();return 1}
    const M=document.getElementById('modal');if(M&&!hid(M)){const o=[...M.querySelectorAll('.opt:not([disabled])')];const th=o.find(b=>/^Thôi/.test(b.textContent.trim()));if(th){th.click();return 1}if(o.length){o[0].click();return 1}
     const c=M.querySelector('#mclose')||[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(c){c.click();return 1}}return 0});
  const drain=async(n=120)=>{let idle=0;for(let i=0;i<n&&idle<3;i++){if(await tapAny()){idle=0;await sleep(350)}else{idle++;await sleep(500)}}};
  const quiet=async()=>{for(let i=0;i<10;i++){await drain();const s=await st();if(!s.Q&&!s.modal&&!s.scene&&s.buoi>=1&&s.buoi<2)return s;
    await p.evaluate(()=>{try{used=BAL.time.khac;render()}catch(e){}});await sleep(3200)}return await st()};
  await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>document.querySelector('#modal:not([hidden]) [data-nl=ok]'),null,{timeout:60000});await sleep(600);
  await p.evaluate(()=>document.querySelector('#modal [data-nl=ok]').click());await sleep(800);
  const run=async(kind)=>{const s0=await quiet();if(s0.buoi!==1||s0.Q||s0.modal)return {err:'setup not quiet '+JSON.stringify(s0)};
    await p.evaluate(k=>{window.__NB.length=0;window.__SPY={};window.__spyOn=1;used=k==='tap'?0:BAL.time.khac;advLock=false;if(k==='tap')render()},kind);
    if(kind==='tap'){await sleep(300);if(!(await st()).next)return {err:'«Sang buổi» disabled'};await p.tap('#next',{force:true})}else await p.evaluate(()=>render());
    let adv=false;for(let i=0;i<60&&!adv;i++){await sleep(200);adv=(await st()).bk!==s0.bk}
    await sleep(600);const sEnd=await st();const r=await p.evaluate(()=>{window.__spyOn=0;return {nb:window.__NB.slice(),spy:Object.assign({},window.__SPY)}});r.adv=adv;r.st=Object.assign(sEnd,await p.evaluate(()=>({want:DQ.want,stat:DQ.stat,Qt:Q.map(m=>m.t)})));return r};
  /* a turn stopped by a card the world brought in the same moment is redone (the wrapper set is compared on a turn that really ran) */
  const run2=async k=>{let r;for(let i=0;i<3;i++){r=await run(k);if(!r.err&&r.adv)return r;await drain();if((await st()).buoi!==1)break}return r};
  const T=await run2('tap');await drain();const U=await run2('auto');
  /* P — a tap at a non-home place (Ngự hoa viên, buổi chiều → tối, where it closes): the auto-advance keeps her there (j41 __accStay, owner
     11/15 06:45Z «she STAYS where she is»); the bare tap re-entered the place through the access check («Không vào được lúc này» + home) */
  const P=await (async()=>{let why='';
    for(let at=0;at<8;at++){await drain();let s=await st();if(s.Q&&!s.modal&&s.next){await p.tap('#next',{force:true});await sleep(800);continue}/* a queue nobody painted: her tap paints it (r1) */
     if(s.buoi!==2||s.Q||s.modal||s.scene){why='not at a quiet buổi chiều '+JSON.stringify(s)+' Q0 '+JSON.stringify(await p.evaluate(()=>({t:Q.map(m=>m.t),net:DQ.stat.netTick,mt:DQ.mt})));if(s.buoi>2||s.buoi<1)break;await sleep(1500);continue}
     await p.evaluate(()=>{used=0;const a=window.__accSilent;window.__accSilent=1;window.__walkFree=1;try{goTo('vuon')}finally{window.__accSilent=a;window.__walkFree=0}});await sleep(1200);await drain();
     s=await st();const pl=await p.evaluate(()=>{used=0;advLock=false;render();return S.place});await sleep(300);s=await st();
     if(pl==='vuon'&&s.buoi===2&&s.next&&!s.Q&&!s.modal&&!s.scene){why='';break}why='not in Ngự hoa viên with «Sang buổi» free ('+pl+' '+JSON.stringify(s)+')'}
    if(why)return {err:'setup P: '+why};
    await p.evaluate(()=>{used=0;advLock=false;render();window.__SPY={};window.__spyOn=1;window.__mt=[];const M=document.getElementById('modal');
      window.__mo=new MutationObserver(()=>{const t=document.getElementById('mt');if(t&&!M.hidden)window.__mt.push(t.textContent+' | '+(M.textContent||'').slice(0,160))});window.__mo.observe(M,{attributes:true,childList:true,subtree:true})});
    await sleep(300);if(process.env.OUT)await p.screenshot({path:`${process.env.OUT}/${W}x${H}-P0-before-tap.jpg`,quality:70});
    await p.tap('#next',{force:true});const tapSpy=await p.evaluate(()=>Object.assign({},window.__SPY));if(process.env.OUT){await sleep(900);await p.screenshot({path:`${process.env.OUT}/${W}x${H}-P1-after-tap.jpg`,quality:70})}/* goTo inside HER tap only (later card choices may walk) */
    /* a card / scene the turn brings is tapped through like a player until the buổi has turned */
    for(let i=0;i<30&&(await st()).buoi===2;i++){await sleep(400);if((await st()).buoi===2)await tapAny()}await sleep(800);
    return await p.evaluate(()=>{window.__spyOn=0;window.__mo.disconnect();return {spy:Object.assign({},window.__SPY),mt:[...new Set(window.__mt)],place:S.place,buoi:S.buoi}}).then(r=>Object.assign(r,{tap:tapSpy}))})();
  if(P.err){fails++;rows.push(`${W}x${H} P: FAIL ${P.err}`)}else{const bad=[];if(P.tap['goTo.chk.accStay0.silent0'])bad.push('her tap re-entered the place through the access check (no __accStay / __accSilent)');if(!P.tap['goTo.free.accStay1.silent1']&&!P.tap['goTo.chk.accStay1.silent1'])bad.push('her tap never kept her in place (__accStay)');
   if(P.mt.some(x=>/Không vào được lúc này/.test(x)))bad.push('access-refused card on a plain turn');
   rows.push(`${W}x${H} P place after tap: ${P.place} buổi ${P.buoi} · in her tap: ${JSON.stringify(Object.fromEntries(Object.entries(P.tap).filter(([k])=>/goTo/.test(k))))} · cards ${JSON.stringify(P.mt.map(x=>x.slice(0,90)))}`);
   rows.push(`${W}x${H} P: ${bad.length?'FAIL '+bad.join(' · ')+' '+JSON.stringify(await p.evaluate(()=>window.__GT||[])):'PASS'}`);if(bad.length)fails++}
  const name=j=>ids[j].id;const set=a=>[...new Set(a.nb)].sort((x,y)=>x-y);
  for(const [k,r] of [['T tap',T],['U auto',U]]){if(r.err){fails++;rows.push(`${W}x${H} ${k}: FAIL ${r.err}`);continue}}
  if(!T.err&&!U.err){const tS=set(T),uS=set(U);const miss=uS.filter(j=>!tS.includes(j)).map(name);/* effects every turn runs (the others depend on the moment: thrify70 only with cards in Q, …) */
   const ALWAYS=['agDrain','evRelease','knCarryOut','rsnap','intAll','sp13Tick','ptTick','iwTick','lkSweep','rtRefresh','prNpcScan','exTick','exSrvTick','prCheck','wxSync','j95sync','rivalsBuoi','placeWhere','curtain'];
   const effMiss=ALWAYS.filter(n=>U.spy[n]&&!T.spy[n]);
   const base=T.nb.filter(j=>ids[j].pi===0).length;
   const res=[];if(!T.adv)res.push('tap did not advance the buổi');if(!U.adv)res.push('auto-advance did not run '+JSON.stringify(U.st));if(miss.length)res.push('tap skipped wrappers: '+miss.join(' '));
   if(effMiss.length)res.push('tap skipped effects: '+effMiss.join(' '));if(tS.length<2)res.push('tap ran only the bare j9 nextBuoi');if(base!==1)res.push('j9 base entered '+base+'×');
   if(T.spy['goTo.accStay0'])res.push('goTo ran WITHOUT __accStay during the tap (j41 stay-in-place skipped)');
   rows.push(`${W}x${H} tap: ${tS.length}/${ids.length} wrapper entries, auto: ${uS.length}; effects tap ${JSON.stringify(T.spy)} | auto ${JSON.stringify(U.spy)}`);
   rows.push(`${W}x${H} T/U: ${res.length?'FAIL '+res.join(' · '):'PASS'}`);if(res.length)fails++;
   if(process.env.LIST)rows.push('tap set: '+tS.map(name).join(' '))}
  if(errs.length){fails++;rows.push(`${W}x${H} page errors: ${errs.slice(0,3).join(' | ')}`)}
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
