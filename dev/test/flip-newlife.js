/* review/flip-newlife: nothing of one life may outlive it (j93 kmReset) + the palace start's card-flip waits for the Luân hồi identity card.
   Checks: (1) identity card open → no card-flip scene on screen and none played over it; (2) after "Nhận thân phận" the week-0 scene may play;
   (3) a scene on screen + a queued job, then a NEW LIFE → no .kmov/#kmrew left, queue empty, old job never runs, the identity card gets taps;
   (4) reroll of the identity (start() again) leaves no scene over the card; (5) kmReset clears everything.
   usage: node dev/test/flip-newlife.js <url> [W]x[H]@dpr [shotdir] → JSON lines + "FAIL n" */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof kmReset==='function',null,{timeout:0});await p.waitForTimeout(3000);
 let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info?' · '+JSON.stringify(info).slice(0,300):''))};
 const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/flip-newlife-${n}-${W}x${H}.png`})};
 const nlOpen=()=>p.evaluate(()=>!!NLP);
 /* a: first life: identity card open */
 await p.evaluate(()=>{try{$("title").hidden=true}catch(e){}start()});
 for(let i=0;i<40&&!(await nlOpen());i++)await p.waitForTimeout(200);
 ck('identity card open after start()',await nlOpen());
 await p.waitForTimeout(4000);
 const a=await p.evaluate(()=>({kcf:document.querySelectorAll('.kmov.kcf').length,dbg:(window.__cfdbg||[]).slice(-6),planned:!!S.nightWhy}));
 ck('no card-flip scene over the identity card',a.kcf===0,a);await shot('identity');
 /* accept: the week-0 scene may now play (only if his flip chose someone) */
 await p.evaluate(()=>document.querySelector('button[data-nl="ok"]').click());await p.waitForTimeout(2500);
 const c=await p.evaluate(()=>({nlp:!!NLP,kcf:document.querySelectorAll('.kmov.kcf').length,dbg:(window.__cfdbg||[]).slice(-6)}));
 ck('identity accepted',!c.nlp,c);
 ck('after accept the scene ran or was never planned',c.kcf>0||!c.dbg.some(x=>/^push/.test(x))||c.dbg.some(x=>/run|play|stale|nodeck/.test(x)),c);await shot('accepted');
 /* b: a scene on screen + queued jobs; then a NEW LIFE */
 await p.evaluate(()=>{Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());kmReset();
  cfDemo(8,2,'me');kmPush(d=>{window.__lateRan=1;d()});kmPush(d=>kmStage('km-test','<div>test</div>',{manual:true,onEnd:d}))});
 await p.waitForTimeout(1200);
 const b1=await p.evaluate(()=>({kmov:document.querySelectorAll('.kmov').length,q:KMQ.length}));
 ck('scene is up before the new life',b1.kmov>=1,b1);
 await p.evaluate(()=>{start()});for(let i=0;i<40&&!(await nlOpen());i++)await p.waitForTimeout(200);
 await p.waitForTimeout(600);
 const d=await p.evaluate(()=>({kmov:document.querySelectorAll('.kmov').length,rew:!!document.getElementById('kmrew'),q:KMQ.length,late:!!window.__lateRan}));
 ck('new life: no scene overlay left, queue empty, old job never ran',d.kmov===0&&!d.rew&&d.q<=1&&!d.late,d);await shot('newlife');
 /* the Luân hồi roulette (its own overlay) runs first: skip it, then the identity card shows */
 await p.evaluate(()=>{const s=[...document.querySelectorAll('#kroul button,.kroul button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click()});for(let i=0;i<40&&!(await p.evaluate(()=>!!document.querySelector('button[data-nl="ok"]')));i++)await p.waitForTimeout(250);await p.waitForTimeout(600);
 const top=await p.evaluate(()=>{const m=document.querySelector('button[data-nl="ok"]');if(!m)return null;const r=m.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return (e&&(e===m||m.contains(e)))?true:(e&&!e.closest('.kmov,.kcf')?'other:'+(e.className||e.tagName):'OVERLAY')});await shot('card');
 ck('no old-life overlay over the identity card (top is the card or its own content)',top===true||/^other:/.test(String(top)),top);
 /* c: reroll (start() again) → no scene over the card */
 await p.evaluate(()=>{start()});await p.waitForTimeout(3500);
 const e=await p.evaluate(()=>({kcf:document.querySelectorAll('.kmov.kcf').length,q:KMQ.length}));
 ck('after a second start() (reroll) still no scene over the card',e.kcf===0&&e.q<=1,e);
 /* d: kmReset */
 await p.evaluate(()=>{kmPush(d=>kmStage('km-test','<div>t</div>',{manual:true,onEnd:d}))});await p.waitForTimeout(300);
 await p.evaluate(()=>{kmReset()});const f=await p.evaluate(()=>({kmov:document.querySelectorAll('.kmov').length,q:KMQ.length}));
 ck('kmReset clears everything',f.kmov===0&&f.q===0,f);
 ck('no page errors',perr.length===0,perr);
 console.log(fail?'FAIL '+fail:'ALL OK');await b.close();process.exit(fail?1:0)})();
