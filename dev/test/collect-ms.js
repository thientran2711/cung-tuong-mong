/* D49 collection milestones. usage: node dev/test/collect-ms.js <baseURL> <W>x<H>@dpr <outdir> [shots]
   Fakes the held-kind count 19->20, 49->50, 99->100, 199->200 (checks Phuc duyen once, ledger), reloads the SAME life from an earlier
   save (no second payment), loads an OLD save (no S.col, no ledger) and an old book (no ledger key). */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,SHOTS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fails=[];const ok=(c,m)=>{if(!c)fails.push(m)};
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set("cung-colms",null)}catch(e){}start()});
 await p.waitForFunction(()=>typeof NLP!=="undefined"&&NLP&&S&&S.name,null,{timeout:60000});await p.waitForTimeout(800);
 await p.evaluate(()=>{const k=document.querySelector(".krskip");if(k)k.click()});await p.waitForTimeout(800);
 await p.evaluate(()=>{try{nlAccept(false)}catch(e){}Q.length=0;const m=document.getElementById("modal");if(m)m.hidden=true;render()});await p.waitForTimeout(800);
 const fake=n=>p.evaluate(n=>{S.col={};const hh=Object.keys(colHeld()).length;for(let i=0;i<n-hh;i++)S.col["fake"+i]=1;const pd0=pdGet(),q0=Q.length;colCheck();return{n:colN(),pd:pdGet()-pd0,cards:Q.length-q0,ms:Object.keys(S.colMs||{}).join(","),title:wdColInfo().title}},n);
 const exp=[[19,0,""],[20,5,"20"],[49,0,"20"],[50,10,"20,50"],[99,0,"20,50"],[100,20,"20,50,100"],[199,0,"20,50,100"],[200,35,"20,50,100,200"]];
 for(const [n,pd,ms] of exp){await p.evaluate(()=>{Q.length=0});const r=await fake(n);ok(r.pd===pd,`n=${n} pd ${r.pd}!=${pd}`);ok(r.ms===ms,`n=${n} ms ${r.ms}!=${ms}`);ok(r.cards===(pd?1:0),`n=${n} cards ${r.cards}`);console.log(n,JSON.stringify(r))}
 const rl=await p.evaluate(()=>{S.col={};S.colMs={};Q.length=0;const pd0=pdGet();for(let i=0;i<210;i++)S.col["fake"+i]=1;colCheck();return{pd:pdGet()-pd0,cards:Q.length,ms:Object.keys(S.colMs).join(",")}});
 console.log("reload same life",JSON.stringify(rl));ok(rl.pd===0&&rl.cards===0&&rl.ms==="20,50,100,200","reload double-grant");
 const old=await p.evaluate(()=>{store.set("cung-colms",null);S.name="Lao So";delete S.col;delete S.colMs;S.inv=[];Object.keys(IT).slice(0,25).forEach(k=>S.inv.push({k}));Q.length=0;const pd0=pdGet();colCheck();const a={pd:pdGet()-pd0,cards:Q.length,n:colN()};colCheck();a.again=pdGet()-pd0;return a});
 console.log("old save",JSON.stringify(old));ok(old.n>=20&&old.pd===5&&old.cards===1&&old.again===5,"old save");
 const ob=await p.evaluate(()=>{store.set("cung-colms",null);return typeof pastHTML()==="string"});console.log("old book ok",ob);ok(ob,"old book");
 const dd=await p.evaluate(()=>({pdLife:S.pdLife}));console.log("pdLife",JSON.stringify(dd));ok(dd.pdLife>=5,"pdLife counts the collection Phuc duyen (kiep do dang loses it)");
 if(SHOTS){await p.evaluate(()=>{S.name="Tuyet Nhi";S.col={};for(let i=0;i<45;i++)S.col["fake"+i]=1;S.colMs={20:1};store.set("cung-colms",{best:120,ms:{20:3,50:2,100:1},lives:{["Tuyet Nhi|"+S.origin.k]:{20:1}}});Q.length=0;for(let i=45;i<52;i++)S.col["fake"+i]=1;colCheck()});await p.waitForTimeout(800);await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();const l=document.getElementById('kload');if(l)l.remove();document.querySelectorAll('.kloadchip').forEach(x=>x.remove())});await p.waitForTimeout(800);
  await p.screenshot({path:`${OUT}/reward-${W}x${H}.jpg`,type:'jpeg',quality:80});
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;showTitle()});await p.waitForTimeout(1200);await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();const l=document.getElementById('kload');if(l)l.remove();document.querySelectorAll('.kloadchip').forEach(x=>x.remove())});
  await p.evaluate(()=>{const bt=document.querySelector('[data-tgo="past"]');if(bt)bt.click()});await p.waitForTimeout(3000);console.log('modal:',await p.evaluate(()=>(document.getElementById('modal').innerText||'').slice(0,600).replace(/\n+/g,' | ')));
  await p.screenshot({path:`${OUT}/book-${W}x${H}.jpg`,type:'jpeg',quality:80});
  console.log("overflowX",await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))}
 console.log(JSON.stringify({W,H,fails,errs}));await b.close();process.exit(fails.length||errs.length?1:0)})();
