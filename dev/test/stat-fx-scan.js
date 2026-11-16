/* LUẬT SỬA CẢ NHÓM scan (review/stat-fx): "a gain shown in red / a loss shown in green". Walks every tab, the kit page and every act card the game
   builds, and lists each coloured value (.ef .kchip .krd b .fly .ksfl) whose sign contradicts its colour by the game's own meaning (kcls/kpSent).
   usage: node dev/test/stat-fx-scan.js http://localhost:<port>/index.html [W]x[H]   → prints JSON {checked, bad:[{where,cls,text}]} */
const {chromium}=require('./lib/pw-roulette');const [,,URL,SZ]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&(typeof nlFigsReady!=='function'||nlFigsReady()),null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await sleep(800);
 const SCAN=`(where)=>{const out=[];let n=0;document.querySelectorAll('.ef.g,.ef.r,.kchip.g,.kchip.r,.krd b.g,.krd b.r,.kkems,.fly.g,.fly.r').forEach(e=>{if(e.closest('[hidden]'))return;const cls=e.classList.contains('g')?'g':e.classList.contains('r')?'r':'';const t=(e.textContent||'').replace(/\\s+/g,' ').trim();if(!cls||!/[+−-]\\s?\\d/.test(t))return;n++;
   const plus=/(^|[^\\d])\\+\\s?\\d/.test(t),minus=/[−-]\\s?\\d/.test(t)&&!plus;let want='';try{want=typeof kpSent==='function'?kpSent(t.replace(/[+−-]\\s?\\d.*$/,'').trim(),plus?1:-1):(plus?'g':'r')}catch(x){}
   if(want&&want!=='n'&&want!==cls)out.push({where,cls,text:t.slice(0,80)})});return {n,out}}`;
 const R={checked:0,bad:[]};const run=async w=>{const r=await p.evaluate(`(${SCAN})(${JSON.stringify(w)})`);R.checked+=r.n;r.out.forEach(o=>R.bad.push(o))};
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('[data-tab]')].map(e=>e.dataset.tab));
 for(const t of tabs){await p.evaluate(t=>{const e=document.querySelector('[data-tab="'+t+'"]');e&&e.click()},t);await sleep(500);await run('tab:'+t);
  /* open every act card's result is out of scope; but every card on the tab is in the DOM */}
 /* build the act cards of every builder the game has with a rich state */
 const cards=await p.evaluate(()=>{const o=[];const sp=(n,f)=>{try{const A=f();(A||[]).forEach(a=>{try{o.push([n+':'+(a.n||'?'),cardH(a,0)])}catch(e){}})}catch(e){}};S.suc=100;S.bac=999;
  sp('art',()=>artActs());sp('direct',()=>directActs());sp('ill',()=>illCards());sp('cold',()=>coldActs());if(typeof actsAll==='function')sp('all',()=>actsAll());if(typeof acts==='function')sp('acts',()=>acts());return o});
 for(const [n,h] of cards){await p.evaluate(h=>{let d=document.getElementById('__scan');if(!d){d=document.createElement('div');d.id='__scan';document.body.appendChild(d)}d.innerHTML=h},h);await run(n)}
 /* kit page §57 + relation rows */
 R.cards=cards.length;R.errs=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
