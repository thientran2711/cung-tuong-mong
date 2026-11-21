/* dialog-stack helper: start a game on a built root and open overlays. Shared by dev/test/dialog-stack-scan.js */
const {chromium}=require('playwright');const D=require('./device');
async function boot(ROOT,dev){const srv=await D.serveRoot(ROOT);const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,dev,{reducedMotion:'reduce'});await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>r.abort());
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
 await g.addStyleTag({content:'#kroul,.kroul,[id^=kroul]{display:none!important}'});
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}render()});
 await p.waitForTimeout(2500);return {srv,b,p,g,errs,close:async()=>{await b.close();srv.close()}}}
module.exports={boot};
