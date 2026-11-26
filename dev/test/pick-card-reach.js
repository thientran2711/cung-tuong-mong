/* pick-card-reach.js — KK38 item 7 (robot M5b on LIVE 5e013076: «Sai … đi dò la» picker card «Đáp ứng · Phó Nhã Ninh» CLIPPED at the dialog bottom, a tap at the
   card centre hit the portrait = no action). Whole picker family = every PERSON PICKER frame (option cards that carry a person: kgt / portrait):
   spyPick (Sai … đi dò la), plus every Q frame whose options carry .kgt / a portrait, opened through the real game function.
   Per frame, Fold 755x1000 + iPad 1180x820: CUT = a card not fully inside the visible dialog AND no scroller can bring it in;
   for EVERY card a fresh frame + a REAL touch tap at the card centre → CHOSE (Q[0] left / changed / a follow-up opened / a hand card lifted) or DEAD / STOLE.
   usage: node dev/test/pick-card-reach.js <index.html> [WxH,...]   exit 1 on CUT / DEAD / STOLE */
const {chromium}=require('playwright');const path=require('path');const A=process.argv.slice(2);const SRC=path.resolve(A[0]);const SIZES=(A[1]||'755x1000,1180x820').split(',');
const FR=[
 {id:'c2a',pre:()=>{Q.length=0;if((()=>{try{S.evc=null;EVCW.length=0}catch(e){}/* clean day: LIVE jevc daily cap */return rgFire('c1b')})()/*c2a = a side choice = vòng nhóm (KIT §101.9)*/){Q.length=0;return true}window.__nlInner=1;start();window.__nlInner=0;Q.length=0;return false},open:()=>{Q.length=0;(()=>{try{S.evc=null;EVCW.length=0}catch(e){}/* clean day: LIVE jevc daily cap */return rgFire('c1b')})()/*c2a = a side choice = vòng nhóm (KIT §101.9)*/;Q.length=1;showModal()}},/* «Phụ tuyến · Tân quân lập uy · Chương 2» (item 5, FOREMAN E 05:35Z) */
 {id:'spy',open:()=>{spyPick(0)}},
 {id:'spy-ag',open:()=>{const ag=(S.srv&&S.srv.list||[]).find(x=>x&&x.name);spyPick(0,ag||undefined)}},
];
(async()=>{const b=await chromium.launch();let bad=0;const rows=[];
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<H?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());await p.goto('file://'+SRC,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof spyPick==='function'&&typeof rgFire==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{window.__bot=0;try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
   /* meet everyone so the picker names them (the M5b card «Đáp ứng · Phó Nhã Ninh» = a known person) */try{for(const v of rivals){if(typeof meet==="function")meet(v);else if(S.met)S.met[v.id]=1}}catch(e){}render()});
  const CLEAN=async()=>{for(let i=0;i<3;i++){await p.waitForTimeout(400);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc').forEach(e=>e.remove());try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;const k=document.getElementById('kpop');if(k)k.hidden=true})}};
  await CLEAN();
  for(const F of FR){
   if(F.pre){for(let k=0;k<6;k++){const ok=await p.evaluate(`(${F.pre.toString()})()`);if(ok)break;await p.waitForTimeout(2500);await CLEAN()}await CLEAN()}
   const n=await p.evaluate(`document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,#kmrew').forEach(e=>e.remove()),(${F.open.toString()})(),(Q[0]&&(typeof Q[0].opts==='function'?Q[0].opts():Q[0].opts)||[]).length`).catch(e=>-1);await p.waitForTimeout(1500);
   const geo=()=>p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const d=M.querySelector('.dlg')||M;const D=d.getBoundingClientRect();
    const vis=e=>{let r=e.getBoundingClientRect();const R={t:r.top,b:r.bottom,l:r.left,r:r.right};for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const cs=getComputedStyle(a);if(/(auto|scroll|hidden|clip)/.test(cs.overflowY+cs.overflowX)){const q=a.getBoundingClientRect();R.t=Math.max(R.t,q.top);R.b=Math.min(R.b,q.bottom);R.l=Math.max(R.l,q.left);R.r=Math.min(R.r,q.right)}}R.t=Math.max(R.t,0);R.b=Math.min(R.b,innerHeight);return R};
    const sc=e=>{for(let a=e.parentElement;a&&a!==document.body;a=a.parentElement){const cs=getComputedStyle(a);if(/(auto|scroll)/.test(cs.overflowY)&&a.scrollHeight>a.clientHeight+2)return a}return null};
    const bs=[...M.querySelectorAll('.opts>button')].filter(x=>x.getClientRects().length);
    return {title:(M.querySelector('.kdh,.k3title,h2,h3')||{}).textContent||'',hand:!!M.querySelector('.khand'),cards:bs.map((x,i)=>{const r=x.getBoundingClientRect(),v=vis(x),s=sc(x);return {i,t:(x.innerText||'').replace(/\s+/g,' ').slice(0,40),full:v.b-v.t>=r.height-2&&v.r-v.l>=r.width-2,canScroll:!!s,cx:r.left+r.width/2,cy:r.top+r.height/2,h:Math.round(r.height)}})}});
   let g=await geo();if(!g&&process.env.DBG)console.log('DBG',JSON.stringify(await p.evaluate(()=>{const M=document.getElementById('modal');return {hidden:M.hidden,q:Q.length,t:Q[0]&&(Q[0].t||'').toString().slice(0,60),disp:getComputedStyle(M).display,dlg:!!M.querySelector('.dlg'),txt:(M.innerText||'').slice(0,80)}})));if(!g){rows.push([dev,F.id,'-','did not open (n='+n+')','FAIL']);bad++;continue}
   const cut=g.cards.filter(c=>!c.full&&!c.canScroll);rows.push([dev,F.id,g.cards.length+' cards'+(g.hand?' (hand)':''),'CUT (unreachable) '+cut.length+' · clipped-but-scrolls '+g.cards.filter(c=>!c.full&&c.canScroll).length,cut.length?'FAIL':'PASS']);if(cut.length)bad++;
   for(let i=0;i<g.cards.length;i++){await CLEAN();await p.evaluate(`document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc,#kmrew').forEach(e=>e.remove()),(${F.open.toString()})()`);await p.waitForTimeout(1200);g=await geo();if(!g)break;const c=g.cards[i];if(!c)continue;
    /* bring the card into view the way a finger does: scroll its scroller */
    if(!c.full)await p.evaluate(i=>{const M=document.getElementById('modal');const x=[...M.querySelectorAll('.opts>button')].filter(x=>x.getClientRects().length)[i];x.scrollIntoView({block:'center'})},i),await p.waitForTimeout(500),g=await geo();
    const c2=g.cards[i];
    const s0=await p.evaluate(()=>{window.__q0=Q[0];return Q.length});
    const hit=await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y);return e?(e.className&&e.className.baseVal==null?e.tagName+'.'+e.className:e.tagName):''},[c2.cx,c2.cy]);
    await p.touchscreen.tap(c2.cx,c2.cy);await p.waitForTimeout(900);
    const r=await p.evaluate(()=>{const M=document.getElementById('modal');const lifted=!!document.querySelector('.khand>button.klift');return {gone:Q[0]!==window.__q0,ql:Q.length,lifted,kpop:(()=>{const k=document.getElementById('kpop');return k&&!k.hidden?k.innerText.slice(0,40):null})(),open:M&&!M.hidden}});
    let v=r.gone||r.lifted?'CHOSE':r.kpop?'STOLE':'DEAD';
    if(v==='CHOSE'&&r.lifted){/* a hand: the lifted card's ✓ confirms */const ok=await p.evaluate(()=>{const b=document.querySelector('.khconf:not([hidden]) .khok');if(!b)return 0;const q=b.getBoundingClientRect();return [q.left+q.width/2,q.top+q.height/2]});if(ok){await p.touchscreen.tap(ok[0],ok[1]);await p.waitForTimeout(800);const gone=await p.evaluate(()=>Q[0]!==window.__q0);if(!gone)v='LIFT-ONLY'}}
    if(v!=='CHOSE')bad++;rows.push([dev,F.id,'card '+i+' «'+c2.t+'» h'+c2.h,'centre tap → '+v+' (at '+hit+(r.kpop?' kpop «'+r.kpop+'»':'')+')',v==='CHOSE'?'PASS':'FAIL'])}
   await CLEAN()}
  if(errs.length){bad++;rows.push([dev,'-','-','page errors '+errs.slice(0,2).join(' | '),'FAIL'])}
  await ctx.close()}
 for(const r of rows)console.log(r.join(' | '));console.log(bad?'PICK-CARD-REACH FAIL '+bad:'PICK-CARD-REACH PASS');await b.close();process.exit(bad?1:0)})();
