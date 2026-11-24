/* shared boot: serve the BUILT game (evframe-r1 checkout = LIVE + KIT §93.4 layout A) in HOST mode on a real device profile, start a life, land on the home stage.
   usage (node): const B=require('./boot.js'); const {b,ctx,p,f,srv}=await B.open('fold'|'ipadAir',{root}); */
const {chromium}=require('playwright');const path=require('path');
const D=require(path.resolve(__dirname,'../../test/lib/device.js'));
const ROOT=process.env.GAME_ROOT||'/home/user/wt/md2ev';
async function open(dev,o){o=o||{};const srv=await D.serveRoot(ROOT,o.port||0);const b=o.browser||await chromium.launch();
 const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:o.dsf||2});if(process.env.KSEED)await ctx.addInitScript(sd=>{let a=sd>>>0;Math.random=function(){a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}},+process.env.KSEED);/* KSEED=<n>: the same random life every run (complete-mock rule: Fold and iPad show the same consort life) */
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 const f=await D.openHost(p,srv.url,{timeout:240000});f.on&&0;
 await f.waitForFunction(()=>typeof start==='function'&&typeof kitScene!=='undefined',null,{timeout:240000});await p.waitForTimeout(1500);
 await f.evaluate(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300);SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;m.hidden=true;
  const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');S.bac=Math.max(S.bac||0,300);tab='act';render()});
 await p.waitForTimeout(2500);
 await f.addStyleTag({content:'#kload,#klife,#dawn,.kne,#kneov,#kroulw,.kroul{display:none!important}'});
 await f.evaluate(()=>{document.querySelectorAll('#kroulw,#kroul,.kroul').forEach(e=>e.remove());['curtain','buoitr'].forEach(i=>{const e=document.getElementById(i);if(e)e.classList.remove('on')});const m=document.getElementById('modal');Q.length=0;if(m)m.hidden=true;try{render()}catch(e){}});await p.waitForTimeout(800);
 return {b,ctx,p,f,srv,errs}}
module.exports={open,D,ROOT};
