/* dump: boots a life, opens a tab, prints outerHTML (trimmed) of the selector. usage: node rank-name-dump.js <url> <tab> <selector> [W] */
const {chromium}=require('playwright');const [,,URL,TAB,SEL,WW]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+(WW||755),height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0});
 for(let i=0;i<60;i++){const v=await p.evaluate(()=>{const kc=document.querySelector('[data-km-close]');if(kc){kc.click();return 1}const o=document.getElementById('kmrew');if(o){o.remove();return 1}return 0});if(!v&&i>8)break;await p.waitForTimeout(600)}
 await p.evaluate(t=>{tab=t;render()},TAB);await p.waitForTimeout(1500);
 console.log(await p.evaluate(s=>[...document.querySelectorAll(s)].slice(0,2).map(e=>e.outerHTML.replace(/ style="[^"]*"/g,'').replace(/data:[^"]{20,}/g,'data:…').slice(0,3500)).join('\n----\n'),SEL));await b.close()})();
