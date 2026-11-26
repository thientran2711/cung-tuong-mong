const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/user/wt/c3w/index.html');await p.waitForTimeout(6000);
const r=await p.evaluate(()=>({roles:Object.keys(KIT_EMOSEAL.roleSet).length,extra:KIT_EMOSEAL.setExtra,re:String(KES_SETRE).slice(0,120),fn:typeof emoArtSet}));
console.log(JSON.stringify(r),'ERR',errs.slice(0,3));await b.close()})();
