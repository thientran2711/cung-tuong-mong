/* map-place-mask: a Dư đồ place label must never be scrubbed into "<rank> ???" when it spells an unknown person's name (map-portrait-r2). usage: node dev/test/map-place-mask.js <page URL> */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',ignoreHTTPSErrors:true});const p=await ctx.newPage();p.setDefaultTimeout(90000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});for(let i=0;i<15;i++){await sleep(400);if(!await p.evaluate(()=>{const s=isSrv();if(s)start();return s}))break}
 const r=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='go';render();await new Promise(r=>setTimeout(r,1500));
  const e=k61All().find(x=>x&&x.nm&&!k61Named(x))||k61All().find(x=>x&&!k61Named(x)&&typeof k61Table==='function');const names=[...document.querySelectorAll('.mapw .mspot .mlab')].map(m=>m.textContent);
  const sp=document.querySelector('.mapw .mspot .mlab');const nm=e&&(e.name||e.nm||'');if(!sp||!nm)return{skip:1,hasE:!!e};
  const lab=document.createElement('span');lab.textContent=nm;sp.appendChild(lab);k61Node(lab);const out=lab.textContent;lab.remove();return{nm,out,bad:/\?\?\?/.test(out)||out!==nm,mapBad:names.filter(t=>/\?\?\?/.test(t))}});
 console.log(JSON.stringify(r),errs.join('|'));await b.close();process.exit(r.skip||r.bad||(r.mapBad&&r.mapBad.length)||errs.length?1:0)})();
