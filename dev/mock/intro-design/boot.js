const {chromium}=require('playwright');
const sleep=t=>new Promise(r=>setTimeout(r,t));
exports.boot=async function(W,H,dpr,opts={}){
 const px=process.env.HTTPS_PROXY;
 const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:dpr,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true},opts));
 const p=await ctx.newPage();p.setDefaultTimeout(240000);
 await p.goto('http://127.0.0.1:8765/index.html',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
 await p.addStyleTag({content:'#kroul,#curtain,#kmrew,.kmov{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;render()});
 await sleep(2500);
 return {b,ctx,p};
}
