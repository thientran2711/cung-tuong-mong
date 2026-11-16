/* story14-view: a new life at each viewport — Hành sự, Mệnh truyện tab, chapter detail (kitGoalDetail) open without page errors and
   without horizontal overflow; the 14-chapter rows are on screen. usage: NODE_PATH=$(npm root -g) node dev/test/story14-view.js <url> [shotdir] */
const {chromium}=require('playwright');const [,,URL,DIR]=process.argv;
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.clear();window.__forceOrigin='muoi';document.getElementById('title').hidden=true;start()});
  await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,.kmov').forEach(e=>e.remove());document.querySelectorAll('body > div').forEach(e=>{const s=getComputedStyle(e);if(s.position==='fixed'&&+s.zIndex>=50&&e.id!=='modal'&&e.offsetWidth>=innerWidth*.9&&e.offsetHeight>=innerHeight*.9)e.remove()});Q.length=0;const md=document.getElementById('modal');md.hidden=true;tab='story';render()});await p.waitForTimeout(600);
  const a=await p.evaluate(()=>({ovf:document.documentElement.scrollWidth-innerWidth,chip:/Chương 1\/14/.test(document.getElementById('panel').textContent)}));
  if(DIR)await p.screenshot({path:`${DIR}/tab-${W}.png`});
  await p.evaluate(()=>{kitGoalDetail()});await p.waitForTimeout(700);
  const d=await p.evaluate(()=>{const m=document.getElementById('modal');const t=m.textContent;const r=[...m.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='hidden'&&e.children.length===0).length;
   return{open:!m.hidden,rows:/Phần giữa/.test(t)&&/14 chương/i.test(t),ovf:document.documentElement.scrollWidth-innerWidth,clip:r}});
  if(DIR)await p.screenshot({path:`${DIR}/detail-${W}.png`});
  const ok=!errs.length&&a.ovf<=0&&a.chip&&d.open&&d.rows&&d.ovf<=0;if(!ok)bad++;console.log(`${W}x${H}`,ok?'PASS':'FAIL',JSON.stringify({a,d,errs}))}
 await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
