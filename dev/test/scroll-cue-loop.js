/* scroll-cue-loop (B FIXER coop-freeze-kmrew, 26/11): the ~1 h page freeze (Fold seats only: seed 56 Fold host buổi 61 ×4, U1d Fold guest buổi 73 ×4,
   XCWQ / YRTC / F33E Fold host buổi 61) — V8 CPU-profiler trace of the wedged page, 2 of 2 rooms (LIVE 5e013076 + u4): ~95 % of samples in
   MutationObserver(childList) → kitScrollCues (jksize) = an endless MICROTASK loop, the page never yields again.
   Root: a scroller's own cue was found with ":scope > .kscue", which ALSO matches the «Kéo xuống» SIBLING strip (.kscue.sib) a SHORT child
   scroller puts right after itself. Outer scroller P (short, with its observer from an earlier tall pass) removed the child's strip as «its
   own cue» → the child re-created it → P's observer ran the pass again → removed it … for ever (only where both scrollers are < 260 px:
   the Fold viewport on a few dialogs). ONE RULE (jksize kscueOwn / kitScrollCuesSoon, merged with F10 26/11): a scroller only ever touches ITS OWN cue (never another
   scroller's strip), and an observer callback never re-runs the pass inside the same task (one coalesced pass per frame).
   This test builds that nesting inside the real #modal frame and runs the real kitScrollCues; bounded: every wait has a timeout, a hang = FAIL.
   usage: node dev/test/scroll-cue-loop.js [index.html] [WxH]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const [,,U0,VP]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
const URL=/^(https?|file):/.test(U0||'')?U0:'file://'+path.resolve(U0||'index.html');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const WD=setTimeout(()=>{console.log(JSON.stringify({vp:VP||'755x1000',result:'HANG (page never answered: endless loop)'}));console.log('FAIL');process.exit(1)},60000);const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitScrollCues==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}});
 await sleep(1500);
 const setup=await p.evaluate(()=>{document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}
  const M=document.getElementById('modal');M.hidden=false;M.innerHTML='<div class="dlg" style="display:block;max-height:none"><div id="tP" style="overflow-y:auto;height:340px"><div id="tE" style="overflow-y:auto;height:160px"><div style="height:900px">inner</div></div><p style="height:600px">outer text</p></div></div>';
  kitScrollCues();/* P tall (340) + E short (160): P gets its cue + observer, E gets its sibling strip inside P */
  const P=document.getElementById('tP');return{pObs:!!P.__kscl,sib:!!document.querySelector('#tP > .kscue.sib')}});
 /* the Fold shape: P becomes short too (both < 260 px) */
 const t0=Date.now();const r=await Promise.race([p.evaluate(()=>{document.getElementById('tP').style.height='220px';kitScrollCues();return new Promise(res=>setTimeout(()=>res('settled'),300))}).catch(e=>'CRASH '+e.message.slice(0,60)),sleep(8000).then(()=>'HANG')]);
 const alive=r!=='settled'?'HANG':await Promise.race([p.evaluate(()=>{const P=document.getElementById('tP');return{sibs:document.querySelectorAll('#tP > .kscue.sib').length,ownCue:P.querySelectorAll(':scope > .kscue:not(.sib)').length}}),sleep(5000).then(()=>'HANG')]);
 /* BIG rv (26/11): a loop moved to one pass per FRAME is still a loop (CPU forever): once settled, no pass may run for 2 s */
 const idle=alive==='HANG'?'HANG':await Promise.race([p.evaluate(()=>new Promise(res=>{let n=0;const f=window.kitScrollCues;window.kitScrollCues=kitScrollCues=function(){n++;return f.apply(this,arguments)};setTimeout(()=>{window.kitScrollCues=kitScrollCues=f;res(n)},2000)})),sleep(6000).then(()=>'HANG')]);
 const ok=setup.pObs&&setup.sib&&r==='settled'&&alive!=='HANG'&&alive.sibs===1&&idle===0&&!errs.length;
 console.log(JSON.stringify({vp:VP||'755x1000',setup,result:r,ms:Date.now()-t0,after:alive,passesWhenSettled:idle,errs:errs.slice(0,3)}));console.log(ok?'PASS':'FAIL');
 setTimeout(()=>process.exit(ok?0:1),3000);await b.close().catch(()=>{});process.exit(ok?0:1)})();
