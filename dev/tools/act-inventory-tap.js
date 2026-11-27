/* ACT-INVENTORY real-tap check (ACT-MERGE): on the LIVE page, at Samsung Fold 755x1000 and iPad 1180x820, walk to places, TAP a person on the
   stage (a real click on [data-p]), then tap every tab of the pop-up and count the action buttons a player sees. Proves the scan counts.
   usage: node dev/tools/act-inventory-tap.js <outdir> [url]   → <outdir>/tap.json + one shot per device/kind (scratch, never in git) */
const fs=require('fs');const path=require('path');const {chromium}=require('playwright');
const ROOT=path.resolve(__dirname,'../..');const OUTD=process.argv[2];const URL=process.argv[3]||'https://thientran2711.github.io/cung-tuong-mong/';
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const DEV=[["fold",755,1000],["ipad",1180,820]];
(async()=>{fs.mkdirSync(OUTD,{recursive:true});const b=await chromium.launch();const RES={};
 for(const [dn,W,H] of DEV){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(LIB);const got={};
  for(const sc of ['cao','hh']){for(let bu=0;bu<4;bu++){
   const plan=await p.evaluate(([sc,bu])=>{AA.scen(sc);const R=[];for(const sf of AA.surfaces()){if(!sf.place)continue;AA.restore(1+bu);S.buoi=bu;used=0;AA.show(sf);(curPeople()||[]).forEach((q,i)=>R.push({pl:sf.place,i,k:(q.kind||"?")+(q.kind==="rival"&&q.ref&&q.ref.queen?"(HH)":""),n:q.name||""}))}return R},[sc,bu]);
   for(const t of plan){if(got[t.k])continue;
    const ok=await p.evaluate(([t,bu])=>{AA.restore(1+bu);S.buoi=bu;used=0;AA.show({tab:"act",place:t.pl});const T0=document.getElementById("title");if(T0)T0.hidden=true;popIdx=null;renderStage&&renderStage();return !!document.querySelector(`[data-p="${t.i}"]`)},[t,bu]);if(!ok)continue;
    let clicked=false;try{await p.locator(`[data-p="${t.i}"]`).first().click({timeout:3000,force:true});clicked=true}catch(e){}
    if(!clicked)clicked=await p.evaluate(i=>{const e=document.querySelector(`[data-p="${i}"]`);if(!e)return false;e.click();return true},t.i);if(!clicked)continue;
    await p.waitForTimeout(400);
    const res=await p.evaluate(async()=>{const box=[...document.querySelectorAll('.pcpop,.kfocus,[class*="kitFocus"],[class*="kfoc"]')].find(x=>x&&x.getClientRects().length&&x.querySelector('button'));if(!box)return null;
     const tabs=[...box.querySelectorAll('.pctabs .pct')];const R={tabs:[]};const vis=()=>[...box.querySelectorAll('.pcg')].filter(g=>g.offsetParent||getComputedStyle(g).display!=="none");
     const cnt=()=>{const g=vis();const L=(g.length?g:[box]).flatMap(x=>[...x.querySelectorAll('button')]).filter(x=>x.getClientRects().length&&(typeof dfIsAct!=="function"||dfIsAct(x)));return L.map(x=>{const k=x.querySelector('.kan');return (k?k.textContent:x.textContent).replace(/\s+/g," ").trim().slice(0,50)})};
     if(!tabs.length){R.tabs.push({t:"(one pane)",b:cnt()});return R}
     for(const t of tabs){t.click();await new Promise(r=>setTimeout(r,120));R.tabs.push({t:t.textContent.replace(/\s+/g," ").trim(),b:cnt()})}return R});
    if(!res)continue;res.who=t.n;res.place=t.pl;res.total=res.tabs.reduce((a,x)=>a+x.b.length,0);got[t.k]=res;
    if(Object.keys(got).length<=6)await p.screenshot({path:path.join(OUTD,`${dn}-${t.k.replace(/[^a-z]/gi,"")}.png`)})}}}
  RES[dn]={got,perr};await ctx.close()}
 fs.writeFileSync(path.join(OUTD,'tap.json'),JSON.stringify(RES,null,1));
 for(const dn in RES){console.log("\n##",dn,"page errors",RES[dn].perr.length);for(const k in RES[dn].got){const g=RES[dn].got[k];console.log(` ${k} (${g.who} @ ${g.place}): ${g.total} = `+g.tabs.map(x=>x.t+" "+x.b.length).join(" · "))}}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
