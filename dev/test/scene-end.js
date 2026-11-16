/* KIT 81 scene-end button (owner OD:L1261): a kmStage scene never closes by itself, and not by a tap on the scene; after the animation ONE .kbtn.kmend closes it.
   usage: node dev/test/scene-end.js <page URL> <WxH@dpr,...> <outdir>
   For each scene (bloom, edict, flip me, flip other, gloom, ink): no button while it plays; a tap skips to the final frame; the button shows the right words, is inside the
   screen, is the only .kbtn of the scene; 3.5 s later the scene is STILL open; a tap on the scene does not close it; the button closes it. FAIL → exit 1. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SIZES,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));fs.mkdirSync(OUT||'/tmp/scene-end',{recursive:true});
const SC={bloom:["kitBloom({title:'Có hỷ',sub:'Thái y báo tin mừng'})","Tiếp theo"],edict:["kitEdict({who:S,from:Math.max(0,S.rank-1),to:S.rank})","Đã hiểu"],
 'flip-me':["kitFlipTablet(S,{me:true})","Chuẩn bị thị tẩm"],'flip-other':["kitFlipTablet(liveRivals(true)[0])","Ta biết rồi"],gloom:["kitGloom({title:'Bị giáng phẩm',who:S,from:2,to:1})","Đã hiểu"],ink:["kitInk({title:'Hồng nhan bạc mệnh'})","Tiếp theo"]};
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click());document.querySelectorAll(".kroul").forEach(e=>e.remove());const kl=document.getElementById("kload");if(kl)kl.remove()},250)});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kmStage==='function');await sleep(2500);await p.addStyleTag({content:'.kroul{display:none!important}'});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>0,null,{timeout:60000});
  const clear=async()=>{await p.evaluate(()=>{KMQ.length=0;document.querySelectorAll('.kmov,#kmrew').forEach(e=>e.remove());kmBusy=false;Q.length=0;document.getElementById('modal').hidden=true});await sleep(300)};
  await clear();
  for(const [name,[code,want]] of Object.entries(SC)){await clear();
   await p.evaluate(c=>{(0,eval)(c)},code);await p.waitForSelector('.kmov',{timeout:10000}).catch(()=>{});await sleep(500);
   const r={name};
   r.early=await p.evaluate(()=>!!document.querySelector('.kmov .kmend'));
   await p.locator('.kmov').first().click({position:{x:20,y:20},timeout:5000}).catch(()=>{});await sleep(500);
   r.btn=await p.evaluate(()=>{const o=document.querySelector('.kmov');const b=o&&o.querySelector('.kmend');if(!b)return null;const q=b.getBoundingClientRect();return{t:b.textContent.trim(),n:o.querySelectorAll('.kbtn').length,inside:q.left>=0&&q.right<=innerWidth&&q.top>=0&&q.bottom<=innerHeight,hint:!!o.querySelector('.kmhint'),w:Math.round(q.width),h:Math.round(q.height)}});
   if(name==='flip-me')await p.screenshot({path:`${OUT}/${wh}-${name}.png`});
   await sleep(3500);r.stillOpen=await p.evaluate(()=>!!document.querySelector('.kmov:not(.km-out)'));
   await p.mouse.click(Math.round(W/2),Math.round(H/3));await sleep(500);r.tapKeeps=await p.evaluate(()=>!!document.querySelector('.kmov:not(.km-out)'));
   await p.locator('.kmov .kmend').first().click({timeout:5000}).catch(()=>{});await sleep(700);r.closed=await p.evaluate(()=>!document.querySelector('.kmov'));
   const ok=!r.early&&r.btn&&r.btn.t===want&&r.btn.n===1&&r.btn.inside&&!r.btn.hint&&r.stillOpen&&r.tapKeeps&&r.closed;if(!ok)bad++;
   console.log(wh,name.padEnd(11),ok?'PASS':'FAIL',JSON.stringify(r))}
  if(errs.length){bad++;console.log(wh,'PAGE ERRORS',errs)}
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
