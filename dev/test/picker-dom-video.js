/* picker-dom r4 review video: s7 save (1,437 pieces), «Dâng quà» → the LIVE «Vòng bảo vật» ring lists the chest from kipList; spin, open an item that is NOT on the dialog's drawn page, its pane, give it. usage: node video.js <root> <outdir> */
const path=require('path');const ROOT=path.resolve(process.argv[2]),OUT=path.resolve(process.argv[3]);const {chromium}=require('playwright');const {serve,BASE}=require("./coop-serve.js");const cp=require('child_process'),zlib=require('zlib'),fs=require('fs');
const D=JSON.parse(zlib.gunzipSync(cp.execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz',{cwd:ROOT,maxBuffer:1<<28})).toString());
(async()=>{const b=await chromium.launch();for(const [dev,vw,vh] of [['fold',755,1000],['ipad',1180,820]]){const dir=path.join(OUT,dev);fs.mkdirSync(dir,{recursive:true});
 const ctx=await b.newContext({viewport:{width:vw,height:vh},deviceScaleFactor:1,recordVideo:{dir,size:{width:vw,height:vh}}});await serve(ctx,ROOT);
 await ctx.addInitScript(d=>{if(!sessionStorage.getItem('pdm')){for(const k in d)localStorage.setItem(k,d[k]);sessionStorage.setItem('pdm','1')}},D);
 const p=await ctx.newPage();const T0=Date.now();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:300000});await p.waitForFunction(()=>typeof deser==='function'&&window.COOPW,null,{timeout:300000});
 await p.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();render()}catch(e){}});/* the boot cover (#klife «Vào cung ngay», jload) stays up while art loads: tap it like a player, then wait until it is gone */
 for(let k=0;k<120;k++){const up=await p.evaluate(()=>{const c=document.getElementById('klife');return !!(c&&c.getBoundingClientRect().height>0&&getComputedStyle(c).display!=='none')});if(!up)break;
  const g=p.locator('[data-klife="go"]');if(await g.count()&&await g.first().isVisible())await g.first().click().catch(()=>{});await p.waitForTimeout(500)}
 await p.waitForTimeout(1500);
 const t0=(Date.now()-T0)/1000;fs.writeFileSync(path.join(OUT,dev+'.start'),String(t0));
 await p.evaluate(()=>{const it=mkP('giftto',{t:'emp'});pushDil(it,'Dâng quà');const mm=Q.find(z=>z.pid==='giftto');Q.splice(Q.indexOf(mm),1);Q.unshift(mm);showModal()});await p.waitForTimeout(1800);
 /* spin the ring one step at a time (the ‹ › path: kriTurnTo on the open ring R = kitRingItem.cur; the api object is what open() returns), then open the bright item */
 for(let k=0;k<4;k++){await p.evaluate(()=>{const C=kitRingItem.cur;if(C&&C.tiles.length)kriTurnTo(C,(kitRingItem.front()+1)%C.tiles.length)});await p.waitForTimeout(700)}
 const info=await p.evaluate(()=>{const C=kitRingItem.cur,M=document.getElementById('modal');const drawn=new Set([...M.querySelectorAll('.opts>.opt[data-m]')].map(x=>+x.dataset.m));const i=C.items.findIndex(x=>!x.lock&&!drawn.has(x.i));if(i>=0)kriTurnTo(C,i);return{i,n:C.items.length,drawn:drawn.size}});
 await p.waitForTimeout(1200);await p.evaluate(()=>kriFocus(kitRingItem.cur));await p.waitForTimeout(2200);
 await p.evaluate(()=>{const b=document.querySelector('.kri-pane .kri-acts .kbtn.kri-main');if(b)b.click()});await p.waitForTimeout(2600);
 console.log(dev,JSON.stringify(info),'start',t0.toFixed(1));await ctx.close()}await b.close()})();
