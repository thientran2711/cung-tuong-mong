/* E95r reviewer probe: REAL taps (page.mouse at the element centre / an outside point found by elementFromPoint, real keyboard Escape)
   during «Hướng dẫn» — callers incl. ones NOT in mghelp-back.js (j83 practice, jrcp teacher, jveil craft, lessons). node probe.js dev/index.html WxH [shotdir] */
const {chromium}=require('playwright');const path=require('path');
const URL='file://'+path.resolve(process.argv[2]);const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SHOT=process.argv[4]||'';
const out=[];let bad=0;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:SHOT?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  window.__clean=()=>{document.querySelectorAll('body>*>.kmst').forEach(e=>e.parentElement.remove());document.querySelectorAll('#klife,#kmrew').forEach(e=>e.remove())};
  const AMB=['pcx','log','logs','logSeq','stat','emp','where','roster','tb','knw','visit','emoSeen','mg'];
  window.__SJ=()=>{const o=Object.assign({},S);AMB.forEach(k=>delete o[k]);return JSON.stringify(o)};
  window.__pick=async(i)=>{await new Promise(r=>setTimeout(r,200));const m=Q[0];if(!m||!m.opts)return false;const ix=typeof i==='function'?m.opts.findIndex(i):i;if(ix<0)return false;chooseM(ix);await new Promise(r=>setTimeout(r,250));return true};
  window.__tile=async()=>{await new Promise(r=>setTimeout(r,250));const t=[...document.querySelectorAll('#modal [data-kwrgo]')].find(x=>!x.disabled);if(t){t.click();await new Promise(r=>setTimeout(r,300))}return !!t};
  window.__vis=sel=>{const L=[...document.querySelectorAll(sel)].filter(x=>x.offsetParent);const e=L[0];if(!e)return null;e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,top:document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)===e||e.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2))}};
  window.__outPt=()=>{const M=document.getElementById('modal');const t=KG82.tut&&KG82.tut.el;const L=(M&&!M.hidden&&t&&M.contains(t))?M:document.getElementById('ov');
   for(let y=4;y<innerHeight;y+=12)for(let x=4;x<innerWidth;x+=12){if(document.elementFromPoint(x,y)===L)return {x,y,L:L.id}}return null};
  window.__state=()=>({tut:!!KG82.tut,rules:!!__vis('.kgr-go'),tutBtn:!!__vis('#kgrtut'),frame:!!(document.getElementById('kg82')||document.querySelector('#modal:not([hidden]) .kgame')),res:(()=>{const rs=document.getElementById('kg82box-res');return !!(rs&&!rs.hidden&&rs.innerHTML.length>0)})(),phase:KG82.phase,payOnGo:!!KG82.payOnGo,txt:(document.querySelector('#kg82box')||{}).innerText?.slice(0,80)});
 });
 await p.waitForTimeout(2500);
 const D='(x)=>(window.__done=window.__done||[]).push(x===undefined?"cb":x)';
 const C=[
  ['jexam khảo hạch (owner case)',`(window.__E={},exRun(exPlan(S),window.__E,${D}))`,null,()=>{}],
  ['j83 Tự học wkPractice (NOT in list)',`(S.arts[ARTS[0].k]=5,wkPractice(ARTS[0].k))`,'(async()=>{await __tile();await __pick(1)})()'],
  ['j83 lessonMode self (NOT in list)',`(S.arts[ARTS[1].k]=1,lessonMode(ARTS[1].k,"self"))`,'(async()=>{await __tile();await __pick(1)})()'],
  ['jrcp học với thầy (NOT in list)',`(S.arts[ARTS[2].k]=1,lessonMode(ARTS[2].k,"teacher"))`,'(async()=>{await __pick(0);await __tile();await __pick(1)})()'],
  ['jveil kết mạng (NOT in list)',`(()=>{const d=mkP("vlcraft",{});pushDil(d,"Kết mạng che mặt");showModal()})()`,'(async()=>{await __pick(o=>/dây bạc/i.test(o.n)||!!(o.fx&&o.fx.bac))})()'],
  ['jpetcare Chăm thú (dialog)',`(S.petTip=1,S.rank=3,S.pets=[],petAdd(S,'meo','x','buy'),S.petOn=0,Q.length=0,document.getElementById('modal').hidden=true,petcOpen(0))`,`(()=>{const b=[...document.querySelectorAll('#kpcare button')].find(x=>x.offsetParent&&/Cho ăn|Tắm|Chơi|Vuốt/.test(x.textContent));if(b)b.click()})()`],
 ];
 const PATHS=['xtap','esc','outside'];
 for(const [label,src,pre] of C){for(const pa of PATHS){const r={label,pa};try{
   await p.evaluate(()=>{__clean();S.ap=9;S.suc=100;S.bac=999;try{used=0}catch(e){}window.__done=[];Q.length=0;S.mg=null;window.__aaPend=null});
   await p.evaluate(s=>{(0,eval)(s)},src);await p.waitForTimeout(1300);if(pre){await p.evaluate(s=>(0,eval)(s),pre);await p.waitForTimeout(900)}
   const s0=await p.evaluate(()=>__SJ());r.before=await p.evaluate(()=>__state());
   const tb=await p.evaluate(()=>__vis('#kgrtut'));if(!tb){r.err='no Hướng dẫn';throw 0}
   await p.mouse.click(tb.x,tb.y);await p.waitForTimeout(1600);r.tutOn=await p.evaluate(()=>!!KG82.tut);
   if(SHOT&&pa==='xtap')await p.screenshot({path:`${SHOT}/${label.split(' ')[0]}-tut-${VW}.png`});
   if(pa==='xtap'){const x=await p.evaluate(()=>{const t=KG82.tut&&KG82.tut.el;const M=document.getElementById('modal');const inM=M&&!M.hidden&&t&&M.contains(t);
      const L=[...document.querySelectorAll(inM?'#modal .kit-x,#modal #mclose':'#kg82 .kit-x[data-kitx=kgback]')].filter(e=>e.offsetParent&&(!inM||!(t&&t.contains(e))));const e=L[0];if(!e)return null;const q=e.getBoundingClientRect();
      const cx=q.left+q.width/2,cy=q.top+q.height/2,h=document.elementFromPoint(cx,cy);return {x:cx,y:cy,hit:h===e||e.contains(h),hitCls:h&&(h.id||h.className)}});
     r.x=x;if(!x){r.err='no ✕';throw 0}await p.mouse.click(x.x,x.y)}
   else if(pa==='esc'){await p.keyboard.press('Escape')}
   else{const o=await p.evaluate(()=>__outPt());r.out=o;if(!o){r.err='no outside point (frame fills the screen)';r.na=1;throw 0}await p.mouse.click(o.x,o.y)}
   await p.waitForTimeout(1000);r.after=await p.evaluate(()=>__state());r.done=await p.evaluate(()=>window.__done.length);r.Ssame=(await p.evaluate(()=>__SJ()))===s0;
   r.raws=await p.evaluate(()=>JSON.stringify(((window.__E||{}).pend||{}).raws||null));
   if(SHOT&&pa==='xtap')await p.screenshot({path:`${SHOT}/${label.split(' ')[0]}-back-${VW}.png`});
   const a=r.after;r.ok=r.tutOn&&!a.tut&&a.rules&&a.tutBtn&&a.frame&&!a.res&&!r.done&&r.Ssame&&a.payOnGo===r.before.payOnGo;
   /* then «Sẵn sàng» by real tap still starts the real round */
   const go=await p.evaluate(()=>__vis('.kgr-go'));if(go&&r.ok){await p.mouse.click(go.x,go.y);await p.waitForTimeout(1300);r.playAfter=await p.evaluate(()=>KG82.phase||(typeof PETC!=='undefined'&&PETC.rdy?'petc':'?'))}
  }catch(e){if(e!==0)r.err=String(e&&e.message||e).slice(0,200)}
  await p.evaluate(()=>{try{kg82Close()}catch(e){}try{const M=document.getElementById('modal');if(M&&!M.hidden){Q.length=0;closeModal()}}catch(e){}__clean()});await p.waitForTimeout(300);
  if(!r.ok&&!r.na)bad++;out.push(r);console.log((r.ok?'ok  ':r.na?'n/a ':'FAIL')+` ${label} · ${pa}`+(r.ok?` → rules back, play after: ${r.playAfter}`:' '+JSON.stringify(r)))}}
 console.log('page errors:',errs.length,errs.slice(0,3));console.log(bad?`PROBE FAIL ${bad}`:'PROBE PASS');await b.close();process.exit(bad?1:0)})();
