/* kit-empty-under (K-EMPTY-UNDER, RV-183 P2): the j3 empty panel «Lúc này không còn việc để chọn» on a card whose options are ALL locked must not sit under a dealt hand.
   node dev/test/kit-empty-under.js [dev/index.html] [shotdir]
   Whole family = 2/3/4 all-locked kit option cards (the hand deals 2–7) × Fold 755x1000 + iPad 1180x820. PASS per case: the panel exists, is NOT inside .opts,
   0 cards overlap it, its text is topmost, it and every card are on screen, and a visible ✕ / «Đã rõ» is on top. KMUT=1 → the old put (panel inside .opts) is swapped in → 6 FAIL. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||"dev/index.html";const URL="file://"+path.resolve(U0);const SHOT=process.argv[3]||'';const KMUT=process.env.KMUT==='1';
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0});await p.waitForTimeout(7000);
  for(const n of [2,3,4]){
  await p.evaluate(([n,KMUT])=>{try{kmReset()}catch(e){}Q.length=0;try{showModal()}catch(e){}
   if(KMUT&&!window.__kmut){window.__kmut=1;/* the old j3 put: the panel INSIDE .opts (end of the list) */window.kitModalEmptyPut=function(){try{const M=document.getElementById('modal'),m=Q[0];if(!M||M.hidden||!m||kitModalLive(m)||M.querySelector('.kempty'))return;const g=M.querySelector('.opts')||document.getElementById('mb');g.insertAdjacentHTML('beforeend',kitEmpty('Lúc này không còn việc để chọn',['Đóng thẻ này; khi đủ điều kiện, việc sẽ mở lại.'],{topic:m.t,noart:true}))}catch(e){}}}
   const o=[];for(let i=0;i<n;i++)o.push({n:["Nhẹ tay","Vừa phải","Nặng tay","Thật nặng"][i],off:1,fx:{tamco:1},go:()=>0});
   Q.push({t:"Thử cửa",h:"<p>Mọi lựa chọn đều khóa.</p>",opts:o});showModal()},[n,KMUT]);await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const M=document.getElementById('modal');const g=M.querySelector('.opts');const e=M.querySelector('.kempty');
   const er=e&&e.getBoundingClientRect();const cov=[...M.querySelectorAll('.opts>button')].filter(b=>{const q=b.getBoundingClientRect();return er&&q.width&&!(q.right<=er.left||q.left>=er.right||q.bottom<=er.top||q.top>=er.bottom)}).length;
   return{khand:!!(g&&g.classList.contains('khand')),inOpts:!!(e&&e.closest('.opts')),empty:!!e,cov,eh:er?Math.round(er.height):0,out:[...M.querySelectorAll('button')].some(c=>{const t=(c.textContent||'').trim();if(!/^(✕|×|Đã rõ)$/.test(t)||c.disabled)return false;const q=c.getBoundingClientRect();if(!q.height||q.bottom>innerHeight)return false;const x=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);return !!x&&c.contains(x)}),
   onScr:er?er.bottom<=innerHeight:false,top:(()=>{const t=e&&e.querySelector('.kempty-t,.kempty-l li');if(!t)return false;const q=t.getBoundingClientRect();const x=document.elementFromPoint(q.left+Math.min(q.width/2,40),q.top+q.height/2);return !!x&&e.contains(x)})(),cardsOn:[...M.querySelectorAll('.opts>button')].every(b=>b.getBoundingClientRect().bottom<=innerHeight+1)}});
  const okk=r.empty&&!r.inOpts&&r.cov===0&&r.out&&r.onScr&&r.top&&r.cardsOn;if(!okk)bad++;
  console.log((okk?'ok  ':'FAIL')+` ${tag} n=${n}`,JSON.stringify(r));
  if(SHOT)await p.screenshot({path:`${SHOT}/eu-${tag}-${n}.png`});}
  if(errs.length){bad++;console.log('FAIL errs',errs.slice(0,3))}
 }await b.close();console.log(bad?'K-EMPTY-UNDER FAIL '+bad:'K-EMPTY-UNDER ALL OK');process.exit(bad?1:0)})();
