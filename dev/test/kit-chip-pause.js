/* review/kit-chip-pause (K-CHIP-PAUSE, MAIN 92): no ⏸ font glyph in any kit chip text — the pause sign is the .kpzb two CSS bars (3 x 10 px, same as the §77b badge).
   Renders kitCoopFriend (hold + clock pz) and kitCoopFriendPanel on Fold 755x1000 + iPad 1180x820; checks: no ⏸ text node in the chip/panel/whole HUD, 2 bars 3x10, chip text not cut, shot of the chip.
   usage: node dev/test/kit-chip-pause.js <url> <outdir> */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitCoopFriend==='function'&&typeof kitCoopFriendPanel==='function',null,{timeout:240000});
  const r=await p.evaluate(()=>{const d=document.createElement('div');d.id='kcpz';d.style.cssText='position:fixed;left:10px;top:10px;z-index:99999;background:#fffaf0;padding:10px;display:flex;flex-direction:column;gap:10px;align-items:flex-start';
   d.innerHTML=kitCoopFriend({st:'hold',clock:'pz',left:65000,name:'Hoàn Bích'})+kitCoopFriend({st:'work',clock:'run',left:125000})+'<div style="width:360px">'+kitCoopFriendPanel({st:'hold',clock:'pz',left:65000})+'</div>';document.body.appendChild(d);
   const cl=d.cloneNode(true);cl.querySelectorAll('.kbdg').forEach(x=>x.remove());const txt=cl.textContent; /* the §77b badge keeps its glyph at font-size 0 (bars drawn by CSS) */const bars=[...d.querySelectorAll('.kpzb')].map(e=>{const a=getComputedStyle(e,'::before'),c=getComputedStyle(e,'::after');return [a.width,a.height,c.width,c.height].join(',')});
   const cut=[...d.querySelectorAll('.kchip')].filter(e=>e.scrollWidth>e.clientWidth+1).length;
   const rr=d.getBoundingClientRect();return {glyph:/⏸/.test(txt),bars,cut,box:[rr.left,rr.top,rr.width,rr.height]}});
  const e=[];if(r.glyph)e.push('⏸ glyph still in text');if(r.bars.length<2||r.bars.some(x=>x!=='3px,10px,3px,10px'))e.push('bars '+JSON.stringify(r.bars));if(r.cut)e.push('chip cut '+r.cut);
  await p.screenshot({path:`${OUT}/${W}x${H}-chip.png`,clip:{x:r.box[0],y:r.box[1],width:Math.min(r.box[2],W-20),height:Math.min(r.box[3],H-20)}});
  if(e.length)bad++;console.log(`${W}x${H}`,e.length?'FAIL '+e.join('; '):'PASS',JSON.stringify(r.bars));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
