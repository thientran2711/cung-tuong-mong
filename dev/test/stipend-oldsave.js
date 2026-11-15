/* review/econ-stipend: an old save (made with mk-oldsave.js on the live / main build) loads, then 4 months pass with skimming forced on
   (her + NPCs): no page error, goods arrive in S.inv, p.stip / S.stipW created lazily.
   usage: node dev/test/stipend-oldsave.js <build url> <oldsave.json> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OLD]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof loadSlot==='function');await p.waitForTimeout(2500);
 const d=fs.readFileSync(OLD,'utf8');
 const r=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return{e:'noload'};SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;
   const had={stip:!!S.stip,stipW:!!S.stipW,inv:S.inv.length};BAL.stip.cap=100;S.sung=4;stipW().greedy=1;
   const out=[];for(let m=0;m<4;m++){Q.length=0;const b0=S.bac,n0=S.inv.length;monthTick();out.push({month:S.month,bac:S.bac-b0,goods:S.inv.slice(n0).filter(e=>e.from==="noivu").map(e=>e.k),Q:Q.map(q=>q.t).filter(t=>/Bổng lộc/.test(t))})}
   Q.length=0;render();return{name:S.name,had,out,npcStip:liveRivals(true).filter(v=>v.stip).length}}catch(e){return{e:e.message,st:e.stack.slice(0,300)}}},d);
 console.log(JSON.stringify({r,errs},null,1));await b.close()})();
