/* LUẬT SỬA CẢ NHÓM scan (D31): on the identity card the choice block (.kpopts, sticky at the bottom, z 3) must stay on top of
   everything that scrolls under it. Scrolls the card body (#mb) from top to bottom in 16 px steps and hit-tests 5 points of every
   choice button; lists each element that paints over a choice (class + scroll positions).
   usage: node dev/test/idcard-pin-scan.js <site url> [WxH ...]   (env DIFF=kho: pick that difficulty first, rebuilding the card) */
const {chromium}=require('playwright');const a=process.argv.slice(2);const U=a[0];const VPS=(a.slice(1).length?a.slice(1):['755x1000','1180x820']).map(s=>s.split('x').map(Number));
const PX=process.env.HTTPS_PROXY||'';let bad=0;
(async()=>{const b=await chromium.launch({args:['--no-sandbox'],proxy:PX?{server:PX,bypass:'127.0.0.1,localhost'}:undefined});
 for(const [w,h] of VPS){const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:w<1100,ignoreHTTPSErrors:true,reducedMotion:'reduce'});const p=await ctx.newPage();
  await p.goto(U,{timeout:180000,waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.querySelector('#title'),null,{timeout:180000});
  await p.evaluate(()=>{if(typeof kitRoulette==='function')kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}};SLOT=1;$("title").hidden=true;start()});
  await p.waitForFunction(()=>document.querySelector('#modal .kpopts button'),null,{timeout:120000});await p.waitForTimeout(2500);
  await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  if(process.env.DIFF){await p.click(`#modal button[data-diff="${process.env.DIFF}"]`);await p.waitForTimeout(1500)}
  const r=await p.evaluate(()=>{const mb=$("mb");const max=mb.scrollHeight-mb.clientHeight;const hits={};let steps=0;
   for(let y=0;y<=max+16;y+=16){mb.scrollTop=Math.min(y,max);steps++;
    for(const bt of document.querySelectorAll('#modal .kpopts button')){const R=bt.getBoundingClientRect();
     for(const [fx,fy] of [[.5,.5],[.15,.2],[.85,.2],[.15,.8],[.85,.8]]){const e=document.elementFromPoint(R.x+R.width*fx,R.y+R.height*fy);
      if(e&&!(e===bt||bt.contains(e))){const k=(e.closest('.kdiff')?'[in .kdiff] ':'')+e.tagName+'.'+String(e.className).slice(0,40);(hits[k]=hits[k]||[]).push(mb.scrollTop)}}}}
   return {max,steps,hits:Object.fromEntries(Object.entries(hits).map(([k,v])=>[k,[...new Set(v)].length+' scroll positions, first '+v[0]]))}});
  const n=Object.keys(r.hits).length;bad+=n;console.log(`${w}x${h} DIFF=${process.env.DIFF||'-'} scroll 0..${r.max} (${r.steps} steps): ${n?'COVERED BY '+JSON.stringify(r.hits):'choices never covered'}`);
  await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
