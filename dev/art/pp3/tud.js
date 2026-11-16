const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
const p=await ctx.newPage();p.setDefaultTimeout(120000);
await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());render()});
await p.waitForFunction(()=>typeof KIT_ACTS!=='undefined'&&KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length,null,{timeout:60000}).catch(()=>{});
const r=await p.evaluate(()=>{const out=[];for(const sub of ["duc","cktt","nc"]){try{KTSUB.art=sub}catch(e){}tab="art";render();
 document.querySelectorAll('.kskills .kskill, .kskills > *').forEach(c=>{const h=(c.querySelector('h4,.kskn,.kskh,b')||c).textContent.replace(/\s+/g," ").slice(0,30);c.querySelectorAll('button.ka').forEach(k=>{const n=kpActName(k.querySelector(".kan")||k);const im=k.querySelector('img');out.push([h,n.slice(0,30),k.dataset.kart||"",im?im.getAttribute('src'):"-"])})})}
 return out});
console.log(JSON.stringify(r,null,1));await b.close()})()
