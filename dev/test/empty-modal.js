/* empty-modal (MAIN 167, WORKLIST_OPEN row 38; found on LIVE 4cfcda61 by Foreman B: «Hội phối đồ: báo đề» modal stays up with an EMPTY queue, Fold, no way out)
   node dev/test/empty-modal.js [dev/index.html] [shotdir]
   Whole family = every dialog of the ONE queue dialog (#modal, j3 showModal) that can end up with nothing to press:
     A  the shown card is pulled out of Q by the buổi spread (jspread sp13Plan) → modal must follow Q (close, or show the next card)
     B  the shown card is removed from Q by any other code (splice / filter / Q=[]), then the board re-renders → modal must follow Q
     C  a card whose option list is EMPTY (opts: []) → kit empty line + a working «Đã rõ» close
     D  a card whose options are ALL disabled → the same kit empty line + «Đã rõ»
   Each case: Fold 755x1000 + iPad 1180x820; PASS = after the case the screen is free (modal hidden or showing Q[0] with a pressable button), and «Đã rõ» closes. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);const SHOT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:SHOT?2:1})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tsDressAnnounce==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0});await p.waitForTimeout(7000);
  const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.parentNode&&e.parentNode.removeChild(e));Q.length=0;try{showModal()}catch(e){}});
  const st=()=>p.evaluate(()=>{const M=document.getElementById('modal');const vis=!!(M&&!M.hidden);const btn=vis?[...M.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.disabled).map(b=>(b.textContent||'').trim().slice(0,20)):[];
   return{vis,q:Q.length,t:vis?(document.getElementById('mt')||{}).textContent:'',btn,empty:!!(vis&&M.querySelector('.kempty,.kmempty')),kt:(()=>{const e=vis&&M.querySelector('.kempty-t');if(!e)return null;const k=e.closest('.kempty'),r=e.getBoundingClientRect();return{w:Math.round(r.width),lines:Math.round(r.height/parseFloat(getComputedStyle(e).lineHeight||18)),kw:Math.round(k.getBoundingClientRect().width),cols:getComputedStyle(k).gridTemplateColumns.split(' ').length}})()}});
  const shut=async()=>{await p.evaluate(()=>{const M=document.getElementById('modal');const b=[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled&&/^(Đã rõ|✕)$/.test((b.textContent||'').trim()));if(b)b.click()})};
  const free=s=>!s.vis||(s.q>0&&s.btn.length>0);
  /* A: the buổi spread pulls the shown card (a fresh card, not planned yet) */
  await clean();await p.evaluate(()=>{S.buoi=2;tsDressAnnounce();showModal();try{sp13Plan()}catch(e){}try{render()}catch(e){}});await p.waitForTimeout(500);
  let s=await st();ok(free(s),`${tag} A: spread pulls the shown «Hội phối đồ: báo đề» → the modal follows the queue`,s);
  /* B: any code removes the shown card from Q, then a render */
  await clean();await p.evaluate(()=>{tsDressAnnounce();showModal();Q.length=0;try{render()}catch(e){}});await p.waitForTimeout(500);
  s=await st();ok(free(s),`${tag} B: shown card removed from Q (any code) → modal follows Q after a render`,s);
  /* C: empty option list */
  await clean();await p.evaluate(()=>{Q.push({t:"Hội phối đồ: báo đề",h:"<p>Thử danh sách rỗng.</p>",opts:[]});showModal()});await p.waitForTimeout(500);
  s=await st();ok(s.vis&&s.empty&&s.btn.some(t=>/Đã rõ|✕/.test(t)),`${tag} C: empty option list → kit empty line + a close («Đã rõ» / ✕)`,s);
  ok(s.kt&&s.kt.w>=200&&s.kt.lines<=2&&s.kt.cols===1,`${tag} C: kitEmpty title in a narrow host is readable (RV-172: ≥200 px wide, ≤2 lines, one column; was 100 px / 4 lines)`,s.kt);
  if(SHOT)await p.screenshot({path:path.join(SHOT,`empty-modal-${tag}.png`)});
  if(s.btn.length){await shut();await p.waitForTimeout(400);s=await st();ok(!s.vis&&s.q===0,`${tag} C: the close closes it`,s)}
  /* D: every option disabled */
  await clean();await p.evaluate(()=>{Q.push({t:"Thử",h:"<p>Mọi lựa chọn đều khóa.</p>",opts:[{n:"Một",off:1,go:()=>0},{n:"Hai",off:1,go:()=>0}]});showModal()});await p.waitForTimeout(500);
  s=await st();ok(s.vis&&s.empty&&s.btn.some(t=>/Đã rõ|✕/.test(t)),`${tag} D: every option disabled → kit empty line + a close`,s);
  ok(s.kt&&s.kt.w>=200&&s.kt.lines<=2&&s.kt.cols===1,`${tag} D: kitEmpty title in a narrow host is readable (RV-172: ≥200 px wide, ≤2 lines, one column; was 100 px / 4 lines)`,s.kt);
  if(s.btn.length){await shut();await p.waitForTimeout(400);s=await st();ok(!s.vis,`${tag} D: the close closes it`,s)}
  /* normal card unchanged: options, no extra close */
  await clean();await p.evaluate(()=>{tsDressAnnounce();showModal()});await p.waitForTimeout(500);s=await st();ok(s.vis&&!s.empty&&!s.btn.some(t=>/^Đã rõ$/.test(t)),`${tag}: a normal card keeps its options only`,s);
  ok(!errs.length,`${tag}: no page errors`,errs.slice(0,3));await p.close()}
 const n=res.filter(x=>x).length;console.log(res.every(x=>x)?`PASS ${n}`:`FAIL ${res.length-n}/${res.length}`);await b.close()})();
