/* KIT 81 sweep (owner OD:L1261, review/scene-end-sweep): the scenes converted by the sweep — toilReveal (makeup reveal), kitGain (item reveal) (the j79 dawn fallback is covered by scene-end-scan.js; the live week scene is the Tuần lục book),
   kitReward chest, kitPersonReveal — never close by themselves or by a tap anywhere; ONE button ends each. Screenshot of each scene at its final frame.
   usage: node dev/test/scene-end-sweep.js <page URL> <WxH@dpr,...> <outdir>     FAIL → exit 1 */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SIZES,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));fs.mkdirSync(OUT||'/tmp/scene-end-sweep',{recursive:true});
const SC={
 toil:{K:'.ktrv-ov',open:"toilReveal({look:'dep',good:true,made:true,score:80,pre:'Hồng đào'},()=>{window.__toilDone=1})",final:async p=>{await p.waitForSelector('.ktrv.ktrv-in',{timeout:20000}).catch(()=>{});await sleep(600);await p.locator('.ktrv-ov').first().click({position:{x:20,y:20}}).catch(()=>{});await sleep(1800)},btn:'.kmend',want:'Tiếp theo'},
 gain:{K:'.kfgain',open:"kitGain('nhansam',{from:'Thái hậu ban'})",final:async p=>{await sleep(2600)},btn:'.krevok',want:'Nhận'},
 chest:{K:'#kmrew',open:"kitReward({kind:'chest',title:'Phẩm phục Quý nhân',from:'Nội vụ phủ phụng chỉ',items:[{n:'Ngọc bội',tier:2,img:KM_DIR+'mo-ingot-silver.webp'}],bac:20})",final:async p=>{await sleep(500);await p.locator('#kmrew').first().click({position:{x:20,y:20}}).catch(()=>{});await sleep(1500);await p.locator('#kmrew').first().click({position:{x:20,y:20}}).catch(()=>{});await sleep(1500)},btn:'.kmtake',want:'Nhận'},
 person:{K:'#kprevov',open:"kitPersonReveal({who:liveRivals(true)[0],title:'Nội vụ phủ phụ cấp người hầu',sub:'Cung nữ',line:'«Nô tỳ khấu kiến chủ tử.»',btn:'Nhận'})",final:async p=>{await sleep(2000)},btn:'.kmtake',want:'Nhận'}};
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click());document.querySelectorAll(".kroul").forEach(e=>e.remove());const kl=document.getElementById("kload");if(kl)kl.remove()},250)});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kmStage==='function');await sleep(2500);await p.addStyleTag({content:'.kroul{display:none!important}'});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>0,null,{timeout:60000});
  const clear=async()=>{await p.evaluate(()=>{KMQ.length=0;document.querySelectorAll('.kmov,#kmrew').forEach(e=>e.remove());const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}kmBusy=false;Q.length=0;document.getElementById('modal').hidden=true});await sleep(300)};
  await clear();
  for(const [name,c] of Object.entries(SC)){await clear();await clear();const r={name};
   await p.evaluate(x=>{(0,eval)(x)},c.open);await p.waitForSelector(c.K,{timeout:15000}).catch(()=>{});await sleep(400);
   await c.final(p);
   r.present=await p.evaluate(k=>!!document.querySelector(k),c.K);
   r.btn=await p.evaluate(([k,bs])=>{const o=document.querySelector(k);const b=o&&o.querySelector(bs);if(!b)return null;const q=b.getBoundingClientRect();return{t:b.textContent.trim(),inside:q.left>=0&&q.right<=innerWidth&&q.top>=0&&q.bottom<=innerHeight,vis:q.width>0&&q.height>0}},[c.K,c.btn]);
   await p.screenshot({path:`${OUT}/${wh}-${name}.png`});
   await sleep(3500);r.stillOpen=await p.evaluate(k=>{const o=document.querySelector(k);return !!o&&!o.classList.contains('km-out')&&!o.hidden},c.K);
   await p.mouse.click(Math.round(W/2),Math.round(H*.12));await sleep(600);
   r.tapKeeps=await p.evaluate(k=>{const o=document.querySelector(k);return !!o&&!o.classList.contains('km-out')&&!o.hidden},c.K);
   await p.locator(c.K+' '+c.btn).first().click({timeout:8000}).catch(e=>{r.err=String(e).slice(0,80)});await sleep(900);
   r.closed=await p.evaluate(k=>{const o=document.querySelector(k);return !o||o.classList.contains('km-out')||o.hidden||!o.classList.contains('on')&&k.startsWith('#dawn')},c.K);
   const ok=r.present&&r.btn&&r.btn.t===c.want&&r.btn.inside&&r.btn.vis&&r.stillOpen&&r.tapKeeps&&r.closed;if(!ok)bad++;
   console.log(wh,name.padEnd(7),ok?'PASS':'FAIL',JSON.stringify(r))}
  if(errs.length){bad++;console.log(wh,'PAGE ERRORS',errs)}
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
