const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tdsSync==='function');await p.waitForTimeout(6000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
 const kinds=await p.evaluate(()=>Object.keys(WKR));const bad=[];let n=0;
 for(const kind of kinds){const ids=await p.evaluate(k=>WKR[k].map(r=>r.id),kind);
  for(const rid of ids){
   const r=await p.evaluate(({kind,rid})=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
     const a=WK[kind].a;Object.assign(KWR,{k:a,mode:'prac',run:()=>{},kind});if(typeof tdsKinds==='function'&&tdsKinds().includes(kind)){}
     try{wkrMat(kind,rid);showModal();}catch(e){return{err:String(e).slice(0,80)}}
     const M=document.getElementById('modal');return{t:document.getElementById('mt').textContent,ban:[...M.querySelectorAll('.kdlgart img')].map(i=>i.src.split('/').pop()),opt:[...M.querySelectorAll('.opts>button')].map(b=>b.dataset.kopic||'')}},{kind,rid});
   n++;const ok=r.ban&&r.ban.length&&/^ev-wk-/.test(r.ban[0])&&r.opt.slice(0,3).every(x=>/^rule:(opt-wk-|chep-kinh)/.test(x));if(!ok)bad.push([kind,rid,JSON.stringify(r)]);}}
 console.log('checked',n,'bad',bad.length);bad.slice(0,15).forEach(x=>console.log(x.join(' ')));console.log('errs',errs);await b.close()})();
