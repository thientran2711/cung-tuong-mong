/* kit-opt-text (review/kit-opt-text, KP14, KIT §13.13) — node dev/test/kit-opt-text.js [dev/index.html]
   Fold 755x1000: an option column narrower than 340 px (class k3tight, set by jk3 kitOptLayout) gives its width to the TEXT: the card picture is 62 px wide, the text column >= 205 px,
   the cards stay in one column. Plays turns (seeded) until such a modal shows. */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof tsPanel==='function'&&typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=300;S.suc=100;try{render()}catch(e){}
  let seed=7;Math.random=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});await p.waitForTimeout(1200);
 await p.addStyleTag({content:'#kroul,#kroulw,.kmov,#dawn{display:none!important}'});
 let r=null;for(let i=0;i<60&&!r;i++){await p.evaluate(()=>{try{endTurn()}catch(e){}});await p.waitForTimeout(800);
  r=await p.evaluate(()=>{const g=document.querySelector('#modal .k3tight');if(!g)return null;const cs=[...g.querySelectorAll(':scope>button.ka.kart')].map(b=>{const a=b.querySelector(':scope>.kaart'),t=b.querySelector(':scope>.kabody');return{pic:a?Math.round(a.getBoundingClientRect().width):0,txt:t?Math.round(t.getBoundingClientRect().width):0}});return{w:Math.round(g.clientWidth),cols:getComputedStyle(g).gridTemplateColumns.split(' ').length,cs}})}
 ok(!!r,'a narrow option column (k3tight) showed within 60 turns',r&&r.w);
 if(r){ok(r.cs.length>0&&r.cs.every(c=>c.pic<=64),'card pictures shrink to <= 64 px',r.cs);ok(r.cs.every(c=>c.txt>=205),'text column >= 205 px (was 188)',r.cs.map(c=>c.txt));ok(r.cols===1,'one column',r.cols)}
 ok(errs.length===0,'no page errors',errs.slice(0,2));await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
