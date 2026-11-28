/* review/face-sharp (owner 15/11 late: her face hazy on stage, the maid beside her crisp).
   usage: node dev/test/face-sharp.js <site url> <WxH@dpr> <outdir> <tag> [identity=consort:c30] [variant css]
   Starts a life, gives her the identity, rank Thường tại, 20 tuổi, bare face, at home with her maid; waits for the pictures;
   saves a PNG of the stage (device pixels) + JSON with each stage figure's rect, src, natural size and computed filter/animation/transform.
   face-sharp-cmp.py then compares each figure's head crop with the source picture resampled to the same size (sharpness ratio). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,SZ,OUT,TAG,ID0,CSS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const ID=ID0||'consort:c30';
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'},args:['--ignore-certificate-errors'].concat(process.env.GPU?['--enable-gpu-rasterization','--force-gpu-rasterization','--ignore-gpu-blocklist','--use-angle=swiftshader','--enable-unsafe-swiftshader']:[])}:{});const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block'});
 const LOC=process.env.LOCAL_IMG;if(LOC)await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\/[^?]*/,async r=>{const f=LOC+'/'+r.request().url().split('/img/')[1].split('?')[0];if(fs.existsSync(f))return r.fulfill({path:f,headers:{'access-control-allow-origin':'*','content-type':f.endsWith('.json')?'application/json':'image/webp'}});return r.continue()});
 const REQ=[];ctx.on('response',async r=>{const u=r.url();if(/\/img\/(hd\/)?fig-/.test(u))REQ.push([r.status(),u.split('/img/')[1],+(r.headers()['content-length']||0)])});if(process.env.BLOCKHD)await ctx.route(/\/img\/hd\//,r=>r.fulfill({status:404,body:''}));const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const T0=Date.now(),lg=m=>console.error(((Date.now()-T0)/1000).toFixed(0)+'s '+m);lg('go');await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof figPick==='function'&&FIGS.length>0,null,{timeout:120000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 lg('started');const setup=await p.evaluate((ID)=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  Q.length=0;try{NLP=null}catch(e){}const s=document.createElement('style');s.textContent='.kroul{display:none!important}';document.head.appendChild(s);
  S.pid=ID;S.fid=ID;try{figUsed().push(ID)}catch(e){}S.rank=1;S.age=20;S.toilette=null;
  try{kitKnown=()=>true}catch(e){}S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;tab='act';render();return{fid:figPick(S)}},ID);
 if(CSS)await p.addStyleTag({content:CSS});
 await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;document.querySelectorAll('.kmov').forEach(e=>e.remove())});
 await p.waitForTimeout(3000);
 await p.waitForFunction(()=>{const L=[...document.querySelectorAll('#mefig,#tokens img.figimg')];return L.length&&L.every(i=>i.complete&&i.naturalWidth>0)},null,{timeout:90000}).catch(()=>{});
 if(process.env.SELECT)await p.evaluate(()=>{const me=document.getElementById('mefig');if(me)me.click()});if(process.env.SELECT)await p.waitForTimeout(1500);

 await p.waitForTimeout(3000);
 const A=await p.evaluate(()=>[...document.querySelectorAll('#mefig,#tokens img.figimg')].map(e=>{const r=e.getBoundingClientRect();return{src:(e.currentSrc||'').split('/img/')[1],ss:e.getAttribute('srcset')?1:0,w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,x:Math.round(r.left),y:Math.round(r.top),nw:e.naturalWidth}}));
 await p.screenshot({path:`${OUT}/${TAG}-stage.png`});
 // identity-like big figure + dialog-like
 await p.evaluate(()=>{const M=document.getElementById('modal');M.hidden=false;M.classList.add('kpscene','kpfig');const im=document.createElement('img');im.className='kidfig2';im.alt='';im.src=figFor(S);M.prepend(im)});
 await p.waitForTimeout(3500);
 const Bk=await p.evaluate(()=>{const e=document.querySelector('img.kidfig2');const r=e.getBoundingClientRect();return{src:(e.currentSrc||'').split('/img/')[1],ss:e.getAttribute('sizes'),w:r.width,h:r.height,nw:e.naturalWidth,filter:getComputedStyle(e).filter.slice(0,30)}});
 await p.screenshot({path:`${OUT}/${TAG}-id.png`});
 const A2=await p.evaluate(()=>[...document.querySelectorAll('#mefig')].map(e=>{const r=e.getBoundingClientRect();return{w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,x:Math.round(r.left),y:Math.round(r.top)}}));
 console.log(JSON.stringify({tag:TAG,stage:A,id:Bk,meAfter:A2,errs,hdReq:REQ.filter(r=>/hd\//.test(r[1])),figReq:REQ.length}));await b.close()})();