/* picker-dom r4 review video: s7 save (1,437 pieces), «Dâng quà» → the LIVE «Vòng bảo vật» ring lists the chest from kipList; spin, open an item that is NOT on the dialog's drawn page, its pane, give it. usage: node video.js <root> <outdir> */
const path=require('path');const ROOT=path.resolve(process.argv[2]),OUT=path.resolve(process.argv[3]);const {chromium}=require('playwright');const {serve,BASE}=require("./coop-serve.js");const cp=require('child_process'),zlib=require('zlib'),fs=require('fs');
const D=JSON.parse(zlib.gunzipSync(cp.execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz',{cwd:ROOT,maxBuffer:1<<28})).toString());
(async()=>{const b=await chromium.launch();for(const [dev,vw,vh] of [['fold',755,1000],['ipad',1180,820]]){const dir=path.join(OUT,dev);fs.mkdirSync(dir,{recursive:true});
 const ctx=await b.newContext({viewport:{width:vw,height:vh},deviceScaleFactor:1,recordVideo:{dir,size:{width:vw,height:vh}}});await serve(ctx,ROOT);
 await ctx.addInitScript(d=>{if(!sessionStorage.getItem('pdm')){for(const k in d)localStorage.setItem(k,d[k]);sessionStorage.setItem('pdm','1')}},D);
 const p=await ctx.newPage();const T0=Date.now();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:300000});await p.waitForFunction(()=>typeof deser==='function'&&window.COOPW,null,{timeout:300000});
 await p.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();render()}catch(e){}});await p.waitForTimeout(1500);
 const t0=(Date.now()-T0)/1000;fs.writeFileSync(path.join(OUT,dev+'.start'),String(t0));
 await p.evaluate(()=>{const it=mkP('giftto',{t:'emp'});pushDil(it,'Dâng quà');const mm=Q.find(z=>z.pid==='giftto');Q.splice(Q.indexOf(mm),1);Q.unshift(mm);showModal()});await p.waitForTimeout(1800);
 /* spin the ring with ‹ › like a player, then tap the bright item */
 for(let k=0;k<4;k++){await p.evaluate(()=>{const C=kitRingItem.cur;C.turnTo?C.turnTo((C.rot||0)+3):0});await p.waitForTimeout(700)}
 const info=await p.evaluate(()=>{const C=kitRingItem.cur,M=document.getElementById('modal');const drawn=new Set([...M.querySelectorAll('.opts>.opt[data-m]')].map(x=>+x.dataset.m));const i=C.items.findIndex(x=>!x.lock&&!drawn.has(x.i));if(i>=0)C.turnTo(i);return{i,n:C.items.length,drawn:drawn.size}});
 await p.waitForTimeout(1200);await p.evaluate(()=>kitRingItem.cur.focus());await p.waitForTimeout(2200);
 await p.evaluate(()=>{const b=document.querySelector('.kri-pane .kri-acts .kbtn.kri-main');if(b)b.click()});await p.waitForTimeout(2600);
 console.log(dev,JSON.stringify(info),'start',t0.toFixed(1));await ctx.close()}await b.close()})();
