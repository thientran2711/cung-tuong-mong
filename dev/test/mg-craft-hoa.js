/* mg-craft-hoa — node dev/test/mg-craft-hoa.js [dev/index.html] [WxH] [shotsDir]
   Cắm hoa «Chọn mùa · cắt cành · nghiêng thế» (jcraft_hoa.js, MG_CRAFTS §3):
   1 kind hoa runs the new engine (ikebana) from playArt; the rules screen shows (.kgr), «Sẵn sàng» starts it
   2 no text node in the play area (canvas only + the ✓ sign button); no page errors
   3 the oracle (KG82.peek) plays a whole round: raw 0–10, ≥ 9 at ease 5 (law 5: the same play scores lower at ease 0 through pace / tolerances: printed)
   4 a wrong flower wilts (season share falls); a swipe cuts, the stem seats and leans; ✓ judges; ✕ closes the board
   5 optional shots (Fold 755x1000@2 or iPad 1180x820@2): rules / pick / cut / seated / result into shotsDir (outside the repo) */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SH=process.argv[4];
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:SH?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 if(SH)await p.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('#klife').forEach(e=>e.remove())},60)});/* the first-load cover (jload lCover #klife) is not part of the shots */
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:60000,polling:200});
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;try{window.kitReward=function(){}}catch(e){}window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}
  window.__oracle=async(ease,opt)=>{opt=opt||{};const sleep=t=>new Promise(r=>setTimeout(r,t));const pe=(el,t,x,y)=>el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:3,isPrimary:true,bubbles:true,cancelable:true,buttons:t==='pointerup'?0:1}));
   const cv=()=>document.querySelector('#kg82box canvas');
   const drag=async D=>{const el=cv();pe(el,'pointerdown',D[0][0],D[0][1]);for(let i=1;i<D.length;i++){const n=8;for(let s=1;s<=n;s++){pe(el,'pointermove',D[i-1][0]+(D[i][0]-D[i-1][0])*s/n,D[i-1][1]+(D[i][1]-D[i-1][1])*s/n);await sleep(8)}}pe(el,'pointerup',D[D.length-1][0],D[D.length-1][1]);await sleep(60)};
   let raw=null,wrongDone=false;window.__trace=[];
   if(!opt.attach){KG82.lv=ease;KG82.ctx='hoc';kg82Play('hoa',v=>{raw=KG82.rawF})}else{while(KG82.phase!=='play')await sleep(30);const wf=()=>{if(KG82.phase==='play')setTimeout(wf,50);else raw=KG82.rawF!=null?KG82.rawF:0};setTimeout(wf,200)}
   const t0=Date.now();
   while(raw==null&&Date.now()-t0<90000){await sleep(30);if(KG82.phase!=='play')continue;const pk=KG82.peek&&KG82.peek();if(!pk)continue;
    if(opt.wrong&&!wrongDone&&pk.x!=null){wrongDone=true;/* tap a flower that is not the main one first */const cvr=cv().getBoundingClientRect();for(const [fx,fy] of [[.2,.5],[.5,.5],[.8,.5],[.2,.7],[.5,.7],[.8,.7]]){const x=cvr.left+fx*cvr.width,y=cvr.top+fy*cvr.height;if(Math.hypot(x-pk.x,y-pk.y)>cvr.width*.15){const el=cv();pe(el,'pointerdown',x,y);pe(el,'pointerup',x,y);break}}await sleep(100);continue}
    window.__trace.push(pk.drag?'drag':pk.sel?'sel':'tap');if(opt.pause&&opt.pause.includes(window.__trace.length)){window.__paused=window.__trace.length;while(window.__paused!=null)await sleep(30)}
    if(pk.drag)await drag(pk.drag);else if(pk.sel){document.querySelector(pk.sel).click();await sleep(100)}else if(pk.x!=null){const el=cv();pe(el,'pointerdown',pk.x,pk.y);pe(el,'pointerup',pk.x,pk.y);await sleep(100)}
}
   return{raw,trace:window.__trace.length,mode:window.__trace.slice(0,12).join(',')}}});
 /* 1 the rules screen from the contest caller (the plain art key "hoa" is Vẽ in playArt), then «Hướng dẫn» (ghost hand), then «Sẵn sàng» */
 await p.evaluate(()=>{try{kg82Close()}catch(e){}startContest({art:'hoa',title:'Hội thi',onDone:()=>{}})});await p.waitForTimeout(1200);
 const r1=await p.evaluate(()=>{const b=kg82Box();return{rules:!!b.querySelector('.kgr .kpst'),go:(b.querySelector('.kgr-go')||{}).textContent,demo:!!b.querySelector('.kgr .kpst .kfx')&&!b.querySelector('.kgr-demo')/* LIVE mg-intro-2 (as mg-ready-guide): kit tap-word «!» on the rules title, no demo picture */,eng:KG82_KIND.hoa.e,tut:!!b.querySelector('#kgrtut'),run:!!KG82.run,cv:!!b.querySelector('canvas'),luat:(b.querySelector('.kgr')||{}).textContent}});
 ok(r1.rules&&r1.demo&&/Sẵn sàng/.test(r1.go||'')&&r1.eng==='ikebana'&&r1.tut&&!r1.cv&&!/%/.test(r1.luat),'rules screen first (contest caller), engine ikebana, hướng dẫn button, no %',{eng:r1.eng,go:r1.go});
 if(SH)await p.screenshot({path:SH+'/hoa-rules-'+VW+'.png'});
 await p.evaluate(()=>document.getElementById('kgrtut').click());await p.waitForTimeout(2500);
 const r2=await p.evaluate(()=>({hand:!!document.querySelector('.kgt-hand.on'),tut:!!KG82.tut,cv:!!kg82Box().querySelector('canvas')}));
 ok(r2.tut&&r2.cv&&r2.hand,'«Hướng dẫn»: guided round runs the board and the ghost hand shows the move',r2);
 if(SH)await p.screenshot({path:SH+'/hoa-tut-'+VW+'.png'});
 await p.evaluate(()=>document.getElementById('kgtback').click());await p.waitForTimeout(700);
 await p.evaluate(()=>document.getElementById('kg82go').click());await p.waitForTimeout(900);
 const r3=await p.evaluate(()=>({phase:KG82.phase,cv:!!kg82Box().querySelector('canvas'),peek:!!KG82.peek()}));
 ok(r3.phase==='play'&&r3.cv&&r3.peek,'«Sẵn sàng» starts the real play',r3);
 const full=await p.evaluate(async()=>await window.__oracle(0,{attach:true}));ok(full.raw!=null,'contest flow played to its end by the oracle: raw '+(+full.raw).toFixed(2),full.mode);
 await p.waitForTimeout(500);if(SH)await p.screenshot({path:SH+'/hoa-result-'+VW+'.png'});
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});
 /* 2-4 play: oracle at ease 5 and at ease 0, a wrong flower first */
 for(const [ease,opt] of [[5,{wrong:1}],[5,{}],[0,{}]]){
  const out=await p.evaluate(async([e,o])=>{try{kg82Close()}catch(x){}playArt({art:'hoa',artName:'Cắm hoa',occ:'hoc'});await new Promise(r=>setTimeout(r,900));return await window.__oracle(e,o)},[ease,opt]);
  ok(out.raw!=null,`ease ${ease}${opt.wrong?' (wrong pick first)':''}: board ends, raw ${out.raw==null?'-':(+out.raw).toFixed(2)} after ${out.trace} moves`,out.mode);
  if(ease===5&&!opt.wrong)ok(out.raw>=9,'oracle ≥ 9 at ease 5',out.raw);
  if(ease===5&&opt.wrong)ok(out.raw<9.9&&out.raw>7,'a wilted pick costs the season share',out.raw);
 }
 /* no text in the play area */
 const tx=await p.evaluate(async()=>{try{kg82Close()}catch(e){}kg82Open({art:'Cắm hoa',title:'x',how:'x'});KG82.lv=3;KG82.ctx='hoc';kg82Play('hoa',()=>{});await new Promise(r=>setTimeout(r,900));const bx=kg82Box();const w=document.createTreeWalker(bx,NodeFilter.SHOW_TEXT);const t=[];while(w.nextNode()){const s=w.currentNode.textContent.trim();if(s)t.push(s)}return{texts:t,canvas:bx.querySelectorAll('canvas').length,peek:!!KG82.peek()}});
 ok(tx.canvas===1&&tx.texts.every(s=>s==='✓'),'play area: one canvas, no word (only the ✓ sign)',tx);
 if(SH){await p.screenshot({path:SH+'/hoa-pick-'+VW+'.png'});
  await p.evaluate(()=>{try{kg82Close()}catch(e){}});
  /* a stepped play at ease 3: shots at the cut, a seated stem, three stems, the stars */
  const pauses=[2,6,9,29,40];const run=p.evaluate(async()=>{playArt({art:'hoa',artName:'Cắm hoa',occ:'hoc'});await new Promise(r=>setTimeout(r,900));return await window.__oracle(3,{pause:[2,3,6,9,29,40]})});
  const shot=async n=>{await p.waitForFunction(k=>window.__paused===k,n,{timeout:60000});await p.waitForTimeout(250);await p.screenshot({path:SH+'/hoa-s'+n+'-'+VW+'.png'});await p.evaluate(()=>{window.__paused=null})};
  /* the pause counter marks "moves taken before the next one"; the stems are cut / carried / turned one move each */
  for(const n of [2,3,6,9,29])await shot(n);
  await p.evaluate(()=>{window.__paused=null});await p.waitForFunction(()=>window.__paused===40||KG82.phase!=='play',null,{timeout:60000}).catch(()=>{});await p.evaluate(()=>{window.__paused=null});
  await p.waitForTimeout(600);await p.screenshot({path:SH+'/hoa-end-'+VW+'.png'});await run.catch(()=>{})}
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const bad=res.filter(x=>!x).length;console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
