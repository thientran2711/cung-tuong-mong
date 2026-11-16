const {chromium}=require('playwright');const [url,tag,tabs,szs]=[process.argv[2],process.argv[3],(process.argv[4]||'log').split(','),process.argv[5]||'1180x820@2,755x1000@2'];
(async()=>{const b=await chromium.launch();
 for(const SZ of szs.split(',')){const [wh,d]=SZ.split('@');const [w,h]=wh.split('x').map(Number);
 const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:+d,reducedMotion:'reduce',serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(0);
 await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}window.__bot={pre:1};try{localStorage.clear()}catch(e){}window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.an=1;S.mat=2;S.th=10;S.suc=80;S.bac=300});
 const info=await p.evaluate(()=>{let n=0;for(let r=0;r<3;r++){used=0;S.buoi=r%3;deal();for(let i=0;i<deck.length&&n<10;i++){const a=deck[i];if(!a||a.done||!canPay(a)||a.lock||!can(cardCost(a))||(a.b!=null&&(S.buoi||0)!==a.b)||Q.length)continue;act(i);n++;let g=0;while(Q.length&&g++<5){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}if(S.mg){S.mg=null;try{kg82Close(true)}catch(e){}}}}
  for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}const m=document.getElementById('modal');if(m)m.hidden=true;return {n}});
 for(const t of tabs){
 await p.evaluate(t=>{tab=t;render();const P=document.getElementById('panel');if(!P.getBoundingClientRect().height){const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()}},t);await p.waitForTimeout(500);
 const m=await p.evaluate(()=>{const P=document.getElementById('panel');return {txt:P.innerText.slice(0,1500),ox:document.documentElement.scrollWidth>innerWidth+1,sw:P.scrollWidth-P.clientWidth}});
 console.log(SZ,t,info.n,'ox',m.ox,'psw',m.sw,'errs',errs.length,errs.slice(0,2));if(process.env.TXT)console.log(m.txt);
 await p.screenshot({path:`.sh/${tag}-${t}-${w}x${h}.png`,timeout:90000});}
 await c.close()}
 await b.close()})();
