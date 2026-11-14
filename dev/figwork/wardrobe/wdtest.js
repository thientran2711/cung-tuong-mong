// node wdtest.js BASEURL OUTDIR : old wardrobe save (43-item build) -> new build: migration, slots, chest, collection, maid scale, screenshots
const {chromium}=require('playwright');const [,,BASE,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push('OLD '+e.message));
 await p.goto(BASE+'old.html');await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(1500);
 await p.click('#slots button[data-new="1"]');await p.waitForTimeout(800);
 for(let i=0;i<4;i++){await p.evaluate(()=>{while(Q.length)closeModal();nextBuoi()});await p.waitForTimeout(150)}
 const oldInfo=await p.evaluate(()=>{while(Q.length)closeModal();wdOf(S);S.inv=S.inv||[];S.inv.push({k:"y_haiduong",from:"emp"},{k:"y_cungnu",from:"emp"},{k:"tram_phithuy",from:"emp"});S.wdk={y_haiduong:1};
   const v=rivals[0];wdOf(v);v.wd.y={k:"y_minhhoang",from:"emp"};save();return {me:JSON.stringify(S.wd),v:v.name+" "+JSON.stringify(v.wd)}});
 const oldSave=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});await p.close();
 const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});
 await c.addInitScript(o=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])}},oldSave);
 const q=await c.newPage();const pe=[];q.on('pageerror',e=>pe.push(e.message));
 await q.goto(BASE+'new.html');await q.waitForTimeout(2500);
 const lb=await q.$('#slots button[data-load]');if(lb){await lb.click();await q.waitForTimeout(1500)}
 const r=await q.evaluate(()=>{while(Q.length)closeModal();const o={};o.items=WD_LIST.length;o.tiers=WD_TIERS.length;
  o.me=JSON.stringify(wdOf(S));o.inv=(S.inv||[]).filter(e=>WD_ITEMS[e.k]).map(e=>e.k+":"+WD_ITEMS[e.k].n+":"+WD_ITEMS[e.k].tier+":"+WD_GRADE[WD_ITEMS[e.k].g]);o.wdk=JSON.stringify(S.wdk);
  const v=rivals[0];o.v=JSON.stringify(wdOf(v))+" status "+wdStatus(v)+" P "+wdPOf(v);o.slots=JSON.stringify(wdSlots(S));o.col=JSON.stringify(wdColInfo());
  // maid scale
  o.maidP=[0,1,2,3,4].map(k=>wdTierP((k-4)/2));o.pickMaid=wdPickAt(-1.5,"y",0);o.pickHH=wdPickAt(8,"tram",3);
  // collection milestones: give 25 items
  const pd0=typeof pdGet==="function"?pdGet():null;let n=0;for(const r of WD_LIST){if(n>=60)break;if(r[4]<4&&!wdIsTang(r[0])){wdGain(S,r[0],{from:"test"});n++}}
  o.col2=JSON.stringify(wdColInfo());o.pd=pd0+"->"+(typeof pdGet==="function"?pdGet():null);o.T=JSON.stringify(S.wdColT);
  o.missingIcons=[];return o});
 // icon files exist?
 const miss=await q.evaluate(async()=>{const bad=[];for(const r of WD_LIST){for(const u of [`img/${r[8]}.webp`,`img/wd512/${r[8]}.webp`]){const x=await fetch(u,{method:'HEAD'}).catch(()=>null);if(!x||!x.ok)bad.push(u)}}return bad});
 await q.evaluate(()=>{while(Q.length)closeModal()});
 // open Tư trang (inventory) screenshot
 await q.evaluate(()=>{try{if(typeof openInv==="function")openInv();else if(typeof tab==="function")tab("inv")}catch(e){}});await q.waitForTimeout(500);
 await q.screenshot({path:`${OUT}/wd2-after-755.png`,fullPage:false});
 const ovf=await q.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 for(let i=0;i<8;i++){await q.evaluate(()=>{for(let k=0;k<5&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(m.opts.length-1);else closeModal()}});const nx=await q.$('#next:not([disabled])');if(nx)await nx.click().catch(()=>{});await q.waitForTimeout(250)}
 console.log(JSON.stringify({oldInfo,oldErrors:errs,r,missing:miss.length,missEx:miss.slice(0,6),overflowX:ovf,pageErrors:pe.slice(0,8)},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
