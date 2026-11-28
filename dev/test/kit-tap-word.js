/* review/kit-tap-word (KIT §73.2): kitTapWord / kitTraitWords — dotted underline word, tap → kit popup with ONLY that word's meaning (word as title); one word per trait from ETRAITS.
   usage: node dev/test/kit-tap-word.js <url> [WxH,...]   (renders into a probe div; no game start needed) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));
const [,,URL,SIZES]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitTraitWords==='function'&&typeof kpPop==='function',null,{timeout:240000});
  const r={};
  r.html=await p.evaluate(()=>{const d=document.createElement('div');d.id='tw';d.style.cssText='position:fixed;left:20px;top:40px;width:300px;background:#fff;z-index:99998;font-size:16px;padding:10px';d.innerHTML='<div class="kpt">Tính cách: '+kitTraitWords(['danghi','hieuthao'])+' · '+kitTraitWords(['Nóng nảy'])+' · '+kitTapWord('Không nghĩa','')+'</div>';document.body.appendChild(d);
   const w=[...d.querySelectorAll('.kgl.kfx')];return {n:w.length,words:w.map(x=>x.textContent),underline:w.every(x=>/dotted/.test(getComputedStyle(x).textDecorationLine+getComputedStyle(x).textDecorationStyle)),plain:d.textContent.includes('Không nghĩa')&&!w.some(x=>x.textContent==='Không nghĩa')}});
  await p.click('#tw .kgl.kfx');await p.waitForTimeout(400);
  r.pop=await p.evaluate(()=>{const k=document.getElementById('kpop');return k&&!k.hidden?{title:(k.querySelector('.kpopt')||{}).textContent,text:k.innerText.slice(0,160)}:null});
  const fails=[];if(r.html.words.join('|')!=='Đa nghi|Hiếu thảo|Nóng nảy')fails.push('words '+r.html.words);if(!r.html.underline)fails.push('no dotted underline');if(!r.html.plain)fails.push('empty meaning must stay plain');
  if(!r.pop||r.pop.title!=='Đa nghi'||!/Mưu kế dễ bị lộ hơn, nhưng lời vu cáo khó gỡ hơn/.test(r.pop.text))fails.push('popup '+JSON.stringify(r.pop));
  if(errs.length)fails.push('errors '+errs.join('|'));if(fails.length)bad++;
  console.log(wh,fails.length?'FAIL '+fails.join('; '):'PASS',JSON.stringify(r));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
