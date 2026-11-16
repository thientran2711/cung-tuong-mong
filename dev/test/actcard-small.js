/* review/actcard-small: small act card = 3:4 portrait picture; tap picture -> kitActZoom; "!" on cards without odds; equal heights per grid row in Tài nghệ.
   usage: node dev/test/actcard-small.js <url> <outdir> [WxH@dpr,...] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||"755x1000@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,200))});p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;tab='court';PG.court=0;render()});
  await sleep(5000);
  const m=await p.evaluate(()=>{const R=e=>e.getBoundingClientRect();const cs=[...document.querySelectorAll('#panel button.ka.kart')].filter(c=>c.offsetParent&&!c.classList.contains('kopt'));
   return{n:cs.length,sizes:cs.map(c=>{const a=c.querySelector(':scope>.kaart');const r=R(a);return +(r.width/r.height).toFixed(3)}),marks:cs.filter(c=>!c.querySelector('.kodm')).map(c=>!!c.querySelector('.kainfo')),hovf:document.documentElement.scrollWidth>innerWidth+1}});
  const ratioOK=m.sizes.every(x=>Math.abs(x-0.75)<0.02),markOK=m.marks.every(Boolean);
  /* pick a card whose picture centre is really hit by the pointer (not under the sticky pane bar) */
  const pt=await p.evaluate(async()=>{const cs=[...document.querySelectorAll('#panel button.ka.kart')].filter(c=>c.offsetParent&&!c.classList.contains('kopt'));
   for(const c of cs){c.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,150));const a=c.querySelector(':scope>.kaart');const r=a.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const el=document.elementFromPoint(x,y);if(el&&a.contains(el))return[x,y]}return null});
  let z={open:false,img:false,title:''};
  if(pt){await p.mouse.click(pt[0],pt[1]);await sleep(900);
   z=await p.evaluate(()=>{const z=document.getElementById('kazoom');return{open:!!z&&!z.hidden,img:!!(z&&z.querySelector('img')),title:z&&z.querySelector('.kazt')?z.querySelector('.kazt').textContent:''}})}
  await p.screenshot({path:`${OUT}/zoom-${wh}.jpg`,type:'jpeg',quality:60});
  await p.mouse.click(5,5);await sleep(200);const closed=await p.evaluate(()=>!document.getElementById('kazoom')||document.getElementById('kazoom').hidden);
  const ok=m.n>0&&ratioOK&&markOK&&z.open&&z.img&&closed&&!errs.length&&!m.hovf;if(!ok)bad++;
  console.log(wh,JSON.stringify({cards:m.n,ratioOK,markOK,zoom:z,closed,hovf:m.hovf,errs}),ok?'PASS':'FAIL');await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
