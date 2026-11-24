/* hotfix review/hotfix-thinhan: "Thỉnh an Hoàng hậu" / "Thỉnh an Thái hậu" really move the attitude they promise.
   usage: node dev/test/thinhan.js <baseURL> <outdir>   (Fold 755x1000@2) */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}
 await sleep(1200);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render()});
 await sleep(2000);
 const R={};
 for(const name of ["Thỉnh an Hoàng hậu","Thỉnh an Thái hậu"]){
  R[name]=await p.evaluate(async(name)=>{const q=queenP();const i=deck.findIndex(a=>a.n===name);if(i<0)return{missing:true,deck:deck.map(a=>a.n)};
   const card=(document.querySelector(`.kcard[data-i="${i}"]`)||{}).innerText||cardH(deck[i],i).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ');
   const before={hh:S.hh,th:S.th,qrel:q&&q!==S?aff(q,S):null};deck[i].o=100;Q.length=0;used=0;const r0=window.roll;window.roll=()=>true;try{act(i)
   await new Promise(r=>setTimeout(r,1500))}finally{window.roll=r0}const after={hh:S.hh,th:S.th,qrel:q&&q!==S?aff(q,S):null};
   const t=document.getElementById('rtoast');return{card:String(card).replace(/\s+/g,' ').slice(0,400),before,after,result:t?t.innerText.replace(/\s+/g,' '):''}},name);
  await p.screenshot({path:`${OUT}/after-${name.replace(/\s+/g,'-')}-ket-qua-755x1000.png`,animations:'disabled',timeout:120000})}
 /* the Hoàng hậu person card */
 R.qcard=await p.evaluate(async()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const t=document.getElementById('rtoast');if(t)t.classList.remove('on');
  const c=document.querySelector('#kshR [data-kc="hh"]');if(c)c.click();await new Promise(r=>setTimeout(r,1500));
  const w=[...document.querySelectorAll('#popw, #modal:not([hidden]), .pc')].find(e=>e.offsetParent||getComputedStyle(e).position==='fixed');return (c?'chip ':'nochip ')+(w?w.innerText.replace(/\s+/g,' ').slice(0,600):'')});
 await p.screenshot({path:`${OUT}/after-the-hoang-hau-755x1000.png`,animations:'disabled',timeout:120000});
 /* old save: a life saved by the OLD build (OLD=<page>, default the same page), then loaded by this build through the title's load path */
 await p.goto(BASE+(process.env.OLD||'index.html'),{waitUntil:'domcontentloaded',timeout:180000});for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}await sleep(2000);await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;S.month=5;save()});await sleep(1500);
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded',timeout:180000});for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}await sleep(2000);
 R.load=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();return 'ok month '+S.month+' hh '+S.hh}catch(e){return 'err '+e.stack.slice(0,400)}});
 R.errs=errs;console.log(JSON.stringify(R,null,1));await b.close()})();
