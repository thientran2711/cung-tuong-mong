/* review/kit-ef-unit (K-EF-UNIT, KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2): on every card row a STAT item («Bạc -94», «Tâm cơ -3», «Sủng +2», «2 khắc», «Sức 80→98 (+18)»)
   is ONE unbreakable unit (.kef1, nowrap) and never splits across lines; long word items still wrap.
   r2 (rv-kit-ef-unit FAIL: the §6.3 square-card «white-space:normal!important» rules undid the nowrap on .kart / .kopt): the test now runs on the REAL cards:
   (A) a REAL option dialog (Q + showModal, button.ka.kopt) with stat lines, at several option-column widths;
   (B) the Hành sự act tab (button.ka.kart) and the person card act rows (pop-maid);
   (C) kaRowH inside a bare button.ka at widths 180..320 px (the old check; below ~175 px the label + «Sức 80→98 (+18)» cannot fit one line at all — no real card is that narrow, (A)+(B) measure the real ones);
   for every visible .kef1: getComputedStyle(white-space)==nowrap AND its client rects sit on ONE line (one rect, or several fragments with the same bottom when the item holds an inline tap word
   like «<span class=krel>Thiện cảm</span> của cung nữ +3» — a fragment there is not a line break). Fold 755x1000 + iPad 1180x820.
   usage: node dev/test/kit-ef-unit.js <url> <outdir>   (writes <outdir>/<W>-opt.png, <W>-act.png for the visual check) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const STAT='/^(?:[\\p{L}][\\p{L} ]{0,22}(?: ?[+\\-−] ?| )\\d+(?: ?khắc)?|\\d+ ?khắc|[\\p{L}][\\p{L} ]{0,22} \\d+ ?→ ?\\d+(?: ?\\([+\\-−]\\d+\\))?)$/u';
/* a unit = .kef1 OR a stat text (so the same check measures LIVE, which has no .kef1, for the before/after table) */
const CHECK=`(root=>{const o={n:0,bad:[],sung:0};const RX=${STAT};root.querySelectorAll('.kr .krv .ef').forEach(e=>{if(!e.getClientRects().length||!e.offsetParent)return;const t0=e.textContent.trim();if(!e.classList.contains('kef1')&&!(t0.length<=28&&RX.test(t0)))return;o.n++;const t=e.textContent.trim();if(/^Sủng [+\\-−]/.test(t))o.sung++;
 const ws=getComputedStyle(e).whiteSpace;const R0=[...e.getClientRects()].filter(r=>r.width>0);const rc=R0.length,ln=new Set(R0.map(r=>Math.round(r.bottom/6))).size;if(ws!=='nowrap'||ln!==1)o.bad.push(t+' ws='+ws+' lines='+ln+' rects='+rc);const cd=e.closest('button.ka');if(cd&&Math.max(...R0.map(r=>r.right))>cd.getBoundingClientRect().right+1)o.bad.push(t+' sticks out of its card')});
 o.stat=[...root.querySelectorAll('.kr .krv .ef')].filter(e=>e.offsetParent&&!e.classList.contains('kef1')&&/^(Sủng|Bạc|Danh|Tâm cơ|Sức) [+\\-−]?\\d+$/.test(e.textContent.trim())).map(e=>e.textContent.trim());return o})`;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});
  await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,.kroul,#kroulw,#curtain,#buoitr,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof kaRowH==='function'&&typeof start==='function'&&typeof showModal==='function',null,{timeout:240000});await sleep(1500);
  await p.evaluate(()=>{try{window.kitReward=()=>{}}catch(e){}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.bac=500;render()});
  await sleep(800);const e=[];
  /* (A) real option dialog: the econ-tamco lines (Bạc / Tâm cơ / Sủng / khắc / Sức a→b) */
  await p.evaluate(()=>{Q.length=0;Q.push({t:'Mua chuộc người Nội vụ phủ',h:'<p>Tiểu Lý Tử ở Nội vụ phủ ngập ngừng, như chờ ngươi mở lời.</p>',opts:[
   {n:'Đưa bạc cho người Nội vụ phủ',x:'Khá chắc · tốn: Bạc -94 · 2 khắc · thành: Sức 80→98 (+18) · Sủng +2 · Danh +1',go:()=>{}},
   {n:'Nhờ người quen nói giúp một lời',x:'Tùy duyên · tốn: Tâm cơ -3 · 1 khắc · thành: Sủng +2 · Danh +1 · hỏng: Danh -2',go:()=>{}},
   {n:'Thôi, để lúc khác',x:'tốn: 1 khắc · thành: Tâm cơ +1 · Sủng +1',go:()=>{}}]});showModal()});
  await sleep(1500);
  for(const w of [0,560,460,380,320,280]){const r=await p.evaluate(([w,C])=>{const M=document.getElementById('modal');if(!M||M.hidden)return{nomodal:1};const op=M.querySelector('.opts');if(w&&op)op.style.setProperty('width',w+'px','important');
    return new Promise(res=>requestAnimationFrame(()=>requestAnimationFrame(()=>res(Object.assign({kopt:M.querySelectorAll('button.ka.kopt').length},eval(C)(M))))))},[w,CHECK]);
   if(r.nomodal){e.push('opt: no modal');break}if(!r.kopt)e.push('opt: no .kopt card');if(!r.n)e.push('opt w'+w+': no unit');if(!r.sung)e.push('opt w'+w+': «Sủng +2» not a unit');
   if(r.bad.length)e.push('opt w'+w+': '+r.bad.slice(0,4).join('|'));if(r.stat.length)e.push('opt w'+w+': stat not unit '+[...new Set(r.stat)].join('|'));console.log(`${W} opt w=${w||'auto'} kopt=${r.kopt} units=${r.n} bad=${r.bad.length}`);
   if(!w)await p.screenshot({path:`${OUT}/${W}-opt.png`})}
  await p.evaluate(()=>{const M=document.getElementById('modal');const op=M&&M.querySelector('.opts');if(op)op.style.removeProperty('width');Q.length=0;if(M)M.hidden=true;try{render()}catch(e){}});await sleep(500);
  /* (B) act tab + person card act rows */
  await p.evaluate(()=>{window.tabGo=t=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}};
   window.popKind=k=>{Q.length=0;document.getElementById('modal').hidden=true;tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>x.kind===k);if(i<0)throw 'no '+k;popIdx=i;popMsg='';renderStage()}});/* same scene helpers as act-grid-scan.js */
  let tot=0;for(const [nm,go] of [['act',"tabGo('act')"],['pop-maid',"popKind('maid')"],['tab-staff',"tabGo('staff')"],['tab-rv',"tabGo('rv')"]]){const ok=await p.evaluate(g=>{try{(0,eval)(g);return true}catch(x){return String(x).slice(0,80)}},go);await sleep(1500);
   if(ok!==true){console.log(W,nm,'skip',ok);continue}
   const r=await p.evaluate(C=>Object.assign({kart:document.querySelectorAll('button.ka.kart').length},eval(C)(document)),CHECK);
   console.log(`${W} ${nm} kart=${r.kart} units=${r.n} bad=${r.bad.length}`);if(r.bad.length)e.push(nm+': '+r.bad.slice(0,4).join('|'));if(r.stat.length)e.push(nm+': stat not unit '+[...new Set(r.stat)].join('|'));
   tot+=r.n;if(nm==='act'){if(!r.kart)e.push('act: no .kart card');await p.screenshot({path:`${OUT}/${W}-act.png`})}
   await p.evaluate(()=>{const M=document.getElementById('modal');if(M)M.hidden=true;Q.length=0})}
  if(!tot)e.push('act/person scenes: no unit at all');
  /* (C) bare kaRowH at widths 180..320 */
  const r=await p.evaluate(C=>{const out={split:[],units:0,longOne:0};const L=[{h:'Danh +2',c:'g'},{h:'nàng ta quý ngươi hơn một chút, kể cả khi ngươi không ở đó',c:'g'},{h:'Bạc -94',c:'r'},{h:'Tâm cơ -3',c:'r'},{h:'2 khắc',c:'t'},{h:'Sức 80→98 (+18)',c:'g'}];
   const host=document.createElement('div');host.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#fff';document.body.appendChild(host);
   for(let w=180;w<=320;w+=6){host.innerHTML=`<button class="ka" style="display:block;width:${w}px;text-align:left"><span class="kabody"><small class="kb">${kaRowH('duoc','Được',L)}</small></span></button>`;
    const o=eval(C)(host);out.units+=o.n;out.split.push(...o.bad.map(x=>w+':'+x));host.querySelectorAll('.ef.kef1').forEach(x=>{if(/quý ngươi/.test(x.textContent))out.longOne++})}
   host.remove();return out},CHECK);
  if(r.split.length)e.push('bare split '+r.split.slice(0,4).join('|'));if(!r.units)e.push('bare: no unit');if(r.longOne)e.push('long word item made a unit');
  if(errs.length)e.push('errors '+errs.slice(0,3).join('|'));
  if(e.length)bad++;console.log(`${W}x${H}`,e.length?'FAIL '+e.join('; '):'PASS');await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
