/* kit-size4-full.js — ONE full-screen shot of a v3 frame at a given size, mounted in the real #modal over the running game.
   usage: node dev/test/kit-size4-full.js <url> <W>x<H> <out.png> <jksize.js> [kind=person] [size=S]   (DPR env, Fold: 590x820 DPR 2.4390) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT,AFT,KIND='person',K='S']=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2500);
 for(let i=0;i<12;i++){const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/Ta biết rồi|Bỏ qua|Tiếp|Đóng/.test(b.textContent)&&!b.closest('#modal'));if(b){b.click();return 1}return 0});await p.waitForTimeout(c?1500:300);if(!c&&i>2)break}
 const ov=await p.evaluate(()=>[...document.body.children].filter(e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed').filter(e=>{const r=e.getBoundingClientRect();return r.width>innerWidth*.8&&r.height>innerHeight*.8}).map(e=>e.id+'.'+e.className));console.error('overlays',ov);
 await p.evaluate(()=>{try{Q.length=0;showModal()}catch(e){}document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip').forEach(e=>e.remove())});
 await p.addScriptTag({content:fs.readFileSync(AFT,'utf8')});
 const info=await p.evaluate(([kind,K])=>{window.kitKnown=()=>true;window.isKnown61=()=>true;window.k61Named=()=>true;window.met61=()=>true;window.kitKnownName=()=>true;
  kszSheet3(kind);const sp=window.__ksz3X[K];document.getElementById('kszsheet').remove();
  const M0=document.getElementById('modal');M0.hidden=false;const bg=getComputedStyle(M0).backgroundColor;M0.hidden=true;const M=document.createElement('div');M.id='k4modal';M.style.cssText=`position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:${bg}`;M.innerHTML=kszFrame3(sp,K);document.body.appendChild(M);const d=M.querySelector('.dlg');kitFrameApply3(d);
  d.querySelectorAll('img').forEach(i=>i.complete||i.addEventListener('load',()=>kitFrameApply3(d),{once:true}));return {who:(d.querySelector('.kt3')||{}).innerText}},[KIND,K]);
 await p.waitForTimeout(2000);await p.waitForFunction(()=>[...document.querySelectorAll('#k4modal img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
 await p.evaluate(()=>kitFrameApply3(document.querySelector('#k4modal .dlg')));await p.waitForTimeout(800);
 const m=await p.evaluate(()=>{const f=document.querySelector('#k4modal .dlg'),q=f.getBoundingClientRect(),Bd=f.querySelector('.k3body').getBoundingClientRect(),fs=f.querySelector('.k3body>.kszfig>.kszfs'),tg=f.querySelector('.k3body>.kszfig>.kt3');
  const r=fs.getBoundingClientRect(),t=tg.getBoundingClientRect();const cut=[...f.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='visible'&&e.clientWidth>0&&!e.closest('.kszfs,.ksart')).map(e=>e.className).slice(0,5);
  return{frame:[q.left|0,q.top|0,q.width|0,q.height|0],inView:q.top>=0&&q.bottom<=innerHeight&&q.left>=0&&q.right<=innerWidth,ratio:+(r.height/(Bd.height-22)).toFixed(3),gapTop:Math.round(t.top-Bd.top-10),gapBot:Math.round(Bd.bottom-12-r.bottom),hScroll:document.documentElement.scrollWidth>innerWidth,cut,avatar:!!f.querySelector('.pcp,.k3mpor,.k3mpic')}});
 await p.screenshot({path:OUT});console.log(JSON.stringify({info,m,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
