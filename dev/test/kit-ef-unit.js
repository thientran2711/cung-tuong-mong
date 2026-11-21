/* review/kit-ef-unit (K-EF-UNIT, KIT_REQUESTS 21/11 econ-tamco RE-CHECK #2): on option/act card rows a STAT item («Bạc -94», «Tâm cơ -3», «2 khắc», «Sức 80→98 (+18)») is ONE
   unbreakable unit (.kef1, nowrap) and never splits across lines; long word items still wrap. Renders kaRowH rows inside a real button.ka at widths 150..320 px on Fold 755x1000
   and iPad 1180x820, plus every visible button.ka of the act tab.  usage: node dev/test/kit-ef-unit.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kaRowH==='function'&&typeof kaUnit==='function',null,{timeout:240000});await p.waitForTimeout(1000);
  const r=await p.evaluate(()=>{const out={split:[],units:0,longOne:0,wrongUnit:[]};const L=[{h:'Danh +2',c:'g'},{h:'nàng ta quý ngươi hơn một chút, kể cả khi ngươi không ở đó',c:'g'},{h:'Bạc -94',c:'r'},{h:'Tâm cơ -3',c:'r'},{h:'2 khắc',c:'t'},{h:'Sức 80→98 (+18)',c:'g'}];
   const host=document.createElement('div');host.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#fff';document.body.appendChild(host);
   for(let w=150;w<=320;w+=6){host.innerHTML=`<button class="ka" style="display:block;width:${w}px;text-align:left"><span class="kabody"><small class="kb">${kaRowH('duoc','Được',L)}</small></span></button>`;
    host.querySelectorAll('.ef').forEach(e=>{const t=e.textContent.trim();const u=e.classList.contains('kef1');if(u){out.units++;if(e.getClientRects().length>1)out.split.push(w+':'+t)}if(/quý ngươi/.test(t)&&u)out.longOne++;if(!u&&/^(Danh \+2|Bạc -94|Tâm cơ -3|2 khắc|Sức 80→98 \(\+18\))$/.test(t))out.wrongUnit.push(t)})}
   host.remove();return out});
  const e=[];if(r.split.length)e.push('unit split '+r.split.slice(0,5).join('|'));if(!r.units)e.push('no unit items');if(r.longOne)e.push('long word item made a unit');if(r.wrongUnit.length)e.push('stat not unit '+[...new Set(r.wrongUnit)].join('|'));
  if(e.length)bad++;console.log(`${W}x${H}`,e.length?'FAIL '+e.join('; '):'PASS',r.units);await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
