/* rank-name probe: boots a life, opens each panel tab, screenshots, prints every element that shows a rank word and/or a name. usage: node rank-name-probe.js <url> <W>x<H>@dpr <outdir> [tabs] */
const {chromium}=require('playwright');const [,,URL,SZ,OUT,TABS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
 await p.waitForTimeout(2500);
 const clear=async()=>{for(let i=0;i<60;i++){const v=await p.evaluate(()=>{const kc=document.querySelector('[data-km-close]');if(kc){kc.click();return 1}const ov=document.querySelector('#kmrew,.km-ov,[id^=km]:not(script)');if(ov&&ov.offsetParent&&ov.id==='kmrew'){ov.remove();return 1}const m=document.getElementById('modal');if(!m||m.hidden||!m.open&&getComputedStyle(m).display==='none')return 0;const bt=m.querySelector('button.kbtn,button.opt,button');if(bt){bt.click();return 1}m.hidden=true;return 0});if(!v)break;await p.waitForTimeout(700)}};
 for(const t of (TABS||'rv,go,staff,kid,court,rel').split(',')){await clear();await p.evaluate(t=>{tab=t;render()},t);await p.waitForTimeout(1500);
  await p.screenshot({path:`${OUT}/tab-${t}.jpg`,type:'jpeg',quality:80});console.log('tab',t,'shot')}
 console.log('errors',JSON.stringify(errs));await b.close()})();
