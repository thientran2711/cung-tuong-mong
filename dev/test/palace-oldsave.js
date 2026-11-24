/* Old save -> new build (review/palace-map-port): plays 2 buổi on the previous main build, saves slot 3, loads it in the new build, then
   Dư đồ -> a palace detail -> a hall room. usage: node dev/test/palace-oldsave.js <oldBuildUrl> <newBuildUrl> <W>x<H>@dpr <outdir> */
const {chromium}=require('./lib/pw-roulette');const [,,OLD,NEW,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),ignoreHTTPSErrors:true});const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const boot=async u=>{await p.goto(u,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500)};
 await boot(OLD);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 const old=await p.evaluate(()=>{Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}const m=document.getElementById('modal');if(m)m.hidden=true;quiet=false;try{NLP=false}catch(e){}try{save()}catch(e){}return{name:S.name,month:S.month,buoi:S.buoi}});
 const oldErrs=errs.splice(0);
 await boot(NEW);
 const how=await p.evaluate(()=>{const b=document.querySelector('#title [data-load="3"]');if(b){b.click();return'button'}const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;deal();render();return'code'});await p.waitForTimeout(3000);
 const r=await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;tab='go';render();
  const sp=[...document.querySelectorAll('#panel .mspot')].filter(x=>/cung/.test(x.textContent));return{name:S&&S.name,month:S&&S.month,spots:sp.length,labs:sp.map(x=>x.textContent.trim().slice(0,30))}});
 let det=null;if(r.spots){await p.evaluate(()=>{[...document.querySelectorAll('#panel .mspot')].find(x=>/cung/.test(x.textContent)).click()});await p.waitForTimeout(2500);
  det=await p.evaluate(()=>({open:!!document.querySelector('#panel .kpmv'),spots:[...document.querySelectorAll('#panel .kpm-spot')].map(x=>x.textContent.trim())}));
  await p.screenshot({path:`${OUT}/oldsave-detail.jpg`,type:'jpeg',quality:70})}
 console.log(JSON.stringify({old,oldErrs,how,r,det,errs}));await b.close()})();
