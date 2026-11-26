/* review/charge-trinh-punish O1 — video on the real page: she serves as a cung nữ, bought by consort G («Nhận bạc, làm tai mắt»); another consort
   proves G's «Mua chuộc người hầu» by the real Tố giác (odds forced «thành») → her life ends: end card «Bị đuổi khỏi cung» with the rows Ai tố /
   Vì sao / Chứng cứ / Hình phạt / Người hầu bị mua (scrolled by real wheel input), then «Chuyển kiếp» by a real tap.
   usage: node dev/test/srv-mc-video.js <url> [W=755] [H=1000] [videoDir] [pngPath] */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',VID,PNG]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:1,serviceWorkers:'block',...(VID?{recordVideo:{dir:VID,size:{width:+W,height:+H}}}:{})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 const ok0=await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<80&&!isSrv();i++)start();window.__nlInner=0;quiet=false;return isSrv()});
 await sleep(1500);await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});await sleep(2500);
 const info=await p.evaluate(()=>{const mis=srvM();const L=liveRivals(true).filter(x=>x!==mis&&!x.coop&&!x.queen);const [g,acc]=L;g.wrongs=[];
  S.srv.spyFor=g.id;deedAdd(g,"sbribe",null,deedW("sbribe"),`mua chuộc người hầu của ${mis.name}`);acc.evc={};evA(acc,g,chNeed(g,"mc"),"mc");window.__g=g;window.__acc=acc;
  log(`${g.name} sai người đưa bạc, ngươi nhận làm tai mắt.`);render();return{mis:mis.name,g:g.name,acc:acc.name}});
 await sleep(2500);
 const r=await p.evaluate(()=>{const r0=Math.random;Math.random=()=>0;let t;try{t=ACT.accuse.f(window.__acc,window.__g)}finally{Math.random=r0}log(t);showModal();render();return{t,dead:S.dead,fate:S.fate}});
 await sleep(2500);
 const box=await p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden]) .kpbody,#modal:not([hidden]) .mbody,#modal:not([hidden])');const r=m&&m.getBoundingClientRect();return r?{x:r.x+r.width/2,y:r.y+r.height/2}:null});
 if(box){await p.mouse.move(box.x,box.y);for(let i=0;i<6;i++){await p.mouse.wheel(0,220);await sleep(900)}}
 if(PNG){await p.mouse.wheel(0,-2000);await sleep(600);await p.screenshot({path:PNG})}
 const tx=await p.evaluate(()=>{const m=document.getElementById('modal');return m?m.innerText.replace(/\s+/g,' ').slice(0,1200):''});
 const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 const tap=await p.evaluate(()=>{const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent&&/Chuyển kiếp/.test(b.textContent));if(!x)return null;const r=x.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});
 if(tap){await p.mouse.wheel(0,3000);await sleep(800);const t2=await p.evaluate(()=>{const x=[...document.querySelectorAll('#modal button')].find(b=>b.offsetParent&&/Chuyển kiếp/.test(b.textContent));const r=x.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}});await p.mouse.click(t2.x,t2.y);await sleep(3000)}
 const rows=["Ai tố","Vì sao","Chứng cứ","Hình phạt","Người hầu bị mua","Bị đuổi khỏi cung"].filter(k=>!tx.toLowerCase().includes(k.toLowerCase()));
 console.log('SUMMARY '+JSON.stringify({W,H,srv:ok0,info,dead:r.dead,fate:r.fate,missing:rows,overflow:ov,tapped:!!tap,errs}));console.log(tx);
 await ctx.close();await b.close();process.exit(ok0&&r.dead&&!rows.length&&!ov&&!errs.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
